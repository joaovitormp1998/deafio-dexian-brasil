import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly mockUsername: string = 'TESTE';
  private readonly mockPassword: string = '1234';

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username === this.mockUsername && password === this.mockPassword) {
      // Simular sucesso na autenticação
      localStorage.setItem('isLoggedIn', 'true');
      return of(true);
    } else {
      // Simular falha na autenticação
      return of(false);
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
  