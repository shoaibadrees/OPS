using System.ComponentModel.DataAnnotations;

namespace OPS.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}