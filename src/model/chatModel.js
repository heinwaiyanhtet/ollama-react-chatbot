export async function askBackend(prompt) {
  const apiUrl = window.ENV?.VITE_API_URL || import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/api/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
  return data.response;
}