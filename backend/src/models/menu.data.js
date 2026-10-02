// Полное меню Dubai Kafe — заливается кнопкой «Обновить меню» в админке
// или командой `npm run seed`.
// ⚠️ Сейчас это ПРИМЕР. Замените на настоящее меню.
// Порядок категорий в мини-аппе = порядок первого появления категории здесь.
// Поля: name, description, category, newPrice (so'm), oldPrice? (зачёркнутая цена), image? (URL)

export const MENU = [
  { category: 'Kofe', name: 'Espresso', description: '', newPrice: 15000 },
  { category: 'Kofe', name: 'Cappuccino', description: '', newPrice: 22000 },
  { category: 'Kofe', name: 'Latte', description: '', newPrice: 24000 },
  { category: 'Desertlar', name: 'Dubai shokoladi', description: 'Fistashka va kadayif bilan', newPrice: 45000, oldPrice: 50000 },
  { category: 'Desertlar', name: 'Cheesecake', description: '', newPrice: 32000 },
  { category: 'Ichimliklar', name: 'Limonad', description: '', newPrice: 18000 },
].map((p) => ({ description: '', oldPrice: null, image: null, ...p }));
