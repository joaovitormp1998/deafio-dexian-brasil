namespace ApiAlunos.Models
{
    public class Escola
    {
        public int iCodEscola { get; set; }
        public string sDescricao { get; set; }
        
        public Escola()
        {
            sDescricao = "";
        }
    }
}
