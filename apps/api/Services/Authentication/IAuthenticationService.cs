namespace Tenet.Services;

public interface IAuthenticationService
{
    Task<bool> Login(LoginRequest loginRequest);
    Task Logout();
    Task Register(RegisterRequest registerRequest);
}