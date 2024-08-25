
namespace Tenet.Data;

public class WorkspaceRepository(DatabaseContext databaseContext) : IWorkspaceRepository
{
    private readonly DatabaseContext _databaseContext = databaseContext;


    public async Task<Workspace?> Get(Guid id)
    {
        return await _databaseContext.Workspaces.FirstOrDefaultAsync(w => w.Id == id);
    }

    public async Task Add(Workspace workspace)
    {
        _databaseContext.Workspaces.Add(workspace);
        await _databaseContext.SaveChangesAsync();
    }

    public async Task<bool> UrlExists(string url)
    {
        return await _databaseContext.Workspaces.AnyAsync(w => w.Url == url);
    }
}