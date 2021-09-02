using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Castle.MicroKernel.SubSystems.Conversion;

namespace OPS.OPS_Models
{
    [Table("Orders")]
    public class Order :Entity<int>, IFullAudited
    {
        [Column(TypeName = "char(1)")]
        public string OrderStatus { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string CustomerName { get; set; }

    
        [Column(TypeName = "nvarchar(250)")]
        public string CustomerAddress { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string CustomerEmail { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string CustomerPhnNo { get; set; }

        [Column(TypeName = "numeric(18,2)")]
        public int? SubTotal { get; set; }

        [Column(TypeName = "numeric(18, 2)")]
        public int? Discount { get; set; }
        [Column(TypeName = "numeric(18,2)")]
        public int? Tax { get; set; }
        [Column(TypeName = "numeric(18,2)")]
        public int? TotalPrice { get; set; }

       public bool isActive { get; set; }
        [Column(TypeName = "bigint")]
        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        [Column(TypeName = "bigint")]
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        [Column(TypeName = "bigint")]
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }
        public int TableId { get; set; }

        [ForeignKey("TableId")]
        public virtual Tables TableFk { get; set; }

    }
}
