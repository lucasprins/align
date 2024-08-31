namespace Align.Models;

public record UserDTO
{
    public required Guid Id { get; init; }
    public required string? Email { get; init; }
    public required string? AvatarUrl { get; init; }
    public required string? UserName { get; init; }
    public required string? FullName { get; init; }
    public required IEnumerable<UserWorkspaceMembershipDTO> WorkspaceMemberships { get; init; }

    public static UserDTO Create(User user, IEnumerable<UserWorkspaceMembershipDTO> workspaceMemberships)
    {
        return new()
        {
            Id = user.Id,
            Email = user.Email,
            AvatarUrl = user.AvatarUrl,
            UserName = user.UserName,
            FullName = user.FullName,
            WorkspaceMemberships = workspaceMemberships,
        };
    }
}