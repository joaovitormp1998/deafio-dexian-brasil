using Xunit;
using ApiAlunos.Models;
using ApiAlunos.Services; // Adicionando referência ao namespace ApiAlunos.Services

namespace ApiAlunos.Tests.Unit.Alunos
{
    public class AlunoServiceTests
    {
        [Fact]
        public void CreateAluno()
        {
            var alunoService = new AlunoService();
            var aluno = new Aluno
            {
                // Inicialização das propriedades
                sNome = "Aluno Teste",
                sCPF = "123.456.132-34",
                sEndereco = "Rua teste",
                sCelular = "24981389459"
            };

            // Act
            var resultado = alunoService.CreateAluno(aluno);

            // Assert
            Assert.NotNull(resultado);
        }
    }
}
