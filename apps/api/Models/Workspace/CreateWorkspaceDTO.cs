namespace Tenet.Models;

public class CreateWorkspaceDTO
{
    public required string Name { get; set; }
    public required string Url { get; set; }
    public string? LogoUrl { get; set; }
}