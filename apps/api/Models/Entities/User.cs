using Microsoft.AspNetCore.Identity;

namespace Tenet.Models;

public class User : IdentityUser<Guid>
// , IDateAuditable
{
    public string? AvatarUrl { get; set; }
    // public DateTime CreatedAt { get; set; }
    // public DateTime UpdatedAt { get; set; }

    [PersonalData]
    public string? FullName { get; set; }

    public ICollection<Workspace> Workspaces { get; set; } = [];
}