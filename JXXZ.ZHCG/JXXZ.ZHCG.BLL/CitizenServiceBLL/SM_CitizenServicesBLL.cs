using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.DAL.WorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.echarts;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CitizenServiceBLL
{
    public class SM_CitizenServicesBLL
    {
        private SM_CitizenServicesDAL dal = new SM_CitizenServicesDAL();
        /// <summary>
        /// 待办事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetCitizenServicesList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            List<SM_CitizenServicesModel> items = dal.GetCitizenServicesList(filters, start, limit, userid, status).ToList();
            int total = dal.GetCitizenServices(filters, userid, status);

            Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 已办事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetAlreadyCitizenServicesList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            //List<SM_CitizenServicesModel> items = dal.GetAlreadyCitizenServicesList(filters, start, limit, userid, status).ToList();
            //int total = dal.GetAlreadyCitizenServices(filters, userid, status);

            //Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            //paging.Items = items;
            //paging.Total = total;

            return dal.GetAlreadyCitizenServicesList(filters, start, limit, userid, status);
        }




        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetAllCitizenServicesList(List<Filter> filters, int start, int limit, int userid, int status, int? XZID = null)
        {
            //List<SM_CitizenServicesModel> items = dal.GetAllCitizenServicesList(filters, start, limit).ToList();
            //int total = dal.GetAllCitizenServices(filters);

            //Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            //paging.Items = items;
            //paging.Total = total;

            return dal.GetAllCitizenServicesList(filters, start, limit,XZID);
        }

        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetAllCitizenServicesListExcel(List<Filter> filters = null)
        {
            List<SM_CitizenServicesModel> list = dal.GetAllCitizenServicesListExcel(filters);

            return list;
        }


        /// <summary>
        /// 获取所有流程实例具体环节
        /// </summary>
        /// <returns></returns>
        public List<WF_WorkFlowOldModel> GetOldList(string wfsid)
        {
            WF_WorkFlowSpecificActivitysDAL wdal = new WF_WorkFlowSpecificActivitysDAL();
            return wdal.GetOldList(wfsid);
        }

        /// <summary>
        /// 获取图片
        /// </summary>
        /// <param name="citizenid">事件ID</param>
        /// <param name="wfdid">当前流程ID</param>
        /// <returns></returns>
        public List<FileClass> GetCitizenServicesAttr(string citizenid, string wfdid)
        {
            return dal.GetCitizenServicesAttr(citizenid, wfdid);
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetEventCitizenServicesList(List<Filter> filters, int start, int limit)
        {

            List<SM_CitizenServicesModel> items = dal.GetEventCitizenServicesList(filters, start, limit).ToList();
            int total = dal.GetEventCitizenServicesCount(filters);

            Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 获取事件数量
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public QuantityModel Quantity(int userid ,string type)
        {
            return dal.Quantity(userid, type);
        }

        /// <summary>
        /// 获取事件详情
        /// </summary>
        /// <param name="citizenid">事件ID</param>
        /// <returns></returns>
        public SM_CitizenServicesModel GetCitizenServiceModel(string citizenid)
        {
            return dal.GetCitizenServiceModel(citizenid);
        }

        /// <summary>
        /// 获取快速上报的内勤和分组组长
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> GetQuickReportUsers(string wfsid)
        {
            return dal.GetQuickReportUsers(wfsid);
        }


        /// <summary>
        /// 添加延期申请
        /// </summary>
        /// <param name="citizenid"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public int EditExtension(string citizenid, int day, string extensioncontent)
        {
            return dal.EditExtension(citizenid, day, extensioncontent);
        }

        /// <summary>
        /// 全部延期
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetAllCitizenServicesReviewList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            List<SM_CitizenServicesModel> items = dal.GetAllCitizenServicesReviewList(filters, start, limit).ToList();
            int total = dal.GetAllCitizenServicesReviewCount(filters);

            Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }
        /// <summary>
        /// 延期
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditEventReview(SM_CitizenServicesModel model)
        {
            return dal.EditEventReview(model);
        }

        /// <summary>
        /// 根据userid获取今日上报
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetCitizenModel(int userid)
        {
            return dal.GetCitizenModel(userid);
        }

        /// <summary>
        /// 获取系统生成最大ID
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, int?> GetCitizenAutoID()
        {
            return dal.GetCitizenAutoID();
        }

        /// <summary>
        /// 事件登记编号是否重复
        /// </summary>
        /// <returns></returns>
        public bool IsCitizenRepeat(string eventid)
        {
            return dal.IsCitizenRepeat(eventid);
        }

        /// <summary>
        /// 指挥中心处理事件是否完成
        /// </summary>
        /// <returns></returns>
        public bool EventIsHandle(string wfsaid)
        {
            return dal.EventIsHandle(wfsaid);
        }

        /// <summary>
        /// 编辑市民事件基础信息
        /// </summary>
        /// <returns></returns>
        public int CizitenEventEdit(sm_citizenservices model)
        {
            return dal.CizitenEventEdit(model);
        }

        /// <summary>
        /// 获取上报时的用户活动实例
        /// </summary>
        /// <returns></returns>
        public string GetEditWFSUID(string wfsid)
        {
            return dal.GetEditWFSUID(wfsid);
        }

        /// <summary>
        /// 添加流程处理前图片
        /// </summary>
        /// <returns></returns>
        public int AddEditPictures(FileClass model)
        {
            return dal.AddEditPictures(model);
        }

        public List<SM_Count> GetStatisticsBySMSJ(int type)
        {
            return dal.GetStatisticsBySMSJ(type);
        }

        public int CqEventCount(int type, int date)
        {
            return dal.CqEventCount(type,date);

        }

        
        /// <summary>
        /// 获取当天最新事件雷达图统计(前台展示)
        /// </summary>
        /// <returns></returns>
        public List<spiderMap> getEventData()
        {
            return dal.getEventData();
        }

           /// <summary>
        /// 返回事件7天日期
        /// </summary>
        /// <returns></returns>
        public List<string> GetEventLinelegend()
        {
            return dal.GetEventLinelegend();
        }

        /// <summary>
        /// 获取已上报事件data
        /// </summary>
        /// <returns></returns>
        public List<int> GetEventLineReportedData()
        {
            return dal.GetEventLineReportedData();
        }

        /// <summary>
        /// 处理中事件data
        /// </summary>
        /// <returns></returns>
        public List<int> GetEventLineInProcess()
        {
            return dal.GetEventLineInProcess();
        }

        
        /// <summary>
        /// 已完结事件data
        /// </summary>
        /// <returns></returns>
        public List<int> GetEventLineFinished()
        {
            return dal.GetEventLineFinished();
        }

        /// <summary>
        /// 获取当天事件
        /// </summary>
        /// <returns></returns>
        public List<JXXZ.ZHCG.Model.CitizenServiceModel.EventModel> GetAllByNowDay()
        {
            return dal.GetAllByNowDay();
        }


         /// <summary>
        /// 获取当月事件
        /// </summary>
        /// <returns></returns>
        public List<int> getEvent()
        {
            return dal.getEvent();
        }

        public List<int> GetSbsEventTypeStatistics(int type)
        {
            return dal.GetSbsEventTypeStatistics(type);
        }
        public List<int> GetClsEventTypeStatistics(int type)
        {
            return dal.GetClsEventTypeStatistics(type);
        }
        public List<int> GetJasEventTypeStatistics(int type)
        {
            return dal.GetJasEventTypeStatistics(type);
        }


        /// <summary>
        /// 当天全部事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_CitizenServicesModel>> GetDateAllCitizenServicesList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            List<SM_CitizenServicesModel> items = dal.GetDateAllCitizenServicesList(filters, start, limit).ToList();
            int total = dal.GetDateAllCitizenServices(filters);

            Paging<List<SM_CitizenServicesModel>> paging = new Paging<List<SM_CitizenServicesModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        public string getEventBytype()
        {
            return dal.getEventBytype();
        }
    }
}
