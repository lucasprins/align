using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Align.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetUser()
        {
            var user = await _userService.Get(User);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }
    }
}
