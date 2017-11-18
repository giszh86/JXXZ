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
    public class YH_YhLogBLL
    {
        private YH_YhLogDAL dal = new YH_YhLogDAL();

        /// <summary>
        /// 添加养护日志
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddLog(YH_YhLogModel model)
        {
            return dal.AddLog(model);
        }
        /// <summary>
        /// 查询日志列表
        /// </summary>
        /// <returns></returns>
        public Paging<List<YH_YhLogModel>> GetYhLogList(List<Filter> filter, int start, int limit, int year, int month)
        {
            List<YH_YhLogModel> items = dal.GetYhLogList(filter, start, limit, year, month).ToList();
            int total = dal.GetYhLogCount(filter, year, month);
            Paging<List<YH_YhLogModel>> paging = new Paging<List<YH_YhLogModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }
        /// <summary>
        /// 养护日志详情
        /// </summary>
        /// <param name="yhlogid"></param>
        /// <returns></returns>
        public YH_YhLogModel GetYhLogModel(int yhlogid)
        {
            return dal.GetYhLogModel(yhlogid);
        }

        #region 导出报表到excel
        public List<YH_YhLogModel> GetYhLogListExcel(int month,int year, List<Filter> filters)
        {
            return dal.GetYhLogListExcel(month,year, filters);
        }
        #endregion
    }
}
