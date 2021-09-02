using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using OPS.Configuration.Dto;

namespace OPS.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : OPSAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
