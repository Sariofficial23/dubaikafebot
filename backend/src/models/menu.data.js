// Полное меню Dubai Kafe — заливается кнопкой «Обновить меню» в админке
// или командой `npm run seed`.
// Порядок категорий в мини-аппе = порядок первого появления категории здесь.
// Поля: name, description, category, newPrice (so'm), oldPrice? (зачёркнутая цена), image? (URL)
// Фото добавляются в админке (Товары → ✏️ → Загрузить фото).

const PIZZA = 'Pizza';
const BURGER = 'Burger';
const LAVASH = 'Lavashlar';
const SUSHI = 'Sushi';
const HOTDOG = 'Hot-dog';
const MILLIY = 'Milliy taomlar';
const SALAT = 'Salatlar';
const MOXITO = 'Moxito va limonadlar';
const DESERT = 'Desertlar';
const MUZQAYMOQ = 'Muzqaymoq';

const items = [
  // Pizza
  [PIZZA, 'Dubai Special pizza', 135000],
  [PIZZA, 'Combo pizza (kichkina)', 70000],
  [PIZZA, "Combo pizza (o'rtacha)", 80000],
  [PIZZA, 'Combo pizza (katta)', 90000],
  [PIZZA, 'Qazi pizza (kichkina)', 100000],
  [PIZZA, "Qazi pizza (o'rtacha)", 110000],
  [PIZZA, 'Qazi pizza (katta)', 120000],
  [PIZZA, "Go'shtli pizza (kichkina)", 100000],
  [PIZZA, "Go'shtli pizza (o'rtacha)", 110000],
  [PIZZA, "Go'shtli pizza (katta)", 120000],
  [PIZZA, 'Margarita pizza (kichkina)', 50000],
  [PIZZA, "Margarita pizza (o'rtacha)", 60000],
  [PIZZA, 'Margarita pizza (katta)', 70000],
  [PIZZA, 'Tovuqli pizza (kichkina)', 60000],
  [PIZZA, "Tovuqli pizza (o'rtacha)", 70000],
  [PIZZA, 'Tovuqli pizza (katta)', 80000],
  [PIZZA, 'Pepperoni pizza (kichkina)', 70000],
  [PIZZA, "Pepperoni pizza (o'rtacha)", 80000],
  [PIZZA, 'Pepperoni pizza (katta)', 90000],
  [PIZZA, 'Pide kolbasa', 30000],

  // Burger
  [BURGER, 'Dubai burger', 65000],
  [BURGER, 'Dubai Burg', 50000],
  [BURGER, 'Dubai combo', 65000],
  [BURGER, 'Animal combo', 65000],
  [BURGER, 'Animal party', 50000],
  [BURGER, 'Burger bolajon', 55000],
  [BURGER, 'Shef combo', 55000],
  [BURGER, 'Shef Burg', 40000],
  [BURGER, 'Chizburger combo', 55000],
  [BURGER, 'Chizburger', 40000],
  [BURGER, 'Big Mac combo', 50000],
  [BURGER, 'Big Mac', 35000],
  [BURGER, 'Strips burger combo', 50000],
  [BURGER, "Strip's Burg", 35000],
  [BURGER, "Strip's 5 ta", 35000],
  [BURGER, 'Longer ser combo', 45000],
  [BURGER, 'Longer combo', 42000],
  [BURGER, 'Longer chiz', 30000],
  [BURGER, 'Longer', 27000],
  [BURGER, 'Twister', 27000],
  [BURGER, "Nagget's 10 ta", 25000],
  [BURGER, 'Klab sendvich (tovuqli)', 40000],
  [BURGER, "Klab sendvich (go'shtli)", 40000],
  [BURGER, 'Klab sendvich (kolbasali)', 37000],
  [BURGER, 'Katlet', 15000],
  [BURGER, 'Fri', 15000],

  // Lavashlar
  [LAVASH, 'Iskander kebab', 85000],
  [LAVASH, 'Donar (tarelka)', 80000],
  [LAVASH, 'Tandir sir combo', 60000],
  [LAVASH, 'Lavash sirim combo', 57000],
  [LAVASH, 'Tandir lavash combo', 55000],
  [LAVASH, 'Shaurma combo', 50000],
  [LAVASH, 'Tandir lavash Big sirim', 49000],
  [LAVASH, 'Lavash Big sirim', 49000],
  [LAVASH, 'Tandir lavash Big', 45000],
  [LAVASH, 'Tandir sirim', 45000],
  [LAVASH, 'Lavash sirim', 42000],
  [LAVASH, 'Tandir lavash', 40000],
  [LAVASH, 'Lavash', 38000],
  [LAVASH, 'Shaurma katta', 35000],
  [LAVASH, 'Shaurma tovuq', 33000],
  [LAVASH, 'Xaggi', 35000],

  // Sushi
  [SUSHI, 'Tempura krevetka', 85000],
  [SUSHI, 'Zapechyonniy krevetka', 80000],
  [SUSHI, 'Zapechyonniy krab', 80000],
  [SUSHI, 'Chikken hot', 77000],
  [SUSHI, 'Avokado losos', 77000],
  [SUSHI, 'Filadelfiya', 77000],

  // Hot-dog
  [HOTDOG, 'Yegercha (bulochka)', 15000],
  [HOTDOG, 'Yegercha (nonga)', 15000],
  [HOTDOG, "Bez sosiska xot-dog", 10000],
  [HOTDOG, "Sous qo'shimcha", 3000],
  [HOTDOG, 'Non 0.5', 2500],

  // Milliy taomlar
  [MILLIY, 'Ayrimsay', 48000],
  [MILLIY, "Suyuq lag'mon", 45000],
  [MILLIY, "Qovurma lag'mon", 45000],
  [MILLIY, "Lag'mon 0.7 suyuq", 43000],

  // Salatlar
  [SALAT, 'Mujskoy kapriz', 40000],
  [SALAT, 'Smak', 40000],
  [SALAT, 'Sezar', 40000],
  [SALAT, 'Olivye', 40000],
  [SALAT, 'Grecheskiy', 40000],
  [SALAT, 'Svejiy salat', 15000],

  // Moxito va limonadlar
  [MOXITO, 'Mango-marakuya limonad', 40000],
  [MOXITO, 'Moxito', 25000],
  [MOXITO, 'Blue limonad', 25000],
  [MOXITO, 'Malina limonad', 25000],
  [MOXITO, 'Ananas limonad', 25000],
  [MOXITO, 'Yagoda limonad', 25000],
  [MOXITO, 'Tropik limonad', 25000],
  [MOXITO, 'Qulupnay limonad', 25000],
  [MOXITO, 'Kivi limonad', 25000],

  // Desertlar
  [DESERT, 'Dubai vafli', 60000],
  [DESERT, 'Bubble vafli muzqaymoq', 50000],
  [DESERT, 'Kruassan muzqaymoqli', 35000],
  [DESERT, 'Marojniy shokolad', 35000],

  // Muzqaymoq
  [MUZQAYMOQ, 'Konteyner 0.8 kg', 50000],
  [MUZQAYMOQ, 'Tarelka', 40000],
  [MUZQAYMOQ, 'Stakan 25 000', 25000],
  [MUZQAYMOQ, 'Stakan 20 000', 20000],
  [MUZQAYMOQ, 'Stakan 15 000', 15000],
  [MUZQAYMOQ, 'Stakan 10 000', 10000],
  [MUZQAYMOQ, 'Sharik', 9000],
  [MUZQAYMOQ, "Vafli yong'oq", 8000],
  [MUZQAYMOQ, 'Vafli shokolad', 7000],
  [MUZQAYMOQ, 'Vafli', 6000],
];

export const MENU = items.map(([category, name, newPrice]) => ({
  category,
  name,
  newPrice,
  description: '',
  oldPrice: null,
  image: null,
}));
