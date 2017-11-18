using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.BulletinBoardModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.BulletinBoardDAL
{
    /// <summary>
    /// 公告管理
    /// </summary>
    public class BulletinBoardDAL
    {
        #region 公告管理列表
        /// <summary>
        /// 获取公告管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        public Paging<List<BulletinBoardModel>> GetBulletinBoardList(List<Filter> filters, int start, int limit, int userid)
        {
            Paging<List<BulletinBoardModel>> list = new Paging<List<BulletinBoardModel>>();
            using (Entities db = new Entities())
            {
                IEnumerable<BulletinBoardModel> queryable = from a in db.base_articles
                                                            where a.status==0
                                                            orderby a.seq ascending, a.createtime descending
                                                            select new BulletinBoardModel
                                                            {
                                                                id=a.id,
                                                                author=a.author,
                                                                title=a.title,
                                                                seq=a.seq,
                                                                content=a.content,
                                                                createtime=a.createtime,
                                                                createuserid=a.createuserid,
                                                            };
                #region 参数查询
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.title.Contains(value));
                                }
                                break;
                            case "createtimefrom":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtimefrom = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.createtime >= createtimefrom);
                                }
                                break;
                            case "createtimeto":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtimeto = DateTime.Parse(value).AddDays(1);
                                    queryable = queryable.Where(t => t.createtime <= createtimeto);
                                }
                                break;
                        }
                    }
                }
                #endregion
                
                list.Items = queryable.Skip(start).Take(limit).ToList();
                list.Total = queryable.Count();
            }
            return list;
        }
        #endregion

        #region 首页公告管理列表
        public List<BulletinBoardModel> GetBulletinBoardList()
        {
            List<BulletinBoardModel> list = new List<BulletinBoardModel>();
            using (Entities db = new Entities())
            {
                IEnumerable<BulletinBoardModel> queryable = from a in db.base_articles
                                                            where a.status == 0
                                                            orderby a.seq ascending, a.createtime descending
                                                            select new BulletinBoardModel
                                                            {
                                                                id = a.id,
                                                                author = a.author,
                                                                title = a.title,
                                                                seq = a.seq,
                                                                content = a.content,
                                                                createtime = a.createtime,
                                                                createuserid = a.createuserid,
                                                            };
                list = queryable.Skip(0).Take(8).ToList();                                    
            }
            return list;
        }
        #endregion

        #region 新增公告
        /// <summary>
        /// 新增公告
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddBulletinBoard(BulletinBoardModel model)
        {
            using (Entities db = new Entities())
            {
                base_articles article = new base_articles();
                article.author = model.author;
                article.content = model.content;
                article.createtime = model.createtime;
                article.createuserid = model.createuserid;
                article.seq = model.seq;
                article.title = model.title;
                article.status = 0;         //0：未删除 1：删除
                article.filename = model.filename;
                article.filepath = model.filepath;
                article.filesize = model.filesize;
                db.base_articles.Add(article);
                return db.SaveChanges();
            }
        }
        #endregion

        #region 编辑公告
        /// <summary>
        /// 编辑公告
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditBulletinBoard(BulletinBoardModel model)
        {
            using (Entities db = new Entities()) 
            {
                base_articles article = db.base_articles.Find(model.id);
                if (article != null)
                {
                    article.author = model.author;
                    article.content = model.content;
                    article.seq = model.seq;
                    article.title = model.title;
                    article.createtime = DateTime.Now;
                    if (model.filename != null && model.filepath != null)
                    {
                        //删除替换之前的附件
                        if (System.IO.File.Exists(article.filepath))
                        {
                            System.IO.File.Delete(article.filepath);
                        }
                        article.filename = model.filename;
                        article.filepath = model.filepath;
                        article.filesize = model.filesize;
                    }
                    if (model.filename == null && model.filepath == null&&article.filename!=null&& article.filepath!=null)
                    {
                        //删除附件
                        if (System.IO.File.Exists(article.filepath))
                        {
                            System.IO.File.Delete(article.filepath);
                        }
                        article.filepath = null;
                        article.filename = null;
                        article.filesize = null;
                    }
                    return db.SaveChanges();
                }
                else 
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 查看公告详情信息
        /// <summary>
        /// 查看公告详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BulletinBoardModel ViewBulletinBoard(int id)
        {
            BulletinBoardModel model = new BulletinBoardModel();
            using(Entities db=new Entities())
            {
                base_articles article = db.base_articles.FirstOrDefault(t => t.id == id);
                if (article != null)
                {
                    model.id = article.id;
                    model.author=article.author;
                    model.content=article.content;
                    model.createtime=article.createtime;
                    model.createuserid = article.createuserid;
                    model.filename = article.filename;
                    model.filepath = article.filepath;
                    model.filesize = article.filesize;
                    model.seq = article.seq;
                    model.status = article.status;
                    model.title = article.title;
                }
                return model;
            }
        }
        #endregion

        #region 删除公告信息
        /// <summary>
        /// 删除公告信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteBulletinBoard(int id)
        {
            using (Entities db = new Entities())
            {
                base_articles article = db.base_articles.FirstOrDefault(t => t.id == id);
                if (article != null)
                {
                    article.status = 1;
                }
                return db.SaveChanges();
            }
        }
        #endregion

    }
}
