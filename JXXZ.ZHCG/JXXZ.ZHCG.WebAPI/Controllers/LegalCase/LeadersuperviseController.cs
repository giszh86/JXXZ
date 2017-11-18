using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.SMSMessagesBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class LeadersuperviseController : ApiController
    {
        private Case_LeadersuperviseBLL bll = new Case_LeadersuperviseBLL();

        /// <summary>
        /// 督办上报
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddLeadersupervise(Case_LeadersuperviseModel model)
        {
            int success = bll.AddLeadersupervise(model);

            #region 发送短信
            int isSendMsg =model.isSendMsg;
            string phone = model.phone;
            //string phone = "18768196242";
            string casename = model.casename;
            string supopinion = model.supopinion;
            string date = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
            string createusername = model.createusernmae;
            if (isSendMsg == 1 && phone != null && phone.Length > 0)
            {

                string[] numbers = phone.Split(',');
                string msg = createusername + "领导在" + date + "时对" + casename + "案件提出督办，督办意见：" + supopinion;
                SMSMessagesBLL message = new SMSMessagesBLL();
                message.SendMessage(numbers, msg);
            }
            #endregion
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;

        }


        /// <summary>
        /// 手机端督办上报
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public object AddLeadersuperviseApi(Case_LeadersuperviseModel model)
        {
            try
            {
                if (!string.IsNullOrEmpty(model.mobile))
                {
                    string[] phones = model.mobile.Split(',');
                    SMSMessagesBLL message = new SMSMessagesBLL();
                    message.SendMessage(phones, "");
                }
                int id = bll.AddLeadersupervise(model);
                if (id > 0)
                {
                    return new
                    {
                        msg = "上报成功",
                        resCode = 1
                    };
                }
                else
                {
                    return new
                    {
                        msg = "json数据不正确",
                        resCode = 0
                    };
                }

            }
            catch (Exception)
            {
                return new
                {
                    msg = "json数据不正确",
                    resCode = 0
                };
            }

        }


        /// <summary>
        /// 案件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<AlreadyModel>> GetAlreadySupervise(int start, int limit)
        {
            return bll.GetAlreadySupervise(null, start, limit);
        }

        /// <summary>
        /// 案件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<AlreadyModel>> GetAlreadySupervise(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetAlreadySupervise(filters, start, limit);
        }

        /// <summary>
        /// 督办历史
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_LeadersuperviseModel>> GetLeadersuperviseList(int start, int limit, int caseid)
        {
            return bll.GetLeadersuperviseList(start, limit, caseid);
        }

        /// <summary>
        /// 历史督办(后台)
        /// </summary>
        /// <param name="caseid"></param>
        /// <returns></returns>
        public List<Case_LeadersuperviseModel> GetHistoryLeader(int caseid)
        {
            return bll.GetHistoryLeader(caseid);
        }

        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<AlreadyModel> list = bll.GetAlreadySuperviseExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<AlreadyModel> cfBll = new CommonFunctionBLL<AlreadyModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
    }
}