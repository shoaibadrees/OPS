using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.OrderService.dto;
using OPS.OPS_Models;

namespace OPS.HotelService.OrderService
{
    public class OrderService : OPSAppServiceBase
    {
        private readonly IRepository<OrderDetail> _orderDetailRepository;
        private readonly IRepository<Order> _orderRepository;
        private readonly IRepository<Tables> _tableRepository;

        public OrderService(IRepository<OrderDetail> orderDetail, IRepository<Order> order, IRepository<Tables> tableRepository)
        {
            this._orderDetailRepository = orderDetail;
            this._orderRepository = order;
            this._tableRepository = tableRepository;
        }

            [HttpPost]
        public async Task<bool> PostOrderPlace( OrderDto order)
        {     
            if (order != null)
            {
                var olist = new Order();
                olist.CustomerName = order.CustomerName;
                olist.CustomerAddress = order.CustomerAddress;
                olist.CustomerEmail = order.CustomerEmail;
                olist.SubTotal = order.SubTotal;
                olist.Discount = order.Discount;
                olist.Tax = order.Tax;
                olist.TableId = order.TableId;
                olist.TotalPrice = order.TotalPrice;
                olist.isActive = order.isActive;
                olist.OrderStatus = "O";
                var ordertrue = await _orderRepository.InsertAsync(olist);
                CurrentUnitOfWork.SaveChanges();
                if(ordertrue != null)
                {
                    var orderDetail = order.OrderDetail;
                    foreach (var ODetail in orderDetail)
                    {
                        var odlist = new OrderDetail();
                        odlist.OrderId = olist.Id;
                        odlist.Title = ODetail.Title;
                        odlist.Description = ODetail.Description;
                        odlist.ItemQuatity = ODetail.ItemQuatity;
                        odlist.SalePrice = ODetail.SalePrice;
                        odlist.Discount = ODetail.Discount; 
                        odlist.Tax = ODetail.Tax;
                        odlist.PriceAfterDiscount = ODetail.PriceAfterDiscount;
                        odlist.TotalPrice = ODetail.TotalPrice;
                       var orDetail= await _orderDetailRepository.InsertAsync(odlist);
                       await CurrentUnitOfWork.SaveChangesAsync();
                        

                    }

                }
                else
                {
                    return false;
                }
                
            }
            else
            {
                return false;
            }

            return true;

        }

        [HttpPost]
        public async Task<bool> updateOrderStatus(int orderid, string orderStatus)
        {

            var order1 = _orderRepository.Get(orderid);

            order1.OrderStatus = orderStatus;
            await _orderRepository.UpdateAsync(order1);
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }
           


        public async Task<List<OrderDto>> getAllActiveOrders()
        {
            var query = await _orderRepository.GetAll().Include(y => y.TableFk)
                                              .Where(x => x.isActive == true)
                                             .Select(z => new OrderDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 OrderStatus = z.OrderStatus,
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

        public async Task<List<OrderDetail>> getOrderDetailOnOrderId(int orderId)
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
