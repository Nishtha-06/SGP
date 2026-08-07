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
