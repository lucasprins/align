namespace Tenet.Services;

public interface IAuthenticationService
{
    Task<bool> Login(LoginRequest loginRequest);
    Task Logout(HttpContext httpContext);
    Task Register(RegisterRequest registerRequest);
}