using JXXZ.ZHCG.DAL.ConservationDAL;
using JXXZ.ZHCG.Model.ConservationModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ConservationBLL
{
    public class YH_FileBLL
    {
        private YH_FileDAL dal = new YH_FileDAL();
        /// <summary>
        /// 添加养护附件
        /// </summary>
        /// <param name="model"></param>
        public void AddFile(YH_FileModel model)
        {
            dal.AddFile(model);
        }
        /// <summary>
        /// 查询养护合同
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetFileUpload(int id, int type)
        {
            return dal.GetFileUpload(id, type);
        }
    }
}
