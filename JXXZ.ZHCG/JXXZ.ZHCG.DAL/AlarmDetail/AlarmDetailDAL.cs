using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AlarmDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.AlarmDetail
{
    public class AlarmDetailDAL
    {
        public Paging<List<AlarmDetailModel>> GetAlarmDetailList(List<Filter> filters, int start, int limit)
        {
            Paging<List<AlarmDetailModel>> paging = new Paging<List<AlarmDetailModel>>();
            List<AlarmDetailModel> list = new List<AlarmDetailModel>();
            using (Entities db = new Entities())
            {
                IQueryable<AlarmDetailModel> queryable = from a in db.qw_alarmmemorylocationdatas
                                                         join b_join in db.base_users on a.userid equals b_join.id into temp1
                                                         from b in temp1.DefaultIfEmpty()
                                                         join c_join in db.base_units on b.unitid equals c_join.id into temp2
                                                         from c in temp2.DefaultIfEmpty()
                                                         select new AlarmDetailModel
                                                         {
                                                             alarmstrattime = a.alarmstrattime,
                                                             alarmendtime = a.alarmendtime,
                                                             alarmtype = a.alarmtype,
                                                             alarmtypename = a.alarmtype == 1 ? "停留报警" : a.alarmtype == 2 ? "越界报警" : "离线报警",
                                                             state = a.state,
                                                             statename = a.state == 2 ? "已作废" : a.state == 1 ? "已生效" : "未处理",
                                                             isallege = a.isallege,
                                                             isallegename = a.isallege == 1 ? "已申诉" : "未申诉",
                                                             username = b.displayname,

                                                             unitid = c.id,
                                                             unitname = c.name,
                                                             id = a.id,
                                                             createtime = a.createtime,
                                                             appeals=a.appeals,
                                                             appealsname = a.appeals == 2 ? "审核不通过" : a.appeals == 1 ? "审核通过" : "未审核",
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == id);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                break;
                            case "bjlx":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.alarmtype == id);
                                }
                                break;
                            case "bjzt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.state == id);
                                }
                                break;
                            case "sszt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.isallege == id);
                                }
                                break;
                          
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.createtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.createtime <= Etime);
                                }
                                break;
                         
                        }
                    }
                }
                paging.Total = queryable.Count();
                list = queryable.OrderByDescending(t => t.createtime).Skip(start).Take(limit).ToList();
                paging.Items = list;
            }
            return paging;
        }

        public int GetAlarmDetailCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<AlarmDetailModel> queryable = from a in db.qw_alarmmemorylocationdatas
                                                         join b_join in db.base_users on a.userid equals b_join.id into temp1
                                                         from b in temp1.DefaultIfEmpty()
                                                         join c_join in db.base_units on b.unitid equals c_join.id into temp2
                                                         from c in temp2.DefaultIfEmpty()
                                                         select new AlarmDetailModel
                                                         {
                                                             alarmstrattime = a.alarmstrattime,
                                                             alarmendtime = a.alarmendtime,
                                                             alarmtype = a.alarmtype,
                                                             state = a.state,
                                                             isallege = a.isallege,
                                                             username = b.displayname,
                                                             unitname = c.name,
                                                             id = a.id,
                                                             createtime = a.createtime,
                                                             appeals = a.appeals,
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                    }
                }
                return queryable.Count();
            }
        }

        public AlarmDetailModel GetAlarmDetailModel(int id)
        {
            AlarmDetailModel model = new AlarmDetailModel();
            using (Entities db = new Entities())
            {
                IQueryable<AlarmDetailModel> queryable = from a in db.qw_alarmmemorylocationdatas
                                                         join b_join in db.base_users on a.userid equals b_join.id into temp1
                                                         from b in temp1.DefaultIfEmpty()
                                                         join c_join in db.base_units on b.unitid equals c_join.id into temp2
                                                         from c in temp2.DefaultIfEmpty()
                                                         where a.id == id
                                                         select new AlarmDetailModel
                                                         {
                                                             alarmstrattime = a.alarmstrattime,
                                                             alarmendtime = a.alarmendtime,
                                                             alarmtype = a.alarmtype,
                                                             state = a.state,
                                                             isallege = a.isallege,
                                                             username = b.displayname,
                                                             unitname = c.name,
                                                             id = a.id,
                                                             createtime = a.createtime,
                                                             content = a.content,
                                                             dealtime = a.dealtime,
                                                             dealuserid = a.dealuserid,
                                                             allegereason = a.allegereason,
                                                             allegetime = a.allegetime
                                                         };
                model = queryable.FirstOrDefault();

            }
            return model;

        }

        /// <summary>
        /// 修改审核状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int EditAlarmDetailReview(int id, int type) {
            using (Entities db = new Entities())
            {
                qw_alarmmemorylocationdatas model = db.qw_alarmmemorylocationdatas.FirstOrDefault(a => a.id == id);
                if (model!=null)
                {
                    model.state = type;
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 修改申诉审核
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int EditAlarmDetailAppeals(AlarmDetailModel model)
        {
            using (Entities db = new Entities())
            {
                qw_alarmmemorylocationdatas qwmodel = db.qw_alarmmemorylocationdatas.FirstOrDefault(a => a.id == model.id);
                if (qwmodel != null)
                {
                    qwmodel.appeals = model.appeals;
                    qwmodel.content = model.content;
                    qwmodel.dealtime = DateTime.Now;
                    qwmodel.dealuserid = model.dealuserid;
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 查询个人报警
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        public List<AlarmDetailModel> GetUserAlarmDetailList(List<Filter> filters, int start, int limit,int userid)
        {
            List<AlarmDetailModel> list = new List<AlarmDetailModel>();
            using (Entities db = new Entities())
            {
                IQueryable<AlarmDetailModel> queryable = from a in db.qw_alarmmemorylocationdatas
                                                         join b_join in db.base_users on a.userid equals b_join.id into temp1
                                                         from b in temp1.DefaultIfEmpty()
                                                         join c_join in db.base_units on b.unitid equals c_join.id into temp2
                                                         from c in temp2.DefaultIfEmpty()
                                                         where a.userid==userid
                                                         select new AlarmDetailModel
                                                         {
                                                             alarmstrattime = a.alarmstrattime,
                                                             alarmendtime = a.alarmendtime,
                                                             alarmtype = a.alarmtype,
                                                             state = a.state,
                                                             isallege = a.isallege,
                                                             username = b.displayname,
                                                             unitname = c.name,
                                                             id = a.id,
                                                             createtime = a.createtime,
                                                             appeals = a.appeals,
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                         string value = filter.value;
                         switch (filter.property)
                         {
                             case "stime":
                                 if (!string.IsNullOrEmpty(value))
                                 {
                                     DateTime Stime = DateTime.Parse(value).Date;
                                     queryable = queryable.Where(t => t.createtime >= Stime);
                                 }
                                 break;
                             case "etime":
                                 if (!string.IsNullOrEmpty(value))
                                 {
                                     DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                     queryable = queryable.Where(t => t.createtime <= Etime);
                                 }
                                 break;
                         }
                    }
                }
                list = queryable.OrderByDescending(t => t.createtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        public int GetUserAlarmDetailCount(List<Filter> filters,int userid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<AlarmDetailModel> queryable = from a in db.qw_alarmmemorylocationdatas
                                                         join b_join in db.base_users on a.userid equals b_join.id into temp1
                                                         from b in temp1.DefaultIfEmpty()
                                                         join c_join in db.base_units on b.unitid equals c_join.id into temp2
                                                         from c in temp2.DefaultIfEmpty()
                                                         where a.userid == userid
                                                         select new AlarmDetailModel
                                                         {
                                                             alarmstrattime = a.alarmstrattime,
                                                             alarmendtime = a.alarmendtime,
                                                             alarmtype = a.alarmtype,
                                                             state = a.state,
                                                             isallege = a.isallege,
                                                             username = b.displayname,
                                                             unitname = c.name,
                                                             id = a.id,
                                                             createtime = a.createtime,
                                                             appeals = a.appeals,
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.createtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.createtime <= Etime);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }

        /// <summary>
        /// 提交申诉
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int SubmitAlarmDetailAppeals(AlarmDetailModel model)
        {
            using (Entities db = new Entities())
            {
                qw_alarmmemorylocationdatas qwmodel = db.qw_alarmmemorylocationdatas.FirstOrDefault(a => a.id == model.id);
                if (qwmodel != null)
                {
                    qwmodel.isallege = model.isallege;
                    qwmodel.allegereason = model.allegereason;
                    qwmodel.allegetime = DateTime.Now;
                }
                return db.SaveChanges();
            }
        }


        #region 人员报警列表导出
        /// <summary>
        /// 导出人员报警列表
        /// </summary>
        /// <param name="filters">筛选条件</param>
        /// <returns></returns>
        public List<AlarmDetailModel> GetAlarmDetailList(List<Filter> filters)
        {
            List<AlarmDetailModel> list = new List<AlarmDetailModel>();
            using (Entities db = new Entities())
            {
                IQueryable<AlarmDetailModel> queryable = from a in db.qw_alarmmemorylocationdatas
                                                         join b_join in db.base_users on a.userid equals b_join.id into temp1
                                                         from b in temp1.DefaultIfEmpty()
                                                         join c_join in db.base_units on b.unitid equals c_join.id into temp2
                                                         from c in temp2.DefaultIfEmpty()
                                                         select new AlarmDetailModel
                                                         {
                                                             alarmstrattime = a.alarmstrattime,
                                                             alarmendtime = a.alarmendtime,
                                                             alarmtype = a.alarmtype,
                                                             alarmtypename = a.alarmtype == 1 ? "停留报警" : a.alarmtype == 2 ? "越界报警" : "离线报警",
                                                             state = a.state,
                                                             statename = a.state == 2 ? "已作废" : a.state == 1 ? "已生效" : "未处理",
                                                             isallege = a.isallege,
                                                             isallegename = a.isallege == 1 ? "已申诉" : "未申诉",
                                                             username = b.displayname,
                                                             unitname = c.name,
                                                             id = a.id,
                                                             createtime = a.createtime,
                                                             appeals = a.appeals,
                                                             appealsname = a.appeals == 2 ? "审核不通过" : a.appeals == 1 ? "审核通过" : "未审核",
                                                         };
                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                break;
                            case "bjlx":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.alarmtype == id);
                                }
                                break;
                            case "bjzt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.state == id);
                                }
                                break;
                            case "sszt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.isallege == id);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.createtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.createtime <= Etime);
                                }
                                break;

                        }
                    }
                }
                #endregion
                
                list = queryable.OrderByDescending(t => t.createtime).ToList();
            }
            return list;
        }
        #endregion
    }
}
