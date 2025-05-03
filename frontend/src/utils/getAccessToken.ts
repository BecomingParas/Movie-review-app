export function getAccessToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
}
