using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.AccountDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AccountModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.AccountBLL
{
    public class AccountRegisterBLL
    {
        private AccountRegisterDAL dal = new AccountRegisterDAL();

        /// <summary>
        /// 获取台账记录列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<AccountRegisterModel>> GetAccountRegisterList(List<Filter> filters, int start, int limit,int type)
        {
            List<AccountRegisterModel> items = dal.GetAccountRegisterList(filters, start, limit, type).ToList();
            int total = dal.GetAccountRegisterCount(filters, type);

            Paging<List<AccountRegisterModel>> paging = new Paging<List<AccountRegisterModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 添加台帐登记
        /// </summary>
        /// <param name="tzrs"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public int AddAccountRegister(AccountRegisterModel tzrs, List<FileUploadClass> list, List<FileClass> eventList)
        {
            return dal.AddAccountRegister(tzrs, list, eventList);
        }

        /// <summary>
        /// 编辑台账记录
        /// </summary>
        /// <param name="tzrs"></param>
        /// <returns></returns>
        public int EditAccountRegister(AccountRegisterModel tzrs, List<FileUploadClass> list)
        {
            return dal.EditAccountRegister(tzrs, list);
        }

        /// <summary>
        /// 根据部门类型获取部门
        /// </summary>
        /// <param name="unittypeid">单位类型标识</param>
        /// <returns></returns>
        public List<Unit> GetUnitsSquadron(int unittypeid)
        {
            return dal.GetUnitsSquadron(unittypeid);
        }

        /// <summary>
        /// 获取所有部门
        /// </summary>
        /// <param name="unittypeid">单位类型标识</param>
        /// <returns></returns>
        public List<Unit> GetUnitsALLSquadron()
        {
            return dal.GetUnitsALLSquadron();
        }

        /// <summary>
        /// 根据部门ID获取树
        /// </summary>
        /// <param name="unittypeid">单位类型标识</param>
        /// <returns></returns>
        public List<AccountRegisterTask> GetUnitsAccountRegister(int? unitID)
        {
            return dal.GetUnitsAccountRegister(unitID);
        }


        /// <summary>
        /// 获取事件
        /// </summary>
        /// <param name="unittypeid">获取事件</param>
        /// <returns></returns>


        public Paging<List<SM_CitizenServicesModel>> GetEvent(List<Filter> filters, int start, int limit)
        {
            List<SM_CitizenServicesModel> items = dal.GetEvent(filters, start, limit).ToList();

            int total = items.Count;

            Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;

        }

        //public Paging<SM_CitizenServicesModel> GetEventByID(string eventid)
        //{
        //    List<SM_CitizenServicesModel> items = dal.GetEventByID(eventid).ToList();

        //    int total = items.Count;

        //    Paging<SM_CitizenServicesModel> paging = new Paging<SM_CitizenServicesModel>();
        //    paging.Items = items;
        //    paging.Total = total;

        //    return paging;

        //}

        /// <summary>
        /// 根据任务ID获取附件
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetTaskFilesByRegisterid(int registerid)
        {
            return dal.GetTaskFilesByRegisterid(registerid);
        }

        /// <summary>
        /// 获取事件图片
        /// </summary>
        /// <param name="citizenid"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetCitizenServicesAttr(string citizenid)
        {
            return dal.GetCitizenServicesAttr(citizenid);
        }

        /// <summary>
        /// 根据当年时间获取登记过的台帐任务
        /// </summary>
        /// <returns></returns>
        public List<base_zds> GetTaskClassNowYear()
        {
            return dal.GetTaskClassNowYear();
        }
    }
}
