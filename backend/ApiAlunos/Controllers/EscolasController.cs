using Microsoft.AspNetCore.Mvc;
using ApiAlunos.Models;
using System.Collections.Generic;
using ApiAlunos.Services;

namespace ApiAlunos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EscolasController : ControllerBase
    {
        private readonly EscolaService _escolaService;

        public EscolasController(EscolaService escolaService)
        {
            _escolaService = escolaService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Escola>> GetEscolas()
        {
            return _escolaService.GetEscolas();
        }

        [HttpGet("{id}")]
        public ActionResult<Escola> GetEscola(int id)
        {
            var escola = _escolaService.GetEscola(id);
            if (escola == null)
            {
                return NotFound();
            }
            return escola;
        }

        [HttpPost]
        public ActionResult<Escola> PostEscola(Escola escola)
        {
            _escolaService.AddEscola(escola);
            return CreatedAtAction("GetEscola", new { id = escola.iCodEscola }, escola);
        }

        [HttpPut("{id}")]
        public IActionResult PutEscola(int id, Escola escola)
        {
            if (id != escola.iCodEscola)
            {
                return BadRequest();
            }

            var existingEscola = _escolaService.GetEscola(id);
            if (existingEscola == null)
            {
                return NotFound();
            }

            _escolaService.UpdateEscola(escola);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEscola(int id)
        {
            var escola = _escolaService.GetEscola(id);
            if (escola == null)
            {
                return NotFound();
            }

            _escolaService.DeleteEscola(id);
            return NoContent();
        }

    }
}
