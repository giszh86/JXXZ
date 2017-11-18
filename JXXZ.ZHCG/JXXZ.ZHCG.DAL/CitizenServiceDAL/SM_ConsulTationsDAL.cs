using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CitizenServiceDAL
{
    public class SM_ConsulTationsDAL
    {

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<SM_ConsulTationsModel> GetConsulTationsList(List<Filter> filters, int start, int limit)
        {
            List<SM_ConsulTationsModel> list = new List<SM_ConsulTationsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<SM_ConsulTationsModel> queryable = from a in db.sm_consultations
                                                              join b_json in db.sm_classes on a.bigtypeid equals b_json.classid into temp1
                                                              from b in temp1.DefaultIfEmpty()
                                                              join c_json in db.sm_classes on a.smalltypeid equals c_json.classid into temp2
                                                              from c in temp2.DefaultIfEmpty()
                                                              join d_json in db.base_users on a.createuserid equals d_json.id into temp3
                                                              from d in temp3.DefaultIfEmpty()
                                                              select new SM_ConsulTationsModel
                                                       {
                                                           consultid = a.consultid,
                                                           consultuser = a.consultuser,
                                                           contact = a.contact,
                                                           title = a.title,
                                                           bigtypeid = a.bigtypeid,
                                                           smalltypeid = a.smalltypeid,
                                                           acceptancetime = a.acceptancetime,
                                                           consultcontent = a.consultcontent,
                                                           createtime = a.createtime,
                                                           createuserid = a.createuserid,
                                                           bigtypename = b.classname,
                                                           smalltypename = c.classname,
                                                           createusername = d.displayname
                                                       };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "consultid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.consultid==id);
                                }
                                break;
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.title.Contains(value));
                                break;
                            case "bigtypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int bigclassid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.bigtypeid == bigclassid);
                                }
                                break;
                            case "consultuser":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.consultuser.Contains(value));
                                break;
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "createusername":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.createusername.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.acceptancetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.acceptancetime <= Etime);
                                }
                                break;
                         
                        }
                    }
                }
                list = queryable.OrderByDescending(t => t.createtime).Skip(start).Take(limit).ToList();
                return list;
            }
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<SM_ConsulTationsModel> GetConsulTationsListExcel(List<Filter> filters = null)
        {
            List<SM_ConsulTationsModel> list = new List<SM_ConsulTationsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<SM_ConsulTationsModel> queryable = from a in db.sm_consultations
                                                              join b_json in db.sm_classes on a.bigtypeid equals b_json.classid into temp1
                                                              from b in temp1.DefaultIfEmpty()
                                                              join c_json in db.sm_classes on a.smalltypeid equals c_json.classid into temp2
                                                              from c in temp2.DefaultIfEmpty()
                                                              join d_json in db.base_users on a.createuserid equals d_json.id into temp3
                                                              from d in temp3.DefaultIfEmpty()
                                                              select new SM_ConsulTationsModel
                                                              {
                                                                  consultid = a.consultid,
                                                                  consultuser = a.consultuser,
                                                                  contact = a.contact,
                                                                  title = a.title,
                                                                  bigtypeid = a.bigtypeid,
                                                                  smalltypeid = a.smalltypeid,
                                                                  acceptancetime = a.acceptancetime,
                                                                  consultcontent = a.consultcontent,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  bigtypename = b.classname,
                                                                  smalltypename = c.classname,
                                                                  createusername = d.displayname
                                                              };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "consultid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.consultid == id);
                                }
                                break;
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.title.Contains(value));
                                break;
                            case "bigtypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int bigclassid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.bigtypeid == bigclassid);
                                }
                                break;
                            case "consultuser":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.consultuser.Contains(value));
                                break;
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "createusername":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.createusername.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.acceptancetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.acceptancetime <= Etime);
                                }
                                break;

                        }
                    }
                }

                list = queryable.OrderByDescending(t => t.createtime).ToList();
                return list;
            }

        }

        /// <summary>
        /// 列表总数
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetConsulTationsCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<SM_ConsulTationsModel> queryable = from a in db.sm_consultations
                                                              join b_json in db.sm_classes on a.bigtypeid equals b_json.classid into temp1
                                                              from b in temp1.DefaultIfEmpty()
                                                              join c_json in db.sm_classes on a.smalltypeid equals c_json.classid into temp2
                                                              from c in temp2.DefaultIfEmpty()
                                                              join d_json in db.base_users on a.createuserid equals d_json.id into temp3
                                                              from d in temp3.DefaultIfEmpty()
                                                              select new SM_ConsulTationsModel
                                                              {
                                                                  consultid = a.consultid,
                                                                  consultuser = a.consultuser,
                                                                  contact = a.contact,
                                                                  title = a.title,
                                                                  bigtypeid = a.bigtypeid,
                                                                  smalltypeid = a.smalltypeid,
                                                                  acceptancetime = a.acceptancetime,
                                                                  consultcontent = a.consultcontent,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  bigtypename = b.classname,
                                                                  smalltypename = c.classname,
                                                                  createusername = d.displayname
                                                              };


                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "consultid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.consultid == id);
                                }
                                break;
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.title.Contains(value));
                                break;
                            case "bigtypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int bigclassid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.bigtypeid == bigclassid);
                                }
                                break;
                            case "consultuser":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.consultuser.Contains(value));
                                break;
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "createusername":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.createusername.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.acceptancetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.acceptancetime >= Etime);
                                }
                                break;

                        }
                    }
                }
                return queryable.Count();
            }
        }


        public int AddConsulTations(SM_ConsulTationsModel smmodel)
        {
            using (Entities db = new Entities())
            {
                sm_consultations model = new sm_consultations();
                model.consultid = smmodel.consultid;
                model.consultuser = smmodel.consultuser;
                model.contact = smmodel.contact;
                model.title = smmodel.title;
                model.bigtypeid = smmodel.bigtypeid;
                model.smalltypeid = smmodel.smalltypeid;
                model.acceptancetime = smmodel.acceptancetime;
                model.consultcontent = smmodel.consultcontent;
                model.createtime = smmodel.createtime;
                model.createuserid = smmodel.createuserid;

                db.sm_consultations.Add(model);
                return db.SaveChanges();
            }

        }
    }
}
