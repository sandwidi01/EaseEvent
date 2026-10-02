import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from './Field.jsx';
import { validateEvent } from '../utils/validation.js';

// Carte d'événement : champs contrôlés = liaison de données bidirectionnelle
// (l'état alimente l'input, l'input met à jour l'état).
function EventCard({ event, registeredCount = 0, onSave, onDelete }) {
  const [draft, setDraft] = useState(event);
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validateEvent(draft);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave(event.id, { ...draft, capacity: Number(draft.capacity), title: draft.title.trim(), location: draft.location.trim() });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(event);
    setErrors({});
    setEditing(false);
  };

  const full = registeredCount >= event.capacity;

  if (!editing) {
    return (
      <article className="card">
        <h3>{event.title}</h3>
        <p>📅 {event.date} · 📍 {event.location}</p>
        <p>{event.description}</p>
        <p className={full ? 'error' : ''}>👥 {registeredCount} / {event.capacity} {full && '(complet)'}</p>
        <div className="actions">
          <Link className="btn" to={`/events/${event.id}`}>Détails</Link>
          <button onClick={() => setEditing(true)}>Modifier</button>
          {onDelete && <button className="danger" onClick={() => onDelete(event.id)}>Supprimer</button>}
        </div>
      </article>
    );
  }

  return (
    <form className="card" onSubmit={handleSave} noValidate>
      <Field label="Titre" name="title" value={draft.title} onChange={handleChange} error={errors.title} />
      <Field label="Date" name="date" type="date" value={draft.date} onChange={handleChange} error={errors.date} />
      <Field label="Lieu" name="location" value={draft.location} onChange={handleChange} error={errors.location} />
      <Field label="Capacité" name="capacity" type="number" value={draft.capacity} onChange={handleChange} error={errors.capacity} />
      <Field label="Description" name="description" as="textarea" rows="2" value={draft.description} onChange={handleChange} />
      <p className="preview">Aperçu : <strong>{draft.title || '…'}</strong> le {draft.date || '…'} à {draft.location || '…'}</p>
      <div className="actions">
        <button type="submit">Enregistrer</button>
        <button type="button" className="secondary" onClick={handleCancel}>Annuler</button>
      </div>
    </form>
  );
}

export default memo(EventCard);
