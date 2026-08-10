import { getToken } from './authApi';

async function facultyRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken() || ''}`,
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Faculty request failed.');
  return payload;
}

export async function getFacultyProjects() {
  const [{ submissions }, reviews] = await Promise.all([
    facultyRequest('/api/submissions'),
    facultyRequest('/api/reviews'),
  ]);
  return { submissions, reviews: reviews.submissions || [] };
}

export async function reviewFacultyProject(projectId, decision, comment = '', marks) {
  const endpoint = decision === 'APPROVED' ? 'approve' : 'request-revision';
  return facultyRequest(`/api/reviews/${projectId}/${endpoint}`, {
    method: 'PATCH',
    body: JSON.stringify({ comment, marks }),
  });
}

export async function getProjectDocuments(projectId) {
  return facultyRequest(`/api/submissions/${projectId}/documents`);
}
