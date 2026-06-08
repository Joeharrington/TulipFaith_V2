const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── Public ────────────────────────────────────────────────────────────────────

export async function getPrayers() {
  const res = await fetch(`${API}/api/prayers`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function submitPrayer({ content, name, is_anonymous, category }) {
  const res = await fetch(`${API}/api/prayers`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ content, name, is_anonymous, category }),
  });
  return res.json();
}

export async function getPrayerCategories() {
  const res = await fetch(`${API}/api/prayer/categories`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function getHome() {
  const res = await fetch(`${API}/api/home`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function getPrayerSession() {
  const res = await fetch(`${API}/api/prayer/session`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function apiRegister({ email, password, display_name }) {
  const res = await fetch(`${API}/api/auth/register`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password, display_name }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function apiLogin({ email, password }) {
  const res = await fetch(`${API}/api/auth/login`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function apiMe(token) {
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

// ── Journal ───────────────────────────────────────────────────────────────────

export async function getJournal(token) {
  const res = await fetch(`${API}/api/journal`, {
    headers: { Authorization: `Bearer ${token}` },
    cache:   'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export async function createJournalEntry(token, { title, scripture, body }) {
  const res = await fetch(`${API}/api/journal`, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify({ title, scripture, body }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function deleteJournalEntry(token, id) {
  const res = await fetch(`${API}/api/journal/${id}`, {
    method:  'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}
