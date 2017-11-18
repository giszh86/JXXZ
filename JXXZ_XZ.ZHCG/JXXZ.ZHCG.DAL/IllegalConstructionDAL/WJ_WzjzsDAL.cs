using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.IllegalConstructionDAL
{
    public class WJ_WzjzsDAL
    {
        /// <summary>
        /// 添加违建
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddWzjzs(WJ_WzjzsModel model)
        {
            using (Entities db = new Entities())
            {
                wj_wzjzs wwmodel = new wj_wzjzs();
                wwmodel.wjid = model.wjid;
                wwmodel.wjholder = model.wjholder;
                wwmodel.contactphone = model.contactphone;
                wwmodel.holderidentity = model.holderidentity;
                wwmodel.householdnum = model.householdnum;
                wwmodel.address = model.address;
                wwmodel.landproperty = model.landproperty;
                wwmodel.completiontime = model.completiontime;
                wwmodel.landnum = model.landnum;
                wwmodel.propertynum = model.propertynum;
                wwmodel.coverarea = model.coverarea;
                wwmodel.buildarea = model.buildarea;
                wwmodel.builduse = model.builduse;
                wwmodel.buildstructure = model.buildstructure;
                wwmodel.buildlayers_up = model.buildlayers_up;
                wwmodel.buildlayers_down = model.buildlayers_down;
                wwmodel.geography = model.geography;
                wwmodel.wj_wjtype = model.wj_wjtype;
                wwmodel.wj_use = model.wj_use;
                wwmodel.wj_land = model.wj_land;
                wwmodel.wj_time = model.wj_time;
                wwmodel.wj_landarea = model.wj_landarea;
                wwmodel.wj_wjarea = model.wj_wjarea;
                wwmodel.wj_buildstructure = model.wj_buildstructure;
                wwmodel.wj_layerup = model.wj_layerup;
                wwmodel.wj_layerdown = model.wj_layerdown;
                wwmodel.process = model.process;
                wwmodel.isgd = model.isgd;
                wwmodel.foundtime = model.foundtime;
                wwmodel.limittime = model.limittime;
                wwmodel.reportuser = model.reportuser;
                wwmodel.reporttime = model.reporttime;
                wwmodel.remark = model.remark;
                wwmodel.parentid = model.parentid;
                wwmodel.createuserid = model.createuserid;
                wwmodel.createtime = DateTime.Now;
                wwmodel.citizenid = model.citizenid;

                db.wj_wzjzs.Add(wwmodel);
                db.SaveChanges();
                return wwmodel.wjid;
            }
        }

        /// <summary>
        /// 违建列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<WJ_WzjzsModel> GetwzjzList(List<Filter> filters, int start, int limit)
        {
            List<WJ_WzjzsModel> list = new List<WJ_WzjzsModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (SELECT
bz.zd_name,
a.wjid,
a.wjholder,
a.contactphone,
a.holderidentity,
a.householdnum,
a.address,
a.landproperty,
a.completiontime,
a.landnum,
a.propertynum,
a.coverarea,
a.buildarea,
a.builduse,
a.buildstructure,
a.buildlayers_up,
a.buildlayers_down,
a.geography,
a.wj_wjtype,
a.wj_use,
a.wj_land,
a.wj_time,
a.wj_landarea,
a.wj_wjarea,
a.wj_buildstructure,
a.wj_layerup,
a.wj_layerdown,
a.process,
a.isgd,
a.reportuser,
a.reporttime,
a.foundtime,
a.remark,
a.parentid,
a.createuserid,
a.createtime,
a.citizenid,
a.limittime
from wj_wzjzs a 
left join base_zds bz on a.wj_wjtype = bz.zd_id and bz.zd_type='type_wj_wjlx'
where a.parentid in (
select a.wjid from wj_wzjzs a where a.parentid is null)
order by a.createtime desc) tab1
GROUP BY tab1.parentid");
                IEnumerable<WJ_WzjzsModel> query = db.Database.SqlQuery<WJ_WzjzsModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string  value = filter.value;
                        switch (filter.property)
                        {
                            case "wjholder":
                                if(!string.IsNullOrEmpty(value)){
                                    query = query.Where(t => t.wjholder.Contains(value));
                                }
                                break;
                            case "contactphone":
                                if(!string.IsNullOrEmpty(value)){
                                    query = query.Where(t=>t.contactphone.Contains(value));
                                }
                                break;
                            case "address":
                                if(!string.IsNullOrEmpty(value)){
                                    query = query.Where(t=>t.address.Contains(value));
                                };
                                break;
                            case "process":
                                if(!string.IsNullOrEmpty(value)){
                                    int id = int.Parse(value);
                                    query = query.Where(t=>t.process==id);
                                };
                                break;
                            case "isgd":
                                if(!string.IsNullOrEmpty(value)){
                                    int id = int.Parse(value);
                                    query = query.Where(t=>t.isgd==id);
                                };
                                break;
                        }
                    }
                }
                list = query.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 违建列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetwzjzCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select * from wj_wzjzs a where a.parentid in (
select a.wjid from wj_wzjzs a where a.parentid is null) order by a.createtime desc) tab1
GROUP BY tab1.parentid");
                IEnumerable<WJ_WzjzsModel> query = db.Database.SqlQuery<WJ_WzjzsModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "wjholder":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    query = query.Where(t => t.wjholder.Contains(value));
                                }
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    query = query.Where(t => t.contactphone.Contains(value));
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    query = query.Where(t => t.address.Contains(value));
                                };
                                break;
                            case "process":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    query = query.Where(t => t.process == id);
                                };
                                break;
                            case "isgd":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    query = query.Where(t => t.isgd == id);
                                };
                                break;
                        }
                    }
                }
                return query.Count();
            }
        }


        /// <summary>
        /// 违章建筑历列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="parentid"></param>
        /// <returns></returns>
        public List<WJ_WzjzsModel> GetOldWzjzList(List<Filter> filters, int start, int limit, int parentid)
        {
            List<WJ_WzjzsModel> list = new List<WJ_WzjzsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<WJ_WzjzsModel> queryable = from a in db.wj_wzjzs
                                                      where a.parentid == parentid
                                                      select new WJ_WzjzsModel
                                                      {
                                                          wjid = a.wjid,
                                                          createtime=a.createtime,
                                                          remark = a.remark,
                                                          process = a.process,
                                                          isgd = a.isgd,
                                                      };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {

                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 历史列表数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetOldWzjzCount(List<Filter> filters, int parentid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<WJ_WzjzsModel> queryable = from a in db.wj_wzjzs
                                                      where a.parentid == parentid
                                                      select new WJ_WzjzsModel
                                                      {
                                                          wjid = a.wjid,
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

        /// <summary>
        /// 获取违建详情
        /// </summary>
        /// <param name="wjid"></param>
        /// <returns></returns>
        public WJ_WzjzsModel GetWzjzModel(int wjid)
        {
            WJ_WzjzsModel model = new WJ_WzjzsModel();
            WJ_FilesDAL dal = new WJ_FilesDAL();
            using (Entities db = new Entities())
            {
                IQueryable<WJ_WzjzsModel> queryable = from a in db.wj_wzjzs
                                                      join b_join in db.base_users on a.createuserid equals b_join.id into btmp
                                                      from b in btmp.DefaultIfEmpty()
                                                      join c_join in db.base_zds on new { a1 = a.wj_wjtype, b1 = "type_wj_wjlx" } equals new { a1 = c_join.zd_id, b1 = c_join.zd_type } into ctmp
                                                      from c in ctmp.DefaultIfEmpty()
                                                      where a.wjid == wjid
                                                      select new WJ_WzjzsModel
                                                      {
                                                          wjid = a.wjid,
                                                          wjholder = a.wjholder,

                                                          contactphone = a.contactphone,
                                                          holderidentity = a.holderidentity,
                                                          householdnum = a.householdnum,
                                                          address = a.address,
                                                          landproperty = a.landproperty,
                                                          completiontime = a.completiontime,
                                                          landnum = a.landnum,
                                                          propertynum = a.propertynum,
                                                          coverarea = a.coverarea,
                                                          buildarea = a.buildarea,
                                                          builduse = a.builduse,
                                                          buildstructure = a.buildstructure,
                                                          buildlayers_up = a.buildlayers_up,
                                                          buildlayers_down = a.buildlayers_down,
                                                          geography = a.geography,
                                                          wj_wjtype = a.wj_wjtype,
                                                          wj_use = a.wj_use,
                                                          wj_land = a.wj_land,
                                                          wj_time = a.wj_time,
                                                          wj_landarea = a.wj_landarea,
                                                          limittime=a.limittime,
                                                          wj_wjarea = a.wj_wjarea,
                                                          wj_buildstructure = a.wj_buildstructure,
                                                          wj_layerup = a.wj_layerup,
                                                          wj_layerdown = a.wj_layerdown,
                                                          process = a.process,
                                                          isgd = a.isgd,
                                                          reportuser = a.reportuser,
                                                          reporttime = a.reporttime,
                                                          foundtime = a.foundtime,
                                                          remark = a.remark,
                                                          parentid = a.parentid,
                                                          createuserid = a.createuserid,
                                                          createtime = a.createtime,
                                                          createusername=b.displayname,
                                                          zd_name=c.zd_name
                                                      };
                model= queryable.FirstOrDefault();
                if (model != null)
                {
                    model.wjfilelist = dal.GetFileList(model.wjid, 1);
                    model.path = "IllegallyBuiltOriginalPath";
                }
                return model;
            }


        }

        public int DeleteWzjz(int wjid) {
            using (Entities db=new Entities())
            {
                IEnumerable<wj_wzjzs> queryable = db.wj_wzjzs.Where(a => a.wjid == wjid || a.parentid ==wjid);
                foreach (var item in queryable)
                {
                    new WJ_FilesDAL().DeleteWzjzFile(item.wjid);
                    db.wj_wzjzs.Remove(item);
                }
                return db.SaveChanges();
            }
            
        }


    }
}
