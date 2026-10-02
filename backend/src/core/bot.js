import TelegramBot from 'node-telegram-bot-api';
import config from '../config/default.js';
import { prisma } from '../database/connection.js';
import { upsertUser } from '../models/user.model.js';
import { orderText, escapeHtml } from './format.js';

let bot = null;

const courierName = (from) => (from.username ? `@${from.username}` : from.first_name || 'Kuryer');

export function getBot() {
  return bot;
}

export function startBot() {
  if (!config.botToken) {
    console.warn('⚠️  BOT_TOKEN не задан — бот не запущен');
    return null;
  }

  bot = new TelegramBot(config.botToken, { polling: true });
  bot.on('polling_error', (e) => console.error('[polling]', e.code, e.message));

  bot.onText(/^\/start/, async (msg) => {
    if (msg.chat.type !== 'private') return;
    try {
      await upsertUser(msg.from);
    } catch (e) {
      console.error('[bot] upsertUser', e.message);
    }
    const text =
      `Assalomu alaykum, <b>${escapeHtml(msg.from.first_name || '')}</b>! 👋\n\n` +
      `<b>${config.botName}</b> ga xush kelibsiz ☕️\n` +
      `Menyuni ochib, buyurtma bering — tez yetkazib beramiz!`;
    const reply_markup = config.miniAppUrl
      ? { inline_keyboard: [[{ text: '🍽 Menyuni ochish', web_app: { url: config.miniAppUrl } }]] }
      : undefined;
    bot.sendMessage(msg.chat.id, text, { parse_mode: 'HTML', reply_markup });
  });

  bot.onText(/^\/id/, (msg) => {
    bot.sendMessage(msg.chat.id, `Chat ID: <code>${msg.chat.id}</code>`, { parse_mode: 'HTML' });
  });

  bot.on('callback_query', handleCallback);

  console.log('🤖 Bot started (polling)');
  return bot;
}

async function handleCallback(q) {
  const [action, idStr] = String(q.data || '').split('_');
  const id = Number(idStr);
  if (!id || !['take', 'deliver'].includes(action)) return bot.answerCallbackQuery(q.id);

  try {
    const order = await prisma.order.findUnique({ where: { id }, include: { user: true } });
    if (!order) return bot.answerCallbackQuery(q.id, { text: 'Buyurtma topilmadi' });

    const name = courierName(q.from);
    const chatId = q.message.chat.id;
    const messageId = q.message.message_id;

    if (action === 'take') {
      // Атомарно: забрать заказ может только один курьер
      const { count } = await prisma.order.updateMany({
        where: { id, courier: null },
        data: { courier: name, courierId: String(q.from.id) },
      });
      if (!count) {
        return bot.answerCallbackQuery(q.id, { text: `Buyurtmani ${order.courier} oldi`, show_alert: true });
      }
      const updated = { ...order, courier: name };
      await bot.editMessageText(orderText(updated, order.user, `🚴 Kuryer: ${escapeHtml(name)}`), {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: '🏁 Yetkazildi', callback_data: `deliver_${id}` }]] },
      });
      return bot.answerCallbackQuery(q.id, { text: 'Buyurtma sizga biriktirildi ✅' });
    }

    // deliver
    if (order.courierId && order.courierId !== String(q.from.id)) {
      return bot.answerCallbackQuery(q.id, {
        text: `Buni faqat ${order.courier} belgilay oladi`,
        show_alert: true,
      });
    }
    if (order.status === 'yetkazildi') return bot.answerCallbackQuery(q.id, { text: 'Allaqachon yetkazilgan' });

    await prisma.order.update({ where: { id }, data: { status: 'yetkazildi' } });
    await bot.editMessageText(
      orderText(order, order.user, `🚴 Kuryer: ${escapeHtml(order.courier)}\n✅ <b>Yetkazildi</b>`),
      { chat_id: chatId, message_id: messageId, parse_mode: 'HTML' }
    );
    bot.answerCallbackQuery(q.id, { text: 'Rahmat! Yetkazildi 🏁' });
    notifyClient(order.user.telegramId, `✅ Buyurtmangiz #${id} yetkazildi. Yoqimli ishtaha! 😋`);
  } catch (e) {
    console.error('[bot] callback', e);
    bot.answerCallbackQuery(q.id, { text: 'Xatolik yuz berdi' }).catch(() => {});
  }
}

export async function notifyCouriers(order, user) {
  if (!bot || !config.courierGroupId) return;
  try {
    await bot.sendMessage(config.courierGroupId, orderText(order, user), {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: { inline_keyboard: [[{ text: '✅ Men olaman', callback_data: `take_${order.id}` }]] },
    });
  } catch (e) {
    console.error('[bot] notifyCouriers', e.message);
  }
}

export function notifyClient(telegramId, text) {
  if (!bot || !telegramId) return;
  bot.sendMessage(telegramId, text, { parse_mode: 'HTML' }).catch(() => {});
}
