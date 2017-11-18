using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_SigninAreasDAL
    {
        /// <summary>
        /// 添加签到区域
        /// </summary>
        /// <param name="model"></param>
        public void AddSigninAreas(QW_SigninAreasModel model)
        {
            using (Entities db = new Entities())
            {
                qw_signinareas qwmodel = new qw_signinareas();
                qwmodel.signinareaid = model.signinareaid;
                qwmodel.sszd = model.sszd;
                qwmodel.ssbc = model.ssbc;
                qwmodel.name = model.name;
                qwmodel.explain = model.explain;
                qwmodel.start_stime = model.start_stime;
                qwmodel.start_etime = model.start_etime;
                qwmodel.end_stime = model.end_stime;
                qwmodel.end_etime = model.end_etime;
                qwmodel.grometry = model.grometry;
                qwmodel.createtime = model.createtime;
                qwmodel.createuserid = model.createuserid;
                qwmodel.isnot = 0;
                db.qw_signinareas.Add(qwmodel);
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 删除签到区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
        public int DeleteSigninAreas(int signinareaid)
        {
            using (Entities db = new Entities())
            {
                qw_signinareas model = db.qw_signinareas.SingleOrDefault(t => t.signinareaid == signinareaid);
                if (model != null)
                {
                    try
                    {
                        model.isnot = 1;
                        return db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        return 0;
                    }
                }
                else
                    return 0;
            }
        }

        /// <summary>
        /// 修改签到区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
        public int EditSigninAreas(QW_SigninAreasModel model)
        {
            using (Entities db = new Entities())
            {
                qw_signinareas qsmodel = db.qw_signinareas.SingleOrDefault(t => t.signinareaid == model.signinareaid);
                if (model != null)
                {
                    qsmodel.sszd = model.sszd;
                    qsmodel.ssbc = model.ssbc;
                    qsmodel.name = model.name;
                    qsmodel.explain = model.explain;
                    qsmodel.start_stime = model.start_stime;
                    qsmodel.start_etime = model.start_etime;
                    qsmodel.end_stime = model.end_stime;
                    qsmodel.end_etime = model.end_etime;
                    qsmodel.grometry = model.grometry;
                    qsmodel.createuserid = model.createuserid;
                }
                return db.SaveChanges();
            }
        }


        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<QW_SigninAreasModel> GetSigninAreasList(List<Filter> filters, int start, int limit)
        {
            List<QW_SigninAreasModel> list = new List<QW_SigninAreasModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_SigninAreasModel> queryable = from a in db.qw_signinareas
                                                            join b_json in db.base_units on a.sszd equals b_json.id into bTemp
                                                            from b in bTemp.DefaultIfEmpty()
                                                            join c_json in db.base_units on a.ssbc equals c_json.id into cTemp
                                                            from c in cTemp.DefaultIfEmpty()
                                                            join d_json in db.base_users on a.createuserid equals d_json.id into dTemp
                                                            from d in dTemp.DefaultIfEmpty()
                                                            where a.isnot == 0
                                                            select new QW_SigninAreasModel
                                                            {
                                                                signinareaid = a.signinareaid,
                                                                sszd = a.sszd,
                                                                ssbc = a.ssbc,
                                                                name = a.name,
                                                                explain = a.explain,
                                                                start_stime = a.start_stime,
                                                                start_etime = a.start_etime,
                                                                end_stime = a.end_stime,
                                                                end_etime = a.end_etime,
                                                                grometry = a.grometry,
                                                                createtime = a.createtime,
                                                                createuserid = a.createuserid,
                                                                sszdname = b.name,
                                                                ssbcname = c.name,
                                                                createusername = d.displayname
                                                            };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "sszd":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sszd == id);
                                }
                                break;
                            case "ssbc":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.ssbc == id);
                                }
                                break;
                            case "name":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.name.Contains(value));
                                break;

                        }
                    }
                }

                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();

            }
            return list;
        }
        /// <summary>
        /// 获取数量
        /// </summary>
        /// <returns></returns>
        public int GetSigninAreasCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<QW_SigninAreasModel> queryable = from a in db.qw_signinareas
                                                            join b_json in db.base_units on a.sszd equals b_json.id into bTemp
                                                            from b in bTemp.DefaultIfEmpty()
                                                            join c_json in db.base_units on a.ssbc equals c_json.id into cTemp
                                                            from c in cTemp.DefaultIfEmpty()
                                                            join d_json in db.base_users on a.createuserid equals d_json.id into dTemp
                                                            from d in dTemp.DefaultIfEmpty()
                                                            where a.isnot == 0
                                                            select new QW_SigninAreasModel
                                                            {
                                                                signinareaid = a.signinareaid,
                                                                sszd = a.sszd,
                                                                ssbc = a.ssbc,
                                                                name = a.name,
                                                                explain = a.explain,
                                                                start_stime = a.start_stime,
                                                                start_etime = a.start_etime,
                                                                end_stime = a.end_stime,
                                                                end_etime = a.end_stime,
                                                                grometry = a.grometry,
                                                                createtime = a.createtime,
                                                                createuserid = a.createuserid,
                                                                sszdname = b.name,
                                                                ssbcname = c.name,
                                                                createusername = d.displayname
                                                            };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "sszd":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sszd == id);
                                }
                                break;
                            case "ssbc":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.ssbc == id);
                                }
                                break;
                            case "name":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.name.Contains(value));
                                break;

                        }
                    }
                }
                return queryable.Count();
            }
        }


        public List<QW_SigninAreasModel> GetSigninAreasCom(int sszd, int ssbc)
        {
            List<QW_SigninAreasModel> list = new List<QW_SigninAreasModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_SigninAreasModel> queryable = from a in db.qw_signinareas
                                                            join b_json in db.base_units on a.sszd equals b_json.id into bTemp
                                                            from b in bTemp.DefaultIfEmpty()
                                                            join c_json in db.base_units on a.ssbc equals c_json.id into cTemp
                                                            from c in cTemp.DefaultIfEmpty()
                                                            join d_json in db.base_users on a.createuserid equals d_json.id into dTemp
                                                            from d in dTemp.DefaultIfEmpty()
                                                            where a.isnot == 0
                                                            select new QW_SigninAreasModel
                                                            {
                                                                signinareaid = a.signinareaid,
                                                                sszd = a.sszd,
                                                                ssbc = a.ssbc,
                                                                name = a.name,
                                                                explain = a.explain,
                                                                start_stime = a.start_stime,
                                                                start_etime = a.start_etime,
                                                                end_stime = a.end_stime,
                                                                end_etime = a.end_stime,
                                                                grometry = a.grometry,
                                                                createtime = a.createtime,
                                                                createuserid = a.createuserid,
                                                                sszdname = b.name,
                                                                ssbcname = c.name,
                                                                createusername = d.displayname
                                                            };
                if (sszd == 0 && ssbc == 0)
                {
                    list = queryable.OrderByDescending(a => a.createtime).ToList();
                }
                else if (sszd != 0 && ssbc == 0)
                {
                    list = queryable.Where(a => a.sszd == sszd).OrderByDescending(a => a.createtime).ToList();
                }
                else if (sszd != 0 && ssbc != 0)
                {
                    list = queryable.Where(a => a.sszd == sszd && a.ssbc == ssbc).OrderByDescending(a => a.createtime).ToList();
                }
            }
            return list;
        }
    }
}
