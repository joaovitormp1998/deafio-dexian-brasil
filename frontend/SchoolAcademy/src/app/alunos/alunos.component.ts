import { Component, OnInit } from '@angular/core';
import { AlunosService } from './services/alunos.service';
import { Aluno } from './alunos.model';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Escola } from './escolas.model';
import { window } from 'rxjs';

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

  escolas: Escola[] = []; // Lista de escolas
  selectedEscola: Escola; // Escola selecionada
  items: MenuItem[] = [];
  alunosFiltrados: Aluno[] = []; // Lista de alunos após filtragem
  searchQuery: string = ''; // String de pesquisa
  displayModal: boolean = false; // Variável para controlar a exibição do modal de criação / edição
  displayConfirmation: boolean = false; // Variável para controlar a exibição do modal de criação / edição
  modoEdicao: boolean = false; // Variável para controlar o modo de edição
  constructor(private alunosService: AlunosService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.aluno = {} as Aluno; // Inicializando a propriedade aluno no construtor
    this.selectedEscola = {} as Escola; // Inicializando a propriedade aluno no construtor
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
    return {
      iCodAluno: 0, // Ou deixe undefined se o serviço atribuir o ID
      sNome: alunoData.nome,
      dNascimento: alunoData.dataNascimento,
      sCPF: alunoData.cpf,
      sEndereco: alunoData.endereco,
      sCelular: alunoData.celular,
      iCodEscola: alunoData.iCodEscola // Ou deixe undefined se a escola for atribuída posteriormente
    };
  }
  salvarAluno(formAluno: any) {
    const alunoData = this.formatarAluno(formAluno.form.value);
    // console.log(alunoData);
    if (this.modoEdicao) {
      // Lógica para atualizar aluno
    } else {
      this.alunosService.criarAluno(alunoData).subscribe(
        novoAluno => {
          // Adicionar novo aluno à lista local
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


  // Método para carregar alunos da API
  carregarAlunosDaAPI() {
    // alert("FUncao chamada");
    this.alunosService.getAlunosFromAPI().subscribe(
      alunos => {
        this.alunos = alunos;
        this.alunosFiltrados = [...this.alunos]; // Inicializa a lista filtrada
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
  // Método para carregar escolas da API
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

      const cpfFormatado = searchValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formatar o CPF

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
    this.aluno = { ...aluno }; // Copiar os detalhes do aluno selecionado para o formulário
    // this.selectedEscola = this.escolas!.find(escola => escola.iCodEscola === aluno.iCodEscola); // Selecionar a escola correspondente ao aluno
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
