using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
    public class Case_CasesBLL
    {
        private Case_CasesDAL dal = new Case_CasesDAL();
        private Case_WtajsDAL cwdal = new Case_WtajsDAL();
        private Case_SimpleCasesDAL csdal = new Case_SimpleCasesDAL();
        private SM_CitizenServicesDAL scmodel = new SM_CitizenServicesDAL();
        /// <summary>
        /// 添加一般案件
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddCase(Case_CasesModel model)
        {
          
            return dal.AddCase(model);
        }


        /// <summary>
        /// 一般事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <param name="wfid"></param>
        /// <returns></returns>
        public Paging<List<CaseList>> GetCaseList(List<Filter> filters, int start, int limit, int userid, int status, string wfid)
        {
            Paging<List<CaseList>> list = dal.GetCaseList(filters, start, limit, userid, status, wfid);

            return list;
        }

        /// <summary>
        /// 一般事件全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <param name="status"></param>
        /// <param name="wfid"></param>
        /// <returns></returns>
        public Paging<List<CaseList>> GetAllCaseList(List<Filter> filters, int start, int limit, string wfid, int? XZID = null)
        {
            Paging<List<CaseList>> list = dal.GetAllCaseList(filters, start, limit, wfid,XZID);

            return list;
        }

        /// <summary>
        /// 一般事件列表导出
        /// </summary>
        /// <returns></returns>
        public List<CaseList> GetCaseListExcel(int userid,int status,List<Filter> filter = null)
        {
            List<CaseList> list = dal.GetCaseListExcel(userid,status, filter);

            return list;
        }

        /// <summary>
        /// 一般事件详情
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        public Case_CasesModel GetCaseModel(string wfsid)
        {
            return dal.GetCaseModel(wfsid);

        }

        public List<CaseWorkFlowOldModel> GetCaseOidList(string wfsid)
        {
            return dal.GetCaseOidList(wfsid);

        }

        public List<DocPageList> GetCaseDocList(string ddtablename, string wfsid, string wfsid2 = null)
        {
            return dal.GetCaseDocList(ddtablename, wfsid,wfsid2);
        }

        /// <summary>
        /// 根据wfsid和wfdid获取wfsaid
        /// </summary>
        /// <param name="wfsid"></param>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public string GetParamsWFSAID(string wfsid, string wfdid)
        {
            return dal.GetParamsWFSAID(wfsid, wfdid);
        }

        /// <summary>
        /// 获取流程暂存信息
        /// </summary>
        /// <param name="wfsaid"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public Doc_WfsasModel GetFlowSaveInfo(string wfsaid, int type)
        {
            return dal.GetFlowSaveInfo(wfsaid, type);
        }

        /// <summary>
        /// 修改流程暂存信息
        /// </summary>
        /// <returns></returns>
        public int UpdateFlowSaveInfo(Doc_WfsasModel dwmodel)
        {
            return dal.UpdateFlowSaveInfo(dwmodel);
        }

        /// <summary>
        /// 修改暂存流程表信息
        /// </summary>
        /// <returns></returns>
        public int UpdateCaseWFS(string wfsid, Case_CasesModel model)
        {
            return dal.UpdateCaseWFS(wfsid,model);
        }

        /// <summary>
        /// 文书编辑
        /// </summary>
        /// <returns></returns>
        public Doc_WfsasModel EditDoc(int dwfsasid)
        {
            return dal.EditDoc(dwfsasid);
        }

        /// <summary>
        /// 暂存的一般案件上报
        /// </summary>
        /// <returns></returns>
        public Case_CasesModel GetSaveCommonCase(int? caseid, int? issave =null)
        {
            return dal.GetSaveCommonCase(caseid, issave);
        }

        /// <summary>
        /// 获取文书下的案由编号
        /// </summary>
        /// <returns></returns>
        public Case_CasesModel GetCaseReasonNumber(int? caseid, string tablename)
        {
            return dal.GetCaseReasonNumber(caseid, tablename);
        }

        /// <summary>
        /// 根据wfsid获取流程活动环节数量
        /// </summary>
        /// <returns></returns>
        public int? GetWFSANumber(string wfsid)
        {
            return dal.GetWFSANumber(wfsid);
        }

        /// <summary>
        /// 修改回退暂存相关信息
        /// </summary>
        /// <returns></returns>
        public void UpdateZCAllWFS(string wfsid, string casemode, int? issave, string wfsaid = null)
        {
            dal.UpdateZCAllWFS(wfsid, casemode, issave, wfsaid);
        }

        /// <summary>
        /// 根据WFSID获取一般案件基础表信息
        /// </summary>
        /// <returns></returns>
        public Case_CasesModel GetCaseInfoByWFSID(string wfsid)
        {
            return dal.GetCaseInfoByWFSID(wfsid);
        }

        /// <summary>
        /// 修改上报暂存信息
        /// </summary>
        /// <returns></returns>
        public int UpdateCaseInfo(Case_CasesModel casemodel)
        {
            //string geometry = casemodel.geographical84;
            //string map2000 = new MapXYConvent().WGS84ToCGCS2000(geometry);
            //if (!string.IsNullOrEmpty(map2000))
            //{
            //    casemodel.geographical2000 = map2000;
            //}
            return dal.UpdateCaseInfo(casemodel);
        }

        /// <summary>
        /// 修改上报暂存状态
        /// </summary>
        /// <returns></returns>
        public int UpdateCaseStatus(string wfsid,string status)
        {
            return dal.UpdateCaseStatus(wfsid, status);
        }

        /// <summary>
        /// 上报暂存文书
        /// </summary>
        /// <returns></returns>
        public int UpdateCaseReportDocStatus(string wfsid, string wfsaid)
        {
            return dal.UpdateCaseReportDocStatus(wfsid, wfsaid);
        }

        /// <summary>
        /// 结束所有wfsu用户的未处理
        /// </summary>
        /// <returns></returns>
        public int OverAllWFSU(string wfsaid)
        {
            return dal.OverAllWFSU(wfsaid);
        }

        /// <summary>
        /// 根据部门获取立案审批表序号
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public string GetCaseDocumentNumberByUnitId(int unitid)
        {
            return dal.GetCaseDocumentNumberByUnitId(unitid);
        }

        /// <summary>
        /// 案件文书编号是否重复
        /// </summary>
        /// <param name="wsbh"></param>
        /// <returns></returns>
        public bool CaseDocumentNumberEQ(string wsbh)
        {
            return dal.CaseDocumentNumberEQ(wsbh);
        }

        /// <summary>
        /// 获取对接过来的案由数据
        /// </summary>
        /// <returns></returns>
        public List<InheritCaseSourceModel> GetInheritCaseSource(string powername = null)
        {
            return dal.GetInheritCaseSource(powername).Items;
        }

        /// <summary>
        /// 一般事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<CaseList>> GetAllCaseListApi(List<Filter> filters, int start, int limit)
        {
            List<CaseList> items = dal.GetAllCaseListApi(filters, start, limit).ToList();
            int total = dal.GetAllCaseCountApi(filters);

            Paging<List<CaseList>> paging = new Paging<List<CaseList>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 获取事件数量
        /// </summary>
        /// <returns></returns>
        public string GetTotalAmount()
        {
            List<Filter> filters = new List<Filter>();
            TotalAmount model = new TotalAmount();
            int EventsNumber = scmodel.GetAllCitizenServices(filters);
            int CasesNumber = dal.GetAllCaseCountApi(filters) + cwdal.GetAllCaseWtajsCount(filters);
            string json = "[{'type': 'EventsNumber','value': '" + EventsNumber + "'},{'type': 'CasesNumber','value': '" + CasesNumber + "'}]";
            return json;
        }


        public List<CaseCount> GetCaseCount(int type)
        {
            List<CaseCount> list = new List<CaseCount>();
            list.Add(dal.GetCaseCount(type));
            list.Add(csdal.GetSimpleCount(type));
            list.Add(cwdal.GetWtajCount(type));
            return list;

        }

        /// <summary>
        /// 一般案件当天全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<CaseList>> GetDateAllCaseListApi(List<Filter> filters, int start, int limit)
        {
            List<CaseList> items = dal.GetDateAllCaseListApi(filters, start, limit).ToList();
            int total = dal.GetDateAllCaseCountApi(filters);

            Paging<List<CaseList>> paging = new Paging<List<CaseList>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 手机端获取案由相关信息
        /// </summary>
        /// <param name="page"></param>
        /// <param name="count"></param>
        /// <param name="powername"></param>
        /// <returns></returns>
        public Paging<List<InheritCaseSourceModel>> GetInheritCaseSourceAPI(int page, int count, string powername = null)
        {
            return dal.GetInheritCaseSourceAPI(page,count,powername);
        }

    }
}
