using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Doc_DefinitionsDAL
    {

        /// <summary>
        /// 文书配置文书
        /// </summary>
        /// <returns></returns>
        public List<ClassModel> GetDefinitionClass()
        {
            List<ClassModel> list = new List<ClassModel>();
            using (Entities db = new Entities())
            {
                IQueryable<ClassModel> queryable = from a in db.doc_definitions
                                                      where a.ddstate == 0
                                                      select new ClassModel
                                                           {
                                                               id = a.ddid,
                                                               name = a.ddname,
                                                           };
                list = queryable.ToList();
            }
            return list;
        }



        /// <summary>
        /// 文书定义表列表
        /// </summary>
        /// <returns></returns>
        public List<Doc_DefinitionsModel> GetDefinitionsList(List<Filter> filters, int start, int limit)
        {
            List<Doc_DefinitionsModel> list = new List<Doc_DefinitionsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Doc_DefinitionsModel> queryable = from a in db.doc_definitions
                                                             where a.ddstate == 0
                                                             select new Doc_DefinitionsModel
                                                               {
                                                                   ddid = a.ddid,
                                                                   ddname = a.ddname,
                                                                   isunique = a.isunique,
                                                                   ddstate = a.ddstate,
                                                                   ddpath = a.ddpath,
                                                                   createtime = a.createtime,
                                                                   createuserid = a.createuserid,
                                                                   seq = a.seq
                                                               };


                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "ddname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ddname.Contains(value));
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.createtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.createtime <= Etime);
                                }
                                break;

                        }
                    }
                }
                list = queryable.OrderBy(s=>s.seq).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 文书定义表列表
        /// </summary>
        /// <returns></returns>
        public int GetDefinitionsCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<Doc_DefinitionsModel> queryable = from a in db.doc_definitions
                                                             where a.ddstate == 0
                                                             select new Doc_DefinitionsModel
                                                             {
                                                                 ddid = a.ddid,
                                                                 ddname = a.ddname,
                                                                 isunique = a.isunique,
                                                                 ddstate = a.ddstate,
                                                                 ddpath = a.ddpath,
                                                                 createtime = a.createtime,
                                                                 createuserid = a.createuserid,
                                                                 seq = a.seq
                                                             };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "ddname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ddname.Contains(value));
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.createtime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.createtime <= Etime);
                                }
                                break;

                        }
                    }
                }

                return queryable.Count();
            }
           
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="ddid"></param>
        /// <returns></returns>
        public int DeleteDefinition(int ddid)
        {
            using (Entities db = new Entities())
            {
                doc_definitions model = db.doc_definitions.Where(a => a.ddid == ddid).FirstOrDefault();
                if (model != null)
                {
                    model.ddstate = 1;
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int AddDefinition(Doc_DefinitionsModel DocModel) {
            using (Entities db = new Entities())
            {
                doc_definitions model = new doc_definitions();
                model.ddid = DocModel.ddid;
                model.ddname = DocModel.ddname;
                model.isunique = DocModel.isunique;
                model.ddstate = DocModel.ddstate;
                model.ddpath = DocModel.ddpath;
                model.createtime = DocModel.createtime;
                model.createuserid = DocModel.createuserid;
                model.seq = DocModel.seq;
                model.doccode = DocModel.doccode;
                db.doc_definitions.Add(model);
                db.SaveChanges();
                return model.ddid;
            }
        }

    }
}
