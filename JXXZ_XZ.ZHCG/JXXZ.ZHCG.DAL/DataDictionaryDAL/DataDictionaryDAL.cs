using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.DataDictionaryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.DataDictionaryDAL
{
    public class DataDictionaryDAL
    {

        /// <summary>
        /// 获取类型
        /// </summary>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionaryTypeList()
        {
            List<DataDictionaryType> list = new List<DataDictionaryType>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select zd_id zdid, zd_type ddid,zd_typename text ,zd_typename name,remark, parentid from base_zds GROUP BY zd_type");
                IEnumerable<DataDictionaryType> queryable = db.Database.SqlQuery<DataDictionaryType>(sql);
                list = queryable.ToList();
            }
            return list;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionary()
        {
            List<DataDictionaryType> list = new List<DataDictionaryType>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select zd_id zdid, zd_type ddid,zd_name text ,zd_name name ,remark, parentid from base_zds where status<>1");
                IEnumerable<DataDictionaryType> queryable = db.Database.SqlQuery<DataDictionaryType>(sql);
                list = queryable.ToList();
            }
            return list;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionaryChildren(string zdtype, string zdid)
        {
            List<DataDictionaryType> list = new List<DataDictionaryType>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select zd_id zdid, zd_type ddid,zd_name text ,zd_name name ,remark, parentid from base_zds where status<>1 and remark='{0}' and parentid={1}", zdtype, zdid);
                IEnumerable<DataDictionaryType> queryable = db.Database.SqlQuery<DataDictionaryType>(sql);
                list = queryable.ToList();
            }
            return list;
        }


        /// <summary>
        /// 获取类型数据
        /// </summary>
        /// <param name="zdtype"></param>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionaryNameList(string zdtype)
        {
            List<DataDictionaryType> list = new List<DataDictionaryType>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select zd_id ddid, zd_name text ,zd_name name ,remark, parentid from base_zds where zd_type in (select remark from base_zds where zd_type='{0}')", zdtype);
                IEnumerable<DataDictionaryType> queryable = db.Database.SqlQuery<DataDictionaryType>(sql);
                list = queryable.ToList();
            }
            return list;

        }

        public List<DataDictionaryModel> GetDataDictionaryList(List<Filter> filters, int start, int limit)
        {
            List<DataDictionaryModel> list = new List<DataDictionaryModel>();
            using (Entities db = new Entities())
            {
                IQueryable<DataDictionaryModel> queryable = from a in db.base_zds
                                                            where a.status != 1
                                                            select new DataDictionaryModel
                                                            {
                                                                zd_typename = a.zd_typename,
                                                                zd_type = a.zd_type,
                                                                zd_id = a.zd_id,
                                                                zd_name = a.zd_name,
                                                                zd_seq = a.zd_seq,
                                                                status = a.status,
                                                                remark = a.remark,
                                                                parentid = a.parentid,
                                                            };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "type":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.zd_type == value);//||t.remark==value);
                                }
                                break;
                            case "zdid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.parentid == value);//||t.remark==value);
                                }
                                break;
                        };
                    }
                }
                list = queryable.OrderBy(a => a.zd_seq).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        public int GetDataDictionaryCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<DataDictionaryModel> queryable = from a in db.base_zds
                                                            where a.status != 1
                                                            select new DataDictionaryModel
                                                            {
                                                                zd_typename = a.zd_typename,
                                                                zd_type = a.zd_type,
                                                                zd_id = a.zd_id,
                                                                zd_name = a.zd_name,
                                                                zd_seq = a.zd_seq,
                                                                status = a.status,
                                                                remark = a.remark,
                                                                parentid = a.parentid,
                                                            };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "type":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.zd_type == value || t.remark == value);
                                }
                                break;
                            case "zdid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.parentid == value);//||t.remark==value);
                                }
                                break;
                        };
                    }
                }
                return queryable.Count();
            }
        }

        public int AddDataDictionary(DataDictionaryModel model)
        {
            using (Entities db = new Entities())
            {
                base_zds bzmodel = new base_zds();
                string sql = string.Format(@"select * from base_zds where zd_type='{0}' ORDER BY cast(zd_id as SIGNED INTEGER) DESC", model.zd_type);
                IEnumerable<DataDictionaryModel> queryable = db.Database.SqlQuery<DataDictionaryModel>(sql);
                DataDictionaryModel zdmodel = queryable.First();
                bzmodel.zd_id = (int.Parse(zdmodel.zd_id) + 1).ToString();
                bzmodel.zd_typename = zdmodel.zd_typename;
                bzmodel.zd_type = model.zd_type;
                bzmodel.zd_name = model.zd_name;
                bzmodel.zd_seq = model.zd_seq;
                bzmodel.status = 0;
                if (model.zd_type == "type_account" || model.zd_type == "type_accountname" || model.zd_type == "type_yhrw_wtxl")
                {
                    bzmodel.remark = model.remark;
                    bzmodel.parentid = model.parentid;
                }

                db.base_zds.Add(bzmodel);
                return db.SaveChanges();
            }
        }

        public int EditDataDictionary(DataDictionaryModel model)
        {
            using (Entities db = new Entities())
            {
                base_zds bzmodel = db.base_zds.FirstOrDefault(a => a.zd_type == model.zd_type && a.zd_id == model.zd_id);
                if (bzmodel != null)
                {
                    bzmodel.zd_name = model.zd_name;
                    bzmodel.zd_seq = model.zd_seq;
                }
                return db.SaveChanges();
            }
        }

        public int DeleteDataDictionary(string type, string id)
        {
            using (Entities db = new Entities())
            {
                base_zds bzmodel = db.base_zds.FirstOrDefault(a => a.zd_type == type && a.zd_id == id);
                if (bzmodel != null)
                {
                    bzmodel.status = 1;
                }
                return db.SaveChanges();
            }
        }

    }
}
