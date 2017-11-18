using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.QWGL
{
    public class SignAreaController : ApiController
    {
        /// <summary>
        /// 签到区域列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_SigninAreasModel>> GetSigninAreasList(int start, int limit)
        {
            QW_SigninAreasBLL bll = new QW_SigninAreasBLL();
            return bll.GetSigninAreasList(null, start, limit);
        }

        /// <summary>
        /// 签到区域列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_SigninAreasModel>> GetSigninAreasList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            QW_SigninAreasBLL bll = new QW_SigninAreasBLL();
            return bll.GetSigninAreasList(filters, start, limit);
        }

        /// <summary>
        /// 添加签到区域
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddSigninAreas()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            QW_SigninAreasModel model = new QW_SigninAreasModel();

            if (!string.IsNullOrEmpty(request.Form["sszd"]))
                model.sszd = Convert.ToInt32(request.Form["sszd"]);
            if (!string.IsNullOrEmpty(request.Form["ssbc"]))
                model.ssbc = Convert.ToInt32(request.Form["ssbc"]);
            model.name = request.Form["name"];
            if (!string.IsNullOrEmpty(request.Form["start_stime"]))
                model.start_stime = Convert.ToDateTime(request.Form["start_stime"]);
            if (!string.IsNullOrEmpty(request.Form["start_etime"]))
                model.start_etime = Convert.ToDateTime(request.Form["start_etime"]);
            if (!string.IsNullOrEmpty(request.Form["end_stime"]))
                model.end_stime = Convert.ToDateTime(request.Form["end_stime"]);
            if (!string.IsNullOrEmpty(request.Form["end_etime"]))
                model.end_etime = Convert.ToDateTime(request.Form["end_etime"]);
            model.explain = request.Form["explain"];
            model.grometry = request.Form["grometry"];
            model.createtime = DateTime.Now;
            model.createuserid = Convert.ToInt32(request.Form["userid"]);

            QW_SigninAreasBLL bll = new QW_SigninAreasBLL();
            bll.AddSigninAreas(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 签到区域编辑
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditSigninAreas()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            QW_SigninAreasModel model = new QW_SigninAreasModel();

            if (!string.IsNullOrEmpty(request.Form["signinareaid"]))
                model.signinareaid = Convert.ToInt32(request.Form["signinareaid"]);
            if (!string.IsNullOrEmpty(request.Form["sszd"]))
                model.sszd = Convert.ToInt32(request.Form["sszd"]);
            if (!string.IsNullOrEmpty(request.Form["ssbc"]))
                model.ssbc = Convert.ToInt32(request.Form["ssbc"]);
            model.name = request.Form["name"];
            if (!string.IsNullOrEmpty(request.Form["start_stime"]))
                model.start_stime = Convert.ToDateTime(request.Form["start_stime"]);
            if (!string.IsNullOrEmpty(request.Form["start_etime"]))
                model.start_etime = Convert.ToDateTime(request.Form["start_etime"]);
            if (!string.IsNullOrEmpty(request.Form["end_stime"]))
                model.end_stime = Convert.ToDateTime(request.Form["end_stime"]);
            if (!string.IsNullOrEmpty(request.Form["end_etime"]))
                model.end_etime = Convert.ToDateTime(request.Form["end_etime"]);
            model.explain = request.Form["explain"];
            model.grometry = request.Form["grometry"];
            model.createtime = DateTime.Now;
            model.createuserid = Convert.ToInt32(request.Form["userid"]);

            QW_SigninAreasBLL bll = new QW_SigninAreasBLL();
            int result = bll.EditSigninAreas(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 删除签到区域
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage DeletePatrolAreas(int signinareaid)
        {
            QW_SigninAreasBLL bll = new QW_SigninAreasBLL();
            int result = bll.DeleteSigninAreas(signinareaid);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }


        // /api/SignArea/GetAreaGeometry?UserId=3&x=120.2314556&y=30.154654213
        /// <summary>
        /// 查询签到区域坐标集合
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public SignInAreaPartModel GetAreaGeometry(int UserId, double x, double y)
        {
            QW_UserSigninsBLL qwdal = new QW_UserSigninsBLL();
            return qwdal.GetAreaGeometry(UserId, x, y);
        }

        // /api/SignArea/GetSignInListById?start=0&limit=20&UserId=3
        /// <summary>
        /// 根据UserId获取所有签到记录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<UserSignInModel>> GetSignInListById(int start, int limit, int UserId)
        {
            QW_UserSigninsBLL qwdal = new QW_UserSigninsBLL();
            return qwdal.GetSignInListById(start, limit, UserId);
        }

        //  /api/SignArea/GetUserSignInList?sszd=0&ssbc=0&start=0&limit=10
        /// <summary>
        /// 查询团队已签到数据
        /// </summary>
        /// <param name="sszd">中队 全部是中队值为0</param>
        /// <param name="ssbc">班组 全部是班组值为0</param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SignInModel>> GetUserSignInList(int? sszd, int? ssbc, int start, int limit)
        {
            QW_UserSigninsBLL qwdal = new QW_UserSigninsBLL();
            return qwdal.GetUserSignInList(sszd, ssbc, start, limit);
        }

        /// <summary>
        /// 选择中队,班组
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpGet]
        public List<SelectItem> GetTeam(int userID)
        {
            QW_UserSigninsBLL bll = new QW_UserSigninsBLL();
            return bll.GetTeam(userID);
        }

        [HttpGet]
        public List<SelectItem> GetTeamOfAll(int userID)
        {
            QW_UserSigninsBLL bll = new QW_UserSigninsBLL();
            return bll.GetTeamOfAll(userID);
        }


        //  /api/SignArea/GetNotSignList?sszd=0&ssbc=0&start=0&limit=10
        /// <summary>
        /// 获取团队未签到
        /// </summary>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<NotSignModel>> GetNotSignList(int? sszd, int? ssbc, int start, int limit)
        {
            QW_UserSigninsBLL bll = new QW_UserSigninsBLL();
            return bll.GetNotSignList(sszd, ssbc, start, limit);
        }


        // /api/SignArea/GetSignDetails?userid=12&time=2017-03-07
        /// <summary>
        /// 获取签到详情
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        [HttpGet]
        public SignInAreaPartModel GetSignDetails(int userid, DateTime time)
        {
            QW_UserSigninsBLL bll = new QW_UserSigninsBLL();
            return bll.GetSignDetails(userid, time);
        }


        // /api/SignArea/AddUserSignIn
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public string AddUserSignIn(QW_UserSigninsModel model)
        {
            QW_UserSigninsBLL bll = new QW_UserSigninsBLL();
            try
            {
                int result = bll.AddUserSignIn(model);
                if (result == -1)
                    return "{\"msg\":\"上报成功！\",\"resCode\":\"-1\"}";
                else if (result == -2)
                    return "{\"msg\":\"上报成功！\",\"resCode\":\"-2\"}";
                else
                    return "{\"msg\":\"上报成功！\",\"resCode\":\"1\"}";
            }
            catch (Exception)
            {
                return "{\"msg\":\"json数据不正确\",\"resCode\":\"0\"}";
            }

        }

        // api/SignArea/GetSigninAreasCom?sszd=0&ssbc=0
        /// <summary>
        /// 根据中队班次获取签到区域
        /// </summary>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <returns></returns>
        [HttpGet]
        public List<QW_SigninAreasModel> GetSigninAreasCom(int sszd, int ssbc)
        {
            QW_SigninAreasBLL bll = new QW_SigninAreasBLL();
            return bll.GetSigninAreasCom(sszd, ssbc);
        }

    }
}
