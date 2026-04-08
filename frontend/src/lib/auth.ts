import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
  tipo_usuario: 'empresa' | 'elaborador';
}

export async function login(credentials: LoginCredentials) {
  const { data } = await api.post('/auth/login', credentials);
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export async function register(userData: RegisterData) {
  const { data } = await api.post('/auth/register', userData);
  return data;
}

export async function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
