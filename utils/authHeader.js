export default function authHeader() {
  const token = localStorage.getItem('token');

  if (token) {
    return { 'x-auth-token': token };
  } else {
    return {};
  }
}