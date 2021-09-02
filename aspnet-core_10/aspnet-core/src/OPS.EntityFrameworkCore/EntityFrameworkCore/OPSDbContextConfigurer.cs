using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace OPS.EntityFrameworkCore
{
    public static class OPSDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<OPSDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<OPSDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
