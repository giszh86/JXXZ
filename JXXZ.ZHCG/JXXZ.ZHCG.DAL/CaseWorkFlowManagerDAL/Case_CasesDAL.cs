using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_CasesDAL
    {

        /// <summary>
        /// 添加一般案件
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddCase(Case_CasesModel model)
        {
            using (Entities db = new Entities())
            {
                case_cases casemodel = new case_cases();

                casemodel.casebh = model.casebh;

                casemodel.casetypeid = model.casetypeid;
                casemodel.casesourceid = model.casesourceid;
                casemodel.casename = model.casename;
                casemodel.qlsxid = model.qlsxid;
                casemodel.qlsx = model.qlsx;
                casemodel.casereason = model.casereason;
                casemodel.fromcasesource = model.fromcasesource;
                casemodel.caseaddress = model.caseaddress;
                casemodel.sitedatetime = model.sitedatetime;
                casemodel.geographical84 = model.geographical84;
                casemodel.geographical2000 = model.geographical2000;
                casemodel.persontype = model.persontype;
                casemodel.p_name = model.p_name;
                casemodel.p_sex = model.p_sex;
                casemodel.p_cardtype = model.p_cardtype;
                casemodel.p_cardnum = model.p_cardnum;
                casemodel.f_name = model.f_name;
                casemodel.f_dbr = model.f_dbr;
                casemodel.f_cardtype = model.f_cardtype;
                casemodel.f_card = model.f_card;
                casemodel.f_wtr = model.f_wtr;
                casemodel.f_cardnum = model.f_cardnum;
                casemodel.contactphone = model.contactphone;
                casemodel.contactaddress = model.contactaddress;
                casemodel.flfg = model.flfg;
                casemodel.clyj = model.clyj;
                casemodel.wfqx = model.wfqx;
                casemodel.cf = model.cf;
                casemodel.zdmj = model.zdmj;
                casemodel.gdmj = model.gdmj;
                casemodel.ghjzmj = model.ghjzmj;
                casemodel.gtjzmj = model.gtjzmj;
                casemodel.casecontent = model.casecontent;
                casemodel.createtime = DateTime.Now;
                casemodel.createuserid = model.createuserid;
                casemodel.sszd = model.sszd;
                casemodel.ssxbzd = model.ssxbzd;
                casemodel.zbuserid = model.zbuserid;
                casemodel.xbuserid = model.xbuserid;
                casemodel.tzcsid = model.tzcsid;
                casemodel.issave = model.issave;
                db.case_cases.Add(casemodel);
                db.SaveChanges();
                return casemodel.caseid;
            }
        }


        /// <summary>
        /// 一般事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <param name="wfid"></param>
        /// <returns></returns>
        public Paging<List<CaseList>> GetCaseList(List<Filter> filters, int start, int limit, int userid, int status, string wfid)
        {
            List<CaseList> list = new List<CaseList>();
            Paging<List<CaseList>> paging = new Paging<List<CaseList>>();
            string casemodestr = "";
            using (Entities db = new Entities())
            {
                if (status == 1)//待办列表筛选条件
                    casemodestr = "wfsu.status = 1 and (wfs.casemode = 1 or wfs.casemode is null)";
                else if (status == 2)
                    casemodestr = "wfs.casemode is null or wfs.casemode =3";
                else if (status == 3)
                {//撤销列表筛选条件
                    casemodestr = "wfs.casemode = 3";
                    status = 2;
                }
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.cswfsid wfsid2,wfs.casemode casemode,
wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,wfsa.wfdid,wfsa.dealtime,wfs.caseid,bz.zd_name,cp.term,wfsa.etime,wfsuser.displayname dealusername,wfsunit.`name` dealunitname,ccuser.unitid zbunitid,ccunit.`name` zbunitname,cc.persontype,cc.sitedatetime,cc.qlsxid,cc.casename
from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowspecificusers wfsu on wfsa.wfsaid=wfsu.wfsaid
                         inner join base_users wfsuser on wfsu.userid=wfsuser.id
                         inner join base_units wfsunit on wfsuser.unitid=wfsunit.id
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join base_zds bz on wfs.casetypeid=bz.zd_id and zd_type='type_case'
                         left join case_prescriptions cp on wfsa.wfdid=cp.workid
                         left join case_cases cc on wfs.caseid=cc.caseid
                         left join base_users ccuser on cc.zbuserid=ccuser.id
                         left join base_units ccunit on ccuser.unitid=ccunit.id
                         where ({3}) and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where userid={0} and status={1} and wfd.wfid={2}
                           )
                         )
                        ORDER BY wfsuser.usertypeid DESC) ts GROUP BY wfsid ORDER BY createtime DESC", userid, status, wfid, casemodestr);
                IEnumerable<CaseList> query = db.Database.SqlQuery<CaseList>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casename":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.wfdid == value);
                                break;
                            case "casetypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    query = query.Where(t => t.casetypeid == value);
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    query = query.Where(t => t.sitedatetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    query = query.Where(t => t.sitedatetime <= Etime);
                                }
                                break;
                        }
                    }
                }
                list = query.Skip(start).Take(limit).ToList();
                Case_WorkFlowManagerDAL cwfmdal = new Case_WorkFlowManagerDAL();
                foreach (var item in list)
                {
                    item.process = cwfmdal.ProcessIndex(wfid, item.wfdid);
                    item.overtime = item.createtime.Value.AddHours(item.term);
                }
                //获取列表
                paging.Items = list;
                //获取列表总数量                
                paging.Total = query.Count();

                return paging;
            }

        }

        /// <summary>
        /// 一般事件全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <param name="wfid"></param>
        /// <returns></returns>
        public Paging<List<CaseList>> GetAllCaseList(List<Filter> filters, int start, int limit, string wfid, int? XZID = null)
        {
            List<CaseList> list = new List<CaseList>();
            Paging<List<CaseList>> paging = new Paging<List<CaseList>>();
            using (Entities db = new Entities())
            {
                string xzsql = "";
                if (XZID != null)
                    xzsql = "  and ccuser.unitid="+XZID;
                string sql = string.Format(@"select * from (select wfsa.wfsaid,wfs.wfsid,wfs.cswfsid wfsid2,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,bz.zd_name,cp.term,wfsa.etime,wfsuser.displayname dealusername,wfsunit.`name` dealunitname,ccuser.unitid zbunitid,ccunit.`name` zbunitname,ccunit2.`name` rezbunitname,wfs.caseid,cc.p_name,cc.f_name,cc.sitedatetime,cc.casename
from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowspecificusers wfsu on wfsa.wfsaid=wfsu.wfsaid
                         inner join base_users wfsuser on wfsu.userid=wfsuser.id
                         inner join base_units wfsunit on wfsuser.unitid=wfsunit.id
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         inner join base_zds bz on wfs.casetypeid=bz.zd_id and zd_type='type_case'
                         left join case_prescriptions cp on wfsa.wfdid=cp.workid
                         left join case_cases cc on wfs.caseid=cc.caseid
                         left join base_users ccuser on cc.zbuserid=ccuser.id
                         left join base_units ccunit on ccuser.unitid=ccunit.id
                         left join base_units ccunit2 on ccunit.parentid=ccunit2.id and ccunit.`name` not LIKE('%中队') and ccunit2.unittypeid = 2
                         where (wfs.casemode is null or wfs.casemode =1 or wfs.casemode =3) and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3 and wfd.wfid={0}
                           )
                         ) {1}
                         ORDER BY wfsuser.usertypeid DESC) ts GROUP BY wfsid ORDER BY createtime DESC", wfid, xzsql);
                IEnumerable<CaseList> query = db.Database.SqlQuery<CaseList>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casename":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.wfdid == value);
                                break;
                            case "casetypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    query = query.Where(t => t.casetypeid == value);
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    query = query.Where(t => t.sitedatetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    query = query.Where(t => t.sitedatetime <= Etime);
                                }
                                break;
                        }
                    }
                }
                list = query.Skip(start).Take(limit).ToList();
                Case_WorkFlowManagerDAL cwfmdal = new Case_WorkFlowManagerDAL();
                foreach (var item in list)
                {
                    item.process = cwfmdal.ProcessIndex(wfid, item.wfdid);
                    item.overtime = item.createtime.Value.AddHours(item.term);
                }
                //获取列表
                paging.Items = list;
                //获取列表总数量                
                paging.Total = query.Count();

                return paging;
            }
        }

        /// <summary>
        /// 一般事件列表导出
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <param name="wfid"></param>
        /// <returns></returns>
        public List<CaseList> GetCaseListExcel(int userid, int status, List<Filter> filters)
        {
            List<CaseList> list = new List<CaseList>();
            using (Entities db = new Entities())
            {
                string sql = "";
                string casemodestr = "";

                if (status == 2 || status == 3)//一般列表导出
                {
                    if (status == 2)
                        casemodestr = "wfs.casemode is null or wfs.casemode =3";
                    else if (status == 3)
                    {//撤销列表筛选条件
                        casemodestr = "wfs.casemode = 3";
                        status = 2;
                    }
                    sql = string.Format(@"select wfsa.wfsaid,wfs.wfsid,wfs.cswfsid wfsid2,wfs.casemode casemode,
    wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,wfsa.wfdid,wfsa.dealtime,wfs.caseid,bz.zd_name,cp.term,wfsa.etime,wfsuser.displayname dealusername,wfsunit.`name` dealunitname,ccuser.unitid zbunitid,ccunit.`name` zbunitname,cc.persontype
    from case_workflowspecifics wfs
                             inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                             inner join case_workflowspecificusers wfsu on wfsa.wfsaid=wfsu.wfsaid
                             inner join base_users wfsuser on wfsu.userid=wfsuser.id
                             inner join base_units wfsunit on wfsuser.unitid=wfsunit.id
                             inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                             inner join base_zds bz on wfs.casetypeid=bz.zd_id and zd_type='type_case'
                             left join case_prescriptions cp on wfsa.wfdid=cp.workid
                             left join case_cases cc on wfs.caseid=cc.caseid
                             left join base_users ccuser on cc.zbuserid=ccuser.id
                             left join base_units ccunit on ccuser.unitid=ccunit.id
                             where ({2}) and wfs.wfsid in (
                               select wfsid from case_workflowspecificactivitys where wfsaid in (
                                 select wfsaid from case_workflowspecificusers where userid={0} and status={1} and wfd.wfid=2017030613400001
                               )
                             )
                             GROUP BY wfs.wfsid order by wfsa.createtime desc", userid, status, casemodestr);
                }
                else//全部列表导出
                {
                    sql = string.Format(@"select wfsa.wfsaid,wfs.wfsid,wfs.cswfsid wfsid2,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,bz.zd_name,cp.term,wfsa.etime,wfsuser.displayname dealusername,wfsunit.`name` dealunitname,ccuser.unitid zbunitid,ccunit.`name` zbunitname,ccunit2.`name` rezbunitname
from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowspecificusers wfsu on wfsa.wfsaid=wfsu.wfsaid
                         inner join base_users wfsuser on wfsu.userid=wfsuser.id
                         inner join base_units wfsunit on wfsuser.unitid=wfsunit.id
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         inner join base_zds bz on wfs.casetypeid=bz.zd_id and zd_type='type_case'
                         left join case_prescriptions cp on wfsa.wfdid=cp.workid
                         left join case_cases cc on wfs.caseid=cc.caseid
                         left join base_users ccuser on cc.zbuserid=ccuser.id
                         left join base_units ccunit on ccuser.unitid=ccunit.id
                         left join base_units ccunit2 on ccunit.parentid=ccunit2.id and ccunit.`name` not LIKE('%中队') and ccunit2.unittypeid = 2
                         where (wfs.casemode is null or wfs.casemode =1 or wfs.casemode =3) and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3 and wfd.wfid=2017030613400001
                           )
                         )
                         GROUP BY wfs.wfsid order by wfsa.createtime desc");
                }
                IEnumerable<CaseList> query = db.Database.SqlQuery<CaseList>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casename":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.casename.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.wfdid == value);
                                break;
                            case "casetypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    query = query.Where(t => t.casetypeid == value);
                                }
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
                        }
                    }
                }
                list = query.ToList();
                foreach (var item in list)
                {
                    item.overtime = item.createtime.Value.AddHours(item.term);
                }

                return list;
            }
        }

        /// <summary>
        /// 一般事件详情
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <param name="wfid"></param>
        /// <returns></returns>
        public Case_CasesModel GetCaseModel(string wfsid)
        {
            Case_CasesModel model = new Case_CasesModel();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select dw.dwfsasid,dw.ddid,cc.caseid,cc.caseid,cc.casebh,cc.casetypeid,cc.casesourceid,cc.casereason,cc.casename,cc.qlsx,cc.fromcasesource,cc.caseaddress,cc.sitedatetime,
cc.geographical84,cc.geographical2000,cc.persontype,cc.p_name,cc.p_sex,cc.p_cardtype,cc.p_cardnum
,cc.f_name,cc.f_dbr,cc.f_cardtype,cc.f_card,cc.f_wtr,cc.f_cardnum,cc.contactaddress,cc.contactphone,cc.zbuserid,cc.xbuserid,bu1.displayname as zbusername,bu2.displayname as xbusername,
cc.flfg,cc.clyj,cc.wfqx,cc.cf,cc.zdmj,cc.gdmj,cc.ghjzmj,cc.gtjzmj,cc.casecontent,cc.createtime,cc.createuserid,cz1.zd_name as casetypename ,cs.sourcename as casesourcename,bu.displayname,
dw.lastpdfpath,cc.sszd,cc.ssxbzd,dw.wfsaid,wfsa.wfsid,cz4.zd_name as f_cardtypename,wfsas.dealtime as lastdealtime, wfsas.stime,wfsas.etime
from case_cases cc 
inner join doc_wfsas dw on cc.caseid=dw.caseid
inner join case_workflowspecificactivitys wfsa on dw.wfsaid=wfsa.wfsaid
left join case_zds cz1 on cc.casetypeid=cz1.zd_id and cz1.zd_type ='type_case'
left join case_sources cs on cc.casesourceid=cs.sourceid
left join base_users bu on cc.createuserid =bu.id 
left join base_users bu1 on cc.zbuserid =bu1.id 
left join base_users bu2 on cc.xbuserid =bu2.id 
LEFT JOIN case_zds cz4 on cc.f_cardtype =cz4.zd_id and cz4.zd_type=cc.persontype
LEFT JOIN case_workflowspecifics wfss on wfss.wfsid={0} and cc.caseid =wfss.caseid
LEFT JOIN case_workflowspecificactivitys wfsas on wfss.currentwfsaid =wfsas.wfsaid
where dw.ddid=9 and dw.wfsaid in (select wfsa.wfsaid from case_workflowspecifics wfs
inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.wfsid={0})
order by dw.dwfsasid desc", wfsid);
                IEnumerable<Case_CasesModel> query = db.Database.SqlQuery<Case_CasesModel>(sql);

                model = query.FirstOrDefault();
            }
            return model;
        }


        public List<CaseWorkFlowOldModel> GetCaseOidList(string wfsid)
        {
            Entities db = new Entities();
            List<CaseWorkFlowOldModel> list = (from a in db.case_workflowspecificusers
                                              join b_join in db.case_workflowspecificactivitys on a.wfsaid equals b_join.wfsaid into btemp
                                              from b in btemp.DefaultIfEmpty()
                                              join c_join in db.base_users on a.userid equals c_join.id into ctemp
                                              from c in ctemp.DefaultIfEmpty()
                                              join d_join in db.base_users on a.createuserid equals d_join.id into dtemp
                                              from d in dtemp.DefaultIfEmpty()
                                              join e_join in db.case_workflowdetails on b.wfdid equals e_join.wfdid into etemp
                                              from e in etemp.DefaultIfEmpty()
                                              where a.status == 2 && b.wfsid == wfsid
                                              select new CaseWorkFlowOldModel
                                              {
                                                  wfsaid = b.wfsaid,
                                                  wfsid = b.wfsid,
                                                  status = b.status,
                                                  dealuserid = b.dealuserid,
                                                  wfdid = b.wfdid,
                                                  createtime = b.createtime,
                                                  wfsuid = a.wfsuid,
                                                  userid = a.userid,
                                                  content = a.content,
                                                  createuserid = a.createuserid,
                                                  ismainuser = a.ismainuser,
                                                  remark = a.remark,
                                                  wfdname = e.wfdname,
                                                  dealtime = a.dealtime,
                                                  username = c.displayname,
                                                  createusername = d.displayname,
                                                  stime = b.stime,
                                                  etime = b.etime,
                                              }).ToList();
            string wfdid = (from wfs in db.case_workflowspecifics
                            join wfsa in db.case_workflowspecificactivitys
                            on wfs.currentwfsaid equals wfsa.wfsaid
                            where wfs.wfsid == wfsid
                            select new CaseWorkFlowOldModel
                            {
                                wfdid = wfsa.wfdid
                            }).FirstOrDefault().wfdid;
            string wfsaid = list[list.Count() - 1].wfsaid;
            IQueryable<case_workflowspecificusers> iabel2 = db.case_workflowspecificusers.Where(t => t.wfsaid == wfsaid);
            string wfdidstr = Convert.ToDouble(wfdid) > Convert.ToDouble(list[list.Count() - 1].wfdid) ? "提交" : "回退";
            if (iabel2.Count() > 1)
                list[list.Count() - iabel2.Count()].remark = wfdidstr;//暂时获取数量并修改
            else
                list[list.Count() - 1].remark = wfdidstr;
            if (list.Count() == 1)
                list[0].remark = "暂存";//第一步立案暂存

            return list;
        }

        //public List<CaseWorkFlowOldModel> GetOldWorkFlow(string wfsaid)
        //{
        //    List<CaseWorkFlowOldModel> list = new List<CaseWorkFlowOldModel>();
        //    using (Entities db = new Entities())
        //    {
        //        IQueryable<CaseWorkFlowOldModel> queryable = from a in db.case_workflowspecificusers
        //                                                     join b_join in db.case_workflowspecificactivitys on a.wfsaid equals b_join.wfsaid into btemp
        //                                                     from b in btemp.DefaultIfEmpty()
        //                                                     join c_join in db.base_users on a.userid equals c_join.id into ctemp
        //                                                     from c in ctemp.DefaultIfEmpty()
        //                                                     join d_join in db.base_users on a.createuserid equals d_join.id into dtemp
        //                                                     from d in dtemp.DefaultIfEmpty()
        //                                                     join e_join in db.case_workflowdetails on b.wfdid equals e_join.wfdid into etemp
        //                                                     from e in etemp.DefaultIfEmpty()
        //                                                     where a.wfsaid == wfsaid && a.status == 2
        //                                                     select new CaseWorkFlowOldModel
        //                                                     {
        //                                                         wfsaid = b.wfsaid,
        //                                                         wfsid = b.wfsid,
        //                                                         status = b.status,
        //                                                         dealuserid = b.dealuserid,
        //                                                         wfdid = b.wfdid,
        //                                                         createtime = b.createtime,
        //                                                         wfsuid = a.wfsuid,
        //                                                         userid = a.userid,
        //                                                         content = a.content,
        //                                                         createuserid = a.createuserid,
        //                                                         ismainuser = a.ismainuser,
        //                                                         remark = a.remark,
        //                                                         wfdname = e.wfdname,
        //                                                         dealtime = a.dealtime,
        //                                                         username = c.displayname,
        //                                                         createusername = d.displayname,
        //                                                         stime = b.stime,
        //                                                         etime = b.etime,
        //                                                     };


        //        list = queryable.ToList();
        //        return list;
        //    }

        //}


        public List<DocPageList> GetCaseDocList(string ddtablename, string wfsid, string wfsid2 = null)
        {
            Entities db = new Entities();
            List<DocList> lists = new List<DocList>();
            List<DocPageList> listpage = new List<DocPageList>();
            List<case_phases> listcp = db.case_phases.ToList();
            for (int i = 0; i < listcp.Count(); i++)
            {
                DocPageList model = new DocPageList();
                model.id = i;
                model.text = listcp[i].phasename;
                model.leaf = false;
                model.children = new List<DocList>();
                if (ddtablename == "case_cases")
                {
                    listpage.Add(model);
                }
                else if ((ddtablename == "case_casesources" || ddtablename == "case_simplecases") && i == 0)
                {
                    listpage.Add(model);
                }
            }
            if (!string.IsNullOrEmpty(wfsid))
            {
                string sql = @"SELECT * FROM (
		SELECT
			dw.dwfsasid,
			dw.wfsaid,
			dw.ddid,
			dw.filetyoe,
			dw.filename,
			dw.filepath,
			dw.createuserid,
			dw.createtime,
			dw.caseid,
			dw.lastwordpath,
			dw.lastpdfpath,
			dw.lastdwfname,
			dw.lastdwfcode,
			dw.ddtablename,
			dw.ddtableid,
			cwfsas.wfdid,
			dd.doccode,
			dd.ddname,
			dd.ddname AS text,
			wfd.phaseid,
			cp.phasename
		FROM
			doc_wfsas dw
		LEFT JOIN doc_definitions dd ON dw.ddid = dd.ddid
		LEFT JOIN case_workflowspecificactivitys cwfsas ON dw.wfsaid = cwfsas.wfsaid
		LEFT JOIN case_workflowdetails wfd ON cwfsas.wfdid = wfd.wfdid
		LEFT JOIN case_phases cp ON wfd.phaseid = cp.phaseid
		WHERE
			dw.ddtablename = '{0}'
		AND dw.filetyoe <> 4
		AND cwfsas.wfsid = {1}
		AND dw.ddid IS NOT NULL
        AND dw.`status` = 0
		AND dw.wfsaid IN (
			SELECT
				cwfsa.wfsaid
			FROM
				case_workflowspecifics cwfs
			INNER JOIN case_workflowspecificactivitys cwfsa ON cwfs.wfsid = cwfsa.wfsid
		)
		ORDER BY
			dw.dwfsasid DESC
	) tt
GROUP BY
	phaseid,ddid";
                IEnumerable<DocList> query = db.Database.SqlQuery<DocList>(string.Format(sql, ddtablename, wfsid));
                if (wfsid2 != null)
                {
                    IEnumerable<DocList> query2 = db.Database.SqlQuery<DocList>(string.Format(sql, "case_casesources", wfsid2));
                    query = query.Union(query2);
                }
                lists = query.ToList();
                Doc_WfdddrsDAL dal = new Doc_WfdddrsDAL();
                string[] arr = new string[] { "2017030613500005", "2017030613500010", "2017030613500017", "2017030613500022", "2017030613500023", "2017030613500027" };
                string[] htarr = new string[] { "2017030613500004", "2017030613500009", "2017030613500013" };
                string[] namearr = new string[] { "", "", "立案审批表", "案件终结报告", "行政处罚告知审批表", "行政处罚决定审批表", "", "相关事项审批表", "行政处罚案件结案报告", "" };
                Dictionary<int, string> dic = new Dictionary<int, string>();
                for (int i = 0; i < 7; i++)
                {
                    dic.Add(i, namearr[i]);
                }
                foreach (var item in lists)
                {
                    item.doccount = dal.GetWFSASList(item.wfsaid, (int)item.ddid,(int)item.phaseid).Count();
                    bool ischild = arr.Contains(item.wfdid);
                    if (ischild && item.doccode == null)//每当环节小阶段结束,改变文书阶段
                        item.phaseid = item.phaseid - 1;
                    item.text += "(" + item.doccount + ")";
                    item.leaf = true;
                    if ((ischild && item.doccode == null) || (htarr.Contains(item.wfdid) && item.doccode == null))
                    {
                        if (item.ddname == namearr[item.phaseid])
                            listpage[item.phaseid - 1].children.Add(item);
                    }
                    else
                    {
                        listpage[item.phaseid - 1].children.Add(item);
                    }
                }
                //处理需要的列表数据
                bool isend = true;
                for (int i = listpage.Count()-1; i >= 0; i--)
                {
                    if (listpage[i].children.Count() == 0 && isend)
                        listpage.RemoveAt(i);
                    else
                    {
                        isend = false;
                        continue;
                    }
                }                
            }
            return listpage;
        }

        //获取流程暂存信息
        public string GetParamsWFSAID(string wfsid, string wfdid)
        {
            Entities db = new Entities();
            IQueryable<case_workflowspecificactivitys> list = db.case_workflowspecificactivitys.Where(t => t.wfsid == wfsid && t.wfdid == wfdid);
            string wfsaid = list.OrderByDescending(t => t.wfsaid).FirstOrDefault().wfsaid;            
            string[] arr = new string[] { "2017030613500005", "2017030613500010", "2017030613500014", "2017030613500015", "2017030613500016", "2017030613500017", "2017030613500022", "2017030613500023", "2017030613500027" };
            string[] narr = new string[] { "2017030613500014", "2017030613500015", "2017030613500016" };

            //每个阶段的处理信息
            string[] laspbarr = new string[] { "2017030613500001", "2017030613500002", "2017030613500003", "2017030613500004" };
            string[] dczjbgarr = new string[] { "2017030613500005", "2017030613500007", "2017030613500008", "2017030613500009", "2017030613500006" };
            string[] gzspbarr = new string[] { "2017030613500010", "2017030613500011", "2017030613500012", "2017030613500013" };
            string[] cfjdsarr = new string[] { "2017030613500017", "2017030613500018", "2017030613500019", "2017030613500020" };
            string[] ajjabgarr = new string[] { "2017030613500023", "2017030613500024", "2017030613500025", "2017030613500026" };
            string[] qtspsxarr = new string[] { "2017030613500027", "2017030613500028", "2017030613500029", "2017030613500030" };
            int? ddid = laspbarr.Contains(wfdid) ? 9 : dczjbgarr.Contains(wfdid) ? 13 : gzspbarr.Contains(wfdid) ? 14 : cfjdsarr.Contains(wfdid) ? 15 : ajjabgarr.Contains(wfdid) ? 16 : 17;
            case_workflowspecifics wfsmodel = db.case_workflowspecifics.FirstOrDefault(t => t.wfsid == wfsid);
            if (!arr.Contains(wfdid) || (arr.Contains(wfdid) && list.Count() > 1 && !narr.Contains(wfdid)))
            {
                List<case_workflowspecificactivitys> htlist = db.case_workflowspecificactivitys.OrderByDescending(t => t.wfsaid).Where(t => t.wfsid == wfsid).ToList();
                bool lc05 = (wfdid == "2017030613500004" && htlist.FirstOrDefault(t => t.wfdid == "2017030613500005") != null);
                bool lc10 = (wfdid == "2017030613500009" && htlist.FirstOrDefault(t => t.wfdid == "2017030613500010") != null);
                bool lc14 = (wfdid == "2017030613500013" && htlist.FirstOrDefault(t => t.wfdid == "2017030613500014") != null);
                if (wfdid == "2017030613500010" && htlist[1].wfdid == "2017030613500010" && htlist[2].wfdid == "2017030613500030")//局领导相关事项审核同意到执法队员提出事先告知处理意见,30到10
                {
                    ddid = 14;
                }
                else if (lc05 || lc10 || lc14)//5到4到5,10到9到10,14到13到14
                {
                    ddid = lc05 ? 9 : lc10 ? 13 : 14;
                }
                doc_wfsas dwmodel = db.doc_wfsas.FirstOrDefault(t => t.ddid == ddid && t.filetyoe == 3 && t.status == 0 && t.caseid == wfsmodel.caseid);
                if (dwmodel != null)
                {
                    dwmodel.status = 1;
                }
                db.SaveChanges();

            }
            if (wfdid == "2017030613500013" && list.Count() > 1)//回退到分管局领导审核事先告知处理意见
            {
                doc_wfsas dwmodel = db.doc_wfsas.FirstOrDefault(t => t.filetyoe == 3 && t.caseid == wfsmodel.caseid && t.ddid == 14 && t.status == 0);
                if (dwmodel != null)
                {
                    dwmodel.status = 1;
                }
                db.SaveChanges();
            }

            return wfsaid;
        }

        //获取流程暂存信息
        public Doc_WfsasModel GetFlowSaveInfo(string wfsaid, int type)
        {
            Entities db = new Entities();
            Doc_WfsasModel model = new Doc_WfsasModel();
            if (type == 0)
            {
                model = (from a in db.doc_wfsas
                         where a.wfsaid == wfsaid
                         orderby a.dwfsasid descending
                         select new Doc_WfsasModel
                         {
                             dwfsasid = a.dwfsasid,
                             wfsaid = a.wfsaid,
                             ddid = a.ddid,
                             filetyoe = a.filetyoe,
                             filename = a.filename,
                             createuserid = a.createuserid,
                             caseid = a.caseid,
                             ddtablename = a.ddtablename,
                             ddtableid = a.ddtableid,
                             status = a.status,
                             dcjg = a.dcjg,
                             wfss = a.wfss,
                             ajdx = a.ajdx,
                             ajdxremark = a.ajdxremark,
                             jyaq = a.jyaq,
                             xzcftype = a.xzcftype,
                             xzcfje = a.xzcfje,
                             xzcfnr = a.xzcfnr,
                             xzcffs = a.xzcffs,
                             tzjgsm = a.tzjgsm,
                             tzclr = a.tzclr,
                             tzcltime = a.tzcltime,
                             xzcfbgbz = a.xzcfbgbz,
                             xzcfbgclr = a.xzcfbgclr,
                             xzcfbgcltime = a.xzcfbgcltime,
                             dsrreplay = a.dsrreplay,
                             dsryj = a.dsryj,
                             cssbtime = a.cssbtime,
                             sdremark = a.sdremark,
                             dsrzxfs = a.dsrzxfs,
                             sfyj = a.sfyj,
                             yjdw = a.yjdw,
                             yjtime = a.yjtime,
                         }).FirstOrDefault();
            }
            else
            {
                model = (from a in db.doc_wfsas
                         where a.wfsaid == wfsaid && a.filetyoe == type
                         select new Doc_WfsasModel
                         {
                             dwfsasid = a.dwfsasid,
                             wfsaid = a.wfsaid,
                             ddid = a.ddid,
                             filetyoe = a.filetyoe,
                             filename = a.filename,
                             createuserid = a.createuserid,
                             caseid = a.caseid,
                             ddtablename = a.ddtablename,
                             ddtableid = a.ddtableid,
                             status = a.status,
                             dcjg = a.dcjg,
                             wfss = a.wfss,
                             ajdx = a.ajdx,
                             ajdxremark = a.ajdxremark,
                             jyaq = a.jyaq,
                             dsrreplay = a.dsrreplay,
                             dsryj = a.dsryj,
                             cssbtime = a.cssbtime,
                             sdremark = a.sdremark,
                             dsrzxfs = a.dsrzxfs,
                             sfyj = a.sfyj,
                             yjdw = a.yjdw,
                             yjtime = a.yjtime,
                         }).FirstOrDefault();
            }
            return model;
        }

        //修改流程暂存信息
        public int UpdateFlowSaveInfo(Doc_WfsasModel dwmodel)
        {
            Entities db = new Entities();
            doc_wfsas model = db.doc_wfsas.FirstOrDefault(a => a.dwfsasid == dwmodel.dwfsasid);
            model.dcjg = dwmodel.dcjg;
            model.wfss = dwmodel.wfss;
            model.ajdx = dwmodel.ajdx;
            model.jyaq = dwmodel.jyaq;
            model.dsrreplay = dwmodel.dsrreplay;
            model.dsryj = dwmodel.dsryj;
            model.cssbtime = dwmodel.cssbtime;
            model.sdremark = dwmodel.sdremark;
            model.dsrzxfs = dwmodel.dsrzxfs;
            model.sfyj = dwmodel.sfyj;
            model.yjdw = dwmodel.yjdw;
            model.yjtime = dwmodel.yjtime;
            return db.SaveChanges();
        }

        //文书编辑
        public Doc_WfsasModel EditDoc(int dwfsasid)
        {
            Entities db = new Entities();
            Doc_WfsasModel model = db.doc_wfsas.Where(a => a.dwfsasid == dwfsasid).Select(t =>
            new Doc_WfsasModel
            {
                dwfsasid = t.dwfsasid,
                wfsaid = t.wfsaid,
                ddid = t.ddid,
                filetyoe = t.filetyoe,
                filename = t.filename,
                filepath = t.filepath,
                createuserid = t.createuserid,
                createtime = t.createtime,
                caseid = t.caseid,
                ddtablename = t.ddtablename,
                ddtableid = t.ddtableid,
                documentid = t.documentid,
                status = 0,
                dcjg = t.dcjg,
                wfss = t.wfss,
                ajdx = t.ajdx,
                jyaq = t.jyaq,
                xzcfje = t.xzcfje,
                xzcfnr = t.xzcfnr,
                xzcffs = t.xzcffs,
                dsrreplay = t.dsrreplay,
                dsryj = t.dsryj,
                cssbtime = t.cssbtime,
                tzjgsm = t.tzjgsm,
                tzclr = t.tzclr,
                tzcltime = t.tzcltime,
                xzcfbgbz = t.xzcfbgbz,
                xzcfbgclr = t.xzcfbgclr,
                xzcfbgcltime = t.xzcfbgcltime,
                sdremark = t.sdremark,
                dsrzxfs = t.dsrzxfs,
                sfyj = t.sfyj,
                yjdw = t.yjdw,
                yjtime = t.yjtime
            }).FirstOrDefault();

            return model;
        }

        //添加文书附件
        public int AddDocumentFiles(DocumentFileModel model)
        {
            Entities db = new Entities();
            temp_files tfmodel = new temp_files();
            tfmodel.documentid = model.documentid;
            tfmodel.documenttype = model.documenttype;
            tfmodel.filename = model.filename;
            tfmodel.filepath = model.filepath;
            tfmodel.filetype = model.filetype;
            tfmodel.filesize = model.filesize;
            db.temp_files.Add(tfmodel);

            return db.SaveChanges();
        }

        //获取文书附件
        public List<DocumentFileModel> GetDocumentFiles(int id, string type)
        {
            Entities db = new Entities();
            List<DocumentFileModel> list = db.temp_files.Where(t => t.documentid == id && t.documenttype == type).Select(t => new DocumentFileModel
            {
                id = t.id,
                documentid = t.documentid,
                documenttype = t.documenttype,
                filename = t.filename,
                filepath = t.filepath,
                filetype = t.filetype,
                filesize = t.filesize,
                remark = t.remark
            }).ToList();

            return list;
        }

        //修改流程暂存信息
        public int UpdateCaseInfo(Case_CasesModel model)
        {
            Entities db = new Entities();
            case_cases casemodel = db.case_cases.FirstOrDefault(a => a.caseid == model.caseid);

            casemodel.casebh = model.casebh;
            casemodel.casetypeid = model.casetypeid;
            casemodel.casesourceid = model.casesourceid;
            casemodel.casename = model.casename;
            casemodel.qlsxid = model.qlsxid;
            casemodel.qlsx = model.qlsx;
            casemodel.casereason = model.casereason;
            casemodel.fromcasesource = model.fromcasesource;
            casemodel.caseaddress = model.caseaddress;
            casemodel.sitedatetime = model.sitedatetime;
            casemodel.geographical84 = model.geographical84;
            casemodel.geographical2000 = model.geographical2000;
            casemodel.persontype = model.persontype;
            casemodel.p_name = model.p_name;
            casemodel.p_sex = model.p_sex;
            casemodel.p_cardtype = model.p_cardtype;
            casemodel.p_cardnum = model.p_cardnum;
            casemodel.f_name = model.f_name;
            casemodel.f_dbr = model.f_dbr;
            casemodel.f_cardtype = model.f_cardtype;
            casemodel.f_card = model.f_card;
            casemodel.f_wtr = model.f_wtr;
            casemodel.f_cardnum = model.f_cardnum;
            casemodel.contactphone = model.contactphone;
            casemodel.contactaddress = model.contactaddress;
            casemodel.flfg = model.flfg;
            casemodel.clyj = model.clyj;
            casemodel.wfqx = model.wfqx;
            casemodel.cf = model.cf;
            casemodel.zdmj = model.zdmj;
            casemodel.gdmj = model.gdmj;
            casemodel.ghjzmj = model.ghjzmj;
            casemodel.gtjzmj = model.gtjzmj;
            casemodel.casecontent = model.casecontent;
            casemodel.createuserid = model.createuserid;
            casemodel.sszd = model.sszd;
            casemodel.ssxbzd = model.ssxbzd;
            casemodel.zbuserid = model.zbuserid;
            casemodel.xbuserid = model.xbuserid;
            casemodel.issave = model.issave;

            return db.SaveChanges();
        }

        //修改流程暂存信息
        public int UpdateCaseStatus(string wfsid, string status)
        {
            Entities db = new Entities();
            case_workflowspecifics model = db.case_workflowspecifics.FirstOrDefault(a => a.wfsid == wfsid);
            if (model != null)
            {
                model.casemode = status;
                return db.SaveChanges();
            }
            else
                return 0;
        }

        //修改暂存流程表信息
        public int UpdateCaseWFS(string wfsid, Case_CasesModel model)
        {
            Entities db = new Entities();
            case_workflowspecifics cwmodel = db.case_workflowspecifics.FirstOrDefault(a => a.wfsid == wfsid);
            if (model != null)
            {
                cwmodel.casesourceid = Convert.ToInt32(model.casesourceid);
                cwmodel.casereason = model.casereason;
                cwmodel.contact = model.p_name == null ? model.f_name : model.p_name;
                cwmodel.contactphone = model.contactphone;
                cwmodel.address = model.caseaddress;
                cwmodel.casetypeid = model.casetypeid;
                cwmodel.casebh = model.casebh;

                return db.SaveChanges();
            }
            else
                return 0;
        }

        //修改流程暂存信息
        public int UpdateCaseReportDocStatus(string wfsid, string wfsaid)
        {
            Entities db = new Entities();
            case_workflowspecifics model = db.case_workflowspecifics.FirstOrDefault(a => a.wfsid == wfsid);
            if (model != null)
            {
                List<doc_wfsas> list = db.doc_wfsas.Where(t => t.wfsaid == model.currentwfsaid && t.status == 0).ToList();
                foreach (var item in list)
                {
                    item.wfsaid = wfsaid;
                }
                return db.SaveChanges();
            }
            else
                return 0;
        }

        //暂存的一般案件上报
        public Case_CasesModel GetSaveCommonCase(int? caseid, int? issave=null)
        {
            Entities db = new Entities();
            Case_CasesModel casemodel = new Case_CasesModel();
            if (issave != null)
            {
                casemodel = (from model in db.case_cases

                             join u1 in db.base_users
                             on model.zbuserid equals u1.id
                             join u2 in db.base_users
                             on model.xbuserid equals u2.id

                             join dw in db.doc_wfsas
                             on new { a1 = model.caseid, b1 = "case_cases" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into temp
                             from dw1 in temp.DefaultIfEmpty()

                             join wfsa in db.case_workflowspecificactivitys
                             on dw1.wfsaid equals wfsa.wfsaid into tempWfsa
                             from wfsa1 in tempWfsa.DefaultIfEmpty()

                             join wfs in db.case_workflowspecifics
                             on wfsa1.wfsid equals wfs.wfsid into tempWfs
                             from wfs1 in tempWfs.DefaultIfEmpty()

                             where model.issave == issave && model.caseid == caseid
                             select new Case_CasesModel
                             {
                                 caseid = model.caseid,
                                 casebh = model.casebh,
                                 casetypeid = model.casetypeid,
                                 casesourceid = model.casesourceid,
                                 casename = model.casename,
                                 qlsxid = model.qlsxid,
                                 qlsx = model.qlsx,
                                 casereason = model.casereason,                                 
                                 fromcasesource = model.fromcasesource,
                                 caseaddress = model.caseaddress,
                                 sitedatetime = model.sitedatetime,
                                 geographical84 = model.geographical84,
                                 persontype = model.persontype,
                                 p_name = model.p_name,
                                 p_sex = model.p_sex,
                                 p_cardtype = model.p_cardtype,
                                 p_cardnum = model.p_cardnum,
                                 f_name = model.f_name,
                                 f_dbr = model.f_dbr,
                                 f_cardtype = model.f_cardtype,
                                 f_card = model.f_card,
                                 f_wtr = model.f_wtr,
                                 f_cardnum = model.f_cardnum,
                                 contactphone = model.contactphone,
                                 contactaddress = model.contactaddress,
                                 flfg = model.flfg,
                                 clyj = model.clyj,
                                 wfqx = model.wfqx,
                                 cf = model.cf,
                                 zdmj = model.zdmj,
                                 gdmj = model.gdmj,
                                 ghjzmj = model.ghjzmj,
                                 gtjzmj = model.gtjzmj,
                                 casecontent = model.casecontent,
                                 createtime = DateTime.Now,
                                 createuserid = model.createuserid,
                                 zbuserid = model.zbuserid,
                                 zbusername = u1.displayname,
                                 sszd = model.sszd,
                                 ssxbzd = model.ssxbzd,
                                 xbusername = u2.displayname,
                                 xbuserid = model.xbuserid,
                                 wfsaid = dw1.wfsaid,
                                 dwfsasid = dw1.dwfsasid,
                                 wfsid = wfsa1.wfsid,
                                 lastdealtime = wfsa1.dealtime,
                                 tzcsid = (int)model.tzcsid,
                                 cswfsid = wfs1.cswfsid,
                                 issave = model.issave
                             }).FirstOrDefault();
            }
            else
            {
                casemodel = (from model in db.case_cases
                             where model.caseid == caseid
                             select new Case_CasesModel
                             {
                                 caseid = model.caseid,
                                 casebh = model.casebh,
                                 casename = model.casename,
                                 qlsxid = model.qlsxid,
                                 qlsx = model.qlsx,
                                 casereason = model.casereason, 
                                 persontype = model.persontype,
                                 p_name = model.p_name,
                                 p_sex = model.p_sex,
                                 f_name = model.f_name,
                                 f_dbr = model.f_dbr,
                                 f_cardtype = model.f_cardtype,
                                 f_card = model.f_card,
                                 contactaddress = model.contactaddress
                             }).FirstOrDefault();
            }

            return casemodel;
        }

        /// <summary>
        /// 获取文书下的案由编号
        /// </summary>
        /// <returns></returns>
        public Case_CasesModel GetCaseReasonNumber(int? caseid, string tablename)
        {
            Entities db = new Entities();
            Case_CasesModel model = new Case_CasesModel();
            if (tablename == "case_cases")
            {
                model = (from cc in db.case_cases
                         where cc.caseid == caseid
                         select new Case_CasesModel
                         {
                             caseid = cc.caseid,
                             casebh = cc.casebh,
                             casename = cc.casename,
                             qlsxid = cc.qlsxid,
                             qlsx = cc.qlsx,
                             casereason = cc.casereason,
                             persontype = cc.persontype,
                             p_name = cc.p_name,
                             p_sex = cc.p_sex,
                             f_name = cc.f_name,
                             f_dbr = cc.f_dbr,
                             f_cardtype = cc.f_cardtype,
                             f_card = cc.f_card,
                             contactphone = cc.contactphone,
                             contactaddress = cc.contactaddress
                         }).FirstOrDefault();
            }
            else {
                model = (from cs in db.case_simplecases
                         where cs.simpleid == caseid
                         select new Case_CasesModel
                         {
                             caseid = cs.simpleid,
                             casebh = cs.cfjdsbh,
                             casename = cs.casename,
                             qlsxid = cs.qlsxid,
                             qlsx = cs.qlsx,
                             casereason = cs.casereason,
                             persontype = cs.persontype,
                             p_name = cs.p_name,
                             p_sex = cs.p_sex,
                             f_name = cs.f_name,
                             f_dbr = cs.f_dbr,
                             f_cardtype = cs.f_cardtype,
                             f_card = cs.f_card,
                             contactphone = cs.contactphone,
                             contactaddress = cs.contactaddress
                         }).FirstOrDefault();
            }

            return model;
        }

        /// <summary>
        /// 根据wfsid获取流程活动环节数量
        /// </summary>
        /// <returns></returns>
        public int? GetWFSANumber(string wfsid)
        {
            Entities db = new Entities();
            int? count = db.case_workflowspecificactivitys.Where(t => t.wfsid == wfsid).Count();

            return count;
        }

        /// <summary>
        /// 修改回退暂存相关信息
        /// </summary>
        /// <returns></returns>
        public void UpdateZCAllWFS(string wfsid, string casemode, int? issave, string wfsaid = null)
        {
            Entities db = new Entities();

            case_workflowspecifics wfsmodel = db.case_workflowspecifics.FirstOrDefault(t => t.wfsid == wfsid);
            int? caseid = wfsmodel.caseid;
            wfsmodel.casemode = casemode;
            db.SaveChanges();

            case_cases ccmodel = db.case_cases.FirstOrDefault(t => t.caseid == caseid);
            ccmodel.issave = issave;
            db.SaveChanges();

            Case_CasesModel ccmmodel = GetSaveCommonCase(caseid, 1);
            if (wfsaid != null && ccmmodel != null && ccmmodel.wfsaid != null)
            {
                doc_wfsas dwmodel = db.doc_wfsas.FirstOrDefault(t => t.wfsaid == ccmmodel.wfsaid && t.filetyoe == 4);
                dwmodel.wfsaid = wfsaid;
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 根据WFSID获取一般案件基础表信息
        /// </summary>
        /// <returns></returns>
        public Case_CasesModel GetCaseInfoByWFSID(string wfsid)
        {
            Entities db = new Entities();
            int? caseid = db.case_workflowspecifics.FirstOrDefault(t => t.wfsid == wfsid).caseid;
            Case_CasesModel ccmodel = (from model in db.case_cases
                                       join u1 in db.base_users
                                       on model.zbuserid equals u1.id
                                       join u2 in db.base_users
                                       on model.xbuserid equals u2.id
                                       where model.caseid == caseid
                                       select new Case_CasesModel
                                        {
                                            caseid = model.caseid,
                                            casebh = model.casebh,
                                            casetypeid = model.casetypeid,
                                            casesourceid = model.casesourceid,
                                            casename = model.casename,
                                            qlsxid = model.qlsxid,
                                            qlsx = model.qlsx,
                                            casereason = model.casereason,
                                            fromcasesource = model.fromcasesource,
                                            caseaddress = model.caseaddress,
                                            sitedatetime = model.sitedatetime,
                                            geographical84 = model.geographical84,
                                            persontype = model.persontype,
                                            p_name = model.p_name,
                                            p_sex = model.p_sex,
                                            p_cardtype = model.p_cardtype,
                                            p_cardnum = model.p_cardnum,
                                            f_name = model.f_name,
                                            f_dbr = model.f_dbr,
                                            f_cardtype = model.f_cardtype,
                                            f_card = model.f_card,
                                            f_wtr = model.f_wtr,
                                            f_cardnum = model.f_cardnum,
                                            contactphone = model.contactphone,
                                            contactaddress = model.contactaddress,
                                            flfg = model.flfg,
                                            clyj = model.clyj,
                                            wfqx = model.wfqx,
                                            cf = model.cf,
                                            zdmj = model.zdmj,
                                            gdmj = model.gdmj,
                                            ghjzmj = model.ghjzmj,
                                            gtjzmj = model.gtjzmj,
                                            casecontent = model.casecontent,
                                            createtime = DateTime.Now,
                                            createuserid = model.createuserid,
                                            zbuserid = model.zbuserid,
                                            zbusername = u1.displayname,
                                            sszd = model.sszd,
                                            ssxbzd = model.ssxbzd,
                                            xbusername = u2.displayname,
                                            xbuserid = model.xbuserid,
                                            tzcsid = (int)model.tzcsid,
                                            issave = model.issave
                                        }).FirstOrDefault();

            return ccmodel;
        }

        /// <summary>
        /// 结束所有wfsu用户的未处理
        /// </summary>
        /// <returns></returns>
        public int OverAllWFSU(string wfsaid)
        {
            Entities db = new Entities();
            IQueryable<case_workflowspecificusers> list = db.case_workflowspecificusers.Where(t => t.wfsaid == wfsaid);
            foreach (var item in list)
            {
                item.status = 2;
            }

            return db.SaveChanges();
        }

        /// <summary>
        /// 一般事件全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<CaseList> GetAllCaseListApi(List<Filter> filters, int start, int limit)
        {
            List<CaseList> list = new List<CaseList>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select wfs.caseid,wfs.wfid,wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime  from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         where wfs.casetype=2 or wfs.casetype=3 and  wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc");
                IEnumerable<CaseList> query = db.Database.SqlQuery<CaseList>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {

                    }
                }
                list = query.Where(a => a.casetype == 2 || a.casetype == 3).Skip(start).Take(limit).ToList();
                return list;
            }
        }

        /// <summary>
        /// 一般事件全部数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public int GetAllCaseCountApi(List<Filter> filters)
        {
            List<CaseList> list = new List<CaseList>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select wfs.caseid,wfs.wfid,wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime  from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         where  wfs.casetype=2 or wfs.casetype=3 and  wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc");
                IEnumerable<CaseList> query = db.Database.SqlQuery<CaseList>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {

                    }
                }
                query = query.Where(a => a.casetype == 2 || a.casetype == 3);
                return query.Count();

            }
        }



        public CaseCount GetCaseCount(int type)
        {
            CaseCount model = new CaseCount();
            DateTime time = DateTime.Now;

            DateTime starttime = Convert.ToDateTime("0001-01-01");
            DateTime endtime = Convert.ToDateTime("0001-01-01");
            if (type == 1)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                endtime = starttime.AddDays(1);
            }
            else if (type == 2)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-01"));
                endtime = starttime.AddMonths(1);
            }
            else if (type == 3)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-01-01"));
                endtime = starttime.AddYears(1);
            }


            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select a.wfsid,a.casetype,a.wfsname,b.wfdid,b.etime ,a.createtime
from case_workflowspecifics a 
left join case_workflowspecificactivitys b on a.wfsid=b.wfsid and b.`status`=1
where  a.casetype=2");
                IEnumerable<CaseLbModel> queryable = db.Database.SqlQuery<CaseLbModel>(sql);
                queryable = queryable.Where(a => a.createtime > starttime && a.createtime < endtime);
                model.id = "1";
                model.name = "一般案件";
                model.count = queryable.Count();
                model.complete = queryable.Where(a => a.wfsname == "结案").Count();
                model.kept = queryable.Where(a => a.etime < time).Count();
            }
            return model;
        }

        /// <summary>
        /// 根据部门获取立案审批表序号
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public string GetCaseDocumentNumberByUnitId(int unitid)
        {
            using (Entities db = new Entities()) 
            {
                int? parentid = db.base_units.FirstOrDefault(t => t.id == unitid).parentid;
                int? realunitid = parentid == 2?unitid:parentid;

                int year = DateTime.Now.Year;
                int count = 1;
                case_cases model = db.case_cases.OrderByDescending(t => t.caseid).FirstOrDefault(t => t.sszd == realunitid && t.createtime.Year == year);
                if (model != null)
                {
                    string casebh = model.casebh;
                    string numberstr = casebh.Split('-')[1];
                    count = Convert.ToInt32(numberstr.Substring(0, numberstr.Length - 1)) + 1;
                }
                string countstr = count.ToString("000");
                int unitcount = realunitid == 10 ? 1 : realunitid == 11 ? 2 : realunitid == 13 ? 3 : realunitid == 14 ? 4 : realunitid == 15 ? 5 : realunitid == 16 ? 6 : realunitid == 17 ? 7 : 0;

                return "秀综执立[" + year + "]第" + unitcount + "-" + countstr + "号";
            }
        }

        /// <summary>
        /// 案件文书编号是否重复
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public bool CaseDocumentNumberEQ(string wsbh)
        {
            using (Entities db = new Entities())
            {
                case_cases model = db.case_cases.FirstOrDefault(t => t.casebh == wsbh);

                return model == null ? false : true;
            }
        }

        /// <summary>
        /// 获取对接过来的案由数据
        /// </summary>
        /// <returns></returns>
        public Paging<List<InheritCaseSourceModel>> GetInheritCaseSource(string powername = null)
        {
            EntitiesORCL db = new EntitiesORCL();
            Paging<List<InheritCaseSourceModel>> paging = new Paging<List<InheritCaseSourceModel>>();
            string sql = string.Format(@"select power2.powerid,power2.code,power2.powername,law2.name as flfg,law2.content as clyj,                 standard2.wfqx,standardp2.result as cf from (select power.*, row_number() over(partition by power.powerid order by power.DATAVERVISON desc ) rn1
            from fds_power power) power2 
            left join (select law.*, row_number() over(partition by law.powerid order by law.DATAVERVISON desc ) rn2 
            from fds_law law) law2 on power2.powerid = law2.powerid and rn2=1
            left join (select standard.*, row_number() over(partition by standard.lawid order by standard.DATAVERVISON desc ) rn3
            from fds_standard standard) standard2 on law2.lawid = standard2.lawid  and rn3=1
            left join (select standardp.*, row_number() over(partition by standardp.standardid order by standardp.DATAVERVISON desc ) rn4
            from fds_standard_punish standardp) standardp2 on standard2.standardid = standardp2.standardid and rn4=1
            where rn1=1");
            IEnumerable<InheritCaseSourceModel> list = db.Database.SqlQuery<InheritCaseSourceModel>(sql);

            paging.Total = list.Count();
            if (!string.IsNullOrEmpty(powername))
            {
                list = list.Where(t => t.powername.Contains(powername));
            }
            paging.Items = list.ToList();

            return paging;
        }

        /// <summary>
        /// 一般案件当天全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<CaseList> GetDateAllCaseListApi(List<Filter> filters, int start, int limit)
        {
            List<CaseList> list = new List<CaseList>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {
                string ybsql = string.Format(@"select wfs.caseid,wfs.wfid,wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,
cc.casename as casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,bunit.path
                         from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         LEFT JOIN case_cases cc on wfs.caseid = cc.caseid
                         LEFT JOIN base_users buser on cc.zbuserid =buser.id
                         LEFT JOIN base_units bunit on buser.unitid = bunit.id
                         where (wfs.casemode is null or wfs.casemode =1 or wfs.casemode =3) and wfs.createtime>=str_to_date('{0}','%Y/%m/%d') and wfs.createtime < str_to_date('{1}','%Y/%m/%d') and  wfs.casetype=2 and  wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc", dt1, dt2);
                IEnumerable<CaseList> ybquery = db.Database.SqlQuery<CaseList>(ybsql);
                string jysql = string.Format(@"select wfs.caseid,wfs.wfid,wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,cc.casename as casereason,wfs.contact,
wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime  ,bunit.path
                         from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         LEFT JOIN case_simplecases cc on wfs.caseid = cc.simpleid
                         left join base_users buser on wfs.createuserid = buser.id
left join base_units bunit on buser.unitid = bunit.id
                         where wfs.createtime>=str_to_date('{0}','%Y/%m/%d') and wfs.createtime < str_to_date('{1}','%Y/%m/%d') and  wfs.casetype=3 and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc", dt1, dt2);
                IEnumerable<CaseList> jyquery = db.Database.SqlQuery<CaseList>(jysql);
                if (ybquery.Count() != 0)
                    list.AddRange(ybquery);
                if (jyquery.Count() != 0)
                    list.AddRange(jyquery);


                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casename":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.casename.Contains(value)).ToList();
                                break;
                            case "casesourceid":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.casesourceid == id).ToList();
                                }
                                break;
                            case "casetype":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.casetype == id).ToList();
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int id = Convert.ToInt32(value);
                                    string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                    list = list.Where(t => t.path != null && t.path.Contains(path)).ToList();

                                }
                                break;
                        }
                    }
                }
                list = list.Skip(start).Take(limit).ToList();
                return list;
            }
        }

        /// <summary>
        /// 一般事件全部数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public int GetDateAllCaseCountApi(List<Filter> filters)
        {
            List<CaseList> list = new List<CaseList>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {
                string ybsql = string.Format(@"select wfs.caseid,wfs.wfid,wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,
wfs.casereason,wfs.contact,wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime,bunit.path
                         from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         LEFT JOIN case_cases cc on wfs.caseid = cc.caseid
                         LEFT JOIN base_users buser on cc.zbuserid =buser.id
                         LEFT JOIN base_units bunit on buser.unitid = bunit.id
                         where (wfs.casemode is null or wfs.casemode =1 or wfs.casemode =3) and wfs.createtime>=str_to_date('{0}','%Y/%m/%d') and wfs.createtime < str_to_date('{1}','%Y/%m/%d') and  wfs.casetype=2 and  wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc", dt1, dt2);
                IEnumerable<CaseList> ybquery = db.Database.SqlQuery<CaseList>(ybsql);
                string jysql = string.Format(@"select wfs.caseid,wfs.wfid,wfsa.wfsaid,wfs.wfsid,wfs.wfsname,wfs.currentwfsaid,wfs.filestatus,wfs.casetype,wfs.casesourceid,wfs.casereason,wfs.contact,
wfs.contactphone,wfs.address,wfs.casebh,wfs.casetypeid,wfs.createtime,cs.sourcename ,wfsa.wfdid,wfsa.dealtime  ,bunit.path
                         from case_workflowspecifics wfs
                         inner join case_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join case_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         LEFT JOIN case_sources cs on wfs.casesourceid=cs.sourceid
                         left join base_users buser on wfs.createuserid = buser.id
left join base_units bunit on buser.unitid = bunit.id
                         where wfs.createtime>=str_to_date('{0}','%Y/%m/%d') and wfs.createtime < str_to_date('{1}','%Y/%m/%d') and  wfs.casetype=3 and wfs.wfsid in (
                           select wfsid from case_workflowspecificactivitys where wfsaid in (
                             select wfsaid from case_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc", dt1, dt2);
                IEnumerable<CaseList> jyquery = db.Database.SqlQuery<CaseList>(jysql);
                if (ybquery.Count() != 0)
                    list.AddRange(ybquery);
                if (jyquery.Count() != 0)
                    list.AddRange(jyquery);


                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.casereason.Contains(value)).ToList();
                                break;
                            case "casesourceid":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.casesourceid == id).ToList();
                                }
                                break;
                            case "casetype":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.casetype == id).ToList();
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int id = Convert.ToInt32(value);
                                    string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                    list = list.Where(t => t.path != null && t.path.Contains(path)).ToList();

                                }
                                break;
                        }
                    }
                }
                return list.Count();

            }
        }

        /// <summary>
        /// 手机端获取案由相关信息
        /// </summary>
        /// <param name="page"></param>
        /// <param name="count"></param>
        /// <param name="powername"></param>
        /// <returns></returns>
        public Paging<List<InheritCaseSourceModel>> GetInheritCaseSourceAPI(int page, int count, string powername = null)
        {
            EntitiesORCL db = new EntitiesORCL();
            Paging<List<InheritCaseSourceModel>> paging = new Paging<List<InheritCaseSourceModel>>();
            int pagecount = (page - 1) * count;
            string sql = "";
            if (string.IsNullOrEmpty(powername))
            {
                sql = string.Format(@"select * from(select power2.powerid,power2.code,power2.powername,law2.name as flfg,law2.content as clyj,                 standard2.wfqx,standardp2.result as cf,rownum rrnn from (select power.*, row_number() over(partition by power.powerid order by power.DATAVERVISON desc ) rn1
            from fds_power power) power2 
            left join (select law.*, row_number() over(partition by law.powerid order by law.DATAVERVISON desc ) rn2 
            from fds_law law) law2 on power2.powerid = law2.powerid and rn2=1
            left join (select standard.*, row_number() over(partition by standard.lawid order by standard.DATAVERVISON desc ) rn3
            from fds_standard standard) standard2 on law2.lawid = standard2.lawid  and rn3=1
            left join (select standardp.*, row_number() over(partition by standardp.standardid order by standardp.DATAVERVISON desc ) rn4
            from fds_standard_punish standardp) standardp2 on standard2.standardid = standardp2.standardid and rn4=1
            where rn1=1) where rrnn>{0} and rrnn <={1}", pagecount, pagecount + count);
            }
            else
            {
                sql = string.Format(@"select * from (select powerid,code,powername,flfg,clyj,wfqx,cf ,rownum rrnn from(select power2.powerid,power2.code,power2.powername,law2.name as flfg,law2.content as clyj,standard2.wfqx,standardp2.result as cf ,rownum rrnn
            from (select power.*, row_number() over(partition by power.powerid order by power.DATAVERVISON desc ) rn1
            from fds_power power) power2 
            left join (select law.*, row_number() over(partition by law.powerid order by law.DATAVERVISON desc ) rn2 
            from fds_law law) law2 on power2.powerid = law2.powerid and rn2=1
            left join (select standard.*, row_number() over(partition by standard.lawid order by standard.DATAVERVISON desc ) rn3
            from fds_standard standard) standard2 on law2.lawid = standard2.lawid  and rn3=1
            left join (select standardp.*, row_number() over(partition by standardp.standardid order by standardp.DATAVERVISON desc ) rn4
            from fds_standard_punish standardp) standardp2 on standard2.standardid = standardp2.standardid and rn4=1
            where rn1=1) where powername like('%{2}%')) where rrnn >{0} and rrnn<= {1}", pagecount, pagecount + count, powername);
            }
            IEnumerable<InheritCaseSourceModel> list = db.Database.SqlQuery<InheritCaseSourceModel>(sql);

            string totalsql = string.Format(@"select powerid,powername from (select power.*, row_number() over(partition by power.powerid order by power.DATAVERVISON desc ) rn1 from fds_power power) where rn1=1 and powername like('%{0}%')",powername);
            paging.Total = db.Database.SqlQuery<InheritCaseSourceModel>(totalsql).Count();
            paging.Items = list.ToList();
            paging.PageCount = (int)Math.Ceiling((double)paging.Total / (double)count);

            return paging;
        }

    }
}
