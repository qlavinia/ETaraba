using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class ProductOrder
    {
        public int ProductOrderId { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }


        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
