using JXXZ.ZHCG.Model.AlarmDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.AlarmDetail
{
    public class SluggishAlarm
    {
        /// <summary>
        /// 获取队员任务列表
        /// </summary>
        /// <param name="family"></param>
        /// <returns></returns>
        public IQueryable<qw_usertasks> GetAllUserTaskAreas()
        {
            Entities db = new Entities();
            IQueryable<qw_usertasks> us = db.qw_usertasks;
            return us;
        }

        /// <summary>
        /// 获取1000条巡查数据存入临时表
        /// </summary>
        /// <returns></returns>
        public List<qw_userhistorypositions> Get1000PatrolDataToTemporary(int userid)
        {
            Entities db = new Entities();
            var query = db.qw_userhistorypositions.Where(a => a.isanalyze == 0 && a.userid == userid).OrderBy(t => t.positiontime);
            List<qw_userhistorypositions> List = query.Take(1000).ToList();
            // List = List.Where(b => b.USERID == userid).ToList();
            Console.WriteLine("读取1000条数据");

            return List;
        }

        /// <summary>
        /// 根据队员ID和定位时间读取巡查范围(用户ID和任务开始结束时间来确定唯一任务)
        /// </summary>
        /// <param name="family"></param>
        /// <returns></returns>
        public List<string> SelectInspectionScopeByUserID(decimal? UserID, DateTime GPSTIME)
        {
            Entities db = new Entities();
            qw_usertasks model = db.qw_usertasks.Where(a => a.userid == UserID && a.taskstarttime.Year == GPSTIME.Year && a.taskstarttime.Month == GPSTIME.Month && a.taskstarttime.Day == GPSTIME.Day).FirstOrDefault();
            if (model != null)
            {
                List<string> list = new List<string>();

                decimal qut = model.usertaskid;

                IQueryable<qw_patrolareas> result = from uts in db.qw_usertasks
                                                    from area in db.qw_patrolareas
                                                    where uts.patrolid == area.patrolid && uts.usertaskid == qut
                                                    select area;
                foreach (var item in result)
                {
                    list.Add(item.grometry);
                }
                return list;
            }
            else
            {
                return null;
            }
        }

        //射线法判断点是否在多边形区域内
        public bool PointInFences(MapPoint pnt1, IList<MapPoint> fencePnts)
        {
            int j = 0, cnt = 0;
            for (int i = 0; i < fencePnts.Count; i++)
            {
                j = (i == fencePnts.Count - 1) ? 0 : j + 1;
                if ((fencePnts[i].Y != fencePnts[j].Y) && (((pnt1.Y >= fencePnts[i].Y) && (pnt1.Y < fencePnts[j].Y))
                    || ((pnt1.Y >= fencePnts[j].Y) && (pnt1.Y < fencePnts[i].Y)))
                    && (pnt1.X < (fencePnts[j].X - fencePnts[i].X) * (pnt1.Y - fencePnts[i].Y) / (fencePnts[j].Y - fencePnts[i].Y) + fencePnts[i].X))
                {
                    cnt++;
                }
            }
            return (cnt % 2 > 0) ? true : false;
        }


        //将报警信息存入数据库
        public decimal SaveAlarmList(qw_alarmmemorylocationdatas alarmlist, string OutMapID)
        {
            Entities db = new Entities();
            qw_alarmmemorylocationdatas ta = new qw_alarmmemorylocationdatas();
            decimal outmapid = 0;
            decimal.TryParse(OutMapID, out outmapid);
            ta = db.qw_alarmmemorylocationdatas.Where(a => a.id == outmapid).FirstOrDefault();


            ta.longitude = alarmlist.longitude == null ? 0 : (double)alarmlist.longitude;
            ta.latitude = alarmlist.latitude == null ? 0 : (double)alarmlist.latitude;
            //ta.X = alarmlist.X == null ? 0 : (decimal)alarmlist.X;
            //ta.Y = alarmlist.Y == null ? 0 : (decimal)alarmlist.Y;
            ta.speed = alarmlist.speed == null ? 0 : (double)alarmlist.speed;
            ta.gpstime = alarmlist.gpstime;
            ta.createtime = DateTime.Now;
            ta.alarmendtime = alarmlist.alarmendtime;
            ta.alarmstrattime = alarmlist.alarmstrattime;
            ta.alarmtype = alarmlist.alarmtype;
            ta.userid = alarmlist.userid;
            ta.state = 0;
            db.qw_alarmmemorylocationdatas.Add(ta);
            db.SaveChanges();
            return ta.id;
        }

        /// <summary>
        /// 获取最后一次定位信息
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public IQueryable<qw_userlastpositions> GetAllUserLatestPositions(decimal userid)
        {
            Entities db = new Entities();
            IQueryable<qw_userlastpositions> us = db.qw_userlastpositions.Where(t => t.userid == userid);
            return us;
        }

        //计算时间差,返回折合成分钟
        public  decimal DateDiff(DateTime DateTimeNew, DateTime DateTimeOld)
        {
            TimeSpan ts = DateTimeNew - DateTimeOld;
            //时间差转成只用分钟显示
            decimal dateDiff = (decimal)ts.TotalMinutes;
            return dateDiff;
        }

        /// <summary>
        /// 修改分析后的字段
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public  int UpdateISANALYZE(int userid ,DateTime date)
        {
            Entities db = new Entities();
            qw_userhistorypositions _model = db.qw_userhistorypositions.FirstOrDefault(t => t.userid == userid && t.positiontime == date);
            if (_model != null)
            {
                _model.isanalyze = 1;
            }
            return db.SaveChanges();
        }

        //将报警信息存入数据库
        public void SaveAlarmList(AlarmList alarmlist)
        {
            List<qw_alarmmemorylocationdatas> list = GetAllLiat().Where(a => a.userid == alarmlist.USERID && a.alarmstrattime == alarmlist.ALARMSTRATTIME && a.alarmtype == 3).ToList();
            if (list.Count == 0)
            {
                qw_alarmmemorylocationdatas ta = new qw_alarmmemorylocationdatas();
                //ta.id = AlarmListBLL.GetNewAlarmListID();
                ta.longitude = alarmlist.LONGITUDE == null ? 0 : (double)alarmlist.LONGITUDE;
                ta.latitude = alarmlist.LATITUDE == null ? 0 : (double)alarmlist.LATITUDE;
                //ta.X = alarmlist.X2000 == null ? 0 : (decimal)alarmlist.X2000;
                //ta.Y = alarmlist.Y2000 == null ? 0 : (decimal)alarmlist.Y2000;
                ta.speed = alarmlist.SPEED == null ? 0 : (double)alarmlist.SPEED;
                ta.gpstime = alarmlist.GPSTIME;
                ta.createtime = DateTime.Now;
                ta.alarmendtime = alarmlist.ALARMENDTIME;
                ta.alarmstrattime = alarmlist.ALARMSTRATTIME;
                ta.alarmtype = alarmlist.ALARMTYPE;
                ta.userid = alarmlist.USERID;
                ta.state = 0;
                AddTeamMemoryLocationData(ta);
            }
            else
            {
                XGSaveAlarmList(alarmlist);
            }

        }

        /// <summary>
        /// 添加30分钟停留超时报警记录
        /// </summary>
        /// <param name="family"></param>
        /// <returns></returns>
        public  int AddTeamMemoryLocationData(qw_alarmmemorylocationdatas va)
        {
            Entities db = new Entities();
            int al = db.qw_alarmmemorylocationdatas.Where(t => t.alarmstrattime == va.alarmstrattime && t.alarmendtime == va.alarmendtime && t.userid == va.userid && t.alarmtype == va.alarmtype).Count();
            if (al == 0)
            {
                va.createtime = DateTime.Now;
                db.qw_alarmmemorylocationdatas.Add(va);
            }
            return db.SaveChanges();

        }

        //修改报警信息存入数据库
        public void XGSaveAlarmList(AlarmList alarmlist)
        {
            List<qw_alarmmemorylocationdatas> list = GetAllLiat().Where(a => a.userid == alarmlist.USERID && a.alarmstrattime == alarmlist.ALARMSTRATTIME).ToList();
            //  QWGL_ALARMMEMORYLOCATIONDATA ta = new QWGL_ALARMMEMORYLOCATIONDATA();
            foreach (var ta in list)
            {
                //ta.ID = AlarmListBLL.GetNewAlarmListID();
                // ta.LONGITUDE = alarmlist.X84 == null ? 0 : (decimal)alarmlist.X84;
                //  ta.LATITUDE = alarmlist.Y84 == null ? 0 : (decimal)alarmlist.Y84;
                // ta.X = alarmlist.X2000 == null ? 0 : (decimal)alarmlist.X2000;
                // ta.Y = alarmlist.Y2000 == null ? 0 : (decimal)alarmlist.Y2000;
                //  ta.SPEED = alarmlist.SPEED == null ? 0 : (decimal)alarmlist.SPEED;
                //  ta.GPSTIME = alarmlist.GPSTIME;
                ta.createtime = DateTime.Now;
                ta.alarmendtime = alarmlist.ALARMENDTIME;
                //  ta.ALARMSTRATTIME = alarmlist.ALARMSTRATTIME;
                ta.alarmtype = alarmlist.ALARMTYPE;
                //  ta.USERID = alarmlist.USERID;
                // ta.STATE = 0;
                EditTeamMemoryLocationData(ta);
            }

        }

        /// <summary>
        /// 获取所有的报警记录
        /// </summary>
        /// <returns></returns>
        public IQueryable<qw_alarmmemorylocationdatas> GetAllLiat()
        {
            Entities db = new Entities();
            IQueryable<qw_alarmmemorylocationdatas> list = db.qw_alarmmemorylocationdatas.OrderByDescending(t => t.gpstime);
            return list;
        }


        /// <summary>
        ///   修改离线报警
        /// </summary>
        /// <param name="family"></param>
        /// <returns></returns>
        public  int EditTeamMemoryLocationData(qw_alarmmemorylocationdatas va)
        {
            Entities db = new Entities();
            qw_alarmmemorylocationdatas al = db.qw_alarmmemorylocationdatas.Where(t => t.id == va.id).FirstOrDefault();
            if (al != null)
            {
                al.alarmendtime = va.alarmendtime;
                al.createtime = va.createtime;
            }
            return db.SaveChanges();

        }

    }
}
