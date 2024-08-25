// https://github.com/dotnet/aspnetcore/blob/main/src/Identity/Core/src/IdentityApiEndpointRouteBuilderExtensions.cs
// TODO : Implement 2FA (see examples in endpoints above ^)

using Microsoft.AspNetCore.Mvc;

namespace Tenet.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthenticationController(Services.IAuthenticationService authenticationService) : ControllerBase
    {
        private readonly Services.IAuthenticationService authenticationService = authenticationService;

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] object _)
        {
            await authenticationService.Logout(HttpContext);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var result = await authenticationService.Login(loginRequest);
            return result ? Ok() : Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
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
