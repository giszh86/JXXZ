using JXXZ.ZHCG.BLL.ConservationBLL;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Conservation
{
    public class YHFileController : ApiController
    {
        private YH_FileBLL bll = new YH_FileBLL();

        /// <summary>
        /// 查询养护合同
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetFileUpload(int id, int type)
        {
            return bll.GetFileUpload(id, type);
        }
    }
}