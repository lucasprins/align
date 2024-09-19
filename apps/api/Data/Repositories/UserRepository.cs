namespace Align.Data;

public class UserRepository(DatabaseContext databaseContext) : IUserRepository
{
    private readonly DatabaseContext _databaseContext = databaseContext;

    public Task<User?> GetById(Guid id)
    {
        return _databaseContext.Users
            .Include(u => u.WorkspaceMemberships)
                .ThenInclude(wm => wm.Workspace)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public Task<User?> GetByEmail(string email)
    {
        return _databaseContext.Users
           .Include(u => u.WorkspaceMemberships)
               .ThenInclude(wm => wm.Workspace)
           .FirstOrDefaultAsync(u => u.Email == email);
    }

    public Task<bool> EmailExists(string email)
    {
        return _databaseContext.Users.AnyAsync(user => user.Email == email);
    }
}