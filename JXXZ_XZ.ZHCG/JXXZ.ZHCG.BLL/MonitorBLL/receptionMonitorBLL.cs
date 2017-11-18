using JXXZ.ZHCG.DAL.MonitorDAL;
using JXXZ.ZHCG.Model.MonitorModel;
using JXXZ.ZHCG.Model.monitorProjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.MonitorBLL
{
    public class receptionMonitorBLL
    {
        private receptionMonitorDAL dal = new receptionMonitorDAL();

        public List<int> GetVideoCount()
        {
            return dal.GetVideoCount();
        }

        public List<int> GetSpzsCount()
        {
            return dal.GetSpzsCount();
        }
        public List<int> GetXcjdCount()
        {
            return dal.GetXcjdCount();
        }
        public List<int> GetGzjdCount()
        {
            return dal.GetGzjdCount();
        }
        public List<int> GetZtslCount()
        {
            return dal.GetZtslCount();
        }


        #region 获取监控专题树列表
        public List<FI_CameraUnitsTreeModel> GetMonitoreTreeList()
        {
            return dal.GetMonitoreTreeList();
        }
        #endregion

        public string GetMonitoreTreeCount() {
            return dal.GetMonitoreTreeCount();
        }
    }
}
