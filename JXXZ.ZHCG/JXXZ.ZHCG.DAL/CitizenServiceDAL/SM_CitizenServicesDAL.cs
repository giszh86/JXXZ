using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.DAL.WorkFlowManagerDAL;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.DAL.ConservationDAL;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model.echarts;
using JXXZ.ZHCG.DAL.Enum;
using JXXZ.ZHCG.DAL.MechanicalExaminationDAL;
using Newtonsoft.Json;
using JXXZ.ZHCG.DAL.administrativeapprovalDAL;

namespace JXXZ.ZHCG.DAL.CitizenServiceDAL
{
    public class SM_CitizenServicesDAL
    {


        /// <summary>
        /// 待办事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetCitizenServicesList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,wfw.createuserid as nextuserid,buser.displayname as nextusername,sm.processmode,sm.satisfaction,wwfile.filepath as photo1,sm.isextension,sm.reviewextension,sm.extensiontime,sm.extensioncontent,sm.workflowtype,sm.xzid,sm.pqxzid
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
INNER JOIN wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
INNER JOIN base_users buser on buser.id=wfw.createuserid
LEFT JOIN wf_workflowspecificactivitys www on wfs.wfsid = www.wfsid and www.wfdid='2017021410240010'
LEFT JOIN wf_workflowspecificusers wwfuser on www.wfsaid=wwfuser.wfsaid
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where wfw.userid = {0} and wfw.`status` = {1} and wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", userid, status);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                        }
                    }
                }
                list = list.OrderByDescending(t => t.createtime).Skip(start).Take(limit);
                return list.ToList();
            }

        }

        /// <summary>
        /// 待办数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public int GetCitizenServices(List<Filter> filters, int userid, int status)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,wfw.createuserid as nextuserid,buser.displayname as nextusername,sm.processmode,sm.satisfaction,wwfile.filepath as photo1
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
INNER JOIN wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
INNER JOIN base_users buser on buser.id=wfw.createuserid
LEFT JOIN wf_workflowspecificactivitys www on wfs.wfsid = www.wfsid and www.wfdid='2017021410240010'
LEFT JOIN wf_workflowspecificusers wwfuser on www.wfsaid=wwfuser.wfsaid
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where wfw.userid = {0} and wfw.`status` = {1} and wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers 
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", userid, status);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                        }
                    }
                }

                return list.Count();
            }

        }

        /// <summary>
        /// 已办事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetAlreadyCitizenServicesList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select (
SELECT GROUP_CONCAT(afuser.displayname) from wf_workflowspecificusers afwfsu 
LEFT JOIN base_users afuser on afwfsu.userid = afuser.id
WHERE afwfsu.wfsaid = wfsa1.wfsaid
) nextusername,wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa1.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,wwfile.filepath as photo1,sm.isextension,sm.reviewextension,sm.extensiontime,sm.extensioncontent,sm.workflowtype,sm.xzid,sm.pqxzid
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid
                         LEFT join wf_workflowspecificactivitys wfsa1 on wfs.wfsid=wfsa1.wfsid AND wfs.currentwfsaid = wfsa1.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa1.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
LEFT JOIN wf_workflowspecificusers wwfuser on wfsa.wfsaid=wwfuser.wfsaid
LEFT JOIN wf_workflowspecificusers newwwfuser on wfsa1.wfsaid=newwwfuser.wfsaid
LEFT JOIN base_users newu on newu.id=newwwfuser.userid
inner join wf_workflowspecificactivitys wfsa2 on wfs.wfsid=wfsa2.wfsid and wfsa2.wfdid='2017021410240010'
LEFT JOIN wf_workflowspecificusers wfsal2 on wfsa2.wfsaid = wfsal2.wfsaid 
LEFT join (select wfsuid,filename,filepath from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wfsal2.wfsuid=wwfile.wfsuid
                         where wwfuser.userid = {0} and wwfuser.`status` = {1} and wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", userid, status);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                        }
                    }
                }
                Paging<List<SM_CitizenServicesModel>> result = new Paging<List<SM_CitizenServicesModel>>();
                //list = list.OrderByDescending(t => t.createtime).Skip(start).Take(limit);
                result.Items = list.OrderByDescending(t => t.createtime).Skip(start).Take(limit).ToList();
                result.Total = list.Count();
                return result;
            }

        }

        /// <summary>
        /// 已办数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public int GetAlreadyCitizenServices(List<Filter> filters, int userid, int status)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,wwfile.filepath as photo1
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid 
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
LEFT JOIN wf_workflowspecificusers wwfuser on wfsa.wfsaid=wwfuser.wfsaid
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where wwfuser.userid = {0} and wwfuser.`status` = {1} and wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", userid, status);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                        }
                    }
                }

                return list.Count();
            }

        }




        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetAllCitizenServicesList(List<Filter> filters, int start, int limit, int? XZID = null)
        {
            Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            using (Entities db = new Entities())
            {
                string xzsql = "";
                if (XZID != null)
                    xzsql = " and (sm.xzid LIKE '%" + XZID + "%' or sm.pqxzid like '%" + XZID + "%')";
                else
                    xzsql = "and (sm.xzid is null or (sm.xzid is not NULL AND ('2017021410240001' in (SELECT wfdid from wf_workflowspecificactivitys WHERE wfsid = wfs.wfsid))))";
                string sql = string.Format(@"select * from (select (
SELECT GROUP_CONCAT(afuser.displayname) from wf_workflowspecificusers afwfsu 
LEFT JOIN base_users afuser on afwfsu.userid = afuser.id
WHERE afwfsu.wfsaid = wfsa1.wfsaid
) dbnextusername,newu.displayname as nextusername,ss.spath,wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,wwfile.filepath as photo1,sm.isextension,sm.reviewextension,sm.extensiontime,sm.extensioncontent,bunit.path,wwfuser2.content as suggest,sm.workflowtype,sm.xzid,sm.pqxzid
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         LEFT join wf_workflowspecificactivitys wfsa2 on wfs.wfsid=wfsa2.wfsid AND wfs.currentwfsaid = wfsa2.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
                         INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
                         INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
                         LEFT JOIN wf_workflowspecificactivitys www on wfs.wfsid = www.wfsid and www.wfdid='2017021410240010'
                         LEFT JOIN wf_workflowspecificusers wwfuser on www.wfsaid=wwfuser.wfsaid
                         LEFT JOIN wf_workflowspecificusers newwwfuser on wfsa2.wfsaid=newwwfuser.wfsaid
                         LEFT JOIN base_users newu on newu.id=newwwfuser.userid
                         LEFT JOIN wf_workflowspecificactivitys wfsa1 on wfs.wfsid = wfsa1.wfsid and (wfsa1.wfdid='2017021410240003' or wfsa1.wfdid='2017021410240007')
                         LEFT JOIN wf_workflowspecificusers wwfuser2 ON wfsa1.wfsaid = wwfuser2.wfsaid
                         LEFT JOIN base_users buser on wfsa1.dealuserid = buser.id
                         LEFT JOIN base_units bunit on buser.unitid = bunit.id
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         ) {0}
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", xzsql);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                        list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t =>t.eventaddress !=null&& t.eventaddress.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id!=0)
                                    {
                                        string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                        list = list.Where(t => t.path != null && t.path.Contains(path));
                                    }
                                   
                                }
                                break;
                        }
                    }
                }
                paging.Total = list.Count();
                list = list.OrderByDescending(t => t.createtime).Skip(start).Take(limit);
                paging.Items = list.ToList();

                return paging;
            }

        }

        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetAllCitizenServicesListExcel(List<Filter> filters = null)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select ss.spath,wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,wwfile.filepath as photo1
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
LEFT JOIN wf_workflowspecificactivitys www on wfs.wfsid = www.wfsid and www.wfdid='2017021410240010'
LEFT JOIN wf_workflowspecificusers wwfuser on www.wfsaid=wwfuser.wfsaid
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid");
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventaddress !=null&& t.eventaddress.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                        }
                    }
                }

                list = list.OrderByDescending(t => t.createtime);
                return list.ToList();
            }

        }

        /// <summary>
        /// 全部列表数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetAllCitizenServices(List<Filter> filters)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,wwfile.filepath as photo1,bunit.path
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
LEFT JOIN wf_workflowspecificactivitys www on wfs.wfsid = www.wfsid and www.wfdid='2017021410240010'
LEFT JOIN wf_workflowspecificusers wwfuser on www.wfsaid=wwfuser.wfsaid
 LEFT JOIN wf_workflowspecificactivitys wfsa1 on wfs.wfsid = wfsa1.wfsid and (wfsa1.wfdid='2017021410240003' or wfsa1.wfdid='2017021410240007')
                         LEFT JOIN base_users buser on wfsa1.dealuserid = buser.id
                         LEFT JOIN base_units bunit on buser.unitid = bunit.id
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid");
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                        list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                    {
                                        string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                        list = list.Where(t => t.path != null && t.path.Contains(path));
                                    }
                                }
                                break;
                        }
                    }
                }

                return list.Count();
            }

        }

        /// <summary>
        /// 获取执法事件图片
        /// </summary>
        /// <param name="ZFSJID">执法事件ID</param>
        /// <param name="WFDID">环节ID</param>
        /// <returns></returns>
        public List<FileClass> GetCitizenServicesAttr(string citizenid, string wfdids)
        {
            Entities db = new Entities();
            string[] wfdid = wfdids.Split(',');
            IEnumerable<FileClass> list = null;
            List<FileClass> lists = new List<FileClass>();
            foreach (var item in wfdid)
            {
                string sql = string.Format(@"select wff.fileid,wff.wfsuid,wff.filesize size,wff.FILEPATH OriginalPath,wff.FILEID,wff.FILENAME OriginalName,wff.FILETYPE OriginalType,wfsa.WFDID
from   WF_WORKFLOWSPECIFICS wfs 
left join WF_WORKFLOWSPECIFICACTIVITYS wfsa on wfs.WFSID=wfsa.WFSID
left join WF_WORKFLOWSPECIFICUSERS wfu on wfu.WFSAID=wfsa.WFSAID
left join WF_WORKFLOWSPECIFICUSERFILES wff on wff.WFSUID=wfu.WFSUID
where wfs.TABLENAMEID='{0}' and wfsa.WFDID='{1}' and wff.FILEID is not null ORDER BY wff.wfsuid DESC", citizenid, item);
                list = db.Database.SqlQuery<FileClass>(sql);
                string wfsuid = "";
                foreach (var Modelitem in list.ToList())
                {
                    if (wfsuid == "" || wfsuid == Modelitem.wfsuid)
                    {
                        wfsuid = Modelitem.wfsuid;
                        Modelitem.FilesPath = "CitizenServiceOriginalPath";
                        lists.Add(Modelitem);
                    }
                }
            }


            return lists;
        }


        /// <summary>
        /// 市民事件基础信息列表
        /// </summary>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetEventCitizenServicesList(List<Filter> filters, int start, int limit)
        {
            List<SM_CitizenServicesModel> list = new List<SM_CitizenServicesModel>();

            using (Entities db = new Entities())
            {
                IQueryable<SM_CitizenServicesModel> queryable = from a in db.sm_citizenservices
                                                                join b_json in db.sm_sources on a.sourceid equals b_json.sourceid into temp1
                                                                from b in temp1.DefaultIfEmpty()
                                                                select new SM_CitizenServicesModel
                                                                {
                                                                    citizenid = a.citizenid,
                                                                    eventtitle = a.eventtitle,
                                                                    eventaddress = a.eventaddress,
                                                                    sourcename = b.name,
                                                                    complainant = a.complainant,
                                                                    contactphone = a.contactphone,
                                                                    foundtime = a.foundtime

                                                                };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.eventaddress.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.eventtitle.Contains(value));
                                break;
                            //case "contactphone":
                            //    if (!string.IsNullOrEmpty(value))
                            //        queryable = queryable.Where(t => t.contactphone == value);
                            //    break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == id);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(t => t.foundtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }
        /// <summary>
        /// 市民事件基础信息列表数量
        /// </summary>
        /// <returns></returns>
        public int GetEventCitizenServicesCount(List<Filter> filters)
        {

            using (Entities db = new Entities())
            {
                IQueryable<SM_CitizenServicesModel> queryable = from a in db.sm_citizenservices
                                                                join b_json in db.sm_sources on a.sourceid equals b_json.sourceid into temp1
                                                                from b in temp1.DefaultIfEmpty()
                                                                select new SM_CitizenServicesModel
                                                                {
                                                                    citizenid = a.citizenid,
                                                                    eventaddress = a.eventaddress,
                                                                    sourcename = b.name,
                                                                    complainant = a.complainant,
                                                                    contactphone = a.contactphone,
                                                                    foundtime = a.foundtime

                                                                };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.eventaddress.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.eventtitle.Contains(value));
                                break;
                            //case "contactphone":
                            //    if (!string.IsNullOrEmpty(value))
                            //        queryable = queryable.Where(t => t.contactphone == value);
                            //    break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == id);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }

        }

        /// <summary>
        /// 修改满意度，处理方式
        /// </summary>
        /// <param name="model"></param>
        public void UpdateCitizen(sm_citizenservices model)
        {
            Entities db = new Entities();
            sm_citizenservices zfsj = db.sm_citizenservices.FirstOrDefault(t => t.citizenid == model.citizenid);
            if (zfsj != null)
            {
                zfsj.processmode = model.processmode;
                zfsj.satisfaction = model.satisfaction;
            } db.SaveChanges();
        }

        /// <summary>
        /// 修改满意度，处理方式
        /// </summary>
        /// <param name="model"></param>
        public void UpdateCitizenProcess(sm_citizenservices model)
        {
            Entities db = new Entities();
            sm_citizenservices zfsj = db.sm_citizenservices.FirstOrDefault(t => t.citizenid == model.citizenid);
            if (zfsj != null)
            {
                zfsj.processuserid = model.processuserid;
            } db.SaveChanges();
        }

        /// <summary>
        /// 修改归档时间
        /// </summary>
        /// <param name="model"></param>
        public void UpdateCitizengdsj(sm_citizenservices model)
        {
            Entities db = new Entities();
            sm_citizenservices zfsj = db.sm_citizenservices.FirstOrDefault(t => t.citizenid == model.citizenid);
            if (zfsj != null)
            {
                zfsj.gdsj = model.gdsj;
            } db.SaveChanges();
        }

        /// <summary>
        /// 修改满意度，处理方式
        /// </summary>
        /// <param name="model"></param>
        public void UpdateCitizenOffice(sm_citizenservices model)
        {
            Entities db = new Entities();
            sm_citizenservices zfsj = db.sm_citizenservices.FirstOrDefault(t => t.citizenid == model.citizenid);
            if (zfsj != null)
            {
                zfsj.officeuserid = model.officeuserid;
                zfsj.workflowtype = model.workflowtype;
                zfsj.suggest = model.suggest;
            } db.SaveChanges();
        }

        /// <summary>
        /// 修改派遣乡镇ID
        /// </summary>
        /// <param name="model"></param>
        public void UpdateCitizenpqxz(sm_citizenservices model)
        {
            Entities db = new Entities();
            sm_citizenservices zfsj = db.sm_citizenservices.FirstOrDefault(t => t.citizenid == model.citizenid);
            if (zfsj != null)
            {
                zfsj.pqxzid = model.pqxzid;
            } db.SaveChanges();
        }

        /// <summary>
        /// 编辑市民事件基础信息
        /// </summary>
        /// <returns></returns>
        public int CizitenEventEdit(sm_citizenservices model)
        {
            Entities db = new Entities();
            sm_citizenservices citizenservicesmodel = db.sm_citizenservices.FirstOrDefault(t => t.citizenid == model.citizenid);
            //citizenservicesmodel.sourceid = model.sourceid;
            citizenservicesmodel.dutytime = model.dutytime;
            //citizenservicesmodel.eventid = model.eventid;
            citizenservicesmodel.complainant = model.complainant;
            citizenservicesmodel.cnumber = model.cnumber;
            citizenservicesmodel.foundtime = model.foundtime;
            citizenservicesmodel.contactphone = model.contactphone;
            citizenservicesmodel.contactaddress = model.contactaddress;
            citizenservicesmodel.eventaddress = model.eventaddress;
            citizenservicesmodel.eventtitle = model.eventtitle;
            citizenservicesmodel.eventcontent = model.eventcontent;
            citizenservicesmodel.bigtypeid = model.bigtypeid;
            citizenservicesmodel.smalltypeid = model.smalltypeid;
            citizenservicesmodel.limittime = model.limittime;
            citizenservicesmodel.recorduser = model.recorduser;
            citizenservicesmodel.grometry = model.grometry;

            return db.SaveChanges();
        }

        /// <summary>
        /// 获取上报时的用户活动实例
        /// </summary>
        /// <returns></returns>
        public string GetEditWFSUID(string wfsid)
        {
            Entities db = new Entities();
            string wfsuid = (from wfsa in db.wf_workflowspecificactivitys
                             join wfsu in db.wf_workflowspecificusers
                             on wfsa.wfsaid equals wfsu.wfsaid
                             where wfsa.wfsid == wfsid && wfsa.wfdid == "2017021410240010"
                             select new WF_WorkFlowOldModel
                             {
                                 wfsuid = wfsu.wfsuid
                             }).FirstOrDefault().wfsuid;

            return wfsuid;
        }

        /// <summary>
        /// 添加流程处理前图片
        /// </summary>
        /// <returns></returns>
        public int AddEditPictures(FileClass model)
        {
            Entities db = new Entities();
            wf_workflowspecificuserfiles wfsufile = new wf_workflowspecificuserfiles();
            wfsufile.wfsuid = model.wfsuid;
            wfsufile.filepath = model.OriginalPath;
            wfsufile.filename = model.OriginalName;
            wfsufile.filetype = model.OriginalType;
            wfsufile.filesize = model.size;
            db.wf_workflowspecificuserfiles.Add(wfsufile);

            return db.SaveChanges();
        }

        #region API

        /// <summary>
        /// 获取数量
        /// </summary>
        /// <param name="userid">登录人ID</param>
        /// <returns></returns>
        public QuantityModel Quantity(int userid, string type)
        {
            QuantityModel model = new QuantityModel();
            List<Filter> filters = new List<Filter>();
            //model.UpcomingEventQuantity = GetCitizenServices(filters, userid, 1);
            //model.UpcomingTaskQuantity = new QW_UserTasksDAL().GetNewUserTaskCount(userid);
            //model.UpcomingApprovalQuantity = 0;
            //model.UpcomingCaseQuantity = new Case_CasesDAL().GetCaseList(filters,0,100, userid, 1, "2017030613400001").Total;

            if (type.Contains("7,"))
            {
                model.UpcomingEventQuantity = GetCitizenServices(filters, userid, 1);
                model.UpcomingTaskQuantity = new QW_UserTasksDAL().GetNewUserTaskCount(userid);
                model.UpcomingApprovalQuantity = new ApprovalDAL().GetToBeApprovalList(filters, 0, 10000, userid, 0, false).Total; 
                model.UpcomingCaseQuantity = new Case_CasesDAL().GetCaseList(filters, 0, 10000, userid, 1, "2017030613400001").Total;
            }
            else if (type.Contains("5,"))
            {
                model.UpcomingEventQuantity = GetCitizenServices(filters, userid, 1);
                model.UpcomingCaseQuantity = new Case_CasesDAL().GetCaseList(filters, 0, 10000, userid, 1, "2017030613400001").Total;
            }
            else if (type.Contains("8,"))
            {
                model.UpcomingEventQuantity = GetCitizenServices(filters, userid, 1);
            }

            return model;
        }


        /// <summary>
        /// 获取事件详情
        /// </summary>
        /// <param name="citizenid">事件ID</param>
        /// <returns></returns>
        public SM_CitizenServicesModel GetCitizenServiceModel(string citizenid)
        {
            SM_CitizenServicesModel model = new SM_CitizenServicesModel();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT
	wfs.wfsid,
	wfs.wfsname,
	wfs. STATUS,
	wf.wfid,
	wf.wfname,
	wfsa.wfdid,
	wfd.wfdname,
	wfsa.wfsaid,
  wfsa.dealtime,
	u.id AS userid,
	u.displayname AS username,
	sm.createtime,
	sm.eventtitle,
	sm.sourceid,
	sm.citizenid,
	sm.eventid,
	sm.dutytime,
	sm.complainant,
	sm.cnumber,
	sm.foundtime,
	sm.contactphone,
	sm.contactaddress,
	sm.eventaddress,
	sm.eventcontent,
	sm.bigtypeid,
	sm.smalltypeid,
	sm.limittime,
	sm.recorduser,
	sm.grometry,
	sm.createuserid,
	bu.displayname AS createusername,
	sc.classname AS bigtypename,
	smc.classname AS smalltypename,
	ss. NAME AS sourcename,
	sm.processmode,
	sm.satisfaction,
	sm.processuserid AS nextuserid,
	sm.officeuserid,
	bu_pq.displayname AS pqusername,
	bu_pq.mobile AS pqmobile,
	bun_pq.`name` AS pqunitname,
	sm.processuserid,
	sm.isextension,
	sm.reviewextension,
	sm.extensiontime,
	sm.extensioncontent,
	sm.auditopinion,
	sm.workflowtype,
	sm.suggest,
    wwfuser2.content,
    wwfuser3.content as ldsuggest
FROM
	wf_workflowspecifics wfs
INNER JOIN wf_workflowspecificactivitys wfsa ON wfs.wfsid = wfsa.wfsid
AND wfs.CURRENTWFSAID = wfsa.wfsaid
INNER JOIN wf_workflows wf ON wf.wfid = wfs.wfid
INNER JOIN wf_workflowdetails wfd ON wfsa.wfdid = wfd.wfdid
INNER JOIN sm_citizenservices sm ON wfs.TABLENAMEID = sm.citizenid
INNER JOIN base_users u ON u.id = wfs.createuserid
INNER JOIN base_users bu ON bu.id = sm.createuserid
left JOIN base_users bu_pq ON sm.officeuserid = bu_pq.id
left JOIN base_units bun_pq ON bu_pq.unitid = bun_pq.id
INNER JOIN sm_classes sc ON sm.bigtypeid = sc.classid
INNER JOIN sm_classes smc ON sm.smalltypeid = smc.classid
INNER JOIN sm_sources ss ON ss.sourceid = sm.sourceid
LEFT JOIN wf_workflowspecificactivitys wfsa1 ON wfs.wfsid = wfsa1.wfsid
		AND (
			wfsa1.wfdid = '2017021410240003'
			OR wfsa1.wfdid = '2017021410240007'
		)
		LEFT JOIN wf_workflowspecificusers wwfuser2 ON wfsa1.wfsaid = wwfuser2.wfsaid
LEFT JOIN wf_workflowspecificactivitys wfsa2 ON wfs.wfsid = wfsa2.wfsid and wfsa2.wfdid = '2017021410240008'
LEFT JOIN wf_workflowspecificusers wwfuser3 ON wfsa2.wfsaid = wwfuser3.wfsaid
WHERE
	sm.citizenid = {0}
AND wfs.wfsid IN (
	SELECT
		wfsid
	FROM
		wf_workflowspecificactivitys
	WHERE
		wfsaid IN (
			SELECT
				wfsaid
			FROM
				wf_workflowspecificusers
			WHERE
				STATUS <> 3
		)
)
ORDER BY
	wfsa.createtime DESC", citizenid);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                model = list.FirstOrDefault();
                if (model != null)
                {
                    string wfdid = "2017021410240010,2017021410240003,2017021410240007";
                    model.attachment = GetCitizenServicesAttr(model.citizenid, wfdid);
                    WF_WorkFlowSpecificActivitysDAL wwdal = new WF_WorkFlowSpecificActivitysDAL();
                    model.workflowold = wwdal.GetOldList(model.wfsid);
                    List<WF_WorkFlowLinkOld> wwlist = new WF_WorkFlowSpecificActivitysDAL().GetOldLink(model.wfsid);
                    model.IsSend = 0;
                    foreach (var item in wwlist)
                    {
                        if (item.wfdid == "2017021410240003")
                        {
                            model.IsSend = 1;
                        }else if (item.wfdid == "2017021410240007")
                        {
                            model.IsSend = 2;
                        }
                    }
                }
                else
                {
                    model = new SM_CitizenServicesModel();
                }

            }
            return model;
        }
        #endregion

        /// <summary>
        /// 添加延期申请
        /// </summary>
        /// <param name="citizenid"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public int EditExtension(string citizenid, int day, string extensioncontent)
        {
            using (Entities db = new Entities())
            {
                sm_citizenservices model = db.sm_citizenservices.FirstOrDefault(a => a.citizenid == citizenid);
                if (model != null)
                {
                    model.isextension = 1;
                    model.extensiontime = day;
                    model.extensioncontent = extensioncontent;

                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetAllCitizenServicesReviewList(List<Filter> filters, int start, int limit)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,sm.isextension,sm.reviewextension,sm.extensiontime,sm.extensioncontent
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
                         where sm.isextension=1 and sm.reviewextension is NULL and   wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid");
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                        }
                    }
                }

                List<SM_CitizenServicesModel> lists = new List<SM_CitizenServicesModel>();
                list = list.OrderByDescending(t => t.createtime).Skip(start).Take(limit);
                string wfdid = "2017021410240010,2017021410240003,2017021410240007";
                foreach (var item in list)
                {
                    item.attachment = GetCitizenServicesAttr(item.citizenid, wfdid);
                    lists.Add(item);
                }

                return lists.ToList();
            }

        }

        /// <summary>
        /// 全部列表数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetAllCitizenServicesReviewCount(List<Filter> filters)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,sm.isextension,sm.reviewextension,sm.extensiontime,sm.extensioncontent
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
                         where sm.isextension=1 and sm.reviewextension is NULL and   wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid");
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    list = list.Where(t => t.sourceid == id);
                                }
                                break;
                        }
                    }
                }

                return list.Count();
            }

        }

        /// <summary>
        /// 延期
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditEventReview(SM_CitizenServicesModel model)
        {
            using (Entities db = new Entities())
            {
                sm_citizenservices scmodel = db.sm_citizenservices.FirstOrDefault(a => a.citizenid == model.citizenid);
                if (scmodel != null)
                {
                    scmodel.reviewextension = model.reviewextension;
                    if (model.reviewextension == 1)
                    {
                        scmodel.limittime = scmodel.limittime.AddHours(double.Parse(model.extensiontime.ToString()));
                        scmodel.auditopinion = model.auditopinion;
                    }

                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 根据userid获取今日上报
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetCitizenModel(int userid)
        {
            DateTime time = DateTime.Now.Date;
            List<SM_CitizenServicesModel> list = new List<SM_CitizenServicesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<SM_CitizenServicesModel> queryable = from a in db.sm_citizenservices
                                                                join b_join in db.sm_classes on a.smalltypeid equals b_join.classid into btmp
                                                                from b in btmp.DefaultIfEmpty()
                                                                where a.createtime.Value.Year == time.Year && a.createuserid == userid && a.createtime.Value.Month == time.Month && a.createtime.Value.Day == time.Day
                                                                select new SM_CitizenServicesModel
                                                                {
                                                                    eventid = a.eventid,
                                                                    foundtime = a.foundtime,
                                                                    eventtitle = a.eventtitle,
                                                                    smalltypename = b.classname,
                                                                    eventaddress = a.eventaddress,
                                                                    gdsj = a.gdsj,
                                                                    createtime = a.createtime,
                                                                    createuserid = a.createuserid,
                                                                    isdealwith = ((a.gdsj == null) ? 0 : 1),

                                                                };

                list = queryable.ToList();
                return list;
            }
        }

        /// <summary>
        /// 获取系统生成最大ID
        /// </summary>
        /// <returns></returns>
        public Dictionary<string,int?> GetCitizenAutoID()
        {
            using (Entities db = new Entities())
            {
                Dictionary<string, int?> dic = new Dictionary<string, int?>();
                DateTime dt = DateTime.Now.Date;
                int? dty = DateTime.Now.Year;
                dic.Add("Auto24YearID", db.sm_citizenservices.Where(t => t.dutytime.Year == dty && t.sourceid == 3).Count());
                dic.Add("Auto110YearID", db.sm_citizenservices.Where(t => t.dutytime.Year == dty && t.sourceid == 13).Count());
                dic.Add("AutoHJPGTDayID", db.sm_citizenservices.Where(t => t.dutytime == dt && t.sourceid == 10).Count());
                dic.Add("AutoYJSGZBDayID", db.sm_citizenservices.Where(t => t.dutytime == dt && t.sourceid == 12).Count());
                dic.Add("AutoXCFXDayID", db.sm_citizenservices.Where(t => t.dutytime == dt && t.sourceid == 16).Count());
                dic.Add("AutoQTDayID", db.sm_citizenservices.Where(t => t.dutytime == dt && t.sourceid == 17).Count());
                dic.Add("AutoSPFXDayID", db.sm_citizenservices.Where(t => t.dutytime == dt && t.sourceid == 18).Count());

                return dic;
            }
        }

        /// <summary>
        /// 事件登记编号是否重复
        /// </summary>
        /// <returns></returns>
        public bool IsCitizenRepeat(string eventid)
        {
            using (Entities db = new Entities())
            {
                DateTime dt = DateTime.Now;
                sm_citizenservices model = db.sm_citizenservices.FirstOrDefault(t => t.eventid == eventid);
                if (model != null)
                    return true;
                else
                    return false;
            }
        }

        /// <summary>
        /// 指挥中心处理事件是否完成
        /// </summary>
        /// <returns></returns>
        public bool EventIsHandle(string wfsaid)
        {
            using (Entities db = new Entities())
            {
                int? status = db.wf_workflowspecificactivitys.FirstOrDefault(t => t.wfsaid == wfsaid).status;
                if (status == 1)
                    return true;
                else
                    return false;
            }
        }

        /// <summary>
        /// 获取快速上报的内勤和分组组长
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> GetQuickReportUsers(string wfsid)
        {
            Entities db = new Entities();
            string sql = string.Format(@"SELECT wfsu.userid  as ID,u.displayname,u.phone from wf_workflowspecifics wfs
            LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid = wfsa.wfsid and wfsa.wfdid='2017021410240003'
            LEFT JOIN wf_workflowspecificusers wfsu on wfsa.wfsaid = wfsu.wfsaid 
            LEFT JOIN base_users u on wfsu.userid = u.id
            WHERE wfs.wfsid = {0} GROUP BY wfsu.userid", wfsid);
            List<UserModel> list = db.Database.SqlQuery<UserModel>(sql).ToList();

            Dictionary<string, string> dic = new Dictionary<string, string>();
            int? userid = list[0].ID;
            base_userroles model = db.base_userroles.FirstOrDefault(t => t.userid == userid && t.roleid == 3);
            if (model != null)
            {
                dic.Add("nq", list[0].ID.ToString());
                dic.Add("nqname", list[0].DisplayName);
                dic.Add("nqphone", list[0].phone);
                dic.Add("zz", list[1].ID.ToString());
                dic.Add("zzname", list[1].DisplayName);
                dic.Add("zzphone", list[1].phone);
            }
            else
            {
                dic.Add("nq", list[1].ID.ToString());
                dic.Add("nqname", list[1].DisplayName);
                dic.Add("zzphone", list[1].phone);
                dic.Add("zz", list[0].ID.ToString());
                dic.Add("zzname", list[0].DisplayName);
                dic.Add("nqphone", list[0].phone);
            }

            return dic;
        }

        public List<SM_Count> GetStatisticsBySMSJ(int type)
        {
            List<SM_Count> list = new List<SM_Count>();
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
                string sql = string.Format(@"select count(b.citizenid) as sm_count,MAX(a.sourceid) as Source,MAX(a.`name`) as SourceName  from sm_sources a 
LEFT JOIN sm_citizenservices b on a.sourceid=b.sourceid and b.createtime>=str_to_date('" + starttime + "','%Y/%m/%d %H:%i:%s') and b.createtime <= str_to_date('" + endtime + "','%Y/%m/%d %H:%i:%s') GROUP BY a.sourceid");
                IEnumerable<SM_Count> queryable = db.Database.SqlQuery<SM_Count>(sql);
                queryable = queryable.OrderByDescending(a => a.sm_count).Skip(0).Take(6);
                list = queryable.OrderBy(t => t.Source).ToList();
            }

            return list;
        }

        public int CqEventCount(int type, int date)
        {
            int num = 0;
            DateTime starttime = Convert.ToDateTime("0001-01-01");
            DateTime endtime = Convert.ToDateTime("0001-01-01");
            if (date == 1)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                endtime = starttime.AddDays(1);
            }
            else if (date == 2)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-01"));
                endtime = starttime.AddMonths(1);
            }
            else if (date == 3)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-01-01"));
                endtime = starttime.AddYears(1);
            }

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         sm.createtime,sm.dutytime,
sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.limittime
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         where sm.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and sm.createtime <= str_to_date('{1}','%Y/%m/%d %H:%i:%s') and wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", starttime, endtime);
                IEnumerable<SM_CitizenServicesModel> queryable = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);
                DateTime time = DateTime.Now;
                if (type == 1)
                    num = queryable.Where(a => a.wfdid == "2017021410240006").Count();
                else if (type == 2)
                    num = queryable.Where(a => a.limittime < time && a.wfdid != "2017021410240006").Count();
                else if (type == 0)
                    num = queryable.Count();
            }
            return num;
        }

        /// <summary>
        /// 获取当天最新事件雷达图统计(前台展示)
        /// </summary>
        /// <returns></returns>
        public List<spiderMap> getEventData()
        {
            using (Entities db = new Entities())
            {
                List<spiderMap> raderEventData = new List<spiderMap>();
                List<int> list = new List<int>();

                //当前上报
                DateTime starTime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));

                //巡查发现
                int patrolDiscovery = (int)SMClass.patrolDiscovery;
                int patrolDiscoverycount = db.sm_citizenservices.Where(t => t.sourceid == patrolDiscovery && t.createtime >= starTime).Count();
                list.Add(patrolDiscoverycount);

                //数字城管
                int digitalCityManagement = (int)SMClass.digitalCityManagement;
                int digitalCityManagementcount = db.sm_citizenservices.Where(t => t.sourceid == digitalCityManagement && t.createtime >= starTime).Count();
                list.Add(digitalCityManagementcount);

                //24小时值班
                int allDayWatch = (int)SMClass.allDayWatch;
                int allDayWatchcount = db.sm_citizenservices.Where(t => t.sourceid == allDayWatch && t.createtime >= starTime).Count();
                list.Add(allDayWatchcount);

                //市局96310
                int cityBureau96310 = (int)SMClass.cityBureau96310;
                int cityBureau96310count = db.sm_citizenservices.Where(t => t.sourceid == cityBureau96310 && t.createtime >= starTime).Count();
                list.Add(cityBureau96310count);

                //信访
                int thePetition = (int)SMClass.thePetition;
                int thePetitioncount = db.sm_citizenservices.Where(t => t.sourceid == thePetition && t.createtime >= starTime).Count();
                list.Add(thePetitioncount);

                //市长信箱
                int mayorMailbox = (int)SMClass.mayorMailbox;
                int mayorMailboxcount = db.sm_citizenservices.Where(t => t.sourceid == mayorMailbox && t.createtime >= starTime).Count();
                list.Add(mayorMailboxcount);

                //行风热线
                int goodHotline = (int)SMClass.goodHotline;
                int goodHotlinecount = db.sm_citizenservices.Where(t => t.sourceid == goodHotline && t.createtime >= starTime).Count();
                list.Add(goodHotlinecount);

                //环境曝光台
                int environmentalExposureTable = (int)SMClass.environmentalExposureTable;
                int environmentalExposureTablecount = db.sm_citizenservices.Where(t => t.sourceid == environmentalExposureTable && t.createtime >= starTime).Count();
                list.Add(environmentalExposureTablecount);

                spiderMap raderEvent = new spiderMap();
                raderEvent.name = "事件来源";
                raderEvent.value = list;

                raderEventData.Add(raderEvent);

                return raderEventData;

            }
        }

        /// <summary>
        /// 返回事件7天日期
        /// </summary>
        /// <returns></returns>
        public List<string> GetEventLinelegend()
        {
            List<string> list = new List<string>();
            DateTime startTime = DateTime.Now.AddDays(-7);
            for (int i = 1; i < 8; ++i)
            {
                DateTime nowTime = startTime.AddDays(i);
                list.Add(nowTime.ToString("MM月dd日"));
            }
            return list;
        }

        /// <summary>
        /// 获取已上报事件data
        /// </summary>
        /// <returns></returns>
        public List<int> GetEventLineReportedData()
        {
            Entities db = new Entities();
            List<int> list = new List<int>();
            DateTime startTime = Convert.ToDateTime(DateTime.Now.AddDays(-7).ToString("yyyy-MM-dd"));
            for (int i = 1; i < 8; ++i)
            {
                DateTime nowTime = startTime.AddDays(i);
                DateTime endTime = nowTime.AddDays(1);
                int number = db.sm_citizenservices.Where(t => t.createtime >= nowTime && t.createtime < endTime).Count();
                list.Add(number);
            }
            db.Dispose();
            return list;
        }

        /// <summary>
        /// 处理中事件data
        /// </summary>
        /// <returns></returns>
        public List<int> GetEventLineInProcess()
        {
            Entities db = new Entities();
            List<int> list = new List<int>();
            DateTime startTime = Convert.ToDateTime(DateTime.Now.AddDays(-7).ToString("yyyy-MM-dd"));
            for (int i = 1; i < 8; ++i)
            {
                DateTime nowTime = startTime.AddDays(i);
                DateTime endTime = nowTime.AddDays(1);
                int number = db.sm_citizenservices.Where(t => t.createtime >= nowTime && t.createtime < endTime && t.gdsj.HasValue == false).Count();
                list.Add(number);
            }
            db.Dispose();
            return list;
        }

        /// <summary>
        /// 已完结事件data
        /// </summary>
        /// <returns></returns>
        public List<int> GetEventLineFinished()
        {
            Entities db = new Entities();
            List<int> list = new List<int>();
            DateTime startTime = Convert.ToDateTime(DateTime.Now.AddDays(-7).ToString("yyyy-MM-dd"));
            for (int i = 1; i < 8; ++i)
            {
                DateTime nowTime = startTime.AddDays(i);
                DateTime endTime = nowTime.AddDays(1);
                int number = db.sm_citizenservices.Where(t => t.createtime >= nowTime && t.createtime < endTime && t.gdsj.HasValue == true).Count();
                list.Add(number);
            }
            db.Dispose();
            return list;
        }

        /// <summary>
        /// 获取当天事件
        /// </summary>
        /// <returns></returns>
        public List<JXXZ.ZHCG.Model.CitizenServiceModel.EventModel> GetAllByNowDay()
        {
            List<JXXZ.ZHCG.Model.CitizenServiceModel.EventModel> list = new List<Model.CitizenServiceModel.EventModel>();
            DateTime nowDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
            using (Entities db = new Entities())
            {
                list = db.sm_citizenservices.Where(t => t.createtime >= nowDate).OrderByDescending(t => t.createtime).Select(t => new JXXZ.ZHCG.Model.CitizenServiceModel.EventModel
                {
                    eventId=t.citizenid,
                    eventTitle = t.eventtitle,
                    eventUser = t.recorduser,
                    eventTime = t.createtime,
                    grometry=t.grometry
                }).ToList();
                return list;
            }
        }

        /// <summary>
        /// 获取当月事件
        /// </summary>
        /// <returns></returns>
        public List<int> getEvent()
        {
            using (Entities db = new Entities())
            {
                List<int> list = new List<int>();
                DateTime time = DateTime.Now;
                DateTime dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/01"));
                DateTime dt2 = dt1.AddMonths(1);
                IQueryable<sm_citizenservices> queryable = db.sm_citizenservices.Where(t => t.createtime >= dt1 && t.createtime < dt2);
                //数字城管
                int digitalCityManagement = (int)SMClass.digitalCityManagement;
                int digitalCityManagementcount = queryable.Where(t => t.sourceid == digitalCityManagement).Count();
                list.Add(digitalCityManagementcount);
                //市局96310
                int cityBureau96310 = (int)SMClass.cityBureau96310;
                int cityBureau96310count = queryable.Where(t => t.sourceid == cityBureau96310).Count();
                list.Add(cityBureau96310count);
                //24小时值班
                int allDayWatch = (int)SMClass.allDayWatch;
                int allDayWatchcount = queryable.Where(t => t.sourceid == allDayWatch).Count();
                list.Add(allDayWatchcount);
                //夜间施工转接
                int nightConstruction = (int)SMClass.allDayWatch;
                int nightConstructioncount = queryable.Where(t => t.sourceid == nightConstruction).Count();
                list.Add(nightConstructioncount);
                //信访
                int thePetition = (int)SMClass.thePetition;
                int thePetitioncount = queryable.Where(t => t.sourceid == thePetition).Count();
                list.Add(thePetitioncount);
                //环境曝光台
                int environmentalExposureTable = (int)SMClass.environmentalExposureTable;
                int environmentalExposureTablecount = queryable.Where(t => t.sourceid == environmentalExposureTable).Count();
                list.Add(environmentalExposureTablecount);
                //市长电话
                int mayorPhone = (int)SMClass.environmentalExposureTable;
                int mayorPhonecount = queryable.Where(t => t.sourceid == mayorPhone).Count();
                list.Add(mayorPhonecount);
                //其他
                int other = (int)SMClass.environmentalExposureTable;
                int othercount = queryable.Where(t => t.sourceid == other).Count();
                list.Add(othercount);

                return list;

            }
        }

        public List<int> GetSbsEventTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            #region 时间判断
            if (type == 1)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
                dt2 = dt1.AddDays(1);
            }
            else if (type == 2)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/01"));
                dt2 = dt1.AddMonths(1);
            }
            else if (type == 3)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/01/01"));
                dt2 = dt1.AddYears(1);
            }
            #endregion

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from(select bunit.path as name ,COUNT(bunit.id) as value  from sm_citizenservices sc 
LEFT JOIN base_users buser on sc.createuserid = buser.id
LEFT JOIN base_units bunit on buser.unitid =bunit.id
where  sc.createtime>=str_to_date('{0}','%Y/%m/%d') and sc.createtime < str_to_date('{1}','%Y/%m/%d') 
GROUP BY bunit.id) tab1 where tab1.`name` is not null", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
                #region 赋值
                //高照中队
                int gazdnum = 0;
                //新城中队
                int xczdnum = 0;
                //王店中队
                int wdzdnum = 0;
                //洪合中队
                int hhzdnum = 0;
                //新塍中队
                int xtzdnum = 0;
                //王江泾中队
                int wjjzdnum = 0;
                //油车港中队
                int ycxzdnum = 0;
                if (queryable.Count() != 0)
                {
                    newlist = queryable.Where(a => a.name.Contains("/1/2/12/")).ToList();
                    foreach (var item in newlist)
                    {
                        gazdnum = gazdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/11/")).ToList();
                    foreach (var item in newlist)
                    {
                        xczdnum = xczdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/13/")).ToList();
                    foreach (var item in newlist)
                    {
                        wdzdnum = wdzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/14/")).ToList();
                    foreach (var item in newlist)
                    {
                        hhzdnum = hhzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/15/")).ToList();
                    foreach (var item in newlist)
                    {
                        xtzdnum = xtzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/16/")).ToList();
                    foreach (var item in newlist)
                    {
                        wjjzdnum = wjjzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/17/")).ToList();
                    foreach (var item in newlist)
                    {
                        ycxzdnum = ycxzdnum + item.value;
                    }
                }
                list.Add(gazdnum);
                list.Add(xczdnum);
                list.Add(wdzdnum);
                list.Add(hhzdnum);
                list.Add(xtzdnum);
                list.Add(wjjzdnum);
                list.Add(ycxzdnum);
                #endregion
            }
            return list;
        }

        public List<int> GetClsEventTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            #region 时间判断
            if (type == 1)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
                dt2 = dt1.AddDays(1);
            }
            else if (type == 2)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/01"));
                dt2 = dt1.AddMonths(1);
            }
            else if (type == 3)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/01/01"));
                dt2 = dt1.AddYears(1);
            }
            #endregion

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (
select bunit.path as name ,COUNT(bunit.id) as value from wf_workflowspecifics wfs 
LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid = wfsa.wfsid and wfsa.wfdid = '2017021410240003'
LEFT JOIN base_users buser on wfsa.dealuserid = buser.id
LEFT JOIN base_units bunit on buser.unitid =bunit.id
where wfs.tablename ='sm_citizenservices' and wfsa.dealtime>=str_to_date('{0}','%Y/%m/%d') and wfsa.dealtime < str_to_date('{1}','%Y/%m/%d')
GROUP BY bunit.id) tab1 where tab1.`name` is not null
", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
                #region 赋值
                //高照中队
                int gazdnum = 0;
                //新城中队
                int xczdnum = 0;
                //王店中队
                int wdzdnum = 0;
                //洪合中队
                int hhzdnum = 0;
                //新塍中队
                int xtzdnum = 0;
                //王江泾中队
                int wjjzdnum = 0;
                //油车港中队
                int ycxzdnum = 0;
                if (queryable.Count() != 0)
                {
                    newlist = queryable.Where(a => a.name.Contains("/1/2/12/")).ToList();
                    foreach (var item in newlist)
                    {
                        gazdnum = gazdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/11/")).ToList();
                    foreach (var item in newlist)
                    {
                        xczdnum = xczdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/13/")).ToList();
                    foreach (var item in newlist)
                    {
                        wdzdnum = wdzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/14/")).ToList();
                    foreach (var item in newlist)
                    {
                        hhzdnum = hhzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/15/")).ToList();
                    foreach (var item in newlist)
                    {
                        xtzdnum = xtzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/16/")).ToList();
                    foreach (var item in newlist)
                    {
                        wjjzdnum = wjjzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/17/")).ToList();
                    foreach (var item in newlist)
                    {
                        ycxzdnum = ycxzdnum + item.value;
                    }
                }
                list.Add(gazdnum);
                list.Add(xczdnum);
                list.Add(wdzdnum);
                list.Add(hhzdnum);
                list.Add(xtzdnum);
                list.Add(wjjzdnum);
                list.Add(ycxzdnum);
                #endregion
            }
            return list;
        }

        public List<int> GetJasEventTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            #region 时间判断
            if (type == 1)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
                dt2 = dt1.AddDays(1);
            }
            else if (type == 2)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/01"));
                dt2 = dt1.AddMonths(1);
            }
            else if (type == 3)
            {
                dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/01/01"));
                dt2 = dt1.AddYears(1);
            }
            #endregion

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from(select bunit.path as name ,COUNT(bunit.id) as value  from sm_citizenservices sc 
LEFT JOIN base_users buser on sc.createuserid = buser.id
LEFT JOIN base_units bunit on buser.unitid =bunit.id
where sc.gdsj is not null and  sc.createtime>=str_to_date('{0}','%Y/%m/%d') and sc.createtime < str_to_date('{1}','%Y/%m/%d') 
GROUP BY bunit.id) tab1 where tab1.`name` is not null", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
                #region 赋值
                //高照中队
                int gazdnum = 0;
                //新城中队
                int xczdnum = 0;
                //王店中队
                int wdzdnum = 0;
                //洪合中队
                int hhzdnum = 0;
                //新塍中队
                int xtzdnum = 0;
                //王江泾中队
                int wjjzdnum = 0;
                //油车港中队
                int ycxzdnum = 0;
                if (queryable.Count() != 0)
                {
                    newlist = queryable.Where(a => a.name.Contains("/1/2/12/")).ToList();
                    foreach (var item in newlist)
                    {
                        gazdnum = gazdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/11/")).ToList();
                    foreach (var item in newlist)
                    {
                        xczdnum = xczdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/13/")).ToList();
                    foreach (var item in newlist)
                    {
                        wdzdnum = wdzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/14/")).ToList();
                    foreach (var item in newlist)
                    {
                        hhzdnum = hhzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/15/")).ToList();
                    foreach (var item in newlist)
                    {
                        xtzdnum = xtzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/16/")).ToList();
                    foreach (var item in newlist)
                    {
                        wjjzdnum = wjjzdnum + item.value;
                    }
                    newlist = queryable.Where(a => a.name.Contains("/1/2/17/")).ToList();
                    foreach (var item in newlist)
                    {
                        ycxzdnum = ycxzdnum + item.value;
                    }
                }
                list.Add(gazdnum);
                list.Add(xczdnum);
                list.Add(wdzdnum);
                list.Add(hhzdnum);
                list.Add(xtzdnum);
                list.Add(wjjzdnum);
                list.Add(ycxzdnum);
                #endregion
            }
            return list;
        }




        /// <summary>
        /// 当天全部事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetDateAllCitizenServicesList(List<Filter> filters, int start, int limit)
        {
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select ss.spath,wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,wwfile.filepath as photo1,sm.isextension,sm.reviewextension,sm.extensiontime,sm.extensioncontent,bunit.path
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
LEFT JOIN wf_workflowspecificactivitys www on wfs.wfsid = www.wfsid and www.wfdid='2017021410240010'
LEFT JOIN wf_workflowspecificusers wwfuser on www.wfsaid=wwfuser.wfsaid
                         LEFT JOIN wf_workflowspecificactivitys wfsa1 on wfs.wfsid = wfsa1.wfsid and (wfsa1.wfdid='2017021410240003' or wfsa1.wfdid='2017021410240007')
                         LEFT JOIN base_users buser on wfsa1.dealuserid = buser.id
                         LEFT JOIN base_units bunit on buser.unitid = bunit.id
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where  sm.createtime>=str_to_date('{0}','%Y/%m/%d') and sm.createtime < str_to_date('{1}','%Y/%m/%d') and wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", dt1, dt2);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                        list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                    {
                                        string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                        list = list.Where(t => t.path != null && t.path.Contains(path));
                                    }

                                }
                                break;
                        }
                    }
                }

                list = list.OrderByDescending(t => t.createtime).Skip(start).Take(limit);
                return list.ToList();
            }

        }


        /// <summary>
        /// 当天全部事件列表数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetDateAllCitizenServices(List<Filter> filters)
        {
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,sm.createtime,sm.eventtitle,sm.sourceid,sm.citizenid,sm.eventid,sm.dutytime,sm.complainant,sm.cnumber,sm.foundtime,sm.contactphone,sm.contactaddress,sm.eventaddress,sm.eventcontent,sm.bigtypeid,sm.smalltypeid,sm.limittime,sm.recorduser,sm.grometry,sm.createuserid,bu.displayname as createusername,
sc.classname as bigtypename , smc.classname as smalltypename, ss.name as sourcename,sm.processmode,sm.satisfaction,wwfile.filepath as photo1,bunit.path
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join sm_citizenservices sm on wfs.TABLENAMEID=sm.citizenid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=sm.createuserid
INNER JOIN sm_classes sc on sm.bigtypeid=sc.classid
                         INNER JOIN sm_classes smc on sm.smalltypeid=smc.classid
INNER JOIN sm_sources ss on ss.sourceid=sm.sourceid
LEFT JOIN wf_workflowspecificactivitys www on wfs.wfsid = www.wfsid and www.wfdid='2017021410240010'
LEFT JOIN wf_workflowspecificusers wwfuser on www.wfsaid=wwfuser.wfsaid
 LEFT JOIN wf_workflowspecificactivitys wfsa1 on wfs.wfsid = wfsa1.wfsid and (wfsa1.wfdid='2017021410240003' or wfsa1.wfdid='2017021410240007')
                         LEFT JOIN base_users buser on wfsa1.dealuserid = buser.id
                         LEFT JOIN base_units bunit on buser.unitid = bunit.id
LEFT join (select wfsuid,min(filename),min(filepath) filepath  from wf_workflowspecificuserfiles group by wfsuid) as wwfile on  wwfuser.wfsuid=wwfile.wfsuid
                         where sm.createtime>=str_to_date('{0}','%Y/%m/%d') and sm.createtime < str_to_date('{1}','%Y/%m/%d') and  wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<>3
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", dt1, dt2);
                IEnumerable<SM_CitizenServicesModel> list = db.Database.SqlQuery<SM_CitizenServicesModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventid.Contains(value));
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.contactphone == value);
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                        list = list.Where(t => t.sourceid == id);
                                }
                                break;
                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.foundtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.foundtime <= Etime);
                                }
                                break;
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.nextusername.Contains(value));
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                    {
                                        string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                        list = list.Where(t => t.path != null && t.path.Contains(path));
                                    }
                                }
                                break;
                        }
                    }
                }

                return list.Count();
            }

        }

        public string getEventBytype()
        {
            List<int> list = new List<int>();
            //DateTime time = DateTime.Now.AddMonths(-1);
            List<string> namelist = new List<string>();
            List<int> valuelist = new List<int>();
            using (Entities db = new Entities())
            {
                //事件来源
//                string sql = string.Format(@"select count(ss.sourceid) as value ,ss.`name` as name  from sm_citizenservices sc
//right join sm_sources ss on ss.sourceid = sc.sourceid 
//group by ss.sourceid");
                //事件大小类
                string sql = string.Format(@"select count(scs.classid) as value ,scs.classname as name  
from sm_citizenservices sc
right join sm_classes scs on scs.classid = sc.bigtypeid 
where scs.parentid is null
group by scs.classid");

                //根据时间查询条件 where cc.sitedatetime >=str_to_date('2017/05/06 00:00:00','%Y/%m/%d %H:%i:%s') and cc.sitedatetime < str_to_date('2017/06/09 00:00:00','%Y/%m/%d %H:%i:%s')

                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
                queryable = queryable.OrderByDescending(a => a.value).Skip(0).Take(6);
                foreach (var item in queryable)
                {
                    namelist.Add(item.name);
                    valuelist.Add(item.value);
                }
                string str = JsonConvert.SerializeObject(namelist).ToString() + "|" + JsonConvert.SerializeObject(valuelist).ToString();
                return str;
            }
        }

    }
}
