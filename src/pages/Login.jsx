import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';
import Field from '../components/Field.jsx';
import { validateRegistration } from '../utils/validation.js';

export default function Login() {
  const { login } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validateRegistration(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    login(form.name, form.email);
    navigate(location.state?.from || '/', { replace: true });
  };

  return (
    <>
      <h1>Connexion</h1>
      <form className="card" onSubmit={onSubmit} noValidate>
        <Field label="Nom" name="name" value={form.name} onChange={onChange} error={errors.name} />
        <Field label="E-mail" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
        <button type="submit">Se connecter</button>
      </form>
    </>
  );
}
