using API.DTOs;
using API.Entities;
using ETaraba.Controllers;
using ETaraba.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveOrder(OrderDto orderDto)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {

                    Order newOrder = new Order
                    {
                        FirstName = orderDto.FirstName,
                        LastName = orderDto.LastName,
                        Phone = orderDto.Phone,
                        Total = 0
                    };

                    _context.Orders.Add(newOrder);

                    await _context.SaveChangesAsync();

                    decimal total = 0;

                    foreach (ProductOrderDto productOrderDto in orderDto.Items)
                    {
                        Product product = _context.Products.FirstOrDefault(p => p.ProductId == productOrderDto.ProductId);

                        ProductOrder newProductOrder = new ProductOrder
                        {
                            ProductId = productOrderDto.ProductId,
                            OrderId = newOrder.OrderId,
                            Quantity = productOrderDto.Quantity,
                            Price = product != null ? product.Price * productOrderDto.Quantity : 0
                        };

                        _context.ProductOrders.Add(newProductOrder);

                        total += product != null ? product.Price * productOrderDto.Quantity : 0;
                    }

                    newOrder.Total = total;

                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return Ok("Order saved successfully");
                }
                catch (Exception exception)
                {
                    transaction.Rollback();
                    // Log the exception
                    return StatusCode(500, "An error occurred while saving the data");
                }
            }
        }
    }
}
