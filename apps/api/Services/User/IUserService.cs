using System.Security.Claims;

namespace Align.Services;

public interface IUserService
{
    Task<UserDTO?> Get(ClaimsPrincipal user);
    Task<UserDTO?> GetByEmail(string email);
    Task<bool> EmailExists(string email);
}