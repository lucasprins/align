using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Align.Services;

public class UserService(IUserRepository userRepository, UserManager<User> userManager) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<UserDTO?> Get(ClaimsPrincipal claim)
    {
        var userId = _userManager.GetUserId(claim);

        if (!string.IsNullOrEmpty(userId))
        {
            return UserDTO.MaybeCreate(await _userRepository.GetById(Guid.Parse(userId)));
        }

        return null;
    }

    public async Task<UserDTO?> GetByEmail(string email)
    {
        return UserDTO.MaybeCreate(await _userRepository.GetByEmail(email));
    }

    public Task<bool> EmailExists(string email)
    {
        return _userRepository.EmailExists(email);
    }
}