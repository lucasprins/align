using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

namespace Tenet.Services;

public class OpenAuthService(SignInManager<User> signInManager, UserManager<User> userManager) : IOpenAuthService
{
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<OpenAuthLoginResult> HandleDiscordLogin(HttpContext httpContext)
    {
        var discordProviderKey = Constants.OAUTH_PROVIDER_KEY_DISCORD;
        var authenticateResult = await httpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        if (!authenticateResult.Succeeded)
        {
            return OpenAuthLoginResult.PROVIDER_ERROR;
        }

        var claimsIdentity = authenticateResult.Principal.Identities.FirstOrDefault();

        if (claimsIdentity == null)
        {
            return OpenAuthLoginResult.PROVIDER_ERROR;
        }

        var discordAuthClaims = DiscordAuthClaims.Extract(claimsIdentity.Claims);

        if (discordAuthClaims == null)
        {
            return OpenAuthLoginResult.PROVIDER_ERROR;
        }

        var user = await _userManager.FindByLoginAsync(discordProviderKey, discordAuthClaims.Id);


        if (user == null)
        {
            user = new User
            {
                UserName = discordAuthClaims.Username,
                Email = discordAuthClaims.Email
            };

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                if (IdentityUtils.HasDuplicateEmailError(result))
                {
                    return OpenAuthLoginResult.EMAIL_EXISTS;
                }
                else
                {
                    return OpenAuthLoginResult.FAILED;
                }
            }

            await _userManager.AddLoginAsync(user, new UserLoginInfo(discordProviderKey, discordAuthClaims.Id, "Discord"));
        }

        await _signInManager.SignInAsync(user, isPersistent: Constants.USE_PERSISTENT_SESSION);

        return OpenAuthLoginResult.SUCCESS;
    }
}