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
  escolasFiltradas: Escola[] = [];
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
  formatarEscola(escolaData: any): Escola {
    return {
      iCodEscola: escolaData.iCodEscola || 0,
      sDescricao: escolaData.sDescricao
    };
  }
  salvarEscola(formEscola: any) {
    const escolaData = this.formatarEscola(formEscola.form.value);
    if (this.modoEdicao) {
      this.escolasService.atualizarEscola(escolaData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Escola atualizada com sucesso' });
          this.displayModal = false;
          this.carregarEscolasDaAPI();
        },
        error => {
          console.error('Erro ao atualizar escola:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar escola' });
        }
      );

    } else {
      this.escolasService.criarEscola(escolaData).subscribe(
        novaEscola => {
          // Adicionar nova escola à lista local
          this.escolas.push(novaEscola);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Escola criada com sucesso' });
          this.carregarEscolasDaAPI();
          this.displayModal = false;
        },
        error => {
          console.error('Erro ao criar nova escola:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar nova escola' });
        }
      );
    }
  }



  confirm(escola: Escola) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja prosseguir? Ação não poderá ser desfeita.',
      header: 'Excluir ' + escola.sDescricao,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Escola excluida com sucesso' });

        this.escolasService.excluirEscola(escola.iCodEscola)
        .then(() => {
          this.carregarEscolasDaAPI();
        })
        .catch(error => {
          console.error('Erro ao excluir aluno:', error);
        });

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
  }
  carregarEscolasDaAPI() {
    this.escolasService.getEscolasFromAPI().subscribe(
      escolas => {
        this.escolas = escolas;
        this.escolasFiltradas = [...this.escolas];
      },
      error => {
      }
    );
  }

  search() {
    if (this.searchQuery) {
      const searchValue = this.searchQuery;
      this.escolasFiltradas = this.escolas.filter(escola => {
        const nomeMatch = escola.sDescricao.toLowerCase().includes(this.searchQuery.toLowerCase());
        return nomeMatch;
      });
    } else {
      this.escolasFiltradas = [...this.escolas];
    }
  }

  limpar() {
    this.escola = {} as Escola

  }
  cancelar() {
    this.displayModal = false;
    this.modoEdicao = false;
    this.limpar();
  }


  novaEscola() {
    this.displayModal = true;
    this.modoEdicao = false;
    this.limpar();

  }
  // Método para editar um escola
  editarEscola(escola: Escola) {
    this.escola = { ...escola };
    this.displayModal = true;
    this.modoEdicao = true;
  }


  excluirEscola(escola: Escola) {
    this.confirm(escola);
  }
  onBlur() {
    this.search();
  }
}
