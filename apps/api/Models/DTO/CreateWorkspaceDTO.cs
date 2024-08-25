namespace Tenet.Models;

public record CreateWorkspaceDTO
{
    public required string Name { get; init; }
    public required string Url { get; init; }
    public string? LogoUrl { get; init; }
}