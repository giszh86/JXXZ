using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_UserTasksDAL
    {
        /// <summary>
        /// 添加巡查任务
        /// </summary>
        /// <param name="model"></param>
        public void AddUserTask(QW_UserTasksModel model)
        {
            DateTime StartDate = model.taskstarttime;
            DateTime EndDate = model.taskendtime;
            List<string> weeks = model.weeks;
            List<int> userids = model.userids;

            int Hour = EndDate.Hour;
            int Minute = EndDate.Minute;
            int day = Math.Abs(((TimeSpan)(EndDate - StartDate)).Days);


            for (int i = 0; i < userids.Count(); i++)
            {
                for (int j = 0; j < day + 1; j++)
                {
                    bool result = IsAdd(weeks, StartDate.AddDays(j));
                    if (result == true)
                    {
                        qw_usertasks task = GetUserTaskModel(userids[i], StartDate.AddDays(j));
                        if (task == null)
                        {
                            qw_usertasks qumodel = new qw_usertasks();
                            qumodel.patrolid = model.patrolid;
                            qumodel.signinareaid = model.signinareaid;
                            qumodel.sszd = model.sszd;
                            qumodel.ssbc = model.ssbc;
                            qumodel.userid = userids[i];
                            qumodel.taskstarttime = StartDate.AddDays(j);
                            qumodel.taskendtime = StartDate.AddDays(j).Date.AddHours(Hour).AddMinutes(Minute);
                            qumodel.taskexplain = model.taskexplain;
                            qumodel.createtime = model.createtime;
                            qumodel.createuserid = model.createuserid;
                            Add(qumodel);
                        }

                    }
                }
            }

        }

        public List<qw_usertasks> GetUserTaskList()
        {
            using (Entities db = new Entities())
            {
                IQueryable<qw_usertasks> queryable = db.qw_usertasks.Where(a => a.isdelete == 0);
                return queryable.ToList();
            }

        }

        /// <summary>
        /// 修改任务
        /// </summary>
        /// <param name="model"></param>
        public int ModifyUserTask(QW_UserTasksModel model)
        {
            using (Entities db = new Entities())
            {
                qw_usertasks task = db.qw_usertasks.Where(a => a.userid == model.userid && a.taskstarttime == model.taskstarttime).FirstOrDefault();

                if (task != null)
                {
                    task.patrolid = model.patrolid;
                    task.signinareaid = model.signinareaid;
                    task.taskexplain = model.taskexplain;
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 删除任务
        /// </summary>
        /// <param name="model"></param>
        public int DeleteUserTask(int usertaskid)
        {
            using (Entities db = new Entities())
            {
                qw_usertasks task = db.qw_usertasks.FirstOrDefault(a => a.usertaskid == usertaskid);
                if (task != null)
                {
                    db.qw_usertasks.Remove(task);
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 查询任务详情
        /// </summary>
        /// <param name="userid">人员id</param>
        /// <param name="StartDate">开始时间</param>
        /// <returns></returns>
        public QW_UserTasksModel GetUserTask(int userid, DateTime StartDate)
        {
            Entities db = new Entities();
            DateTime dt1 = StartDate.Date;
            DateTime dt2 = StartDate.AddDays(1).Date;
            QW_UserTasksModel model = (from ut in db.qw_usertasks
                                       join sa in db.qw_signinareas on ut.signinareaid equals sa.signinareaid
                                       join pa in db.qw_patrolareas on ut.patrolid equals pa.patrolid
                                       where ut.userid == userid && ut.taskstarttime >= dt1 && ut.taskstarttime < dt2
                                       select new QW_UserTasksModel
                                       {
                                           usertaskid = ut.usertaskid,
                                           patrolid = ut.patrolid,
                                           signingrometry = sa.grometry,
                                           patrolgrometry = pa.grometry,
                                           signinareaid = ut.signinareaid,
                                           sszd = ut.sszd,
                                           ssbc = ut.ssbc,
                                           userid = ut.userid,
                                           taskstarttime = ut.taskstarttime,
                                           taskendtime = ut.taskendtime,
                                           taskexplain = ut.taskexplain,
                                       }).SingleOrDefault();

            return model;
        }


        public bool IsAdd(List<string> weeks, DateTime time)
        {
            bool result = false;
            if (weeks != null)
            {
                foreach (string item in weeks)
                {
                    if (((int)time.DayOfWeek).ToString() == item)
                    {
                        result = true;
                        break;
                    }
                }
            }
            return result;
        }

        /// <summary>
        /// 添加排班任务
        /// </summary>
        /// <param name="model"></param>
        public void Add(qw_usertasks model)
        {
            using (Entities db = new Entities())
            {
                db.qw_usertasks.Add(model);
                db.SaveChanges();
            }
        }


        public qw_usertasks GetUserTaskModel(int userID, DateTime date)
        {
            using (Entities db = new Entities())
            {
                DateTime dt1 = date.Date;
                DateTime dt2 = date.AddDays(1).Date;
                qw_usertasks result = db.qw_usertasks.SingleOrDefault(a => a.userid == userID && a.taskstarttime >= dt1 && a.taskstarttime < dt2);
                return result;
            }
        }
        public qw_usertasks GetUserTaskModel(int usertaskid)
        {
            using (Entities db = new Entities())
            {

                qw_usertasks result = db.qw_usertasks.SingleOrDefault(a => a.usertaskid == usertaskid);
                return result;
            }
        }

        public List<UserTask> GetNewUserTaskList(int userid, int start, int limit)
        {
            List<UserTask> list = new List<UserTask>();
            DateTime time = DateTime.Now.Date;
            using (Entities db = new Entities())
            {

                IQueryable<UserTask> queryable = from a in db.qw_usertasks
                                                 join b_join in db.qw_signinareas on a.signinareaid equals b_join.signinareaid into bTmp
                                                 from b in bTmp.DefaultIfEmpty()
                                                 join c_join in db.qw_patrolareas on a.patrolid equals c_join.patrolid into cTmp
                                                 from c in cTmp.DefaultIfEmpty()
                                                 where a.userid == userid && a.taskstarttime >= time && a.isdelete == 0
                                                 select new UserTask
                                                 {
                                                     usertaskid = a.usertaskid,
                                                     patrolid = a.patrolid,
                                                     signinareaid = a.signinareaid,
                                                     patrolname = c.name,
                                                     signinareaname = b.name,
                                                     taskstarttime = a.taskstarttime,
                                                     taskendtime = a.taskendtime,
                                                     taskexplain = a.taskexplain,
                                                     userid = a.userid,
                                                     start_stime = b.start_stime,
                                                     start_etime = b.start_etime,
                                                     end_stime = b.end_stime,
                                                     end_etime = b.end_etime,
                                                     qdgrometry = b.grometry,
                                                     xcgrometry = c.grometry,
                                                 };
                list = queryable.OrderBy(a => a.taskstarttime).Skip(start).Take(limit).ToList();
            }
            return list;
        }
        public int GetNewUserTaskCount(int userid)
        {
            DateTime time = DateTime.Now.Date;
            using (Entities db = new Entities())
            {

                IQueryable<UserTask> queryable = from a in db.qw_usertasks
                                                 join b_join in db.qw_signinareas on a.signinareaid equals b_join.signinareaid into bTmp
                                                 from b in bTmp.DefaultIfEmpty()
                                                 join c_join in db.qw_patrolareas on a.patrolid equals c_join.patrolid into cTmp
                                                 from c in cTmp.DefaultIfEmpty()
                                                 where a.userid == userid && a.taskstarttime >= time && a.isdelete == 0
                                                 select new UserTask
                                                 {
                                                     usertaskid = a.usertaskid,
                                                     patrolid = a.patrolid,
                                                     signinareaid = a.signinareaid,
                                                     patrolname = c.name,
                                                     signinareaname = b.name,
                                                     taskstarttime = a.taskstarttime,
                                                     taskendtime = a.taskendtime,
                                                     taskexplain = a.taskexplain,
                                                     userid = a.userid,
                                                     start_stime = b.start_stime,
                                                     start_etime = b.start_etime,
                                                     end_stime = b.end_stime,
                                                     end_etime = b.end_etime,
                                                     qdgrometry = b.grometry,
                                                     xcgrometry = c.grometry,
                                                 };
                return queryable.Count();
            }

        }

        public List<UserTask> GetOldUserTaskList(int userid, int start, int limit)
        {
            List<UserTask> list = new List<UserTask>();
            DateTime time = DateTime.Now.Date;
            using (Entities db = new Entities())
            {

                IQueryable<UserTask> queryable = from a in db.qw_usertasks
                                                 join b_join in db.qw_signinareas on a.signinareaid equals b_join.signinareaid into bTmp
                                                 from b in bTmp.DefaultIfEmpty()
                                                 join c_join in db.qw_patrolareas on a.patrolid equals c_join.patrolid into cTmp
                                                 from c in cTmp.DefaultIfEmpty()
                                                 where a.userid == userid && a.taskstarttime < time && a.isdelete == 0
                                                 select new UserTask
                                                 {
                                                     usertaskid = a.usertaskid,
                                                     patrolid = a.patrolid,
                                                     signinareaid = a.signinareaid,
                                                     patrolname = c.name,
                                                     signinareaname = b.name,
                                                     taskstarttime = a.taskstarttime,
                                                     taskendtime = a.taskendtime,
                                                     taskexplain = a.taskexplain,
                                                     userid = a.userid,
                                                     start_stime = b.start_stime,
                                                     start_etime = b.start_etime,
                                                     end_stime = b.end_stime,
                                                     end_etime = b.end_etime,
                                                     qdgrometry = b.grometry,
                                                     xcgrometry = c.grometry,
                                                 };
                list = queryable.OrderByDescending(a => a.taskstarttime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        public int GetOldUserTaskCount(int userid)
        {
            DateTime time = DateTime.Now.Date;
            using (Entities db = new Entities())
            {

                IQueryable<UserTask> queryable = from a in db.qw_usertasks
                                                 join b_join in db.qw_signinareas on a.signinareaid equals b_join.signinareaid into bTmp
                                                 from b in bTmp.DefaultIfEmpty()
                                                 join c_join in db.qw_patrolareas on a.patrolid equals c_join.patrolid into cTmp
                                                 from c in cTmp.DefaultIfEmpty()
                                                 where a.userid == userid && a.taskstarttime < time && a.isdelete == 0
                                                 select new UserTask
                                                 {
                                                     usertaskid = a.usertaskid,
                                                     patrolid = a.patrolid,
                                                     signinareaid = a.signinareaid,
                                                     patrolname = c.name,
                                                     signinareaname = b.name,
                                                     taskstarttime = a.taskstarttime,
                                                     taskendtime = a.taskendtime,
                                                     taskexplain = a.taskexplain,
                                                     userid = a.userid,
                                                     start_stime = b.start_stime,
                                                     start_etime = b.start_etime,
                                                     end_stime = b.end_stime,
                                                     end_etime = b.end_etime,
                                                     qdgrometry = b.grometry,
                                                     xcgrometry = c.grometry,
                                                 };
                return queryable.Count();
            }

        }

        /// <summary>
        /// 查询任务详情
        /// </summary>
        /// <returns></returns>
        public UserTask GetUserTaskModelApi(int usertaskid)
        {
            using (Entities db = new Entities())
            {
                UserTask model = (from a in db.qw_usertasks
                                  join b_join in db.qw_signinareas on a.signinareaid equals b_join.signinareaid into bTmp
                                  from b in bTmp.DefaultIfEmpty()
                                  join c_join in db.qw_patrolareas on a.patrolid equals c_join.patrolid into cTmp
                                  from c in cTmp.DefaultIfEmpty()
                                  where a.usertaskid == usertaskid && a.isdelete == 0
                                  select new UserTask
                                  {
                                      usertaskid = a.usertaskid,
                                      patrolid = a.patrolid,
                                      signinareaid = a.signinareaid,
                                      patrolname = c.name,
                                      signinareaname = b.name,
                                      taskstarttime = a.taskstarttime,
                                      taskendtime = a.taskendtime,
                                      taskexplain = a.taskexplain,
                                      userid = a.userid,
                                      start_stime = b.start_stime,
                                      start_etime = b.start_etime,
                                      end_stime = b.end_stime,
                                      end_etime = b.end_etime,
                                      qdgrometry = b.grometry,
                                      xcgrometry = c.grometry,
                                  }).SingleOrDefault();

                return model;
            }
        }

        public List<UserTask> GetApiUserTaskList(int userID)
        {
            List<UserTask> list = new List<UserTask>();
            using (Entities db = new Entities())
            {
                DateTime date = DateTime.Now;
                DateTime dt1 = date.Date;
                DateTime dt2 = date.AddDays(1).Date;
                //qw_usertasks result = db.qw_usertasks.SingleOrDefault(a => a.userid == userID && a.taskstarttime >= dt1 && a.taskstarttime < dt2);
               IQueryable<UserTask> querybale = (from a in db.qw_usertasks
                                  join b_join in db.qw_signinareas on a.signinareaid equals b_join.signinareaid into bTmp
                                  from b in bTmp.DefaultIfEmpty()
                                  join c_join in db.qw_patrolareas on a.patrolid equals c_join.patrolid into cTmp
                                  from c in cTmp.DefaultIfEmpty()
                                  where a.userid == userID && a.taskstarttime >= dt1 && a.taskstarttime < dt2
                                  select new UserTask
                                  {
                                      usertaskid = a.usertaskid,
                                      patrolid = a.patrolid,
                                      signinareaid = a.signinareaid,
                                      patrolname = c.name,
                                      signinareaname = b.name,
                                      taskstarttime = a.taskstarttime,
                                      taskendtime = a.taskendtime,
                                      taskexplain = a.taskexplain,
                                      userid = a.userid,
                                      start_stime = b.start_stime,
                                      start_etime = b.start_etime,
                                      end_stime = b.end_stime,
                                      end_etime = b.end_etime,
                                      qdgrometry = b.grometry,
                                      xcgrometry = c.grometry,
                                  });
               list = querybale.ToList();
               return list;
            }
        }
    }
}
