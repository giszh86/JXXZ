using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AccountModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.AccountBLL
{
    public class AccountTaskBLL
    {
        private DAL.AccountDAL.TZ_AccountTaskDAL dal = new DAL.AccountDAL.TZ_AccountTaskDAL();


        public Paging<List<AccountTaskModel>> GetTZTaskList(List<Filter> filters, int start, int limit)
        {
            List<AccountTaskModel> items = dal.GetTZTaskList(filters, start, limit).ToList();
            int total = dal.GetTZTaskCount(filters);

            Paging<List<AccountTaskModel>> paging = new Paging<List<AccountTaskModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }
        /// <summary>
        /// 添加台帐任务
        /// </summary>
        /// <param name="tztask"></param>
        /// <param name="TypeArr"></param>
        public int AddAccountTask(AccountTaskModel tztask, List<FileUploadClass> list, List<tz_taskclasses> list_tzclass)
        {
            return dal.AddAccountTask(tztask, list, list_tzclass);
        }

        /// <summary>
        /// 编辑台帐任务
        /// </summary>
        /// <param name="tztask"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public int EditAccountTask(AccountTaskModel tztask, List<FileUploadClass> list)
        {
            return dal.EditAccountTask(tztask, list);
        }

        /// <summary>
        /// 根据台帐任务号获取台帐任务类型GetTaskFilesByTaskID
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        public List<TaskClassModel> GetTaskClassByTaskID(int TaskID)
        {
            return dal.GetTaskClassByTaskID(TaskID);
        }

        /// <summary>
        /// 根据任务号获取中队
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        public List<TaskClassModel> GetTaskZDByTaskID(int TaskID)
        {
            return dal.GetTaskZDByTaskID(TaskID);
        }

        /// <summary>
        /// 根据任务ID获取附件
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetTaskFilesByTaskID(int TaskID)
        {
            return dal.GetTaskFilesByTaskID(TaskID);
        }

        /// <summary>
        /// 获取任务中队(初始化)
        /// </summary>
        /// <returns></returns>
        public List<AccountUnitModel> GetAccountUnit()
        {
            return dal.GetAccountUnit();
        }

    }
}
