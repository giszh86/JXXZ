using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.Model;

namespace JXXZ.ZHCG.Controllers
{
    public class sysRolesController : ApiController
    {
        private SysRolesBLL rolesBLL = new SysRolesBLL();

        [HttpGet]
        public List<Role> GetRoles()
        {
            return rolesBLL.Select();
        }

        [HttpGet]
        public Paging<List<Role>> GetRoles(int start, int limit)
        {
            return rolesBLL.Select(null, start, limit);
        }

        [HttpGet]
        public Paging<List<Role>> GetRoles(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return rolesBLL.Select(filters, start, limit);
        }

        [HttpPost]
        public HttpResponseMessage AddRole(Role role)
        {
            rolesBLL.Insert(role);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage EditRole(Role role)
        {
            rolesBLL.Edit(role);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage DeleteRole(int id)
        {
            if (rolesBLL.Delete(id) > 0)
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.PartialContent);
            }
        }
        [HttpGet]
        public List<Role> GetRolesByUserID(int userID)
        {
            return rolesBLL.GetRolesByUserID(userID);
        }
    }
}