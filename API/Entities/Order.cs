using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Total { get; set; }

        public virtual ICollection<ProductOrder> ProductOrders { get; set; }
    }
}
