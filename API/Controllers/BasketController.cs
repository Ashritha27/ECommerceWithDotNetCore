using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context){
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket(){
            var baskets = await RetrieveBasket();

            if(baskets == null) return NotFound();
            return baskets;

        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId , int quantity){
            //get basket
            Basket basket = await RetrieveBasket();

            if(basket == null) 
            basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            basket.AddItem(product , quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if(result)
            return StatusCode(201);

            return BadRequest(new ProblemDetails{Title = "Problem Saving item to table"});
        }
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId , int quantity){
            Basket basket = await RetrieveBasket();
            if(basket == null)
            return NotFound();

            basket.RemoveItem(productId,quantity);

            var result = await _context.SaveChangesAsync() > 0 ; 
            if(result)
            return Ok();
            else
            return BadRequest(new ProblemDetails{Title= "Problem removing item"});

        }


        private async Task<Basket> RetrieveBasket(){
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p =>p.Product).FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket(){
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions =  new CookieOptions{ IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId,cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;

        }
    }
}