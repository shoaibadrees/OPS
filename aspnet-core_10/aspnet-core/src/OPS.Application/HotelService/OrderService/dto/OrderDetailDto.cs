using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.OrderService.dto
{
    public class OrderDetailDto
    { 
        public string Title { get; set; }
        public string Description { get; set; }
        public int ItemQuatity { get; set; }
        public int SalePrice { get; set; }
        public int? Discount { get; set; }
        public int? PriceAfterDiscount { get; set; }
        public int? Tax { get; set; }
        public int TotalPrice { get; set; }
    }
}
