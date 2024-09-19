namespace Align.Data;

public interface IUserRepository
{
    Task<User?> GetById(Guid id);
    Task<User?> GetByEmail(string email);
    Task<bool> EmailExists(string email);
}