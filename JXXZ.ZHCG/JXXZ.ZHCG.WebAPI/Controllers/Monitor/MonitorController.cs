using JXXZ.ZHCG.BLL.MonitorBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.MonitorModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Monitor
{
    public class MonitorController : ApiController
    {
        private FI_Camera_UnitsBLL bll = new FI_Camera_UnitsBLL();
        private FI_CamerasBLL camerasbll = new FI_CamerasBLL();

        /// <summary>
        /// 获取监控树
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<FI_CameraUnitsTreeModel> GetTreeMonitor()
        {
            return bll.GetTreeMonitor(null);
        }
       
        [HttpGet]
        public List<FI_CameraUnitsTreeModel> GetTreeMonitor(string filter)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetTreeMonitor(filters);
        }
        [HttpGet]
        public FI_CamerasModel GetUnitsDetails(string cameraid)
        {
            return camerasbll.GetUnitsDetails(cameraid);
        }

        /// <summary>
        /// 获取监控树
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<FI_CameraUnitsTreeModel> GetTreeMonitorApi()
        {
            return bll.GetTreeMonitorApi(null);
        }

        [HttpGet]
        public List<FI_CameraUnitsTreeModel> GetTreeMonitorApi(string filter)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetTreeMonitorApi(filters);
        }

    }
}
