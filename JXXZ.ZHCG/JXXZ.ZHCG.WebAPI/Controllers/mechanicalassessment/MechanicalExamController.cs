using JXXZ.ZHCG.DAL.MechanicalExaminationDAL;
using JXXZ.ZHCG.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.mechanicalassessment
{
    public class MechanicalExamController : ApiController
    {
        kh_examinesBLL bll = new kh_examinesBLL();

        #region 机械考核全部列表
        /// <summary>
        /// 行政许可审批全部列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<kh_examinesModel> GetMechExamList(int start, int limit, int year, int month)
        {
            return bll.GetMechExamList(null, start, limit,year,month);
        }
        #endregion

        #region 机械考核全部列表
        /// <summary>
        /// 行政许可审批全部列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<kh_examinesModel> GetMechExamList(string filter, int start, int limit,int year,int month)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetMechExamList(filters, start, limit,year,month);
        }

        #endregion

        #region 添加机械考核
        [HttpPost]
        public HttpResponseMessage AddMechExamList(kh_examinesModel examModel)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success=bll.AddMechExamList(examModel);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"failur\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 查看机械考核详情
        [HttpGet]
        public kh_examinesModel getMechExamInf(int examineid)
        {
            return bll.getMechExamInf(examineid);
        }
        #endregion

        #region 获取考核分数列表数据
        [HttpGet]
        public Pag<kh_scoresModel> getScoreList(int examineid,int start, int limit)
        {
            return bll.getScoreList(examineid,start, limit);
        }
        #endregion

        #region 修改机械考核
        [HttpPost]
        public HttpResponseMessage EditMechExamInf(kh_examinesModel examModel)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.EditMechExamInf(examModel);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"failur\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 发布机械考核
        public HttpResponseMessage ReleaseMechExam(int examineid)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.ReleaseMechExam(examineid);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"failur\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion
    }
}