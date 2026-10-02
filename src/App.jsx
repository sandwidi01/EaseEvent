import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Chargement différé des pages (code splitting) pour de meilleures performances.
const Home = lazy(() => import('./pages/Home.jsx'));
const Events = lazy(() => import('./pages/Events.jsx'));
const EventDetail = lazy(() => import('./pages/EventDetail.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Attendance = lazy(() => import('./pages/Attendance.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Suspense fallback={<p>Chargement…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events/:id/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
