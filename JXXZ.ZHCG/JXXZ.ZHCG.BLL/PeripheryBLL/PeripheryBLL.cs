using JXXZ.ZHCG.DAL.PeripheryDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.PeripheryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.PeripheryBLL
{
   public class PeripheryBLL
    {
       private PeripheryDAL dal = new PeripheryDAL();

       public List<PeripheryModel> GetPeripheryUser(double x84, double y84, double radius,int userid)
       {
           return dal.GetPeripheryUser(x84, y84, radius, userid);
       }


       public List<PeripheryApi> GetApiPeripheryUser(double x84, double y84, double radius, int userid)
       {
           return dal.GetApiPeripheryUser(x84, y84, radius, userid);
       }

       public string GetSoSContent(int userid)
       {
           return dal.GetSoSContent(userid);
       }

       public Paging<List<PeripheryInspection>> GetMqsbList(List<Filter> filters,double lat, double lng, double radius, int type, int start, int limit)
       {
           List<PeripheryInspection> items = dal.GetMqsbList(filters,lat, lng, radius, type, start, limit).ToList();
           int total = dal.GetMqsbCount(filters,lat, lng, radius, type);
           Paging<List<PeripheryInspection>> paging = new Paging<List<PeripheryInspection>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }


         /// <summary>
        /// 获取周边人员求助数量
        /// </summary>
        /// <param name="x84"></param>
        /// <param name="y84"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
       public int GetPeripheryUserCount(double x84, double y84, double radius, int userid)
       {
           return dal.GetPeripheryUserCount(x84, y84, radius, userid);
       }
    }
}
