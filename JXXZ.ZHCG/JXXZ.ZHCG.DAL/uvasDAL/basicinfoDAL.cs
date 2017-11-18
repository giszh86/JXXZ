using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.uvasModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.uvasDAL
{
    public class basicinfoDAL
    {
        #region 获取无人机基本信息列表
        public Pag<basicinfoModel> GetBaseInfoList(List<Filter> filters, int start, int limit)
        {
            Pag<basicinfoModel> list = new Pag<basicinfoModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from fi_uvas t where t.isdelete=0");
                IEnumerable<basicinfoModel> queryable = db.Database.SqlQuery<basicinfoModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "ovanum":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ovanum.Contains(value));
                                }
                                break;
                            case "ovaname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ovaname.Contains(value));
                                }
                                break;
                        };
                    }
                }
                IOrderedEnumerable<basicinfoModel> temp = queryable.OrderByDescending(a => a.ovaid);
                list = PagHelper.CreatPagList(temp, start, limit);
            }
            return list;
        }
        #endregion

        #region 新增一条无人机基本信息
        public int AddBasicInfo(basicinfoModel model)
        {
            using (Entities db = new Entities())
            {
                fi_uvas uvas_model = new fi_uvas();
                uvas_model.createtime = DateTime.Now;
                uvas_model.createuserid = model.createuserid;
                uvas_model.device = model.device;
                uvas_model.isdelete = 0;
                uvas_model.ovaname = model.ovaname;
                uvas_model.ovanum = model.ovanum;
                uvas_model.unit = model.unit;
                db.fi_uvas.Add(uvas_model);
                return db.SaveChanges();
            }
        }
        #endregion

        #region 删除一条无人机基本信息
        public int DeleteBasicInfo(int ovaid)
        {
            using (Entities db = new Entities())
            {
                fi_uvas uvas_model = db.fi_uvas.FirstOrDefault(a => a.ovaid == ovaid);
                if (uvas_model != null)
                {
                    uvas_model.isdelete = 1;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 编辑无人机基本信息
        public int EditBasicInfo(basicinfoModel model)
        {
            using (Entities db = new Entities())
            {
                fi_uvas uvas = db.fi_uvas.FirstOrDefault(t => t.ovaid == model.ovaid);
                if (uvas != null)
                {
                    uvas.device = model.device;
                    uvas.ovaname = model.ovaname;
                    uvas.unit = model.unit;
                    uvas.ovanum = model.ovanum;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 获取无人机基本信息详情
        public basicinfoModel GetBasicInfo(int ovaid)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from fi_uvas t where t.ovaid={0}",ovaid);
                basicinfoModel model = db.Database.SqlQuery<basicinfoModel>(sql).FirstOrDefault();
                return model;
            }
        }
        #endregion
    }
}
