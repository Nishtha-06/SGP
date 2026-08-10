import { getToken } from './authApi';

async function studentRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      Authorization: `Bearer ${getToken() || ''}`,
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Student request failed.');
  return payload;
}

export async function getStudentWorkspace() {
  const [{ user, profile }, { group }, { submissions }, { reviews }] = await Promise.all([
    studentRequest('/api/student-profile'),
    studentRequest('/api/groups/me'),
    studentRequest('/api/submissions'),
    studentRequest('/api/student/reviews'),
  ]);
  return { user, profile, group, submissions, reviews };
}

export async function getStudentDocuments(projectId) {
  return studentRequest(`/api/submissions/${projectId}/documents`);
}

export async function uploadStudentDocuments(projectId, files, documentType) {
  const formData = new FormData();
  files.forEach((file) => formData.append('documents', file));
  formData.append('documentType', documentType);
  return studentRequest(`/api/submissions/${projectId}/documents`, { method: 'POST', body: formData });
}

export async function resubmitStudentProject(projectId, project) {
  return studentRequest(`/api/submissions/${projectId}/resubmit`, { method: 'PATCH', body: JSON.stringify({ project }) });
}
