namespace Tenet.Models;

public record WorkspaceDTO
{
    public required Guid Id { get; set; }
    public required string Name { get; init; }
    public required string Url { get; init; }
    public string? LogoUrl { get; init; }

    public static WorkspaceDTO Create(Workspace workspace)
    {
        return new()
        {
            Id = workspace.Id,
            Name = workspace.Name,
            Url = workspace.Url,
            LogoUrl = workspace.LogoUrl
        };
    }
}