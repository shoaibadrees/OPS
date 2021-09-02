using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using OPS.Configuration;
using OPS.Web;

namespace OPS.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class OPSDbContextFactory : IDesignTimeDbContextFactory<OPSDbContext>
    {
        public OPSDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<OPSDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            OPSDbContextConfigurer.Configure(builder, configuration.GetConnectionString(OPSConsts.ConnectionStringName));

            return new OPSDbContext(builder.Options);
        }
    }
}
