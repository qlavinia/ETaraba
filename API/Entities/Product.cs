using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Product
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public string Photo { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        public virtual ICollection<ProductOrder> ProductOrders { get; set; }
    }
}
