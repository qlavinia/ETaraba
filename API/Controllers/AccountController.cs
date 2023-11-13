using API.Entities;
using ETaraba.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ETaraba.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);

                    if (result.Succeeded)
                    {
                        // The user is successfully logged in.
                        return Ok("Login successful");
                    }

                    if (result.IsLockedOut)
                    {
                        return BadRequest("Account is locked out");
                    }

                    // Handle other sign-in failures as needed.
                }

                return BadRequest("Invalid username or password");
            }

            return BadRequest("Invalid model state");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (ModelState.IsValid)
            {
                AppUser user = new AppUser
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    UserName = model.UserName,
                };
                     
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // You can optionally send an email confirmation link here.
                    return Ok("Registration successful");
                }
                else
                {
                    // Handle registration errors (e.g., duplicate username, password requirements not met)
                    var errors = result.Errors.Select(e => e.Description);
                    return BadRequest($"Registration failed: {string.Join(", ", errors)}");
                }
            }

            return BadRequest("Invalid model state");
        }
    }
}
