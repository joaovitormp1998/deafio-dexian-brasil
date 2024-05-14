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

  ngOnInit(): void { }

  submitForm() {
    if (this.formAuth.valid) {
      const username = this.formAuth.get('username')?.value;
      const password = this.formAuth.get('password')?.value;
      if (username === 'TESTE' && password === '123') {
        // Aqui você pode realizar a lógica de autenticação
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
