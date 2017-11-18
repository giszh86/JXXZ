using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ConservationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ConservationDAL
{
    public class YH_YhLogDAL
    {
        /// <summary>
        /// 添加养护日志
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddLog(YH_YhLogModel model)
        {
            //string date = model.writedate.ToString().Split(' ')[0];
            //string time = model.writetime.ToString().Split(' ')[1];
            using (Entities db = new Entities())
            {
                yh_yhlogs yhmodel = new yh_yhlogs();
                yhmodel.yhlogid = model.yhlogid;
                yhmodel.yhcontract = model.yhcontract;
                yhmodel.patroltime = model.patroltime;
                yhmodel.patrolexplain = model.patrolexplain;
                yhmodel.createtime = DateTime.Now;
                yhmodel.createuserid = model.createuserid;
                db.yh_yhlogs.Add(yhmodel);
                db.SaveChanges();
                return yhmodel.yhlogid;
            }
        }

        /// <summary>
        /// 查询日志列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<YH_YhLogModel> GetYhLogList(List<Filter> filters, int start, int limit, int year, int month)
        {
            List<YH_YhLogModel> list = new List<YH_YhLogModel>();
            using (Entities db = new Entities())
            {
                IQueryable<YH_YhLogModel> queryable = from a in db.yh_yhlogs
                                                      join b_join in db.yh_contracts on a.yhcontract equals b_join.contractid into btmp
                                                      from b in btmp.DefaultIfEmpty()
                                                      join c_join in db.base_users on a.createuserid equals c_join.id into ctmp
                                                      from c in ctmp.DefaultIfEmpty()
                                                      select new YH_YhLogModel
                                                      {
                                                          yhlogid = a.yhlogid,
                                                          yhcontract = a.yhcontract,
                                                          patroltime = a.patroltime,
                                                          patrolexplain = a.patrolexplain,
                                                          createtime = a.createtime,
                                                          createuserid = a.createuserid,
                                                          yhcontractname = b == null ? "" : b.contractname,
                                                          createusername = c == null ? "" : c.displayname,
                                                      };
                if (year != 0)
                    queryable = queryable.Where(a => a.patroltime.Year == year);
                if (month != 0)
                    queryable = queryable.Where(a => a.patroltime.Month == month);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "yhcontract":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int yhcontract = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.yhcontract == yhcontract);
                                }
                                break;
                            case "createtimefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtimefrom = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.createtime >= createtimefrom);
                                }
                                break;
                            case "createtimeto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtimeto = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.createtime <= createtimeto);
                                }
                                break;
                            case "startdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.patroltime >= time);
                                }
                                break;
                            case "enddate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value).AddDays(1);
                                    queryable = queryable.Where(t => t.patroltime < time);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetYhLogCount(List<Filter> filters, int year, int month)
        {
            using (Entities db = new Entities())
            {
                IQueryable<YH_YhLogModel> queryable = from a in db.yh_yhlogs
                                                      join b_join in db.yh_contracts on a.yhcontract equals b_join.contractid into btmp
                                                      from b in btmp.DefaultIfEmpty()
                                                      join c_join in db.base_users on a.createuserid equals c_join.id into ctmp
                                                      from c in ctmp.DefaultIfEmpty()
                                                      select new YH_YhLogModel
                                                      {
                                                          yhlogid = a.yhlogid,
                                                          yhcontract = a.yhcontract,
                                                          patroltime = a.patroltime,
                                                          patrolexplain = a.patrolexplain,
                                                          createtime = a.createtime,
                                                          createuserid = a.createuserid,
                                                          yhcontractname = b == null ? "" : b.contractname,
                                                          createusername = c == null ? "" : c.displayname,
                                                      };
                if (year != 0)
                    queryable = queryable.Where(a => a.patroltime.Year == year);
                if (month != 0)
                    queryable = queryable.Where(a => a.patroltime.Month == month);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "yhcontract":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int yhcontract = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.yhcontract == yhcontract);
                                }
                                break;
                            case "createtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtime = DateTime.Parse(value);
                                    DateTime endtime = createtime.AddDays(1);
                                    queryable = queryable.Where(t => t.createtime >= createtime && t.createtime < endtime);
                                }
                                break;
                            case "startdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.patroltime >= time);
                                }
                                break;
                            case "enddate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value).AddDays(1);
                                    queryable = queryable.Where(t => t.patroltime <= time);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }

        /// <summary>
        /// 养护日志详情
        /// </summary>
        /// <param name="yhlogid"></param>
        /// <returns></returns>
        public YH_YhLogModel GetYhLogModel(int yhlogid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<YH_YhLogModel> queryable = from a in db.yh_yhlogs
                                                      join b_join in db.yh_contracts on a.yhcontract equals b_join.contractid into btmp
                                                      from b in btmp.DefaultIfEmpty()
                                                      join c_join in db.base_users on a.createuserid equals c_join.id into ctmp
                                                      from c in ctmp.DefaultIfEmpty()
                                                      where a.yhlogid == yhlogid
                                                      select new YH_YhLogModel
                                                      {
                                                          yhlogid = a.yhlogid,
                                                          yhcontract = a.yhcontract,
                                                          patroltime = a.patroltime,
                                                          patrolexplain = a.patrolexplain,
                                                          createtime = a.createtime,
                                                          createuserid = a.createuserid,
                                                          yhcontractname = b == null ? "" : b.contractname,
                                                          createusername = c == null ? "" : c.displayname,
                                                      };
                YH_FileDAL dal = new YH_FileDAL();
                YH_YhLogModel model = queryable.FirstOrDefault();
                model.filelist = dal.GetFileList(2, model.yhlogid);
                return model;
            }
        }

        #region 导出养护日志列表
        public List<YH_YhLogModel> GetYhLogListExcel(int month,int year, List<Filter> filters)
        {
            List<YH_YhLogModel> list = new List<YH_YhLogModel>();
            using (Entities db = new Entities())
            {
                IQueryable<YH_YhLogModel> queryable = from a in db.yh_yhlogs
                                                      join b_join in db.yh_contracts on a.yhcontract equals b_join.contractid into btmp
                                                      from b in btmp.DefaultIfEmpty()
                                                      join c_join in db.base_users on a.createuserid equals c_join.id into ctmp
                                                      from c in ctmp.DefaultIfEmpty()
                                                      select new YH_YhLogModel
                                                      {
                                                          yhlogid = a.yhlogid,
                                                          yhcontract = a.yhcontract,
                                                          patroltime = a.patroltime,
                                                          patrolexplain = a.patrolexplain,
                                                          createtime = a.createtime,
                                                          createuserid = a.createuserid,
                                                          yhcontractname = b == null ? "" : b.contractname,
                                                          createusername = c == null ? "" : c.displayname,
                                                      };
                if (year != 0)
                    queryable = queryable.Where(a => a.patroltime.Year == year);
                if (month != 0)
                    queryable = queryable.Where(a => a.patroltime.Month == month);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "yhcontract":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int yhcontract = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.yhcontract == yhcontract);
                                }
                                break;
                            case "createtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtime = DateTime.Parse(value);
                                    DateTime endtime = createtime.AddDays(1);
                                    queryable = queryable.Where(t => t.createtime >= createtime && t.createtime < endtime);
                                }
                                break;
                            case "createtimefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.patroltime >= time);
                                }
                                break;
                            case "createtimeto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime time = DateTime.Parse(value).AddDays(1);
                                    queryable = queryable.Where(t => t.patroltime < time);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
            }
            return list;
        }
        #endregion

    }
}
