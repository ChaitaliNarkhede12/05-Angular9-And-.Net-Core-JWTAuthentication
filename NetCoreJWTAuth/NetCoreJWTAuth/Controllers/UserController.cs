using ApplicationLayer.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreJWTAuth.Controllers
{
    [Authorize]
    [EnableCors("OIPAPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserAppService _userService;
        public UserController(IUserAppService userService)
        {
            _userService = userService;
        }

        [HttpGet("getUserList")]
        public async Task<IActionResult> GetUserList()
        {
            var result = await _userService.GetUserList();
            return Ok(result);
        }

        [HttpGet("getUserDetails/{userName}")]
        public async Task<IActionResult> GetUserDetails(string userName)
        {
            var userList = await _userService.GetUserDetailsByExpression(x => x.UserName == userName);
            var result = userList.FirstOrDefault();
            return Ok(result);
        }
    }
}
