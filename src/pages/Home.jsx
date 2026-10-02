import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext.jsx';

export default function Home() {
  const { events, registrations } = useEvents();
  return (
    <>
      <h1>Bienvenue sur EventEase</h1>
      <p>Créez des événements, inscrivez des participants et suivez les présences.</p>
      <p><strong>{events.length}</strong> événements · <strong>{registrations.length}</strong> inscriptions</p>
      <Link className="btn" to="/events">Voir les événements</Link>
    </>
  );
}
