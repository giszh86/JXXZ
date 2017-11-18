using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ReportModel;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ReportDAL
{
    public class ReportDAL
    {
        #region （表一）土地执法案件情况统计汇总表（月报）

        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public List<LandLawReportModel> GetLandLawReport(DateTime dt)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select 1 as reportid, 1 as projectId,'总数' as project,'总数' as classname,bu.id unitid,bu.`name` as unitname,rll.* from base_units bu 
LEFT JOIN report_landlaws rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m-%d')='{0}' and rll.classname='总数'
where bu.unittypeid=2 and bu.code!=10
UNION ALL
select 1 as reportid,2 projectId,'卫片' as project,'卫片' as classname,bu.id unitid,bu.`name` as unitname,rll.* from base_units bu 
LEFT JOIN report_landlaws rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m-%d')='{0}' and rll.classname='卫片'
where bu.unittypeid=2 and bu.code!=10", dt.ToString("yyyy-MM")+"-25");
                List<LandLawReportModel> result = db.Database.SqlQuery<LandLawReportModel>(sql).ToList();
                return result;
            }
        }

        /// <summary>
        /// 模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        public int LandLawAddOrEdit(LandLawReportModel model)
        {
            using (Entities db = new Entities())
            {
                report_landlaws report = db.report_landlaws.Where(a => a.reportdate.Year == model.reportdate.Value.Year && a.reportdate.Month == model.reportdate.Value.Month && a.unitid == model.unitid && a.classname == model.classname).FirstOrDefault();

                if (report == null)
                {
                    report_landlaws mm = new report_landlaws();
                    mm.unitid = model.unitid;
                    mm.unitname = model.unitname;
                    mm.createtime = DateTime.Now;
                    mm.createuserid = model.createuserid;
                    mm.classname = model.classname;
                    mm.reportid = 1;
                    mm.reportdate = Convert.ToDateTime(model.reportdate);
                    SetLandLawModel(model, mm);
                    db.report_landlaws.Add(mm);
                }
                else
                {
                    SetLandLawModel(model, report);
                }
                return db.SaveChanges();
            }

        }

        private static void SetLandLawModel(LandLawReportModel model, report_landlaws mm)
        {
            mm.ccwfjzmj = model.ccwfjzmj;
            mm.cfqt = model.cfqt;
            if (model.createunitid == model.unitid || mm.isreport == 1)
            {
                mm.isreport = 1;
            }
            else
            {
                mm.isreport = 0;
            }
            mm.isstatistics = 0;
            mm.cqqzcs = model.cqqzcs;
            mm.fkje = model.fkje;
            mm.gtbmyss = model.gtbmyss;
            mm.lacczjs = model.lacczjs;
            mm.mldzykn = model.mldzykn;
            mm.msmj = model.msmj;
            mm.mswfsd = model.mswfsd;
            mm.nysd = model.nysd;
            mm.qzgdmj = model.qzgdmj;
            mm.sazmj = model.sazmj;
            mm.sjcf = model.sjcf;
            mm.sqqzzxjs = model.sqqzzxjs;
            mm.tccfjy = model.tccfjy;
            mm.updatetime = DateTime.Now;
            mm.wfydajzjs = model.wfydajzjs;
            mm.wjazjs = model.wjazjs;
            mm.xdcfjdsjs = model.xdcfjdsjs;
            mm.xgdyjjy = model.xgdyjjy;
            mm.yjajs = model.yjajs;
            mm.ysgajg = model.ysgajg;
            mm.yysd = model.yysd;
            mm.zhzfbmslyss = model.zhzfbmslyss;
            mm.zjxszr = model.zjxszr;
            mm.zjxszrqt = model.zjxszrqt;
            mm.zygzld = model.zygzld;
            mm.czdzywt = model.czdzywt;
            mm.remark = model.remark;
        }

        #endregion

        #region （表二）安全生产（月报）
        /// <summary>
        /// 获取安全生产报表数据
        /// </summary>
        /// <returns></returns>
        public List<SafetifyinProductionReportModel> GetSafetifyinProductionReport(DateTime dt)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select 2 as reportid,1 as projectId,'当月' as project,3 as reportid,bu.id unitid,'当月' as classname,bu.`name` unitname,'{0}' as reportdate,rll.* from base_units bu 
LEFT JOIN report_safetifyinproductions rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m')='{1}' and rll.classname='当月'
where bu.unittypeid=2 and bu.code!=10
UNION 
select 2 as reportid,2 projectId,'累计' as projec,3 as reportid,bu.id unitid,'累计' as classname,bu.`name` unitname,'{0}' as reportdate,rsd.* from base_units bu 
LEFT JOIN report_safetifyinproductions rsd on rsd.unitid=bu.id and date_format(rsd.reportdate,'%Y-%m')='{1}' and rsd.classname='累计'
where bu.unittypeid=2 and bu.code!=10;
   ", dt.ToString("yyyy-MM-dd"), dt.ToString("yyyy-MM"));
                List<SafetifyinProductionReportModel> result = db.Database.SqlQuery<SafetifyinProductionReportModel>(sql).ToList();
                return result;
            }
        }

        /// <summary>
        /// 模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        public int SafetifyinProductionReportModel(SafetifyinProductionReportModel model)
        {
            using (Entities db = new Entities())
            {
                report_safetifyinproductions report = db.report_safetifyinproductions.Where(a => a.reportdate.Year == model.reportdate.Value.Year && a.reportdate.Month == model.reportdate.Value.Month && a.unitid == model.unitid && a.classname == model.classname).FirstOrDefault();
                if (report == null)
                {
                    report_safetifyinproductions mm = new report_safetifyinproductions();
                    mm.unitid = model.unitid;
                    mm.unitname = model.unitname;
                    mm.createtime = DateTime.Now;
                    mm.createuserid = model.createuserid;
                    mm.classname = model.classname;
                    mm.reportid = 2;
                    mm.reportdate = Convert.ToDateTime(model.reportdate);
                    SetSafetityModel(model, mm);
                    db.report_safetifyinproductions.Add(mm);
                }
                else
                {
                    SetSafetityModel(model, report);
                }
                return db.SaveChanges();
            }
        }

        private static void SetSafetityModel(SafetifyinProductionReportModel model, report_safetifyinproductions mm)
        {
            mm.cdzfry = model.cdzfry;
            mm.czdzywt = model.czdzywt;
            mm.fxaqyh = model.fxaqyh;
            mm.ja = model.ja;
            mm.jcfx = model.jcfx;
            mm.jcscjydw = model.jcscjydw;
            mm.jg = model.jg;
            mm.jsys = model.jsys;
            mm.la = model.la;
            if (model.createunitid == model.unitid || mm.isreport == 1)
            {
                mm.isreport = 1;
            }
            else
            {
                mm.isreport = 0;
            }
            mm.isstatistics = 0;
            mm.mldzykn = model.mldzykn;
            mm.sjsjfmk = model.sjsjfmk;
            mm.tctyzd = model.tctyzd;
            mm.tqgb = model.tqgb;
            mm.updatetime = DateTime.Now;
            mm.wczgaqyh = model.wczgaqyh;
            mm.xcclcsjds = model.xcclcsjds;
            mm.xcjcjl = model.xcjcjl;
            mm.xgdyjjy = model.xgdyjjy;
            mm.xswy = model.xswy;
            mm.zgfcyjs = model.zgfcyjs;
            mm.zlxqzgzls = model.zlxqzgzls;
            mm.zygzld = model.zygzld;
            mm.remark = model.remark;

            mm.jdfke = model.jdfke;
            mm.zyfzr = model.zyfzr;
            mm.aqsctj = model.aqsctj;
            mm.pxhczglgd = model.pxhczglgd;
            mm.sgyhpc = model.sgyhpc;
            mm.stsgd = model.stsgd;
            mm.sbglhjycsgd = model.sbglhjycsgd;
            mm.ldbhldhtgl = model.ldbhldhtgl;
            mm.yxkjzy = model.yxkjzy;
            mm.dwjjzajdgl = model.dwjjzajdgl;

            mm.preparer = model.preparer;
            mm.preparerphone = model.preparerphone;
            mm.shuser = model.shuser;
        }

        #endregion

        #region （表三）秸秆、城市垃圾露天焚烧执法管控情况报表（月报）

        /// <summary>
        /// 获取秸秆、城市垃圾露天焚烧报表数据
        /// </summary>
        /// <returns></returns>
        public List<StrawAndWasteControlModel> GetStrawAndWasteControlReport(DateTime dt)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select 3 as reportid,1 as projectId,'当月' as project,3 as reportid,bu.id unitid,'当月' as classname,bu.`name` unitname,'{0}' as reportdate,rll.* from base_units bu 
LEFT JOIN report_strawandwastecontrols rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m')='{1}' and rll.classname='当月'
where bu.unittypeid=2 and bu.code!=10
UNION 
select 3 as reportid,2 projectId,'累计' as projec,3 as reportid,bu.id unitid,'累计' as classname,bu.`name` unitname,'{0}' as reportdate,rsd.* from base_units bu 
LEFT JOIN report_strawandwastecontrols rsd on rsd.unitid=bu.id and date_format(rsd.reportdate,'%Y-%m')='{1}' and rsd.classname='累计'
where bu.unittypeid=2 and bu.code!=10;
   ", dt.ToString("yyyy-MM-dd"), dt.ToString("yyyy-MM"));
                List<StrawAndWasteControlModel> result = db.Database.SqlQuery<StrawAndWasteControlModel>(sql).ToList();
                return result;
            }
        }

        /// <summary>
        /// 模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        public int StrawAndWasteControlModelAddOrEdit(StrawAndWasteControlModel model)
        {
            using (Entities db = new Entities())
            {
                report_strawandwastecontrols report = db.report_strawandwastecontrols.Where(a => a.reportdate.Year == model.reportdate.Value.Year && a.reportdate.Month == model.reportdate.Value.Month && a.unitid == model.unitid && a.classname == model.classname).FirstOrDefault();
                if (report == null)
                {
                    report_strawandwastecontrols mm = new report_strawandwastecontrols();
                    mm.unitid = model.unitid;
                    mm.unitname = model.unitname;
                    mm.createtime = DateTime.Now;
                    mm.createuserid = model.createuserid;
                    mm.classname = model.classname;
                    mm.reportid = 3;
                    mm.reportdate = Convert.ToDateTime(model.reportdate);
                    SetStrawAndWasteControlModel(model, mm);
                    db.report_strawandwastecontrols.Add(mm);
                }
                else
                {
                    SetStrawAndWasteControlModel(model, report);
                }
                return db.SaveChanges();
            }
        }

        private static void SetStrawAndWasteControlModel(StrawAndWasteControlModel model, report_strawandwastecontrols mm)
        {
            mm.cdzfcl = model.cdzfcl;
            mm.cdzfry = model.cdzfry;
            mm.czdzywt = model.czdzywt;
            mm.fscsljja = model.fscsljja;
            mm.fscsljla = model.fscsljla;
            mm.fscsljsjsjfmk = model.fscsljsjsjfmk;
            mm.fxczmhd = model.fxczmhd;
            mm.fxczs = model.fxczs;
            mm.fxysjtd = model.fxysjtd;
            mm.ghmj1 = model.ghmj1;
            mm.ghmj2 = model.ghmj2;
            if (model.createunitid == model.unitid || mm.isreport == 1)
            {
                mm.isreport = 1;
            }
            else
            {
                mm.isreport = 0;
            }
            mm.isstatistics = 0;
            mm.kzzfdccs = model.kzzfdccs;
            mm.kzzfxccs1 = model.kzzfxccs1;
            mm.kzzfxccs2 = model.kzzfxccs2;
            mm.ltfsjgja = model.ltfsjgja;
            mm.ltfsjgla = model.ltfsjgla;
            mm.ltfsjgsjsjfk = model.ltfsjgsjsjfk;
            mm.mldzykn = model.mldzykn;
            mm.nyjyja = model.nyjyja;
            mm.nyjyla = model.nyjyla;
            mm.nyjysjsjfmk = model.nyjysjsjfmk;
            mm.remark = model.remark;
            mm.updatetime = DateTime.Now;
            mm.xgdyjjy = model.xgdyjjy;
            mm.zygzld = model.zygzld;
        }


        #endregion

        #region （表四）规模养殖场执法管控情况报表（月报）
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <returns></returns>
        public List<ScaleFarmsControlReportModel> GetScaleFarmsControl(DateTime dt)
        {
            using (Entities db = new Entities())
            {
                //DateTime dt = DateTime.Now;
                string sql = string.Format(@"select 4 as reportid,1 as projectId,'当月' as project,4 as reportid,bu.id unitid,'当月' as classname,bu.`name` unitname,'{0}' as reportdate,rll.* from base_units bu 
LEFT JOIN report_scalefarmscontrols rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m')='{1}' and rll.classname='当月'
where bu.unittypeid=2 and bu.code!=10
UNION 
select 4 as reportid, 2 projectId,'累计' as projec,4 as reportid,bu.id unitid,'累计' as classname,bu.`name` unitname,'{0}' as reportdate,rsd.* from base_units bu 
LEFT JOIN report_scalefarmscontrols rsd on rsd.unitid=bu.id and date_format(rsd.reportdate,'%Y-%m')='{1}' and rsd.classname='累计'
where bu.unittypeid=2 and bu.code!=10", dt.ToString("yyyy-MM-dd"), dt.ToString("yyyy-MM"));
                List<ScaleFarmsControlReportModel> result = db.Database.SqlQuery<ScaleFarmsControlReportModel>(sql).ToList();
                return result;
            }
        }

        /// <summary>
        /// 新增或者编辑报表数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int ScaleFarmsControlReportModelAddOrEdit(ScaleFarmsControlReportModel model)
        {
            using (Entities db = new Entities())
            {
                report_scalefarmscontrols report = db.report_scalefarmscontrols.Where(a => a.reportdate.Year == model.reportdate.Year && a.reportdate.Month == model.reportdate.Month && a.unitid == model.unitid && a.classname == model.classname).FirstOrDefault();
                if (report == null)
                {
                    //新增
                    report_scalefarmscontrols farms = new report_scalefarmscontrols();
                    farms.unitid = model.unitid;
                    farms.unitname = model.unitname;
                    farms.createtime = DateTime.Now;
                    farms.createuserid = model.createuserid;
                    farms.classname = model.classname;
                    farms.reportdate = Convert.ToDateTime(model.reportdate);
                    farms.reportid = 4;
                    SetFarmsControlReportModel(model, farms);
                    db.report_scalefarmscontrols.Add(farms);
                }
                else
                {
                    //编辑
                    SetFarmsControlReportModel(model, report);
                }
                return db.SaveChanges();
            }
        }

        private void SetFarmsControlReportModel(ScaleFarmsControlReportModel model, report_scalefarmscontrols report)
        {
            report.czdzywt = model.czdzywt;
            report.mldzykn = model.mldzykn;
            report.qtcc = model.qtcc;
            report.qtccwjmj = model.qtccwjmj;
            report.qtj = model.qtj;
            report.qtkjxqzgtzs = model.qtkjxqzgtzs;
            report.qtla = model.qtla;
            if (model.createunitid == model.unitid || report.isreport == 1)
            {
                report.isreport = 1;
            }
            else
            {
                report.isreport = 0;
            }
            report.isstatistics = 0;
            report.remark = model.remark;
            report.qtqt = model.qtqt;
            report.qtry = model.qtry;
            report.qtsjsjfmk = model.qtsjsjfmk;
            report.qty = model.qty;
            report.qtzfjccs = model.qtzfjccs;
            report.qtzfjcjl = model.qtzfjcjl;
            report.szcyl = model.szcyl;
            report.szja = model.szja;
            report.szla = model.szla;
            report.szsjjffmk = model.szsjjffmk;
            report.szxqzgtzs = model.szxqzgtzs;
            report.szyjsfjg = model.szyjsfjg;
            report.szzfjccs = model.szzfjccs;
            report.szzfjcjl = model.szzfjcjl;
            report.szzgyzwt = model.szzgyzwt;
            report.tqts = model.tqts;
            report.tqgb = model.tqgb;
            report.updatetime = DateTime.Now;
            report.xgdyjjy = model.xgdyjjy;
            report.zygzld = model.zygzld;
        }
        #endregion

        #region （表五）秀洲区综合行政执法局水行政执法情况报表（月报）
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <returns></returns>
        public List<LawInWaterModel> GetLawInWater(DateTime dt)
        {
            using (Entities db = new Entities())
            {
                //DateTime dt = DateTime.Now;
                string sql = string.Format(@"select 5 as reportid,1 as projectId,'当月' as project,5 as reportid,bu.id unitid,'当月' as classname,bu.`name` unitname,'{0}' as reportdate,rll.* from base_units bu 
LEFT JOIN report_lawinwaters rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m')='{1}' and rll.classname='当月'
where bu.unittypeid=2 and bu.code!=10
UNION 
select 5 as reportid,2 projectId,'累计' as projec,5 as reportid,bu.id unitid,'累计' as classname,bu.`name` unitname,'{0}' as reportdate,rsd.* from base_units bu 
LEFT JOIN report_lawinwaters rsd on rsd.unitid=bu.id and date_format(rsd.reportdate,'%Y-%m')='{1}' and rsd.classname='累计'
where bu.unittypeid=2 and bu.code!=10;", dt.ToString("yyyy-MM-dd"), dt.ToString("yyyy-MM"));
                List<LawInWaterModel> result = db.Database.SqlQuery<LawInWaterModel>(sql).ToList();
                return result;
            }
        }

        /// <summary>
        /// 新增或者编辑报表数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int LawInWaterReportModelAddOrEdit(LawInWaterModel model)
        {
            using (Entities db = new Entities())
            {
                report_lawinwaters report = db.report_lawinwaters.Where(a => a.reportdate.Year == model.reportdate.Year && a.reportdate.Month == model.reportdate.Month && a.unitid == model.unitid && a.classname == model.classname).FirstOrDefault();
                if (report == null)
                {
                    //新增
                    report_lawinwaters waters = new report_lawinwaters();
                    waters.unitid = model.unitid;
                    waters.unitname = model.unitname;
                    waters.createtime = DateTime.Now;
                    waters.reportid = 5;
                    waters.createuserid = model.createuserid;
                    waters.classname = model.classname;
                    waters.reportdate = Convert.ToDateTime(model.reportdate);
                    SetLawInWaterReportModel(model, waters);
                    db.report_lawinwaters.Add(waters);
                }
                else
                {
                    //编辑
                    SetLawInWaterReportModel(model, report);
                }
                return db.SaveChanges();
            }
        }

        private void SetLawInWaterReportModel(LawInWaterModel model, report_lawinwaters report)
        {
            report.cdzfcl = model.cdzfcl;
            report.cdzfry = model.cdzfry;
            report.csgsl = model.csgsl;
            report.czdzywt = model.czdzywt;
            report.fxsswt = model.fxsswt;
            report.hdfqw = model.hdfqw;
            report.jas = model.jas;
            report.jcfx = model.jcfx;
            if (model.createunitid == model.unitid || report.isreport == 1)
            {
                report.isreport = 1;
            }
            else
            {
                report.isreport = 0;
            }
            report.isstatistics = 0;
            report.remark = model.remark;
            report.jsfaxhdjzw = model.jsfaxhdjzw;
            report.jsys = model.jsys;
            report.kzzfxccs = model.kzzfxccs;
            report.mldzykn = model.mldzykn;
            report.ncgsl = model.ncgsl;
            report.pslj = model.pslj;
            report.psywscll = model.psywscll;
            report.remark = model.remark;
            report.sjsjfmk = model.sjsjfmk;
            report.updatetime = DateTime.Now;
            report.wczgsswt = model.wczgsswt;
            report.xgdyjjy = model.xgdyjjy;
            report.zlas = model.zlas;
            report.zlxqzgtzs = model.zlxqzgtzs;
            report.zygzld = model.zygzld;
            report.tsjb = model.tsjb;
            report.preparer = model.preparer;
            report.preparerphone = model.preparerphone;
            report.shuser = model.shuser;

        }
        #endregion

        #region （表六）秀洲区综合行政执法局中心工作开展情况报表（季度报）
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <returns></returns>
        public List<BureauCenterWorkReportModel> GetBureauCenterWork(DateTime dt)
        {
            using (Entities db = new Entities())
            {
                //DateTime dt = DateTime.Now;
                string sql = string.Format(@"select 6 as reportid,1 as projectId,'当月' as project,6 as reportid,bu.id unitid,'当月' as classname,bu.`name` unitname,'{0}' as reportdate,rll.* from base_units bu 
LEFT JOIN report_bureaucenterworks rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m')='{1}' and rll.classname='当月'
where bu.unittypeid=2 and bu.code!=10
UNION 
select 6 as reportid,2 projectId,'累计' as projec,6 as reportid,bu.id unitid,'累计' as classname,bu.`name` unitname,'{0}' as reportdate,rsd.* from base_units bu 
LEFT JOIN report_bureaucenterworks rsd on rsd.unitid=bu.id and date_format(rsd.reportdate,'%Y-%m')='{1}' and rsd.classname='累计'
where bu.unittypeid=2 and bu.code!=10;
", dt.ToString("yyyy-MM-dd"), dt.ToString("yyyy-MM"));
                List<BureauCenterWorkReportModel> result = db.Database.SqlQuery<BureauCenterWorkReportModel>(sql).ToList();
                return result;
            }
        }

        /// <summary>
        /// 新增或者编辑报表数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int BureauCenterWorkModelAddOrEdit(BureauCenterWorkReportModel model)
        {
            using (Entities db = new Entities())
            {
                report_bureaucenterworks report = db.report_bureaucenterworks.Where(a => a.reportdate.Year == model.reportdate.Year && a.reportdate.Month == model.reportdate.Month && a.unitid == model.unitid && a.classname == model.classname).FirstOrDefault();
                if (report == null)
                {
                    //新增
                    report_bureaucenterworks waters = new report_bureaucenterworks();
                    waters.unitid = model.unitid;
                    waters.unitname = model.unitname;
                    waters.createtime = DateTime.Now;
                    waters.reportid = 6;
                    waters.createuserid = model.createuserid;
                    waters.classname = model.classname;
                    waters.reportdate = Convert.ToDateTime(model.reportdate);
                    SetBureauCenterWorkReportModel(model, waters);
                    db.report_bureaucenterworks.Add(waters);
                }
                else
                {
                    //编辑
                    SetBureauCenterWorkReportModel(model, report);
                }
                return db.SaveChanges();
            }
        }

        private void SetBureauCenterWorkReportModel(BureauCenterWorkReportModel model, report_bureaucenterworks report)
        {
            report.cccztsjb = model.cccztsjb;
            report.ccsjsjfmk = model.ccsjsjfmk;
            report.ccyyczzwt = model.ccyyczzwt;
            report.ccyyla = model.ccyyla;
            report.czccmj = model.czccmj;
            report.czczmj = model.czczmj;
            report.czdzywt = model.czdzywt;
            report.czja = model.czja;
            report.czla = model.czla;
            report.czsjsjfmk = model.czsjsjfmk;
            report.czxzccmj = model.czxzccmj;
            report.czzsmj = model.czzsmj;
            report.dlcztsjb = model.dlcztsjb;
            report.dlczzwt = model.dlczzwt;
            report.dlla = model.dlla;
            if (model.createunitid == model.unitid || report.isreport == 1)
            {
                report.isreport = 1;
            }
            else
            {
                report.isreport = 0;
            }
            report.isstatistics = 0;
            report.remark = model.remark;
            report.dlsjsjfmk = model.dlsjsjfmk;
            report.fxzghdwt = model.fxzghdwt;
            report.fzhdmc = model.fzhdmc;
            report.gmczf = model.gmczf;
            report.jgcsljfs = model.jgcsljfs;
            report.kzzfcs = model.kzzfcs;
            report.mldzykn = model.mldzykn;
            report.qlczmj = model.qlczmj;
            report.qlczsl = model.qlczsl;
            report.shzf = model.shzf;
            report.updatetime = DateTime.Now;
            report.xccs = model.xccs;
            report.xgdyjjy = model.xgdyjjy;
            report.zlxqzgtzs = model.zlxqzgtzs;
            report.zygzld = model.zygzld;
        }
        #endregion

        #region （表七）H7N9疫情(活禽交易)防控工作信息日报表（日报）
        public List<H7N7ReportModel> GetH7N7Report(DateTime reportdate)
        {
            using (Entities db = new Entities())
            {
                DateTime dt = DateTime.Now;
                string sql = string.Format(@"select 7 as reportid,1 as projectId,'乡镇' as project,bu.id unitid,CONCAT(left(bu.`name`,char_length(bu.`name`)-2),'镇') as unitname,'乡镇' as classname,'{0}' as reportdate,rll.* from base_units bu 
left JOIN report_h7n7s rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m-%d')='{0}'
where bu.unittypeid=2 and bu.code not in(10,11,12)
UNION 
select 7 as reportid,2 projectId,'街道' as project,bu.id unitid,bu.`name` as unitname,'街道' as classname,'{0}' as reportdate,rsd.* from base_units bu 
left JOIN report_h7n7s rsd on rsd.unitid=bu.id and date_format(rsd.reportdate,'%Y-%m-%d')='{0}'
where bu.unittypeid=5 and bu.code not in(10,11,12)
", reportdate.ToString("yyyy-MM-dd"));
                List<H7N7ReportModel> result = db.Database.SqlQuery<H7N7ReportModel>(sql).ToList();
                return result;
            }
        }

        public int H7N7ReportAddOrEdit(H7N7ReportModel model)
        {
            using (Entities db = new Entities())
            {
                report_h7n7s report = db.report_h7n7s.Where(a => a.reportdate.Year == model.reportdate.Year && a.reportdate.Month == model.reportdate.Month && a.unitid == model.unitid && a.reportdate.Day == model.reportdate.Day && a.unitname == model.unitname).FirstOrDefault();
                {
                    if (report == null)
                    {
                        //新增
                        report_h7n7s h7n7 = new report_h7n7s();
                        h7n7.unitid = model.unitid;
                        h7n7.reportid = 7;
                        h7n7.unitname = model.unitname;
                        h7n7.createtime = DateTime.Now;
                        h7n7.createuserid = model.createuserid;
                        h7n7.reportdate = DateTime.Now;
                        setH7N7ReportModel(model, h7n7);
                        db.report_h7n7s.Add(h7n7);
                    }
                    else
                    {
                        setH7N7ReportModel(model, report);
                    }
                }
                return db.SaveChanges();
            }
        }
        private void setH7N7ReportModel(H7N7ReportModel model, report_h7n7s report)
        {
            report.cchqjy = model.cchqjy;
            report.cdcl = model.cdcl;
            report.cdry = model.cdry;
            report.createuserid = model.createunitid;
            report.czhqsl = model.czhqsl;
            report.drgzzf = model.drgzzf;
            report.ffxczl = model.ffxczl;
            if (model.createunitid == model.unitid || report.isreport == 1)
            {
                report.isreport = 1;
            }
            else
            {
                report.isreport = 0;
            }
            report.remark = model.remark;
            report.isstatistics = 0;
            report.qlhqjy = model.qlhqjy;
            report.qt = model.qt;
            report.updatetime = DateTime.Now;
            report.xccs = model.xccs;
        }
        #endregion

        #region （表八）特殊时期（互联网峰会）环境保障工作日报表（日报）
        public List<SpecialPeriodReportModel> GetSpecialPeriodReport(DateTime reportdate)
        {
            using (Entities db = new Entities())
            {
                DateTime dt = DateTime.Now;
                string sql = string.Format(@"select  8 as reportid,bu.id unitid,bu.`name` unitname,'{0}' as reportdate,rif.starttime,rif.endtime,rif.whattime,rll.* from base_units bu 
left JOIN report_specialperiodenvirprots rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m-%d')='{0}'
left join report_infos rif on rif.reportid=8
where bu.unittypeid=2 and bu.code!=10 order by bu.id
", reportdate.ToString("yyyy-MM-dd"));
                List<SpecialPeriodReportModel> result = db.Database.SqlQuery<SpecialPeriodReportModel>(sql).ToList();
                return result;
            }
        }

        public int SpecialPeriodReportAddOrEdit(SpecialPeriodReportModel model)
        {
            using (Entities db = new Entities())
            {
                report_specialperiodenvirprots report = db.report_specialperiodenvirprots.Where(a => a.reportdate.Year == model.reportdate.Year && a.reportdate.Month == model.reportdate.Month && a.unitid == model.unitid && a.reportdate.Day == model.reportdate.Day && a.unitname == model.unitname).FirstOrDefault();
                {
                    if (report == null)
                    {
                        //新增
                        report_specialperiodenvirprots special = new report_specialperiodenvirprots();
                        special.unitid = model.unitid;
                        special.reportid = 8;
                        special.unitname = model.unitname;
                        special.createtime = DateTime.Now;
                        special.createuserid = model.createuserid;
                        special.reportdate = DateTime.Now;
                        setSpecialPeriodReportModel(model, special);
                        db.report_specialperiodenvirprots.Add(special);
                    }
                    else
                    {
                        setSpecialPeriodReportModel(model, report);
                    }
                }
                return db.SaveChanges();
            }
        }
        private void setSpecialPeriodReportModel(SpecialPeriodReportModel model, report_specialperiodenvirprots report)
        {
            if (model.createunitid == model.unitid || report.isreport == 1)
            {
                report.isreport = 1;
            }
            else
            {
                report.isreport = 0;
            }
            report.isstatistics = 0;
            report.updatetime = DateTime.Now;
            report.bzcslshdcqk = model.bzcslshdcqk;
            report.cdcc = model.cdcc;
            report.cdrs = model.cdrs;
            report.dccs = model.dccs;
            report.drjxyrdgzap = model.drjxyrdgzap;
            report.ffxcgzs = model.ffxcgzs;
            report.fkje = model.fkje;
            report.fkjey = model.fkjey;
            report.fxs = model.fxs;
            report.fxwtycljg = model.fxwtycljg;
            report.gdzbcsctfy = model.gdzbcsctfy;
            report.ghzmj = model.ghzmj;
            report.qd = model.qd;
            report.shuser = model.shuser;
            report.starttime = model.starttime;
            report.endtime = model.endtime;
            report.statisticsuser = model.statisticsuser;
            report.syqdjzlj = model.syqdjzlj;
            report.wagdsjqyjzlj = model.wagdsjqyjzlj;
            report.wzqyjzlj = model.wzqyjzlj;
            report.xysjcmxtjjsx = model.xysjcmxtjjsx;
            report.xzzf = model.xzzf;
            report.zg = model.zg;
            report.zgwcs = model.zgwcs;
            report.zgzmj = model.zgzmj;
            report.remark = model.remark;
            report.statisticsuser = model.statisticsuser;
            report.bzcslshdcqk = model.bzcslshdcqk;
            report.fxwtycljg = model.fxwtycljg;
            report.drjxyrdgzap = model.drjxyrdgzap;
            report.xysjcmxtjjsx = model.xysjcmxtjjsx;
        }
        #endregion

        #region （表九）土地执法案件情况统计汇总表（半月报）

        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public List<LandLawReportModel> GetLandLawHalfMonthReport(DateTime dt)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select 9 as reportid, 1 as projectId,'总数' as project,'总数' as classname,bu.id unitid,bu.`name` as unitname,rll.* from base_units bu 
LEFT JOIN report_landlaws rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m-%d')='{0}' and rll.classname='总数'
where bu.unittypeid=2 and bu.code!=10
UNION ALL
select 9 as reportid,2 projectId,'卫片' as project,'卫片' as classname,bu.id unitid,bu.`name` as unitname,rll.* from base_units bu 
LEFT JOIN report_landlaws rll on rll.unitid=bu.id and date_format(rll.reportdate,'%Y-%m-%d')='{0}' and rll.classname='卫片'
where bu.unittypeid=2 and bu.code!=10", dt.ToString("yyyy-MM")+"-15");
                List<LandLawReportModel> result = db.Database.SqlQuery<LandLawReportModel>(sql).ToList();
                return result;
            }
        }

        /// <summary>
        /// 模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        public int LandLawHalfMonthAddOrEdit(LandLawReportModel model)
        {
            using (Entities db = new Entities())
            {
                report_landlaws report = db.report_landlaws.Where(a => a.reportdate.Year == model.reportdate.Value.Year && a.reportdate.Month == model.reportdate.Value.Month && a.unitid == model.unitid && a.classname == model.classname).FirstOrDefault();

                if (report == null)
                {
                    report_landlaws mm = new report_landlaws();
                    mm.unitid = model.unitid;
                    mm.unitname = model.unitname;
                    mm.createtime = DateTime.Now;
                    mm.createuserid = model.createuserid;
                    mm.classname = model.classname;
                    mm.reportid = 9;
                    mm.reportdate = Convert.ToDateTime(model.reportdate);
                    SetLandLawModel(model, mm);
                    db.report_landlaws.Add(mm);
                }
                else
                {
                    SetLandLawModel(model, report);
                }
                return db.SaveChanges();
            }

        }

        private static void SetLandLawHalfMonthModel(LandLawReportModel model, report_landlaws mm)
        {
            mm.ccwfjzmj = model.ccwfjzmj;
            mm.cfqt = model.cfqt;
            if (model.createunitid == model.unitid || mm.isreport == 1)
            {
                mm.isreport = 1;
            }
            else
            {
                mm.isreport = 0;
            }
            mm.isstatistics = 0;
            mm.cqqzcs = model.cqqzcs;
            mm.fkje = model.fkje;
            mm.gtbmyss = model.gtbmyss;
            mm.lacczjs = model.lacczjs;
            mm.mldzykn = model.mldzykn;
            mm.msmj = model.msmj;
            mm.mswfsd = model.mswfsd;
            mm.nysd = model.nysd;
            mm.qzgdmj = model.qzgdmj;
            mm.sazmj = model.sazmj;
            mm.sjcf = model.sjcf;
            mm.sqqzzxjs = model.sqqzzxjs;
            mm.tccfjy = model.tccfjy;
            mm.updatetime = DateTime.Now;
            mm.wfydajzjs = model.wfydajzjs;
            mm.wjazjs = model.wjazjs;
            mm.xdcfjdsjs = model.xdcfjdsjs;
            mm.xgdyjjy = model.xgdyjjy;
            mm.yjajs = model.yjajs;
            mm.ysgajg = model.ysgajg;
            mm.yysd = model.yysd;
            mm.zhzfbmslyss = model.zhzfbmslyss;
            mm.zjxszr = model.zjxszr;
            mm.zjxszrqt = model.zjxszrqt;
            mm.zygzld = model.zygzld;
            mm.czdzywt = model.czdzywt;
            mm.remark = model.remark;
        }

        #endregion
 
        #region 获取待填报表列表
        public Pag<ReportListModel> GetReportList(List<Filter> filters, int start, int limit)
        {
            Pag<ReportListModel> list = new Pag<ReportListModel>();
            using (Entities db = new Entities())
            {
                DateTime dt = DateTime.Now;

                #region sql查询
                string sql = string.Format(@"select * FROM(
-- reportid=1
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,ifnull(a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day)) reportdate from 
report_infos rif 
join 
(select ifnull(t.reportid,1) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,l.reportdate from report_landlaws l where l.isreport=1 and (l.reportdate BETWEEN date_add(curdate(), interval - day(curdate()) + 1 day) AND date_add(curdate(), interval - day(curdate()) + 25 day)))t) b
on rif.reportid=b.reportid and rif.reportid=1
left join 
(select ifnull(l.reportid,1) reportid,l.isstatistics,l.reportdate from report_landlaws l
where date_format(l.reportdate,'%Y-%m-%d')='{2}'
group by l.reportdate) a
on rif.reportid=a.reportid
where  find_in_set(month(curdate()),rif.statistics) and rif.isenable=1 
union 
-- reportid=2
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,ifnull(a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day)) reportdate from 
report_infos rif 
join 
(select ifnull(t.reportid,2) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,l.reportdate from report_safetifyinproductions l where l.isreport=1 and (l.reportdate BETWEEN date_add(curdate(), interval - day(curdate()) + 1 day) AND date_add(curdate(), interval - day(curdate()) + 25 day)))t) b
on rif.reportid=b.reportid and rif.reportid=2
left join 
(select ifnull(l.reportid,2) reportid,l.isstatistics,l.reportdate from report_safetifyinproductions l
where date_format(l.reportdate,'%Y-%m')='{0}'
group by l.reportdate) a
on rif.reportid=a.reportid
where  find_in_set(month(curdate()),rif.statistics) and rif.isenable=1 
union 
-- reportid=3
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,ifnull(a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day)) reportdate from 
report_infos rif 
join 
(select ifnull(t.reportid,3) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,l.reportdate from report_strawandwastecontrols l where l.isreport=1 and (l.reportdate BETWEEN date_add(curdate(), interval - day(curdate()) + 1 day) AND date_add(curdate(), interval - day(curdate()) + 25 day)))t) b
on rif.reportid=b.reportid and rif.reportid=3
left join 
(select ifnull(l.reportid,3) reportid,l.isstatistics,l.reportdate from report_strawandwastecontrols l
where date_format(l.reportdate,'%Y-%m')='{0}'
group by l.reportdate) a
on rif.reportid=a.reportid
where  find_in_set(month(curdate()),rif.statistics) and rif.isenable=1 
union
-- reportid=4
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,ifnull(a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day)) reportdate from 
report_infos rif 
join 
(select ifnull(t.reportid,4) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,l.reportdate from report_scalefarmscontrols l where l.isreport=1 and (l.reportdate BETWEEN date_add(curdate(), interval - day(curdate()) + 1 day) AND date_add(curdate(), interval - day(curdate()) + 25 day)))t) b
on rif.reportid=b.reportid and rif.reportid=4
left join 
(select ifnull(l.reportid,4) reportid,l.isstatistics,l.reportdate from report_scalefarmscontrols l
where date_format(l.reportdate,'%Y-%m')='{0}'
group by l.reportdate) a
on rif.reportid=a.reportid
where  find_in_set(month(curdate()),rif.statistics) and rif.isenable=1 
union
-- reportid=5
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,ifnull(a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day)) reportdate from 
report_infos rif 
join 
(select ifnull(t.reportid,5) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,l.reportdate from report_lawinwaters l where l.isreport=1 and (l.reportdate BETWEEN date_add(curdate(), interval - day(curdate()) + 1 day) AND date_add(curdate(), interval - day(curdate()) + 25 day)))t) b
on rif.reportid=b.reportid and rif.reportid=5
left join 
(select ifnull(l.reportid,5) reportid,l.isstatistics,l.reportdate from report_lawinwaters l
where date_format(l.reportdate,'%Y-%m')='{0}'
group by l.reportdate) a
on rif.reportid=a.reportid
where  find_in_set(month(curdate()),rif.statistics) and rif.isenable=1 
union 
-- reportid=7
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,ifnull(a.reportdate,curdate()) reporttime,ifnull(a.reportdate,curdate()) reportdate from 
report_infos rif  
join 
(select ifnull(t.reportid,7) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,reportdate from report_h7n7s l where l.isreport=1 and l.reportdate =curdate() )t) b
on rif.reportid=b.reportid and rif.reportid=7
left join 
(select ifnull(l.reportid,7) reportid,l.isstatistics,l.reportdate from report_h7n7s l
where date_format(l.reportdate,'%Y-%m-%d')='{1}'
group by l.reportdate) a
on rif.reportid=a.reportid
where (CURDATE() BETWEEN rif.starttime and rif.endtime) and rif.isenable=1
union
-- reportid=8
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,ifnull(a.reportdate,curdate()) reporttime,ifnull(a.reportdate,curdate()) reportdate from 
report_infos rif  
join 
(select ifnull(t.reportid,8) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,reportdate from report_specialperiodenvirprots l where l.isreport=1 and l.reportdate =curdate() )t) b
on rif.reportid=b.reportid and rif.reportid=8
left join 
(select ifnull(l.reportid,8) reportid,l.isstatistics,l.reportdate from report_specialperiodenvirprots l
where date_format(l.reportdate,'%Y-%m-%d')='{1}'
group by l.reportdate) a
on rif.reportid=a.reportid
where rif.reportid=8 and (CURDATE() BETWEEN rif.starttime and rif.endtime) and rif.isenable=1
union 
-- reportid=6
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,ifnull(a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day)) reportdate from 
report_infos rif 
join 
(select ifnull(t.reportid,6) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,l.reportdate from report_bureaucenterworks l where l.isreport=1 and (l.reportdate BETWEEN date_add(curdate(), interval - day(curdate()) + 1 day) AND date_add(curdate(), interval - day(curdate()) + 25 day)))t) b
on rif.reportid=b.reportid and rif.reportid=6
left join 
(select ifnull(l.reportid,6) reportid,l.isstatistics,l.reportdate from report_bureaucenterworks l
where date_format(l.reportdate,'%Y-%m')='{0}'
group by l.reportdate) a
on rif.reportid=a.reportid
where  find_in_set(month(curdate()),rif.statistics) and rif.isenable=1
union 
-- reportid=9
select rif.reportid,rif.reportname,rif.reporttype,b.unitname,ifnull(a.isstatistics,0) isstatistics,date_add(curdate(), interval - day(curdate()) + 15 day) reporttime,ifnull(a.reportdate,date_add(curdate(), interval - day(curdate()) + 15 day)) reportdate from 
report_infos rif 
join 
(select ifnull(t.reportid,9) reportid,GROUP_CONCAT(t.unitname) unitname
from (select DISTINCT reportid,l.unitname,l.reportdate from report_landlaws l where l.isreport=1 and (l.reportdate BETWEEN date_add(curdate(), interval - day(curdate()) + 1 day) AND date_add(curdate(), interval - day(curdate()) + 15 day)))t) b
on rif.reportid=b.reportid and rif.reportid=9
left join 
(select ifnull(l.reportid,9) reportid,l.isstatistics,l.reportdate from report_landlaws l
where date_format(l.reportdate,'%Y-%m-%d')='{3}'
group by l.reportdate) a
on rif.reportid=a.reportid
where  find_in_set(month(curdate()),rif.statistics) and rif.isenable=1 
) tab 
where tab.isstatistics=0
order by tab.reportid", dt.ToString("yyyy-MM"), dt.ToString("yyyy-MM-dd"), dt.ToString("yyyy-MM") + "-25", dt.ToString("yyyy-MM") + "-15");
                #endregion
                
                IEnumerable<ReportListModel> queryable = db.Database.SqlQuery<ReportListModel>(sql);

                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "reportname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.reportname.Contains(value));
                                }
                                break;
                            case "reportdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime reportdate = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.reportdate == reportdate);
                                }
                                break;
                        };
                    }
                }
                #endregion
                
                IOrderedEnumerable<ReportListModel> temp = queryable.OrderByDescending(a => a.reportid);
                list = PagHelper.CreatPagList(temp, start, limit);
                return list;
            }
        }
        #endregion

        #region 获取历史报表列表
        public Pag<ReportListModel> GetHisReportList(List<Filter> filters, int start, int limit)
        {
            Pag<ReportListModel> list = new Pag<ReportListModel>();
            using (Entities db = new Entities())
            {
                DateTime dt = DateTime.Now;

                #region sql查询
                string sql = string.Format(@"select * from 
(select a.reportid,rif.reportname,rif.reporttype,a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,b.unitname
from 
(select * 
from report_landlaws l
group by l.reportdate) a
left join (select ifnull(t.reportid,1) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_landlaws l where l.isreport=1)t GROUP BY t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=1
union 
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,b.unitname
from 
(select * 
from report_safetifyinproductions l
group by l.reportdate) a
left join (select ifnull(t.reportid,2) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_safetifyinproductions l where l.isreport=1)t GROUP BY t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=2
union 
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,b.unitname
from 
(select * 
from report_strawandwastecontrols l
group by l.reportdate) a
left join (select ifnull(t.reportid,3) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_strawandwastecontrols l where l.isreport=1)t GROUP BY t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=3
union 
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,b.unitname
from 
(select * 
from report_scalefarmscontrols l
group by l.reportdate) a
left join (select ifnull(t.reportid,4) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_scalefarmscontrols l where l.isreport=1)t GROUP BY t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=4
union 
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,b.unitname
from 
(select * 
from report_lawinwaters l
group by l.reportdate) a
left join (select ifnull(t.reportid,5) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_lawinwaters l where l.isreport=1)t GROUP BY t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=5
union 
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,a.reportdate reporttime,b.unitname
from 
(select * 
from report_h7n7s l
group by l.reportdate) a
left join (select ifnull(t.reportid,7) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_h7n7s l where l.isreport=1)t group by t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=7 
union 
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,date_add(curdate(), interval - day(curdate()) + 25 day) reporttime,b.unitname
from 
(select * 
from report_bureaucenterworks l
group by l.reportdate) a
left join (select ifnull(t.reportid,6) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_bureaucenterworks l where l.isreport=1)t GROUP BY t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=6
union 
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,a.reportdate reporttime,b.unitname
from 
(select * 
from report_specialperiodenvirprots l
group by l.reportdate) a
left join (select ifnull(t.reportid,8) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_specialperiodenvirprots l where l.isreport=1)t group by t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=8
union
select a.reportid,rif.reportname,rif.reporttype,a.reportdate,date_add(curdate(), interval - day(curdate()) + 15 day) reporttime,b.unitname
from 
(select * 
from report_landlaws l
group by l.reportdate) a
left join (select ifnull(t.reportid,1) reportid,t.reportdate,GROUP_CONCAT(t.unitname) as unitname from 
(select DISTINCT reportid,l.unitname,l.reportdate from report_landlaws l where l.isreport=1)t GROUP BY t.reportdate) b
on a.reportid=b.reportid and a.reportdate=b.reportdate
join report_infos rif on rif.reportid=a.reportid and rif.reportid=9
) tab
order by STR_TO_DATE(tab.reportdate,'%Y-%m-%d') desc");
                #endregion

                IEnumerable<ReportListModel> queryable = db.Database.SqlQuery<ReportListModel>(sql);

                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "reportname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.reportname.Contains(value));
                                }
                                break;
                            case "reportdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime reportdate = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.reportdate == reportdate);
                                }
                                break;
                        };
                    }
                }
                #endregion
                
                IOrderedEnumerable<ReportListModel> temp = queryable.OrderByDescending(a => a.reportdate);
                list = PagHelper.CreatPagList(temp, start, limit);
                return list;
            }
        }
        #endregion

        #region 获取累计报表列表
        public Pag<ReportListModel> GetAddUpReportList(List<Filter> filters, int start, int limit)
        {
            Pag<ReportListModel> list = new Pag<ReportListModel>();
            using (Entities db = new Entities())
            {
                #region sql查询
                string sql = string.Format(@"
-- reportid =2
select info.reportid,YEAR(a.reportdate) as reportyear,info.reportname from report_safetifyinproductions a
LEFT JOIN report_infos info on a.reportid=info.reportid 
where a.isstatistics=1 and info.reportid=2
group by YEAR(a.reportdate)
union
-- reportid =3
select info.reportid,YEAR(a.reportdate) as reportyear,info.reportname from report_strawandwastecontrols a
LEFT JOIN report_infos info on a.reportid=info.reportid 
where a.isstatistics=1 and info.reportid=3
group by YEAR(a.reportdate)
union
-- reportid =4
select info.reportid,YEAR(a.reportdate) as reportyear,info.reportname from report_scalefarmscontrols a
LEFT JOIN report_infos info on a.reportid=info.reportid 
where a.isstatistics=1 and info.reportid=4
group by YEAR(a.reportdate)
union
-- reportid =5
select info.reportid,YEAR(a.reportdate) as reportyear,info.reportname from report_lawinwaters a
LEFT JOIN report_infos info on a.reportid=info.reportid 
where a.isstatistics=1 and info.reportid=5
group by YEAR(a.reportdate)
union
-- reportid =6
select info.reportid,YEAR(a.reportdate) as reportyear,info.reportname from report_bureaucenterworks a
LEFT JOIN report_infos info on a.reportid=info.reportid 
where a.isstatistics=1 and info.reportid=6
group by YEAR(a.reportdate)
");
                #endregion

                IEnumerable<ReportListModel> queryable = db.Database.SqlQuery<ReportListModel>(sql);

                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "reportname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.reportname.Contains(value));
                                }
                                break;
                            case "reportyear":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int reportYear = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.reportyear == reportYear);
                                }
                                break;
                        };
                    }
                }
                #endregion

                IOrderedEnumerable<ReportListModel> temp = queryable.OrderByDescending(a => a.reportyear);
                list = PagHelper.CreatPagList(temp, start, limit);
                return list;
            }
        }
        #endregion

        #region 获取报表模板列表
        public Pag<ReportListModel> GetTemplateList(List<Filter> filters, int start, int limit, int userid)
        {
            Pag<ReportListModel> list = new Pag<ReportListModel>();
            using (Entities db = new Entities())
            {
                string sql = @"select infos.*,
(case 
when infos.reporttype=1 then '日报'
when infos.reporttype=2 then '月报'
when infos.reporttype=4 then '半月报'
else  '季报'
end) reporttypename,
(case 
when infos.isenable=1 then '是'
else '否'
end) isactived
from report_infos infos
";
                IEnumerable<ReportListModel> queryable = db.Database.SqlQuery<ReportListModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "reportname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.reportname.Contains(value));
                                }
                                break;
                        };
                    }
                }
                IOrderedEnumerable<ReportListModel> temp = queryable.OrderByDescending(a => a.reportid);
                list = PagHelper.CreatPagList(temp, start, limit);
                return list;
            }
        }
        #endregion

        #region 启用报表模板
        public int EnableReport(ReportListModel model)
        {
            using (Entities db = new Entities())
            {
                report_infos infos = db.report_infos.FirstOrDefault(t => t.reportid == model.reportid);
                if (infos != null)
                {
                    infos.remark = model.remark;
                    infos.endtime = model.endtime;
                    infos.isenable = model.isenable;
                    infos.starttime = model.starttime;
                    infos.statistics = model.statistics;
                    infos.whattime = model.whattime;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 编辑报表模板
        public int ModifyTemplateReport(ReportListModel model)
        {
            using (Entities db = new Entities())
            {
                report_infos infos = db.report_infos.FirstOrDefault(t => t.reportid == model.reportid);
                if (infos != null)
                {
                    infos.remark = model.remark;
                    infos.endtime = model.endtime;
                    infos.isenable = model.isenable;
                    infos.starttime = model.starttime;
                    infos.statistics = model.statistics;
                    infos.whattime = model.whattime;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 报表统计
        public int StatisticalReport(int reportid, DateTime reportdate, string remark)
        {
            using (Entities db = new Entities())
            {
                if (reportid == 1)
                {
                    List<report_landlaws> list = db.report_landlaws.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_landlaws report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                else if (reportid == 2)
                {

                    List<report_safetifyinproductions> list = db.report_safetifyinproductions.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_safetifyinproductions report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                else if (reportid == 3)
                {
                    List<report_strawandwastecontrols> list = db.report_strawandwastecontrols.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_strawandwastecontrols report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                else if (reportid == 4)
                {
                    List<report_scalefarmscontrols> list = db.report_scalefarmscontrols.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_scalefarmscontrols report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                else if (reportid == 5)
                {
                    List<report_lawinwaters> list = db.report_lawinwaters.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_lawinwaters report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                else if (reportid == 6)
                {
                    List<report_bureaucenterworks> list = db.report_bureaucenterworks.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_bureaucenterworks report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                else if (reportid == 7)
                {
                    List<report_h7n7s> list = db.report_h7n7s.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_h7n7s report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                else if (reportid == 8)
                {
                    List<report_specialperiodenvirprots> list = db.report_specialperiodenvirprots.Where(t => t.reportid == reportid && t.reportdate == reportdate).ToList();
                    if (list != null)
                    {
                        foreach (report_specialperiodenvirprots report in list)
                        {
                            report.updatetime = DateTime.Now;
                            report.remark = remark;
                            report.isstatistics = 1;
                        }
                    }
                }
                return db.SaveChanges();
            }
        }
        #endregion

        #region 累计报表查看

        #region 表二
        /// <summary>
        /// （表二）安全生产（月报）
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public List<SafetifyinProductionReportModel> ViewAddUpSafetifyinProductionReport(int year)
        {
            //安全生产（月报）
            List<SafetifyinProductionReportModel> list = new List<SafetifyinProductionReportModel>();
            using (Entities db = new Entities())
            {
                #region sql查询
                string landlawsql = string.Format(@"
select t.reportmonth as months,t.month as month,IFNULL(b.reportyear,{0}) year,b.* from (
select 1 as 'reportmonth','1月' as 'month' from dual
union 
select 2,'2月' from dual
union 
select 3,'3月' from dual
union 
select 4,'4月' from dual
union 
select 5,'5月' from dual
union 
select 6,'6月' from dual
union 
select 7,'7月' from dual
union
select 8,'8月' from dual
union 
select 9,'9月' from dual
union 
select 10,'10月' from dual
union 
select 11,'11月' from dual
union 
select 12,'12月' from dual) t
left join (select a.reportid,month(a.reportdate)
 as reportmonth,year(a.reportdate) reportyear,SUM(cdzfry) cdzfry,SUM(jcscjydw) jcscjydw,SUM(fxaqyh) fxaqyh,SUM(wczgaqyh) wczgaqyh,
SUM(xcjcjl) xcjcjl,SUM(zlxqzgzls) zlxqzgzls,SUM(xcclcsjds) xcclcsjds,SUM(zgfcyjs) zgfcyjs,SUM(jsys) jsys,SUM(jcfx) jcfx,SUM(xswy) xswy,SUM(la) la,SUM(ja) ja,SUM(jg) jg,SUM(sjsjfmk) sjsjfmk,SUM(tctyzd) tctyzd,SUM(tqgb) tqgb, 
SUM(jdfke) jdfke,SUM(zyfzr) zyfzr,SUM(aqsctj) aqsctj,SUM(pxhczglgd) pxhczglgd,SUM(sgyhpc) sgyhpc,SUM(stsgd) stsgd,SUM(sbglhjycsgd) sbglhjycsgd,SUM(ldbhldhtgl) ldbhldhtgl,SUM(yxkjzy) yxkjzy,SUM(dwjjzajdgl) dwjjzajdgl 
from report_safetifyinproductions a
where year(a.reportdate)={0} and a.reportid=2 and a.isstatistics=1
GROUP by year(a.reportdate),month(a.reportdate)) b
on t.reportmonth=b.reportmonth
ORDER by t.reportmonth asc
", year);
                #endregion

                list = db.Database.SqlQuery<SafetifyinProductionReportModel>(landlawsql).ToList();
                return list;
            }
        }
        #endregion

        #region 表三
        /// <summary>
        /// （表三）秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public List<StrawAndWasteControlModel> ViewStrawAndWasteControlReport(int year)
        {
            //环境保护
            List<StrawAndWasteControlModel> list = new List<StrawAndWasteControlModel>();
            using (Entities db = new Entities())
            {
                #region sql查询
                string sql = string.Format(@"
select t.reportmonth as months,t.month as classname,IFNULL(b.reportyear,{0}) year,b.* from (
select 1 as 'reportmonth','1月' as 'month' from dual
union 
select 2,'2月' from dual
union 
select 3,'3月' from dual
union 
select 4,'4月' from dual
union 
select 5,'5月' from dual
union 
select 6,'6月' from dual
union 
select 7,'7月' from dual
union
select 8,'8月' from dual
union 
select 9,'9月' from dual
union 
select 10,'10月' from dual
union 
select 11,'11月' from dual
union 
select 12,'12月' from dual) t
left join (select a.reportid,month(a.reportdate) reportmonth,year(a.reportdate) reportyear,SUM(a.cdzfry) cdzfry,SUM(a.cdzfcl) cdzfcl,SUM(a.kzzfxccs1) kzzfxccs1,SUM(a.kzzfdccs) kzzfdccs,SUM(a.kzzfxccs2) kzzfxccs2,SUM(a.fxczmhd) fxczmhd,SUM(a.ghmj1) ghmj1,
SUM(a.fxysjtd) fxysjtd,SUM(ghmj2) ghmj2,SUM(a.fxczs) fxczs,SUM(a.ltfsjgla) ltfsjgla,SUM(a.ltfsjgja) ltfsjgja,SUM(a.ltfsjgsjsjfk) ltfsjgsjsjfk,SUM(a.nyjyla) nyjyla,SUM(a.nyjyja) nyjyja,SUM(a.nyjysjsjfmk) nyjysjsjfmk,
SUM(a.fscsljla) fscsljla,SUM(a.fscsljja) fscsljja,SUM(fscsljsjsjfmk) fscsljsjsjfmk
  from report_strawandwastecontrols a
where year(a.reportdate)={0} and a.reportid=3 and a.isstatistics=1
GROUP by year(a.reportdate),month(a.reportdate)) b
on t.reportmonth=b.reportmonth
ORDER by t.reportmonth asc
", year);
                #endregion
                list = db.Database.SqlQuery<StrawAndWasteControlModel>(sql).ToList();
                return list;
            }
        }
        #endregion

        #region 表四
        /// <summary>
        /// （表四）规模养殖场执法管控情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public List<ScaleFarmsControlReportModel> ViewScaleFarmsControl(int year)
        {
            //环境保护（二）
            List<ScaleFarmsControlReportModel> list = new List<ScaleFarmsControlReportModel>();
            using (Entities db = new Entities())
            {
                #region sql查询
                string sql = string.Format(@"select t.reportmonth as months,t.month as classname,IFNULL(b.reportyear,{0}) year,b.* from (
select 1 as 'reportmonth','1月' as 'month' from dual
union 
select 2,'2月' from dual
union 
select 3,'3月' from dual
union 
select 4,'4月' from dual
union 
select 5,'5月' from dual
union 
select 6,'6月' from dual
union 
select 7,'7月' from dual
union
select 8,'8月' from dual
union 
select 9,'9月' from dual
union 
select 10,'10月' from dual
union 
select 11,'11月' from dual
union 
select 12,'12月' from dual) t
left join (select a.reportid,month(a.reportdate) reportmonth,year(a.reportdate) reportyear,SUM(a.szcyl) szcyl,SUM(a.szzfjccs) szzfjccs,SUM(a.szzfjcjl) szzfjcjl,SUM(a.szxqzgtzs) szxqzgtzs,SUM(a.szzgyzwt) szzgyzwt,
SUM(a.szla) szla,SUM(a.szja) szja,SUM(a.szsjjffmk) szsjjffmk,SUM(a.szyjsfjg) szyjsfjg,SUM(a.qtj) qtj,SUM(a.qty) qty,SUM(a.qtry) qtry,SUM(a.qtqt) qtqt,SUM(a.qtzfjccs) qtzfjccs,SUM(a.qtzfjcjl) qtzfjcjl,
SUM(a.qtkjxqzgtzs) qtkjxqzgtzs,SUM(a.qtla) qtla,SUM(a.qtsjsjfmk) qtsjsjfmk,SUM(a.tqts) tqts,SUM(a.tqgb) tqgb,SUM(a.qtcc) qtcc,SUM(a.qtccwjmj) qtccwjmj
from report_scalefarmscontrols a
where year(a.reportdate)={0} and a.reportid=4 and a.isstatistics=1
GROUP by year(a.reportdate),month(a.reportdate)) b
on t.reportmonth=b.reportmonth
ORDER by t.reportmonth asc", year);
                #endregion
                list = db.Database.SqlQuery<ScaleFarmsControlReportModel>(sql).ToList();
                return list;
            }
        }
        #endregion

        #region 表五
        /// <summary>
        /// （表五）秀洲区综合行政执法局水行政执法情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public List<LawInWaterModel> ViewLawInWater(int year)
        {
            //水利
            List<LawInWaterModel> list = new List<LawInWaterModel>();
            using (Entities db = new Entities())
            {
                #region sql查询
                string sql = string.Format(@"select t.reportmonth as months,t.month as classname,IFNULL(b.reportyear,{0}) year,b.* from (
select 1 as 'reportmonth','1月' as 'month' from dual
union 
select 2,'2月' from dual
union 
select 3,'3月' from dual
union 
select 4,'4月' from dual
union 
select 5,'5月' from dual
union 
select 6,'6月' from dual
union 
select 7,'7月' from dual
union
select 8,'8月' from dual
union 
select 9,'9月' from dual
union 
select 10,'10月' from dual
union 
select 11,'11月' from dual
union 
select 12,'12月' from dual) t
left join (select a.reportid,month(a.reportdate) reportmonth,year(a.reportdate) reportyear,SUM(a.cdzfcl) cdzfcl,SUM(a.cdzfry) cdzfry,SUM(a.kzzfxccs) kzzfxccs,SUM(a.zlxqzgtzs) zlxqzgtzs,SUM(a.fxsswt) fxsswt,SUM(a.wczgsswt) wczgsswt,
SUM(a.jsys) jsys,SUM(a.jcfx) jcfx,SUM(a.tsjb) tsjb,SUM(a.zlas) zlas,SUM(a.jsfaxhdjzw) jsfaxhdjzw,SUM(a.pslj) hdfqw,SUM(a.ncgsl) ncgsl,SUM(a.csgsl) csgsl,SUM(a.psywscll) psywscll,SUM(a.jas) jas,SUM(sjsjfmk) sjsjfmk
from report_lawinwaters a
where year(a.reportdate)={0} and a.reportid=5 and a.isstatistics=1
GROUP by year(a.reportdate),month(a.reportdate)) b
on t.reportmonth=b.reportmonth
ORDER by t.reportmonth asc", year);
                #endregion

                list = db.Database.SqlQuery<LawInWaterModel>(sql).ToList();
                return list;
            }
        }
        #endregion

        #region 表六
        /// <summary>
        /// （表六）秀洲区综合行政执法局中心工作开展情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public List<BureauCenterWorkReportModel> ViewBureauCenterWork(int year)
        {
            //中心工作
            List<BureauCenterWorkReportModel> list = new List<BureauCenterWorkReportModel>();
            using (Entities db = new Entities())
            {
                #region sql查询
                string sql = string.Format(@"select t.reportmonth as months,t.month as classname,IFNULL(b.reportyear,{0}) year,IFNULL(b.czczmj,0) czczmj,IFNULL(b.czccmj,0) czccmj,
IFNULL(b.czla,0) czla,IFNULL(b.czja,0) czja,IFNULL(b.czsjsjfmk,0) czsjsjfmk,IFNULL(b.czxzccmj,0) czxzccmj,IFNULL(b.czzsmj,0) czzsmj,IFNULL(b.kzzfcs,0) kzzfcs,IFNULL(b.zlxqzgtzs,0) zlxqzgtzs,
IFNULL(b.qlczmj,0) qlczmj,IFNULL(b.qlczsl,0) qlczsl,IFNULL(b.cccztsjb,0) cccztsjb,IFNULL(b.ccyyla,0) ccyyla,IFNULL(b.ccsjsjfmk,0) ccsjsjfmk,IFNULL(b.dlczzwt,0) dlczzwt,IFNULL(b.dlcztsjb,0) dlcztsjb,
IFNULL(b.dlla,0) dlla,IFNULL(b.dlsjsjfmk,0) dlsjsjfmk,IFNULL(b.ccyyczzwt,0)  ccyyczzwt
from (
select 1 as 'reportmonth','1月' as 'month' from dual
union 
select 2,'2月' from dual
union 
select 3,'3月' from dual
union 
select 4,'4月' from dual
union 
select 5,'5月' from dual
union 
select 6,'6月' from dual
union 
select 7,'7月' from dual
union
select 8,'8月' from dual
union 
select 9,'9月' from dual
union 
select 10,'10月' from dual
union 
select 11,'11月' from dual
union 
select 12,'12月' from dual) t
left join (select a.reportid,month(a.reportdate) reportmonth,year(a.reportdate) reportyear,SUM(a.czczmj) czczmj,SUM(a.czccmj) czccmj,SUM(a.czla) czla,SUM(a.czja) czja,SUM(a.czsjsjfmk) czsjsjfmk,SUM(a.czxzccmj) czxzccmj,SUM(a.czzsmj) czzsmj,
SUM(a.kzzfcs) kzzfcs,SUM(a.zlxqzgtzs) zlxqzgtzs,SUM(a.qlczmj) qlczmj,SUM(a.qlczsl) qlczsl,SUM(a.cccztsjb) cccztsjb,SUM(a.ccyyla) ccyyla,SUM(a.ccsjsjfmk) ccsjsjfmk,SUM(a.dlczzwt) dlczzwt,SUM(a.dlcztsjb) dlcztsjb,SUM(a.dlla) dlla,
SUM(a.dlsjsjfmk) dlsjsjfmk,SUM(a.ccyyczzwt) ccyyczzwt
from report_bureaucenterworks a
where year(a.reportdate)={0} and a.reportid=6 and a.isstatistics=1
GROUP by year(a.reportdate),month(a.reportdate)) b
on t.reportmonth=b.reportmonth
ORDER by t.reportmonth asc", year);
                #endregion

                list = db.Database.SqlQuery<BureauCenterWorkReportModel>(sql).ToList();
                return list;
            }
        }
        #endregion

        #endregion
    }
}
