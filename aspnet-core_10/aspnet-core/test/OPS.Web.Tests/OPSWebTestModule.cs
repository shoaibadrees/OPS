using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OPS.EntityFrameworkCore;
using OPS.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace OPS.Web.Tests
{
    [DependsOn(
        typeof(OPSWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class OPSWebTestModule : AbpModule
    {
        public OPSWebTestModule(OPSEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OPSWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(OPSWebMvcModule).Assembly);
        }
    }
}