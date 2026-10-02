using System.ComponentModel.DataAnnotations;

namespace EventEase.Models;

public class Registration
{
    public int Id { get; set; }
    public int EventId { get; set; }

    [Required(ErrorMessage = "Le nom est obligatoire.")]
    [StringLength(80, MinimumLength = 2, ErrorMessage = "Le nom doit contenir entre 2 et 80 caractères.")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "L'e-mail est obligatoire.")]
    [EmailAddress(ErrorMessage = "Adresse e-mail invalide.")]
    public string Email { get; set; } = "";

    [RegularExpression(@"^$|^[0-9+\s().\-]{8,20}$", ErrorMessage = "Numéro de téléphone invalide.")]
    public string Phone { get; set; } = "";

    public bool Present { get; set; }
}
