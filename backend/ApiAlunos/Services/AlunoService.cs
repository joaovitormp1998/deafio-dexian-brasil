using ApiAlunos.Models;

namespace ApiAlunos.Services
{
    public class AlunoService
    {
        public Aluno CreateAluno(Aluno aluno)
        {
              return aluno;
        }

        public Aluno GetAlunoById(int id)
        {
            // Aqui você implementaria a lógica para obter um aluno pelo seu ID
            // Por exemplo, buscar o aluno no banco de dados
            // Neste exemplo simples, apenas retornamos um aluno fictício com o ID fornecido
            return new Aluno
            {
                iCodAluno = id,
                sNome = "Aluno " + id,
            };
        }

    }
}
