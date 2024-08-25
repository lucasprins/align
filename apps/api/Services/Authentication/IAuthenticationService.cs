namespace Tenet.Services;

public interface IAuthenticationService
{
    Task<bool> Login(LoginRequestDTO loginRequest);
    Task Logout();
    Task Register(RegisterRequestDTO registerRequest);
}