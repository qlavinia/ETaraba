using API.Entities;
using ETaraba.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETaraba.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            List<Product> products = await _context.Products.ToListAsync();
            return products;
        }
    }
}
