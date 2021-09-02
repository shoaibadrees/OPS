using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OPS.Authorization;

namespace OPS
{
    [DependsOn(
        typeof(OPSCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class OPSApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<OPSAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(OPSApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
