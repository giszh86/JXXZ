using JXXZ.ZHCG.DAL.IllegalConstructionDAL;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.IllegalConstructionBLL
{
   public  class WJ_FilesBLL
    {
       private WJ_FilesDAL dal = new WJ_FilesDAL();
        /// <summary>
        /// 添加附件
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       public int AddCqxm(WJ_FilesModel model)
       {
           return dal.AddCqxm(model);
       }


       public List<WJ_FilesModel> GetFileList(int id, int type)
       {
           return dal.GetFileList(id, type);
       }

       public List<FileUploadClass> GetFileUpload(int id, int type)
       {
           return dal.GetFileUpload(id, type);
       }
    }
}
