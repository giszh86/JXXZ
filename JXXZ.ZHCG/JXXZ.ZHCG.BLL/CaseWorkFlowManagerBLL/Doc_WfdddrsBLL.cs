using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
   public class Doc_WfdddrsBLL
    {
       private Doc_WfdddrsDAL dal = new Doc_WfdddrsDAL();
         /// <summary>
        /// 添加环节文书关系表
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int AddWfdddrs(Doc_WfdddrsModel DocModel)
        {
            return dal.AddWfdddrs(DocModel);
        }

        /// <summary>
        /// 修改环节文书关系表
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int EditWFSASModel(int dwfsasid, string WordPath, string PDFPath,int userid)
        {
            return dal.EditWFSASModel(dwfsasid,WordPath,PDFPath,userid);
        }
     
        /// <summary>
        /// 文书定义表列表
        /// </summary>
        /// <returns></returns>
        public Paging<List<Doc_WfdddrsModel>> GetWfdddrsList(List<Filter> filters,int start, int limit)
        {

            List<Doc_WfdddrsModel> items = dal.GetWfdddrsList(filters,start, limit).ToList();
            int total = dal.GetWfdddrsCount(filters);

            Paging<List<Doc_WfdddrsModel>> paging = new Paging<List<Doc_WfdddrsModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

         /// <summary>
        /// 修改环节文书关系表
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int ModifyWfdddrs(Doc_WfdddrsModel DocModel)
        {
            return dal.ModifyWfdddrs(DocModel);
        }

        /// <summary>
        /// 根据案件流程id获取文书
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<ClassModel> GetCaseBookList(string wfdid)
        {
            return dal.GetCaseBookList(wfdid);
        }

        /// <summary>
        /// 根据案件大流程id获取文书
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<ClassModel> GetCaseBookList(int phaseid)
        {
            Case_PhasesDAL apdal = new Case_PhasesDAL();
            string wfid = apdal.GetCasePhasesById(phaseid);
            return dal.GetCaseBookList(wfid);
        }

        /// <summary>
        /// 根据wfsaid获取文书模版下的附件列表
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<Doc_WfsasModel> GetWFSASList(string wfsaid, int ddid, int? phaseid = null, string wfdid = null)
        {
            return dal.GetWFSASList(wfsaid, ddid,phaseid, wfdid);
        }


        /// <summary>
        /// 根据caseid获取文书模版下的附件列表
        /// </summary>
        /// <returns></returns>
        public List<Doc_WfsasModel> GetWFSASListAPI(int caseid, string tablename)
        {
            return dal.GetWFSASListAPI(caseid, tablename);
        }

        /// <summary>
        /// 根据流程环节获取必填文书
        /// </summary>
        /// <returns></returns>
        public List<Doc_WfdddrsModel> GetRequireWfdddrsList(string wfdid)
        {
            return dal.GetRequireWfdddrsList(wfdid);
        }
        /// <summary>
        /// 根据案件流程id获取抽样取证通知书
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<Doc_WfsasModel> GetCYQZTZSList(string wfsaid, int ddid)
        {
            return dal.GetCYQZTZSList(wfsaid, ddid);
        }

        /// <summary>
        /// 获取责令停止违法行为通知书文书编号
        /// </summary>
        /// <param name="wfsaid"></param>
        /// <param name="ddid"></param>
        /// <returns></returns>
        public string GetZLTZWFXWTZSNumber(string wfsaid, int ddid)
        {
            return dal.GetZLTZWFXWTZSNumber(wfsaid, ddid);
        }


        public int EditCyqztzs(string wsbh) {
            return dal.EditCyqztzs(wsbh);
        }

        /// <summary>
        /// 获取流程阶段
        /// </summary>
        /// <returns></returns>
        public List<PhaseModel> GetPhaseList()
        {
            return dal.GetPhaseList();
        }
    }
}
