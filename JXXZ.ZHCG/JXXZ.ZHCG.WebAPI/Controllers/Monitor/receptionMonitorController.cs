using JXXZ.ZHCG.BLL.MonitorBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using JXXZ.ZHCG.Model.monitorProjectModel;
using JXXZ.ZHCG.Model.MonitorModel;

namespace JXXZ.ZHCG.WebAPI.Controllers.Monitor
{
    public class receptionMonitorController : ApiController
    {
        private receptionMonitorBLL bll = new receptionMonitorBLL();

        /// <summary>
        /// 返回所有监控数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string MonitorAll()
        {
            List<int> VideoList = bll.GetVideoCount();
            string Video = JsonConvert.SerializeObject(VideoList).ToString();
            List<int> SpzsList = bll.GetSpzsCount();
            string Spzs = JsonConvert.SerializeObject(SpzsList).ToString();
            List<int> XcjdList = bll.GetXcjdCount();
            string Xcjd = JsonConvert.SerializeObject(XcjdList).ToString();
            List<int> GzjdList = bll.GetGzjdCount();
            string Gzjd = JsonConvert.SerializeObject(GzjdList).ToString();
            List<int> ZtslList = bll.GetZtslCount();
            string Ztsl = bll.GetMonitoreTreeCount();


            string alldata = Video + "|" + Spzs + "|" + Xcjd + "|" + Gzjd + "|" + Ztsl;
            return alldata;

        }


        #region 获取监控专题树列表
        [HttpGet]
        public List<FI_CameraUnitsTreeModel> GetMonitoreTreeList()
        {
            return bll.GetMonitoreTreeList();
        }
        #endregion


        [HttpGet]
        public string GetMonitoreTreeCount() {
            return bll.GetMonitoreTreeCount();
        }
    }
}