export const BASE_URL = "http://127.0.0.1:8000";

export const LoginAPI = async (formData) => {
  const credentials = Object.fromEntries(formData.entries());
  const response = await fetch(`${BASE_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};

