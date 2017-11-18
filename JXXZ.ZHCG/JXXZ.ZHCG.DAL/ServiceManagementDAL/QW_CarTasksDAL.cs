using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
   public class QW_CarTasksDAL
    {

        /// <summary>
        /// 添加巡查任务
        /// </summary>
        /// <param name="model"></param>
        public void AddCaeTask(QW_CarTasksModel model)
        {
            DateTime StartDate = model.taskstarttime;
            DateTime EndDate = model.taskendtime;
            List<string> weeks = model.weeks;
            List<CarNum> carnums = model.carnums;

            int Hour = EndDate.Hour;
            int Minute = EndDate.Minute;
            int day = Math.Abs(((TimeSpan)(EndDate - StartDate)).Days);


            for (int i = 0; i < carnums.Count(); i++)
            {
                for (int j = 0; j < day + 1; j++)
                {
                    bool result = IsAdd(weeks, StartDate.AddDays(j));
                    if (result == true)
                    {
                        qw_cartasks task = GetCarTaskModel(carnums[i].carnum, StartDate.AddDays(j));
                        if (task == null)
                        {
                            qw_cartasks qcmodel = new qw_cartasks();
                            qcmodel.patrolid = model.patrolid;
                            qcmodel.sszd = model.sszd;
                            qcmodel.ssbc = model.ssbc;
                            qcmodel.carnum = carnums[i].carnum;
                            qcmodel.carid = carnums[i].carid;
                            qcmodel.taskstarttime = StartDate.AddDays(j);
                            qcmodel.taskendtime = StartDate.AddDays(j).Date.AddHours(Hour).AddMinutes(Minute);
                            qcmodel.taskexplain = model.taskexplain;
                            qcmodel.createtime = model.createtime;
                            qcmodel.createuserid = model.createuserid;
                            Add(qcmodel);
                        }

                    }
                }
            }

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

        public qw_cartasks GetCarTaskModel(string carnum, DateTime date)
        {
            using (Entities db = new Entities())
            {
                DateTime dt1 = date.Date;
                DateTime dt2 = date.AddDays(1).Date;
                qw_cartasks result = db.qw_cartasks.SingleOrDefault(a => a.carnum == carnum && a.taskstarttime >= dt1 && a.taskstarttime < dt2);
                return result;
            }
        }

        /// <summary>
        /// 添加排班任务
        /// </summary>
        /// <param name="model"></param>
        public void Add(qw_cartasks model)
        {
            using (Entities db = new Entities())
            {
                db.qw_cartasks.Add(model);
                db.SaveChanges();
            }
        }



        /// <summary>
        /// 修改任务
        /// </summary>
        /// <param name="model"></param>
        public int ModifyCarTask(QW_CarTasksModel model)
        {
            using (Entities db = new Entities())
            {
                qw_cartasks task = db.qw_cartasks.Where(a => a.carnum == model.carnum && a.taskstarttime == model.taskstarttime).FirstOrDefault();
                if (task != null)
                {
                    task.patrolid = model.patrolid;
                    task.taskexplain = model.taskexplain;
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 删除任务
        /// </summary>
        /// <param name="model"></param>
        public int DeleteCarTask(int cartaskid)
        {
            using (Entities db = new Entities())
            {
                qw_cartasks task = db.qw_cartasks.FirstOrDefault(a => a.cartaskid == cartaskid);
                if (task != null)
                {
                    db.qw_cartasks.Remove(task);
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 根据ID查询车牌号
        /// </summary>
        /// <param name="model"></param>
        public string GetCarNumByID(int carid)
        {
            using (Entities db = new Entities())
            {
                return db.qw_cars.FirstOrDefault(t => t.carid == carid).carnumber;
            }
        }

        public List<qw_cartasks> GetCarTaskList()
        {
            using (Entities db = new Entities())
            {
                IQueryable<qw_cartasks> queryable = db.qw_cartasks.Where(a => a.isdelete == 0);
                return queryable.ToList();
            }

        }

        /// <summary>
        /// 查询任务详情
        /// </summary>
        /// <param name="userid">人员id</param>
        /// <param name="StartDate">开始时间</param>
        /// <returns></returns>
        public QW_CarTasksModel GetCarTask(string carnum, DateTime StartDate)
        {
            Entities db = new Entities();
            DateTime dt1 = StartDate.Date;
            DateTime dt2 = StartDate.AddDays(1).Date;
            QW_CarTasksModel model = (from ut in db.qw_cartasks
                                    join pa in db.qw_patrolareas on ut.patrolid equals pa.patrolid
                                    where ut.carnum == carnum && ut.taskstarttime >= dt1 && ut.taskstarttime < dt2
                                    select new QW_CarTasksModel
                                    {
                                        cartaskid = ut.cartaskid,
                                        patrolid = ut.patrolid,
                                        patrolgrometry = pa.grometry,
                                        sszd = ut.sszd,
                                        ssbc = ut.ssbc,
                                        taskstarttime = ut.taskstarttime,
                                        taskendtime = ut.taskendtime,
                                        taskexplain = ut.taskexplain,
                                    }).SingleOrDefault();

            return model;
        }


    
        public qw_cartasks GetCarTaskModel(int cartaskid)
        {
            using (Entities db = new Entities())
            {

                qw_cartasks result = db.qw_cartasks.SingleOrDefault(a => a.cartaskid == cartaskid);
                return result;
            }
        }

    }
}
