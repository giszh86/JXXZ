using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Track
{
    public class TrackController : ApiController
    {
        //  localhost:14195/api/Track/GetPlayTrack?ID=3&startTime= &endTime=
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPlayTrack(int ID, DateTime? startTime, DateTime? endTime)
        {
          
            QW_UserHistoryPositionsBLL dal = new QW_UserHistoryPositionsBLL();
            string str = dal.GetPlayTrack(ID, startTime, endTime);
             return str;
        }
    }
}