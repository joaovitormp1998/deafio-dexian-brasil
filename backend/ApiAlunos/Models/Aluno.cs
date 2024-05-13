using System;

namespace ApiAlunos.Models
{
    public class Aluno
    {
        public int iCodAluno { get; set; }
        public string sNome { get; set; }
        public DateTime dNascimento { get; set; }
        public string sCPF { get; set; }
        public string sEndereco { get; set; }
        public string sCelular { get; set; }
        public int iCodEscola { get; set; }

        // Construtor da classe
        public Aluno()
        {
            // Inicialização das propriedades
            sNome = "";
            sCPF = "";
            sEndereco = "";
            sCelular = "";
        }
    }
}
