using System.Threading.Tasks;
using OPS.Configuration.Dto;

namespace OPS.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
