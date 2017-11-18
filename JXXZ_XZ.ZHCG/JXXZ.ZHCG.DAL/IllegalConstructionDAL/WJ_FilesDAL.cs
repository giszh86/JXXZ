using JXXZ.ZHCG.Model.IllegalConstructionModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.IllegalConstructionDAL
{
    public class WJ_FilesDAL
    {
        /// <summary>
        /// 添加附件
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddCqxm(WJ_FilesModel model)
        {
            using (Entities db = new Entities())
            {
                wj_files wfmodel = new wj_files();
                //wfmodel.fileid = model.fileid;
                wfmodel.filetype = model.filetype;
                wfmodel.filename = model.filename;
                wfmodel.filepath = model.filepath;
                wfmodel.source = model.source;
                wfmodel.sourceid = model.sourceid;
                wfmodel.filesize = model.filesize;
                db.wj_files.Add(wfmodel);
                db.SaveChanges();
                return wfmodel.fileid;
            }
        }

        public List<WJ_FilesModel> GetFileList(int id ,int type)
        {
            List<WJ_FilesModel> list = new List<WJ_FilesModel>();
            using (Entities db=new Entities())
            {
                IQueryable<WJ_FilesModel> queryable = from a in db.wj_files
                                                      where a.sourceid == id && a.source==type
                                                      select new WJ_FilesModel { 
                                                      fileid=a.fileid,
                                                      filetype = a.filetype,
                                                      filename = a.filename,
                                                      filepath = a.filepath,
                                                      filesize = a.filesize,
                                                      };
                list = queryable.Where(a => a.filetype == ".jpg" || a.filetype == ".png" || a.filetype == ".bmp" || a.filetype == ".gif").ToList();
            }
            return list;
        }



        public List<FileUploadClass> GetFileUpload(int id, int type)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> queryable = from a in db.wj_files
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


        public int DeleteWzjzFile(int wjid)
        {
            using (Entities db = new Entities())
            {
                IEnumerable<wj_files> queryable = db.wj_files.Where(a=>a.sourceid==wjid && a.source==1);
                foreach (var item in queryable)
                {
                    db.wj_files.Remove(item);
                }
                return db.SaveChanges();
            }

        }
    }
}
