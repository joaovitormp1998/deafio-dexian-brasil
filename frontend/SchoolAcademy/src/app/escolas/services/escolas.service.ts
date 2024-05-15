import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Escola } from '../../alunos/escolas.model';

@Injectable({
  providedIn: 'root'
})
export class EscolasService {

  constructor(private http: HttpClient) { }

  
  excluirEscola(id: number): Promise<boolean> {
    return this.http.delete<HttpResponse<any>>(`https://localhost:7209/api/Escolas/${id}`)
      .toPromise()
      .then(response => {
        if (response?.status === 200) {
          return true; 
        } else {
          return true; 
        }
      })
      .catch(error => {
        console.error('Erro ao excluir escola:', error);
        return Promise.reject(error);
      });
  }
  
  
  // Método para criar um novo escola
  criarEscola(escola: Escola): Observable<Escola> {

    // return
    return this.http.post<Escola>('https://localhost:7209/api/Escolas', escola);
  }

  // Método para atualizar um escola existente
  atualizarEscola(escola: Escola): Observable<Escola> {
    return this.http.put<Escola>(`https://localhost:7209/api/Escolas/${escola.iCodEscola}`, escola);
  }
  // Método para recuperar as escolas da API
  getEscolasFromAPI(): Observable<Escola[]> {
    return this.http.get<Escola[]>('https://localhost:7209/api/Escolas');
  }
}
