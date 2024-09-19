using System.Security.Claims;

namespace Align.Services;

public interface IAuthenticationService
{
    Task<UserDTO?> Login(ClaimsPrincipal user);
    Task<bool> Login(LoginRequestDTO loginRequest);
    Task Logout();
    Task<RegistrationResult> Register(RegisterRequestDTO registerRequest);
}