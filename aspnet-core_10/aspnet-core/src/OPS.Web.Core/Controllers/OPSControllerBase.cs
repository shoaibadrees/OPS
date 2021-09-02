using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace OPS.Controllers
{
    public abstract class OPSControllerBase: AbpController
    {
        protected OPSControllerBase()
        {
            LocalizationSourceName = OPSConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
