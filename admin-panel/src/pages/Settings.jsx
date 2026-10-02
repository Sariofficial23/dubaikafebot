import { useEffect, useState } from 'react';
import { api } from '../api.js';

const FIELDS = [
  ['freeFrom', 'Бесплатная доставка от, сум', 'Если сумма товаров ≥ порога — доставка бесплатна'],
  ['deliveryFee', 'Цена доставки, сум', 'Добавляется отдельной позицией «Yetkazib berish»'],
  ['colaPrice', 'Апселл Coca-Cola, сум', 'Предлагается в корзине только при заказе ≥ порога'],
];

export default function Settings() {
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.settings().then(setForm).catch((e) => setMsg(e.message));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      setForm(await api.saveSettings(form));
      setMsg('Сохранено ✓');
    } catch (err) {
      setMsg(err.message);
    }
  };

  if (!form) return <div className="muted">{msg || 'Загрузка…'}</div>;

  return (
    <form className="card settings" onSubmit={save}>
      {FIELDS.map(([key, label, hint]) => (
        <label key={key}>
          {label}
          <input type="number" min={0} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
          <span className="muted small">{hint}</span>
        </label>
      ))}
      <div className="row">
        <button className="btn primary">Сохранить</button>
        {msg && <span className="muted">{msg}</span>}
      </div>
    </form>
  );
}
