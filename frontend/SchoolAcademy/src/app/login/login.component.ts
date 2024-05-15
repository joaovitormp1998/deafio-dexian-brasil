import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [ MessageService]

})
export class LoginComponent implements OnInit {

  public formAuth: FormGroup;

  constructor(
    private messageService: MessageService,
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
        
            const token = 'token_gerado_aqui';

            sessionStorage.setItem('token', token);

            this.redirectToMainPage();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Falha', detail: 'Falha ao Logar' });
           
        }
    }
}


  redirectToMainPage() {
    this.router.navigate(['/alunos']);
  }
}
