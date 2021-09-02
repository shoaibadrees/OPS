using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace OPS.OPS_Models
{
    [Table("OrdersStatus")]
    public class OrderStatus : Entity<int>
    {
        //public  string? Title {get;set;}
        [Column(TypeName = "char(1)")]
        public string Abb { get; set; }
        public string Name { get; set; }
       public int DisplaySequence { get; set; }
        public bool isVisible { get; set; }

        [Column(TypeName = "bit")]
        public bool isActive { get; set; }
    }
}
