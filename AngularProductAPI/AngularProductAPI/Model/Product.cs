namespace AngularProductAPI.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Freshness { get; set; }
        public int Price { get; set; }

        public string Comments { get; set; }
        

    }
}
