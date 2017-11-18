using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.QWGL
{
    public class PositioningController : ApiController
    {
        private QW_UserHistoryPositionsBLL uhpbll = new QW_UserHistoryPositionsBLL();
        private QW_UserLastPositionsBLL ulpbll = new QW_UserLastPositionsBLL();

        /// <summary>
        /// 添加用户历史定位
        /// </summary>
        /// <param name="model"></param>
        [HttpPost]
        public void UserHistoryPositions(QW_UserHistoryPositionsModel model)
        {
            QW_UserLastPositionsModel qumodel = new QW_UserLastPositionsModel();

            qumodel.userid = model.userid;
            qumodel.x84 = model.x84;
            qumodel.y84 = model.y84;
            qumodel.imeicode = model.imeicode;
            qumodel.address = model.address;
            
            uhpbll.UserHistoryPositions(model);
            ulpbll.QW_UserLastPositions(qumodel);
        }

     
    }
}