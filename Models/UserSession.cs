using System.ComponentModel.DataAnnotations;

namespace EventEase.Models;

public class UserSession
{
    [Required(ErrorMessage = "Le nom est obligatoire.")]
    [StringLength(80, MinimumLength = 2, ErrorMessage = "Le nom doit contenir entre 2 et 80 caractères.")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "L'e-mail est obligatoire.")]
    [EmailAddress(ErrorMessage = "Adresse e-mail invalide.")]
    public string Email { get; set; } = "";
}
