using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket(){
            var baskets = await RetrieveBasket();

            if(baskets == null) return NotFound();
            return new BasketDTO{
                Id=baskets.Id,
                BuyerId=baskets.BuyerId,
                Items=baskets.Items.Select(item=> new BasketItemDTO{
                    ProductId=item.ProductId,
                    Name=item.Product.Name,
                    Price=item.Product.Price,
                    PictureUrl=item.Product.PictureURL,
                    Brand=item.Product.Brand,
                    Quantity=item.Product.QuantityInStock

                }).ToList()
            };

        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId , int quantity){
            //get basket
            Basket basket = await RetrieveBasket();

            if(basket == null) 
            basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            basket.AddItem(product , quantity);

            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

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
        private BasketDTO MapBasketToDto(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureURL,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}