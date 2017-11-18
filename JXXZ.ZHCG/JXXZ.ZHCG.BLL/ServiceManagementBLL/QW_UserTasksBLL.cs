using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
    public class QW_UserTasksBLL
    {
        private QW_UserTasksDAL dal = new QW_UserTasksDAL();

        /// <summary>
        /// 添加巡查任务
        /// </summary>
        /// <param name="model"></param>
        public void AddUserTask(QW_UserTasksModel model)
        {
            dal.AddUserTask(model);
        }

        /// <summary>
        /// 修改任务
        /// </summary>
        /// <param name="model"></param>
        public int ModifyUserTask(QW_UserTasksModel model)
        {
            return dal.ModifyUserTask(model);
        }

        /// <summary>
        /// 删除任务
        /// </summary>
        /// <param name="model"></param>
        public int DeleteUserTask(int usertaskid)
        {
            return dal.DeleteUserTask(usertaskid);
        }

         /// <summary>
       /// 查询任务详情
       /// </summary>
       /// <param name="userid">人员id</param>
       /// <param name="StartDate">开始时间</param>
       /// <returns></returns>
        public QW_UserTasksModel GetUserTask(int userid, DateTime StartDate)
        {
            return dal.GetUserTask(userid, StartDate);
        }

        public List<qw_usertasks> GetUserTaskList() {
            return dal.GetUserTaskList();
        }

     

        /// <summary>
        /// 未办任务
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<UserTask>> GetNewUserTaskList(int userid, int start, int limit)
        {

            List<UserTask> items = dal.GetNewUserTaskList(userid, start, limit).ToList();
            int total = dal.GetNewUserTaskCount(userid);

            Paging<List<UserTask>> paging = new Paging<List<UserTask>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 已办任务
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<UserTask>> GetOldUserTaskList(int userid, int start, int limit)
        {

            List<UserTask> items = dal.GetOldUserTaskList(userid, start, limit).ToList();
            int total = dal.GetOldUserTaskCount(userid);

            Paging<List<UserTask>> paging = new Paging<List<UserTask>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 查询任务详情
        /// </summary>
        /// <returns></returns>
        public UserTask GetUserTaskModel(int usertaskid)
        {
            return dal.GetUserTaskModelApi(usertaskid);
        }

        /// <summary>
        /// 根据userid查询自己当天任务
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<UserTask> GetApiUserTaskList(int userID)
        {
            return dal.GetApiUserTaskList(userID);
        }
    }
}
