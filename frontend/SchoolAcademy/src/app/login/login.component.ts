import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  public formAuth: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formAuth = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    sessionStorage.removeItem('token');

   }

  submitForm() {
    if (this.formAuth.valid) {
        const username = this.formAuth.get('username')?.value;
        const password = this.formAuth.get('password')?.value;
        if (username === 'TESTE' && password === '123') {
            // Lógica de autenticação bem-sucedida

            // Criar um token simples (pode ser gerado de forma mais segura em um aplicativo real)
            const token = 'token_gerado_aqui';

            // Armazenar o token na sessionStorage
            sessionStorage.setItem('token', token);

            // Redirecionar para a página principal
            this.redirectToMainPage();
        } else {
            // Caso haja campos inválidos, você pode tratar de acordo com sua lógica
            alert('Usuário ou senha inválidos');
        }
    }
}


  redirectToMainPage() {
    this.router.navigate(['/alunos']);
  }
}
