using System.Threading.Tasks;
using Abp.Application.Services;
using OPS.Sessions.Dto;

namespace OPS.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
