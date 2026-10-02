export const money = (n) => `${Math.round(Number(n) || 0).toLocaleString('ru-RU').replace(/[\s,  ]/g, ' ')} so'm`;

export function categoriesOf(products) {
  const seen = [];
  for (const p of products) if (!seen.includes(p.category)) seen.push(p.category);
  return seen;
}

export const DEFAULT_SETTINGS = { freeFrom: 100000, deliveryFee: 8000, colaPrice: 5000 };

export const GRADIENTS = {
  red: 'linear-gradient(135deg,#e4002b,#ff5a4e)',
  orange: 'linear-gradient(135deg,#ff7a00,#ffb347)',
  gold: 'linear-gradient(135deg,#c8902e,#f3c969)',
  pink: 'linear-gradient(135deg,#ff3d77,#ff8fab)',
  dark: 'linear-gradient(135deg,#2b2b2b,#5a5a5a)',
  green: 'linear-gradient(135deg,#0f9d58,#5ad18a)',
};
