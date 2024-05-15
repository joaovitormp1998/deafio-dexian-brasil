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

            return new Aluno
            {
                iCodAluno = id,
                sNome = "Aluno " + id,
            };
        }

    }
}
