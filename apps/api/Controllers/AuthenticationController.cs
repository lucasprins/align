// https://github.com/dotnet/aspnetcore/blob/main/src/Identity/Core/src/IdentityApiEndpointRouteBuilderExtensions.cs
// TODO : Implement 2FA (see examples in endpoints above ^)

using Microsoft.AspNetCore.Mvc;

namespace Tenet.Controllers
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
            var result = await authenticationService.Login(loginRequest);
            return result ? Ok() : Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDTO registerRequest)
        {
            try
            {
                await authenticationService.Register(registerRequest);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return ValidationProblem(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
