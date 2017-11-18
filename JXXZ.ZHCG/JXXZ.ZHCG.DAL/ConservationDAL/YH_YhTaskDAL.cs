using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.ConservationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ConservationDAL
{
    public class YH_YhTaskDAL
    {
        /// <summary>
        /// 养护待办已办列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status">1待办2已办</param>
        /// <returns></returns>
        public List<YhtaskList> GetYhtaskList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (SELECT
wfs.wfsid,
wfs.wfsname,
wfs.`status`,
wf.wfid,
wf.wfname,
wfsa.wfdid,
wfd.wfdname,
wfsa.wfsaid,
yh.yhtaskid,
zd1.zd_name AS wtlyname,
zd2.zd_name AS yhlxname,
zd3.zd_name AS wtdlname,
zd4.zd_name AS wtxlname,
zd5.zd_name AS yhdxname,
zd6.zd_name AS wtxzname,
yh.wtaddress,
yh.createtime,
yhgs.companyname,
yhht.contractname,
yh.foundtime,
yh.workload,
yh.outlay,
yh.yhcompany,
yh.yhcontract,
yh.wtsource
from wf_workflowspecifics wfs
inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join wf_workflows wf on wf.wfid=wfs.wfid
inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
inner join yh_yhtasks yh on wfs.TABLENAMEID=yhtaskid

LEFT JOIN yh_companys yhgs on yh.yhcompany=yhgs.companyid
LEFT JOIN yh_contracts yhht on yh.yhcontract=yhht.contractid

LEFT JOIN base_zds zd1 on yh.wtsource =zd1.zd_id and zd1.zd_type='type_yhrw_wtly'
LEFT JOIN base_zds zd2 on yh.yhtype =zd2.zd_id and zd2.zd_type='type_yhrw_yhlx'
LEFT JOIN base_zds zd3 on yh.wtbigclass =zd3.zd_id and zd3.zd_type='type_yhrw_wtdl'
LEFT JOIN base_zds zd4 on yh.wtsmallclass =zd4.zd_id and zd4.zd_type='type_yhrw_wtxl'
LEFT JOIN base_zds zd5 on yh.yhobject =zd5.zd_id and zd5.zd_type='type_yhrw_yhdx'
LEFT JOIN base_zds zd6 on yh.wtnature =zd6.zd_id and zd6.zd_type='type_yhrw_wtxz'
where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where userid='{0}' and status='{1}'
                           )
                         )
ORDER BY
wfsa.createtime DESC) tab1 GROUP BY tab1.yhtaskid", userid, status);
                IEnumerable<YhtaskList> queryable = db.Database.SqlQuery<YhtaskList>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            //case "wfdname":
                            //    if (!string.IsNullOrEmpty(value))
                            //    {
                            //        queryable = queryable.Where(t => t.wfdname.Contains(value));
                            //    }
                            //    break;
                            case "yhcompany":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcompany == id);
                                }
                                break;
                            case "yhcontract":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcontract==id);
                                }
                                break;
                            case "wtsource":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtsource==value);
                                }
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtaddress.Contains(value));
                                }
                                break;
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                }
                                break;
                        }
                    }
                }
                List<YhtaskList> lists = new List<YhtaskList>();
                lists = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
                //list = list.OrderByDescending(t => t.createtime).Skip(start).Take(limit);
                //string wfdid = "2017021410240010,2017021410240003,2017021410240007";
                //foreach (var item in list)
                //{
                //    item.attachment = GetCitizenServicesAttr(item.citizenid, wfdid);
                //    lists.Add(item);
                //}
                return lists.ToList();
            }

        }

        /// <summary>
        /// 养护待办已办数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status">1待办2已办</param>
        /// <returns></returns>
        public int GetYhtaskCount(List<Filter> filters, int userid, int status)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (SELECT
wfs.wfsid,
wfs.wfsname,
wfs.`status`,
wf.wfid,
wf.wfname,
wfsa.wfdid,
wfd.wfdname,
wfsa.wfsaid,
yh.yhtaskid,
zd1.zd_name AS wtlyname,
zd2.zd_name AS yhlxname,
zd3.zd_name AS wtdlname,
zd4.zd_name AS wtxlname,
zd5.zd_name AS yhdxname,
zd6.zd_name AS wtxzname,
yh.wtaddress,
yh.createtime,
yhgs.companyname,
yhht.contractname,
yh.foundtime,
yh.workload,
yh.outlay,
yh.yhcompany,
yh.yhcontract,
yh.wtsource
from wf_workflowspecifics wfs
inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join wf_workflows wf on wf.wfid=wfs.wfid
inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
inner join yh_yhtasks yh on wfs.TABLENAMEID=yhtaskid

LEFT JOIN yh_companys yhgs on yh.yhcompany=yhgs.companyid
LEFT JOIN yh_contracts yhht on yh.yhcontract=yhht.contractid

LEFT JOIN base_zds zd1 on yh.wtsource =zd1.zd_id and zd1.zd_type='type_yhrw_wtly'
LEFT JOIN base_zds zd2 on yh.yhtype =zd2.zd_id and zd2.zd_type='type_yhrw_yhlx'
LEFT JOIN base_zds zd3 on yh.wtbigclass =zd3.zd_id and zd3.zd_type='type_yhrw_wtdl'
LEFT JOIN base_zds zd4 on yh.wtsmallclass =zd4.zd_id and zd4.zd_type='type_yhrw_wtxl'
LEFT JOIN base_zds zd5 on yh.yhobject =zd5.zd_id and zd5.zd_type='type_yhrw_yhdx'
LEFT JOIN base_zds zd6 on yh.wtnature =zd6.zd_id and zd6.zd_type='type_yhrw_wtxz'
where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where userid='{0}' and status='{1}'
                           )
                         )
ORDER BY
wfsa.createtime DESC) tab1 GROUP BY tab1.yhtaskid", userid, status);
                IEnumerable<YhtaskList> queryable = db.Database.SqlQuery<YhtaskList>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "yhcompany":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcompany == id);
                                }
                                break;
                            case "yhcontract":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcontract == id);
                                }
                                break;
                            case "wtsource":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtsource == value);
                                }
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtaddress.Contains(value));
                                }
                                break;
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                }
                                break;
                        }
                    }
                }

                return queryable.Count();
            }

        }





        /// <summary>
        /// 养护全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status">1待办2已办</param>
        /// <returns></returns>
        public List<YhtaskList> GetAllYhtaskList(List<Filter> filters, int start, int limit)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (SELECT
wfs.wfsid,
wfs.wfsname,
wfs.`status`,
wf.wfid,
wf.wfname,
wfsa.wfdid,
wfd.wfdname,
wfsa.wfsaid,
yh.yhtaskid,
zd1.zd_name AS wtlyname,
zd2.zd_name AS yhlxname,
zd3.zd_name AS wtdlname,
zd4.zd_name AS wtxlname,
zd5.zd_name AS yhdxname,
zd6.zd_name AS wtxzname,
yh.wtaddress,
yh.createtime,
yhgs.companyname,
yhht.contractname,
yh.foundtime,
yh.workload,
yh.outlay,
yh.yhcompany,
yh.yhcontract,
yh.wtsource
from wf_workflowspecifics wfs
inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join wf_workflows wf on wf.wfid=wfs.wfid
inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
inner join yh_yhtasks yh on wfs.TABLENAMEID=yhtaskid

LEFT JOIN yh_companys yhgs on yh.yhcompany=yhgs.companyid
LEFT JOIN yh_contracts yhht on yh.yhcontract=yhht.contractid

LEFT JOIN base_zds zd1 on yh.wtsource =zd1.zd_id and zd1.zd_type='type_yhrw_wtly'
LEFT JOIN base_zds zd2 on yh.yhtype =zd2.zd_id and zd2.zd_type='type_yhrw_yhlx'
LEFT JOIN base_zds zd3 on yh.wtbigclass =zd3.zd_id and zd3.zd_type='type_yhrw_wtdl'
LEFT JOIN base_zds zd4 on yh.wtsmallclass =zd4.zd_id and zd4.zd_type='type_yhrw_wtxl'
LEFT JOIN base_zds zd5 on yh.yhobject =zd5.zd_id and zd5.zd_type='type_yhrw_yhdx'
LEFT JOIN base_zds zd6 on yh.wtnature =zd6.zd_id and zd6.zd_type='type_yhrw_wtxz'
where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<> 3
                           )
                         )
ORDER BY
wfsa.createtime DESC) tab1 GROUP BY tab1.yhtaskid");
                IEnumerable<YhtaskList> queryable = db.Database.SqlQuery<YhtaskList>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "yhcompany":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcompany == id);
                                }
                                break;
                            case "yhcontract":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcontract == id);
                                }
                                break;
                            case "wtsource":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtsource == value);
                                }
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtaddress.Contains(value));
                                }
                                break;
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value)); 
                                }
                                break;
                        }
                    }
                }
                List<YhtaskList> lists = new List<YhtaskList>();
                lists = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();

                return lists.ToList();
            }

        }

        /// <summary>
        /// 养护待办已办数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status">1待办2已办</param>
        /// <returns></returns>
        public int GetAllYhtaskCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (SELECT
wfs.wfsid,
wfs.wfsname,
wfs.`status`,
wf.wfid,
wf.wfname,
wfsa.wfdid,
wfd.wfdname,
wfsa.wfsaid,
yh.yhtaskid,
zd1.zd_name AS wtlyname,
zd2.zd_name AS yhlxname,
zd3.zd_name AS wtdlname,
zd4.zd_name AS wtxlname,
zd5.zd_name AS yhdxname,
zd6.zd_name AS wtxzname,
yh.wtaddress,
yh.createtime,
yhgs.companyname,
yhht.contractname,
yh.foundtime,
yh.workload,
yh.outlay,
yh.yhcompany,
yh.yhcontract,
yh.wtsource
from wf_workflowspecifics wfs
inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join wf_workflows wf on wf.wfid=wfs.wfid
inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
inner join yh_yhtasks yh on wfs.TABLENAMEID=yhtaskid

LEFT JOIN yh_companys yhgs on yh.yhcompany=yhgs.companyid
LEFT JOIN yh_contracts yhht on yh.yhcontract=yhht.contractid

LEFT JOIN base_zds zd1 on yh.wtsource =zd1.zd_id and zd1.zd_type='type_yhrw_wtly'
LEFT JOIN base_zds zd2 on yh.yhtype =zd2.zd_id and zd2.zd_type='type_yhrw_yhlx'
LEFT JOIN base_zds zd3 on yh.wtbigclass =zd3.zd_id and zd3.zd_type='type_yhrw_wtdl'
LEFT JOIN base_zds zd4 on yh.wtsmallclass =zd4.zd_id and zd4.zd_type='type_yhrw_wtxl'
LEFT JOIN base_zds zd5 on yh.yhobject =zd5.zd_id and zd5.zd_type='type_yhrw_yhdx'
LEFT JOIN base_zds zd6 on yh.wtnature =zd6.zd_id and zd6.zd_type='type_yhrw_wtxz'
where wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<> 3
                           )
                         )
ORDER BY
wfsa.createtime DESC) tab1 GROUP BY tab1.yhtaskid");
                IEnumerable<YhtaskList> queryable = db.Database.SqlQuery<YhtaskList>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "yhcompany":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcompany == id);
                                }
                                break;
                            case "yhcontract":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = int.Parse(value);
                                    queryable = queryable.Where(t => t.yhcontract == id);
                                }
                                break;
                            case "wtsource":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtsource == value);
                                }
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wtaddress.Contains(value));
                                }
                                break;
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                }
                                break;
                        }
                    }
                }

                return queryable.Count();
            }

        }


        /// <summary>
        /// 养护任务详情
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        public YhtaskModel GetYHTaskModel(string wfsid)
        {
            YhtaskModel model = new YhtaskModel();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (SELECT
wfs.wfsid,
wfs.wfsname,
wfs.`status`,
wf.wfid,
wf.wfname,
wfsa.wfdid,
wfd.wfdname,
wfsa.wfsaid,
yh.yhtaskid,
zd1.zd_name AS wtlyname,
zd2.zd_name AS yhlxname,
zd3.zd_name AS wtdlname,
zd4.zd_name AS wtxlname,
zd5.zd_name AS yhdxname,
zd6.zd_name AS wtxzname,
yh.wtaddress,
yh.wtdescribe,
yh.fileename,
yh.weather,
yh.createtime,
yhgs.companyname,
yhht.contractname,
yh.foundtime,
yh.workload,
yh.points,
yh.debit,
yh.sendusername,
yh.geography84,
yh.geography2000,
yh.duetime,
yh.sendopinion,
yh.outlay,
yh.pqrid as clrid,
yh.pqrid
from wf_workflowspecifics wfs
inner join wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and wfs.CURRENTWFSAID=wfsa.wfsaid
inner join wf_workflows wf on wf.wfid=wfs.wfid
inner join wf_workflowdetails wfd on wfsa.wfdid=wfd.wfdid
inner join yh_yhtasks yh on wfs.TABLENAMEID=yhtaskid

LEFT JOIN yh_companys yhgs on yh.yhcompany=yhgs.companyid
LEFT JOIN yh_contracts yhht on yh.yhcontract=yhht.contractid

LEFT JOIN base_zds zd1 on yh.wtsource =zd1.zd_id and zd1.zd_type='type_yhrw_wtly'
LEFT JOIN base_zds zd2 on yh.yhtype =zd2.zd_id and zd2.zd_type='type_yhrw_yhlx'
LEFT JOIN base_zds zd3 on yh.wtbigclass =zd3.zd_id and zd3.zd_type='type_yhrw_wtdl'
LEFT JOIN base_zds zd4 on yh.wtsmallclass =zd4.zd_id and zd4.zd_type='type_yhrw_wtxl'
LEFT JOIN base_zds zd5 on yh.yhobject =zd5.zd_id and zd5.zd_type='type_yhrw_yhdx'
LEFT JOIN base_zds zd6 on yh.wtnature =zd6.zd_id and zd6.zd_type='type_yhrw_wtxz'
where wfs.wfsid='{0}' and  wfs.wfsid in (
                           select wfsid from wf_workflowspecificactivitys where wfsaid in (
                             select wfsaid from wf_workflowspecificusers where status<> 3
                           )
                         )
ORDER BY
wfsa.createtime DESC) tab1 GROUP BY tab1.yhtaskid", wfsid);
                IEnumerable<YhtaskModel> queryable = db.Database.SqlQuery<YhtaskModel>(sql);

                model = queryable.FirstOrDefault();

                if (model != null)
                {
                    if (model.duetime != null)
                        model.limittime = model.foundtime.AddDays((double)model.duetime);
                    else
                        model.duetime = 0;
                    if (model.workload == null)
                        model.workload = 0;
                    if (model.outlay == null)
                        model.outlay = 0;
                    string wfdid = "2017040610570001,2017040610570003";
                    model.attachment = GetYHTaskAttr(model.yhtaskid, wfdid);
                }
            }
            return model;
        }


        /// <summary>
        /// 获取执法事件图片
        /// </summary>
        /// <param name="ZFSJID">执法事件ID</param>
        /// <param name="WFDID">环节ID</param>
        /// <returns></returns>
        public List<Attachment> GetYHTaskAttr(string citizenid, string wfdids)
        {
            Entities db = new Entities();
            string[] wfdid = wfdids.Split(',');
            IEnumerable<Attachment> list = null;
            List<Attachment> lists = new List<Attachment>();
            foreach (var item in wfdid)
            {
                string sql = string.Format(@"select wff.FILEPATH,wff.FILEID,wff.FILENAME,wff.FILETYPE,wfsa.WFDID,wff.filesize as size
from   WF_WORKFLOWSPECIFICS wfs 
left join WF_WORKFLOWSPECIFICACTIVITYS wfsa on wfs.WFSID=wfsa.WFSID
left join WF_WORKFLOWSPECIFICUSERS wfu on wfu.WFSAID=wfsa.WFSAID
left join WF_WORKFLOWSPECIFICUSERFILES wff on wff.WFSUID=wfu.WFSUID
where wfs.TABLENAMEID='{0}' and wfsa.WFDID='{1}' and wff.FILEID is not null ", citizenid, item);
                list = db.Database.SqlQuery<Attachment>(sql);
                foreach (var Modelitem in list.ToList())
                {
                    Modelitem.path = "YhTaskOriginalPath";
                    lists.Add(Modelitem);
                }
            }


            return lists;
        }

        public void UpdateCitizenProcess(yh_yhtasks model)
        {
            using (Entities db = new Entities())
            {
                yh_yhtasks yhmodel = db.yh_yhtasks.FirstOrDefault(a => a.yhtaskid == model.yhtaskid);

                if (yhmodel != null)
                {
                    yhmodel.pqrid = model.pqrid;
                    db.SaveChanges();
                }
            }
        }


        public QuantityModel GetyhtaskNum(int userid)
        {
            QuantityModel model = new QuantityModel();
            List<Filter> filters = new List<Filter>();
            model.UpcomingTaskQuantity = GetYhtaskCount(filters, userid, 1);
            return model;
        }

    }
}
