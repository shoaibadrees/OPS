using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.OrderService.dto
{
  public class OrderDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerEmail { get; set; }
        public string TableName { get; set; }
        public string CustomerPhnNo { get; set; }
        public int SubTotal { get; set; }
        public int Discount { get; set; }
        public int Tax { get; set; }
        public int TotalPrice { get; set; }
        public int TableId { get; set; }
        public bool isActive { get; set; }
        public string OrderStatus { get; set; }
         public List<OrderDetailDto> OrderDetail { get; set; }
    }

    


}


