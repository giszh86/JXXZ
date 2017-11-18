using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.administrativeapprovalBLL
{
    public class Approve_FileBLL
    {
        Approve_FileDAL dal = new Approve_FileDAL();
        #region 获取附件内容
        public List<FileUploadClass> GetFileUpload(int id,int type)
        {
            return dal.GetFileUpload(id,type);
        }
        #endregion
    }
}
