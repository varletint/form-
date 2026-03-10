const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/responses";
// You can switch the baseUrl below to point to /api/mongo/responses if you want to test mongo.
// For now, we are defaulting to Postgres.

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const fetchClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = {};
  }

  if (!response.ok) {
    // Standardize error handling
    throw new Error(data.message || data.error || "API Request Failed");
  }

  return data;
};
