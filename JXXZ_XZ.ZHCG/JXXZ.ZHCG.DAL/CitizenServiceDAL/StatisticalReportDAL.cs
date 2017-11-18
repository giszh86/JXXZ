using JXXZ.ZHCG.DAL.WorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace JXXZ.ZHCG.DAL.CitizenServiceDAL
{
    public class StatisticalReportDAL
    {
        public List<StatisticalReportModel> GetEventReport(List<Filter> filters, int start, int limit)
        {
            List<StatisticalReportModel> list = new List<StatisticalReportModel>();
            using (Entities db = new Entities())
            {
                string gdsql = string.Format(@"select * from (
select sc.citizenid,sc.complainant,sc.contactphone,sc.foundtime,sc.satisfaction,sc.gdsj as archivingtime,sc.sourceid,ss.`name` as bigclassname,bunit.`name` as unitname ,sc.eventid from sm_citizenservices sc 
LEFT JOIN wf_workflowspecifics wfs on sc.citizenid = wfs.tablenameid and wfs.tablename='sm_citizenservices'
LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and (wfsa.wfdid='2017021410240003' or wfsa.wfdid='2017021410240008')
left join wf_workflowspecificusers wfsas on wfsa.wfsaid = wfsas.wfsaid
left join base_users buser on wfsas.userid =buser.id
left join base_units bunit on buser.unitid = bunit.id
LEFT JOIN sm_sources ss on sc.sourceid = ss.sourceid
where sc.gdsj is not NULL ORDER BY wfsas.dealtime desc 
) tab1 GROUP BY tab1.citizenid");
                IEnumerable<StatisticalReportModel> gdqueryable = db.Database.SqlQuery<StatisticalReportModel>(gdsql);



                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    gdqueryable = gdqueryable.Where(t => t.sourceid == id);
                                }
                                break;
                            case "moyear":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    gdqueryable = gdqueryable.Where(t => t.foundtime.Value.Year == id);
                                }
                                break;
                            case "mmonth":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    gdqueryable = gdqueryable.Where(t => t.foundtime.Value.Month == id);
                                }
                                break;
                        }
                    }

                }
                list = gdqueryable.OrderByDescending(t => t.foundtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        public int GetEventReportCount(List<Filter> filters)
        {
            List<StatisticalReportModel> list = new List<StatisticalReportModel>();
            using (Entities db = new Entities())
            {
                string gdsql = string.Format(@"select * from (
select sc.citizenid,wfsas.dealtime,sc.complainant,sc.contactphone,sc.foundtime,sc.satisfaction,sc.gdsj,sc.sourceid,ss.`name` as bigclassname,bunit.`name` as unitname ,sc.eventid from sm_citizenservices sc 
LEFT JOIN wf_workflowspecifics wfs on sc.citizenid = wfs.tablenameid and wfs.tablename='sm_citizenservices'
LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and (wfsa.wfdid='2017021410240003' or wfsa.wfdid='2017021410240008')
left join wf_workflowspecificusers wfsas on wfsa.wfsaid = wfsas.wfsaid
left join base_users buser on wfsas.userid =buser.id
left join base_units bunit on buser.unitid = bunit.id
LEFT JOIN sm_sources ss on sc.sourceid = ss.sourceid
where sc.gdsj is not NULL ORDER BY wfsas.dealtime desc 
) tab1 GROUP BY tab1.citizenid");
                IEnumerable<StatisticalReportModel> gdqueryable = db.Database.SqlQuery<StatisticalReportModel>(gdsql);



                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    gdqueryable = gdqueryable.Where(t => t.sourceid == id);
                                }
                                break;
                            case "moyear":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    gdqueryable = gdqueryable.Where(t => t.foundtime.Value.Year == id);
                                }
                                break;
                            case "mmonth":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    gdqueryable = gdqueryable.Where(t => t.foundtime.Value.Month == id);
                                }
                                break;
                        }
                    }

                }

                return gdqueryable.Count();
            }
        }

        /// <summary>
        /// 市民事件统计
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public DataTable ClassificationStatistics(int year)
        {

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select  tab1.1 as yuefen,count(sc.sourceid) scount,ss.name as sname from ( select 1 
                UNION
                SELECT 2
                UNION 
                select 3
                UNION 
                select 4
                UNION
                select 5
                UNION
                SELECT 6
                UNION 
                select 7
                UNION 
                select 8
                UNION
                select 9
                UNION
                SELECT 10
                UNION 
                select 11
                UNION 
                select 12) tab1 
                left join sm_citizenservices sc on tab1.1= date_format(sc.createtime,'%m')  
                right join sm_sources ss on ss.sourceid=sc.sourceid
                where year(sc.createtime)='{0}'
                group by sc.sourceid,date_format(sc.createtime,'%m')
                HAVING  tab1.1 is not NULL", year);

                IEnumerable<ClassificationStatisticsModel> list = db.Database.SqlQuery<ClassificationStatisticsModel>(sql);
                SM_SourcesDAL smsdal = new SM_SourcesDAL();
                List<SM_SourcesModel> smslist = smsdal.GetSourcesTypes();
                SM_SourcesModel smmodel = new SM_SourcesModel();
                smmodel.Name = "月份";
                smslist.Insert(0, smmodel);

                DataTable dt = new DataTable();

                foreach (SM_SourcesModel item in smslist)
                {
                    if (!dt.Columns.Contains(item.Name))
                    {
                        dt.Columns.Add(item.Name);
                    }

                    for (int i = 1; i < 14; i++)
                    {
                        DataRow dr = dt.NewRow();
                        if (item.Name == "月份")
                        {
                            dt.Rows.Add(dr);
                            dr[item.Name] = i + "月";
                            if (i == 13)
                                dr[item.Name] = "合计";
                        }
                        else
                        {
                            dt.Rows[i - 1][item.Name] = "0";
                        }
                    }
                }

                foreach (ClassificationStatisticsModel model in list)
                {
                    dt.Rows[(model.yuefen - 1)][model.sname] = model.scount.ToString();
                }
                string sumsql = @"SELECT sum(info.scount) sumcount,info.sname from (" + sql + ") info GROUP BY info.sname";
                IEnumerable<ClassificationStatisticsModel> sumlist = db.Database.SqlQuery<ClassificationStatisticsModel>(sumsql);

                foreach (ClassificationStatisticsModel model in sumlist)
                {
                    dt.Rows[12][model.sname] = model.sumcount.ToString();
                }

                return dt;
            }

        }

        public List<StatisticalReportModel> GetEventReport(string year, string month, string sourceid)
        {
            List<StatisticalReportModel> list = new List<StatisticalReportModel>();
            using (Entities db = new Entities())
            {
                string gdsql = string.Format(@"select * from (
select sc.citizenid,sc.complainant,sc.contactphone,sc.foundtime,sc.satisfaction,sc.gdsj as archivingtime,sc.sourceid,ss.`name` as bigclassname,bunit.`name` as unitname ,sc.eventid from sm_citizenservices sc 
LEFT JOIN wf_workflowspecifics wfs on sc.citizenid = wfs.tablenameid and wfs.tablename='sm_citizenservices'
LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid and (wfsa.wfdid='2017021410240003' or wfsa.wfdid='2017021410240008')
left join wf_workflowspecificusers wfsas on wfsa.wfsaid = wfsas.wfsaid
left join base_users buser on wfsas.userid =buser.id
left join base_units bunit on buser.unitid = bunit.id
LEFT JOIN sm_sources ss on sc.sourceid = ss.sourceid
where sc.gdsj is not NULL ORDER BY wfsas.dealtime desc 
) tab1 GROUP BY tab1.citizenid");
                IEnumerable<StatisticalReportModel> queryable = db.Database.SqlQuery<StatisticalReportModel>(gdsql);
                if (!string.IsNullOrEmpty(year))
                {
                    int yearint = Convert.ToInt32(year);
                    queryable = queryable.Where(t => t.foundtime.Value.Year == yearint);
                }
                if (!string.IsNullOrEmpty(month))
                {
                    int monthint = Convert.ToInt32(month);
                    queryable = queryable.Where(t => t.foundtime.Value.Month == monthint);
                }
                if (!string.IsNullOrEmpty(sourceid))
                {
                    int sourceidint = Convert.ToInt32(sourceid);
                    queryable = queryable.Where(t => t.sourceid == sourceidint);
                }
                list = queryable.OrderByDescending(t => t.foundtime).ToList();
            }
            return list;
        }

    }
}
