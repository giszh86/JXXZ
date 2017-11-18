using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using JXXZ.ZHCG.WebAPI.Attributes;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.BLL;

namespace JXXZ.ZHCG.WebAPI.Controllers
{
    [LoggingFilter]
    public class UserTypeController : ApiController
    {
        private UserTypeBLL bll = new UserTypeBLL();

        [HttpGet]
        public List<UserType> GetUserTypes()
        {
            return bll.GetUserTypes();
        }

        [HttpGet]
        public Paging<List<UserType>> GetUserTypes(int start, int limit)
        {
            return bll.GetUserTypes(start, limit);
        }

        [HttpPost]
        public HttpResponseMessage AddUserType(UserType userType)
        {
            bll.AddUserType(userType);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage EditUserType(UserType userType)
        {
            bll.EditUserType(userType);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage DeleteUserType(int id)
        {
            bll.DeleteUserType(id);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}