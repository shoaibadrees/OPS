using Abp.Authorization;
using OPS.Authorization.Roles;
using OPS.Authorization.Users;

namespace OPS.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
