using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using JXXZ.ZHCG.Utility;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
    public class QW_UserHistoryPositionsBLL
    {
        /// <summary>
        /// 调入用户历史位置
        /// </summary>
        private QW_UserHistoryPositionsDAL dal = new QW_UserHistoryPositionsDAL();
        public int UserHistoryPositions(QW_UserHistoryPositionsModel model)
        {
            //string geometry = model.x84 + "," + model.y84;
            //string map2000 =new MapXYConvent().WGS84ToCGCS2000(geometry);
            //if (!string.IsNullOrEmpty(map2000))
            //{
            //    model.x2000 = decimal.Parse(map2000.Split(',')[0]);
            //    model.y2000 = decimal.Parse(map2000.Split(',')[1]);
            //}
            return dal.UserHistoryPositions(model);
        }

        public string GetPlayTrack(int ID, DateTime? startTime, DateTime? endTime)
        {
            return dal.GetPlayTrack(ID, startTime, endTime);
        }
    }
}
