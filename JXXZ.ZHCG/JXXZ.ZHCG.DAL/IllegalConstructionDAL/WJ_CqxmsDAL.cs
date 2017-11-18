using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.IllegalConstructionDAL
{
    public class WJ_CqxmsDAL
    {

        /// <summary>
        /// 添加拆迁
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddCqxm(WJ_CqxmsModel model)
        {
            using (Entities db = new Entities())
            {
                wj_cqxms wcmodel = new wj_cqxms();
                wcmodel.cqid = model.cqid;
                wcmodel.projectname = model.projectname;
                wcmodel.projectleader = model.projectleader;
                wcmodel.contackphone = model.contackphone;
                wcmodel.cqarea = model.cqarea;
                wcmodel.starttime = model.starttime;
                wcmodel.endtime = model.endtime;
                wcmodel.ssqy = model.ssqy;
                wcmodel.address = model.address;
                wcmodel.geography = model.geography;
                wcmodel.remark = model.remark;
                wcmodel.createuserid = model.createuserid;
                wcmodel.createtime = DateTime.Now;

                db.wj_cqxms.Add(wcmodel);
                db.SaveChanges();
                return wcmodel.cqid;
            }
        }

        /// <summary>
        /// 拆迁列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<WJ_CqxmsModel> GetCqxmList(List<Filter> filters, int start, int limit)
        {
            List<WJ_CqxmsModel> list = new List<WJ_CqxmsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<WJ_CqxmsModel> queryable = from a in db.wj_cqxms
                                                      join b_join in db.base_users on a.createuserid equals b_join.id into bTmp
                                                      from b in bTmp.DefaultIfEmpty()
                                                      join c_join in db.base_zds on new { ssqy = a.ssqy, zd_type = "type_cq" } equals new { ssqy = c_join.zd_id, zd_type = c_join.zd_type} into cTmp
                                                      from c in cTmp.DefaultIfEmpty()
                                                      select new WJ_CqxmsModel
                                                      {
                                                          cqid = a.cqid,
                                                          projectname = a.projectname,
                                                          projectleader = a.projectleader,
                                                          contackphone = a.contackphone,
                                                          starttime = a.starttime,
                                                          endtime = a.endtime,
                                                          address = a.address,
                                                          ssqyname = c == null ? "" : c.zd_name,
                                                          createusername = b == null ? "" : b.displayname,
                                                          createtime = a.createtime,
                                                          ssqy = a.ssqy
                                                      };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "projectname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.projectname.Contains(value));
                                }
                                break;
                            case "projectleader":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.projectleader.Contains(value));
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.starttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.endtime <= Etime);
                                }
                                break;
                            case "ssqy":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ssqy == value);
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
        /// 拆迁拆迁数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetCqxmCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<WJ_CqxmsModel> queryable = from a in db.wj_cqxms
                                                      join b_join in db.base_users on a.createuserid equals b_join.id into bTmp
                                                      from b in bTmp.DefaultIfEmpty()
                                                      join c_join in db.base_zds on new { ssqy = a.ssqy, zd_type = "type_cq" } equals new { ssqy = c_join.zd_id, zd_type = c_join.zd_type } into cTmp
                                                      from c in cTmp.DefaultIfEmpty()
                                                      select new WJ_CqxmsModel
                                                      {
                                                          cqid = a.cqid,
                                                          projectname = a.projectname,
                                                          projectleader = a.projectleader,
                                                          contackphone = a.contackphone,
                                                          starttime = a.starttime,
                                                          endtime = a.endtime,
                                                          address = a.address,
                                                          ssqyname = c == null ? "" : c.zd_name,
                                                          createusername = b == null ? "" : b.displayname,
                                                          createtime = a.createtime,
                                                          ssqy=a.ssqy
                                                      };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "projectname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.projectname.Contains(value));
                                }
                                break;
                            case "projectleader":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.projectleader.Contains(value));
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.starttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.endtime <= Etime);
                                }
                                break;
                            case "ssqy":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ssqy == value);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }

        }

        /// <summary>
        /// 修改拆迁
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditCqxm(WJ_CqxmsModel model)
        {
            using (Entities db = new Entities())
            {
                wj_cqxms wcmodel = db.wj_cqxms.FirstOrDefault(a => a.cqid == model.cqid);
                if (wcmodel != null)
                {
                    wcmodel.cqid = model.cqid;
                    wcmodel.projectname = model.projectname;
                    wcmodel.projectleader = model.projectleader;
                    wcmodel.contackphone = model.contackphone;
                    wcmodel.cqarea = model.cqarea;
                    wcmodel.starttime = model.starttime;
                    wcmodel.endtime = model.endtime;
                    wcmodel.ssqy = model.ssqy;
                    wcmodel.address = model.address;
                    wcmodel.geography = model.geography;
                    wcmodel.remark = model.remark;
                    wcmodel.createuserid = model.createuserid;
                    wcmodel.createtime = DateTime.Now;
                }
                db.SaveChanges();
            }
            return model.cqid;
        }

        /// <summary>
        /// 拆迁详情
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public WJ_CqxmsModel GetCqxmModel(int cqid)
        {
            WJ_FilesDAL dal = new WJ_FilesDAL();
            WJ_CqxmsModel model = new WJ_CqxmsModel();
            using (Entities db = new Entities())
            {
                IQueryable<WJ_CqxmsModel> queryable = from a in db.wj_cqxms
                                                      join b_join in db.base_users on a.createuserid equals b_join.id into bTmp
                                                      from b in bTmp.DefaultIfEmpty()
                                                      join c_join in db.base_zds on new { ssqy = a.ssqy, zd_type = "type_cq" } equals new { ssqy = c_join.zd_id, zd_type = c_join.zd_type } into cTmp
                                                      from c in cTmp.DefaultIfEmpty()
                                                      where a.cqid==cqid
                                                      select new WJ_CqxmsModel
                                                      {
                                                          cqid = a.cqid,
                                                          projectname = a.projectname,
                                                          projectleader = a.projectleader,
                                                          contackphone = a.contackphone,
                                                          starttime = a.starttime,
                                                          endtime = a.endtime,
                                                          address = a.address,
                                                          ssqyname = c == null ? "" : c.zd_name,
                                                          createusername = b == null ? "" : b.displayname,
                                                          cqarea = a.cqarea,
                                                          ssqy = a.ssqy,
                                                          geography = a.geography,
                                                          remark = a.remark,
                                                      };

                model= queryable.FirstOrDefault();
                if (model!=null)
                {
                    model.wjfilelist = dal.GetFileList(model.cqid, 2);
                    model.path = "DemolitionOriginalPath";
                }
                return model;

            }
        }


    }
}
