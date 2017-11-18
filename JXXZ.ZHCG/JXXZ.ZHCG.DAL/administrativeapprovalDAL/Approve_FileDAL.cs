using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.administrativeapprovalBLL
{
    public class Approve_FileDAL
    {
        #region 获取附件内容
        public List<FileUploadClass> GetFileUpload(int id,int type)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> queryable = from a in db.xzj_files
                                                        where a.sourceid == id && a.source == type
                                                        select new FileUploadClass
                                                        {
                                                            OriginalType = a.filetype,
                                                            OriginalName = a.filename,
                                                            OriginalPath = a.filepath,
                                                            size = a.filesize,
                                                        };
                list = queryable.ToList();
            }
            return list;
        }
        #endregion
    }
}
