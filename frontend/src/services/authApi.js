const TOKEN_KEY = 'authToken';
const USER_KEY = 'currentUser';

export function getStoredUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
}

export function getToken() { return localStorage.getItem(TOKEN_KEY); }

export function saveSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem('isAuthenticated', 'true');
  window.dispatchEvent(new Event('auth-change'));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('isAuthenticated');
  window.dispatchEvent(new Event('auth-change'));
}

async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}), ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export async function loginUser({ email, password, role }) {
  const data = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password, role }) });
  saveSession(data);
  return data.user;
}

export async function registerUser({ name, email, password, department, role, domains }) {
  const data = await request('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, department, role, domains }) });
  saveSession(data);
  return data.user;
}

export async function getCurrentUser() {
  const data = await request('/api/auth/me');
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export async function updateFacultyDomains(domains) {
  const data = await request('/api/faculty/domains', { method: 'PUT', body: JSON.stringify({ domains }) });
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  window.dispatchEvent(new Event('auth-change'));
  return data.user;
}

export async function updateFacultyProfile(profile) {
  const data = await request('/api/faculty/profile', { method: 'PUT', body: JSON.stringify(profile) });
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  window.dispatchEvent(new Event('auth-change'));
  return data.user;
}

export async function getStudentProfile() { return request('/api/student-profile'); }
export async function saveStudentProfile(profile) { return request('/api/student-profile', { method: 'PUT', body: JSON.stringify(profile) }); }
