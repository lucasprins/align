namespace Tenet.Models;

public class Workspace : Entity
{
    public required string Name { get; set; }
    public required string Url { get; set; }
    public string? LogoUrl { get; set; }

    public ICollection<User> Users { get; set; } = [];
}