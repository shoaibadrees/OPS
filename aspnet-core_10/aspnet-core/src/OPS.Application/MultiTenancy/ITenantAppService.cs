using Abp.Application.Services;
using OPS.MultiTenancy.Dto;

namespace OPS.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

