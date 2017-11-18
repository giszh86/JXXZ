using JXXZ.ZHCG.DAL.FrontDeskDAL;
using JXXZ.ZHCG.Model.FrontDeskModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.FrontDeskBLL
{
    public class FrontDeskBLL
    {
        private FrontDeskDAL dal = new FrontDeskDAL();

        public List<FrontDeskModel> GetPeriphery(string type, double x84, double y84, double radius)
        {
            return dal.GetPeriphery(type, x84, y84, radius);
        }
        public List<FrontDeskModel> GetALLPeriphery(string type)
        {
            return dal.GetALLPeriphery(type);
        }

        public List<int> GetMenuCount()
        {
            return dal.GetMenuCount();
        }

      
        /// <summary>
        /// 事件
        /// </summary>
        /// <returns></returns>
        public int getSjCount()
        { return dal.getSjCount(); }
        /// <summary>
        /// 案件
        /// </summary>
        /// <returns></returns>
        public int getAjCount()
        { return dal.getAjCount(); }
        /// <summary>
        /// 部件
        /// </summary>
        /// <returns></returns>
        public int getBjCount()
        { return dal.getBjCount(); }


        /// <summary>
        /// 框选
        /// </summary>
        /// <returns></returns>
        public List<FrontDeskModel> getcamera(string coordinate1, string coordinate4, string type, int start, int limit)
        {
            return dal.getcamera(coordinate1, coordinate4,type,start,limit);
        }


          /// <summary>
        /// 低洼地段报警值
        /// </summary>
        /// <returns></returns>
        public List<decimal> GetDwddPoliceCount()
        {
            return dal.GetDwddPolice();
        }


         /// <summary>
        /// 低洼地段是否报警
        /// </summary>
        /// <returns></returns>
        public List<string> GetDwddIsPolice()
        {
            return dal.GetDwddIsPolice();
        }


        public string GetPartSbdl() {
            return dal.GetPartSbdl();
        }

        public int GetPartSbxl(string name)
        {
            return dal.GetPartSbxl(name);
        }


    }
}
