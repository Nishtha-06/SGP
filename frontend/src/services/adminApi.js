import { getToken } from './authApi';

async function adminRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken() || ''}`,
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Admin request failed.');
  return payload;
}

export async function getAdminAnalytics() {
  return adminRequest('/api/admin/analytics');
}

export async function getAdminArchive() {
  return adminRequest('/api/admin/archive');
}

export async function getAdminUsers() {
  return adminRequest('/api/admin/users');
}

export async function getAiRules() {
  return adminRequest('/api/admin/ai-rules');
}

export async function updateAiRules(rules) {
  return adminRequest('/api/admin/ai-rules', {
    method: 'PUT',
    body: JSON.stringify(rules),
  });
}
