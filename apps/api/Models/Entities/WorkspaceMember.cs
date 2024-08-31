namespace Align.Models;

public class WorkspaceMember
{
    public required Guid WorkspaceId { get; set; }
    public required Guid UserId { get; set; }

    public required WorkspaceMemberRole Role { get; set; }
    public required DateTime JoinedAt { get; set; }

    public required User User { get; set; }
    public required Workspace Workspace { get; set; }
}