namespace Align.Models;

public class Workspace : Entity
{
    public required string Name { get; set; }
    public required string Url { get; set; }
    public string? LogoUrl { get; set; }

    public ICollection<User> Users { get; set; } = [];
    public ICollection<WorkspaceMember> WorkspaceMembers { get; set; } = [];
}