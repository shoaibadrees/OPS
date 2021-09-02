using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.HotelTable.FoodItem.FoodItemDto
{
  public  class FoodItemsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int SalePrice { get; set; }
        public int? SaleTaxPrice { get; set; }
        public bool isActive { get; set; }
        public string? Image { get; set; }
        public int ItemCategoryId { get; set; }
       public string ItemCatagoryName { get; set; }
        public bool HasPhoto { get; set; }
    }

}
