using JXXZ.ZHCG.DAL.administrativeapprovalDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.administrativeapprovalBLL
{
    /// <summary>
    /// 门前三包
    /// </summary>
    public class ThreeBagsBLL
    {
        ThreeBagsDAL dal = new ThreeBagsDAL();
        /// <summary>
        /// 门前三包列表数据
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<TreeBagsModel>> GetSourcesList(List<Filter> filter, int start, int limit)
        {
            List<TreeBagsModel> items = dal.GetSourcesList(filter, start, limit).ToList();
            int total = dal.GetSourcesListCount(filter);

            Paging<List<TreeBagsModel>> paging = new Paging<List<TreeBagsModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        public TreeBagsModel GetThreeBagsInfo(int storeid) {
            return dal.GetThreeBagsInfo(storeid);
        }

        /// <summary>
        /// 添加门前三包
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddThreeBagsInf(TreeBagsModel model,List<FileUploadClass> list)
        {
            int success = dal.AddThreeBagsInf(model,list);
            return success;
        }

        /// <summary>
        /// 删除门前三包
        /// </summary>
        /// <returns></returns>
        public int DeleteThreeBagsInf(int storeid)
        {
            return dal.DeleteThreeBagsInf(storeid);
        }

        /// <summary>
        /// 修改门前三包信息
        /// </summary>
        /// <param name="storeid"></param>
        /// <returns></returns>
        public int EditThreeBagsInf(TreeBagsModel model,List<FileUploadClass> list)
        {
            return dal.EditThreeBagsInf(model,list);
        }

        #region 手机API接口
        public int AddThreeBagsInf(TreeBagsModel model, List<FileClass> list)
        {
            int success = dal.AddThreeBagsInf(model, list);
            return success;
        }
        #endregion

    }
}
