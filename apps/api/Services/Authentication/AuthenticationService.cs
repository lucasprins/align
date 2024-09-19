using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Align.Services;

public class AuthenticationService(
    SignInManager<User> signInManager,
    UserManager<User> userManager,
    IUserStore<User> userStore,
    IUserService userService
) : IAuthenticationService
{
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUserStore<User> _userStore = userStore;
    private readonly IUserService _userService = userService;

    public async Task<UserDTO?> Login(ClaimsPrincipal userClaim)
    {
        return await _userService.Get(userClaim);
    }

    public async Task<bool> Login(LoginRequestDTO loginRequest)
    {
        var result = await _signInManager.PasswordSignInAsync(
            loginRequest.Email,
            loginRequest.Password,
            isPersistent: loginRequest.RememberMe == false ? false : Constants.USE_PERSISTENT_SESSION,
            lockoutOnFailure: true
        );

        return result.Succeeded;
    }

    public async Task Logout()
    {
        await _signInManager.SignOutAsync();
    }

    public async Task<RegistrationResult> Register(RegisterRequestDTO registerRequest)
    {
        string email = registerRequest.Email;

        if (string.IsNullOrEmpty(email) || !new EmailAddressAttribute().IsValid(email))
        {
            return RegistrationResult.Failed(RegistrationError.InvalidEmail);
        }

        if (await _userService.EmailExists(email))
        {
            return RegistrationResult.Failed(RegistrationError.DuplicateEmail);
        }

        var user = new User();
        var emailStore = (IUserEmailStore<User>)_userStore;

        await _userStore.SetUserNameAsync(user, email, CancellationToken.None);
        await emailStore.SetEmailAsync(user, email, CancellationToken.None);

        var result = await _userManager.CreateAsync(user, registerRequest.Password);

        if (!result.Succeeded)
        {
            return RegistrationResult.Failed(RegistrationError.IdentityError);
        }
        
        var userDTO = await _userService.GetByEmail(registerRequest.Email);

        if (userDTO == null)
        {
            return RegistrationResult.Failed(RegistrationError.UserNotFound);
        }

        return RegistrationResult.Success(userDTO);
    }
}