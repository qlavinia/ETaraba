namespace API.DTOs
{

    public class ProductOrderDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderDto
    {
        public List<ProductOrderDto> Items { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
    }

}
