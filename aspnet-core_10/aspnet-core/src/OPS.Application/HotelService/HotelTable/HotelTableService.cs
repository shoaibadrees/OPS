using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.HotelTable.Dto;
using OPS.OPS_Models;

namespace OPS.OPS_Service
{
    public class HotelTableService : OPSAppServiceBase
    {
        private readonly IRepository<Tables> _HotelTable;
        public HotelTableService(IRepository<Tables> hotelTable)
        {
            this._HotelTable = hotelTable;
        }

        [HttpGet]
        public async Task<List<Tables>> getAllTables()
        {
            var query = await _HotelTable.GetAll().Where(x=>x.IsDeleted==false ).ToListAsync();
            if (query != null)
            {
                return query;
            }

            else
            {
                return null;
            }

        }
        public async Task<List<Tables>> getAllTablesOnActive()
        {
            var query = await _HotelTable.GetAll().Where(x=>x.isActive==true && x.IsDeleted==false).ToListAsync();
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
        [HttpPut]
        public async Task<bool> updateTables(Tables input)
        {
            if (input.Id != 0)
            {
                var table = _HotelTable.Get(input.Id);
                //var table = new Tables();
                table.Title = input.Title;
                table.Description = input.Description;
                table.isActive = input.isActive;
                var a = await _HotelTable.UpdateAsync(table);
                if (a != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            //Insert Table
            else
            {
                var Table = new Tables();
                Table.Title = input.Title;
                Table.Description = input.Description;
                Table.isActive = input.isActive;

                var a = await _HotelTable.InsertAsync(Table);
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
        public async Task<bool> deleteTable(int id)
        {
           
            var Table = _HotelTable.Get(id);
            if (Table != null)
            {
              await _HotelTable.DeleteAsync(id);
                return true;
               
            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }
          
        }
    }
}
