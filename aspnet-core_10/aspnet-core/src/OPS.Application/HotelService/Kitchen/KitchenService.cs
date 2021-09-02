using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.Kitchen.Dto;
using OPS.OPS_Models;

namespace OPS.HotelService.Kitchen
{
    public class KitchenService : OPSAppServiceBase
    {
        private readonly IRepository<Order> _orderRepository;
        private readonly IRepository<OrderDetail> _orderDetailRepository;


        public KitchenService(IRepository<Order> orderRepository, IRepository<OrderDetail> orderDetailRepository)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;


        }
        public async Task<List<KitchenOrderOutPutDto>> getAllActiveOrders()
        {
            var query = await _orderRepository.GetAll().Include(y => y.TableFk)
                                              .Where(x => x.isActive == true)
                                             .Select(z => new KitchenOrderOutPutDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 CustomerName = z.CustomerName,




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
        //[HttpGet]
        //public Task<List<KitchenOrderDetailOutputDto>> getOrderDetailOnOrderId(int orderId)
        //{
        //    var oDetail = _orderDetailRepository.GetAll().Where(x => x.OrderId == orderId).Select(z => new KitchenOrderDetailOutputDto
        //    {
        //        Id = z.Id,
        //        Title = z.Title,
        //        Description = z.Description,
        //        ItemQuatity = z.ItemQuatity

        //    }).ToListAsync();
        //    if (oDetail != null)
        //    {
        //        return oDetail;
        //    }
        //    else
        //    {

        //    }
        //    return null;

        //}

        public  async Task<List<OrderDetail>> getOrderDetailOnOrderId(int orderId)
        {
            var oDetail = await _orderDetailRepository.GetAll().Where(x => x.OrderId == orderId).ToListAsync();
            if (oDetail != null)
            {
                return oDetail;
            }
            else
            {

            }
            return null;

        }



    }
}
