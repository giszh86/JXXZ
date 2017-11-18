using JXXZ.ZHCG.DAL.Enum;
using JXXZ.ZHCG.DAL.MechanicalExaminationDAL;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.receptionFirstPage
{
    public class receptionFirstPageDAL
    {
        /// <summary>
        /// 返回前台首页简易 一般  重大 违停案件个数
        /// </summary>
        /// <returns></returns>
        public List<int> getCase()
        {
            List<int> caselist = new List<int>();
            using (Entities db = new Entities())
            {
                DateTime today = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd"));

                string sql = string.Format(@"select count(wfs.wfsid) as value from case_workflowspecifics wfs 
RIGHT JOIN case_workflowspecificactivitys wfsa on wfs.wfsid = wfsa.wfsid and wfs.casetype= 2
where wfsa.wfdid ='2017030613500006' and DATE_FORMAT(DATE(NOW()),'%Y-%m-%d') = DATE_FORMAT(wfsa.createtime,'%Y-%m-%d')
GROUP BY wfs.wfsid");
                var queryable = db.Database.SqlQuery<EcamineCount>(sql);
                //一般案件个数
                int ybcaseNum = db.case_cases.Where(t => t.createtime >= today).Count();
                caselist.Add(ybcaseNum);
                //违停案件个数
                int wtajCaseNum = db.case_wtajs.Where(t => t.wt_time >= today).Count();
                caselist.Add(wtajCaseNum);
                //重大案件个数
                int importantCaseNum = queryable.FirstOrDefault() == null ? 0 : queryable.FirstOrDefault().value;
                caselist.Add(importantCaseNum);
                ///简易案件个数
                int simplecaseNum = db.case_simplecases.Where(t => t.createtime >= today).Count();
                caselist.Add(simplecaseNum);
            }
            return caselist;
        }

        /// <summary>
        /// 返回前台首页事件数据统计
        /// </summary>
        /// <returns></returns>
        public List<int> GetEvent()
        {
            List<int> eventlist = new List<int>();
            using (Entities db = new Entities())
            {
                DateTime today = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd"));

                //24小时值班
                int allDayWatch = (int)SMClass.allDayWatch;
                int allDayWatchcount = db.sm_citizenservices.Where(t => t.sourceid == allDayWatch && t.createtime >= today).Count();
                eventlist.Add(allDayWatchcount);

                //市长电话
                int mayorPhone = (int)SMClass.mayorPhone;
                int mayorPhonecount = db.sm_citizenservices.Where(t => t.sourceid == mayorPhone && t.createtime >= today).Count();
                eventlist.Add(mayorPhonecount);

                //市局96310
                int cityBureau96310 = (int)SMClass.cityBureau96310;
                int cityBureau96310count = db.sm_citizenservices.Where(t => t.sourceid == cityBureau96310 && t.createtime >= today).Count();
                eventlist.Add(cityBureau96310count);

                //数字城管
                int digitalCityManagement = (int)SMClass.digitalCityManagement;
                int digitalCityManagementcount = db.sm_citizenservices.Where(t => t.sourceid == digitalCityManagement && t.createtime >= today).Count();
                eventlist.Add(digitalCityManagementcount);

                //环境曝光台
                int environmentalExposureTable = (int)SMClass.environmentalExposureTable;
                int environmentalExposureTablecount = db.sm_citizenservices.Where(t => t.sourceid == environmentalExposureTable && t.createtime >= today).Count();
                eventlist.Add(environmentalExposureTablecount);

                //巡查发现
                int patrolDiscovery = (int)SMClass.patrolDiscovery;
                int patrolDiscoverycount = db.sm_citizenservices.Where(t => t.sourceid == patrolDiscovery && t.createtime >= today).Count();
                eventlist.Add(patrolDiscoverycount);
            }
            return eventlist;
        }

        /// <summary>
        /// 前台首页图表
        /// </summary>
        /// <returns></returns>
        public List<int> GetEventChart()
        {
            List<int> list = new List<int>();
            DateTime today = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd"));
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                //今日上报
                int jysb = db.sm_citizenservices.Where(t => t.createtime >= today).Count();
                list.Add(jysb);
                //今日派遣
                int jrpq = (from a in db.wf_workflowspecifics
                            join b in db.wf_workflowspecificactivitys.Where(t => t.wfdid == "2017021410240001") on a.wfsid equals b.wfsaid
                            where a.wfid == "2017021409560001" && a.tablename == "sm_citizenservices"
                            select new SM_CitizenServicesModel
                            {
                                wfsid = a.wfsid
                            }).ToList().Count;
                list.Add(jrpq);
                //今日完结
                int jrwj = db.sm_citizenservices.Where(t => t.gdsj >= today).Count();
                list.Add(jrwj);
                //超时未处理
                int cswcl = db.sm_citizenservices.Where(t => t.limittime >= today && t.limittime < time && t.gdsj == null).Count();
                list.Add(cswcl);

            }
            return list;
        }

        /// <summary>
        /// 人员在线数
        /// </summary>
        /// <returns></returns>
        public List<int> getProgress()
        {
            List<int> Progresslist = new List<int>();
            DateTime time = DateTime.Now.AddMinutes(-15);
            using (Entities db = new Entities())
            {
                int LawEnforcemenPeople = (int)UserRole.LawEnforcemenPeople;
                //执法人员总数
                int zs = db.base_userroles.Where(a => a.roleid == LawEnforcemenPeople).Count();
                //执法人员在线数
                IQueryable<QW_UserLastPositionsModel> queryable = (from a in db.qw_userlastpositions
                                                                   join b_join in db.base_userroles.Where(a => a.roleid == LawEnforcemenPeople) on a.userid equals b_join.userid into bTmp
                                                                   from b in bTmp.DefaultIfEmpty()
                                                                   where a.positiontime >= time
                                                                   select new QW_UserLastPositionsModel
                                                                   {
                                                                       userid = b.userid,
                                                                   });
                int zxrs = queryable.Count();
                double zfryCount = Convert.ToDouble(zs);
                double zfryOnline = Convert.ToDouble(zxrs);
                int zfryratio =Convert.ToInt32(((zfryOnline / zfryCount * 100)));
                Progresslist.Add(zfryratio);
                Progresslist.Add(zxrs);

                //执法车
                int zfcOnline = 8;
                int zfcCount = 8;

                int zfcratio = Convert.ToInt32(((double)zfcOnline / (double)zfcCount) * 100);
                Progresslist.Add(zfcratio);
                Progresslist.Add(zfcOnline);

                //养护人员
                int yhryOnline = 50;
                int yhryCount = 100;
                int yhryratio = Convert.ToInt32(((double)yhryOnline / (double)yhryCount) * 100);
                Progresslist.Add(yhryratio);
                Progresslist.Add(yhryOnline);

                //渣土车
                int ztcOnline = 120;
                int ztcCount = 200;
                int ztcratio = Convert.ToInt32(((double)ztcOnline / (double)ztcCount) * 100);
                Progresslist.Add(ztcratio);
                Progresslist.Add(ztcOnline);

                //环卫人员
                int hwrrOnline = 150;
                int hwrrCount = 200;
                int hwrrratio = Convert.ToInt32(((double)hwrrOnline / (double)hwrrCount) * 100);
                Progresslist.Add(hwrrratio);
                Progresslist.Add(hwrrOnline);

                //环卫车
                int hwcOnline = 10;
                int hwcCount = 15;
                int hwcratio = Convert.ToInt32(((double)hwcOnline / (double)hwcCount) * 100);
                Progresslist.Add(hwcratio);
                Progresslist.Add(hwcOnline);
            }
            return Progresslist;
        }
    }
}
