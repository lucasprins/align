using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Align.Services;

public class UserService(IUserRepository userRepository, UserManager<User> userManager) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<UserDTO?> Get(ClaimsPrincipal User)
    {
        var userId = _userManager.GetUserId(User);

        if (!string.IsNullOrEmpty(userId))
        {
            var user = await _userRepository.Get(Guid.Parse(userId));

            if (user != null)
            {
                var workspaceMemberShips = user.WorkspaceMemberships
                    .Select(wm => UserWorkspaceMembershipDTO.Create(wm, WorkspaceDTO.Create(wm.Workspace)));

                return UserDTO.Create(user, workspaceMemberShips);
            }
        }

        return null;
    }
}