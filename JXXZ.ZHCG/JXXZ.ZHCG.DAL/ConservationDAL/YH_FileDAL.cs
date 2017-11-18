using JXXZ.ZHCG.Model.ConservationModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ConservationDAL
{
    public class YH_FileDAL
    {
        /// <summary>
        /// 添加养护附件
        /// </summary>
        /// <param name="model"></param>
        public void AddFile(YH_FileModel model)
        {
            using (Entities db = new Entities())
            {
                yh_files yhmodel = new yh_files();
                //yhmodel.fileid = model.fileid;
                yhmodel.filesource = model.filesource;
                yhmodel.sourceid = model.sourceid;
                yhmodel.filename = model.filename;
                yhmodel.filetype = model.filetype;
                yhmodel.filepath = model.filepath;
                yhmodel.filesize = model.filesize;
                db.yh_files.Add(yhmodel);
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 获取附件列表
        /// </summary>
        /// <param name="filesource"></param>
        /// <param name="sourceid"></param>
        /// <returns></returns>
        public List<YH_FileModel> GetFileList(int filesource, int sourceid)
        {
            List<YH_FileModel> list = new List<YH_FileModel>();
            using (Entities db = new Entities())
            {
                IQueryable<YH_FileModel> queryable = from a in db.yh_files
                                                     where a.filesource == filesource && a.sourceid == sourceid
                                                     select new YH_FileModel
                                                     {
                                                         fileid = a.fileid,
                                                         filesource = a.filesource,
                                                         sourceid = a.sourceid,
                                                         filename = a.filename,
                                                         filetype = a.filetype,
                                                         filepath = a.filepath,
                                                         filesize = a.filesize,
                                                     };
                list = queryable.ToList();
            }
            return list;
        }



        public List<FileUploadClass> GetFileUpload(int id, int type)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> queryable = from a in db.yh_files
                                                        where a.sourceid == id && a.filesource == type
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
    }
}
