using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.ReportDAL;
using JXXZ.ZHCG.Model.ReportModel;
using JXXZ.ZHCG.Model;
using Newtonsoft.Json.Linq;

namespace JXXZ.ZHCG.BLL.ReportBLL
{
    public class ReportBLL
    {
        private ReportDAL dal = new ReportDAL();

        #region （表一）秀洲区综合行政执法局土地执法案件情况分类统计报表
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public List<LandLawReportModel> GetLandLawReport(DateTime dt)
        {
            return dal.GetLandLawReport(dt);
        }

        /// <summary>
        /// 模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        public int LandLawAddOrEdit(LandLawReportModel model)
        {
            return dal.LandLawAddOrEdit(model);
        }
        #endregion

        #region （表二）秀洲区综合行政执法局安全生产执法情况报表
        /// <summary>
        /// 获取安全生产报表数据
        /// </summary>
        /// <returns></returns>
        public List<SafetifyinProductionReportModel> GetSafetifyinProductionReport(DateTime dt)
        {
            return dal.GetSafetifyinProductionReport(dt);
        }

        /// <summary>
        /// /模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int SafetifyinProductionAddOrEdit(SafetifyinProductionReportModel model)
        {
            return dal.SafetifyinProductionReportModel(model);
        }
        #endregion

        #region （表三）秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表
        /// <summary>
        /// 获取安全生产报表数据
        /// </summary>
        /// <returns></returns>
        public List<StrawAndWasteControlModel> GetStrawAndWasteControlReport(DateTime dt)
        {
            return dal.GetStrawAndWasteControlReport(dt);
        }

        /// <summary>
        /// /模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int StrawAndWasteControlModelAddOrEdit(StrawAndWasteControlModel model)
        {
            return dal.StrawAndWasteControlModelAddOrEdit(model);
        }
        #endregion

        #region （表四）秀洲区综合行政执法局规模养殖场执法管控情况报表
        public List<ScaleFarmsControlReportModel> GetScaleFarmsControl(DateTime dt)
        {
            return dal.GetScaleFarmsControl(dt);
        }

        /// <summary>
        /// /模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int ScaleFarmsControlReportModelAddOrEdit(ScaleFarmsControlReportModel model)
        {
            return dal.ScaleFarmsControlReportModelAddOrEdit(model);
        }
        #endregion

        #region （表五）秀洲区综合行政执法局水行政执法情况报表
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <returns></returns>
        public List<LawInWaterModel> GetLawInWater(DateTime reportdate)
        {
            return dal.GetLawInWater(reportdate);
        }

        /// <summary>
        /// /模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int LawInWaterReportModelAddOrEdit(LawInWaterModel model)
        {
            return dal.LawInWaterReportModelAddOrEdit(model);
        }
        #endregion

        #region （表六）洲区综合行政执法局中心工作开展情况报表
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <returns></returns>
        public List<BureauCenterWorkReportModel> GetBureauCenterWork(DateTime dt)
        {
            return dal.GetBureauCenterWork(dt);
        }

        public int BureauCenterWorkModelAddOrEdit(BureauCenterWorkReportModel model)
        {
            return dal.BureauCenterWorkModelAddOrEdit(model);
        }
        #endregion

        #region （表七）H7N9疫情(活禽交易)防控工作信息日报表
        public List<H7N7ReportModel> GetH7N7Report(DateTime reportdate)
        {
            return dal.GetH7N7Report(reportdate);
        }

        public int H7N7ReportAddOrEdit(H7N7ReportModel model)
        {
            return dal.H7N7ReportAddOrEdit(model);
        }
        #endregion

        #region （表八）特殊时期（互联网峰会）环境保障工作日报表
        public List<SpecialPeriodReportModel> GetSpecialPeriodReport(DateTime reportdate)
        {
            return dal.GetSpecialPeriodReport(reportdate);
        }

        public int SpecialPeriodReportAddOrEdit(SpecialPeriodReportModel model)
        {
            return dal.SpecialPeriodReportAddOrEdit(model);
        }
        #endregion

        #region （表九）秀洲区综合行政执法局土地执法案件情况分类统计报表
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public List<LandLawReportModel> GetLandLawHalfMonthReport(DateTime dt)
        {
            return dal.GetLandLawHalfMonthReport(dt);
        }

        /// <summary>
        /// 模型更新或者插入
        /// </summary>
        /// <param name="model"></param>
        public int LandLawHalfMonthAddOrEdit(LandLawReportModel model)
        {
            return dal.LandLawHalfMonthAddOrEdit(model);
        }
        #endregion

        #region 获取报表模板列表数据
        public Pag<ReportListModel> GetTemplateList(List<Filter> filter, int start, int limit,int userid)
        {
            return dal.GetTemplateList(filter, start, limit, userid);
        } 
        #endregion

        #region 获取报表列表数据
        public Pag<ReportListModel> GetReportList(List<Filter> filter, int start, int limit)
        {
            return dal.GetReportList(filter, start, limit);
        }
        #endregion

        #region 获取历史报表数据
        public Pag<ReportListModel> GetHisReportList(List<Filter> filter, int start, int limit)
        {
            return dal.GetHisReportList(filter, start, limit);
        }
        #endregion

        #region 获取累计报表数据
        public Pag<ReportListModel> GetAddUpReportList(List<Filter> filter, int start, int limit)
        {
            return dal.GetAddUpReportList(filter, start, limit);
        }
        #endregion

        #region 启用报表
        public int EnableReport(ReportListModel model)
        {
            return dal.EnableReport(model);
        }
        #endregion

        #region 编辑报表模板
        public int ModifyTemplateReport(ReportListModel model)
        {
            return dal.ModifyTemplateReport(model);
        }
        #endregion

        #region 报表统计
        public int StatisticalReport(int reportid, DateTime reportdate, string remark)
        {
            return dal.StatisticalReport(reportid, reportdate, remark);
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
            return dal.ViewAddUpSafetifyinProductionReport(year);
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
            return dal.ViewStrawAndWasteControlReport(year);
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
            return dal.ViewScaleFarmsControl(year);
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
            return dal.ViewLawInWater(year);
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
            return dal.ViewBureauCenterWork(year);
        }
        #endregion

        #endregion
    }
}
