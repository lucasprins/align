using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Tenet.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkspaceController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public WorkspaceController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Workspace
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workspace>>> GetWorkspaces()
        {
            return await _context.Workspaces.ToListAsync();
        }

        // GET: api/Workspace/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Workspace>> GetWorkspace(Guid id)
        {
            var workspace = await _context.Workspaces.FindAsync(id);

            if (workspace == null)
            {
                return NotFound();
            }

            return workspace;
        }

        // PUT: api/Workspace/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkspace(Guid id, Workspace workspace)
        {
            if (id != workspace.Id)
            {
                return BadRequest();
            }

            _context.Entry(workspace).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkspaceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Workspace
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Workspace>> PostWorkspace(WorkspaceCreateDTO workspace)
        {
            Workspace newWorkspace = new()
            {
                Id = Guid.NewGuid(),
                Name = workspace.Name,
                Url = workspace.Url,
                LogoUrl = workspace.LogoUrl
            };

            _context.Workspaces.Add(newWorkspace);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkspace), new { id = newWorkspace.Id }, workspace);
        }

        // DELETE: api/Workspace/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkspace(Guid id)
        {
            var workspace = await _context.Workspaces.FindAsync(id);
            if (workspace == null)
            {
                return NotFound();
            }

            _context.Workspaces.Remove(workspace);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkspaceExists(Guid id)
        {
            return _context.Workspaces.Any(e => e.Id == id);
        }
    }
}
