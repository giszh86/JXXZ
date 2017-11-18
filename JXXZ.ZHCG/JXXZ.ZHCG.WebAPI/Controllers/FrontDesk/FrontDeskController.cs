using JXXZ.ZHCG.BLL.FrontDeskBLL;
using JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL;
using JXXZ.ZHCG.Model.FrontDeskModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.FrontDesk
{
    public class FrontDeskController : ApiController
    {
        private FrontDeskBLL bll = new FrontDeskBLL();

        [HttpGet]
        public List<FrontDeskModel> GetPeriphery(string type, double x84, double y84, double radius)
        {
            //string type = "aj,sj,ry";
            //double x84 = 120.16653154689763;
            //double y84 = 30.260562264020045;
            //double radius = 100;

            List<FrontDeskModel> eventReporred = bll.GetPeriphery(type, x84, y84, radius);
            //string str = JsonConvert.SerializeObject(eventReporred).ToString();
            return eventReporred;
        }

        [HttpGet]
        public List<FrontDeskModel> GetALLPeriphery(string type)
        {
            //string type = "aj,sj,ry";

            List<FrontDeskModel> eventReporred = bll.GetALLPeriphery(type);
            //string str = JsonConvert.SerializeObject(eventReporred).ToString();
            return eventReporred;
        }

        [HttpGet]
        public List<int> GetMenuCount()
        {
            return bll.GetMenuCount();
        }

    
        /// <summary>
        /// 事件
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public int getSjCount()
        { return bll.getSjCount(); }
        /// <summary>
        /// 案件
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public int getAjCount()
        { return bll.getAjCount(); }
         /// <summary>
        /// 框选
        /// </summary>
        /// <returns></returns>
        public List<FrontDeskModel> getcamera(string coordinate1, string coordinate2, string type, int start, int limit)
        {
            //string coordinate1 = "120.11061771147057,30.299925348097243";
            //string coordinate2 = "120.12682758693946,30.288777217427956";
            return bll.getcamera(coordinate1, coordinate2, type, start,limit);
        }


          /// <summary>
        /// 低洼地段报警值
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<decimal> GetDwddPoliceCount()
        {
            return bll.GetDwddPoliceCount();
        }

        /// <summary>
        /// 低洼地段是否报警
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<string> GetDwddIsPolice()
        {
            return bll.GetDwddIsPolice();
        }

        [HttpGet]
        public string GetBj()
        {
            zfdx_LawObjectBLL zlbll = new zfdx_LawObjectBLL();
            int bjnum = bll.getBjCount();
            string sbdllist = bll.GetPartSbdl();
            List<int> sbxllist = new List<int>();
            int one= bll.GetPartSbxl("公共厕所");
            sbxllist.Add(one);
            int two = bll.GetPartSbxl("广告牌匾");
            sbxllist.Add(two);
            int three = bll.GetPartSbxl("消防设施");
            sbxllist.Add(three);
            int four = bll.GetPartSbxl("地下管线");
            sbxllist.Add(four);
            int five = bll.GetPartSbxl("雨水井盖");
            sbxllist.Add(five);
            int six = bll.GetPartSbxl("路灯");
            sbxllist.Add(six);
            int seven = bll.GetPartSbxl("停车场所");
            sbxllist.Add(seven);
            List<decimal> dwddlist = bll.GetDwddPoliceCount();
            List<int> list = zlbll.GetLawObjectNum();
            string str = JsonConvert.SerializeObject(bjnum).ToString() + "|" + sbdllist + "|" + JsonConvert.SerializeObject(sbxllist).ToString() + "|" + JsonConvert.SerializeObject(dwddlist).ToString() + "|" + JsonConvert.SerializeObject(list).ToString();
            return str;
        }

    }
}