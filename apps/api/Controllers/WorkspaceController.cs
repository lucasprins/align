using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Align.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkspaceController(IWorkspaceService workspaceService) : ControllerBase
    {
        private readonly IWorkspaceService _workspaceService = workspaceService;

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkspaceDTO>> GetWorkspace(Guid id)
        {
            var workspace = await _workspaceService.Get(id);

            if (workspace == null)
            {
                return NotFound();
            }

            return workspace;
        }

        [HttpGet("isUrlAvailable")]
        public async Task<ActionResult<bool>> IsUrlAvailable(string url)
        {
            return await _workspaceService.IsUrlAvailable(url);
        }

        [HttpPost]
        public async Task<ActionResult<CreateWorkspaceResult>> CreateWorkspace([FromBody] CreateWorkspaceDTO createWorkspaceDTO)
        {
            return await _workspaceService.Create(createWorkspaceDTO);
        }

        // [HttpGet("test")]
        // public async Task<ActionResult<IEnumerable<Workspace>>> Test()
        // {
        //     var user = _context.Users.FirstOrDefault();

        //     if (user != null)
        //     {
        //         var workspace = new Workspace()
        //         {
        //             Id = Guid.NewGuid(),
        //             Name = "Test",
        //             Url = "lucasprins"
        //         };

        //         workspace.Users.Add(user);
        //         _context.Workspaces.Add(workspace);
        //         await _context.SaveChangesAsync();
        //     }

        //     return await _context.Workspaces.ToListAsync();
        // }

        // PUT: api/Workspace/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutWorkspace(Guid id, Workspace workspace)
        // {
        //     if (id != workspace.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(workspace).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!WorkspaceExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // POST: api/Workspace
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Workspace>> PostWorkspace(WorkspaceCreateDTO workspace)
        // {
        //     Workspace newWorkspace = new()
        //     {
        //         Id = Guid.NewGuid(),
        //         Name = workspace.Name,
        //         Url = workspace.Url,
        //         LogoUrl = workspace.LogoUrl
        //     };

        //     _context.Workspaces.Add(newWorkspace);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetWorkspace), new { id = newWorkspace.Id }, workspace);
        // }

        // DELETE: api/Workspace/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteWorkspace(Guid id)
        // {
        //     var workspace = await _context.Workspaces.FindAsync(id);
        //     if (workspace == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Workspaces.Remove(workspace);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }
    }
}
