using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using JXXZ.ZHCG.WebAPI.Attributes;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.BLL;
using Newtonsoft.Json;
using System.Collections.Specialized;
using System.Net.Http.Headers;
using System.Web;
using JXXZ.ZHCG.Utility;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System.Text;
using JXXZ.ZHCG.DAL.Enum;

namespace JXXZ.ZHCG.WebAPI.Controllers
{
    [LoggingFilter]
    public class UserController : ApiController
    {
        private UserBLL bll = new UserBLL();

        public List<User> GetUser(int UnitID)
        {
            return bll.GetUser(UnitID);
        }

        [HttpGet]
        public Paging<List<User>> GetUsers(int start, int limit)
        {
            return bll.GetUsers(null, start, limit);
        }

        [HttpGet]
        public Paging<List<User>> GetUsers(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetUsers(filters, start, limit);
        }

        [HttpPost]
        public HttpResponseMessage Login(User user)
        {
            string result = bll.Login(user.LoginName, user.LoginPwd);
            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(result)
            };

            return response;
        }

        [HttpPost]
        public HttpResponseMessage ChangePassword(User user)
        {
            int result = bll.ChangePassword(user);
            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(result.ToString())
            };

            return response;
        }

        [HttpPost]
        public HttpResponseMessage LoginTest(User user)
        {
            var resp = new HttpResponseMessage();

            var nv = new NameValueCollection();
            nv["USER_ID"] = "1";
            nv["USER_NAME"] = "管理员";

            var cookie = new CookieHeaderValue("session-id", nv);
            //cookie.Expires = DateTimeOffset.Now.AddDays(1);
            //cookie.Domain = Request.RequestUri.Host;
            //cookie.Path = "/";

            resp.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            return resp;
        }

        [HttpPost]
        public HttpResponseMessage AddUser()//User user)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            User user = new Model.User();
            //文件上传
            HttpFileCollectionBase files = request.Files;
            if (files != null && files.Count > 0)
            {
                FileUploadClass fileClass = new FileUploadClass();
                if (files["file"].ContentLength != 0)
                {
                    fileClass = FileHelper.UploadFile(files["file"], ConfigManageClass.UserUrlOriginalPath);
                    user.avatar = fileClass.OriginalPath;
                }
            }
            if (!string.IsNullOrEmpty(request["UnitID"]))
                user.UnitID = Convert.ToInt32(request["UnitID"]);
            user.LoginName = request["LoginName"];
            user.Code = request["Code"];
            user.DisplayName = request["DisplayName"];
            user.LoginPwd = request["Password"];
            if (!string.IsNullOrEmpty(request["UserTypeID"]))
                user.UserTypeID = Convert.ToInt32(request["UserTypeID"]);
            user.UnitName = request["UnitName"];
            string[] input = request["RoleIDArr"].Split(',');
            int[] output = Array.ConvertAll<string, int>(input, delegate(string s) { return int.Parse(s); });
            user.RoleIDArr = output;
            user.mobile = request["mobile"];
            if (!string.IsNullOrEmpty(request["Sepon"]))
                user.Sepon = Convert.ToInt32(request["Sepon"]);

            user.phone = request["phone"];
            user.shortnumber = request["shortnumber"];
            user.remarks1 = request["remarks1"];

            int result = bll.AddUser(user);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result == 1)
                response.Content = new StringContent("{\"success\":1}", Encoding.GetEncoding("UTF-8"), "text/html");
            else if (result == 2)
                response.Content = new StringContent("{\"success\":2}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;

        }



        [HttpPost]
        public HttpResponseMessage EditUser()//User user)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            User user = new Model.User();
            //文件上传
            HttpFileCollectionBase files = request.Files;
            if (files != null && files.Count > 0)
            {
                FileUploadClass fileClass = new FileUploadClass();
                if (files["file"].ContentLength != 0)
                {
                    fileClass = FileHelper.UploadFile(files["file"], ConfigManageClass.UserUrlOriginalPath);
                    user.avatar = fileClass.OriginalPath;
                }
            }
             if (!string.IsNullOrEmpty(request["ID"]))
                 user.ID = Convert.ToInt32(request["ID"]);
            if (!string.IsNullOrEmpty(request["UnitID"]))
                user.UnitID = Convert.ToInt32(request["UnitID"]);
            user.LoginName = request["LoginName"];
            user.Code = request["Code"];
            user.DisplayName = request["DisplayName"];
            user.LoginPwd = request["Password"];
            if (!string.IsNullOrEmpty(request["UserTypeID"]))
                user.UserTypeID = Convert.ToInt32(request["UserTypeID"]);
            user.UnitName = request["UnitName"];
            string[] input = request["RoleIDArr"].Split(',');
            int[] output = Array.ConvertAll<string, int>(input, delegate(string s) { return int.Parse(s); });
            user.RoleIDArr = output;
            user.mobile = request["mobile"];
            if (!string.IsNullOrEmpty(request["Sepon"]))
                user.Sepon = Convert.ToInt32(request["Sepon"]);

            user.phone = request["phone"];
            user.shortnumber = request["shortnumber"];
            user.remarks1 = request["remarks1"];

            int result = bll.EditUser(user);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result == 1)
                response.Content = new StringContent("{\"success\":1}", Encoding.GetEncoding("UTF-8"), "text/html");
            else if (result == 2)
                response.Content = new StringContent("{\"success\":2}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        [HttpPost]
        public HttpResponseMessage DeleteUser(int id)
        {
            bll.DeleteUser(id);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpGet]
        public List<UserType> GetUserTypes()
        {
            return bll.GetUserTypes();
        }



        /// <summary>
        /// 展示平台获取人员列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<UserModel>> GetUsersList(int start, int limit)
        {
            return bll.GetUsersList("", start, limit);
        }

        /// <summary>
        /// 展示平台获取人员列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<UserModel>> GetUsersList(string name, int start, int limit)
        {
            return bll.GetUsersList(name, start, limit);
        }

        /// <summary>
        /// 获取列表的总条数
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        public int GetEventListCount(int limit)
        {
            return bll.GetUsersListCount("", limit);
        }

        /// <summary>
        /// 获取查询后列表的总条数
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        public int GetEventListCount(string name, int limit)
        {
            return bll.GetUsersListCount(name, limit);
        }

        /// <summary>
        /// 获取人员
        /// </summary>
        /// <param name="unitid">单位标识</param>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        [HttpGet]
        public List<UserModel> GetUsersPersonnelList(int? unitid, int roleid)
        {
            return bll.GetUsersPersonnelList(unitid, roleid);
        }

        /// <summary>
        /// 根据用户类型标识获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        [HttpGet]
        public List<UserModel> GetUsersStaffList(int roleid)
        {
            return bll.GetUsersStaffList(roleid);
        }

        //  api/User/GetUsersListRole?rolename=中队长
        /// <summary>
        /// 根据用户角色获取用户
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<UserModel> GetUsersListRole(string rolename, int unitid)
        {
            UserBLL bll = new UserBLL();
            return bll.GetUsersListRole(rolename, unitid);
        }

        //  api/User/GetUsersListUnit?unitname=法制科
        /// <summary>
        /// 根据用户类型获取用户
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<UserModel> GetUsersListUnit(string unitname)
        {
            UserBLL bll = new UserBLL();
            return bll.GetUsersListUnit(unitname);
        }

        #region API
        ///   /api/User/LoginApi
        /// <summary>
        /// 登录校验
        /// </summary>
        /// <param name="account">帐号</param>
        /// <param name="password">密码</param>
        /// <returns>根据账号密码获取登录用户</returns>
        [HttpPost]
        public User LoginApi(User user)
        {
            return bll.LoginApi(user);
        }

        ///   /api/User/GetUserModel?userid=2
        /// <summary>
        /// 根据userid查询手机号
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        public UserMobile GetUserModel(int userid)
        {
            return bll.GetUserModel(userid);
        }

        #endregion



        /// <summary>
        /// 根据userid获取人员详情
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        public BaseUserModel GetUserById(int userid)
        {
            return bll.GetUserById(userid);
        }

        /// <summary>
        /// 查询中队下人员
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<User>> GetZDUserList(int start, int limit)
        {
            return bll.GetZDUserList(null, start, limit);
        }
        /// <summary>
        /// 查询中队下人员
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<User>> GetZDUserList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetZDUserList(filters, start, limit);
        }

        /// <summary>
        /// 今日中队在线人员时间点统计
        /// </summary>
        /// <param name="type">1人员在线  2市民服务事件上报</param>
        /// <returns></returns>
        [HttpGet]
        public string GetTodayOnlineCount(int type)
        {
            string newCityMiddle = "/1/2/11/%";//(int)em_Unit.newCityMiddle;
            string hightMiddle = "/1/2/12/%"; //(int)em_Unit.hightMiddle;
            List<int?> newCitylist = new List<int?>();
            List<int?> hightList = new List<int?>();
            if (type == 1)
            {
                newCitylist = bll.GetTodayOnlineCount(newCityMiddle);
                hightList = bll.GetTodayOnlineCount(hightMiddle);
            }
            else
            {
                newCitylist = bll.GetTodayUnitreportcounts(newCityMiddle);
                hightList = bll.GetTodayUnitreportcounts(hightMiddle);
            }

            string result = JsonConvert.SerializeObject(newCitylist).ToString() + "|" + JsonConvert.SerializeObject(hightList).ToString();
            return result;
        }

        /// <summary>
        /// 今日中队上报人员统计
        /// </summary>
        /// <returns></returns>
        //[HttpGet]
        //public string GetTodayUnitreportcounts()
        //{
        //    int newCityMiddle = (int)em_Unit.newCityMiddle;
        //    int hightMiddle = (int)em_Unit.hightMiddle;
        //    List<int> newCitylist = bll.GetTodayUnitreportcounts(newCityMiddle);
        //    List<int> hightList = bll.GetTodayUnitreportcounts(hightMiddle);

        //    string result = JsonConvert.SerializeObject(newCitylist).ToString() + "|" + JsonConvert.SerializeObject(hightList).ToString();
        //    return result;

        //}

        /// <summary>
        /// 获取中队当前在线人员数量
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetTodayOnlineByTeam()
        {
            int newCityMiddle = (int)em_Unit.newCityMiddle;
            int hightMiddle = (int)em_Unit.hightMiddle;

            //新城高照中队当前在线人员
            int newCitylist = bll.GetOnlinePersonCounts(newCityMiddle);
            int hightList = bll.GetOnlinePersonCounts(hightMiddle);

            //新城高照中队人员总数
            int newCityPersonCountlist = bll.GetPersonCounts(newCityMiddle);
            int hightPersonCountList = bll.GetPersonCounts(hightMiddle);

            //报警数据
            string BjCount = bll.getBjcount();

            string result = newCitylist + "|" + hightList + "|" + newCityPersonCountlist + "|" + hightPersonCountList + "|" + BjCount;
            return result;
        }
    }
}