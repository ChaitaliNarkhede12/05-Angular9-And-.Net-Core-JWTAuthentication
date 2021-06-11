using ApplicationLayer.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreJWTAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ITokenAppService _tokenAppService;
        public AuthenticationController(ITokenAppService tokenAppService)
        {
            _tokenAppService = tokenAppService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            var token = await _tokenAppService.Login(loginViewModel.UserName, loginViewModel.Password);
            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost("refreshtoken")]
        public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest("refresh token is null");
            }

            var token = await _tokenAppService.CreateTokenOnRefreshToken(refreshToken);
            if (token == null)
            {
                return Unauthorized("refresh token does not gets generated");
            }

            return Ok(token);
        }

        [HttpPost("removerefreshtoken")]
        public async Task<IActionResult> RemoveRefreshToken([FromBody] string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest("refresh token is null");
            }

            var flag = await _tokenAppService.RemoveRefreshToken(refreshToken);
            if (flag == 0)
            {
                return Unauthorized("refresh token does not gets removed");
            }

            return Ok(flag);
        }
    }
}
