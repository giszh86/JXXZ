using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using JXXZ.ZHCG.Utility;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
    public class QW_UserLastPositionsBLL
    {
        /// <summary>
        /// 添加用户最后位置
        /// </summary>
        private QW_UserLastPositionsDAL dal = new QW_UserLastPositionsDAL();
        public int QW_UserLastPositions(QW_UserLastPositionsModel model)
        {
            //string geometry = model.x84 + "," + model.y84;
            //string map2000 = new MapXYConvent().WGS84ToCGCS2000(geometry);
            //if (!string.IsNullOrEmpty(map2000))
            //{
            //    model.x2000 = decimal.Parse(map2000.Split(',')[0]);
            //    model.y2000 = decimal.Parse(map2000.Split(',')[1]);
            //}
            return dal.QW_UserLastPositions(model);
        }

        /// <summary>
        /// 添加求助
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="remarks"></param>
        /// <returns></returns>
        public int AddHelp(int userid, string remarks) {
            return dal.AddHelp(userid, remarks);
        }

        /// <summary>
        /// 修改求助
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public int EditHelp(int userid) {
            return dal.EditHelp(userid);
        }
    }

}
