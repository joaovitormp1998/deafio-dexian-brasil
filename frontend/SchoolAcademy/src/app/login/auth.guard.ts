import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true; // Permitir a navegação se o token estiver presente
    } else {
      this.router.navigate(['/login']); // Redirecionar para a página de login se o token não estiver presente
      return false;
    }
  }
}
