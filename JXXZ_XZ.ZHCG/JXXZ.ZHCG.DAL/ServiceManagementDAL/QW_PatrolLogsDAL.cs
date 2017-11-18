using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_PatrolLogsDAL
    {
        /// <summary>
        /// 添加巡查日志管理
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddPatrolLogs(QW_PatrolLogModel model)
        {
            using (Entities db = new Entities())
            {
                qw_patrollogs newmodel = new qw_patrollogs();
                newmodel.userid = model.userid;
                newmodel.checkid = model.checkid;
                newmodel.checkname = model.checkname;
                newmodel.isfound = model.isfound;
                newmodel.reporttime = DateTime.Now;
                newmodel.remark = model.remark;
                db.qw_patrollogs.Add(newmodel);
                db.SaveChanges();
                return newmodel.logid;
            }
        }
        /// <summary>
        /// 巡查日志管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<QW_PatrolLogModel>> GetPatrolLogsList(List<Filter> filters, int start, int limit)
        {
            Paging<List<QW_PatrolLogModel>> paging = new Paging<List<QW_PatrolLogModel>>();
            List<QW_PatrolLogModel> list = new List<QW_PatrolLogModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolLogModel> queryable = from a in db.qw_patrollogs
                                                          join b_join in db.base_users on a.userid equals b_join.id into bTmp
                                                          from b in bTmp.DefaultIfEmpty()
                                                          join c_join in db.base_units on b.unitid equals c_join.id into cTmp
                                                          from c in cTmp.DefaultIfEmpty()
                                                          where c.unittypeid == 2 || c.unittypeid == 4
                                                          select new QW_PatrolLogModel
                                                          {
                                                              logid = a.logid,
                                                              userid = a.userid,
                                                              unitname = c.name,
                                                              username = b.displayname,
                                                              checkname =a.checkname,
                                                              isfound = a.isfound,
                                                              reporttime = a.reporttime,
                                                              remark = a.remark,
                                                              unitid = c.id,
                                                              checkid = a.checkid,
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
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.unitid == id);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                }
                                break;
                            //case "reporttime":
                            //    if (!string.IsNullOrEmpty(value))
                            //    {
                            //        DateTime time = DateTime.Parse(value).Date;
                            //        queryable = queryable.Where(t => t.reporttime == time);
                            //    }
                            //    break;
                            case "checkid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    string checkid = value + ",";
                                    queryable = queryable.Where(t => t.checkid.Contains(checkid));
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.reporttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.reporttime <= Etime);
                                }
                                break;
                            //case "isfound":
                            //    if (!string.IsNullOrEmpty(value))
                            //    {
                            //        int id = Convert.ToInt32(value);
                            //        queryable = queryable.Where(t => t.isfound == id);
                            //    }
                            //    break;
                        }
                    }
                }
                paging.Total = queryable.Count();
                list = queryable.OrderByDescending(a => a.logid).Skip(start).Take(limit).ToList();
                paging.Items = list;
            }
            return paging;
        }
        /// <summary>
        /// 巡查日志管理数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetPatrolLogsCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolLogModel> queryable = from a in db.qw_patrollogs
                                                          join b_join in db.base_users on a.userid equals b_join.id into bTmp
                                                          from b in bTmp.DefaultIfEmpty()
                                                          join c_join in db.base_units on b.unitid equals c_join.id into cTmp
                                                          from c in cTmp.DefaultIfEmpty()
                                                          where c.unittypeid == 2 || c.unittypeid == 4
                                                          select new QW_PatrolLogModel
                                                          {
                                                              logid = a.logid,
                                                              userid = a.userid,
                                                              unitname = c.name,
                                                              username = b.displayname,
                                                              checkname = a.checkname,
                                                              isfound = a.isfound,
                                                              reporttime = a.reporttime,
                                                              remark = a.remark,
                                                              checkid = a.checkid,
                                                          };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.unitname.Contains(value));
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                }
                                break;
                            //case "reporttime":
                            //    if (!string.IsNullOrEmpty(value))
                            //    {
                            //        DateTime time = DateTime.Parse(value).Date;
                            //        queryable = queryable.Where(t => t.reporttime == time);
                            //    }
                            //    break;
                            case "checkid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    string checkid = value + ",";
                                    queryable = queryable.Where(t => t.checkid.Contains(checkid));
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.reporttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.reporttime <= Etime);
                                }
                                break;
                            //case "isfound":
                            //    if (!string.IsNullOrEmpty(value))
                            //    {
                            //        int id = Convert.ToInt32(value);
                            //        queryable = queryable.Where(t => t.isfound == id);
                            //    }
                            //    break;
                        }
                    }
                }
                return queryable.Count();
            }

        }


        /// <summary>
        /// 根据id获取详情
        /// </summary>
        /// <param name="logid"></param>
        /// <returns></returns>
        public QW_PatrolLogModel GetPatrolLogModel(int logid)
        {

            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolLogModel> queryable = from a in db.qw_patrollogs
                                                          join b_join in db.base_users on a.userid equals b_join.id into bTmp
                                                          from b in bTmp.DefaultIfEmpty()
                                                          join c_join in db.base_units on b.unitid equals c_join.id into cTmp
                                                          from c in cTmp.DefaultIfEmpty()
                                                          where c.unittypeid == 2 || c.unittypeid == 4
                                                          select new QW_PatrolLogModel
                                                          {
                                                              logid = a.logid,
                                                              userid = a.userid,
                                                              unitname = c.name,
                                                              username = b.displayname,
                                                              checkname = a.checkname,
                                                              isfound = a.isfound,
                                                              reporttime = a.reporttime,
                                                              remark = a.remark,
                                                              checkid = a.checkid,
                                                          };

                return queryable.Where(a => a.logid == logid).FirstOrDefault();
            }
        }


        /// <summary>
        /// 巡查日志管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<QW_PatrolLogModel> GetApiPatrolLogsList(List<Filter> filters, int start, int limit, int userid)
        {
            List<QW_PatrolLogModel> list = new List<QW_PatrolLogModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolLogModel> queryable = from a in db.qw_patrollogs
                                                          join b_join in db.base_users on a.userid equals b_join.id into bTmp
                                                          from b in bTmp.DefaultIfEmpty()
                                                          join c_join in db.base_units on b.unitid equals c_join.id into cTmp
                                                          from c in cTmp.DefaultIfEmpty()
                                                          where c.unittypeid == 2 || c.unittypeid == 4 && a.userid == userid
                                                          select new QW_PatrolLogModel
                                                          {
                                                              logid = a.logid,
                                                              userid = a.userid,
                                                              unitname = c.name,
                                                              username = b.displayname,
                                                              checkname = a.checkname,
                                                              isfound = a.isfound,
                                                              reporttime = a.reporttime,
                                                              remark = a.remark,
                                                              unitid = c.id,
                                                              checkid=a.checkid
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
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.unitid == id);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                }
                                break;
                            case "reporttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.reporttime == time);
                                }
                                break;
                            case "checkid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    string checkid = value + ",";
                                    queryable = queryable.Where(t => t.checkid.Contains(checkid));
                                }
                                break;
                            case "isfound":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.isfound == id);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.reporttime).Skip(start).Take(limit).ToList();
            }
            return list;
        }
        /// <summary>
        /// 巡查日志管理数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetApiPatrolLogsCount(List<Filter> filters, int userid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolLogModel> queryable = from a in db.qw_patrollogs
                                                          join b_join in db.base_users on a.userid equals b_join.id into bTmp
                                                          from b in bTmp.DefaultIfEmpty()
                                                          join c_join in db.base_units on b.unitid equals c_join.id into cTmp
                                                          from c in cTmp.DefaultIfEmpty()
                                                          where c.unittypeid == 2 || c.unittypeid == 4 && a.userid == userid
                                                          select new QW_PatrolLogModel
                                                          {
                                                              logid = a.logid,
                                                              userid = a.userid,
                                                              unitname = c.name,
                                                              username = b.displayname,
                                                              checkname = a.checkname,
                                                              isfound = a.isfound,
                                                              reporttime = a.reporttime,
                                                              remark = a.remark,
                                                              unitid = c.id,
                                                              checkid=a.checkid
                                                          };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.unitname.Contains(value));
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                }
                                break;
                            case "reporttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.reporttime == time);
                                }
                                break;
                            case "checkid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    string checkid = value + ",";
                                    queryable = queryable.Where(t => t.checkid.Contains(checkid));
                                }
                                break;
                            case "isfound":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.isfound == id);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }

        }


    }
}
