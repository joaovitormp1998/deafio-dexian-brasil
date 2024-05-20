using System.Collections.Generic;
using System.Linq;
using ApiAlunos.Models;

namespace ApiAlunos.Services
{
    public class EscolaService
    {
        private readonly List<Escola> _escolas;

        public EscolaService()
        {
            // Dados iniciais em memória
            _escolas = new List<Escola>
            {
                new Escola { iCodEscola = 1, sDescricao = "Escola Primária Central" },
                new Escola { iCodEscola = 2, sDescricao = "Escola Secundária Estadual" }
            };
        }

        public List<Escola> GetEscolas()
        {
            return _escolas;
        }

        public Escola GetEscola(int id)
        {
            return _escolas.FirstOrDefault(e => e.iCodEscola == id);
        }

        public void AddEscola(Escola escola)
        {
            escola.iCodEscola = _escolas.Max(e => e.iCodEscola) + 1;
            _escolas.Add(escola);
        }

        public void UpdateEscola(Escola escola)
        {
            var existingEscola = _escolas.FirstOrDefault(e => e.iCodEscola == escola.iCodEscola);
            if (existingEscola != null)
            {
                existingEscola.sDescricao = escola.sDescricao;
            }
        }

        public void DeleteEscola(int id)
        {
            var escola = _escolas.FirstOrDefault(e => e.iCodEscola == id);
            if (escola != null)
            {
                _escolas.Remove(escola);
            }
        }

    }
}
