using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LawEnforcementObject
{
    public class LawObjectController : ApiController
    {
        zfdx_LawObjectBLL bll = new zfdx_LawObjectBLL();

        #region 沿街店家列表
        [HttpGet]
        public Paging<List<Zfdx_LawStreetStoreModel>> GetStreeShopList(string filter, int start, int limit, int type)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetStreeShopList(filters, start, limit, type);
        }

        [HttpGet]
        public Paging<List<Zfdx_LawStreetStoreModel>> GetStreeShopList(int start, int limit, int type)
        {
            return bll.GetStreeShopList(null, start, limit, type);
        }
        #endregion

        #region 沿街店家新增
        [HttpPost]
        public HttpResponseMessage AddStreetShop(Zfdx_LawStreetStoreModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);
            int success = bll.AddStreetShop(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 沿街店家修改
        [HttpPost]
        public HttpResponseMessage ModifyStreetShopInf(Zfdx_LawStreetStoreModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.ModifyStreetShopInf(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 沿街店家删除
        [HttpPost]
        public HttpResponseMessage DeleteStreetShopsInf(int zfdx_shopid)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.DeleteStreetShopsInf(zfdx_shopid);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 沿街店家查看详情
        [HttpGet]
        public Zfdx_LawStreetStoreModel GetStreetShopsInf(int zfdx_shopid)
        {
            return bll.GetStreetShopsInf(zfdx_shopid);
        }
        #endregion

        #region 沿街店家设为黑名单
        [HttpPost]
        public HttpResponseMessage AddStoreInBlackList(int zfdx_shopid)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.AddStoreInBlackList(zfdx_shopid);
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

        #region 解除黑名单
        [HttpPost]
        public HttpResponseMessage RemoveStoreInBlackList(int zfdx_shopid)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.RemoveStoreInBlackList(zfdx_shopid);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 小摊小贩新增
        [HttpPost]
        public HttpResponseMessage AddHawker(Zfdx_LawStreetStoreModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);
            int success = bll.AddHawker(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 小摊小贩信息修改
        [HttpPost]
        public HttpResponseMessage Editxf(Zfdx_LawStreetStoreModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.Editxf(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 小摊小贩查看详情
        [HttpGet]
        public Zfdx_LawStreetStoreModel GetHawkerInf(int zfdx_shopid)
        {
            return bll.GetHawkerInf(zfdx_shopid);
        }
        #endregion

        #region 黑名单列表
        [HttpGet]
        public Paging<List<Zfdx_LawStreetStoreModel>> GetBlackList(string filter, int start, int limit, int type)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetBlackList(filters, start, limit, type);
        }

        [HttpGet]
        public Paging<List<Zfdx_LawStreetStoreModel>> GetBlackList(int start, int limit, int type)
        {
            return bll.GetBlackList(null, start, limit, type);
        }
        #endregion

        #region 统计报表数据
        [HttpGet]
        public List<int> GetDiffTypeCount(int type, int isBlack)
        {
            return bll.GetDiffTypeCount(type, isBlack);
        }
        #endregion

        #region 获取报表最多人数
        [HttpGet]
        public int GetMaxNum(int isBlack)
        {
            return bll.GetMaxNum(isBlack);
        }
        #endregion

        #region 导出报表到Excel
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

            List<Zfdx_LawStreetStoreModel> list = bll.GetBlackListExcel(type, filters);

            //获取导出的Excel表
            CommonFunctionBLL<Zfdx_LawStreetStoreModel> cfBll = new CommonFunctionBLL<Zfdx_LawStreetStoreModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
        #endregion

        #region API
        [HttpPost]
        public object AddHawkerApi(Zfdx_LawStreetStoreModel model)
        {
            try
            {
                int success = bll.AddHawker(model);
                if (success > 0)
                {
                    return new
                    {
                        msg = "添加成功",
                        resCode = 1
                    };
                }
                else
                {
                    return new
                    {
                        msg = "添加失败",
                        resCode = 0
                    };
                }
            }
            catch (Exception)
            {
                return new
                {
                    msg = "添加失败",
                    resCode = 0
                };
            }
        }

        [HttpPost]
        public object EditxfApi(Zfdx_LawStreetStoreModel model)
        {
            try
            {
                int success = bll.Editxf(model);
                if (success > 0)
                {
                    return new
                    {
                        msg = "成功",
                        resCode = 1
                    };
                }
                else
                {
                    return new
                    {
                        msg = "失败",
                        resCode = 0
                    };
                }
            }
            catch (Exception)
            {
                return new
                {
                    msg = "上报失败",
                    resCode = 0
                };
            }
        }

        [HttpPost]
        public object DeleteStreetShopsInfApi(int zfdx_shopid)
        {
            try
            {
                int success = bll.DeleteStreetShopsInf(zfdx_shopid);
                if (success > 0)
                {
                    return new
                    {
                        msg = "成功",
                        resCode = 1
                    };
                }
                else
                {
                    return new
                    {
                        msg = "失败",
                        resCode = 0
                    };
                }
            }
            catch (Exception)
            {
                return new
                {
                    msg = "失败",
                    resCode = 0
                };
            }
          
        }

        [HttpPost]
        public object AddStoreInBlackListApi(int zfdx_shopid)
        {
            try
            {
                int success = bll.AddStoreInBlackList(zfdx_shopid);
                if (success > 0)
                {
                    return new
                    {
                        msg = "成功",
                        resCode = 1
                    };
                }
                else
                {
                    return new
                    {
                        msg = "失败",
                        resCode = 0
                    };
                }
            }
            catch (Exception)
            {
                return new
                {
                    msg = "上报失败",
                    resCode = 0
                };
            }
            
        }

        #endregion

        /// <summary>
        /// 统计报表导出
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage ExportExcel()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string excelname = request["excelname"];
            string exceltitle = request["exceltitle"];
            string canvas1 = request["canvas1"];
            string canvas2 = request["canvas2"];
            CommonFunctionEchartsBLL bll = new CommonFunctionEchartsBLL();
            canvas1 = canvas1.Split(',')[1];
            canvas2 = canvas2.Split(',')[1];

            return bll.CreateExcelEcharts(excelname, exceltitle,canvas1, canvas2);
        }


        [HttpGet]
        public string GetLawObjectNum()
        {
            List<int> list= bll.GetLawObjectNum();
            string str = JsonConvert.SerializeObject(list).ToString();
            return str;
        }

    }
}