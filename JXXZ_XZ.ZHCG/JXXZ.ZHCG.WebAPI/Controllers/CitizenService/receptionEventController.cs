using JXXZ.ZHCG.BLL.CitizenServiceBLL;
using JXXZ.ZHCG.Model.echarts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.CitizenService
{
    public class receptionEventController : ApiController
    {

        /// <summary>
        /// 返回所有事件数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string eventAll()
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<spiderMap> list = bll.getEventData();
            string radardata = JsonConvert.SerializeObject(list).ToString();
            List<string> listlegend = bll.GetEventLinelegend();
            string linelegend = JsonConvert.SerializeObject(listlegend).ToString();
            List<int> eventReporred = bll.GetEventLineReportedData();
            string eventReporredLine = JsonConvert.SerializeObject(eventReporred).ToString();
            List<int> eventInProcess = bll.GetEventLineInProcess();
            string eventInProcessLine = JsonConvert.SerializeObject(eventInProcess).ToString();
            List<int> eventFinished = bll.GetEventLineFinished();
            string eventFinishedLine = JsonConvert.SerializeObject(eventFinished).ToString();
            List<JXXZ.ZHCG.Model.CitizenServiceModel.EventModel> eventlist = bll.GetAllByNowDay();
            string eventlists = JsonConvert.SerializeObject(eventlist).ToString();
            string alldata = radardata + "|" + linelegend + "|" + eventReporredLine + "|" + eventInProcessLine + "|" + eventFinishedLine + "|" + eventlists;
            return alldata;
        }

        /// <summary>
        /// 事件统计
        /// </summary>
        /// <returns></returns>
        public string getEvent()
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<int> events = bll.getEvent();
            string str = JsonConvert.SerializeObject(events).ToString();
            return str;
        }

        /// <summary>
        /// 各中队事件概况
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public string getEventProfile(int type)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<int> sbs = bll.GetSbsEventTypeStatistics(type);
            List<int> cls = bll.GetClsEventTypeStatistics(type);
            List<int> jas = bll.GetJasEventTypeStatistics(type);
            string str = JsonConvert.SerializeObject(sbs).ToString() + "|" + JsonConvert.SerializeObject(cls).ToString() + "|" + JsonConvert.SerializeObject(jas).ToString();
            return str;
        }

        /// <summary>
        /// 七天事件趋势图
        /// </summary>
        /// <returns></returns>
        public string getEventTrend()
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();

            List<string> listlegend = bll.GetEventLinelegend();
            string linelegend = JsonConvert.SerializeObject(listlegend).ToString();
            List<int> eventReporred = bll.GetEventLineReportedData();
            string eventReporredLine = JsonConvert.SerializeObject(eventReporred).ToString();
            string str = linelegend + "|" + eventReporredLine;
            return str;
        }


        /// <summary>
        /// 案件来源前六数据
        /// </summary>
        /// <returns></returns>
        public string getEventBytype()
        { 
             SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
             return bll.getEventBytype();
        }
    }
}
