import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Aluno } from '../alunos.model';
import { Escola } from '../escolas.model';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(private http: HttpClient) { }

  // Método para recuperar os alunos da API
  getAlunosFromAPI(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>('https://localhost:7209/api/Alunos');
  }

  excluirAluno(id: number): Promise<boolean> {
    return this.http.delete<HttpResponse<any>>(`https://localhost:7209/api/Alunos/${id}`)
      .toPromise()
      .then(response => {
        console.log(response);
        if (response?.status === 200) {
          return true; // Aluno excluído com sucesso
        } else {
          return Promise.reject(new Error('Falha ao excluir aluno'));
        }
      })
      .catch(error => {
        console.error('Erro ao excluir aluno:', error);
        return Promise.reject(error);
      });
  }
  
  
  // Método para criar um novo aluno
  criarAluno(aluno: Aluno): Observable<Aluno> {

    // return
    return this.http.post<Aluno>('https://localhost:7209/api/Alunos', aluno);
  }

  // Método para atualizar um aluno existente
  atualizarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`https://localhost:7209/api/Alunos/${aluno.iCodAluno}`, aluno);
  }
  // Método para recuperar as escolas da API
  getEscolasFromAPI(): Observable<Escola[]> {
    return this.http.get<Escola[]>('https://localhost:7209/api/Escolas');
  }
}
