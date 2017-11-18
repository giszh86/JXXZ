using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.WebAPI.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers
{
    [LoggingFilter]
    public class MenuController : ApiController
    {
        private MenuBLL bll = new MenuBLL();

        [HttpGet]
        public List<TreeMenu> GetTreeMenus(int userID,int? roleID=null)
        {
            return bll.GetTreeMenus(userID, roleID);
        }

        [HttpGet]
        public PhoneMenu GetMenuByPhone(int userID)
        {
            return bll.GetMenuByPhone(userID);
        }
    }

}