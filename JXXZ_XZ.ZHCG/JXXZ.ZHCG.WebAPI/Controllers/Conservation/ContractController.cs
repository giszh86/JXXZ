using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.ConservationBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ConservationModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Conservation
{
    public class ContractController : ApiController
    {
        private YH_ContractBLL bll = new YH_ContractBLL();
        /// <summary>
        /// 当前养护合同列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_ContractModel>> GetContractList(int start, int limit)
        {
            return bll.GetContractList(null, start, limit);
        }

        /// <summary>
        /// 当前养护合同列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_ContractModel>> GetContractList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetContractList(filters, start, limit);
        }
        /// <summary>
        /// 历史养护合同列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_ContractModel>> GetOldContractList(int start, int limit)
        {
            return bll.GetOldContractList(null, start, limit);
        }

        /// <summary>
        /// 历史养护合同列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_ContractModel>> GetOldContractList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetOldContractList(filters, start, limit);
        }

        /// <summary>
        /// 添加养护合同
        /// </summary>
        [HttpPost]
        public HttpResponseMessage AddContract(YH_ContractModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string[] fileClass = model.uploadpanelValue;
            List<FileClass> list = new List<FileClass>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass file = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                }
            }


            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);
            model.contactendtime = model.endtime;
            model.currentmoney = model.summoney;
            int success = bll.AddContract(model, list);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        // api/YhLog/AddLogApi?yhlogid=1
        /// <summary>
        /// 获取养护合同详情
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public YH_ContractModel GetContractModel(int contractid)
        {
            return bll.GetContractModel(contractid);
        }

        // api/YhLog/AddLogApi
        /// <summary>
        /// 添加养护合同
        /// </summary>
        [HttpPost]
        public object AddContractApi(YH_ContractModel model)
        {
            try
            {
                int success = 1;//bll.AddContract(model);
                if (success > 0)
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

        #region 删除养护合同
        [HttpPost]
        public int DeleteContractInf(int contractid)
        {
            return bll.DeleteContractInf(contractid);
        }
        #endregion

        #region 修改养护合同
        [HttpPost]
        public HttpResponseMessage ModifyContractInf(YH_ContractModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;

            int success = 0;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            string[] fileClass = model.uploadpanelValue;
            List<FileUploadClass> list = new List<FileUploadClass>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileUploadClass file = new FileUploadClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                }
            }


            int result = bll.ModifyContractInf(model, list);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 判断养护合同是否有关联
        public int IsContractAssociated(int contractid)
        {
            return bll.IsContractAssociated(contractid);
        }
        #endregion

        /// <summary>
        /// 下拉框
        /// </summary>
        /// <returns></returns>
        public List<SourcesModel> GetHTSourceList()
        {
            return bll.GetSourceList();
        }

        #region 导出当前养护合同列表
        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, int type, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<YH_ContractModel> list = bll.GetContractListExcel(type, filters);

            //获取导出的Excel表
            CommonFunctionBLL<YH_ContractModel> cfBll = new CommonFunctionBLL<YH_ContractModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
        #endregion



        [HttpGet]
        public ExaminesModel GetExaminesModel(int contractid)
        {

            return bll.GetExaminesModel(contractid);
        }
        [HttpGet]
        public List<Fraction> GetFractionList(int examineid)
        {
            return bll.GetFractionList(examineid);
        }

    }
}