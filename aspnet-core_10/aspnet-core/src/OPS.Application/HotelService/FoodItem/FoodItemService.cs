using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.HotelTable.FoodItem.FoodItemDto;
using OPS.OPS_Models;

using OPS.HotelService.Project_Paths;
using Microsoft.AspNetCore.Http;


namespace OPS.HotelService.FoodItem
{
    public class FoodItemService : OPSAppServiceBase
    {
        private readonly IRepository<Items> _ItemRepository;
        public FoodItemService(IRepository<Items> foodItemRepository)
        {
            this._ItemRepository = foodItemRepository;
        }
        public async Task<List<FoodItemsDto>> getAllItems()
        {
            var items = await _ItemRepository.GetAll().Where(x=>x.IsDeleted==false).Include(y => y.ItemCategoryFk)
                                             .Select(z => new FoodItemsDto
                                             {
                                                 Id = z.Id,
                                                 Title = z.Title,
                                                 Description = z.Description,
                                                 isActive = z.isActive,
                                                 SalePrice = z.SalePrice,
                                                 SaleTaxPrice = z.SaleTaxPrice,
                                                 HasPhoto= z.HasPhoto,
                                                 Image = z.Image,
                                                 ItemCategoryId = z.ItemCategoryId,
                                                 ItemCatagoryName = z.ItemCategoryFk.Title
                                             }).ToListAsync();
            if (items != null)
            {
                return items;
            }

            else
            {
                return null;
            }

        }
        [HttpGet]
        public async Task<List<FoodItemsDto>> getAllActiveItems()
        {
            var activeItems = await _ItemRepository.GetAll().Where(x =>x.IsDeleted==false && x.isActive == true).Include(y => y.ItemCategoryFk)
                                             .Select(z => new FoodItemsDto
                                             {
                                                 Id = z.Id,
                                                 Title = z.Title,
                                                 Description = z.Description,
                                                 isActive = z.isActive,
                                                 SalePrice = z.SalePrice,
                                                 SaleTaxPrice = z.SaleTaxPrice,
                                                 Image = z.Image,
                                                 HasPhoto=z.HasPhoto,
                                                 ItemCategoryId = z.ItemCategoryId,
                                                 ItemCatagoryName = z.ItemCategoryFk.Title
                                             }).ToListAsync();
            if (activeItems != null)
            {
                return activeItems;
            }

            else
            {
                return null;
            }

        }
        public async Task<List<FoodItemsDto>> getItemOnId(int itemId)
        {

            var itemOnCategory = await _ItemRepository.GetAll().Where(x => x.Id == itemId && x.IsDeleted == false).Include(y => y.ItemCategoryFk)
                                                 .Select(z => new FoodItemsDto
                                                 {
                                                     Id = z.Id,
                                                     Title = z.Title,
                                                     Description = z.Description,
                                                     isActive = z.isActive,
                                                     SalePrice = z.SalePrice,
                                                     SaleTaxPrice = z.SaleTaxPrice,
                                                      Image = z.Image,
                                                     HasPhoto = z.HasPhoto,
                                                     ItemCategoryId = z.ItemCategoryId,
                                                     ItemCatagoryName = z.ItemCategoryFk.Title
                                                 }).ToListAsync();
            if (itemOnCategory != null)
            {
                return itemOnCategory;
            }
            else
            {
                return null;
            }

        }
        public async Task<List<FoodItemsDto>> getItemOnCategory(int categoryId)
        {

            var itemOnCategory = await _ItemRepository.GetAll().Where(x => x.ItemCategoryId == categoryId && x.IsDeleted == false).Include(y => y.ItemCategoryFk)
                                                 .Select(z => new FoodItemsDto
                                                 {
                                                     Id = z.Id,
                                                     Title = z.Title,
                                                     Description = z.Description,
                                                     isActive = z.isActive,
                                                     SalePrice = z.SalePrice,
                                                     SaleTaxPrice = z.SaleTaxPrice,
                                                     Image = z.Image,
                                                     HasPhoto= z.HasPhoto,
                                                     ItemCategoryId = z.ItemCategoryId,
                                                     ItemCatagoryName = z.ItemCategoryFk.Title
                                                 }).ToListAsync();
            if (itemOnCategory != null)
            {
                return itemOnCategory;
            }
            else
            {
                return null;
            }

        }
        public async Task<List<FoodItemsDto>> getActiveItemsOnCategory(int categoryId)
        {

            var activeItemOnCategory = await _ItemRepository.GetAll().Where(x => x.ItemCategoryId == categoryId && x.isActive == true && x.IsDeleted==false).Include(y => y.ItemCategoryFk)
                                                 .Select(z => new FoodItemsDto
                                                 {
                                                     Id = z.Id,
                                                     Title = z.Title,
                                                     Description = z.Description,
                                                     isActive = z.isActive,
                                                     SalePrice = z.SalePrice,
                                                     SaleTaxPrice = z.SaleTaxPrice,
                                                      Image = z.Image,
                                                     HasPhoto= z.HasPhoto,
                                                     ItemCategoryId = z.ItemCategoryId,
                                                     ItemCatagoryName = z.ItemCategoryFk.Title
                                                 }).ToListAsync();
            if (activeItemOnCategory != null)
            {
                return activeItemOnCategory;
            }
            else
            {
                return null;
            }

        }
        [HttpPost]
        public async Task<int> updateItem(FoodItemsDto input)
        {
            int itemId = 0;
            if (input.Id != 0)
            {
                var item = _ItemRepository.Get(input.Id) ;
                item.Id = input.Id;
                item.Title = input.Title;
                item.Description = input.Description;
                item.SalePrice = input.SalePrice;
                item.SaleTaxPrice = input.SaleTaxPrice;
                item.ItemCategoryId = input.ItemCategoryId;
                item.isActive = input.isActive;
                var updateitem = await _ItemRepository.UpdateAsync(item);

                if (updateitem != null)
                {
                    return itemId = updateitem.Id;

                }


            }
            //Insert Employee
            else
            {
                var item = new Items();
                item.Title = input.Title;
                item.Description = input.Description;
                item.SalePrice = input.SalePrice;
                item.SaleTaxPrice = input.SaleTaxPrice;
                item.ItemCategoryId = input.ItemCategoryId;
                item.isActive = input.isActive;
                var inserItem = await _ItemRepository.InsertAsync(item);
                await CurrentUnitOfWork.SaveChangesAsync();
                if (inserItem != null)
                {
                    return itemId = inserItem.Id;
                }
            }
            return 0;

        }
        [HttpDelete]
        public async Task<bool> deleteItem(int itemId)
        {
            var item = _ItemRepository.Get(itemId);
            if (item != null)
            {
         await _ItemRepository.DeleteAsync(item);
                return true;
               

            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }
        }

        
   

      



    }
}
