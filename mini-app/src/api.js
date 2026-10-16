import { getInitData } from './telegram.js';

const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

// Адрес сервера — показываем на экране ошибки, чтобы было видно, куда ходит мини-апп
export const API_LABEL = BASE || "VITE_API_URL berilmagan";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Бесплатный Render просыпается до ~50 секунд — GET-запросы повторяем
const RETRY_DELAYS = [3000, 6000, 10000, 15000];

async function request(path, options = {}) {
  const isGet = !options.method || options.method === 'GET';
  let res;
  for (let attempt = 0; ; attempt++) {
    try {
      res = await fetch(`${BASE}/api${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-Init-Data': getInitData(),
          ...(options.headers || {}),
        },
      });
      if (!(isGet && res.status >= 502 && attempt < RETRY_DELAYS.length)) break;
    } catch {
      if (!isGet || attempt >= RETRY_DELAYS.length) throw new Error("Server bilan aloqa yo'q");
    }
    await sleep(RETRY_DELAYS[attempt]);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Xatolik yuz berdi');
  return data;
}

// Картинки с сервера приходят как /api/img/... — добавляем адрес backend
const withImage = (list) =>
  list.map((x) => (x.image?.startsWith('/api/') ? { ...x, image: `${BASE}${x.image}` } : x));

export const getProducts = () => request('/products').then(withImage);
export const getBanners = () => request('/banners').then(withImage);
export const getSettings = () => request('/settings');
export const checkPromo = (code, amount) =>
  request('/promo/check', { method: 'POST', body: JSON.stringify({ code, amount }) });
export const createOrder = (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) });
export const getMyOrders = () => request('/orders/my');
