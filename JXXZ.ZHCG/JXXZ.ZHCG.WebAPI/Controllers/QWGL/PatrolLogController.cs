using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Text;

namespace JXXZ.ZHCG.WebAPI.Controllers.QWGL
{
    public class PatrolLogController : ApiController
    {
        private QW_PatrolLogsBLL bll = new QW_PatrolLogsBLL();

        //  api/PatrolLog/AddPatrolLogs
        /// <summary>
        /// 上传成功
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public object AddPatrolLogs(PatrolLog model)
        {
            QW_PatrolLogModel qpmodel = new QW_PatrolLogModel();
            int success = 0;
            string checkid = "";
            string checkname = "";
            foreach (var item in model.list)
            {
                if (item.isnot != 0)
                {
                    checkid += item.id + ",";
                    checkname += item.name + ",";
                    qpmodel.isfound = item.isnot;
                }

            }
            if (checkid == "" && checkname == "")
            {
                foreach (var ite in model.list)
                {
                    checkid += ite.id + ",";
                    checkname += ite.name + ",";
                    qpmodel.isfound = 0;
                }
            }
            qpmodel.checkid = checkid;
            qpmodel.checkname = checkname.Substring(0, checkname.Length - 1);
            qpmodel.userid = model.userid;
            qpmodel.remark = model.remark;
            success = bll.AddPatrolLogs(qpmodel);
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
        /// <summary>
        /// 巡查日志列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_PatrolLogModel>> GetPatrolLogsList(int start, int limit)
        {
            return bll.GetPatrolLogsList(null, start, limit);
        }
        /// <summary>
        /// 筛选后巡查日志列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_PatrolLogModel>> GetPatrolLogsList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetPatrolLogsList(filters, start, limit);
        }
    }
}