namespace Align.Data;

public class UserRepository(DatabaseContext databaseContext) : IUserRepository
{
    private readonly DatabaseContext _databaseContext = databaseContext;

    public Task<User?> Get(Guid id)
    {
        return _databaseContext.Users
            .Include(u => u.WorkspaceMemberships)
                .ThenInclude(wm => wm.Workspace)
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}