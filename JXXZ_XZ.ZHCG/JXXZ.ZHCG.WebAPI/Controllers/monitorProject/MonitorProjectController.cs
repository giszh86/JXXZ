using JXXZ.ZHCG.BLL.monitorProjectBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.monitorProjectModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.monitorProject
{
    public class MonitorProjectController : ApiController
    {
        MonitorProjectBLL bll = new MonitorProjectBLL();

        #region 获取监控专题树列表
        [HttpGet]
        public List<TreeMonitorModel> GetMonitoreTreeList()
        {
            return bll.GetMonitoreTreeList();
        }
        #endregion

        #region 获取监控专题元素列表
        [HttpGet]
        public Pag<MonitorListModel> GetMonitorTableList(string filter, int start, int limit, int unitid,string path)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetMonitorTableList(filters, start, limit, unitid, path);
        }

        [HttpGet]
        public Pag<MonitorListModel> GetMonitorTableList(int start, int limit, int unitid, string path)
        {
            return bll.GetMonitorTableList(null, start, limit, unitid, path);
        }
        #endregion

        #region 获取专题监控元素详情
        [HttpGet]
        public MonitorListModel GetGridItem(int unitid, string cameraid)
        {
            return bll.GetGridItem(unitid, cameraid);
        }
        #endregion

        #region 添加监控专题
        [HttpPost]
        public HttpResponseMessage AddMonitorPro(TreeMonitorModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.AddMonitorPro(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 修改监控专题
        [HttpPost]
        public HttpResponseMessage EditMonitorePro(TreeMonitorModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.EditMonitorePro(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 删除监控专题
        [HttpPost]
        public HttpResponseMessage DeleteMonitorPro(int unitid)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.DeleteMonitorPro(unitid);
            if (success > 0)
            {
                response.Content = new StringContent("success", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("failure", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 获取专题监控详情
        [HttpGet]
        public TreeMonitorModel GetMonitorDetail(int unitid)
        {
            return bll.GetMonitorDetail(unitid);
        }
        #endregion

        #region 添加监控专题元素
        [HttpPost]
        public HttpResponseMessage AddMonitorItem(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            MonitorListModel model = new MonitorListModel();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            foreach (JObject item in jo)
            {
                model.unitid = Convert.ToInt32(item["unitid"]);
                model.cameraid = Convert.ToString(item["cameraid"]);
                model.childid = Convert.ToString(item["childid"]);
            }
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.AddMonitorItem(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 修改监控专题元素
        [HttpPost]
        public HttpResponseMessage EditMonitorItem(MonitorListModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.EditMonitorItem(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 删除监控专题元素
        [HttpPost]
        public HttpResponseMessage DeleteMonitorItem(int unitid, string cameraid)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.DeleteMonitorItem(unitid, cameraid);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion
    }
}