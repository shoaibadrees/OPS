using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using OPS.Authorization.Roles;
using OPS.Authorization.Users;
using OPS.MultiTenancy;
using OPS.OPS_Models;

namespace OPS.EntityFrameworkCore
{
    public class OPSDbContext : AbpZeroDbContext<Tenant, Role, User, OPSDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public OPSDbContext(DbContextOptions<OPSDbContext> options)
            : base(options)
        {
        }

        public DbSet<Items> Items { get; set; }
        public DbSet<ItemsCategory> ItemsCategory {get;set;}
        public DbSet<Tables> Tables { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<AddEmployee> AddEmployee { get; set; }
        public DbSet<OrderStatus> OrderStatus { get; set; }
        public DbSet<Units> Units { get; set; }
    
 
    }
}
