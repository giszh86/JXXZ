using JXXZ.ZHCG.DAL;
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
    public class FI_CamerasBLL
    {
        private FI_CamerasDAL dal = new FI_CamerasDAL();
        public FI_CamerasModel GetUnitsDetails(string cameraid)
        {
            return dal.GetUnitsDetails(cameraid);
        }

        /// <summary>
        /// 根据监控ID获取监控
        /// </summary>
        /// <param name="cameraid"></param>
        /// <returns></returns>
        public fi_cameras GetCameraDetails(string cameraid)
        {
            return dal.GetCameraDetails(cameraid);
        }


    }
}
