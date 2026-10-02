import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { checkPassword, setPassword } from '../api.js';

export default function Login({ onSuccess }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    if (await checkPassword(value)) {
      setPassword(value);
      onSuccess();
    } else setError('Неверный пароль');
    setBusy(false);
  };

  return (
    <div className="login">
      <form className="login-card" onSubmit={submit}>
        <div className="login-icon"><Icon name="lock" size={28} /></div>
        <h1>Dubai Kafe</h1>
        <p className="muted">Панель управления</p>
        <input type="password" autoFocus placeholder="Пароль" value={value} onChange={(e) => setValue(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <button className="btn primary wide" disabled={busy || !value}>{busy ? 'Проверка…' : 'Войти'}</button>
      </form>
    </div>
  );
}
