export async function generateRecommendations(preferences, signal) {
  let response;
  try {
    response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('Recommendation server is not running. Start it with: npm run dev', { cause: error });
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Unable to generate recommendations.');
  }

  return payload.projects;
}

export async function submitProjectProposal(project) {
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('authToken') || ''}` },
    body: JSON.stringify({ project }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Unable to submit this project proposal.');
  return payload.submission;
}

export async function uploadProjectProposal(projectId, proposal) {
  const formData = new FormData();
  formData.append('documents', proposal);
  formData.append('documentType', 'SRS');
  formData.append('proposalUpload', 'true');

  const response = await fetch(`/api/submissions/${projectId}/documents`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken') || ''}` },
    body: formData,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Unable to upload this project proposal.');
  return payload.documents;
}
