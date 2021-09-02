using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.ItemCategory.Dto;

using OPS.OPS_Models;

namespace OPS.HotelService.ItemCategory
{
 public class ItemCategoryService : OPSAppServiceBase
    {
        private readonly IRepository<ItemsCategory> _itemCategoryRepository;
  public ItemCategoryService(IRepository<ItemsCategory> itemCategory)
        {
            this._itemCategoryRepository = itemCategory;
        }

        [HttpGet]
        public async Task<List<ItemCategoryDto>> getAllCategoryItems()
        {
            var query = await _itemCategoryRepository.GetAll().Where(x=>x.IsDeleted==false)
                                             
                                             .Select(z => new ItemCategoryDto
                                             {
                                                 Id = z.Id,
                                                 Title = z.Title,
                                                 Description = z.Description,
                                                 isActive = z.isActive,

                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<List<ItemCategoryDto>> getActiveCategoryItems()
        {
            var query = await _itemCategoryRepository.GetAll()
                                              .Where(x => x.isActive == true && x.IsDeleted==false)
                                             .Select(z => new ItemCategoryDto
                                             {
                                                 Id = z.Id,
                                                 Title = z.Title,
                                                 Description = z.Description,
                                                 isActive = z.isActive,
                                               
                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<bool> updateOrInsertItemCategory(ItemCategoryDto input)
        {
            if (input.Id != 0)
            {
                var itemCategory = _itemCategoryRepository.Get(input.Id);
                itemCategory.Title = input.Title;
                itemCategory.Description = input.Description;
                itemCategory.isActive = input.isActive;
                var a = await _itemCategoryRepository.UpdateAsync(itemCategory);
                if (a != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            //Insert Item Category
            else
            {
                var itemCategory = new ItemsCategory();
                itemCategory.Title = input.Title;
                itemCategory.Description = input.Description;
                itemCategory.isActive = input.isActive;

                var a = await _itemCategoryRepository.InsertAsync(itemCategory);
                if (a != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

        }
        [HttpDelete]
        public async Task<bool> deleteCategoryItem(int categoryId)
        {

            var Table = _itemCategoryRepository.Get(categoryId);
            if (Table != null)
            {
                await _itemCategoryRepository.DeleteAsync(categoryId);
                return true;

            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }

        }
    }
}
