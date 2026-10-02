import { NavLink, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';

export default function Navbar() {
  const { user, logout } = useSession();
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">EventEase</NavLink>
      <nav>
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/events">Événements</NavLink>
        <NavLink to="/attendance">Présences</NavLink>
      </nav>
      <div className="session">
        {user ? (
          <>
            <span>👤 {user.name}</span>
            <button className="secondary" onClick={() => { logout(); navigate('/'); }}>Déconnexion</button>
          </>
        ) : (
          <NavLink to="/login">Connexion</NavLink>
        )}
      </div>
    </header>
  );
}
