using JXXZ.ZHCG.DAL.MonitorDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.MonitorModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.MonitorBLL
{
    public class FI_Camera_UnitsBLL
    {
        private FI_CamerasDAL camerasdal = new FI_CamerasDAL();
        private FI_Camera_UnitsDAL dal = new FI_Camera_UnitsDAL();
        public List<FI_CameraUnitsTreeModel> GetTreeMonitor(List<Filter> filters)
        {
            //查询根节点
            List<FI_CameraUnitsTreeModel> dataList = dal.GetTreeMonitor(null)
                .Select(a => new FI_CameraUnitsTreeModel
                {
                    text = a.text,
                    parentid = a.parentid,
                    id = a.id,
                    path=a.path,
                }).ToList();

            List<FI_CameraUnitsTreeModel> dataListChildren = dal.GetTreeMonitorChildren(filters)
                .Select(a => new FI_CameraUnitsTreeModel
                {
                    text = a.text,
                    parentid = a.parentid,
                    id = a.id,
                    path=a.path,
                }).ToList();
            List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();

            if (dataList.Count > 0)
            {
                for (int i = 0; i < dataList.Count; i++)
                {
                    FI_CameraUnitsTreeModel item = dataList[i];

                    if (item.parentid == null)
                    {
                        item = GetUnitChildren(dataListChildren, item, filters);                        
                        list.Add(item);
                    }
                }
            }
            return list;
        }

        /// <summary>
        /// 前台监控书列表
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public List<FI_CameraUnitsTreeModel> GetTreeMonitorApi(List<Filter> filters)
        {
            //查询根节点
            List<FI_CameraUnitsTreeModel> dataList = dal.GetTreeMonitor(filters)
                .Select(a => new FI_CameraUnitsTreeModel
                {
                    text = a.text,
                    parentid = a.parentid,
                    id = a.id,
                    path = a.path,
                }).ToList();

            List<FI_CameraUnitsTreeModel> dataListChildren = dal.GetTreeMonitorChildren(null)
                .Select(a => new FI_CameraUnitsTreeModel
                {
                    text = a.text,
                    parentid = a.parentid,
                    id = a.id,
                    path = a.path,
                }).ToList();
            List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();

            if (dataList.Count > 0)
            {
                for (int i = 0; i < dataList.Count; i++)
                {
                    FI_CameraUnitsTreeModel item = dataList[i];

                    if (item.parentid == null)
                    {
                        item = GetUnitChildren(dataListChildren, item, null);
                        list.Add(item);
                    }
                }
            }
            return list;
        }


        private FI_CameraUnitsTreeModel GetUnitChildren(List<FI_CameraUnitsTreeModel> dataList, FI_CameraUnitsTreeModel item, List<Filter> filters)
        {
            List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();

            for (int i = 0; i < dataList.Count; i++)
            {
                FI_CameraUnitsTreeModel childrenItem = dataList[i];

                if (childrenItem.parentid != null && childrenItem.parentid == item.id)
                {
                    var cameras = camerasdal.GetCameras(childrenItem.id, filters);
                    childrenItem = GetUnitChildren(dataList, childrenItem, filters);
                    foreach (var cam in cameras)
                    {
                        childrenItem.nodes.Add(cam);
                        childrenItem.children = childrenItem.nodes;
                    }
                    list.Add(childrenItem);
                }
            }
            item.nodes = list;
            item.children = item.nodes;
            return item;
        }
    }
}
