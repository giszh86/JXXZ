using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.administrativeapprovalDAL
{
    /// <summary>
    /// 行政审批列表
    /// </summary>
    public class ApprovalDAL
    {
        #region 获取行政审批代办列表
        public Paging<List<Audit_project_wModel>> GetApprovalList(List<Filter> filters, int start, int limit, int userid, int status, bool isxzk)
        {
            Paging<List<Audit_project_wModel>> paging = new Paging<List<Audit_project_wModel>>();
            List<Audit_project_wModel> list = new List<Audit_project_wModel>();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                Entities mysqldb = new Entities();

                string sql = @"select distinct t.pviguid, t.syncrowguid, t.promise_day,t.xiangmubh,t.flowsn,t.tasktype,t.taskcaseguid,
t.address,t.applyername,t.legal,t.certtype,t.certnum,t.contactpostcode,t.contactperson,
t.contactmobile,t.contactphone,t.remark,t.windowname,t.receiveusername,t.receivedate,
t.acceptuserdate,t.promiseenddate,t.banjiedate,t.acceptusername,t.banjieuserguid,t.banwandate,
t.row_id,t.projectname,his.processversioninstancename from (
select * from 
(select row_number() over(partition by pviguid order by data_timestamp desc) rn,t.*
from audit_project_w t 
where t.windowname='区综合行政执法局'
and t.status=90
and to_char(t.banjiedate,'yyyy')>=2017 and to_char(t.banjiedate,'MM')>=8) a
where a.rn=1) t
left join WORKFLOW_WORKITEM_HISTORY_W  his on  t.pviguid=his.processversioninstanceguid and his.activityname='办结'
order by t.banjiedate desc
";
                List<Audit_project_wModel> sqlQueryable = db.Database.SqlQuery<Audit_project_wModel>(sql).ToList();
                IEnumerable<Audit_project_wModel> Queryable;

                //如果是行政许可科代办
                if (isxzk && status == 1)
                {
                    #region 如果是行政许可科
                    Queryable = from a in sqlQueryable
                                join b in mysqldb.wf_workflowspecifics.Where(t => t.tablename == "audit_project_w") on a.syncrowguid equals b.tablenameid into btmp
                                from c in btmp.DefaultIfEmpty()
                                where c == null
                                select new Audit_project_wModel
                                {
                                    #region 字段赋值
                                    pviguid = a.pviguid,
                                    xiangmubh = a.xiangmubh,
                                    flowsn = a.flowsn,
                                    tasktype = a.tasktype,
                                    taskcaseguid = a.taskcaseguid,
                                    address = a.address,
                                    applyername = a.applyername,
                                    legal = a.legal,
                                    certtype = a.certtype,
                                    promise_day = a.promise_day,
                                    certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                    certnum = a.certnum,
                                    contactpostcode = a.contactpostcode,
                                    contactperson = a.contactperson,
                                    contactmobile = a.contactmobile,
                                    contactphone = a.contactphone,
                                    remark = a.remark,
                                    windowname = a.windowname,
                                    receiveusername = a.receiveusername,
                                    receivedate = a.receivedate,
                                    acceptuserdate = a.acceptuserdate,
                                    promiseenddate = a.promiseenddate,
                                    banwandate = a.banwandate,
                                    banjiedate = a.banjiedate,
                                    activityname = a.activityname,
                                    processversioninstancename = a.processversioninstancename,
                                    opinion = a.opinion,
                                    acceptusername = a.acceptusername,
                                    banjieuserguid = a.banjieuserguid,
                                    banjieusername = a.banjieusername,
                                    row_id = a.row_id,
                                    projectname = a.projectname,
                                    advice = a.advice,
                                    OperatorForDisplayName = a.OperatorForDisplayName,
                                    syncrowguid = a.syncrowguid,
                                    #endregion
                                };
                    #endregion
                }
                else if (isxzk && status == 3)
                {
                    #region 归档
                    Queryable = from a in sqlQueryable
                                join b in mysqldb.wf_workflowspecifics on new { a1 = a.syncrowguid, b1 = "audit_project_w" } equals new { a1 = b.tablenameid, b1 = b.tablename }
                                join c in mysqldb.wf_workflowspecificactivitys on b.currentwfsaid equals c.wfsaid
                                join d in mysqldb.wf_workflowspecificusers on c.wfsaid equals d.wfsaid
                                join e in mysqldb.base_users on d.userid equals e.id
                                where c.wfdid == "2017070414250004"
                                select new Audit_project_wModel
                                {
                                    #region 字段赋值
                                    pviguid = a.pviguid,
                                    xiangmubh = a.xiangmubh,
                                    flowsn = a.flowsn,
                                    tasktype = a.tasktype,
                                    taskcaseguid = a.taskcaseguid,
                                    address = a.address,
                                    applyername = a.applyername,
                                    legal = a.legal,
                                    certtype = a.certtype,
                                    promise_day = a.promise_day,
                                    certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                    certnum = a.certnum,
                                    contactpostcode = a.contactpostcode,
                                    contactperson = a.contactperson,
                                    contactmobile = a.contactmobile,
                                    contactphone = a.contactphone,
                                    remark = a.remark,
                                    windowname = a.windowname,
                                    receiveusername = a.receiveusername,
                                    receivedate = a.receivedate,
                                    acceptuserdate = a.acceptuserdate,
                                    promiseenddate = a.promiseenddate,
                                    banwandate = a.banwandate,
                                    banjiedate = a.banjiedate,
                                    activityname = a.activityname,
                                    processversioninstancename = a.processversioninstancename,
                                    opinion = a.opinion,
                                    acceptusername = a.acceptusername,
                                    banjieuserguid = a.banjieuserguid,
                                    banjieusername = a.banjieusername,
                                    row_id = a.row_id,
                                    projectname = a.projectname,
                                    advice = a.advice,
                                    OperatorForDisplayName = a.OperatorForDisplayName,
                                    syncrowguid = a.syncrowguid,
                                    #endregion
                                };
                    #endregion
                }
                else
                {
                    #region 非行政许可科
                    Queryable = from a in sqlQueryable
                                join b in mysqldb.wf_workflowspecifics on new { a1 = a.syncrowguid, b1 = "audit_project_w" } equals new { a1 = b.tablenameid, b1 = b.tablename }
                                join c in mysqldb.wf_workflowspecificactivitys on new { a2 = b.wfsid, b2 = status } equals new { a2 = c.wfsid, b2 = c.status.Value }
                                join d in mysqldb.wf_workflowspecificusers on new { a2 = c.wfsaid, b2 = status } equals new { a2 = d.wfsaid, b2 = d.status.Value }
                                where d.userid == userid
                                select a;
                    Queryable = from a in Queryable.Distinct()      //数据去重
                                select new Audit_project_wModel
                                {
                                    #region 字段赋值
                                    pviguid = a.pviguid,
                                    xiangmubh = a.xiangmubh,
                                    flowsn = a.flowsn,
                                    tasktype = a.tasktype,
                                    taskcaseguid = a.taskcaseguid,
                                    address = a.address,
                                    applyername = a.applyername,
                                    legal = a.legal,
                                    certtype = a.certtype,
                                    promise_day = a.promise_day,
                                    certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                    certnum = a.certnum,
                                    contactpostcode = a.contactpostcode,
                                    contactperson = a.contactperson,
                                    contactmobile = a.contactmobile,
                                    contactphone = a.contactphone,
                                    remark = a.remark,
                                    windowname = a.windowname,
                                    receiveusername = a.receiveusername,
                                    receivedate = a.receivedate,
                                    acceptuserdate = a.acceptuserdate,
                                    promiseenddate = a.promiseenddate,
                                    banwandate = a.banwandate,
                                    banjiedate = a.banjiedate,
                                    activityname = a.activityname,
                                    processversioninstancename = a.processversioninstancename,
                                    opinion = a.opinion,
                                    acceptusername = a.acceptusername,
                                    banjieuserguid = a.banjieuserguid,
                                    banjieusername = a.banjieusername,
                                    row_id = a.row_id,
                                    projectname = a.projectname,
                                    advice = a.advice,
                                    OperatorForDisplayName = a.OperatorForDisplayName,
                                    syncrowguid = a.syncrowguid,
                                    currentwfsaid = a.currentwfsaid,
                                    wfdidname = a.wfdidname,
                                    #endregion
                                };
                    #endregion
                }

                #region 查询参数
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "row_id":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.row_id.ToString().Contains(value));
                                break;
                            case "projectname":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.projectname.Contains(value));
                                break;
                            case "applyername":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    Queryable = Queryable.Where(t => t.applyername.Contains(value));
                                }
                                break;
                            case "banjiedatefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedatefrom = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate >= banjiedatefrom);
                                }
                                break;
                            case "banjiedateto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedateto = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate <= banjiedateto);
                                }
                                break;
                        }
                    }
                }
                #endregion

                paging.Items = Queryable.OrderByDescending(a => a.banjiedate).Skip(start).Take(limit).ToList();
                paging.Total = Queryable.Count();

                return paging;
            }
        }
        #endregion

        #region 获取行政审批全部审批列表
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            Paging<List<Audit_project_wModel>> paging = new Paging<List<Audit_project_wModel>>();
            List<Audit_project_wModel> list = new List<Audit_project_wModel>();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                Entities mysqldb = new Entities();

                string sql = @"select distinct t.pviguid,t.syncrowguid, t.promise_day,t.xiangmubh,t.flowsn,t.tasktype,t.taskcaseguid,
t.address,t.applyername,t.legal,t.certtype,t.certnum,t.contactpostcode,t.contactperson,
t.contactmobile,t.contactphone,t.remark,t.windowname,t.receiveusername,t.receivedate,
t.acceptuserdate,t.promiseenddate,t.banjiedate,t.acceptusername,t.banjieuserguid,t.banwandate,
t.row_id,t.projectname,his.processversioninstancename from (
select * from 
(select row_number() over(partition by pviguid order by data_timestamp desc) rn,t.*
from audit_project_w t 
where t.windowname='区综合行政执法局'
and t.status=90
and to_char(t.banjiedate,'yyyy')>=2017) a
where a.rn=1) t
left join (select * from (select row_number() over(partition by processversioninstanceguid order by data_timestamp desc) rn,h.*
from WORKFLOW_WORKITEM_HISTORY_W h) a
where a.rn=1) his on  t.pviguid=his.processversioninstanceguid
order by t.banjiedate desc";
                List<Audit_project_wModel> sqlQueryable = db.Database.SqlQuery<Audit_project_wModel>(sql).ToList();
                IEnumerable<Audit_project_wModel> Queryable = from a in sqlQueryable
                                                              join b in mysqldb.wf_workflowspecifics on new { a1 = "audit_project_w", b1 = a.syncrowguid } equals new { a1 = b.tablename, b1 = b.tablenameid } into btmp
                                                              from c in btmp.DefaultIfEmpty()
                                                              join d_join in mysqldb.wf_workflowspecificactivitys on c == null ? "1" : c.currentwfsaid equals d_join.wfsaid into dtmp
                                                              from d in dtmp.DefaultIfEmpty()
                                                              join e_join in mysqldb.wf_workflowdetails on d == null ? "1" : d.wfdid equals e_join.wfdid into etmp
                                                              from e in etmp.DefaultIfEmpty()
                                                              join f_join in mysqldb.wf_workflowspecificusers on d == null ? "1" : d.wfsaid equals f_join.wfsaid into ftmp
                                                              from f in ftmp.DefaultIfEmpty()
                                                              join g_join in mysqldb.base_users on f == null ? -1 : f.userid equals g_join.id into gtmp
                                                              from g in gtmp.DefaultIfEmpty()
                                                              join h_join in mysqldb.wf_workflowspecificactivitys on new { a1 = c == null ? "1" : c.wfsid, b1 = "2017070414250001" } equals new { a1 = h_join.wfsid, b1 = h_join.wfdid } into htmp
                                                              from h in htmp.DefaultIfEmpty()
                                                              join i_join in mysqldb.wf_workflowspecificusers on h == null ? "1" : h.wfsaid equals i_join.wfsaid into itmp
                                                              from i in itmp.DefaultIfEmpty()
                                                              select new Audit_project_wModel
                                                              {
                                                                  #region 字段赋值
                                                                  pviguid = a.pviguid,
                                                                  xiangmubh = a.xiangmubh,
                                                                  flowsn = a.flowsn,
                                                                  tasktype = a.tasktype,
                                                                  taskcaseguid = a.taskcaseguid,
                                                                  address = a.address,
                                                                  applyername = a.applyername,
                                                                  legal = a.legal,
                                                                  certtype = a.certtype,
                                                                  certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                                                  certnum = a.certnum,
                                                                  contactpostcode = a.contactpostcode,
                                                                  contactperson = a.contactperson,
                                                                  promise_day = a.promise_day,
                                                                  contactmobile = a.contactmobile,
                                                                  contactphone = a.contactphone,
                                                                  remark = a.remark,
                                                                  windowname = a.windowname,
                                                                  receiveusername = a.receiveusername,
                                                                  receivedate = a.receivedate,
                                                                  acceptuserdate = a.acceptuserdate,
                                                                  promiseenddate = a.promiseenddate,
                                                                  banwandate = a.banwandate,
                                                                  banjiedate = a.banjiedate,
                                                                  activityname = a.activityname,
                                                                  processversioninstancename = a.processversioninstancename,
                                                                  opinion = a.opinion,
                                                                  acceptusername = a.acceptusername,
                                                                  banjieuserguid = a.banjieuserguid,
                                                                  banjieusername = a.banjieusername,
                                                                  row_id = a.row_id,
                                                                  projectname = a.projectname,
                                                                  advice = a.advice,
                                                                  OperatorForDisplayName = a.OperatorForDisplayName,
                                                                  syncrowguid = a.syncrowguid,
                                                                  currentwfsaid = a.currentwfsaid,
                                                                  wfdidname = e != null ? e.wfdname : "",
                                                                  flowusername = g != null ? g.displayname : "",
                                                                  xzxkstarttime = i != null ? i.satisfaction : "",
                                                                  xzxkendtime = i != null ? i.processmode : "",
                                                                  #endregion
                                                              };
                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "row_id":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.row_id.ToString().Contains(value));
                                break;
                            case "projectname":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.projectname.Contains(value));
                                break;
                            case "applyername":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    Queryable = Queryable.Where(t => t.applyername.Contains(value));
                                }
                                break;
                            case "banjiedatefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedatefrom = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate >= banjiedatefrom);
                                }
                                break;
                            case "banjiedateto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedateto = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate <= banjiedateto);
                                }
                                break;
                        }
                    }
                }
                #endregion

                paging.Items = Queryable.OrderByDescending(a => a.banjiedate).Skip(start).Take(limit).ToList();
                paging.Total = Queryable.Count();

                return paging;
            }
        }
        #endregion

        #region 获取意见列表
        public Paging<List<Audit_project_wModel>> GetAdviceList(int start, int limit, string pviguid)
        {
            Paging<List<Audit_project_wModel>> paging = new Paging<List<Audit_project_wModel>>();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                string sql = string.Format(@"select * from (
SELECT distinct h.WORKITEMGUID,t.pviguid, h.ActivityName, h.OperatorForDisplayName, h.OperationDate, to_char(h.opinion) opinion
FROM audit_project_w t 
inner JOIN workflow_workitem_history_w h ON t.pviguid = h.processversioninstanceguid and t.status=90
WHERE t.windowname = '区综合行政执法局'
and t.pviguid='{0}') a
order by a.operationdate asc", pviguid);
                IEnumerable<Audit_project_wModel> list = db.Database.SqlQuery<Audit_project_wModel>(sql);
                paging.Items = list.Skip(start).Take(limit).ToList();
                paging.Total = list.Count();
                return paging;
            }
        }
        #endregion

        #region 获取流转日志
        public Paging<List<Audit_project_wModel>> GetTransformLogList(int start, int limit, string pviguid)
        {
            Paging<List<Audit_project_wModel>> paging = new Paging<List<Audit_project_wModel>>();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                string sql = string.Format(@"select * from (
SELECT distinct h.WORKITEMGUID,t.acceptusername acceptusername, h.activityname, t.receiveusername, t.receivedate
FROM audit_project_w t 
INNER JOIN workflow_workitem_history_w h ON t.pviguid = h.processversioninstanceguid and t.status=90
WHERE t.windowname = '区综合行政执法局'
	AND t.pviguid = '{0}') a
  order by a.receivedate desc", pviguid);
                IEnumerable<Audit_project_wModel> list = db.Database.SqlQuery<Audit_project_wModel>(sql);
                paging.Items = list.Skip(start).Take(limit).ToList();
                paging.Total = list.Count();
                return paging;
            }
        }
        #endregion

        #region 获取办结信息
        public Audit_project_wModel GetBanjieList(string pviguid)
        {
            Audit_project_wModel model = new Audit_project_wModel();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                string sql = string.Format(@"SELECT t.pviguid, t.receivedate, t.banwandate,t.banjiedate,t.banjieuserguid,t.banjieusername,t.windowname, h.opinion
FROM audit_project_w t LEFT JOIN workflow_workitem_history_w h ON t.pviguid = h.processversioninstanceguid
WHERE t.status = 90
	AND t.windowname = '区综合行政执法局'
	AND t.pviguid = '{0}'
	AND h.activityname = '办结'", pviguid);
                IEnumerable<Audit_project_wModel> queryable = db.Database.SqlQuery<Audit_project_wModel>(sql);
                model = queryable.FirstOrDefault();
                if (model != null)
                {
                    return model;
                }
                else
                {
                    return null;
                }
            }
        }
        #endregion

        #region 获取行政审批信息详情
        public Audit_project_wModel ApprovalDetail(string syncrowguid)
        {
            Audit_project_wModel model = new Audit_project_wModel();
            {
                EntitiesORCL mysqldb = new EntitiesORCL();

                string sql = string.Format(@"select t.syncrowguid,t.promise_day,t.pviguid,t.xiangmubh,t.flowsn,t.tasktype,t.taskcaseguid,
t.address,t.applyername,t.legal,t.certtype,t.certnum,t.contactpostcode,t.contactperson,
t.contactmobile,t.contactphone,t.remark,t.windowname,t.receiveusername,t.receivedate,
t.acceptuserdate,t.promiseenddate,t.banjiedate,t.acceptusername,t.banjieuserguid,t.banwandate,
t.row_id,t.projectname,his.processversioninstancename
from audit_project_w t 
left join workflow_workitem_history_w his on t.pviguid=his.processversioninstanceguid and his.activityname='办结'
where t.windowname='区综合行政执法局'
and t.status=90 
and to_char(t.receivedate,'yyyy')>=2017
and t.syncrowguid='{0}'", syncrowguid);
                List<Audit_project_wModel> sqlQueryable = mysqldb.Database.SqlQuery<Audit_project_wModel>(sql).ToList();
                IEnumerable<Audit_project_wModel> Queryable = from a in sqlQueryable
                                                              select new Audit_project_wModel
                                                              {
                                                                  #region 字段赋值
                                                                  pviguid = a.pviguid,
                                                                  xiangmubh = a.xiangmubh,
                                                                  flowsn = a.flowsn,
                                                                  tasktype = a.tasktype,
                                                                  taskcaseguid = a.taskcaseguid,
                                                                  address = a.address,
                                                                  applyername = a.applyername,
                                                                  legal = a.legal,
                                                                  certtype = a.certtype,
                                                                  certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                                                  certnum = a.certnum,
                                                                  contactpostcode = a.contactpostcode,
                                                                  contactperson = a.contactperson,
                                                                  promise_day = a.promise_day,
                                                                  contactmobile = a.contactmobile,
                                                                  contactphone = a.contactphone,
                                                                  remark = a.remark,
                                                                  windowname = a.windowname,
                                                                  receiveusername = a.receiveusername,
                                                                  receivedate = a.receivedate,
                                                                  acceptuserdate = a.acceptuserdate,
                                                                  promiseenddate = a.promiseenddate,
                                                                  banwandate = a.banwandate,
                                                                  banjiedate = a.banjiedate,
                                                                  activityname = a.activityname,
                                                                  processversioninstancename = a.processversioninstancename,
                                                                  opinion = a.opinion,
                                                                  acceptusername = a.acceptusername,
                                                                  banjieuserguid = a.banjieuserguid,
                                                                  banjieusername = a.banjieusername,
                                                                  row_id = a.row_id,
                                                                  projectname = a.projectname,
                                                                  advice = a.advice,
                                                                  OperatorForDisplayName = a.OperatorForDisplayName,
                                                                  syncrowguid = a.syncrowguid,
                                                                  #endregion
                                                              };
                return Queryable.FirstOrDefault();
            }
        }
        #endregion

        #region 获取流程详情
        /// /// <summary>
        /// 获取流程详情
        /// </summary>
        /// <param name="syncrowguid">对应表格数据编号</param>
        /// <param name="userid">用户名</param>
        /// <returns>详情model</returns>
        public approvalDetail GetApprovalDetail(string syncrowguid)
        {
            using (Entities db = new Entities())
            {

                #region 流程修改前
                //                string sql = string.Format(@"select wf1.status,wf1.wfsid,wf1.currentwfsaid,wf2.wfsaid,wf3.content teamdealadvice,wf3.remark address,wf3.wfsuid,wf5.nextid,wf2.wfdid tmpwfdid,users.displayname teammembername from wf_workflowspecifics wf1
                //left join wf_workflowspecificactivitys wf2 on wf1.wfsid=wf2.wfsid
                //inner join wf_workflowspecificusers wf3 on wf2.wfsaid=wf3.wfsaid
                //left join wf_workflowdetails wf5 on wf2.wfdid=wf5.wfdid
                //left join base_users users on wf3.userid=users.id
                //where wf1.tablename='audit_project_w' and wf1.tablenameid='{0}'
                //order by wf2.wfdid desc limit 1
                //", syncrowguid);
                //                IEnumerable<approvalDetail> queryable = db.Database.SqlQuery<approvalDetail>(sql);
                //                approvalDetail model = queryable.FirstOrDefault();

                //                string[] wfdid = { "2017070414250001", "2017070414250002", "2017070414250003", "2017070414250004" };
                //                if (model != null)
                //                {
                //                    string tmpwfdid = "";
                //                    if (model.tmpwfdid == "2017070414250003")
                //                    {
                //                        tmpwfdid = "2017070414250002";
                //                    }
                //                    else if (model.tmpwfdid == "2017070414250002")
                //                    {
                //                        tmpwfdid = "2017070414250001";
                //                    }
                //                    else
                //                    {
                //                        tmpwfdid = model.tmpwfdid;
                //                    }
                //                    string contentsql = string.Format(@"select wf2.wfsaid,wf3.userid,wf3.content officeadvice,users.displayname unitofficename,wf3.createtime from wf_workflowspecifics wf1
                //left join wf_workflowspecificactivitys wf2 on wf1.wfsid=wf2.wfsid
                //left join wf_workflowspecificusers wf3 on wf2.wfsaid=wf3.wfsaid
                //left join base_users users on wf3.userid=users.id
                //where wf1.wfsid='{0}' and wf2.wfdid='{1}'", model.wfsid, tmpwfdid);
                //                    IEnumerable<approvalDetail> contengqueryable = db.Database.SqlQuery<approvalDetail>(contentsql);
                //                    string wfdidsql = string.Format(@"select wf1.status,wf1.currentwfsaid,wf1.status,wf2.wfdid,wf5.nextid from wf_workflowspecifics wf1
                //left join wf_workflowspecificactivitys wf2 on wf1.currentwfsaid=wf2.wfsaid
                //left join wf_workflowdetails wf5 on wf2.wfdid=wf5.wfdid
                //where wf1.tablename='audit_project_w' and wf1.tablenameid='{0}'
                //", syncrowguid);
                //                    IEnumerable<approvalDetail> wfdidsqlqueryable = db.Database.SqlQuery<approvalDetail>(wfdidsql);
                //                    if (wfdidsqlqueryable.FirstOrDefault() != null)
                //                    {
                //                        model.wfdid = wfdidsqlqueryable.FirstOrDefault().wfdid;
                //                        model.nextid = wfdidsqlqueryable.FirstOrDefault().nextid;
                //                    }
                //                    model.officeadvice = contengqueryable.FirstOrDefault().officeadvice;
                //                    model.unitofficename = contengqueryable.FirstOrDefault().unitofficename;
                //                    model.createtime = contengqueryable.FirstOrDefault().createtime;
                //                }
                #endregion
                //获取当前流程
                string sql1 = string.Format(@"select users.displayname xzxkdealname,users.id archivedealid,wf3.content xzxkcontent,wf2.dealtime xzxkdealtime,wf3.satisfaction xzxkstarttime,wf3.processmode xzxkendtime,wf3.remark xzxkaddress,
users2.displayname unitofficename,users3.displayname teammembername,wf5.content officeadvice,wf4.dealtime officedealtime,wf7.remark address,wf7.content teamdealadvice,
wf6.dealtime createtime,users.displayname archivedealname,wf9.content archiveadvice,wf8.dealtime archivedealtime,file1.wfsuid xzxkwfsuid,file2.wfsuid 
from wf_workflowspecifics wf1
left join wf_workflowspecificactivitys wf2 on wf1.wfsid=wf2.wfsid and wf2.wfdid='2017070414250001' and wf2.`status`=2
left join wf_workflowspecificusers wf3 on wf2.wfsaid=wf3.wfsaid
left join base_users users on wf3.userid=users.id
left join wf_workflowspecificuserfiles file1 on wf3.wfsuid=file1.wfsuid
left join wf_workflowspecificactivitys wf4 on wf1.wfsid=wf4.wfsid and wf4.wfdid='2017070414250002' and wf4.`status`=2
left join wf_workflowspecificusers wf5 on wf4.wfsaid=wf5.wfsaid
left join base_users users2 on wf5.userid=users2.id
left join wf_workflowspecificactivitys wf6 on wf1.wfsid=wf6.wfsid and wf6.wfdid='2017070414250003'
left join wf_workflowspecificusers wf7 on wf6.wfsaid=wf7.wfsaid
left join base_users users3 on wf7.userid=users3.id
left join wf_workflowspecificuserfiles file2 on wf7.wfsuid=file2.wfsuid
left join wf_workflowspecificactivitys wf8 on wf1.wfsid=wf8.wfsid and wf8.wfdid='2017070414250004' and wf8.`status`=2
left join wf_workflowspecificusers wf9 on wf8.wfsaid=wf9.wfsaid
left join base_users users4 on wf9.userid=users4.id
where wf1.tablename='audit_project_w' and wf1.tablenameid='{0}'
", syncrowguid);
                IEnumerable<approvalDetail> queryable = db.Database.SqlQuery<approvalDetail>(sql1);
                approvalDetail model = db.Database.SqlQuery<approvalDetail>(sql1).FirstOrDefault();

                string sql = string.Format(@"select wf1.wfsid,wf1.currentwfsaid wfsaid,wf2.wfdid,wf3.nextid nextid,wf1.`status` status from wf_workflowspecifics wf1
left join wf_workflowspecificactivitys wf2 on wf1.wfsid=wf2.wfsid and wf2.`status`=1
left join wf_workflowdetails wf3 on wf2.wfdid=wf3.wfdid
where wf1.tablename='audit_project_w' and wf1.tablenameid='{0}'", syncrowguid);
                queryable = db.Database.SqlQuery<approvalDetail>(sql);
                if (queryable.FirstOrDefault() != null)
                {
                    model.wfsid = queryable.FirstOrDefault().wfsid;
                    model.wfsaid = queryable.FirstOrDefault().wfsaid;
                    model.wfdid = queryable.FirstOrDefault().wfdid;
                    model.nextid = queryable.FirstOrDefault().nextid;
                    model.status = queryable.FirstOrDefault().status;
                }
                return model;
            }
        }
        #endregion

        #region 获取附件类型
        public List<FileUploadClass> GetFileUpload(string wfsuid, string OriginPath, string smallPath)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> queryable = from a in db.wf_workflowspecificuserfiles
                                                        where a.wfsuid == wfsuid
                                                        select new FileUploadClass
                                                              {
                                                                  OriginalType = a.filetype,
                                                                  OriginalName = a.filename,
                                                                  OriginalPath = a.filepath,
                                                                  OriginalWholePath = OriginPath + a.filepath,
                                                                  thumbnailWholepath = smallPath + a.filepath,
                                                                  size = a.filesize,
                                                              };
                list = queryable.ToList();
            }
            return list;
        }
        #endregion

        #region web端列表接口
        /// <summary>
        /// 当月全部行政审批接口接口列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(List<Filter> filters, int start, int limit)
        {
            Paging<List<Audit_project_wModel>> paging = new Paging<List<Audit_project_wModel>>();
            List<Audit_project_wModel> list = new List<Audit_project_wModel>();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                Entities mysqldb = new Entities();
                DateTime date = DateTime.Now;
                int month = date.Month;
                string sql = string.Format(@"select distinct t.syncrowguid,t.promise_day,t.pviguid,t.xiangmubh,t.flowsn,t.tasktype,t.taskcaseguid,
t.address,t.applyername,t.legal,t.certtype,t.certnum,t.contactpostcode,t.contactperson,
t.contactmobile,t.contactphone,t.remark,t.windowname,t.receiveusername,t.receivedate,
t.acceptuserdate,t.promiseenddate,t.banjiedate,t.acceptusername,t.banjieuserguid,t.banwandate,
t.row_id,t.projectname,his.processversioninstancename
from audit_project_w t 
left join workflow_workitem_history_w his on t.pviguid=his.processversioninstanceguid and his.activityname='办结'
where t.windowname='区综合行政执法局'
and t.status=90 
and to_char(t.banjiedate,'yyyy')>=2017 and to_char(t.banjiedate,'yyyy')={0}
order by t.banjiedate desc", date.Year);
                List<Audit_project_wModel> sqlQueryable = db.Database.SqlQuery<Audit_project_wModel>(sql).ToList();
                IEnumerable<Audit_project_wModel> Queryable = from a in sqlQueryable
                                                              select new Audit_project_wModel
                                                              {
                                                                  #region 字段赋值
                                                                  pviguid = a.pviguid,
                                                                  xiangmubh = a.xiangmubh,
                                                                  flowsn = a.flowsn,
                                                                  tasktype = a.tasktype,
                                                                  taskcaseguid = a.taskcaseguid,
                                                                  address = a.address,
                                                                  applyername = a.applyername,
                                                                  legal = a.legal,
                                                                  certtype = a.certtype,
                                                                  certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                                                  certnum = a.certnum,
                                                                  contactpostcode = a.contactpostcode,
                                                                  contactperson = a.contactperson,
                                                                  promise_day = a.promise_day,
                                                                  contactmobile = a.contactmobile,
                                                                  contactphone = a.contactphone,
                                                                  remark = a.remark,
                                                                  windowname = a.windowname,
                                                                  receiveusername = a.receiveusername,
                                                                  receivedate = a.receivedate,
                                                                  acceptuserdate = a.acceptuserdate,
                                                                  promiseenddate = a.promiseenddate,
                                                                  banwandate = a.banwandate,
                                                                  banjiedate = a.banjiedate,
                                                                  activityname = a.activityname,
                                                                  processversioninstancename = a.processversioninstancename,
                                                                  opinion = a.opinion,
                                                                  acceptusername = a.acceptusername,
                                                                  banjieuserguid = a.banjieuserguid,
                                                                  banjieusername = a.banjieusername,
                                                                  row_id = a.row_id,
                                                                  projectname = a.projectname,
                                                                  advice = a.advice,
                                                                  OperatorForDisplayName = a.OperatorForDisplayName,
                                                                  syncrowguid = a.syncrowguid,
                                                                  #endregion
                                                              };
                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "row_id":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.row_id.ToString().Contains(value));
                                break;
                            case "projectname":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.projectname.Contains(value));
                                break;
                            case "applyername":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    Queryable = Queryable.Where(t => t.applyername.Contains(value));
                                }
                                break;
                            case "receivedatefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime receivedatefrom = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.receivedate >= receivedatefrom);
                                }
                                break;
                            case "receivedateto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime receivedateto = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.receivedate <= receivedateto);
                                }
                                break;
                        }
                    }
                }
                #endregion

                paging.Items = Queryable.OrderByDescending(a => a.banjiedate).Skip(start).Take(limit).ToList();
                paging.Total = Queryable.Count();

                return paging;
            }
        }
        #endregion

        /*20170901行政审批流程修改*/

        #region 获取行政审批待办列表
        public Paging<List<Audit_project_wModel>> GetToBeApprovalList(List<Filter> filters, int start, int limit, int userid, int status, bool isxzk)
        {
            Paging<List<Audit_project_wModel>> paging = new Paging<List<Audit_project_wModel>>();
            List<Audit_project_wModel> list = new List<Audit_project_wModel>();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                Entities mysqldb = new Entities();

                string sql = @"select distinct t.pviguid, t.syncrowguid, t.promise_day,t.xiangmubh,t.flowsn,t.tasktype,t.taskcaseguid,
t.address,t.applyername,t.legal,t.certtype,t.certnum,t.contactpostcode,t.contactperson,
t.contactmobile,t.contactphone,t.remark,t.windowname,t.receiveusername,t.receivedate,
t.acceptuserdate,t.promiseenddate,t.banjiedate,t.acceptusername,t.banjieuserguid,t.banwandate,
t.row_id,t.projectname,his.processversioninstancename from (
select * from 
(select row_number() over(partition by pviguid order by data_timestamp desc) rn,t.*
from audit_project_w t 
where t.windowname='区综合行政执法局'
and t.status=90
and to_char(t.banjiedate,'yyyy')>=2017 and to_char(t.banjiedate,'MM')>=8) a
where a.rn=1) t
left join WORKFLOW_WORKITEM_HISTORY_W  his on  t.pviguid=his.processversioninstanceguid and his.activityname='办结'
order by t.banjiedate desc
";
                List<Audit_project_wModel> sqlQueryable = db.Database.SqlQuery<Audit_project_wModel>(sql).ToList();
                IEnumerable<Audit_project_wModel> Queryable;

                if (isxzk && status == 0)
                {
                    #region 行政许可科待审批
                    Queryable = from a in sqlQueryable
                                join b in mysqldb.xzsp_disposes on a.pviguid equals b.xzspid into btmp
                                from c in btmp.DefaultIfEmpty()
                                where c == null
                                orderby a.banjiedate descending
                                select new Audit_project_wModel
                                {
                                    #region 字段赋值
                                    pviguid = a.pviguid,
                                    xiangmubh = a.xiangmubh,
                                    flowsn = a.flowsn,
                                    tasktype = a.tasktype,
                                    taskcaseguid = a.taskcaseguid,
                                    address = a.address,
                                    applyername = a.applyername,
                                    legal = a.legal,
                                    certtype = a.certtype,
                                    promise_day = a.promise_day,
                                    certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                    certnum = a.certnum,
                                    contactpostcode = a.contactpostcode,
                                    contactperson = a.contactperson,
                                    contactmobile = a.contactmobile,
                                    contactphone = a.contactphone,
                                    remark = a.remark,
                                    windowname = a.windowname,
                                    receiveusername = a.receiveusername,
                                    receivedate = a.receivedate,
                                    acceptuserdate = a.acceptuserdate,
                                    promiseenddate = a.promiseenddate,
                                    banwandate = a.banwandate,
                                    banjiedate = a.banjiedate,
                                    activityname = a.activityname,
                                    processversioninstancename = a.processversioninstancename,
                                    opinion = a.opinion,
                                    acceptusername = a.acceptusername,
                                    banjieuserguid = a.banjieuserguid,
                                    banjieusername = a.banjieusername,
                                    row_id = a.row_id,
                                    projectname = a.projectname,
                                    advice = a.advice,
                                    OperatorForDisplayName = a.OperatorForDisplayName,
                                    syncrowguid = a.syncrowguid,
                                    #endregion
                                };
                    #endregion
                }
                else if (isxzk && status == 3)
                {
                    #region 归档
                    Queryable = from a in sqlQueryable
                                join b in mysqldb.xzsp_disposes on a.pviguid equals b.xzspid into btmp
                                from c in btmp.DefaultIfEmpty()
                                where c != null && c.disposestate == 0 && c.disposeuserid == userid && c.stage == 3
                                orderby c.disposetime descending
                                select a;

                    //查询行政科审批的地址进行查询字段筛选
                    Queryable = from a in Queryable
                                join b in mysqldb.xzsp_disposes on a.pviguid equals b.xzspid into btmp
                                from c in btmp.DefaultIfEmpty()
                                where c.stage == 0
                                select new Audit_project_wModel
                                 {
                                     #region 字段赋值
                                     pviguid = a.pviguid,
                                     xiangmubh = a.xiangmubh,
                                     flowsn = a.flowsn,
                                     tasktype = a.tasktype,
                                     taskcaseguid = a.taskcaseguid,
                                     address = a.address,
                                     applyername = a.applyername,
                                     legal = a.legal,
                                     certtype = a.certtype,
                                     promise_day = a.promise_day,
                                     certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                     certnum = a.certnum,
                                     contactpostcode = a.contactpostcode,
                                     contactperson = a.contactperson,
                                     contactmobile = a.contactmobile,
                                     contactphone = a.contactphone,
                                     remark = a.remark,
                                     windowname = a.windowname,
                                     receiveusername = a.receiveusername,
                                     receivedate = a.receivedate,
                                     acceptuserdate = a.acceptuserdate,
                                     promiseenddate = a.promiseenddate,
                                     banwandate = a.banwandate,
                                     banjiedate = a.banjiedate,
                                     activityname = a.activityname,
                                     processversioninstancename = a.processversioninstancename,
                                     opinion = a.opinion,
                                     acceptusername = a.acceptusername,
                                     banjieuserguid = a.banjieuserguid,
                                     banjieusername = a.banjieusername,
                                     row_id = a.row_id,
                                     projectname = a.projectname,
                                     advice = a.advice,
                                     OperatorForDisplayName = a.OperatorForDisplayName,
                                     syncrowguid = a.syncrowguid,
                                     xzkspaddress = c != null ? c.address : "",
                                     #endregion
                                 };
                    #endregion
                }
                else
                {
                    #region 非行政许可科
                    Queryable = from a in sqlQueryable.Distinct()
                                join b in mysqldb.xzsp_disposes on a.pviguid equals b.xzspid into btmp
                                from c in btmp.DefaultIfEmpty()
                                where c != null && c.disposeuserid == userid && c.disposestate == status && c.stage != 3
                                orderby c.disposetime descending
                                select a;

                    Queryable = from a in Queryable
                                join b_join in mysqldb.xzsp_disposes on new { pviguid = a.pviguid, stage = 0 } equals new { pviguid=b_join.xzspid,stage=(int)b_join.stage} into btmp
                                from b in btmp.DefaultIfEmpty()
                                select new Audit_project_wModel
                                {
                                    #region 字段赋值
                                    pviguid = a.pviguid,
                                    xiangmubh = a.xiangmubh,
                                    flowsn = a.flowsn,
                                    tasktype = a.tasktype,
                                    taskcaseguid = a.taskcaseguid,
                                    address = a.address,
                                    applyername = a.applyername,
                                    legal = a.legal,
                                    certtype = a.certtype,
                                    promise_day = a.promise_day,
                                    certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                    certnum = a.certnum,
                                    contactpostcode = a.contactpostcode,
                                    contactperson = a.contactperson,
                                    contactmobile = a.contactmobile,
                                    contactphone = a.contactphone,
                                    remark = a.remark,
                                    windowname = a.windowname,
                                    receiveusername = a.receiveusername,
                                    receivedate = a.receivedate,
                                    acceptuserdate = a.acceptuserdate,
                                    promiseenddate = a.promiseenddate,
                                    banwandate = a.banwandate,
                                    banjiedate = a.banjiedate,
                                    activityname = a.activityname,
                                    processversioninstancename = a.processversioninstancename,
                                    opinion = a.opinion,
                                    acceptusername = a.acceptusername,
                                    banjieuserguid = a.banjieuserguid,
                                    banjieusername = a.banjieusername,
                                    row_id = a.row_id,
                                    projectname = a.projectname,
                                    advice = a.advice,
                                    OperatorForDisplayName = a.OperatorForDisplayName,
                                    syncrowguid = a.syncrowguid,
                                    xzkspaddress=b!=null?b.address:"",
                                    starttime=b!=null?b.starttime:null,
                                    endtime=b!=null?b.endtime:null,
                                    #endregion
                                };
                    //查询行政科审批的地址进行查询字段筛选
                    #endregion
                }

                #region 查询参数
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "row_id":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.row_id.ToString().Contains(value));
                                break;
                            case "projectname":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.projectname.Contains(value));
                                break;
                            case "applyername":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    Queryable = Queryable.Where(t => t.applyername.Contains(value));
                                }
                                break;
                            case "banjiedatefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedatefrom = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate >= banjiedatefrom);
                                }
                                break;
                            case "banjiedateto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedateto = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate <= banjiedateto);
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    Queryable = Queryable.Where(t => t.xzkspaddress != null && t.xzkspaddress.Contains(value));
                                }
                                break;
                        }
                    }
                }
                #endregion

                paging.Items = Queryable.Skip(start).Take(limit).ToList();
                paging.Total = Queryable.Count();

                return paging;
            }
        }
        #endregion

        #region 获取行政审批全部列表
        public Paging<List<Audit_project_wModel>> GetTheAllApprovalList(List<Filter> filters, int start, int limit)
        {
            Paging<List<Audit_project_wModel>> paging = new Paging<List<Audit_project_wModel>>();
            List<Audit_project_wModel> list = new List<Audit_project_wModel>();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                Entities mysqldb = new Entities();

                string sql = @"select distinct t.pviguid,t.syncrowguid, t.promise_day,t.xiangmubh,t.flowsn,t.tasktype,t.taskcaseguid,
t.address,t.applyername,t.legal,t.certtype,t.certnum,t.contactpostcode,t.contactperson,
t.contactmobile,t.contactphone,t.remark,t.windowname,t.receiveusername,t.receivedate,
t.acceptuserdate,t.promiseenddate,t.banjiedate,t.acceptusername,t.banjieuserguid,t.banwandate,
t.row_id,t.projectname,his.processversioninstancename from (
select * from 
(select row_number() over(partition by pviguid order by data_timestamp desc) rn,t.*
from audit_project_w t 
where t.windowname='区综合行政执法局'
and t.status=90
and to_char(t.banjiedate,'yyyy')>=2017) a
where a.rn=1) t
left join (select * from (select row_number() over(partition by processversioninstanceguid order by data_timestamp desc) rn,h.*
from WORKFLOW_WORKITEM_HISTORY_W h) a
where a.rn=1) his on  t.pviguid=his.processversioninstanceguid
order by t.banjiedate desc";
                List<Audit_project_wModel> sqlQueryable = db.Database.SqlQuery<Audit_project_wModel>(sql).ToList();
                IEnumerable<Audit_project_wModel> Queryable = from a in sqlQueryable
                                                              join b_join in mysqldb.xzsp_disposes on new { pviguid = a.pviguid, stage = 0 } equals new { pviguid = b_join.xzspid, stage = (int)b_join.stage } into btmp
                                                              from b in btmp.DefaultIfEmpty()
                                                              select new Audit_project_wModel
                                                              {
                                                                  #region 字段赋值
                                                                  pviguid = a.pviguid,
                                                                  xiangmubh = a.xiangmubh,
                                                                  flowsn = a.flowsn,
                                                                  tasktype = a.tasktype,
                                                                  taskcaseguid = a.taskcaseguid,
                                                                  address = a.address,
                                                                  applyername = a.applyername,
                                                                  legal = a.legal,
                                                                  certtype = a.certtype,
                                                                  certname = a.certtype == 22 ? "身份证" : a.certtype == 23 ? "军官证" : a.certtype == 24 ? "护照" : a.certtype == 25 ? "户口本" : a.certtype == 26 ? "港澳通行证" : a.certtype == 27 ? "台胞证" : a.certtype == 14 ? "组织机构代码证" : a.certtype == 11 ? "社会统一信用代码" : a.certtype == 12 ? "工商营业执照" : "其他",
                                                                  certnum = a.certnum,
                                                                  contactpostcode = a.contactpostcode,
                                                                  contactperson = a.contactperson,
                                                                  promise_day = a.promise_day,
                                                                  contactmobile = a.contactmobile,
                                                                  contactphone = a.contactphone,
                                                                  remark = a.remark,
                                                                  windowname = a.windowname,
                                                                  receiveusername = a.receiveusername,
                                                                  receivedate = a.receivedate,
                                                                  acceptuserdate = a.acceptuserdate,
                                                                  promiseenddate = a.promiseenddate,
                                                                  banwandate = a.banwandate,
                                                                  banjiedate = a.banjiedate,
                                                                  activityname = a.activityname,
                                                                  processversioninstancename = a.processversioninstancename,
                                                                  opinion = a.opinion,
                                                                  acceptusername = a.acceptusername,
                                                                  banjieuserguid = a.banjieuserguid,
                                                                  banjieusername = a.banjieusername,
                                                                  row_id = a.row_id,
                                                                  projectname = a.projectname,
                                                                  advice = a.advice,
                                                                  OperatorForDisplayName = a.OperatorForDisplayName,
                                                                  syncrowguid = a.syncrowguid,
                                                                  currentwfsaid = a.currentwfsaid,
                                                                  starttime = b != null ? b.starttime : null,
                                                                  endtime = b != null ? b.endtime : null,
                                                                  xzkspaddress = b != null ? b.address : null,
                                                                  #endregion
                                                              };

                List<Audit_project_wModel> tmplist = Queryable.ToList();
                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "row_id":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.row_id.ToString().Contains(value));
                                break;
                            case "projectname":
                                if (!string.IsNullOrEmpty(value))
                                    Queryable = Queryable.Where(t => t.projectname.Contains(value));
                                break;
                            case "applyername":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    Queryable = Queryable.Where(t => t.applyername.Contains(value));
                                }
                                break;
                            case "banjiedatefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedatefrom = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate >= banjiedatefrom);
                                }
                                break;
                            case "banjiedateto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime banjiedateto = Convert.ToDateTime(value);
                                    Queryable = Queryable.Where(t => t.banjiedate <= banjiedateto);
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    Queryable = Queryable.Where(t => t.xzkspaddress != null && t.xzkspaddress.Contains(value));
                                }
                                break;
                        }
                    }
                }
                #endregion

                paging.Items = Queryable.OrderByDescending(a => a.banjiedate).Skip(start).Take(limit).ToList();
                paging.Total = Queryable.Count();

                return paging;
            }
        }
        #endregion

        #region 行政科派遣中队内勤
        /// <summary>
        /// 行政科派遣中队内勤
        /// </summary>
        public int assignMidTeam(Audit_project_wModel model)
        {
            using (Entities db = new Entities())
            {
                int flag = 0;
                //派遣了就先给该条数据加入数据库中方便后面查询列表
                xzsp_disposes dispose = new xzsp_disposes();
                dispose.xzspid = model.pviguid; //审批数据的标识
                dispose.stage = 0;
                dispose.disposestate = 1;   //0未处理 1已处理
                dispose.disposeuserid = model.createuserid;
                dispose.disposetime = DateTime.Now;
                dispose.address = model.xzxkaddress;
                dispose.content = model.advice;
                dispose.starttime = Convert.ToDateTime(model.xzxkstarttime);
                dispose.endtime = Convert.ToDateTime(model.xzxkendtime);
                db.xzsp_disposes.Add(dispose);
                flag += db.SaveChanges();

                //添加附件
                foreach (FileClass file in model.filelist)
                {
                    xzsp_files xzspfile = new xzsp_files();
                    xzspfile.filetype = file.OriginalType;
                    xzspfile.filename = file.OriginalName;
                    xzspfile.filepath = file.OriginalPath;
                    xzspfile.sourceid = dispose.id;
                    xzspfile.filesize = file.size;
                    db.xzsp_files.Add(xzspfile);
                    db.SaveChanges();
                }

                //重新添加被派遣的中队
                string[] users = model.hidedealusername.Split(',');
                foreach (string user in users)
                {
                    if (user.Length > 0)
                    {
                        xzsp_disposes assign = new xzsp_disposes();
                        assign.xzspid = model.pviguid;
                        assign.disposeuserid = Convert.ToInt32(user);
                        assign.parentid = dispose.id;
                        assign.disposetime = DateTime.Now;
                        assign.stage = 1;     //处置阶段(0表示行政许可科派遣 1内勤阶段 2队员阶段 3 归档阶段)
                        assign.disposestate = 0;    //处理状态（0未处理 1已处理 ）
                        db.xzsp_disposes.Add(assign);
                        flag += db.SaveChanges();
                    }
                }
                return flag;
            }
        }
        #endregion

        #region 选择确定中队下班组成员
        /// <summary>
        /// 获取选择中队下有班组角色的成员
        /// </summary>
        /// <param name="parentid"></param>
        /// <returns></returns>
        public List<User> GetUnitsChild(int unitid)
        {
            List<User> list = new List<User>();

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select t.id ID,t.displayname DisplayName,t.phone from base_users t
inner join  (
select a.id,a.name from base_units a 
left join base_unittypes b on  a.unittypeid =b.id and b.id=4
where a.parentid={0}) h on t.unitid =h.id
inner join base_userroles j on t.id=j.userid and j.roleid=18
ORDER BY t.id asc", unitid);
                IEnumerable<User> queryable = db.Database.SqlQuery<User>(sql);
                list = queryable.ToList();
                return list;
            }
        }
        #endregion

        #region 中队内勤派遣队员
        public int assignTeamber(Audit_project_wModel model)
        {
            using (Entities db = new Entities())
            {
                //重新添加被派遣的中队
                int flag = 0;
                xzsp_disposes assignTeam = db.xzsp_disposes.FirstOrDefault(t => t.disposeuserid == model.createuserid && t.xzspid == model.pviguid);
                if (assignTeam != null)
                {
                    assignTeam.disposetime = DateTime.Now;
                    assignTeam.disposestate = 1;
                    assignTeam.content = model.advice;
                    //重新添加被派遣的班组成员
                    string[] users = model.hidedealusername.Split(',');
                    foreach (string user in users)
                    {
                        if (user.Length > 0)
                        {
                            xzsp_disposes assign = new xzsp_disposes();
                            assign.xzspid = model.pviguid;
                            assign.disposeuserid = Convert.ToInt32(user);
                            assign.disposetime = DateTime.Now;
                            assign.parentid = assignTeam.id;
                            assign.stage = 2; //处置阶段(0表示行政许可科派遣 1内勤阶段 2队员阶段 3 归档阶段)
                            assign.disposestate = 0;     //处理状态（0未处理 1已处理 ）
                            db.xzsp_disposes.Add(assign);
                            flag += db.SaveChanges();
                        }
                    }
                }
                return flag;
            }
        }
        #endregion

        #region 班组成员处理
        public int memberDeal(Audit_project_wModel model)
        {
            using (Entities db = new Entities())
            {
                //找到被派遣的队员
                int flag = 0;
                xzsp_disposes assign = db.xzsp_disposes.FirstOrDefault(t => t.disposeuserid == model.createuserid && t.xzspid == model.pviguid);
                if (assign != null)
                {
                    assign.disposestate = 1;     //处理状态（0未处理 1已处理 ）
                    assign.disposetime = DateTime.Now;
                    assign.address = model.geography;
                    assign.content = model.advice;
                    flag += db.SaveChanges();
                    //添加附件
                    foreach (FileClass file in model.filelist)
                    {
                        xzsp_files xzspfile = new xzsp_files();
                        xzspfile.filetype = file.OriginalType;
                        xzspfile.filename = file.OriginalName;
                        xzspfile.filepath = file.OriginalPath;
                        xzspfile.sourceid = assign.id;
                        xzspfile.filesize = file.size;
                        db.xzsp_files.Add(xzspfile);
                        db.SaveChanges();
                    }

                    //获取行政科的用户id
                    int? xzkuserid = (from a in db.xzsp_disposes
                                      where a.xzspid == assign.xzspid && a.stage == 0
                                      select a.disposeuserid).FirstOrDefault();

                    //查看是否已经添加归档操作
                    var isonfile = (from a in db.xzsp_disposes
                                    where a.xzspid == assign.xzspid && a.stage == 3
                                    select a.disposeuserid).FirstOrDefault();

                    if (isonfile == null)
                    {
                        //存在一个队员处理了就可以进行归档操作
                        xzsp_disposes xzkonfile = new xzsp_disposes();
                        xzkonfile.xzspid = assign.xzspid;
                        xzkonfile.stage = 3;
                        xzkonfile.disposestate = 0;
                        xzkonfile.disposetime = DateTime.Now;
                        xzkonfile.disposeuserid = xzkuserid;
                        xzkonfile.parentid = assign.id;
                        db.xzsp_disposes.Add(xzkonfile);
                        flag += db.SaveChanges();
                    }
                }
                return flag;
            }
        }
        #endregion

        #region 行政科进行归档
        public int xzkOnFile(Audit_project_wModel model)
        {
            using (Entities db = new Entities())
            {
                int flag = 0;
                xzsp_disposes onFile = db.xzsp_disposes.FirstOrDefault(t => t.disposeuserid == model.createuserid && t.xzspid == model.pviguid && t.stage == 3);
                if (onFile != null)
                {
                    onFile.content = model.advice;
                    onFile.disposetime = DateTime.Now;
                    onFile.disposestate = 1;
                }
                return flag += db.SaveChanges();
            }
        }
        #endregion

        #region 获取全部审批详情
        public approvalDetail GetFlowDetail(string pviguid, int userid)
        {
            using (Entities db = new Entities())
            {
                approvalDetail model = new approvalDetail();
                //获取行政科处理详情
                IEnumerable<approvalDetail> Queryable = from a in db.xzsp_disposes
                                                        join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                        from b in btmp.DefaultIfEmpty()
                                                        where a.xzspid == pviguid && a.stage == 0
                                                        select new approvalDetail
                                                              {
                                                                  starttime = a.starttime,
                                                                  endtime = a.endtime,
                                                                  xzxkaddress = a.address,
                                                                  xzxkcontent = a.content,
                                                                  xzxkdealname = b.displayname,
                                                                  xzxkdealtime = a.disposetime,
                                                                  xzkid = a.id,
                                                                  xzkstatus = a.disposestate,
                                                              };
                model = Queryable.FirstOrDefault();
                //获取当前审批信息所处流程状态
                var temp = (from a in db.xzsp_disposes
                            where a.disposeuserid == userid && a.xzspid == pviguid
                            orderby a.disposetime descending
                            select a.stage).FirstOrDefault();
                if (temp != null)
                {
                    model.currentstage = temp;
                }

                //获取当前用户处理状态
                temp = (from a in db.xzsp_disposes
                        where a.disposeuserid == userid && a.xzspid == pviguid
                        orderby a.disposetime descending
                        select a.disposestate).FirstOrDefault();
                if (temp != null)
                {
                    model.currentuserstate = temp;
                }
                if (Queryable.ToList().Count > 0)
                {
                    //获取行政科附件
                    model.filelist = getFileLists(Queryable.FirstOrDefault().xzkid);

                    //获取行政科归档信息
                    IEnumerable<approvalDetail> xzkOnFile = from a in db.xzsp_disposes
                                                            join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                            from b in btmp.DefaultIfEmpty()
                                                            where a.xzspid == pviguid && a.stage == 3 && a.disposestate == 1
                                                            select new approvalDetail
                                                            {
                                                                archiveadvice = a.content,
                                                                archivedealname = b.displayname,
                                                                archivedealtime = a.disposetime,
                                                                archiveOnFileStatus = 1,
                                                            };
                    if (xzkOnFile.FirstOrDefault() != null)
                    {
                        approvalDetail xzkOnFileModel = xzkOnFile.FirstOrDefault();
                        model.archiveadvice = xzkOnFileModel.archiveadvice;
                        model.archivedealname = xzkOnFileModel.archivedealname;
                        model.archivedealtime = xzkOnFileModel.archivedealtime;
                        model.archiveOnFileStatus = xzkOnFileModel.archiveOnFileStatus;
                    }

                    //获取派遣的中队内勤
                    IEnumerable<dispatchTeam> teamquerable = from a in db.xzsp_disposes
                                                             join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                             from b in btmp.DefaultIfEmpty()
                                                             join c_join in db.base_units on b.unitid equals c_join.id into ctmp
                                                             from c in ctmp.DefaultIfEmpty()
                                                             where a.xzspid == pviguid && a.stage == 1
                                                             select new dispatchTeam
                                                             {
                                                                 nqadvice = a.content,
                                                                 nqname = b.displayname,
                                                                 nqstatus = a.disposestate,
                                                                 nqdealtime = a.disposetime,
                                                                 nqid = a.id,
                                                                 nqunitid = b.unitid,
                                                                 nqunitname = c.name,
                                                             };
                    model.dispatchteamlist = teamquerable.ToList();
                    //获取内勤派遣的队员
                    foreach (dispatchTeam team in model.dispatchteamlist)
                    {
                        //获取派遣队员处理信息
                        IEnumerable<memberDeal> memberquerable = from a in db.xzsp_disposes
                                                                 join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                                 from b in btmp.DefaultIfEmpty()
                                                                 where a.xzspid == pviguid && a.stage == 2 && a.parentid == team.nqid
                                                                 orderby a.disposestate descending
                                                                 select new memberDeal
                                                                 {
                                                                     dyid = a.id,
                                                                     dyname = b.displayname,
                                                                     dydealtime = a.disposetime,
                                                                     dyaddress = a.address,
                                                                     dyadvice = a.content,
                                                                     dystatus = a.disposestate,
                                                                 };
                        List<member> dynames = new List<member>();
                        if (memberquerable.ToList().Count > 0)
                        {
                            team.memberlist = memberquerable.ToList();
                        }
                        //获取每个队员的附件信息
                        if (team.memberlist != null)
                        {
                            foreach (memberDeal member in team.memberlist)
                            {
                                member me = new member();
                                me.name = member.dyname;
                                me.state = member.dystatus;
                                dynames.Add(me);
                                member.filelist = getFileLists(member.dyid);
                            }
                        }
                        team.sendmember = dynames;
                    }
                }
                return model;
            }
        }
        #endregion

        #region 获取处理时的流程信息
        public approvalDetail GetOnDealDetail(string pviguid, int userid)
        {
            using (Entities db = new Entities())
            {
                approvalDetail model = new approvalDetail();

                //获取行政科处理详情
                IEnumerable<approvalDetail> Queryable = from a in db.xzsp_disposes
                                                        join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                        from b in btmp.DefaultIfEmpty()
                                                        where a.xzspid == pviguid && a.stage == 0
                                                        select new approvalDetail
                                                        {
                                                            starttime = a.starttime,
                                                            endtime = a.endtime,
                                                            xzxkaddress = a.address,
                                                            xzxkcontent = a.content,
                                                            xzxkdealname = b.displayname,
                                                            xzxkdealtime = a.disposetime,
                                                            xzkid = a.id,
                                                            xzkstatus = a.disposestate,
                                                        };
                model = Queryable.FirstOrDefault();
                if (Queryable.ToList().Count > 0)
                {
                    //获取行政科处理附件
                    model.filelist = getFileLists(Queryable.FirstOrDefault().xzkid);

                    //获取行政科归档信息
                    IEnumerable<approvalDetail> xzkOnFile = from a in db.xzsp_disposes
                                                            join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                            from b in btmp.DefaultIfEmpty()
                                                            where a.xzspid == pviguid && a.stage == 3 && a.disposestate == 1
                                                            select new approvalDetail
                                                            {
                                                                archiveadvice = a.content,
                                                                archivedealname = b.displayname,
                                                                archivedealtime = a.disposetime,
                                                                archiveOnFileStatus = 1,
                                                            };
                    if (xzkOnFile.FirstOrDefault() != null)
                    {
                        approvalDetail xzkOnFileModel = xzkOnFile.FirstOrDefault();
                        model.archiveadvice = xzkOnFileModel.archiveadvice;
                        model.archivedealname = xzkOnFileModel.archivedealname;
                        model.archivedealtime = xzkOnFileModel.archivedealtime;
                        model.archiveOnFileStatus = xzkOnFileModel.archiveOnFileStatus;
                    }

                    //获取当前审批信息所处流程状态
                    var temp = (from a in db.xzsp_disposes
                                where a.disposeuserid == userid && a.xzspid == pviguid
                                orderby a.disposetime descending
                                select a.stage).FirstOrDefault();
                    if (temp != null)
                    {
                        model.currentstage = temp;
                    }

                    //获取当前用户处理状态
                    temp = (from a in db.xzsp_disposes
                            where a.disposeuserid == userid && a.xzspid == pviguid
                            orderby a.disposetime descending
                            select a.disposestate).FirstOrDefault();
                    if (temp != null)
                    {
                        model.currentuserstate = temp;
                    }

                    //获取当前队员处理信息
                    IEnumerable<memberDeal> memberquerable = from a in db.xzsp_disposes
                                                             join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                             from b in btmp.DefaultIfEmpty()
                                                             where a.xzspid == pviguid && a.stage == 2 && a.disposeuserid == userid
                                                             select new memberDeal
                                                             {
                                                                 dyid = a.id,
                                                                 dyname = b.displayname,
                                                                 dydealtime = a.disposetime,
                                                                 dyaddress = a.address,
                                                                 dyadvice = a.content,
                                                                 dystatus = a.disposestate,
                                                                 dysourceid = a.parentid,
                                                             };
                    //获取当前队员处理附件
                    if (memberquerable.ToList().Count > 0)
                    {
                        memberquerable.FirstOrDefault().filelist = getFileLists(memberquerable.FirstOrDefault().dyid);
                        int? dysourceid = memberquerable.FirstOrDefault().dysourceid;
                        //获取派遣的内勤信息
                        IEnumerable<dispatchTeam> teamquerable = from a in db.xzsp_disposes
                                                                 join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                                 from b in btmp.DefaultIfEmpty()
                                                                 where a.xzspid == pviguid && a.stage == 1 && a.id == dysourceid
                                                                 select new dispatchTeam
                                                                 {
                                                                     nqadvice = a.content,
                                                                     nqname = b.displayname,
                                                                     nqstatus = a.disposestate,
                                                                     nqdealtime = a.disposetime,
                                                                     nqid = a.id,
                                                                     nqunitid = b.unitid,
                                                                 };
                        if (teamquerable.ToList().Count > 0)
                        {
                            dispatchTeam teammodel = teamquerable.FirstOrDefault();
                            memberDeal membermodel = memberquerable.FirstOrDefault();
                            //获取派遣队员处理信息
                            IEnumerable<memberDeal> allmemberquerable = from a in db.xzsp_disposes
                                                                        join b_join in db.base_users on a.disposeuserid equals b_join.id into btmp
                                                                        from b in btmp.DefaultIfEmpty()
                                                                        where a.xzspid == pviguid && a.stage == 2 && a.parentid == teammodel.nqid
                                                                        orderby a.disposestate descending
                                                                        select new memberDeal
                                                                        {
                                                                            dyid = a.id,
                                                                            dyname = b.displayname,
                                                                            dydealtime = a.disposetime,
                                                                            dyaddress = a.address,
                                                                            dyadvice = a.content,
                                                                            dystatus = a.disposestate,
                                                                        };
                            List<member> dynames = new List<member>();
                            if (allmemberquerable.ToList().Count > 0)
                            {
                                foreach (memberDeal member in allmemberquerable.ToList())
                                {
                                    member me = new member();
                                    me.name = member.dyname;
                                    me.state = member.dystatus;
                                    dynames.Add(me);
                                }
                            }

                            teammodel.sendmember = dynames;
                            if (teammodel != null && membermodel != null)
                            {
                                teammodel.memberlist = new List<memberDeal>();
                                teammodel.memberlist.Add(membermodel);
                                model.dispatchteamlist = new List<dispatchTeam>();
                                model.dispatchteamlist.Add(teammodel);
                            }

                        }
                    }
                }
                return model;
            }
        }
        #endregion

        #region 获取附件
        public List<FileClass> getFileLists(int xzspid)
        {
            using (Entities db = new Entities())
            {
                IEnumerable<FileClass> Queryable = from a in db.xzsp_files
                                                   where a.sourceid == xzspid
                                                   select new FileClass
                                                   {
                                                       OriginalPath = a.filepath,
                                                       OriginalName = a.filename,
                                                       OriginalType = a.filetype,
                                                       size = a.filesize,
                                                   };

                List<FileClass> lists = Queryable.ToList();
                return lists;
            }
        }
        #endregion

    }
}
