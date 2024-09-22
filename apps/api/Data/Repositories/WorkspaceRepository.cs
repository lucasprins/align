namespace Align.Data;

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

    public async Task<bool> AddUserToWorkspace(Guid workspaceId, Guid userId, WorkspaceMemberRole role)
    {
        var workspace = await _databaseContext.Workspaces.FindAsync(workspaceId);
        if (workspace == null) return false;

        var user = await _databaseContext.Users.FindAsync(userId);
        if (user == null) return false;

        var existingMembership = await _databaseContext.WorkspaceMembers
            .FirstOrDefaultAsync(wm => wm.WorkspaceId == workspaceId && wm.UserId == userId);

        if (existingMembership != null) return false;

        var membership = new WorkspaceMember
        {
            WorkspaceId = workspaceId,
            UserId = userId,
            Role = role,
            JoinedAt = DateTime.UtcNow,
            User = user,
            Workspace = workspace
        };

        _databaseContext.WorkspaceMembers.Add(membership);

        await _databaseContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UrlExists(string url)
    {
        return await _databaseContext.Workspaces.AnyAsync(w => w.Url == url);
    }
}