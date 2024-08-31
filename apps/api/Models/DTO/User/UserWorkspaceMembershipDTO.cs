namespace Align.Models;

public record UserWorkspaceMembershipDTO
{
    public required WorkspaceMemberRole Role { get; init; }
    public required DateTime JoinedAt { get; init; }
    public required WorkspaceDTO Workspace { get; init; }

    public static UserWorkspaceMembershipDTO Create(WorkspaceMember workspaceMember, WorkspaceDTO workspace)
    {
        return new()
        {
            Role = workspaceMember.Role,
            JoinedAt = workspaceMember.JoinedAt,
            Workspace = workspace
        };
    }
}