using Microsoft.AspNetCore.Mvc;

namespace ApiAlunos.Controllers
{
    [ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            var response = new
            {
                message = "Bem-vindo à API de Alunos!",
                documentation_url = "https://localhost:7209/api/docs"
            };
            return Ok(response);
        }
    }
}
