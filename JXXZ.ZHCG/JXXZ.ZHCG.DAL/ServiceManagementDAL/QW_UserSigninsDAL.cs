
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{

    //签到
    public class QW_UserSigninsDAL
    {

        /// <summary>
        /// 查询签到区域坐标集合
        /// </summary>
        /// <returns></returns>
        public SignInAreaPartModel GetAreaGeometry(int UserId, double x, double y)
        {
            Entities db = new Entities();
            DateTime nowdate = DateTime.Parse(DateTime.Now.ToLongDateString());
            IQueryable<SignInAreaPartModel> Queryable = (from a in db.qw_usertasks
                                                         join b in db.qw_signinareas
                                                         on a.signinareaid equals b.signinareaid
                                                         where a.userid == UserId && a.taskstarttime.Year == nowdate.Year && a.taskstarttime.Month == nowdate.Month && a.taskstarttime.Day == nowdate.Day
                                                         select new SignInAreaPartModel
                                                         {
                                                             areaid = a.signinareaid,
                                                             geometry = b.grometry,
                                                             areaname = b.name,
                                                             areadescription = b.explain,
                                                             start_stime = b.start_stime,
                                                             start_etime = b.start_etime,
                                                             end_stime = b.end_stime,
                                                             end_etime = b.end_etime,
                                                             ssbc = a.ssbc,
                                                             sszd = a.sszd,

                                                         });
            SignInAreaPartModel model = Queryable.FirstOrDefault();
            MapPoint mapmodel = new MapPoint();
            mapmodel.X = x;
            mapmodel.Y = y;
            if (model != null)
            {
                if (!string.IsNullOrEmpty(model.geometry))
                {
                    string[] splitmap = model.geometry.Split(';');
                    List<MapPoint> listmp = new List<MapPoint>();

                    for (int i = 0; i < splitmap.Length; i++)
                    {
                        MapPoint mp = new MapPoint();

                        if (string.IsNullOrEmpty(splitmap[i]))
                        {
                            continue;
                        }

                        mp.X = double.Parse(splitmap[i].Split(',')[0]);
                        mp.Y = double.Parse(splitmap[i].Split(',')[1]);
                        listmp.Add(mp);
                    }

                    //用户是否在签到区域内model
                    if (PointInFences(mapmodel, listmp))
                        model.issignin = true;
                    else
                        model.issignin = false;
                }

                model.usersigninlist = GetSignInById(UserId, nowdate);
            }
            else
            {
                model = new SignInAreaPartModel();
            }

            return model;
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

        /// <summary>
        /// 根据UserId获取今日所有的签到
        /// </summary>
        /// <returns></returns>
        public List<UserSignInModel> GetSignInById(int? UserId, DateTime? nowdate)//, string QueryUserName)
        {
            Entities db = new Entities();
            List<UserSignInModel> list = new List<UserSignInModel>();


            list = (from us in db.qw_usersignins

                    join u in db.base_users
                    on us.userid equals u.id
                    where us.userid == UserId
                    orderby us.signintime descending
                    select new UserSignInModel
                    {
                        sgid = us.usersigninid,
                        username = u.displayname,
                        useravatar = u.avatar,
                        signinall = us.signintime,
                        queryname = u.displayname.ToUpper()
                    }).ToList();

            list = list.Where(a => a.signinall.Value.Year == nowdate.Value.Year && a.signinall.Value.Month == nowdate.Value.Month && a.signinall.Value.Day == nowdate.Value.Day).ToList();
            foreach (var item in list)
            {
                item.signindate = ((DateTime)item.signinall).ToLongDateString();
                item.signintime = (item.signinall.Value.Hour.ToString().Length == 1 ? "0" + item.signinall.Value.Hour.ToString() : item.signinall.Value.Hour.ToString()) + ":" + (item.signinall.Value.Minute.ToString().Length == 1 ? "0" + item.signinall.Value.Minute.ToString() : item.signinall.Value.Minute.ToString());
                item.signinweek = ((DateTime)item.signinall).ToString("dddd", new System.Globalization.CultureInfo("zh-CN"));
            }

            return list;
        }


        /// <summary>
        /// 根据UserId获取所有签到记录
        /// </summary>
        /// <returns></returns>
        public List<UserSignInModel> GetSignInListById(int start, int limit, int UserId)//, string QueryUserName)
        {
            Entities db = new Entities();
            List<UserSignInModel> list = new List<UserSignInModel>();
            DateTime nowdate = DateTime.Now;

            list = (from us in db.qw_usersignins

                    join u in db.base_users
                    on us.userid equals u.id
                    where us.userid == UserId
                    orderby us.signintime descending
                    select new UserSignInModel
                    {
                        sgid = us.usersigninid,
                        username = u.displayname,
                        useravatar = u.avatar,
                        signinall = us.signintime,
                        queryname = u.displayname.ToUpper()
                    }).ToList();

            list = list.Skip(start).Take(limit).ToList();
            foreach (var item in list)
            {
                item.signindate = ((DateTime)item.signinall).ToLongDateString();
                item.signintime = (item.signinall.Value.Hour.ToString().Length == 1 ? "0" + item.signinall.Value.Hour.ToString() : item.signinall.Value.Hour.ToString()) + ":" + (item.signinall.Value.Minute.ToString().Length == 1 ? "0" + item.signinall.Value.Minute.ToString() : item.signinall.Value.Minute.ToString());
                item.signinweek = ((DateTime)item.signinall).ToString("dddd", new System.Globalization.CultureInfo("zh-CN"));
            }

            return list;
        }

        /// <summary>
        /// 根据UserId获取所有签到记录数量
        /// </summary>
        /// <returns></returns>
        public int GetSignInListCount(int UserId)
        {
            Entities db = new Entities();
            DateTime nowdate = DateTime.Now;

            IQueryable<UserSignInModel> list = (from us in db.qw_usersignins

                                                join u in db.base_users
                                                on us.userid equals u.id
                                                where us.userid == UserId
                                                orderby us.signintime descending
                                                select new UserSignInModel
                                                {
                                                    sgid = us.usersigninid,
                                                    username = u.displayname,
                                                    useravatar = u.avatar,
                                                    signinall = us.signintime,
                                                    queryname = u.displayname.ToUpper()
                                                });
            return list.Count();
        }



        /// <summary>
        /// 查询团队已签到数据
        /// </summary>
        /// <param name="time"></param>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <param name="num"></param>
        /// <returns></returns>
        public List<SignInModel> GetUserSignInList(int? sszd, int? ssbc, int start, int limit)
        {
            List<SignInModel> list = new List<SignInModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select qut.userid,us.displayname,us.sex,qus.sszd,qus.ssbc,
case when DATE_FORMAT( MAX(qus.signintime),'%h%i%s') BETWEEN DATE_FORMAT(qsr.end_stime,'%h%i%s') and DATE_FORMAT(qsr.end_etime,'%h%i%s') then MAX(qus.signintime)
ELSE '未签到' end etime,
case when DATE_FORMAT( MIN(qus.signintime),'%h%i%s') BETWEEN DATE_FORMAT(qsr.start_stime,'%h%i%s') and DATE_FORMAT(qsr.start_etime,'%h%i%s') then MIN(qus.signintime)
ELSE '未签到' end stime
from qw_usertasks qut 
left join qw_signinareas qsr on qut.signinareaid=qsr.signinareaid 
right join qw_usersignins qus on qut.userid=qus.userid and date_format(qus.signintime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')
and (( DATE_FORMAT(qus.signintime,'%h%i%s') BETWEEN DATE_FORMAT(qsr.start_stime,'%h%i%s') and DATE_FORMAT(qsr.start_etime,'%h%i%s') )
or ( DATE_FORMAT(qus.signintime,'%h%i%s') BETWEEN DATE_FORMAT(qsr.end_stime,'%h%i%s') and DATE_FORMAT(qsr.end_etime,'%h%i%s') ))
JOIN base_users us on qut.userid = us.id
where date_format(qut.taskstarttime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')

GROUP BY qut.userid");
                IEnumerable<SignInModel> query = db.Database.SqlQuery<SignInModel>(sql);

                if (sszd != 0 && ssbc == 0)
                {
                    list = query.Where(a => a.sszd == sszd).ToList();
                }
                else if (sszd != 0 && ssbc != 0)
                {
                    list = query.Where(a => a.sszd == sszd && a.ssbc == ssbc).ToList();
                }
                else
                {
                    list = query.ToList();
                }
                return list.Skip(start).Take(limit).ToList();
            }
        }
        /// <summary>
        /// 查询团队已签到数据数量
        /// </summary>
        /// <param name="time"></param>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <param name="num"></param>
        /// <returns></returns>
        public int GetUserSignInCount(int? sszd, int? ssbc)
        {
            List<SignInModel> list = new List<SignInModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select qut.userid,us.displayname,us.sex,qus.sszd,qus.ssbc,
case when DATE_FORMAT( MAX(qus.signintime),'%h%i%s') BETWEEN DATE_FORMAT(qsr.end_stime,'%h%i%s') and DATE_FORMAT(qsr.end_etime,'%h%i%s') then MAX(qus.signintime)
ELSE '未签到' end etime,
case when DATE_FORMAT( MIN(qus.signintime),'%h%i%s') BETWEEN DATE_FORMAT(qsr.start_stime,'%h%i%s') and DATE_FORMAT(qsr.start_etime,'%h%i%s') then MIN(qus.signintime)
ELSE '未签到' end stime
from qw_usertasks qut 
left join qw_signinareas qsr on qut.signinareaid=qsr.signinareaid 
right join qw_usersignins qus on qut.userid=qus.userid and date_format(qus.signintime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')
and (( DATE_FORMAT(qus.signintime,'%h%i%s') BETWEEN DATE_FORMAT(qsr.start_stime,'%h%i%s') and DATE_FORMAT(qsr.start_etime,'%h%i%s') )
or ( DATE_FORMAT(qus.signintime,'%h%i%s') BETWEEN DATE_FORMAT(qsr.end_stime,'%h%i%s') and DATE_FORMAT(qsr.end_etime,'%h%i%s') ))
JOIN base_users us on qut.userid = us.id
where date_format(qut.taskstarttime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')

GROUP BY qut.userid");
                IEnumerable<SignInModel> query = db.Database.SqlQuery<SignInModel>(sql);

                if (sszd != 0 && ssbc == 0)
                {
                    list = query.Where(a => a.sszd == sszd).ToList();
                }
                else if (sszd != 0 && ssbc != 0)
                {
                    list = query.Where(a => a.sszd == sszd && a.ssbc == ssbc).ToList();
                }
                else
                {
                    list = query.ToList();
                }
                return list.Count();
            }
        }


        public List<base_units> GetTeam(int userID)
        {
            using (Entities db = new Entities())
            {
                return db.base_units
                    .Where(t => t.unittypeid == 2 || t.unittypeid == 4)
                    .OrderBy(t => t.id).ToList();
            }
        }


        /// <summary>
        /// 获取团队未签到
        /// </summary>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <returns></returns>
        public List<NotSignModel> GetNotSignList(int? sszd, int? ssbc, int start, int limit)
        {
            Entities db = new Entities();
            List<NotSignModel> list = new List<NotSignModel>();
            DateTime nowdate = DateTime.Now;
            string sql = string.Format(@"select a.sszd,a.ssbc,c.start_stime,c.start_etime,c.end_stime,c.end_etime ,d.displayname,d.sex,a.userid
from qw_usertasks a  
LEFT JOIN  qw_usersignins b on a.userid =b.userid and date_format(b.signintime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')
left join qw_signinareas c on a.signinareaid=c.signinareaid
LEFT JOIN base_users d on a.userid=d.id
WHERE b.userid is NULL and date_format(a.taskstarttime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')");
            IEnumerable<NotSignModel> query = db.Database.SqlQuery<NotSignModel>(sql);

            if (sszd != 0 && ssbc == 0)
            {
                list = query.Where(a => a.sszd == sszd).ToList();
            }
            else if (sszd != 0 && ssbc != 0)
            {
                list = query.Where(a => a.sszd == sszd && a.ssbc == ssbc).ToList();
            }
            else
            {
                list = query.ToList();
            }
            return list.Skip(start).Take(limit).ToList();
        }

        /// <summary>
        /// 获取团队未签到
        /// </summary>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <returns></returns>
        public int GetNotSignCount(int? sszd, int? ssbc)
        {
            Entities db = new Entities();
            List<NotSignModel> list = new List<NotSignModel>();
            DateTime nowdate = DateTime.Now;
            string sql = string.Format(@"select a.sszd,a.ssbc,c.start_stime,c.start_etime,c.end_stime,c.end_etime ,d.displayname,d.sex,a.userid
from qw_usertasks a  
LEFT JOIN  qw_usersignins b on a.userid =b.userid and date_format(b.signintime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')
left join qw_signinareas c on a.signinareaid=c.signinareaid
LEFT JOIN base_users d on a.userid=d.id
WHERE b.userid is NULL and date_format(a.taskstarttime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')");
            IEnumerable<NotSignModel> query = db.Database.SqlQuery<NotSignModel>(sql);

            if (sszd != 0 && ssbc == 0)
            {
                list = query.Where(a => a.sszd == sszd).ToList();
            }
            else if (sszd != 0 && ssbc != 0)
            {
                list = query.Where(a => a.sszd == sszd && a.ssbc == ssbc).ToList();
            }
            else
            {
                list = query.ToList();
            }

            return list.Count();
        }


        /// <summary>
        /// 获取签到详情
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public SignInAreaPartModel GetSignDetails(int? userid, DateTime time)
        {
            Entities db = new Entities();
            IQueryable<SignInAreaPartModel> quwryable = from a in db.qw_usertasks
                                                        join b_json in db.qw_signinareas on a.signinareaid equals b_json.signinareaid into bTemp
                                                        from b in bTemp.DefaultIfEmpty()
                                                        join c_json in db.base_units on a.sszd equals c_json.id into cTemp
                                                        from c in cTemp.DefaultIfEmpty()
                                                        join d_json in db.base_units on a.ssbc equals d_json.id into dTemp
                                                        from d in dTemp.DefaultIfEmpty()
                                                        join e_json in db.base_users on a.userid equals e_json.id into eTemp
                                                        from e in eTemp.DefaultIfEmpty()
                                                        select new SignInAreaPartModel
                                                        {
                                                            areaid = a.signinareaid,
                                                            geometry = b.grometry,
                                                            areaname = b.name,
                                                            areadescription = b.explain,
                                                            start_stime = b.start_stime,
                                                            start_etime = b.start_etime,
                                                            end_stime = b.end_stime,
                                                            end_etime = b.end_etime,
                                                            sszd = a.sszd,
                                                            ssbzname = c == null ? "" : c.name,
                                                            ssbc = a.ssbc,
                                                            sszdname = d == null ? "" : d.name,
                                                            time = a.taskstarttime,
                                                            userid = a.userid,
                                                            username = e.displayname


                                                        };
            SignInAreaPartModel model = quwryable.Where(a => a.userid == userid && a.time.Value.Year == time.Year && a.time.Value.Month == time.Month && a.time.Value.Day == time.Day).FirstOrDefault();
            if (model != null)
            {
                model.usersigninlist = GetSignInById(model.userid, model.time);
            }
            return model;
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddUserSignIn(QW_UserSigninsModel model)
        {
            using (Entities db = new Entities())
            {
                int num = 0;
                int type = 0;
                DateTime time = DateTime.Now;
                DateTime dt1 = time.Date;
                DateTime dt2 = time.AddDays(1).Date;

                qw_usersignins qumodel = new qw_usersignins();

                qumodel.X2000 = model.x2000;
                qumodel.Y2000 = model.y2000;

                qumodel.sszd = model.sszd;
                qumodel.ssbc = model.ssbc;
                qumodel.userid = model.userid;
                qumodel.signintime = DateTime.Now;

                qumodel.X84 = model.x84;
                qumodel.Y84 = model.y84;
                qumodel.remark = model.remark;
                db.qw_usersignins.Add(qumodel);
                db.SaveChanges();
                UserTask utmodel = new UserTask();

                IQueryable<UserTask> taskmodel = (from a in db.qw_usertasks
                                                  join b_join in db.qw_signinareas on a.signinareaid equals b_join.signinareaid into bTmp
                                                  from b in bTmp.DefaultIfEmpty()
                                                  where a.userid == model.userid 
                                                  select new UserTask
                                                  {
                                                      taskstarttime = a.taskstarttime,
                                                      userid = a.userid,
                                                      start_stime = b.start_stime,
                                                      start_etime = b.start_etime,
                                                      end_stime = b.end_stime,
                                                      end_etime = b.end_etime,
                                                  });
                utmodel = taskmodel.FirstOrDefault(a => a.taskstarttime >= dt1 && a.taskstarttime < dt2);
                if (utmodel != null)
                {
                    DateTime dt3 = Convert.ToDateTime(utmodel.start_stime.ToString("t"));
                    DateTime dt4 = Convert.ToDateTime(utmodel.start_etime.ToString("t"));

                    DateTime dt5 = Convert.ToDateTime(utmodel.end_stime.ToString("t"));
                    DateTime dt6 = Convert.ToDateTime(utmodel.end_etime.ToString("t"));

                    if (dt3 < time && dt4 > time)
                    {
                        num = 1;
                        type = 1;
                    }
                    else if (dt5 < time && dt6 > time)
                    {
                        num = 1;
                        type = 2;
                    }
                    else
                        num = -1;
                }
                if (num != -1)
                {
                    string sql = string.Format(@"select qut.userid,qus.sszd,qus.ssbc,
case when DATE_FORMAT( MAX(qus.signintime),'%h%i%s') BETWEEN DATE_FORMAT(qsr.end_stime,'%h%i%s') and DATE_FORMAT(qsr.end_etime,'%h%i%s') then MAX(qus.signintime)
ELSE '未签到' end etime,
case when DATE_FORMAT( MIN(qus.signintime),'%h%i%s') BETWEEN DATE_FORMAT(qsr.start_stime,'%h%i%s') and DATE_FORMAT(qsr.start_etime,'%h%i%s') then MIN(qus.signintime)
ELSE '未签到' end stime 
from qw_usertasks qut
left join qw_signinareas qsr on qut.signinareaid=qsr.signinareaid 
right join qw_usersignins qus on qut.userid=qus.userid and date_format(qus.signintime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')
and (( DATE_FORMAT(qus.signintime,'%h%i%s') BETWEEN DATE_FORMAT(qsr.start_stime,'%h%i%s') and DATE_FORMAT(qsr.start_etime,'%h%i%s') )
or ( DATE_FORMAT(qus.signintime,'%h%i%s') BETWEEN DATE_FORMAT(qsr.end_stime,'%h%i%s') and DATE_FORMAT(qsr.end_etime,'%h%i%s') ))
where qus.userid=" + model.userid + " and date_format(qut.taskstarttime,'%Y-%m-%d')=DATE_FORMAT(now(),'%Y-%m-%d')");
                    SignInModel simodel = db.Database.SqlQuery<SignInModel>(sql).FirstOrDefault();
                    if (simodel != null)
                    {
                        if (type == 1)
                        {
                            if (simodel.stime == "未签到")
                                num = 1;
                            else
                                num = -2;
                        }
                        if (type == 2)
                        {
                            if (simodel.etime == "未签到")
                                num = 1;
                            else
                                num = -2;
                        }
                    }
                }
                return num;
            }
        }


    }
}
