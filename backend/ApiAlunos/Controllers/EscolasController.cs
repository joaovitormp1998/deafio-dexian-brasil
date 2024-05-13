using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ApiAlunos.Models;

namespace ApiAlunos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EscolasController : ControllerBase
    {
        private static List<Escola> _escolas = new List<Escola>();

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_escolas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var escola = _escolas.Find(e => e.iCodEscola == id);
            if (escola == null)
            {
                return NotFound();
            }
            return Ok(escola);
        }

        [HttpPost]
        public IActionResult Post(Escola escola)
        {
            escola.iCodEscola = _escolas.Count + 1;
            _escolas.Add(escola);
            return CreatedAtAction(nameof(GetById), new { id = escola.iCodEscola }, escola);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Escola escola)
        {
            var index = _escolas.FindIndex(e => e.iCodEscola == id);
            if (index == -1)
            {
                return NotFound();
            }
            _escolas[index] = escola;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var index = _escolas.FindIndex(e => e.iCodEscola == id);
            if (index == -1)
            {
                return NotFound();
            }
            _escolas.RemoveAt(index);
            return NoContent();
        }
    }
}
