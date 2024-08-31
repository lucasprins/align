using System.Security.Claims;

namespace Align.Services;

public interface IUserService
{
    Task<UserDTO?> Get(ClaimsPrincipal User);
}