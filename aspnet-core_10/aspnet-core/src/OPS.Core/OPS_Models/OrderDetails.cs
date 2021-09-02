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
    [Table("OrdersDetails")]
    public class OrderDetail : Entity<int>
    {
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order OrderFk { get; set; }

       [Column(TypeName = "nvarchar(255)")]
        public string Title { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Description { get; set; }

        [Column(TypeName = "numeric(18,2)")]
        public int ItemQuatity { get; set; }

        [Column(TypeName = "numeric(18,2)")]
        public int SalePrice { get; set; }

        [Column(TypeName = "numeric(18,2)")]
        public int? Discount { get; set; }

        [Column(TypeName = "numeric(18, 2)")]
        public int? PriceAfterDiscount { get; set; }

        [Column(TypeName = "numeric(18,2)")]
        public int? Tax { get; set; }

        [Column(TypeName = "numeric(18,2)")]
        public int TotalPrice { get; set; }



    }
}
