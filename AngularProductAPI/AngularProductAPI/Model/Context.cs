using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace AngularProductAPI.Model
{
    public class Context:DbContext
    {
        public Context(DbContextOptions option) : base(option)
        {
            
        }
        public virtual DbSet<Product> Products { get; set; }

    }
}
