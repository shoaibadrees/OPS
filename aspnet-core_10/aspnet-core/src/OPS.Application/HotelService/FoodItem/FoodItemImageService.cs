using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace OPS.HotelService.FoodItem
{
 public  class FoodItemImageService
    {
        string imagePath = Project_Paths.Project_Paths.Path_ItemsPhotos;

        [HttpPost]
        public  async Task<bool> saveItemPhoto()
        {
            return true;
        }

    }
}
