import { Link, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventsContext.jsx';
import NotFound from './NotFound.jsx';

export default function EventDetail() {
  const { id } = useParams();
  const { events, registrations } = useEvents();
  const event = events.find((e) => String(e.id) === id);
  // Erreur de routage : identifiant inconnu -> page 404 au lieu d'un écran blanc.
  if (!event) return <NotFound />;

  const list = registrations.filter((r) => r.eventId === event.id);
  const full = list.length >= event.capacity;
  return (
    <>
      <h1>{event.title}</h1>
      <p>📅 {event.date} · 📍 {event.location}</p>
      <p>{event.description}</p>
      <p>Inscrits : {list.length} / {event.capacity}</p>
      {full ? <p className="error">Événement complet.</p> : <Link className="btn" to={`/events/${event.id}/register`}>S'inscrire</Link>}
      <h2>Participants</h2>
      <ul>{list.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
      {!list.length && <p>Aucun participant pour le moment.</p>}
      <p><Link to="/events">← Retour</Link></p>
    </>
  );
}
