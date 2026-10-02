using System.ComponentModel.DataAnnotations;

namespace EventEase.Models;

public class EventItem
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Le titre est obligatoire.")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Le titre doit contenir entre 3 et 100 caractères.")]
    public string Title { get; set; } = "";

    [Required(ErrorMessage = "La date est obligatoire.")]
    public DateTime? Date { get; set; }

    [Required(ErrorMessage = "Le lieu est obligatoire.")]
    [StringLength(100, ErrorMessage = "Le lieu est trop long (100 max).")]
    public string Location { get; set; } = "";

    [Range(1, 10000, ErrorMessage = "La capacité doit être comprise entre 1 et 10000.")]
    public int Capacity { get; set; } = 50;

    [StringLength(500, ErrorMessage = "La description est trop longue (500 max).")]
    public string Description { get; set; } = "";

    public EventItem Clone() => (EventItem)MemberwiseClone();
}
