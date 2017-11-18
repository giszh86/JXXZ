using JXXZ.ZHCG.DAL.Enum;
using JXXZ.ZHCG.DAL.MechanicalExaminationDAL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class receptionCasesDAL
    {
        public List<int> getCaseByStatus()
        {
            List<int> list = new List<int>();
            DateTime time = DateTime.Now.AddMonths(-1);
            using (Entities db = new Entities())
            {
                IQueryable<CaseList> queryable = from a in db.case_workflowspecifics
                                                 join b_join in db.case_workflowspecificactivitys on a.currentwfsaid equals b_join.wfsaid into bTmp
                                                 from b in bTmp.DefaultIfEmpty()
                                                 where a.casetype == 2 && a.createtime >= time
                                                 select new CaseList
                                                 {
                                                     wfdid = b.wfdid,
                                                 };
                //已立案
                int yla = queryable.Where(a => a.wfdid == "2017030613500001" || a.wfdid == "2017030613500002" || a.wfdid == "2017030613500003" || a.wfdid == "2017030613500004").Count();
                list.Add(yla);
                //已结案
                int yja = queryable.Where(a => a.wfdid == "2017030613500031").Count();
                //处理中
                int dcl = queryable.Count() - yla - yja;
                list.Add(dcl);
                //已结案
                list.Add(yja);
            }
            return list;
        }

        public List<int> getCaseBySource()
        {
            List<int> list = new List<int>();
            DateTime time = DateTime.Now.AddMonths(-1);
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select count(cc.casesourceid) as count,cs.sourceid  from case_sources as cs 
LEFT JOIN case_cases cc on cs.sourceid=cc.casesourceid and cc.sitedatetime >=str_to_date('" + time + "','%Y/%m/%d %H:%i:%s')   group by cs.sourceid");
                IEnumerable<receptionCaseList> queryable = db.Database.SqlQuery<receptionCaseList>(sql);
                receptionCaseList Model = new receptionCaseList();
                //投诉举报
                int ComplaintReport = (int)CaseSourceClass.ComplaintReport;
                Model = queryable.FirstOrDefault(a => a.sourceid == ComplaintReport);
                list.Add(Model.count);
                //上级交办                 
                int Superiors = (int)CaseSourceClass.Superiors;
                Model = queryable.FirstOrDefault(a => a.sourceid == Superiors);
                list.Add(Model.count);
                //下级报送                
                int SubordinateSubmission = (int)CaseSourceClass.SubordinateSubmission;
                Model = queryable.FirstOrDefault(a => a.sourceid == SubordinateSubmission);
                list.Add(Model.count);
                //同级转办                
                int SameLevel = (int)CaseSourceClass.SameLevel;
                Model = queryable.FirstOrDefault(a => a.sourceid == SameLevel);
                list.Add(Model.count);
                //巡查发现                
                int InspectionFound = (int)CaseSourceClass.InspectionFound;
                Model = queryable.FirstOrDefault(a => a.sourceid == InspectionFound);
                list.Add(Model.count);
            }
            return list;
        }

        public List<receptionWtajModel> getCaseNewList()
        {
            List<receptionWtajModel> list = new List<receptionWtajModel>();
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT aj.wtid,aj.car_num,aj.wt_address, concat_ws(',',aj.x84,aj.y84) as grometry from case_wtajs aj where aj.reporttime>=str_to_date('" + time + "','%Y/%m/%d') ORDER BY aj.reporttime desc");
                IEnumerable<receptionWtajModel> queryable = db.Database.SqlQuery<receptionWtajModel>(sql);
                list = queryable.ToList();
            }
            return list;
        }



        public string getCaseBytype()
        {
            List<int> list = new List<int>();
            //DateTime time = DateTime.Now.AddMonths(-1);
            List<string> namelist = new List<string>();
            List<int> valuelist = new List<int>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select count(cc.casetypeid) as value ,cz.zd_name as name  from case_cases cc
right join case_zds cz on cc.casetypeid = cz.zd_id and cz.zd_type ='type_case' 
group by cz.zd_id");

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

        public List<int> GetYbCaseTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
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
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select bunit.path as name ,COUNT(bunit.id) as value 
from base_units bunit 
RIGHT JOIN base_users buser on bunit.id= buser.unitid
RIGHT join case_workflowspecifics wfs on buser.id =wfs.createuserid 
where wfs.casetype=2 and bunit.path is not null and wfs.createtime>=str_to_date('{0}','%Y/%m/%d') and wfs.createtime < str_to_date('{1}','%Y/%m/%d') 
GROUP BY bunit.id", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
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


            }
            return list;
        }

        public List<int> GetJyCaseTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
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
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select bunit.path as name ,COUNT(bunit.id) as value 
from base_units bunit 
RIGHT JOIN base_users buser on bunit.id= buser.unitid
RIGHT join case_workflowspecifics wfs on buser.id =wfs.createuserid 
where wfs.casetype=3 and bunit.path is not null and wfs.createtime>=str_to_date('{0}','%Y/%m/%d') and wfs.createtime < str_to_date('{1}','%Y/%m/%d') 
GROUP BY bunit.id", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
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
            }
            return list;
        }


        public List<int> GetAysCaseTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
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
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select bunit.path as name ,COUNT(bunit.id) as value 
from base_units bunit 
RIGHT JOIN base_users buser on bunit.id= buser.unitid
RIGHT join case_workflowspecifics wfs on buser.id =wfs.createuserid 
where wfs.casetype=1 && bunit.path is not null and wfs.createtime>=str_to_date('{0}','%Y/%m/%d') and wfs.createtime < str_to_date('{1}','%Y/%m/%d') 
GROUP BY bunit.id", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
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


            }
            return list;
        }

        public List<int> GetLasCaseTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
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
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from(select bunit.path as name ,COUNT(bunit.id) as value
from case_workflowspecifics wfs 
LEFT JOIN case_cases cc on wfs.caseid= cc.caseid
LEFT JOIN case_workflowspecificactivitys wfsa on wfs.currentwfsaid =wfsa.wfsaid and wfsa.dealtime>=str_to_date('{0}','%Y/%m/%d') and wfsa.dealtime < str_to_date('{1}','%Y/%m/%d') 
LEFT JOIN base_users buser on cc.zbuserid = buser.id
left join base_units bunit on buser.unitid = bunit.id 
where wfsa.wfdid ='2017030613500001' or wfsa.wfdid ='2017030613500002' or wfsa.wfdid ='2017030613500003' or wfsa.wfdid ='2017030613500004' 
GROUP BY bunit.id) tab1 where tab1.`name` is not null", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
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


            }
            return list;
        }

        public List<int> GetJasCaseTypeStatistics(int type)
        {
            List<int> list = new List<int>();
            List<EcamineCount> newlist = new List<EcamineCount>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
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
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from(select bunit.path as name ,COUNT(bunit.id) as value
from case_workflowspecifics wfs 
LEFT JOIN case_cases cc on wfs.caseid= cc.caseid
LEFT JOIN case_workflowspecificactivitys wfsa on wfs.currentwfsaid =wfsa.wfsaid and wfsa.dealtime>=str_to_date('{0}','%Y/%m/%d') and wfsa.dealtime < str_to_date('{1}','%Y/%m/%d') 
LEFT JOIN base_users buser on cc.zbuserid = buser.id
left join base_units bunit on buser.unitid = bunit.id
where wfsa.wfdid ='2017030613500031' 
GROUP BY bunit.id) tab1 where tab1.`name` is not null", dt1, dt2);
                IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
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


            }
            return list;
        }

    }
}
