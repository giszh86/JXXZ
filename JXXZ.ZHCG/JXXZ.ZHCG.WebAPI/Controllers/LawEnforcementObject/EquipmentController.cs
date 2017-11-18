
using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
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
    public class EquipmentController : ApiController
    {
        private Zfdx_InstocksBLL bll = new Zfdx_InstocksBLL();
        private Zfdx_OutstocksBLL bl = new Zfdx_OutstocksBLL();
        private Zfdx_DevicesBLL b = new Zfdx_DevicesBLL();
        private Zfdx_StocksBLL s = new Zfdx_StocksBLL();
        /// <summary>
        /// 设备入库成功
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddInstocks(Zfdx_InstocksModel model)
        {
            int success = bll.AddInstocks(model);
            Zfdx_StocksModel z = new Zfdx_StocksModel();

            //HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string type = model.storagetype;
            z.deviceid = (int)model.deviceid;
            if (type == "3")
            {
                if (model.number != null)
                    z.stocknum = (int)model.number;
            }
            else
            {
                if (model.number != null)
                {
                    z.devicesum = (int)model.number;
                    z.stocknum = (int)model.number;
                }
            }

            s.EditZfdxStocks(z);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            { response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html"); }
            return response;
        }
        /// <summary>
        /// 设备入库列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zfdx_InstocksModel>> GetinstockList(int start, int limit, int deviceid)
        {
            List<Zfdx_InstocksModel> list = new List<Zfdx_InstocksModel>();

            return bll.GetinstockList(null, start, limit, deviceid);
        }
        /// <summary>
        /// 出库设备提交
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddOutstocks(Zfdx_OutstocksModel model)
        {
            int success = bl.AddOutstocks(model);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Zfdx_StocksModel z = new Zfdx_StocksModel();
            z.deviceid = (int)model.deviceid;
            if (model.number != null)
                z.stocknum = 0 - (int)model.number;
            s.EditZfdxStocks(z);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            { response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html"); }
            return response;
        }
        /// <summary>
        /// 出库设备列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zfdx_OutstocksModel>> GetOutstocksList(int start, int limit, int deviceid)
        {
            return bl.GetOutstocksList(null, start, limit, deviceid);
        }
        /// <summary>
        /// 添加设备
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddStocks(Zfdx_DevicesModel model)
        {
            int success = b.AddStocks(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
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
        /// <summary>
        /// 设备列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zfdx_DevicesModel>> GetStocksList(int start, int limit)
        {
            return b.GetStocksList(null, start, limit);
        }
        /// <summary>
        /// 设备列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zfdx_DevicesModel>> GetStocksList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return b.GetStocksList(filters, start, limit);
        }
        /// <summary>
        /// 获取设备详情
        /// </summary>
        /// <param name="deviceid"></param>
        /// <returns></returns>
        [HttpGet]
        public Zfdx_DevicesModel GetDevicesModel(int deviceid)
        {
            return b.GetDevicesModel(deviceid);
        }
        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditStocks(Zfdx_DevicesModel model)
        {
            int success = b.EditStocks(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
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

        #region 导出报表到Excel
        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata,string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<Zfdx_DevicesModel> list = b.GetDevicesListExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<Zfdx_DevicesModel> cfBll = new CommonFunctionBLL<Zfdx_DevicesModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
        #endregion
    }
}