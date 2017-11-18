using JXXZ.ZHCG.BLL.receptionFirstPage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;

namespace JXXZ.ZHCG.WebAPI.Controllers.receptionFirstPage
{
    /// <summary>
    /// 前台首页接口
    /// </summary>
    public class receptionFirstPageController : ApiController
    {
        receptionFirstPageBLL bll = new receptionFirstPageBLL();
        /// <summary>
        /// 获取前台首页数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetFirstPage()
        {
            List<int> caselist = bll.getCase();
            List<int> eventlist= bll.GetEvent();
            List<int> eventChart = bll.GetEventChart();
            List<int> ListProgress = bll.getProgress();
            string longstring = JsonConvert.SerializeObject(caselist).ToString() + "|" + JsonConvert.SerializeObject(eventlist).ToString() + "|" + JsonConvert.SerializeObject(eventChart) + "|" + JsonConvert.SerializeObject(ListProgress).ToString();
            return longstring;
        }
    }
}
