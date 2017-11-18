using JXXZ.ZHCG.DAL.monitorProjectDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.monitorProjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.monitorProjectBLL
{
    public class MonitorProjectBLL
    {
        monitorProjectDAL dal = new monitorProjectDAL();

        #region 获取监控专题树列表
        public List<TreeMonitorModel> GetMonitoreTreeList()
        {
            return dal.GetMonitoreTreeList();
        }
        #endregion

        #region 获取监控专题Grid列表
        public Pag<MonitorListModel> GetMonitorTableList(List<Filter> filters, int start, int limit, int unitid, string path)
        {
            return dal.GetMonitorTableList(filters, start, limit, unitid, path);
        }
        #endregion

        #region 获取专题监控元素详情
        public MonitorListModel GetGridItem(int unitid, string cameraid)
        {
            return dal.GetGridItem(unitid, cameraid);
        }
        #endregion

        #region 新增监控专题
        public int AddMonitorPro(TreeMonitorModel model)
        {
            return dal.AddMonitorPro(model);
        }
        #endregion

        #region 修改监控专题
        public int EditMonitorePro(TreeMonitorModel model)
        {
            return dal.EditMonitorePro(model);
        }
        #endregion

        #region 删除监控专题
        public int DeleteMonitorPro(int unitid)
        {
            return dal.DeleteMonitorPro(unitid);
        }
        #endregion

        #region 查看监控专题详情
        public TreeMonitorModel GetMonitorDetail(int unitid)
        {
            return dal.GetMonitorDetail(unitid);
        }
        #endregion

        #region 添加监控专题元素
        public int AddMonitorItem(MonitorListModel model)
        {
            return dal.AddMonitorItem(model);
        }
        #endregion

        #region 修改监控专题元素
        public int EditMonitorItem(MonitorListModel model)
        {
            return dal.EditMonitorItem(model);
        }
        #endregion

        #region 删除监控专题元素
        public int DeleteMonitorItem(int unitid, string cameraid)
        {
            return dal.DeleteMonitorItem(unitid, cameraid);
        }
        #endregion
    }
}
