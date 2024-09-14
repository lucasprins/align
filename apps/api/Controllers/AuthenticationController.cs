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

        // TODO : Return the user when succesful? otherwise there will be two hsubsequent api calls for the same thing.
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDTO loginRequest)
        {
            if (LoginRequestDTO.IsValid(loginRequest) && HttpContext.User.Identity != null && !HttpContext.User.Identity.IsAuthenticated)
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

        // TODO : Refactor using RegisterResult model with validation errors instead of exceptions, also return the user if
        // its succesful
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
