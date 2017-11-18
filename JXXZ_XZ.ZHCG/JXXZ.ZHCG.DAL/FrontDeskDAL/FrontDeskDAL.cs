using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.ConservationModel;
using JXXZ.ZHCG.Model.FrontDeskModel;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using JXXZ.ZHCG.Model.MonitorModel;
using JXXZ.ZHCG.Model.PartModel;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.FrontDeskDAL
{
    public class FrontDeskDAL
    {
        /// <summary>
        /// 周边
        /// </summary>
        /// <param name="type">类型</param>
        /// <param name="x84"></param>
        /// <param name="y84"></param>
        /// <param name="radius">半径</param>
        public List<FrontDeskModel> GetPeriphery(string type, double x84, double y84, double radius)
        {
            string[] lx = type.Split(',');
            double bj = radius / 1000;
            DateTime time = DateTime.Now.AddMinutes(-15);
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            DateTime dt3 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            dt3 = dt1.AddMonths(-1);
            List<FrontDeskModel> list = new List<FrontDeskModel>();
            using (Entities db = new Entities())
            {
                if (lx != null && lx.Length > 0)
                {
                    foreach (string item in lx)
                    {
                        switch (item)
                        {
                            case "ry":
                                string rysql = string.Format(@"select userid as id,'ry' as type,x84,y84 from qw_userlastpositions where (6371.004*ACOS(SIN({0}/180*PI())*SIN(Y84/180*PI())+COS({0}/180*PI())*COS(Y84/180*PI())*COS(({1}-X84)/180*PI())))<{2} and userid<>0  and positiontime>=str_to_date('{3}','%Y/%m/%d %H:%i:%s')", y84, x84, bj, time);
                                IEnumerable<FrontDeskModel> ryqueryable = db.Database.SqlQuery<FrontDeskModel>(rysql);
                                if (ryqueryable.Count() != 0)
                                    list.AddRange(ryqueryable);
                                break;
                            case "sj":
                                string sjsql = string.Format(@"select citizenid as id , 'sj' as type,substring_index(grometry,',',1) as x84 ,substring_index(grometry,',',-1) as y84 from sm_citizenservices where 
(6371.004*ACOS(SIN('{0}'/180*PI())*SIN(substring_index(grometry,',',-1)/180*PI())+COS('{0}'/180*PI())*COS(substring_index(grometry,',',-1)/180*PI())*COS(('{1}'-substring_index(grometry,',',1))/180*PI())))<{2} and grometry is not null and createtime>=str_to_date('{3}','%Y/%m/%d %H:%i:%s') and createtime<str_to_date('{4}','%Y/%m/%d %H:%i:%s')", y84, x84, bj, dt1, dt2);
                                IEnumerable<FrontDeskModel> sjqueryable = db.Database.SqlQuery<FrontDeskModel>(sjsql);
                                if (sjqueryable.Count() != 0)
                                    list.AddRange(sjqueryable);
                                break;
                            case "aj":
                                string ybajsql = string.Format(@"select wfs.wfsid as id , 'ybaj' as type,substring_index(cc.geographical84,',',1) as x84 ,substring_index(cc.geographical84,',',-1) as y84  from case_cases cc LEFT JOIN case_workflowspecifics wfs on cc.caseid = wfs.caseid where (6371.004*ACOS(SIN('{0}'/180*PI())*SIN(substring_index(cc.geographical84,',',-1)/180*PI())+COS('{0}'/180*PI())*COS(substring_index(cc.geographical84,',',-1)/180*PI())*COS(('{1}'-substring_index(cc.geographical84,',',1))/180*PI())))<{2} and cc.geographical84 is not null and wfs.wfsid is not null and cc.createtime>=str_to_date('{3}','%Y/%m/%d %H:%i:%s') and cc.createtime<str_to_date('{4}','%Y/%m/%d %H:%i:%s')
", y84, x84, bj, dt1, dt2);
                                IEnumerable<FrontDeskModel> ybajqueryable = db.Database.SqlQuery<FrontDeskModel>(ybajsql);
                                if (ybajqueryable.Count() != 0)
                                    list.AddRange(ybajqueryable);
                                string jyajsql = string.Format(@"select cs.simpleid as id , 'jyaj' as type,substring_index(cs.geographical84,',',1) as x84 ,substring_index(cs.geographical84,',',-1) as y84 from case_simplecases cs LEFT JOIN case_workflowspecifics wfs on cs.simpleid = wfs.caseid where (6371.004*ACOS(SIN('{0}'/180*PI())*SIN(substring_index(cs.geographical84,',',-1)/180*PI())+COS('{0}'/180*PI())*COS(substring_index(cs.geographical84,',',-1)/180*PI())*COS(('{1}'-substring_index(cs.geographical84,',',1))/180*PI())))<{2} and cs.geographical84 is not null and wfs.wfsid is not null and cs.createtime>=str_to_date('{3}','%Y/%m/%d %H:%i:%s') and cs.createtime<str_to_date('{4}','%Y/%m/%d %H:%i:%s')", y84, x84, bj, dt1, dt2);
                                IEnumerable<FrontDeskModel> jyajqueryable = db.Database.SqlQuery<FrontDeskModel>(jyajsql);
                                if (jyajqueryable.Count() != 0)
                                    list.AddRange(jyajqueryable);
                                string wtajsql = string.Format(@"select wtid as id, 'wtaj' as type ,x84,y84 from case_wtajs 
where (6371.004*ACOS(SIN({0}/180*PI())*SIN(y84/180*PI())+COS({0}/180*PI())*COS(y84/180*PI())*COS(({1}-x84)/180*PI())))<{2} and x84 is not null and y84 is not null and reporttime>=str_to_date('{3}','%Y/%m/%d %H:%i:%s') and reporttime<str_to_date('{4}','%Y/%m/%d %H:%i:%s')", y84, x84, bj, dt1, dt2);
                                IEnumerable<FrontDeskModel> wtajqueryable = db.Database.SqlQuery<FrontDeskModel>(wtajsql);
                                if (wtajqueryable.Count() != 0)
                                    list.AddRange(wtajqueryable);
                                break;
                            case "bj":
                                string bjsql = string.Format(@"select  a.id as id, 'bj' as type ,a.cdinatex as x84,a.cdinatey as y84,a.objname as title ,b.icon from bj_part a 
left join bj_zds  b on a.sbmc = b.id
where (6371.004*ACOS(SIN({0}/180*PI())*SIN(a.cdinatey/180*PI())+COS({0}/180*PI())*COS(a.cdinatey/180*PI())*COS(({1}-a.cdinatex)/180*PI())))<{2}", y84, x84, bj);
                                 IEnumerable<FrontDeskModel> bjqueryable = db.Database.SqlQuery<FrontDeskModel>(bjsql);
                                if (bjqueryable.Count() != 0)
                                    list.AddRange(bjqueryable);
                                break;
                            case "sp":
                                string spsql = string.Format(@"select wfs.tablenameid as id,'sp' as type ,substring_index(wfsu.remark,',',1) as x84,substring_index(wfsu.remark,',',-1) as y84 from wf_workflowspecifics wfs
LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid 
left join wf_workflowspecificusers wfsu on wfsa.wfsaid = wfsu.wfsaid
where wfsa.wfdid ='2017070414250003' and wfsu.remark <>'' and wfsu.remark is not null and (6371.004*ACOS(SIN({0}/180*PI())*SIN(substring_index(wfsu.remark,',',-1)/180*PI())+COS({0}/180*PI())*COS(substring_index(wfsu.remark,',',-1)/180*PI())*COS(({1}-substring_index(wfsu.remark,',',1))/180*PI())))<{2} and wfsu.createtime>=str_to_date('{3}','%Y/%m/%d %H:%i:%s') and wfsu.createtime<str_to_date('{4}','%Y/%m/%d %H:%i:%s')", y84, x84, bj,dt3,dt1);
                                IEnumerable<FrontDeskModel> spqueryable = db.Database.SqlQuery<FrontDeskModel>(spsql);
                                if (spqueryable.Count() != 0)
                                    list.AddRange(spqueryable);
                                break;
                            case "jk":
                                string sqljk = string.Format(@"select cameraid as id,'jk' as type,x84,y84 
from fi_cameras 
where (6371.004*ACOS(SIN({0}/180*PI())*SIN(Y84/180*PI())+COS({0}/180*PI())*COS(Y84/180*PI())*COS(({1}-X84)/180*PI())))<{2} 
", y84, x84, bj);
                                IEnumerable<FrontDeskModel> jkqueryable = db.Database.SqlQuery<FrontDeskModel>(sqljk);
                                if (jkqueryable.Count() != 0)
                                    list.AddRange(jkqueryable);
                                break;
                        }
                    }
                }
            }

            return list;
        }


        public List<FrontDeskModel> GetALLPeriphery(string type)
        {
            string[] lx = type.Split(',');
            DateTime time = DateTime.Now.AddMinutes(-15);
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            DateTime dt3 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            dt3 = dt1.AddMonths(-1);
            List<FrontDeskModel> list = new List<FrontDeskModel>();
            using (Entities db = new Entities())
            {
                if (lx != null && lx.Length > 0)
                {
                    foreach (string item in lx)
                    {
                        switch (item)
                        {
                            case "ry":
                                string rysql = string.Format(@"select userid as id,'ry' as type,x84,y84 from qw_userlastpositions where userid<>0  and positiontime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s')", time);
                                IEnumerable<FrontDeskModel> ryqueryable = db.Database.SqlQuery<FrontDeskModel>(rysql);
                                if (ryqueryable.Count() != 0)
                                    list.AddRange(ryqueryable);
                                break;
                            case "sj":
                                string sjsql = string.Format(@"select citizenid as id , 'sj' as type,substring_index(grometry,',',1) as x84 ,substring_index(grometry,',',-1) as y84 from sm_citizenservices where grometry is not null and grometry <> '' and createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')", dt1, dt2);
                                IEnumerable<FrontDeskModel> sjqueryable = db.Database.SqlQuery<FrontDeskModel>(sjsql);
                                if (sjqueryable.Count() != 0)
                                    list.AddRange(sjqueryable);
                                break;
                            case "aj":
                                string ybajsql = string.Format(@"select wfs.wfsid as id , 'ybaj' as type,substring_index(cc.geographical84,',',1) as x84 ,substring_index(cc.geographical84,',',-1) as y84  from case_cases cc LEFT JOIN case_workflowspecifics wfs on cc.caseid = wfs.caseid where cc.geographical84 <>'' and cc.geographical84 is not null and wfs.wfsid is not null and cc.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and cc.createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')
", dt1, dt2);
                                IEnumerable<FrontDeskModel> ybajqueryable = db.Database.SqlQuery<FrontDeskModel>(ybajsql);
                                if (ybajqueryable.Count() != 0)
                                    list.AddRange(ybajqueryable);
                                string jyajsql = string.Format(@"select cs.simpleid as id , 'jyaj' as type,substring_index(cs.geographical84,',',1) as x84 ,substring_index(cs.geographical84,',',-1) as y84 from case_simplecases cs LEFT JOIN case_workflowspecifics wfs on cs.simpleid = wfs.caseid where cs.geographical84 <>'' and cs.geographical84 is not null and wfs.wfsid is not null and cs.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and cs.createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')", dt1, dt2);
                                IEnumerable<FrontDeskModel> jyajqueryable = db.Database.SqlQuery<FrontDeskModel>(jyajsql);
                                if (jyajqueryable.Count() != 0)
                                    list.AddRange(jyajqueryable);
                                string wtajsql = string.Format(@"select wtid as id, 'wtaj' as type ,x84,y84 from case_wtajs 
where x84 is not null and y84 is not null and reporttime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and reporttime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')", dt1, dt2);
                                IEnumerable<FrontDeskModel> wtajqueryable = db.Database.SqlQuery<FrontDeskModel>(wtajsql);
                                if (wtajqueryable.Count() != 0)
                                    list.AddRange(wtajqueryable);
                                break;
                            case "bj":
                                string bjsql = string.Format(@"select  a.id as id, 'bj' as type ,a.cdinatex as x84,a.cdinatey as y84,a.objname as title ,b.icon from bj_part a 
left join bj_zds  b on a.sbmc = b.id 
where a.cdinatex is not null and a.cdinatey is not null ");
                                IEnumerable<FrontDeskModel> bjqueryable = db.Database.SqlQuery<FrontDeskModel>(bjsql);
                                if (bjqueryable.Count() != 0)
                                    list.AddRange(bjqueryable);
                                break;
                            case "sp":
                                string spsql = string.Format(@"select wfs.tablenameid as id,'sp' as type ,substring_index(wfsu.remark,',',1) as x84,substring_index(wfsu.remark,',',-1) as y84 from wf_workflowspecifics wfs
LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid 
left join wf_workflowspecificusers wfsu on wfsa.wfsaid = wfsu.wfsaid
where wfsa.wfdid ='2017070414250003' and wfsu.remark <>'' and wfsu.remark is not null  and wfsu.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and wfsu.createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')",dt3, dt1);
                                IEnumerable<FrontDeskModel> spqueryable = db.Database.SqlQuery<FrontDeskModel>(spsql);
                                if (spqueryable.Count() != 0)
                                    list.AddRange(spqueryable);
                                break;
                        }
                    }
                }
            }
            return list;
        }

        #region 菜单
       
        /// <summary>
        /// 事件
        /// </summary>
        /// <returns></returns>
        public int getSjCount()
        {
            int num = 0;
            DateTime time = DateTime.Now.AddMinutes(-5);
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {
                //事件
                num = db.sm_citizenservices.Where(a => a.createtime >= dt1 && a.createtime < dt2).Count();
            }
            return num;
        }

        /// <summary>
        /// 案件
        /// </summary>
        /// <returns></returns>
        public int getAjCount()
        {
            int num = 0;
            DateTime time = DateTime.Now.AddMinutes(-5);
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {
                //int ybaj = db.case_cases.Where(a => a.createtime >= dt1 && a.createtime < dt2).Count();
                int jyaj = new Case_CasesDAL().GetDateAllCaseCountApi(null);
                int wtaj = db.case_wtajs.Where(a => a.reporttime >= dt1 && a.reporttime < dt2).Count();
                num =  jyaj + wtaj;
            }
            return num;
        }


        /// <summary>
        /// 部件
        /// </summary>
        /// <returns></returns>
        public int getBjCount()
        {
            int num = 0;
            using (Entities db = new Entities())
            {
                num = db.bj_part.Count();
            }
            return num;
        }


        public List<int> GetMenuCount()
        {
            List<int> list = new List<int>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            DateTime dt3 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/01/01"));
            DateTime dt4 = dt3.AddYears(1);
            using (Entities db = new Entities())
            {
                //人员
                var ry = from a in db.base_users
                         join b_join in db.base_units on a.unitid equals b_join.id into bTmp
                         from b in bTmp.DefaultIfEmpty()
                         where b.unittypeid != 1
                         select new UserModel
                         {
                             ID = a.id
                         };
                int rycount = ry.Count();
                list.Add(rycount);
                //车辆
                var cl = from a in db.qw_cars
                         where a.status == 0
                         select new QW_CarsModel
                         {
                             carid = a.carid,
                         };
                int clcount = cl.Count();
                list.Add(clcount);
                //监控
                var jk = from a in db.fi_cameras
                         select new FI_CamerasModel
                         {
                             cameraid = a.cameraid,
                         };
                int jkcount = jk.Count();
                list.Add(jkcount);
             
                //部件
                int bjcount = db.bj_part.Count();
                list.Add(bjcount);
                //养护
                int yhcount = db.yh_contracts.Where(a => a.createtime >= dt3 && a.createtime < dt4 && a.contactendtime > time).Count();
                list.Add(yhcount);
                //整治
                int zzcount = db.zxzz_tasks.Where(a => a.createtime >= dt3 && a.createtime < dt4).Count();
                list.Add(zzcount);
                //审批
                EntitiesORCL orcldb = new EntitiesORCL();
                int Year = DateTime.Now.Year;
                string spsql = string.Format(@"select * from audit_project_w t 
where t.windowname='区综合行政执法局'
and t.status=90
and to_char(t.banjiedate,'yyyy')>=2017 and to_char(t.banjiedate,'yyyy')={0}
order by t.banjiedate desc ", Year);
                int spcount = orcldb.Database.SqlQuery<Audit_project_wModel>(spsql).Count();
                list.Add(spcount);
                //违拆
                int cqcount = db.wj_cqxms.Where(a => a.createtime >= dt3 && a.createtime < dt4).Count();
                string sql = string.Format(@"select * from (select * from wj_wzjzs a where a.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and a.createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s') and a.parentid in (select a.wjid from wj_wzjzs a where a.parentid is null) order by a.createtime desc) tab1 GROUP BY tab1.parentid", dt3, dt4);
                int wjcount = db.Database.SqlQuery<WJ_WzjzsModel>(sql).Count();
                int wccount = cqcount + wjcount;
                list.Add(wccount);
            }
            return list;
        }
        #endregion


        /// <summary>
        /// 框选
        /// </summary>
        /// <param name="lon">经度</param>
        /// <param name="lat">纬度</param>
        /// <param name="r">周边距离</param>
        /// <returns></returns>
        public List<FrontDeskModel> getcamera(string coordinate1, string coordinate4, string type,int start, int limit)
        {
            string[] lx = type.Split(',');
            List<FrontDeskModel> list = new List<FrontDeskModel>();
            DateTime time = DateTime.Now.AddMinutes(-15);
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            DateTime dt3 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            dt3 = dt1.AddMonths(-1);
            using (Entities db = new Entities())
            {
                string[] point1 = coordinate1.Split(',');
                string[] point4 = coordinate4.Split(',');
                //第一个点
                double X1 = double.Parse(point4[0]);
                double Y1 = double.Parse(point4[1]);
                //第二个点
                double X2 = double.Parse(point1[0]);
                double Y2 = double.Parse(point1[1]);

                if (lx != null && lx.Length > 0)
                {
                    foreach (string item in lx)
                    {
                        switch (item)
                        {
                            case "ry":
                                string rysql = string.Format(@"select userid as id,'ry' as type,x84,y84 from qw_userlastpositions where userid<>0  and positiontime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s')  LIMIT {1}, {2}", time, start, limit);
                                IEnumerable<FrontDeskModel> ryqueryable = db.Database.SqlQuery<FrontDeskModel>(rysql);
                                ryqueryable = ryqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (ryqueryable.Count() != 0)
                                    list.AddRange(ryqueryable);
                                break;
                            case "sj":
                                string sjsql = string.Format(@"select citizenid as id , 'sj' as type,substring_index(grometry,',',1) as x84 ,substring_index(grometry,',',-1) as y84 from sm_citizenservices where grometry is not null  and grometry <>'' and createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')  LIMIT {2}, {3}", dt1, dt2, start, limit);
                                IEnumerable<FrontDeskModel> sjqueryable = db.Database.SqlQuery<FrontDeskModel>(sjsql);
                                sjqueryable = sjqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (sjqueryable.Count() != 0)
                                    list.AddRange(sjqueryable);
                                break;
                            case "aj":
                                string ybajsql = string.Format(@"select wfs.wfsid as id , 'ybaj' as type,substring_index(cc.geographical84,',',1) as x84 ,substring_index(cc.geographical84,',',-1) as y84  from case_cases cc LEFT JOIN case_workflowspecifics wfs on cc.caseid = wfs.caseid where cc.geographical84 <>'' and cc.geographical84 is not null and wfs.wfsid is not null and cc.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and cc.createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')  LIMIT {2}, {3}
", dt1, dt2, start, limit);
                                IEnumerable<FrontDeskModel> ybajqueryable = db.Database.SqlQuery<FrontDeskModel>(ybajsql);
                                ybajqueryable = ybajqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (ybajqueryable.Count() != 0)
                                    list.AddRange(ybajqueryable);
                                string jyajsql = string.Format(@"select cs.simpleid as id , 'jyaj' as type,substring_index(cs.geographical84,',',1) as x84 ,substring_index(cs.geographical84,',',-1) as y84 from case_simplecases cs LEFT JOIN case_workflowspecifics wfs on cs.simpleid = wfs.caseid where cs.geographical84 <>'' and cs.geographical84 is not null and wfs.wfsid is not null and cs.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and cs.createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')  LIMIT {2}, {3}", dt1, dt2, start, limit);
                                IEnumerable<FrontDeskModel> jyajqueryable = db.Database.SqlQuery<FrontDeskModel>(jyajsql);
                                jyajqueryable = jyajqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (jyajqueryable.Count() != 0)
                                    list.AddRange(jyajqueryable);
                                string wtajsql = string.Format(@"select wtid as id, 'wtaj' as type ,x84,y84 from case_wtajs 
where x84 is not null and y84 is not null and reporttime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and reporttime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')  LIMIT {2}, {3}", dt1, dt2, start, limit);
                                IEnumerable<FrontDeskModel> wtajqueryable = db.Database.SqlQuery<FrontDeskModel>(wtajsql);
                                wtajqueryable = wtajqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (wtajqueryable.Count() != 0)
                                    list.AddRange(wtajqueryable);
                                break;
                            case "jk":
                                string jksql = string.Format(@"select  cameraid as id, 'jk' as type ,x84,y84,cameraname as title,logintype from fi_cameras where x84 is not null and y84 is not null   LIMIT {0}, {1}", start, limit);
                                IEnumerable<FrontDeskModel> jkqueryable = db.Database.SqlQuery<FrontDeskModel>(jksql);
                                jkqueryable = jkqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (jkqueryable.Count() != 0)
                                    list.AddRange(jkqueryable);
                                break;
                            case "bj":
                                string bjsql = string.Format(@"select  a.id as id, 'bj' as type ,a.cdinatex as x84,a.cdinatey as y84,a.objname as title ,b.icon from bj_part a 
left join bj_zds  b on a.sbmc = b.id
where a.cdinatex is not null and a.cdinatey is not null and a.cdinatex <>'' and a.cdinatey <>''  LIMIT {0}, {1}", start, limit);
                                IEnumerable<FrontDeskModel> bjqueryable = db.Database.SqlQuery<FrontDeskModel>(bjsql);
                                bjqueryable = bjqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (bjqueryable.Count() != 0)
                                    list.AddRange(bjqueryable);
                                break;
                            case "sp":
                                string spsql = string.Format(@"select wfs.tablenameid as id,'sp' as type ,substring_index(wfsu.remark,',',1) as x84,substring_index(wfsu.remark,',',-1) as y84 from wf_workflowspecifics wfs
LEFT JOIN wf_workflowspecificactivitys wfsa on wfs.wfsid=wfsa.wfsid 
left join wf_workflowspecificusers wfsu on wfsa.wfsaid = wfsu.wfsaid
where wfsa.wfdid ='2017070414250003' and wfsu.remark <>'' and wfsu.remark is not null  and wfsu.createtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s') and wfsu.createtime<str_to_date('{1}','%Y/%m/%d %H:%i:%s')  LIMIT {2}, {3}", dt3, dt1, start, limit);
                                IEnumerable<FrontDeskModel> spqueryable = db.Database.SqlQuery<FrontDeskModel>(spsql);
                                spqueryable = spqueryable.Where(a => (a.x84 <= X1 && a.y84 <= Y1)
                                        && (a.x84 <= X1 && a.y84 >= Y2)
                                        && (a.x84 >= X2 && a.y84 <= Y1)
                                        && (a.x84 >= X2 && a.y84 >= Y2));
                                if (spqueryable.Count() != 0)
                                    list.AddRange(spqueryable);
                                break;
                        }
                    }
                }
                return list;
            }
        }



        /// <summary>
        /// 低洼地段报警值
        /// </summary>
        /// <returns></returns>
        public List<decimal> GetDwddPolice()
        {
            List<decimal> list = new List<decimal>();
            using (Entities db = new Entities())
            {
                IQueryable<low_newlying> queryable = db.low_newlying.OrderByDescending(a => a.cjsj);
                low_newlying model = queryable.FirstOrDefault();
                if (model != null)
                {
                    decimal bjz = 0;
                    decimal bjljz = 0;
                    if (!string.IsNullOrEmpty(model.bjz))
                        bjz = decimal.Parse(model.bjz);
                    if (!string.IsNullOrEmpty(model.bjljz))
                        bjljz = decimal.Parse(model.bjljz);
                    decimal syz = decimal.Round((bjljz - bjz), 2);
                    list.Add(bjz);
                    list.Add(syz);
                    list.Add(bjljz);
                }

            }
            return list;

        }

        /// <summary>
        /// 低洼地段是否报警
        /// </summary>
        /// <returns></returns>
        public List<string> GetDwddIsPolice()
        {
            List<string> list = new List<string>();
            using (Entities db = new Entities())
            {
                low_newlying model = db.low_newlying.OrderByDescending(a => a.cjsj).FirstOrDefault();
                if (model != null)
                {
                    string bjz = model.bjz;
                    string sfbj = model.sfbj == 0 ? "否" : "是";
                    list.Add(bjz);
                    list.Add(sfbj);
                }
            }
            return list;
        }


        public string GetPartSbdl()
        {
            List<string> namelist = new List<string>();
            List<int> valuelist = new List<int>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select bz.id,bz.name as name, count(a.sbdl) as value from bj_part a 
RIGHT JOIN bj_zds bz on a.sbdl = bz.id 
where bz.parentid=0
GROUP BY bz.id ");
                IEnumerable<statistics> queryable = db.Database.SqlQuery<statistics>(sql).OrderByDescending(a => a.value).Take(7);
                foreach (var item in queryable)
                {
                    namelist.Add(item.name);
                    valuelist.Add(item.value);
                }
                string str =  JsonConvert.SerializeObject(namelist).ToString() + "|" + JsonConvert.SerializeObject(valuelist).ToString();
                return str;
            }
        }

//        public string GetPartSbxl()
//        {
//            List<int> list = new List<int>();
//            List<string> idlist = new List<string>();
//            List<string> namelist = new List<string>();
//            List<int> valuelist = new List<int>();
//            using (Entities db = new Entities())
//            {
//                string sql = string.Format(@"select bc.id,bc.name as name, count(a.sbxl) as value from bj_part a 
//RIGHT JOIN bj_classes bc on a.sbxl = bc.id 
//GROUP BY bc.id ");
//                IEnumerable<statistics> queryable = db.Database.SqlQuery<statistics>(sql);
//                queryable = queryable.OrderByDescending(a => a.value).Skip(0).Take(8);
//                foreach (var item in queryable)
//                {
//                    idlist.Add(item.id);
//                    namelist.Add(item.name);
//                    valuelist.Add(item.value);
//                }
//                string str = JsonConvert.SerializeObject(idlist).ToString() + "|" + JsonConvert.SerializeObject(namelist).ToString() + "|" + JsonConvert.SerializeObject(valuelist).ToString();
//                return str;
//            }
//        }

        /// <summary>
        /// 获取部件类型个数
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public int GetPartSbxl(string name)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT count(0) as number FROM bj_part where  objname='{0}'", name);
                toCount count = db.Database.SqlQuery<toCount>(sql).FirstOrDefault();
                return count.number;
            }
        }

    }
}
