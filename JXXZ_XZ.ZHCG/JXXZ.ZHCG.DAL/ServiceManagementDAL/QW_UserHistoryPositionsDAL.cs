using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using JXXZ.ZHCG.Model.ServiceManagementModel;
using JXXZ.ZHCG.Model;
namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_UserHistoryPositionsDAL
    {
        /// <summary>
        /// 添加用户历史位置
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UserHistoryPositions(QW_UserHistoryPositionsModel model)
        {
            using (Entities db = new Entities())
            {
                qw_userhistorypositions qumodel = new qw_userhistorypositions();

                qumodel.x2000 = model.x2000;
                qumodel.y2000 = model.y2000;
                qumodel.x84 = model.x84;
                qumodel.y84 = model.y84;
                qumodel.userid = model.userid;
                qumodel.positiontime = DateTime.Now;
                qumodel.imeicode = model.imeicode;
                qumodel.speed = model.speed;
                qumodel.addresses = model.address;
                db.qw_userhistorypositions.Add(qumodel);
                return db.SaveChanges();
            }
        }


        public string GetPlayTrack(int ID, DateTime? startTime, DateTime? endTime)
        {

            string slist = "";
            if (startTime == null && endTime == null)
            {
                startTime = DateTime.Now;
                endTime = startTime.Value.AddHours(-2);
            }
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select a.x84 as Longitude, a.y84 as Latitude from qw_userhistorypositions a  where a.userid ={0} and a.positiontime >='{1}' and a.positiontime<='{2}' ORDER BY a.positiontime", ID, startTime, endTime);
                IEnumerable<GPSPoint> query = db.Database.SqlQuery<GPSPoint>(sql);
                foreach (var item in query)
                {
                   slist+= item.Longitude + "," + item.Latitude+";";
                }
            }
            return slist;
        }

    }
}
