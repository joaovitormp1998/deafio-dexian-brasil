using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ApiAlunos.Models;

namespace ApiAlunos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private static List<Aluno> _alunos = new List<Aluno>();

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_alunos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var aluno = _alunos.Find(a => a.iCodAluno == id);
            if (aluno == null)
            {
                return NotFound();
            }
            return Ok(aluno);
        }

        [HttpPost]
        public IActionResult Post(Aluno aluno)
        {
            aluno.iCodAluno = _alunos.Count + 1;
            _alunos.Add(aluno);
            return CreatedAtAction(nameof(GetById), new { id = aluno.iCodAluno }, aluno);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Aluno aluno)
        {
            var index = _alunos.FindIndex(a => a.iCodAluno == id);
            if (index == -1)
            {
                return NotFound();
            }
            _alunos[index] = aluno;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var index = _alunos.FindIndex(a => a.iCodAluno == id);
            if (index == -1)
            {
                return NotFound();
            }
            _alunos.RemoveAt(index);
            return NoContent();
        }
    }
}
