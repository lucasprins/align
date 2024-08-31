namespace Align.Data;

public interface IUserRepository
{
    Task<User?> Get(Guid id);
}