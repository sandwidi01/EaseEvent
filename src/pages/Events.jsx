import { useCallback, useMemo, useState } from 'react';
import { useEvents } from '../context/EventsContext.jsx';
import EventCard from '../components/EventCard.jsx';
import Field from '../components/Field.jsx';
import { validateEvent } from '../utils/validation.js';

const empty = { title: '', date: '', location: '', capacity: 50, description: '' };

export default function Events() {
  const { events, registrations, addEvent, updateEvent, deleteEvent } = useEvents();
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const counts = useMemo(() => {
    const m = {};
    registrations.forEach((r) => { m[r.eventId] = (m[r.eventId] || 0) + 1; });
    return m;
  }, [registrations]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? events.filter((e) => `${e.title} ${e.location}`.toLowerCase().includes(q)) : events;
  }, [events, query]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Supprimer cet événement ?')) deleteEvent(id);
  }, [deleteEvent]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validateEvent(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addEvent({ ...form, title: form.title.trim(), location: form.location.trim(), capacity: Number(form.capacity) });
    setForm(empty);
  };

  return (
    <>
      <h1>Événements</h1>
      <Field label="Rechercher" name="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Titre ou lieu" />
      <div className="grid">
        {filtered.map((ev) => (
          <EventCard key={ev.id} event={ev} registeredCount={counts[ev.id] || 0} onSave={updateEvent} onDelete={handleDelete} />
        ))}
        {!filtered.length && <p>Aucun événement trouvé.</p>}
      </div>

      <h2>Nouvel événement</h2>
      <form className="card" onSubmit={onSubmit} noValidate>
        <Field label="Titre" name="title" value={form.title} onChange={onChange} error={errors.title} />
        <Field label="Date" name="date" type="date" value={form.date} onChange={onChange} error={errors.date} />
        <Field label="Lieu" name="location" value={form.location} onChange={onChange} error={errors.location} />
        <Field label="Capacité" name="capacity" type="number" value={form.capacity} onChange={onChange} error={errors.capacity} />
        <Field label="Description" name="description" as="textarea" rows="2" value={form.description} onChange={onChange} />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}
