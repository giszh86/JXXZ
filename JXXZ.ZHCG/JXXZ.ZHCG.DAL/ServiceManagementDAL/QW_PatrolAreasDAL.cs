using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_PatrolAreasDAL
    {

        /// <summary>
        /// 添加巡查区域
        /// </summary>
        /// <param name="model"></param>
        public void AddPatrolAreas(QW_PatrolAreasModel model)
        {
            using (Entities db = new Entities())
            {
                qw_patrolareas qwmodel = new qw_patrolareas();
                qwmodel.patrolid = model.patrolid;
                qwmodel.sszd = model.sszd;
                qwmodel.ssbc = model.ssbc;
                qwmodel.name = model.name;
                qwmodel.areatype = model.areatype;
                qwmodel.explain = model.explain;
                qwmodel.grometry = model.grometry;
                qwmodel.createtime = model.createtime;
                qwmodel.createuserid = model.createuserid;
                qwmodel.isnot = 0;
                db.qw_patrolareas.Add(qwmodel);
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 删除巡查区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
        public int DeletePatrolAreas(int patrolid)
        {
            using (Entities db = new Entities())
            {
                qw_patrolareas model = db.qw_patrolareas.SingleOrDefault(t => t.patrolid == patrolid);
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
        /// 修改巡查区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
        public int EditPatrolAreas(QW_PatrolAreasModel model )
        {
            using (Entities db = new Entities())
            {
                qw_patrolareas qpmodel = db.qw_patrolareas.SingleOrDefault(t => t.patrolid == model.patrolid);
                if (qpmodel != null)
                {
                    qpmodel.grometry = model.grometry;
                    qpmodel.explain = model.explain;
                    qpmodel.sszd = model.sszd;
                    qpmodel.ssbc = model.ssbc;
                    qpmodel.name = model.name;
                    qpmodel.areatype = model.areatype;
                    qpmodel.createuserid = model.createuserid;
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
        public Paging<List<QW_PatrolAreasModel>> GetPatrolAreasList(List<Filter> filters, int start, int limit)
        {
            Paging<List<QW_PatrolAreasModel>> paging = new Paging<List<QW_PatrolAreasModel>>();
            List<QW_PatrolAreasModel> list = new List<QW_PatrolAreasModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolAreasModel> queryable = from a in db.qw_patrolareas
                                                            join b_json in db.base_units on a.sszd equals b_json.id into bTemp
                                                            from b in bTemp.DefaultIfEmpty()
                                                            join c_json in db.base_units on a.ssbc equals c_json.id into cTemp
                                                            from c in cTemp.DefaultIfEmpty()
                                                            join d_json in db.base_users on a.createuserid equals d_json.id into dTemp
                                                            from d in dTemp.DefaultIfEmpty()
                                                            where a.isnot == 0
                                                            select new QW_PatrolAreasModel
                                                            {
                                                                patrolid = a.patrolid,
                                                                sszd = a.sszd,
                                                                ssbc = a.ssbc,
                                                                name = a.name,
                                                                areatype = a.areatype,
                                                                explain = a.explain,
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
                            case "areatype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.areatype == id);
                                }
                                break;
                        }
                    }
                }
                paging.Total = queryable.Count();
                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
                paging.Items = list;
            }
            return paging;
        }
        /// <summary>
        /// 获取数量
        /// </summary>
        /// <returns></returns>
        public int GetPatrolAreasCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolAreasModel> queryable = from a in db.qw_patrolareas
                                                            join b_json in db.base_units on a.sszd equals b_json.id into bTemp
                                                            from b in bTemp.DefaultIfEmpty()
                                                            join c_json in db.base_units on a.ssbc equals c_json.id into cTemp
                                                            from c in cTemp.DefaultIfEmpty()
                                                            join d_json in db.base_users on a.createuserid equals d_json.id into dTemp
                                                            from d in dTemp.DefaultIfEmpty()
                                                            where a.isnot == 0
                                                            select new QW_PatrolAreasModel
                                                            {
                                                                patrolid = a.patrolid,
                                                                sszd = a.sszd,
                                                                ssbc = a.ssbc,
                                                                name = a.name,
                                                                areatype = a.areatype,
                                                                explain = a.explain,
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
                            case "areatype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.areatype == id);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }


        
        public List<QW_PatrolAreasModel> GetPatrolAreasCom(int sszd,int ssbc)
        {
            List<QW_PatrolAreasModel> list = new List<QW_PatrolAreasModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_PatrolAreasModel> queryable = from a in db.qw_patrolareas
                                                            join b_json in db.base_units on a.sszd equals b_json.id into bTemp
                                                            from b in bTemp.DefaultIfEmpty()
                                                            join c_json in db.base_units on a.ssbc equals c_json.id into cTemp
                                                            from c in cTemp.DefaultIfEmpty()
                                                            join d_json in db.base_users on a.createuserid equals d_json.id into dTemp
                                                            from d in dTemp.DefaultIfEmpty()
                                                            where a.isnot == 0
                                                            select new QW_PatrolAreasModel
                                                            {
                                                                patrolid = a.patrolid,
                                                                sszd = a.sszd,
                                                                ssbc = a.ssbc,
                                                                name = a.name,
                                                                areatype = a.areatype,
                                                                explain = a.explain,
                                                                grometry = a.grometry,
                                                                createtime = a.createtime,
                                                                createuserid = a.createuserid,
                                                                sszdname = b.name,
                                                                ssbcname = c.name,
                                                                createusername = d.displayname
                                                            };
                if (sszd==0&&ssbc==0)
                {
                    list = queryable.OrderByDescending(a => a.createtime).ToList();
                }
                else if (sszd != 0 && ssbc == 0)
                {
                    list = queryable.Where(a=>a.sszd==sszd).OrderByDescending(a => a.createtime).ToList();
                }
                else if (sszd != 0 && ssbc != 0)
                {
                    list = queryable.Where(a=>a.sszd==sszd&&a.ssbc==ssbc).OrderByDescending(a => a.createtime).ToList();
                }
            }
            return list;
        }
    }
}
