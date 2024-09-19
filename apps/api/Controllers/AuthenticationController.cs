// https://github.com/dotnet/aspnetcore/blob/main/src/Identity/Core/src/IdentityApiEndpointRouteBuilderExtensions.cs
// TODO : Implement 2FA (see examples in endpoints above ^)

using Microsoft.AspNetCore.Mvc;

namespace Align.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthenticationController(IAuthenticationService authenticationService) : ControllerBase
    {
        private readonly IAuthenticationService authenticationService = authenticationService;

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] object _)
        {
            await authenticationService.Logout();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDTO loginRequest)
        {
            if (loginRequest.IsValid() && HttpContext.User.Identity != null && !HttpContext.User.Identity.IsAuthenticated)
            {
                await authenticationService.Login(loginRequest);
            }

            if (HttpContext.User.Identity != null && HttpContext.User.Identity.IsAuthenticated)
            {
                if (await authenticationService.Login(HttpContext.User) is UserDTO userDTO)
                {
                    return Ok(userDTO);
                }
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDTO registerRequest)
        {
            var registrationResult = await authenticationService.Register(registerRequest);

            await authenticationService.Login(new LoginRequestDTO()
            {
                Email = registerRequest.Email,
                Password = registerRequest.Password,
                RememberMe = true
            });

            return Ok(registrationResult);
        }
    }
}
