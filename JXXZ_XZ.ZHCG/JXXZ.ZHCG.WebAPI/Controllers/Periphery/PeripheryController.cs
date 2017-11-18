using JXXZ.ZHCG.BLL.PeripheryBLL;
using JXXZ.ZHCG.Model.PeripheryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Periphery
{
    public class PeripheryController : ApiController
    {
        //  /api/Periphery/GetApiPeripheryUser?userId=11&latitude=30.2937782287017360&longitude=120.1186494423321600
        /// <summary>
        /// 前台周边信息
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="latitude"></param>
        /// <param name="longitude"></param>
        /// <returns></returns>
        [HttpGet]
        public List<PeripheryApi> GetApiPeripheryUser(int userId, double latitude, double longitude)
        {
            PeripheryBLL peripherybll = new PeripheryBLL();
            Random rnd = new Random();
            List<PeripheryApi> list = peripherybll.GetApiPeripheryUser(longitude, latitude, 1, userId);
            return list;
        }


        //public List<PeripheryInspection> GetMqsbList()//double lat, double lng, double radius)
        //{
        //    double lat = 30.293781188355318;
        //    double lng = 120.11860936160566;
        //    double radius=100000000;
        //    PeripheryBLL peripherybll = new PeripheryBLL();
        //    return peripherybll.GetMqsbList(lat, lng, radius,2);
        //}
    }
}