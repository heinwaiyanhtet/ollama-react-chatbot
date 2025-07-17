import env from "react-dotenv";

export async function askBackend(prompt) {
  const response = await fetch(`${env.VITE_API_URL}/api/ask`, {
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