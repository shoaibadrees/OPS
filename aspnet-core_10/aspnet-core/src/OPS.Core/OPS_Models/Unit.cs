using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace OPS.OPS_Models
{
    [Table("Units")]
    public class Units : Entity<int>, IFullAudited

    {
        [Column(TypeName = "nvarchar(250)")]
    public string Title { get; set; }

    [Column(TypeName = "nvarchar(250)")]
    public string Description { get; set; }


    [Column(TypeName = "bit")]
    public bool isActive { get; set; }
    public long? CreatorUserId { get; set; }
    public DateTime CreationTime { get; set; }
    [Column(TypeName = "bigint")]
    public long? LastModifierUserId { get; set; }
    public DateTime? LastModificationTime { get; set; }
    [Column(TypeName = "bigint")]
    public long? DeleterUserId { get; set; }
    public DateTime? DeletionTime { get; set; }
    public bool IsDeleted { get; set; }

}
}
