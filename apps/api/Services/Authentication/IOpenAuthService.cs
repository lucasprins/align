namespace Tenet.Services;

public interface IOpenAuthService
{
    public Task<OpenAuthLoginResult> HandleDiscordLogin(HttpContext httpContext);
}