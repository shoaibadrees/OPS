using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.Kitchen.Dto
{
 public class KitchenOrderOutPutDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public int TotalPrice { get; set; }
        public string TableName { get; set; }
        public int TableId { get; set; }
        public bool isActive { get; set; }
    }
}
