using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using JXXZ.ZHCG.DAL.SystemDAL;

namespace JXXZ.ZHCG.DAL.administrativeapprovalDAL
{
    /// <summary>
    /// 门前三包
    /// </summary>
    public class ThreeBagsDAL
    {
        Base_ZdsDAL base_model = new Base_ZdsDAL();

        #region 门前三包列表数据
        /// <summary>
        /// 门前三包列表数据
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<TreeBagsModel> GetSourcesList(List<Filter> filters, int start, int limit)
        {
            List<TreeBagsModel> list = new List<TreeBagsModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT bag.*, zds.zd_name AS storetypename, file.filepath AS firstImgUrl FROM xz_threebags bag LEFT JOIN base_zds zds ON bag.storetype = zds.zd_id AND zds.zd_type = 'type_djlx' LEFT JOIN (SELECT * FROM xzj_files fi WHERE fi.source = 1 GROUP BY fi.sourceid ) file ON bag.storeid = file.sourceid");
                IEnumerable<TreeBagsModel> queryable = db.Database.SqlQuery<TreeBagsModel>(sql);
                #region linq
                //IQueryable<TreeBagsModel> queryable = from a in db.xz_threebags
                //                                      join b_join in db.xzj_files on a.storeid equals b_join.sourceid into btmp
                //                                      from b in btmp.DefaultIfEmpty()
                //                                      where b.source == 1
                //                                      orderby a.storeid descending
                //                                      select new TreeBagsModel
                //                                      {
                //                                          storeid = a.storeid,
                //                                          storename = a.storename,
                //                                          storetype = a.storetype,
                //                                          person = a.person,
                //                                          card = a.card,
                //                                          contactphone = a.contactphone,
                //                                          address = a.address,
                //                                          geography = a.geography,
                //                                          remark = a.remark,
                //                                          createuserid = a.createuserid,
                //                                          createtime = DateTime.Now,
                //                                          firstImgUrl = b.filename,
                //                                      };
                #endregion
                
                foreach (TreeBagsModel bag_model in queryable)
                {
                    if (bag_model != null && bag_model.firstImgUrl!=null)
                    {
                        List<string> filelist = new List<string>();
                        filelist.Add(bag_model.firstImgUrl);
                        bag_model.imgUrl = filelist;
                    }
                }
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "storename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.storename.Contains(value));
                                }
                                break;
                            case "storetype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.storetypename.Equals(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contactphone != null && t.contactphone.Contains(value));
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.address.Contains(value));
                                break;
                            case "createtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtime = Convert.ToDateTime(value);
                                    queryable = queryable.Where(t => t.createtime == createtime);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.storeid).Skip(start).Take(limit).ToList();
            }
            return list;
        }
        #endregion

        #region 门前三包列表数据总量
        /// <summary>
        /// 门前三包列表数据总量
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public int GetSourcesListCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<TreeBagsModel> queryable = from a in db.xz_threebags
                                                      select new TreeBagsModel
                                                      {
                                                          storeid = a.storeid,
                                                          storename = a.storename,
                                                          storetype = a.storetype,
                                                          person = a.person,
                                                          card = a.card,
                                                          contactphone = a.contactphone,
                                                          address = a.address,
                                                          geography = a.geography,
                                                          remark = a.remark,
                                                          createuserid = a.createuserid,
                                                          createtime = DateTime.Now,
                                                      };


                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "storename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.storename.Contains(value));
                                }
                                break;
                            case "storetype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.storetype.Contains(value));
                                break;
                            case "contactphone":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contactphone.Contains(value));
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.address.Contains(value));
                                break;
                            case "createtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtime = Convert.ToDateTime(value);
                                    queryable = queryable.Where(t => t.createtime == createtime);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }
        #endregion

        #region 门前三包详情
        /// <summary>
        /// 门前三包详情
        /// </summary>
        /// <param name="storeid"></param>
        /// <returns></returns>
        public TreeBagsModel GetThreeBagsInfo(int storeid)
        {
            TreeBagsModel model = new TreeBagsModel();
            using (Entities db = new Entities())
            {
                IQueryable<TreeBagsModel> queryable = from a in db.xz_threebags
                                                      join b in db.base_zds.Where(t => t.zd_type == "type_djlx") on a.storetype equals b.zd_id
                                                      where a.storeid == storeid 
                                                      select new TreeBagsModel
                                                      {
                                                          storeid = a.storeid,
                                                          storename = a.storename,
                                                          storetype = a.storetype,
                                                          person = a.person,
                                                          card = a.card,
                                                          contactphone = a.contactphone,
                                                          address = a.address,
                                                          geography = a.geography,
                                                          remark = a.remark,
                                                          createuserid = a.createuserid,
                                                          createtime = a.createtime,
                                                          storetypename=b.zd_name
                                                      };
                model = queryable.FirstOrDefault();
                if (GetFilesByStoreID(storeid) != null)
                {
                    List<string> imgList = GetFilesByStoreID(storeid);
                    if (imgList.Count > 0)
                    {
                        if (model != null)
                        {
                            model.imgUrl = imgList;
                        }
                    }
                }

            }
            return model;
        }

        #endregion

        #region 添加门前三包
        /// <summary>
        /// 添加门前三包
        /// </summary>
        /// <returns></returns>
        public int AddThreeBagsInf(TreeBagsModel model, List<FileUploadClass> list)
        {

            bool info = false, file = false;
            Base_ZdsDAL base_dal = new Base_ZdsDAL();
            using (Entities db = new Entities())
            {
                xz_threebags bags_model = new xz_threebags();
                bags_model.storename = model.storename;
                bags_model.person = model.person;
                bags_model.card = model.card;
                bags_model.contactphone = model.contactphone;
                bags_model.address = model.address;
                bags_model.geography = model.geography;
                bags_model.remark = model.remark;
                bags_model.createuserid = model.createuserid;
                bags_model.createtime = DateTime.Now;

                if (model != null)
                {
                    string id = model.storetype;
                    //model.storetype = Convert.ToString(base_model.GetTypeById(id, "type_djlx")[id]);
                    bags_model.storetype = model.storetype;
                }

                db.xz_threebags.Add(bags_model);
                if (db.SaveChanges() > 0)
                {
                    info = true;
                }

                foreach (var item in list)
                {
                    xzj_files filemodel = new xzj_files();
                    filemodel.source = 1;   //1 门前三包  2行政许可
                    filemodel.filename = item.OriginalName;
                    filemodel.filepath = item.OriginalPath;
                    filemodel.filesize = item.size;
                    filemodel.filetype = item.OriginalType;
                    filemodel.sourceid = bags_model.storeid;

                    db.xzj_files.Add(filemodel);
                }

                if (db.SaveChanges() > 0)
                {
                    file = true;
                }

                if (info && file)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 删除门前三包
        /// <summary>
        /// 删除门前三包
        /// </summary>
        /// <returns></returns>
        public int DeleteThreeBagsInf(int storeid)
        {
            using (Entities db = new Entities())
            {
                xz_threebags model = db.xz_threebags.SingleOrDefault(t => t.storeid == storeid);
                if (model != null)
                {
                    db.xz_threebags.Remove(model);
                }
                //删除附件
                do
                {
                    xzj_files file_model = db.xzj_files.FirstOrDefault(a => a.sourceid == model.storeid && a.source == 1);
                    if (file_model != null)
                    {
                        db.xzj_files.Remove(file_model);
                    }
                }
                while (db.SaveChanges() > 0);
                return db.SaveChanges();
            }
        }
        #endregion

        #region 修改门前三包信息
        /// <summary> 
        /// 修改门前三包信息
        /// </summary>
        /// <param name="storeid"></param>
        /// <returns></returns>
        public int EditThreeBagsInf(TreeBagsModel model, List<FileUploadClass> list)
        {
            bool info = false, file = false;
            using (Entities db = new Entities())
            {
                xz_threebags bags_model = db.xz_threebags.FirstOrDefault(a => a.storeid == model.storeid);
                if (bags_model != null)
                {
                    bags_model.storename = model.storename;
                    bags_model.storetype = model.storetype;
                    bags_model.person = model.person;
                    bags_model.card = model.card;
                    bags_model.contactphone = model.contactphone;
                    bags_model.address = model.address;
                    bags_model.geography = model.geography;
                    bags_model.remark = model.remark;
                    if (db.SaveChanges() > 0)
                    {
                        info = true;
                    }
                }
                foreach (var item in list)
                {
                    xzj_files filemodel = new xzj_files();
                    filemodel.source = 1;   //1 门前三包  2行政许可
                    filemodel.filename = item.OriginalName;
                    filemodel.filepath = item.OriginalPath;
                    filemodel.filesize = item.size;
                    filemodel.filetype = item.OriginalType;
                    filemodel.sourceid = bags_model.storeid;

                    db.xzj_files.Add(filemodel);
                }

                if (db.SaveChanges() > 0)
                {
                    file = true;
                }

                if ((info && file)||info)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 根据门前三包ID获取附件
        /// <summary>
        /// 根据门前三包ID获取附件
        /// </summary>
        /// <param name="licenseId"></param>
        /// <returns></returns>
        public List<string> GetFilesByStoreID(int storeid)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            Entities db = new Entities();
            IQueryable<FileUploadClass> iqueryable = from file in db.xzj_files
                                                     where file.sourceid == storeid && file.source == 1
                                                     select new FileUploadClass()
                                                     {
                                                         OriginalName = file.filename,
                                                         OriginalPath = file.filepath,
                                                         OriginalType = file.filetype,
                                                         size = file.filesize
                                                     };
            list = iqueryable.ToList();
            if (list.Count > 0)
            {
                List<string> fileList = new List<string>();
                for (int j = 0; j < list.Count; j++)
                {
                    FileUploadClass file = list[j];
                    fileList.Add(file.OriginalPath);
                }
                return fileList;
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 手机API接口

        #region 添加门前三包信息
        public int AddThreeBagsInf(TreeBagsModel model, List<FileClass> list)
        {
            bool info = false, file = false;
            using (Entities db = new Entities())
            {
                xz_threebags bags_model = new xz_threebags();
                bags_model.storename = model.storename;
                bags_model.storetype = model.storetype;
                bags_model.person = model.person;
                bags_model.card = model.card;
                bags_model.contactphone = model.contactphone;
                bags_model.address = model.address;
                bags_model.geography = model.geography;
                bags_model.remark = model.remark;
                bags_model.createuserid = model.createuserid;
                bags_model.createtime = DateTime.Now;

                db.xz_threebags.Add(bags_model);
                if (db.SaveChanges() > 0)
                {
                    info = true;
                }

                foreach (var item in list)
                {
                    xzj_files filemodel = new xzj_files();
                    filemodel.source = 1;   //1 门前三包  2行政许可
                    filemodel.filename = item.OriginalName;
                    filemodel.filepath = item.OriginalPath;
                    filemodel.filesize = item.size;
                    filemodel.filetype = item.OriginalType;
                    filemodel.sourceid = bags_model.storeid;

                    db.xzj_files.Add(filemodel);
                }

                if (db.SaveChanges() > 0)
                {
                    file = true;
                }

                if (info && file || info)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion



        #endregion
    }
}
