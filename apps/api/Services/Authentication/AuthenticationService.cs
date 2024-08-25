using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Tenet.Services;

public class AuthenticationService(SignInManager<User> signInManager, UserManager<User> userManager, IUserStore<User> userStore) : IAuthenticationService
{
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUserStore<User> _userStore = userStore;

    public async Task<bool> Login(LoginRequestDTO loginRequest)
    {
        var result = await _signInManager.PasswordSignInAsync(loginRequest.Email, loginRequest.Password, Constants.USE_PERSISTENT_SESSION, true);
        return result.Succeeded;
    }

    public async Task Logout()
    {
        await _signInManager.SignOutAsync();
    }

    public async Task Register(RegisterRequestDTO registerRequest)
    {
        string email = registerRequest.Email;

        if (string.IsNullOrEmpty(email) || !new EmailAddressAttribute().IsValid(email))
        {
            throw new ArgumentException("Invalid email.");
        }

        var user = new User();
        var emailStore = (IUserEmailStore<User>)_userStore;

        await _userStore.SetUserNameAsync(user, email, CancellationToken.None);
        await emailStore.SetEmailAsync(user, email, CancellationToken.None);

        var result = await _userManager.CreateAsync(user, registerRequest.Password);

        if (!result.Succeeded)
        {
            throw new Exception("Failed to register user.");
        }
    }
}