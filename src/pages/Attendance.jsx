import { useState } from 'react';
import { useEvents } from '../context/EventsContext.jsx';

export default function Attendance() {
  const { events, registrations, togglePresence } = useEvents();
  const [eventId, setEventId] = useState(events[0]?.id ?? '');
  const list = registrations.filter((r) => String(r.eventId) === String(eventId));
  const present = list.filter((r) => r.present).length;
  const rate = list.length ? Math.round((present / list.length) * 100) : 0;

  return (
    <>
      <h1>Suivi des présences</h1>
      <label className="field">
        <span>Événement</span>
        <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
        </select>
      </label>
      <p>Présents : <strong>{present}</strong> / {list.length} ({rate}%)</p>
      <table>
        <thead><tr><th>Nom</th><th>E-mail</th><th>Présent</th></tr></thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td><input type="checkbox" checked={r.present} onChange={() => togglePresence(r.id)} aria-label={`Présence de ${r.name}`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {!list.length && <p>Aucun inscrit pour cet événement.</p>}
    </>
  );
}
