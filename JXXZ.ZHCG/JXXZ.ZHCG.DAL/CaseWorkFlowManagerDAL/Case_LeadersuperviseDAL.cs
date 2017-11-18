using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_LeadersuperviseDAL
    {

        /// <summary>
        /// 获取领导督办列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_LeadersuperviseModel> GetLeadersuperviseList(int start, int limit, int caseid)
        {
            List<Case_LeadersuperviseModel> list = new List<Case_LeadersuperviseModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_LeadersuperviseModel> queryable = from a in db.case_leadersupervises
                                                                  join b_join in db.case_cases on a.caseid equals b_join.caseid into btmp
                                                                  from b in btmp.DefaultIfEmpty()
                                                                  join c_join in db.base_users on a.userid equals c_join.id into ctmp
                                                                  from c in ctmp.DefaultIfEmpty()
                                                                  join d_join in db.base_users on a.createuserid equals d_join.id into dtmp
                                                                  from d in dtmp.DefaultIfEmpty()
                                                                  where a.caseid == caseid
                                                                  select new Case_LeadersuperviseModel
                                                                  {
                                                                      supid = a.supid,
                                                                      caseid = a.caseid,
                                                                      workflowid = a.workflowid,
                                                                      userid = a.userid,
                                                                      supopinion = a.supopinion,
                                                                      suptime = a.suptime,
                                                                      level = a.level,
                                                                      createuserid = a.createuserid,
                                                                      createtime = a.createtime,
                                                                      casereason = b == null ? "" : b.casereason,
                                                                      username = c == null ? "" : c.displayname,
                                                                      mobile = c == null ? "" : c.mobile,
                                                                      dbrname = d == null ? "" : d.displayname,
                                                                      casename = b.casename,
                                                                  };

                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
            }

            return list;
        }


        /// <summary>
        /// 获取历史督办
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_LeadersuperviseModel> GetHistoryLeadersuperviseList(int caseid)
        {
            List<Case_LeadersuperviseModel> list = new List<Case_LeadersuperviseModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_LeadersuperviseModel> queryable = from a in db.case_leadersupervises
                                                                  join b_join in db.case_cases on a.caseid equals b_join.caseid into btmp
                                                                  from b in btmp.DefaultIfEmpty()
                                                                  join c_join in db.base_users on a.userid equals c_join.id into ctmp
                                                                  from c in ctmp.DefaultIfEmpty()
                                                                  join d_join in db.base_users on a.createuserid equals d_join.id into dtmp
                                                                  from d in dtmp.DefaultIfEmpty()
                                                                  where a.caseid == caseid
                                                                  select new Case_LeadersuperviseModel
                                                                  {
                                                                      supid = a.supid,
                                                                      caseid = a.caseid,
                                                                      workflowid = a.workflowid,
                                                                      userid = a.userid,
                                                                      supopinion = a.supopinion,
                                                                      suptime = a.suptime,
                                                                      level = a.level,
                                                                      createuserid = a.createuserid,
                                                                      createtime = a.createtime,
                                                                      casereason = b == null ? "" : b.casereason,
                                                                      username = c == null ? "" : c.displayname,
                                                                      mobile = c == null ? "" : c.mobile,
                                                                      dbrname = d == null ? "" : d.displayname,
                                                                  };

                list = queryable.OrderByDescending(a => a.createtime).ToList();
            }

            return list;
        }


        /// <summary>
        /// 获取领导督办数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetLeadersuperviseCount(int caseid)
        {
            List<Case_LeadersuperviseModel> list = new List<Case_LeadersuperviseModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_LeadersuperviseModel> queryable = from a in db.case_leadersupervises
                                                                  join b_join in db.case_cases on a.caseid equals b_join.caseid into btmp
                                                                  from b in btmp.DefaultIfEmpty()
                                                                  where a.caseid == caseid
                                                                  select new Case_LeadersuperviseModel
                                                                  {
                                                                      supid = a.supid,
                                                                      caseid = a.caseid,
                                                                      workflowid = a.workflowid,
                                                                      userid = a.userid,
                                                                      supopinion = a.supopinion,
                                                                      suptime = a.suptime,
                                                                      level = a.level,
                                                                      createuserid = a.createuserid,
                                                                      createtime = a.createtime,
                                                                      casereason = b == null ? "" : b.casereason,

                                                                  };

                return queryable.Count();
            }

        }


        /// <summary>
        /// 获取督办详情
        /// </summary>
        /// <param name="supid"></param>
        /// <returns></returns>
        public Case_LeadersuperviseModel GetLeadersuperviseModel(int supid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<Case_LeadersuperviseModel> queryable = from a in db.case_leadersupervises
                                                                  join b_join in db.case_cases on a.caseid equals b_join.caseid into btmp
                                                                  from b in btmp.DefaultIfEmpty()
                                                                  where a.supid == supid
                                                                  select new Case_LeadersuperviseModel
                                                                  {
                                                                      supid = a.supid,
                                                                      caseid = a.caseid,
                                                                      workflowid = a.workflowid,
                                                                      userid = a.userid,
                                                                      supopinion = a.supopinion,
                                                                      suptime = a.suptime,
                                                                      level = a.level,
                                                                      createuserid = a.createuserid,
                                                                      createtime = a.createtime,
                                                                      casereason = b == null ? "" : b.casereason,

                                                                  };

                return queryable.FirstOrDefault();
            }
        }

        /// <summary>
        /// 添加领导督办
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddLeadersupervise(Case_LeadersuperviseModel model)
        {
            using (Entities db = new Entities())
            {
                case_leadersupervises clmodel = new case_leadersupervises();
                clmodel.supid = model.supid;
                clmodel.caseid = model.caseid;
                clmodel.workflowid = model.workflowid;
                clmodel.userid = model.userid;
                clmodel.supopinion = model.supopinion;
                clmodel.suptime = DateTime.Now;
                clmodel.level = model.level;
                clmodel.createuserid = model.createuserid;
                clmodel.createtime = DateTime.Now;
                db.case_leadersupervises.Add(clmodel);
                db.SaveChanges();
                return clmodel.supid;
            }
        }

        #region 后台
        /// <summary>
        /// 获取所有一般案件列表
        /// </summary>
        /// <returns></returns>
        public Paging<List<AlreadyModel>> GetAlreadySupervise(List<Filter> filters, int start, int limit)
        {
            Paging<List<AlreadyModel>> paging = new Paging<List<AlreadyModel>>();
            List<AlreadyModel> list = new List<AlreadyModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select cc.casename,wfsa.wfsaid,wfs.wfsid,wfs.cswfsid wfsid2,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,wfsa.etime,zd1.zd_name,buser.displayname as dealname,buser.phone as phone ,bunit.name as unitname,cw1.userid as clrid
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
left join case_cases cc on wfs.caseid=cc.caseid
LEFT JOIN base_zds zd1 on wfs.casetypeid=zd1.zd_id and zd1.zd_type='type_case'
LEFT JOIN base_users buser on wfsa.dealuserid= buser.id
LEFT JOIN base_units bunit on buser.unitid=bunit.id
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where (wfs.casemode is null or wfs.casemode =1 or wfs.casemode =3) and wfs.wfid='2017030613400001' and   wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1 GROUP BY tab1.wfsid");
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casebh":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casebh.Contains(value));
                                break;
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casereason.Contains(value));
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    query = query.Where(t => t.casesourceid == sourceid);
                                }
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.wfdid == value);
                                break;                            
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    query = query.Where(t => t.createtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    query = query.Where(t => t.createtime <= Etime);
                                }
                                break;
                            case "casetypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int casetypeid = Convert.ToInt32(value);
                                    query = query.Where(t => t.casetypeid == value);
                                }
                                break;
                            case "dealname":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.dealname.Contains(value));
                                break;              
                        }
                    }
                }
                paging.Total = query.Count();
                list = query.OrderByDescending(t=>t.createtime).Skip(start).Take(limit).ToList();
                paging.Items = list;

                return paging;

            }
        }

        /// <summary>
        /// 获取所有一般案件列表
        /// </summary>
        /// <returns></returns>
        public int GetAlreadySuperviseCount(List<Filter> filters)
        {
            List<AlreadyModel> list = new List<AlreadyModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,wfsa.etime,zd1.zd_name,buser.displayname as dealname ,bunit.name as unitname
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN base_zds zd1 on wfs.casetypeid=zd1.zd_id and zd1.zd_type='type_case'
LEFT JOIN base_users buser on wfsa.dealuserid= buser.id
LEFT JOIN base_units bunit on buser.unitid=bunit.id
                         where wfs.wfid='2017030613400001' and   wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1 GROUP BY tab1.wfsid");
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {

                    }
                }
                return query.Count();

            }
        }

        /// <summary>
        /// 列表导出
        /// </summary>
        /// <returns></returns>
        public List<AlreadyModel> GetAlreadySuperviseExcel(List<Filter> filters=null)
        {
            List<AlreadyModel> list = new List<AlreadyModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,wfsa.etime,zd1.zd_name,buser.displayname as dealname ,bunit.name as unitname,cw1.userid as clrid
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN base_zds zd1 on wfs.casetypeid=zd1.zd_id and zd1.zd_type='type_case'
LEFT JOIN base_users buser on wfsa.dealuserid= buser.id
LEFT JOIN base_units bunit on buser.unitid=bunit.id
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where wfs.wfid='2017030613400001' and   wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1 GROUP BY tab1.wfsid");
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {

                    }
                }
                list = query.ToList();
                return list;

            }
        }
        #endregion

        #region Api
        /// <summary>
        /// 获取未督办列表
        /// </summary>
        /// <returns></returns>
        public List<AlreadyModel> GetNoAlreadySupervise(List<Filter> filters, int start, int limit)
        {
            List<AlreadyModel> list = new List<AlreadyModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,cc.p_name,cc.f_name,wfsa.etime,cw1.userid as clrid,cc.casename
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN case_cases cc on wfs.caseid=cc.caseid
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where wfsa.wfdid<>'2017030613500031' and wfs.wfid='2017030613400001' and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1
where tab1.supid is null
 GROUP BY tab1.wfsid");
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                         string value = filter.value;
                         switch (filter.property)
                         {
                             case "casereason":
                                 if (!string.IsNullOrEmpty(value))
                                     query = query.Where(t => t.casename.Contains(value));
                                 break;
                         }
                    }
                }
                list = query.Skip(start).Take(limit).ToList();
                return list;
            }
        }

        /// <summary>
        /// 获取未督办列表数量
        /// </summary>
        /// <returns></returns>
        public int GetNoAlreadySuperviseCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,cc.p_name,cc.f_name,wfsa.etime,cw1.userid as clrid,cc.casename
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN case_cases cc on wfs.caseid=cc.caseid
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where wfsa.wfdid<>'2017030613500031' and wfs.wfid='2017030613400001' and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1
where tab1.supid is null
 GROUP BY tab1.wfsid");
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                        }
                    }
                }
                return query.Count();

            }
        }

        /// <summary>
        /// 获取所有自己已督办列表
        /// </summary>
        /// <returns></returns>
        public List<AlreadyModel> GetYesUserAlreadySupervise(List<Filter> filters, int start, int limit, int userid)
        {
            List<AlreadyModel> list = new List<AlreadyModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,cc.p_name,cc.f_name,wfsa.etime,cw1.userid as clrid,cc.casename
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN case_cases cc on wfs.caseid=cc.caseid
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where wfs.wfid='2017030613400001' and cl.createuserid={0} and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1
where tab1.supid is not null
 GROUP BY tab1.wfsid", userid);
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                        }
                    }
                }
                list = query.Skip(start).Take(limit).ToList();
                return list;
            }
        }

        /// <summary>
        /// 获取所有自己已督办列表数量
        /// </summary>
        /// <returns></returns>
        public int GetYesUserAlreadySuperviseCount(List<Filter> filters, int userid)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,cc.p_name,cc.f_name,wfsa.etime,cw1.userid as clrid,cc.casename
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN case_cases cc on wfs.caseid=cc.caseid
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where wfs.wfid='2017030613400001' and cl.createuserid={0} and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1
where tab1.supid is not null
 GROUP BY tab1.wfsid", userid);
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                        }
                    }
                }
                return query.Count();

            }
        }

        /// <summary>
        /// 获取所有他人已督办列表
        /// </summary>
        /// <returns></returns>
        public List<AlreadyModel> GetNoUserAlreadySupervise(List<Filter> filters, int start, int limit, int userid)
        {
            List<AlreadyModel> list = new List<AlreadyModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,cc.p_name,cc.f_name,wfsa.etime,cw1.userid as clrid,cc.casename
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN case_cases cc on wfs.caseid=cc.caseid
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where wfs.wfid='2017030613400001' and cl.createuserid<>{0} and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1
where tab1.supid is not null
 GROUP BY tab1.wfsid", userid);
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                        }
                    }
                }
                list = query.Skip(start).Take(limit).ToList();
                return list;
            }
        }

        /// <summary>
        /// 获取所有他人已督办列表数量
        /// </summary>
        /// <returns></returns>
        public int GetNoUserAlreadySuperviseCount(List<Filter> filters, int userid)
        {
            List<AlreadyModel> list = new List<AlreadyModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,
wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,wfs.caseid,cl.supid ,cl.userid as alreadyuserid,cc.p_name,cc.f_name,wfsa.etime,cw1.userid as clrid,cc.casename
from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
LEFT JOIN case_leadersupervises cl on wfs.caseid=cl.caseid
LEFT JOIN case_cases cc on wfs.caseid=cc.caseid
left join case_workflowspecificusers cw1 on wfsa.wfsaid=cw1.wfsaid and cw1.`status`=1
                         where wfs.wfid='2017030613400001' and cl.createuserid<>{0} and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc)  tab1
where tab1.supid is not null
 GROUP BY tab1.wfsid", userid);
                IEnumerable<AlreadyModel> query = db.Database.SqlQuery<AlreadyModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                        }
                    }
                }
                return query.Count();
            }
        }
        #endregion


    }
}
