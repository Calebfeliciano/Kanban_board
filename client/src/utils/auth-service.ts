import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  private tokenKey = 'id_token';

  getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload & { exp: number }>(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  login(idToken: string, navigate: (path: string) => void): void {
    localStorage.setItem(this.tokenKey, idToken);
    navigate('/');
  }

  logout(navigate: (path: string) => void): void {
    localStorage.removeItem(this.tokenKey);
    navigate('/login');
  }
}

export default new AuthService();

