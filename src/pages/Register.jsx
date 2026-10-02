import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventsContext.jsx';
import { useSession } from '../context/SessionContext.jsx';
import Field from '../components/Field.jsx';
import { validateRegistration } from '../utils/validation.js';
import NotFound from './NotFound.jsx';

export default function Register() {
  const { id } = useParams();
  const { events, registrations, register } = useEvents();
  const { user } = useSession();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '' });
  const [errors, setErrors] = useState({});

  const event = events.find((e) => String(e.id) === id);
  if (!event) return <NotFound />;

  const list = registrations.filter((r) => r.eventId === event.id);
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validateRegistration(form);
    if (!Object.keys(errs).length) {
      if (list.length >= event.capacity) errs.form = 'Cet événement est complet.';
      else if (list.some((r) => r.email.toLowerCase() === form.email.trim().toLowerCase())) errs.email = 'Cet e-mail est déjà inscrit.';
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    register({ eventId: event.id, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
    navigate(`/events/${event.id}`);
  };

  return (
    <>
      <h1>Inscription : {event.title}</h1>
      <form className="card" onSubmit={onSubmit} noValidate>
        {errors.form && <p className="error" role="alert">{errors.form}</p>}
        <Field label="Nom" name="name" value={form.name} onChange={onChange} error={errors.name} />
        <Field label="E-mail" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
        <Field label="Téléphone (optionnel)" name="phone" value={form.phone} onChange={onChange} error={errors.phone} />
        <button type="submit">Valider l'inscription</button>
      </form>
      <p><Link to={`/events/${event.id}`}>← Retour</Link></p>
    </>
  );
}
