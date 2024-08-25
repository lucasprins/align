using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Tenet.Controllers
{
    [Authorize]
    [Route("oauth")]
    [ApiController]
    public class OpenAuthController(Services.IOpenAuthService openAuthService, IOptions<FrontendOptions> frontendOptions) : ControllerBase
    {
        private readonly FrontendOptions frontendOptions = frontendOptions.Value;

        [HttpGet("discord")]
        public async Task<IActionResult> Discord()
        {
            try
            {
                await openAuthService.HandleDiscordLogin(HttpContext);
                return Redirect(frontendOptions.Url);
            }
            catch (UnauthorizedAccessException)
            {
                return BadRequest();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
