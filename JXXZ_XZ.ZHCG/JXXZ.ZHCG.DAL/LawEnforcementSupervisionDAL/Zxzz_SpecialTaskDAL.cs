using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.LawEnforcementSupervisionDAL
{
    public class Zxzz_SpecialTaskDAL
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
        public List<Zxzz_TaskModel> GetSpecialTaskList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,bu.displayname as createusername,wfw.createuserid as nextuserid,buser.displayname as nextusername,bz.zd_name,wfd.seqnum,zt.taskid,zt.title,zt.tasktype,zt.level,zt.term,zt.starttime,zt.endtime,zt.region,zt.taskexplain,zt.grometry,zt.fqr,zt.fqtime,zt.xdzd,zt.leader,zt.summarytime,zt.summaryuserid,zt.summary,zt.results,zt.experiences,wfsa.createtime
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join zxzz_tasks zt on wfs.TABLENAMEID=zt.taskid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=zt.createuserid
                         inner join base_zds bz on zt.tasktype=bz.zd_id  and bz.zd_type='type_task'
                         inner join wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
                         inner join base_users buser on buser.id=wfw.createuserid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where userid='{0}' and status='{1}'
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", userid, status);
                IEnumerable<Zxzz_TaskModel> list = db.Database.SqlQuery<Zxzz_TaskModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.title.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "tasktype":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.tasktype == value);
                                break;
                            case "level":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int level = Convert.ToInt32(value);
                                    list = list.Where(t => t.level == level);
                                }
                                break;
                            case "region":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.region.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.starttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.endtime <= Etime);
                                }
                                break;
                            case "fqr":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int fqr = Convert.ToInt32(value);
                                    list = list.Where(t => t.fqr == fqr);
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
        /// 待办数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public int GetSpecialTaskCount(List<Filter> filters, int userid, int status)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,bu.displayname as createusername,wfw.createuserid as nextuserid,buser.displayname as nextusername,bz.zd_name,wfd.seqnum,zt.taskid,zt.title,zt.tasktype,zt.level,zt.term,zt.starttime,zt.endtime,zt.region,zt.taskexplain,zt.grometry,zt.fqr,zt.fqtime,zt.xdzd,zt.leader
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join zxzz_tasks zt on wfs.TABLENAMEID=zt.taskid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=zt.createuserid
                         inner join base_zds bz on zt.tasktype=bz.zd_id  and bz.zd_type='type_task'
                         inner join wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
                         inner join base_users buser on buser.id=wfw.createuserid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where userid='{0}' and status='{1}'
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", userid, status);
                IEnumerable<Zxzz_TaskModel> list = db.Database.SqlQuery<Zxzz_TaskModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.title.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "tasktype":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.tasktype == value);
                                break;
                            case "level":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int level = Convert.ToInt32(value);
                                    list = list.Where(t => t.level == level);
                                }
                                break;
                            case "region":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.region.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.starttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.endtime <= Etime);
                                }
                                break;
                            case "fqr":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int fqr = Convert.ToInt32(value);
                                    list = list.Where(t => t.fqr == fqr);
                                }
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
        public List<Zxzz_TaskModel> GetAllSpecialTaskList(List<Filter> filters, int start, int limit)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,bu.displayname as createusername,wfw.createuserid as nextuserid,buser.displayname as nextusername,bz.zd_name,wfd.seqnum,zt.taskid,zt.title,zt.tasktype,zt.level,zt.term,zt.starttime,zt.endtime,zt.region,zt.taskexplain,zt.grometry,zt.fqr,zt.fqtime,zt.xdzd,zt.leader,zt.summarytime,zt.summaryuserid,zt.summary,zt.results,zt.experiences,wfsa.createtime
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join zxzz_tasks zt on wfs.TABLENAMEID=zt.taskid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=zt.createuserid
                         inner join base_zds bz on zt.tasktype=bz.zd_id  and bz.zd_type='type_task'
                         inner join wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
                         inner join base_users buser on buser.id=wfw.createuserid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid");
                IEnumerable<Zxzz_TaskModel> list = db.Database.SqlQuery<Zxzz_TaskModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.title.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "tasktype":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.tasktype == value);
                                break;
                            case "level":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int level = Convert.ToInt32(value);
                                    list = list.Where(t => t.level == level);
                                }
                                break;
                            case "region":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.region.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.starttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.endtime <= Etime);
                                }
                                break;
                            case "fqr":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int fqr = Convert.ToInt32(value);
                                    list = list.Where(t => t.fqr == fqr);
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
        /// 全部列表数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetAllSpecialTaskCount(List<Filter> filters)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,bu.displayname as createusername,wfw.createuserid as nextuserid,buser.displayname as nextusername,bz.zd_name,wfd.seqnum,zt.taskid,zt.title,zt.tasktype,zt.level,zt.term,zt.starttime,zt.endtime,zt.region,zt.taskexplain,zt.grometry,zt.fqr,zt.fqtime,zt.xdzd,zt.leader
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join zxzz_tasks zt on wfs.TABLENAMEID=zt.taskid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=zt.createuserid
                         inner join base_zds bz on zt.tasktype=bz.zd_id  and bz.zd_type='type_task'
                         inner join wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
                         inner join base_users buser on buser.id=wfw.createuserid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid");
                IEnumerable<Zxzz_TaskModel> list = db.Database.SqlQuery<Zxzz_TaskModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.title.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "tasktype":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.tasktype == value);
                                break;
                            case "level":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int level = Convert.ToInt32(value);
                                    list = list.Where(t => t.level == level);
                                }
                                break;
                            case "region":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.region.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.starttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.endtime <= Etime);
                                }
                                break;
                            case "fqr":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int fqr = Convert.ToInt32(value);
                                    list = list.Where(t => t.fqr == fqr);
                                }
                                break;
                        }
                    }
                }

                return list.Count();
            }

        }

        /// <summary>
        /// 专项整治列表导出
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<Zxzz_TaskModel> GetSpecialTaskListExcel(int userid, int status, List<Filter> filters = null)
        {
            using (Entities db = new Entities())
            {
                string sqlextra = status == 3 ? "" : "where userid=" + userid + " and status=" + status;
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,bu.displayname as createusername,wfw.createuserid as nextuserid,buser.displayname as nextusername,bz.zd_name,wfd.seqnum,zt.taskid,zt.title,zt.tasktype,zt.level,zt.term,zt.starttime,zt.endtime,zt.region,zt.taskexplain,zt.grometry,zt.fqr,zt.fqtime,zt.xdzd,zt.leader,zt.summarytime,zt.summaryuserid,zt.summary,zt.results,zt.experiences,if(zt.level=1,'一般',if(zt.`level` = 2,'紧急','特急')) as levelstr,concat_ws(concat_ws(DATE_FORMAT(zt.endtime,'%Y-%m-%d'),'--',''),DATE_FORMAT(zt.starttime,'%Y-%m-%d'),'') AS setime
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join zxzz_tasks zt on wfs.TABLENAMEID=zt.taskid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=zt.createuserid
                         inner join base_zds bz on zt.tasktype=bz.zd_id  and bz.zd_type='type_task'
                         inner join wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
                         inner join base_users buser on buser.id=wfw.createuserid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers {0}
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid", sqlextra);
                IEnumerable<Zxzz_TaskModel> list = db.Database.SqlQuery<Zxzz_TaskModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.title.Contains(value));
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.wfdid == value);
                                break;
                            case "tasktype":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.tasktype == value);
                                break;
                            case "level":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int level = Convert.ToInt32(value);
                                    list = list.Where(t => t.level == level);
                                }
                                break;
                            case "region":
                                if (!string.IsNullOrEmpty(value))
                                    list = list.Where(t => t.region.Contains(value));
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    list = list.Where(t => t.starttime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    list = list.Where(t => t.endtime <= Etime);
                                }
                                break;
                            case "fqr":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int fqr = Convert.ToInt32(value);
                                    list = list.Where(t => t.fqr == fqr);
                                }
                                break;
                        }
                    }
                }
                list = list.OrderByDescending(t => t.createtime);

                return list.ToList();
            }

        }

        /// <summary>
        /// 获取专项整治图片
        /// </summary>
        /// <param name="taskid">任务ID</param>
        /// <param name="wfdid">环节ID</param>
        /// <returns></returns>
        public List<FileClass> GetSpecialTaskImages(string taskid, string wfdid)
        {
            Entities db = new Entities();
            IEnumerable<FileClass> list = null;
            string sql = string.Format(@"select wff.filesize size,wff.filepath OriginalPath,wff.fileid,wff.filename OriginalName,wff.filetype OriginalType,wfsa.WFDID
from   WF_WORKFLOWSPECIFICS wfs 
left join WF_WORKFLOWSPECIFICACTIVITYS wfsa on wfs.WFSID=wfsa.WFSID
left join WF_WORKFLOWSPECIFICUSERS wfu on wfu.WFSAID=wfsa.WFSAID
left join WF_WORKFLOWSPECIFICUSERFILES wff on wff.WFSUID=wfu.WFSUID
where wfs.TABLENAMEID='{0}' and wfsa.WFDID='{1}' and wff.FILEID is not null ", taskid, wfdid);
            list = db.Database.SqlQuery<FileClass>(sql);

            return list.ToList();
        }

        /// <summary>
        /// 获取专项整治图片
        /// </summary>
        /// <param name="taskid">任务ID</param>
        /// <param name="wfdid">环节ID</param>
        /// <returns></returns>
        public List<FileClass> GetSpecialTaskReportImages(string wfsuid)
        {
            Entities db = new Entities();
            IEnumerable<FileClass> list = db.wf_workflowspecificuserfiles.Where(t => t.wfsuid == wfsuid)
                .Select(t => new FileClass()
                {
                    size = t.filesize,
                    OriginalPath = t.filepath,
                    OriginalName = t.filename,
                    OriginalType = t.filetype,
                });

            return list.ToList();
        }

        /// <summary>
        /// 获取专项整治流程信息
        /// </summary>
        /// <param name="taskid">任务ID</param>
        /// <param name="wfdid">环节ID</param>
        /// <returns></returns>
        public Paging<List<Zxzz_TaskWorkFlowModel>> GetSpecialTaskWFInfo(int start, int limit, string taskid, string wfdid)
        {
            Entities db = new Entities();
            Paging<List<Zxzz_TaskWorkFlowModel>> paging = new Paging<List<Zxzz_TaskWorkFlowModel>>();
            IEnumerable<Zxzz_TaskWorkFlowModel> list = null;
            string sqlstr ="";
            if (wfdid == "2017041214200003")
                sqlstr = "AND wfu.content <>''";
            string sql = string.Format(@"SELECT wfu.content,wfu.processmode dealtype,wfu.dealtime,wfu.userid,u.displayname username,un.`name` unitname,wfs.tablenameid,wfu.wfsuid
from WF_WORKFLOWSPECIFICS wfs
left join WF_WORKFLOWSPECIFICACTIVITYS wfsa on wfs.WFSID=wfsa.WFSID
left join WF_WORKFLOWSPECIFICUSERS wfu on wfu.WFSAID=wfsa.WFSAID
left join base_users u on wfu.userid=u.id
left join base_units un on u.unitid=un.id
left join base_users u2 on wfu.userid=u2.id
where wfs.TABLENAMEID={0} and wfsa.WFDID={1} and wfu.`status` = 2  and u2.unitid <> 9 {2}", taskid, wfdid, sqlstr);
            list = db.Database.SqlQuery<Zxzz_TaskWorkFlowModel>(sql);
            paging.Total = list.Count();
            list = list.OrderByDescending(t => t.dealtime).Skip(start).Take(limit);
            paging.Items = list.ToList();

            return paging;
        }

        /// <summary>
        /// 获取专项整治流程信息
        /// </summary>
        /// <param name="taskid">任务ID</param>
        /// <param name="wfdid">环节ID</param>
        /// <returns></returns>
        public int GetSpecialTaskWFInfoCount(string taskid, string wfdid)
        {
            Entities db = new Entities();
            IEnumerable<Zxzz_TaskWorkFlowModel> list = null;
            string sql = string.Format(@"SELECT wfu.content,wfu.processmode dealtype,wfu.dealtime,wfu.userid,u.displayname username,un.`name` unitname,wfs.tablenameid
from WF_WORKFLOWSPECIFICS wfs
left join WF_WORKFLOWSPECIFICACTIVITYS wfsa on wfs.WFSID=wfsa.WFSID
left join WF_WORKFLOWSPECIFICUSERS wfu on wfu.WFSAID=wfsa.WFSAID
left join base_users u on wfu.userid=u.id
left join base_units un on u.unitid=un.id
left join base_users u2 on wfu.userid=u2.id
where wfs.TABLENAMEID={0} and wfsa.WFDID={1} and wfu.`status` = 2 and u2.unitid <> 9", taskid, wfdid);
            list = db.Database.SqlQuery<Zxzz_TaskWorkFlowModel>(sql);

            return list.Count();
        }

        /// <summary>
        /// 添加总结信息
        /// </summary>
        /// <param name="model"></param>
        public void UpdateSpecailTask(zxzz_tasks model)
        {
            Entities db = new Entities();
            zxzz_tasks zxzz = db.zxzz_tasks.FirstOrDefault(t => t.taskid == model.taskid);
            if (zxzz != null)
            {
                zxzz.summarytime = model.summarytime;
                zxzz.summaryuserid = model.summaryuserid;
                zxzz.summary = model.summary;
                zxzz.results = model.results;
                zxzz.experiences = model.experiences;
            } db.SaveChanges();
        }

        /// <summary>
        /// 结束所有wfsu用户的未处理
        /// </summary>
        public void OverAllWFSU(string wfsaid, string nextwfsaid, int userid)
        {
            Entities db = new Entities();
            IQueryable<wf_workflowspecificusers> list = db.wf_workflowspecificusers.Where(t => t.wfsaid == wfsaid);
            foreach (var item in list)
            {
                item.status = 2;
            }
            IQueryable<wf_workflowspecificusers> list2 = db.wf_workflowspecificusers.Where(t => t.wfsaid == nextwfsaid);
            foreach (var item in list2)
            {
                item.status = 1;
            }

            db.SaveChanges();
        }

        /// <summary>
        /// 初始化
        /// </summary>
        public void ReloadWFSU(string wfsaid)
        {
            Entities db = new Entities();
            IQueryable<wf_workflowspecificusers> list = db.wf_workflowspecificusers.Where(t => t.wfsaid == wfsaid);
            foreach (var item in list)
            {
                item.status = 1;
            }

            db.SaveChanges();
        }

        /// <summary>
        /// 结束总结所有wfsu用户的未处理
        /// </summary>
        public void EndAllWFSU(string wfsaid)
        {
            Entities db = new Entities();
            IQueryable<wf_workflowspecificusers> list = db.wf_workflowspecificusers.Where(t => t.wfsaid == wfsaid);
            foreach (var item in list)
            {
                item.status = 2;
            }

            db.SaveChanges();
        }


        /// <summary>
        /// 事件详情
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Zxzz_TaskModel GetSpecialTaskModel(string taskid)
        {
            Zxzz_TaskModel model = new Zxzz_TaskModel();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select wfs.wfsid,wfs.wfsname,wfs.status,wf.wfid,wf.wfname,wfsa.wfdid,wfd.wfdname,wfsa.wfsaid,
                         u.id as userid,u.displayname as username,bu.displayname as createusername,wfw.createuserid as nextuserid,buser.displayname as nextusername,bz.zd_name,wfd.seqnum,zt.taskid,zt.title,zt.tasktype,zt.level,zt.term,zt.starttime,zt.endtime,zt.region,zt.taskexplain,zt.grometry,zt.fqr,zt.fqtime,zt.xdzd,zt.leader,zt.summarytime,zt.summaryuserid,zt.summary,zt.results,zt.experiences
                         from wf_workflowspecifics wfs
                         inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and         
                         wfs.CURRENTWFSAID=wfsa.wfsaid
                         inner join wf_workflows wf on wf.wfid=wfs.wfid
                         inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
                         inner join zxzz_tasks zt on wfs.TABLENAMEID=zt.taskid
                         inner join base_users u on u.id=wfs.createuserid
                         inner join base_users bu on bu.id=zt.createuserid
                         inner join base_zds bz on zt.tasktype=bz.zd_id  and bz.zd_type='type_task'
                         inner join wf_workflowspecificusers wfw on wfw.wfsaid=wfsa.wfsaid
                         inner join base_users buser on buser.id=wfw.createuserid
                         where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers
                           )
                         )
                         order by wfsa.createtime desc) tab1 GROUP BY tab1.wfsid");
                IEnumerable<Zxzz_TaskModel> list = db.Database.SqlQuery<Zxzz_TaskModel>(sql);
                if (list.Count() > 0)
                    model = list.FirstOrDefault(a => a.taskid == taskid);

                return model;
            }

        }

    }
}
