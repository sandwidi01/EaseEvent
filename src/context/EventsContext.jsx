import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { initialEvents } from '../data.js';

const EventsContext = createContext(null);
const KEY = 'eventease.state';

function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && Array.isArray(saved.events)) return saved;
  } catch { /* ignore */ }
  return { events: initialEvents, registrations: [] };
}

// registrations: { id, eventId, name, email, phone, present }
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, { ...action.event, id: Date.now() }] };
    case 'UPDATE_EVENT':
      return { ...state, events: state.events.map((e) => (e.id === action.id ? { ...e, ...action.changes } : e)) };
    case 'DELETE_EVENT':
      return {
        events: state.events.filter((e) => e.id !== action.id),
        registrations: state.registrations.filter((r) => r.eventId !== action.id)
      };
    case 'REGISTER':
      return { ...state, registrations: [...state.registrations, { ...action.registration, id: Date.now(), present: false }] };
    case 'TOGGLE_PRESENCE':
      return {
        ...state,
        registrations: state.registrations.map((r) => (r.id === action.id ? { ...r, present: !r.present } : r))
      };
    default:
      return state;
  }
}

export function EventsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const addEvent = useCallback((event) => dispatch({ type: 'ADD_EVENT', event }), []);
  const updateEvent = useCallback((id, changes) => dispatch({ type: 'UPDATE_EVENT', id, changes }), []);
  const deleteEvent = useCallback((id) => dispatch({ type: 'DELETE_EVENT', id }), []);
  const register = useCallback((registration) => dispatch({ type: 'REGISTER', registration }), []);
  const togglePresence = useCallback((id) => dispatch({ type: 'TOGGLE_PRESENCE', id }), []);

  const value = useMemo(
    () => ({ ...state, addEvent, updateEvent, deleteEvent, register, togglePresence }),
    [state, addEvent, updateEvent, deleteEvent, register, togglePresence]
  );
  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents doit être utilisé dans EventsProvider');
  return ctx;
};
