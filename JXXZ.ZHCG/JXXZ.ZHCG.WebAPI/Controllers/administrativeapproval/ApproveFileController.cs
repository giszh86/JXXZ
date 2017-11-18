using JXXZ.ZHCG.BLL.administrativeapprovalBLL;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.administrativeapproval
{
    public class ApproveFileController : ApiController
    {
        Approve_FileBLL bll = new Approve_FileBLL();
        #region 获取附件内容
        [HttpGet]
        public List<FileUploadClass> GetFileUpload(int id,int type)
        {
            return bll.GetFileUpload(id,type);
        }
        #endregion
    }
}