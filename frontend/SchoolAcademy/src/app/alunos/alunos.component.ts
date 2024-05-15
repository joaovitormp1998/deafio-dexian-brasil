import { Component, OnInit } from '@angular/core';
import { AlunosService } from './services/alunos.service';
import { Aluno } from './alunos.model';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Escola } from './escolas.model';
import * as moment from 'moment';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
  providers: [ConfirmationService, MessageService]


})
export class AlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  aluno: Aluno;
  currentPage: number = 1;
  rowsPerPage: number = 10;
  alunoId:number=0;
  escolas: Escola[] = []; 
  selectedEscola: Escola; 
  items: MenuItem[] = [];
  alunosFiltrados: Aluno[] = [];
  searchQuery: string = '';
  displayModal: boolean = false;
  displayConfirmation: boolean = false;
  modoEdicao: boolean = false; 
  constructor(private alunosService: AlunosService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.aluno = {} as Aluno;
    this.selectedEscola = {} as Escola;
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
    this.carregarAlunosDaAPI();
    this.carregarEscolasDaAPI();

  }
  formatarAluno(alunoData: any): Aluno {
    if (this.modoEdicao) {
        return {
            iCodAluno:this.alunoId,
            sNome: alunoData.nomeEdit,
            dNascimento: alunoData.dataNascimentoEdit,
            sCPF: alunoData.cpfEdit,
            sEndereco: alunoData.enderecoEdit,
            sCelular: alunoData.celularEdit,
            iCodEscola: alunoData.iCodEscolaEdit 
        };
    } else {
        
        return {
          iCodAluno: 0, 
          sNome: alunoData.nome,
          dNascimento: alunoData.dataNascimento,
          sCPF: alunoData.cpf,
          sEndereco: alunoData.endereco,
          sCelular: alunoData.celular,
          iCodEscola: alunoData.iCodEscola 
        };
    }
}

  salvarAluno(formAluno: any) {
    console.log(formAluno);
    const alunoData = this.formatarAluno(formAluno.form.value);
    console.log(alunoData);
    if (this.modoEdicao) {

      this.alunosService.atualizarAluno(alunoData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno atualizado com sucesso' });
          this.displayModal = false;
          this.carregarAlunosDaAPI();
        },
        error => {
          console.error('Erro ao atualizar aluno:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar aluno' });
        }
      );

    } else {
      this.alunosService.criarAluno(alunoData).subscribe(
        novoAluno => {
          this.alunos.push(novoAluno);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno criado com sucesso' });
          this.carregarAlunosDaAPI();
          this.displayModal = false;

        },
        error => {
          console.error('Erro ao criar novo aluno:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar novo aluno' });
        }
      );
    }
  }


  carregarAlunosDaAPI() {
    this.alunosService.getAlunosFromAPI().subscribe(
      alunos => {
        this.alunos = alunos;
        this.alunosFiltrados = [...this.alunos]; 
      },
      error => {
        console.log('Erro ao carregar alunos:', error);
      }
    );
  }
  confirm(aluno: Aluno) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja prosseguir? Ação não poderá ser desfeita.',
      header: 'Excluir ' + aluno.sNome,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Aluno excluido com sucesso' });

        this.alunosService.excluirAluno(aluno.iCodAluno)
          .then(() => {
            console.log('Aluno excluído com sucesso!');
            this.carregarAlunosDaAPI();

          })
          .catch(error => {
            console.error('Erro ao excluir aluno:', error);
          });
          this.carregarAlunosDaAPI();

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
    this.alunosService.getEscolasFromAPI().subscribe(
      escolas => {
        this.escolas = escolas;
      },
      error => {
        console.log('Erro ao carregar escolas:', error);
      }
    );
  }
  search() {
    if (this.searchQuery) {
      const searchValue = this.searchQuery;

      const cpfFormatado = searchValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); 

      this.alunosFiltrados = this.alunos.filter(aluno => {
        // Verificar se o nome ou o CPF correspondem à consulta
        const nomeMatch = aluno.sNome.toLowerCase().includes(this.searchQuery.toLowerCase());
        const cpfMatch = aluno.sCPF.includes(searchValue) || aluno.sCPF.includes(cpfFormatado);

        return nomeMatch || cpfMatch;
      });
    } else {
      this.alunosFiltrados = [...this.alunos]; 
    }
  }

  cancelar() {
    this.displayModal = false;
    this.modoEdicao = false;

  }

  limpar(){
    this.aluno = {} as Aluno

  }
  novoAluno() {
    this.displayModal = true;
    this.modoEdicao = false;
    this.limpar();

  }
  editarAluno(aluno: Aluno) {
    this.aluno = { ...aluno };
    this.alunoId = aluno.iCodAluno;
    this.displayModal = true;
    this.modoEdicao = true;
}

  
  excluirAluno(aluno: Aluno) {
    this.confirm(aluno);
  }
  onBlur() {
    this.search();
  }

}
