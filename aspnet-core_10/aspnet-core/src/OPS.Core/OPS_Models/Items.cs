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
    [Table("Items")]
    public class Items :Entity<int>, IFullAudited
    {
        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string Title { get; set; }
       
        [Column(TypeName = "nvarchar(250)")]
        public string Description { get; set; }
        [Required]
        [Column(TypeName = "numeric(18,2)")]
        public int SalePrice { get; set; }

        [Column(TypeName = "numeric(18, 2)")]
        public int? SaleTaxPrice { get; set; }
       
        [Column(TypeName = "bit")]
        public bool isActive { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Image { get; set; }

        public bool HasPhoto { get; set; }
        public long? CreatorUserId { get  ; set  ; }
        public DateTime CreationTime { get  ; set  ; }
        public long? LastModifierUserId { get  ; set  ; }
        public DateTime? LastModificationTime { get  ; set  ; }
        public long? DeleterUserId { get  ; set  ; }
        public DateTime? DeletionTime { get  ; set  ; }
        public bool IsDeleted { get  ; set  ; }
        public int ItemCategoryId { get; set; }

        [ForeignKey("ItemCategoryId")]
        public virtual ItemsCategory ItemCategoryFk { get; set; }
    }
}
