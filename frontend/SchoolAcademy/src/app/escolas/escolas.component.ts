import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { window } from 'rxjs';
import { Escola } from '../alunos/escolas.model';
import { EscolasService } from './services/escolas.service';

@Component({
  selector: 'app-escolas',
  templateUrl: './escolas.component.html',
  styleUrls: ['./escolas.component.scss'],
  providers: [ConfirmationService, MessageService]


})
export class EscolasComponent implements OnInit {
  escola: Escola;
  escolas: Escola[] = []; 
  selectedEscola: Escola; 
  items: MenuItem[] = [];
  escolasFiltrados: Escola[] = []; 
  searchQuery: string = ''; 
  displayModal: boolean = false;
  displayConfirmation: boolean = false;
  modoEdicao: boolean = false;
  constructor(
    private escolasService: EscolasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    this.escola = {} as Escola; // Inicializando a propriedade escola no construtor
    this.selectedEscola = {} as Escola; // Inicializando a propriedade escola no construtor
    this.items = [
      {
        label: 'Alunos',
        routerLink: '/alunos'
      },
      {
        label: 'Escolas',
        routerLink: '/escolas'
      },
      {
        label: 'Sair',
        routerLink: '/'
      }
    ];
  }

  ngOnInit(): void {
    this.carregarEscolasDaAPI();

  }
  formatarAluno(alunoData: any): Escola {
    return {
      iCodEscola: alunoData.iCodEscola,
      sDescricao:alunoData.sDescricao
    };
  }
  salvarAluno(formAluno: any) {
    const alunoData = this.formatarAluno(formAluno.form.value);
    // console.log(alunoData);
    if (this.modoEdicao) {
      // Lógica para atualizar escola
    } else {
      
  }
}


  confirm(escola: Escola) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja prosseguir? Ação não poderá ser desfeita.',
      header: 'Excluir ' + escola.sDescricao,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Escola excluido com sucesso' });

   
        this.carregarEscolasDaAPI();

      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Você rejeitou' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Você cancelou' });
            break;
        }
      }
    });
  }  // Método para carregar escolas da API

  // Método para carregar escolas da API
  carregarEscolasDaAPI() {
    console.log('Funcao foi chamada sim');
    this.escolasService.getEscolasFromAPI().subscribe(
      escolas => { // Corrigido aqui
        this.escolas = escolas; // Corrigido aqui
        this.escolasFiltrados = [...this.escolas]; // Inicializa a lista filtrada
      },
      error => {
        console.log('Erro ao carregar escolas:', error);
      }
    );
  }
  
  // Método para pesquisar escolas
  search() {
   
  }
  novaEscola() {
    this.displayModal = true;
  }
  // Método para editar um escola
  editarEscola(escola: Escola) {
    // Implemente a lógica para editar o escola aqui
    console.log('Editar escola:', escola);
  }

  excluirEscola(escola: Escola) {
    // Exibe a caixa de diálogo de confirmação antes de excluir o escola
    this.confirm(escola);
  }

}
