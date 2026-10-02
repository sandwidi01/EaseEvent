import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <h1>404 – Page introuvable</h1>
      <p>La page demandée n'existe pas.</p>
      <Link className="btn" to="/">Retour à l'accueil</Link>
    </>
  );
}
