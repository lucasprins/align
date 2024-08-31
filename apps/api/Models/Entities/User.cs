using Microsoft.AspNetCore.Identity;

namespace Align.Models;

public class User : IdentityUser<Guid>
{
    public string? AvatarUrl { get; set; }

    [PersonalData]
    public string? FullName { get; set; }

    public ICollection<Workspace> Workspaces { get; set; } = [];
    public ICollection<WorkspaceMember> WorkspaceMemberships { get; set; } = [];
}