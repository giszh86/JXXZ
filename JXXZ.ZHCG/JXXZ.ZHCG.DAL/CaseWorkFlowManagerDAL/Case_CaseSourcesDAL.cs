using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_CaseSourcesDAL
    {
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddCaseSources(Case_CaseSourcesModel model)
        {
            using (Entities db = new Entities())
            {
                case_casesources cmodel = new case_casesources();
                cmodel.caseid = model.caseid;
                cmodel.sourceid = model.sourceid;
                cmodel.contact = model.contact;
                cmodel.contactphone = model.contactphone;
                cmodel.contactaddress = model.contactaddress;
                cmodel.wfxwfsdz = model.wfxwfsdz;
                cmodel.cluecontent = model.cluecontent;
                cmodel.processopinion = model.processopinion;
                cmodel.notetaker = model.notetaker;
                cmodel.notetime = model.notetime;
                cmodel.sfla = model.sfla;
                cmodel.casetype = model.casetype;
                cmodel.sfbyla = model.sfbyla;
                cmodel.sfzc = model.sfzc;
                cmodel.sfyj = model.sfyj;
                cmodel.yjdwid = model.yjdwid;
                cmodel.createtime = model.createtime;
                cmodel.createuserid = model.createuserid;
                cmodel.casetypename = model.casetypename;
                cmodel.status = model.status;
                cmodel.lastatus = model.lastatus;

                db.case_casesources.Add(cmodel);
                db.SaveChanges();
                return cmodel.caseid;
            }
        }

        /// <summary>
        /// 处理
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int HandleCaseSources(Case_CaseSourcesModel model)
        {
            using (Entities db = new Entities())
            {
                case_casesources ccmodel = db.case_casesources.FirstOrDefault(a => a.caseid == model.caseid);
                ccmodel.sourceid = model.sourceid;
                ccmodel.contact = model.contact;
                ccmodel.contactaddress = model.contactaddress;
                ccmodel.contactphone = model.contactphone;
                ccmodel.wfxwfsdz = model.wfxwfsdz;
                ccmodel.cluecontent = model.cluecontent;
                ccmodel.processopinion = model.processopinion;
                ccmodel.notetaker = model.notetaker;
                ccmodel.notetime = model.notetime;
                ccmodel.status = model.status;
                ccmodel.casetype = model.casetype;
                ccmodel.yjdwid = model.yjdwid;
                ccmodel.lastatus = 0;

                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 立案
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int RegisterCaseSources(int caseid)
        {
            using (Entities db = new Entities())
            {
                case_casesources model = db.case_casesources.FirstOrDefault(a => a.caseid == caseid);
                if (model != null)
                {
                    model.lastatus = 1;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }

        /// <summary>
        /// 待处理
        /// </summary>
        /// <returns></returns>
        public List<Case_CaseSourcesModel> GetPendingCaseSourcesList(List<Filter> filters, int start, int limit, int userid)
        {
            List<Case_CaseSourcesModel> list = new List<Case_CaseSourcesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_CaseSourcesModel> queryable = from a in db.case_casesources
                                                              join b_join in db.case_sources on a.sourceid equals b_join.sourceid into bTmp
                                                              from b in bTmp.DefaultIfEmpty()
                                                              join c_join in db.base_users on a.createuserid equals c_join.id into cTmp
                                                              from c in cTmp.DefaultIfEmpty()
                                                              join dw in db.doc_wfsas on new { a1 = a.caseid, b1 = "case_casesources" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dTmp
                                                              from d in dTmp.DefaultIfEmpty()
                                                              join e in db.case_workflowspecificactivitys on d.wfsaid equals e.wfsaid into eTmp
                                                              from f in eTmp.DefaultIfEmpty()

                                                              where a.createuserid == userid && (a.status == 3 || (a.status == 1 && a.lastatus == 0))
                                                              select new Case_CaseSourcesModel
                                                              {
                                                                  caseid = a.caseid,
                                                                  casetype = a.casetype,
                                                                  cluecontent = a.cluecontent,
                                                                  contact = a.contact,
                                                                  contactaddress = a.contactaddress,
                                                                  contactphone = a.contactphone,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  createusername = c.displayname,
                                                                  sfbyla = a.sfbyla,
                                                                  sfla = a.sfla,
                                                                  notetaker = a.notetaker,
                                                                  sourceid = a.sourceid,
                                                                  sourcename = b.sourcename,
                                                                  notetime = a.notetime,
                                                                  processopinion = a.processopinion,
                                                                  sfyj = a.sfyj,
                                                                  sfzc = a.sfzc,
                                                                  wfxwfsdz = a.wfxwfsdz,
                                                                  yjdwid = a.yjdwid,
                                                                  status = a.status,
                                                                  casetypename = a.casetypename,
                                                                  wfsid = f.wfsid,
                                                                  wfsaid = f.wfsaid,
                                                              };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                break;
                            case "wfxwfsdz":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wfxwfsdz.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;
                            case "casetypename":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casetypename.Contains(value));
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSourceComparer()).Skip(start).Take(limit).ToList();
            }

            return list;
        }

        /// <summary>
        /// 待处理
        /// </summary>
        /// <returns></returns>
        public int GetPendingCaseSourcesCount(List<Filter> filters, int userid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<case_casesources> queryable = db.case_casesources.Where(a => a.createuserid == userid && (a.status == 3 || (a.status == 1 && a.lastatus == 0))).AsQueryable();
                                                             
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                break;
                            case "wfxwfsdz":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wfxwfsdz.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;
                            case "casetypename":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casetypename.Contains(value));
                                break;
                        }
                    }
                }
                return queryable.Count();
                
            }

        }


        /// <summary>
        /// 已处理
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_CaseSourcesModel> GetProcessedCaseSourcesList(List<Filter> filters, int start, int limit, int userid)
        {
            List<Case_CaseSourcesModel> list = new List<Case_CaseSourcesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_CaseSourcesModel> queryable = from a in db.case_casesources
                                                              join b_join in db.case_sources on a.sourceid equals b_join.sourceid into bTmp
                                                              from b in bTmp.DefaultIfEmpty()
                                                              join c_join in db.base_users on a.createuserid equals c_join.id into cTmp
                                                              from c in cTmp.DefaultIfEmpty()
                                                              join dw in db.doc_wfsas on new { a1 = a.caseid, b1 = "case_casesources" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dTmp
                                                              from d in dTmp.DefaultIfEmpty()
                                                              join e in db.case_workflowspecificactivitys on d.wfsaid equals e.wfsaid into eTmp
                                                              from f in eTmp.DefaultIfEmpty()
                                                              where a.createuserid == userid && ((a.status != 3 && a.status != 1) || (a.status == 1 && a.lastatus == 1))
                                                              select new Case_CaseSourcesModel
                                                              {
                                                                  caseid = a.caseid,
                                                                  casetype = a.casetype,
                                                                  cluecontent = a.cluecontent,
                                                                  contact = a.contact,
                                                                  contactaddress = a.contactaddress,
                                                                  contactphone = a.contactphone,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  createusername = c.displayname,
                                                                  sfbyla = a.sfbyla,
                                                                  sfla = a.sfla,
                                                                  notetaker = a.notetaker,
                                                                  sourceid = a.sourceid,
                                                                  sourcename = b.sourcename,
                                                                  notetime = a.notetime,
                                                                  processopinion = a.processopinion,
                                                                  sfyj = a.sfyj,
                                                                  sfzc = a.sfzc,
                                                                  wfxwfsdz = a.wfxwfsdz,
                                                                  yjdwid = a.yjdwid,
                                                                  status = a.status,
                                                                  lastatus = a.lastatus,
                                                                  casetypename = a.casetypename,
                                                                  wfsid = f.wfsid,
                                                                  wfsaid = f.wfsaid,
                                                              };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                break;
                            case "wfxwfsdz":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wfxwfsdz.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;
                            case "casetypename":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casetypename.Contains(value));
                                break;
                            case "status":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int status = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.status == status);
                                }
                                break;

                                
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSourceComparer()).Skip(start).Take(limit).ToList();
            }

            return list;
        }

        /// <summary>
        /// 已处理
        /// </summary>
        /// <returns></returns>
        public int GetProcessedCaseSourcesCount(List<Filter> filters, int userid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<case_casesources> queryable = db.case_casesources.Where(a => a.createuserid == userid && ((a.status != 3 && a.status != 1) || (a.status == 1 && a.lastatus == 1))).AsQueryable();
                                                             
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                break;
                            case "wfxwfsdz":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wfxwfsdz.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;
                            case "casetypename":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casetypename.Contains(value));
                                break;
                            case "status":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int status = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.status == status);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }

        }


        /// <summary>
        /// 全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_CaseSourcesModel> GetAllCaseSourcesList(List<Filter> filters, int start, int limit)
        {
            List<Case_CaseSourcesModel> list = new List<Case_CaseSourcesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_CaseSourcesModel> queryable = from a in db.case_casesources
                                                              join b_join in db.case_sources on a.sourceid equals b_join.sourceid into bTmp
                                                              from b in bTmp.DefaultIfEmpty()
                                                              join c_join in db.base_users on a.createuserid equals c_join.id into cTmp
                                                              from c in cTmp.DefaultIfEmpty()
                                                              join dw in db.doc_wfsas on new { a1 = a.caseid, b1 = "case_casesources" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dTmp
                                                              from d in dTmp.DefaultIfEmpty()
                                                              join e in db.case_workflowspecificactivitys on d.wfsaid equals e.wfsaid into eTmp
                                                              from f in eTmp.DefaultIfEmpty()
                                                              select new Case_CaseSourcesModel
                                                              {
                                                                  caseid = a.caseid,
                                                                  casetype = a.casetype,
                                                                  cluecontent = a.cluecontent,
                                                                  contact = a.contact,
                                                                  contactaddress = a.contactaddress,
                                                                  contactphone = a.contactphone,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  createusername = c.displayname,
                                                                  sfbyla = a.sfbyla,
                                                                  sfla = a.sfla,
                                                                  notetaker = a.notetaker,
                                                                  sourceid = a.sourceid,
                                                                  sourcename = b.sourcename,
                                                                  notetime = a.notetime,
                                                                  processopinion = a.processopinion,
                                                                  sfyj = a.sfyj,
                                                                  sfzc = a.sfzc,
                                                                  wfxwfsdz = a.wfxwfsdz,
                                                                  yjdwid = a.yjdwid,
                                                                  status = a.status,
                                                                  lastatus = a.lastatus,
                                                                  casetypename = a.casetypename,
                                                                  wfsid = f.wfsid,
                                                                  wfsaid = f.wfsaid,
                                                              };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                break;
                            case "wfxwfsdz":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wfxwfsdz.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;
                            case "casetypename":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casetypename.Contains(value));
                                break;
                            case "status":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int status = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.status == status);
                                }
                                break;


                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSourceComparer()).Skip(start).Take(limit).ToList();
            }

            return list;
        }

        /// <summary>
        /// 全部列表导出
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_CaseSourcesModel> GetAllCaseSourcesListExcel(List<Filter> filters=null)
        {
            List<Case_CaseSourcesModel> list = new List<Case_CaseSourcesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_CaseSourcesModel> queryable = from a in db.case_casesources
                                                              join b_join in db.case_sources on a.sourceid equals b_join.sourceid into bTmp
                                                              from b in bTmp.DefaultIfEmpty()
                                                              join c_join in db.base_users on a.createuserid equals c_join.id into cTmp
                                                              from c in cTmp.DefaultIfEmpty()
                                                              join dw in db.doc_wfsas on new { a1 = a.caseid, b1 = "case_casesources" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dTmp
                                                              from d in dTmp.DefaultIfEmpty()
                                                              join e in db.case_workflowspecificactivitys on d.wfsaid equals e.wfsaid into eTmp
                                                              from f in eTmp.DefaultIfEmpty()
                                                              select new Case_CaseSourcesModel
                                                              {
                                                                  caseid = a.caseid,
                                                                  casetype = a.casetype,
                                                                  cluecontent = a.cluecontent,
                                                                  contact = a.contact,
                                                                  contactaddress = a.contactaddress,
                                                                  contactphone = a.contactphone,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  createusername = c.displayname,
                                                                  sfbyla = a.sfbyla,
                                                                  sfla = a.sfla,
                                                                  notetaker = a.notetaker,
                                                                  sourceid = a.sourceid,
                                                                  sourcename = b.sourcename,
                                                                  notetime = a.notetime,
                                                                  processopinion = a.processopinion,
                                                                  sfyj = a.sfyj,
                                                                  sfzc = a.sfzc,
                                                                  wfxwfsdz = a.wfxwfsdz,
                                                                  yjdwid = a.yjdwid,
                                                                  status = a.status,
                                                                  statusname = a.status==1?"立案":a.status==2?"不予立案":a.status==3?"暂存":"移交",

                                                                  casetypename = a.casetypename,
                                                                  wfsid = f.wfsid,
                                                                  wfsaid = f.wfsaid,
                                                              };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                break;
                            case "wfxwfsdz":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wfxwfsdz.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;
                            case "casetypename":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casetypename.Contains(value));
                                break;
                            case "status":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int status = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.status == status);
                                }
                                break;


                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSourceComparer()).ToList();
            }

            return list;
        }

        /// <summary>
        /// 已处理
        /// </summary>
        /// <returns></returns>
        public int GetAllCaseSourcesCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<case_casesources> queryable = db.case_casesources.AsQueryable();

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                break;
                            case "wfxwfsdz":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wfxwfsdz.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;
                            case "casetypename":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casetypename.Contains(value));
                                break;
                            case "status":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int status = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.status == status);
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
