import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { SessionProvider } from './context/SessionContext.jsx';
import { EventsProvider } from './context/EventsContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <SessionProvider>
          <EventsProvider>
            <App />
          </EventsProvider>
        </SessionProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
