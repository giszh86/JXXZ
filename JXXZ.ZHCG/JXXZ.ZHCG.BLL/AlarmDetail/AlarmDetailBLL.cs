using JXXZ.ZHCG.DAL.AlarmDetail;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AlarmDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.AlarmDetail
{
    public class AlarmDetailBLL
    {
        private AlarmDetailDAL dal = new AlarmDetailDAL();
        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<AlarmDetailModel>> GetAlarmDetailList(List<Filter> filters, int start, int limit)
        {

            //List<AlarmDetailModel> items = dal.GetAlarmDetailList(filters, start, limit).ToList();
            //int total = dal.GetAlarmDetailCount(filters);

            //Paging<List<AlarmDetailModel>> paging = new Paging<List<AlarmDetailModel>>();
            //paging.Items = items;
            //paging.Total = total;

            return dal.GetAlarmDetailList(filters, start, limit);
        }

        public AlarmDetailModel GetAlarmDetailModel(int id)
        {
            return dal.GetAlarmDetailModel(id);
        }

        /// <summary>
        /// 修改审核状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int EditAlarmDetailReview(int id, int type)
        {
            return dal.EditAlarmDetailReview(id, type);
        }

         /// <summary>
        /// 修改申诉状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int EditAlarmDetailAppeals(AlarmDetailModel model)
        {
            return dal.EditAlarmDetailAppeals(model);
        }

        /// <summary>
        /// 用户报警列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<AlarmDetailModel>> GetUserAlarmDetailList(List<Filter> filters, int start, int limit,int userid)
        {

            List<AlarmDetailModel> items = dal.GetUserAlarmDetailList(filters, start, limit, userid).ToList();
            int total = dal.GetUserAlarmDetailCount(filters,userid);

            Paging<List<AlarmDetailModel>> paging = new Paging<List<AlarmDetailModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

         /// <summary>
        /// 提交申诉
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int SubmitAlarmDetailAppeals(AlarmDetailModel model)
        {
            return dal.SubmitAlarmDetailAppeals(model);
        }

        #region 人员报警列表导出
        public List<AlarmDetailModel> GetAlarmDetailList(List<Filter> filters)
        {
            return dal.GetAlarmDetailList(filters);
        }
        #endregion
    }
}
