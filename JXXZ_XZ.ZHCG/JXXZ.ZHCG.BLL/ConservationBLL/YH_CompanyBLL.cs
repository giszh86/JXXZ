using JXXZ.ZHCG.DAL.ConservationDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ConservationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ConservationBLL
{
    public class YH_CompanyBLL
    {
        private YH_CompanyDAL dal = new YH_CompanyDAL();


        /// <summary>
        /// 添加养护单位
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddConserbation(YH_CompanyModel model)
        {
            return dal.AddConserbation(model);
        }

        /// <summary>
        /// 养护单位列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<YH_CompanyModel>> GetConserbationList(List<Filter> filter, int start, int limit)
        {
            List<YH_CompanyModel> items = dal.GetConserbationList(filter, start, limit).ToList();
            int total = dal.GetConserbationCount(filter);
            Paging<List<YH_CompanyModel>> paging = new Paging<List<YH_CompanyModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 养护单位详情
        /// </summary>
        /// <param name="companyid"></param>
        /// <returns></returns>
        public YH_CompanyModel GetConserbationModel(int companyid)
        {
            return dal.GetConserbationModel(companyid);
        }

        /// <summary>
        /// 修改养护单位
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditConserbation(YH_CompanyModel model)
        { return dal.EditConserbation(model); }


        /// <summary>
        /// 删除养护单位
        /// </summary>
        /// <param name="companyid"></param>
        /// <returns></returns>
        public int DeleteConserbation(int companyid)
        {
            return dal.DeleteConserbation(companyid);
        }

        /// <summary>
        /// 下拉框
        /// </summary>
        /// <returns></returns>
        public List<SourcesModel> GetSourceList()
        {
            return dal.GetSourceList();
        }

         #region 导出列表到excel
        public List<YH_CompanyModel> GetCompanyListExcel(List<Filter> filters = null) 
        {
            return dal.GetCompanyListExcel(filters);
        }
        #endregion
    }
}
