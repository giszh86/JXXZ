using JXXZ.ZHCG.DAL.LawEnforcementSupervisionDAL;
using JXXZ.ZHCG.DAL.WorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL
{
    public class Zxzz_SpecialTaskBLL
    {
        private Zxzz_SpecialTaskDAL dal = new Zxzz_SpecialTaskDAL();
        /// <summary>
        /// 待办事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<Zxzz_TaskModel>> GetSpecialTaskList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            List<Zxzz_TaskModel> items = dal.GetSpecialTaskList(filters, start, limit, userid, status);
            int total = dal.GetSpecialTaskCount(filters, userid, status);

            Paging<List<Zxzz_TaskModel>> paging = new Paging<List<Zxzz_TaskModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<Zxzz_TaskModel>> GetAllSpecialTaskList(List<Filter> filters, int start, int limit)
        {
            List<Zxzz_TaskModel> items = dal.GetAllSpecialTaskList(filters, start, limit);
            int total = dal.GetAllSpecialTaskCount(filters);

            Paging<List<Zxzz_TaskModel>> paging = new Paging<List<Zxzz_TaskModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 专项整治列表导出
        /// </summary>
        /// <returns></returns>
        public List<Zxzz_TaskModel> GetSpecialTaskListExcel(int userid, int status, List<Filter> filter = null)
        {
            List<Zxzz_TaskModel> list = dal.GetSpecialTaskListExcel(userid,status, filter);

            return list;
        }

        /// <summary>
        /// 进入总结添加行政许可科
        /// </summary>
        /// <returns></returns>
        public string AddSummarizeXZXKK()
        {
            UserBLL ubll = new UserBLL();
            string userids = "";
            List<UserModel> unitusers = ubll.GetUsersStaff(9);//获取所有行政许可科
            foreach (UserModel item in unitusers)
            {
                userids += item.ID + ",";
            }
            userids = userids.Substring(0, userids.Length - 1);
            return userids;
        }

        /// <summary>
        /// 根据unitids获取userids
        /// </summary>
        /// <returns></returns>
        public string GetUseridsByUnitids(string unitids)
        {
            UserBLL ubll = new UserBLL();            
            List<UserModel> list = new List<UserModel>();
            string userids = "";
            if (!unitids.Contains(","))
            {
                List<UserModel> urusers = ubll.GetUsersPersonnelList(Convert.ToInt32(unitids), 3);
                list = list.Union(urusers).ToList();
            }
            else
            {
                string[] unitidarr = unitids.Split(',');
                foreach (var item in unitidarr)
                {
                    List<UserModel> urusers = ubll.GetUsersPersonnelList(Convert.ToInt32(item), 3);
                    list = list.Union(urusers).ToList();
                }
            }

            //添加行政许可科
            List<UserModel> unitusers = ubll.GetUsersStaff(9);//获取所有行政许可科
            list = list.Union(unitusers).ToList();
            foreach (UserModel item in list)
            {
                userids += item.ID + ",";
            }
            userids = userids.Substring(0, userids.Length - 1);
            return userids;
        }

        /// <summary>
        /// 获取专项整治图片
        /// </summary>
        /// <returns></returns>
        public List<FileClass> GetSpecialTaskImages(string taskid, string wfdid)
        {
            return dal.GetSpecialTaskImages(taskid, wfdid);
        }

        /// <summary>
        /// 获取专项整治用户上报详情图片
        /// </summary>
        /// <returns></returns>
        public List<FileClass> GetSpecialTaskReportImages(string wfsuid)
        {
            return dal.GetSpecialTaskReportImages(wfsuid);
        }

        /// <summary>
        /// 获取专项整治流程信息
        /// </summary>
        /// <returns></returns>
        public Paging<List<Zxzz_TaskWorkFlowModel>> GetSpecialTaskWFInfo(int start, int limit, string taskid, string wfdid)
        {
            Paging<List<Zxzz_TaskWorkFlowModel>> paging = dal.GetSpecialTaskWFInfo(start, limit, taskid, wfdid);

            return paging;
        }

        //行动中队回复
        public void WF_Reply(WorkFlowClass workflow)
        {
            WorkFlowManagerDAL wfdal = new WorkFlowManagerDAL();
            string WFSUID = wfdal.function_WF_DealCurentActivityUser(workflow.WFSAID, workflow.WFCreateUserID.Value, workflow.DEALCONTENT, 2, DateTime.Now, "false", "", workflow.WFCreateUserID.Value, "", "", "");
            //WFSUID为空时是回复，有值时是编辑回复
            if(string.IsNullOrEmpty(workflow.WFSUID))
                wfdal.function_WF_WorkFlowAttrach_smsj(WFSUID, workflow.files, null);
            else
                wfdal.function_WF_WorkFlowAttrach_smsj(workflow.WFSUID, workflow.files, null);            
        }

        //结束所有wfsu用户的未处理
        public void OverAllWFSU(string wfsaid,string nextwfsaid,int userid)
        {
            UserBLL ubll = new UserBLL();

            dal.OverAllWFSU(wfsaid, nextwfsaid,userid);
        }

        //初始化WFSU
        public void ReloadWFSU(string wfsaid)
        {
            UserBLL ubll = new UserBLL();

            dal.ReloadWFSU(wfsaid);
        }

        //结束总结所有wfsu用户的未处理
        public void EndAllWFSU(string wfsaid)
        {
            UserBLL ubll = new UserBLL();

            dal.EndAllWFSU(wfsaid);
        }

         /// <summary>
        /// 事件详情
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Zxzz_TaskModel GetSpecialTaskModel(string taskid)
        {
            return dal.GetSpecialTaskModel(taskid);
        }

    }
}
