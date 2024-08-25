namespace Tenet.Models;

public class WorkspaceCreateDTO
{
    public required string Name { get; set; }
    public required string Url { get; set; }
    public string? LogoUrl { get; set; }
}