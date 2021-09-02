using System.Threading.Tasks;
using Abp.Application.Services;
using OPS.Authorization.Accounts.Dto;

namespace OPS.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
