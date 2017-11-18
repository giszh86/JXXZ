using JXXZ.ZHCG.DAL.ConservationDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ConservationModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ConservationBLL
{
    public class YH_ContractBLL
    {
        private YH_ContractDAL dal = new YH_ContractDAL();

        /// <summary>
        /// 当前养护合同
        /// </summary>
        /// <returns></returns>
        public Paging<List<YH_ContractModel>> GetContractList(List<Filter> filter, int start, int limit)
        {
            List<YH_ContractModel> items = dal.GetContractList(filter, start, limit).ToList();
            int total = dal.GetContractCount(filter);
            Paging<List<YH_ContractModel>> paging = new Paging<List<YH_ContractModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 历史养护合同
        /// </summary>
        /// <returns></returns>
        public Paging<List<YH_ContractModel>> GetOldContractList(List<Filter> filter, int start, int limit)
        {
            List<YH_ContractModel> items = dal.GetOldContractList(filter, start, limit).ToList();
            int total = dal.GetOldContractCount(filter);
            Paging<List<YH_ContractModel>> paging = new Paging<List<YH_ContractModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 添加养护日志
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddContract(YH_ContractModel model,List<FileClass> list)
        {
            return dal.AddContract(model,list);
        }

        /// <summary>
        /// 养护合同详情
        /// </summary>
        /// <param name="contractid"></param>
        /// <returns></returns>
        public YH_ContractModel GetContractModel(int contractid)
        {
            return dal.GetContractModel(contractid);
        }

        #region 删除养护合同
        public int DeleteContractInf(int contractid)
        {
            return dal.DeleteContractInf(contractid);
        }
        #endregion

        #region 修改养护合同
        public int ModifyContractInf(YH_ContractModel model, List<FileUploadClass> list)
        {
            return dal.ModifyContractInf(model,list);
        }
        #endregion

        #region 判断养护合同是否有关联
        public int IsContractAssociated(int contractid)
        {
            return dal.IsContractAssociated(contractid);
        }
        #endregion

        /// <summary>
        /// 下拉框
        /// </summary>
        /// <returns></returns>
        public List<SourcesModel> GetSourceList()
        {
            return dal.GetSourceList();
        }

        #region 导出列表到excel
        public List<YH_ContractModel> GetContractListExcel(int type, List<Filter> filters = null) 
        {
            return dal.GetContractListExcel(type,filters);
        }
        #endregion


        public ExaminesModel GetExaminesModel(int contractid) {

            return dal.GetExaminesModel(contractid);
        }

        public List<Fraction> GetFractionList(int examineid) {
            return dal.GetFractionList(examineid);
        }
    }
}
