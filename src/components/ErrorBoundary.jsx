import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <h1>Oups, une erreur est survenue</h1>
          <p>{this.state.error.message}</p>
          <button onClick={() => window.location.assign('/')}>Retour à l'accueil</button>
        </div>
      );
    }
    return this.props.children;
  }
}
