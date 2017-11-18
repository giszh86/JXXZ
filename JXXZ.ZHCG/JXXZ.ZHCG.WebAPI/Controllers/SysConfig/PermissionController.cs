using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.WebAPI.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers
{
    [LoggingFilter]
    public class PermissionController : ApiController
    {
        private PermissionBLL bll = new PermissionBLL();

        [HttpGet]
        public List<Permission> GetPermissions()
        {
            return bll.GetPermissions();
        }

        [HttpGet]
        public Paging<List<Permission>> GetPermissions(int start, int limit)
        {
            return bll.GetPermissions(null, start, limit);
        }

        [HttpGet]
        public Paging<List<Permission>> GetPermissions(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetPermissions(filters, start, limit);
        }

        [HttpGet]
        public List<Permission> GetPermissionsByRoleID(int roleID)
        {
            return bll.GetPermissionsByRoleID(roleID);
        }

        [HttpGet]
        public List<Permission> GetPermissionsByUserID(int userID)
        {
            return bll.GetPermissionsByUserID(userID);
        }

        [HttpGet]
        public List<TreePermission> GetTreePermissions()
        {
            return bll.GetTreePermissions();
        }

        [HttpGet]
        public bool IsExistsChildPermission(string code)
        {
            return bll.IsExistsChildPermission(code);
        }

        [HttpPost]
        public HttpResponseMessage AddPermission(Permission permission)
        {
            bll.AddPermission(permission);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage EditPermission(Permission permission)
        {
            bll.EditPermission(permission);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage DeletePermission(string code)
        {
            bll.DeletePermission(code);

            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK
            };
            return response;
        }
    }
}