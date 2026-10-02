// Validation centralisée des entrées (événements et inscriptions).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEvent({ title, date, location, capacity }) {
  const errors = {};
  if (!title || title.trim().length < 3) errors.title = 'Le titre doit contenir au moins 3 caractères.';
  if (!date) errors.date = 'La date est obligatoire.';
  if (!location || !location.trim()) errors.location = 'Le lieu est obligatoire.';
  const cap = Number(capacity);
  if (!Number.isInteger(cap) || cap < 1 || cap > 10000) errors.capacity = 'La capacité doit être un entier entre 1 et 10000.';
  return errors;
}

export function validateRegistration({ name, email, phone }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Le nom doit contenir au moins 2 caractères.';
  if (!email || !EMAIL_RE.test(email.trim())) errors.email = 'Adresse e-mail invalide.';
  if (phone && !/^[0-9+\s().-]{8,20}$/.test(phone)) errors.phone = 'Numéro de téléphone invalide.';
  return errors;
}
