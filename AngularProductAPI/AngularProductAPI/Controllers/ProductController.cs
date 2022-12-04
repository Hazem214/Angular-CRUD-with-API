using AngularProductAPI.DTO;
using AngularProductAPI.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class ProductController : ControllerBase
    {
        public readonly Context context;
     
        public ProductController(Context _context)
        {
            context = _context;
        }

       [HttpGet]
       public IActionResult GetAll()
        {
            var Products=context.Products.ToList();
            return Ok(Products);
        }
        [HttpGet("{Id:int}",Name ="added")]
        public IActionResult GetById(int Id)
        {          
            var Product = context.Products.FirstOrDefault(p => p.Id == Id);
            return Ok(Product);
        }

        [HttpGet("{Name:alpha}")]
        public IActionResult GetByName(string Name)
        {
            var product=context.Products.FirstOrDefault(p => p.Name == Name);
            return Ok(product);
        }

        [HttpPost]
        public IActionResult Add(Product product)
        {
            if (ModelState.IsValid)
            {
                context.Products.Add(product);
                context.SaveChanges();
                string url = Url.Link("added" ,new { id = product.Id });
                return Created(url,product);
            }
            return BadRequest("Fail to Add");
        }

        [HttpPut("{Id}")]
        public IActionResult Edit([FromRoute] int Id,[FromBody]Product _product)
        {
            if (ModelState.IsValid)
            {
                var product = context.Products.FirstOrDefault(i => i.Id == Id);      
                product.Freshness = _product.Freshness;
                product.Category = _product.Category;
                product.Price = _product.Price;
                product.Date = _product.Date;
                product.Name = _product.Name;
                product.Comments=_product.Comments;
                context.SaveChanges();
                return StatusCode(204, "edit successfully");
            }
            return BadRequest("Error to Edit");
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            if (ModelState.IsValid)
            {
                var product = context.Products.FirstOrDefault(i => i.Id == Id);
                context.Products.Remove(product);
                context.SaveChanges();
                return Ok("delted succesfully");
            }
            return BadRequest("Error to remove");
        }

    }
}
