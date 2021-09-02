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
    [Table("AddEmployee")]
    public class AddEmployee : Entity<int>,IFullAudited
    {
        [Column(TypeName = "nvarchar(250)")]
        public string FirstName { get; set; }
      
        [Column(TypeName = "nvarchar(250)")]
        public string LastName { get; set; }

        [MaxLength(10)]
        [Column(TypeName = "int")]
        public int Age { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Gender { get; set; }
        public string EmployeeType { get; set; }
       
        [Column(TypeName = "bit")]
        public bool isActive { get; set; }

        //[Column(TypeName = "image")]
        //public string? Image { get; set; }
        public bool HasPhoto { get; set; }
        public long? CreatorUserId { get  ; set  ; }
        public DateTime CreationTime { get  ; set  ; }
        public long? LastModifierUserId { get  ; set  ; }
        public DateTime? LastModificationTime { get  ; set  ; }
        public long? DeleterUserId { get  ; set  ; }
        public DateTime? DeletionTime { get  ; set  ; }
        public bool IsDeleted { get  ; set  ; }
    }
}
