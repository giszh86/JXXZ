using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
   public class QW_CarTasksBLL
    {
       private QW_CarTasksDAL dal = new QW_CarTasksDAL();

        /// <summary>
        /// 添加巡查任务
        /// </summary>
        /// <param name="model"></param>
        public void AddCarTask(QW_CarTasksModel model)
        {
            dal.AddCaeTask(model);
        }

        /// <summary>
        /// 修改任务
        /// </summary>
        /// <param name="model"></param>
        public int ModifyCarTask(QW_CarTasksModel model)
        {
            return dal.ModifyCarTask(model);
        }

        /// <summary>
        /// 删除任务
        /// </summary>
        /// <param name="model"></param>
        public int DeleteCarTask(int Cartaskid)
        {
            return dal.DeleteCarTask(Cartaskid);
        }

        /// <summary>
        /// 根据ID查询车牌号
        /// </summary>
        /// <param name="model"></param>
        public string GetCarNumByID(int carid)
        {
            return dal.GetCarNumByID(carid);
        }

        /// <summary>
        /// 查询任务详情
        /// </summary>
        /// <param name="Carid">人员id</param>
        /// <param name="StartDate">开始时间</param>
        /// <returns></returns>
        public QW_CarTasksModel GetCarTask(string carnum, DateTime StartDate)
        {
            return dal.GetCarTask(carnum, StartDate);
        }

        /// <summary>
        /// 查找全部列表
        /// </summary>
        /// <param name="model"></param>
        public List<qw_cartasks> GetCarTaskList()
        {
            return dal.GetCarTaskList();
        }
    }
}
