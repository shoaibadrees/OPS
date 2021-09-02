using System.Threading.Tasks;
using OPS.Models.TokenAuth;
using OPS.Web.Controllers;
using Shouldly;
using Xunit;

namespace OPS.Web.Tests.Controllers
{
    public class HomeController_Tests: OPSWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}