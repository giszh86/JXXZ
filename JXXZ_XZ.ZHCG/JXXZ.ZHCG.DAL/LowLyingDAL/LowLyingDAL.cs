using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.LowLyingModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.LowLyingDAL
{
    public class LowLyingDAL
    {
        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<LowLyingModel> GetLowLyinglist(List<Filter> filters, int start, int limit)
        {
            List<LowLyingModel> list = new List<LowLyingModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select lo.id,lo.jkdmc,lo.zt,lo.whdw,lo.whry,lo.bjljz,lo.dz,count(ln.lowid) as lsbjsl from low_oldlying lo 
left JOIN low_newlying ln  on lo.id=ln.lowid and  ln.sfbj=1
GROUP BY ln.lowid");
                IEnumerable<LowLyingModel> querybale = db.Database.SqlQuery<LowLyingModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    { }
                }
                list = querybale.OrderBy(t => t.id).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetLowLyingCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select lo.id,lo.jkdmc,lo.zt,lo.whdw,lo.whry,lo.bjljz,lo.dz,count(ln.lowid) as lsbjsl from low_oldlying lo 
left JOIN low_newlying ln  on lo.id=ln.lowid and  ln.sfbj=1
GROUP BY ln.lowid");
                IEnumerable<LowLyingModel> querybale = db.Database.SqlQuery<LowLyingModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    { }
                }
                return querybale.Count();
            }
        }

        /// <summary>
        /// 根据ID查看详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public LowLyingModel GetLowLyingModel(int id)
        {
            LowLyingModel model = new LowLyingModel();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select lo.id,lo.jkdmc,lo.zt,lo.whdw,lo.whry,lo.bjljz,lo.dz,count(ln.lowid) as lsbjsl from low_oldlying lo 
left JOIN low_newlying ln  on lo.id=ln.lowid and  ln.sfbj=1
GROUP BY ln.lowid");
                IEnumerable<LowLyingModel> querybale = db.Database.SqlQuery<LowLyingModel>(sql);
                model = querybale.FirstOrDefault(a => a.id == id);
            }
            return model;
        }

        /// <summary>
        /// 历史报警数据列表
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<LowLyingOldModel> GetLowLyingCaveatList(int id, int start, int limit)
        {
            List<LowLyingOldModel> list = new List<LowLyingOldModel>();


            DateTime dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/01/01"));
            DateTime dt2 = dt1.AddYears(1);

            using (Entities db = new Entities())
            {
                IQueryable<LowLyingOldModel> queryable = from a in db.low_newlying
                                                         where a.lowid == id && a.sfbj == 1 && a.cjsj >= dt1 && a.cjsj < dt2 
                                                         select new LowLyingOldModel
                                                         {
                                                             id = a.id,
                                                             lowid = a.lowid,
                                                             bjz = a.bjz,
                                                             bjljz = a.bjljz,
                                                             sfbj = a.sfbj,
                                                             cjsj = a.cjsj,
                                                             clqk = a.clqk,
                                                         };
                list = queryable.OrderByDescending(a => a.cjsj).Skip(start).Take(limit).ToList();

            }
            return list;

        }

        /// <summary>
        /// 历史报警数量
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int GetLowLyingCaveatCount(int id)
        {
            using (Entities db = new Entities())
            {
                IQueryable<LowLyingOldModel> queryable = from a in db.low_newlying
                                                         where a.lowid == id && a.sfbj == 1
                                                         select new LowLyingOldModel
                                                         {
                                                             id = a.id,
                                                             lowid = a.lowid,
                                                             bjz = a.bjz,
                                                             bjljz = a.bjljz,
                                                             sfbj = a.sfbj,
                                                             cjsj = a.cjsj,
                                                             clqk = a.clqk,
                                                         };
                return queryable.Count();

            }

        }

        /// <summary>
        /// 修改报警临界值
        /// </summary>
        /// <param name="id"></param>
        /// <param name="bjljz"></param>
        /// <returns></returns>
        public int EditLowLying(int id, string bjljz)
        {
            using (Entities db = new Entities())
            {
                low_oldlying model = db.low_oldlying.FirstOrDefault(a => a.id == id);
                if (model != null)
                {
                    model.bjljz = bjljz;
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 获取根节点
        /// </summary>
        /// <returns></returns>
        public List<glxxModel> GetGlxxList()
        {
            List<glxxModel> list = new List<glxxModel>();
            using (SqlEntities db = new SqlEntities())
            {
                string sql = string.Format(@"select ID AS id,[级别ID] as levelid ,[名称] as name, [上级ID] as parentid, [级别描述] as description from [管理信息] where [上级ID] =0");
                IEnumerable<glxxModel> queryable = db.Database.SqlQuery<glxxModel>(sql);
                list= queryable.ToList();
            }
            return list;
        }

        /// <summary>
        /// 获取子节点
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<glxxModel> getGlxxChildren(int id)
        {
            List<glxxModel> list = new List<glxxModel>();
            using (SqlEntities db = new SqlEntities())
            {
                string sql = string.Format(@"select ID AS id,[级别ID] as levelid ,[名称] as name, [上级ID] as parentid, [级别描述] as description from [管理信息] where [上级ID] ={0}", id);
                IEnumerable<glxxModel> queryable = db.Database.SqlQuery<glxxModel>(sql);
                list= queryable.ToList();
            }
            return list;
        }
        /// <summary>
        /// 获取设备信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<sbxxModel> getSbxxList(int id)
        {
            List<sbxxModel> list = new List<sbxxModel>();
            using (SqlEntities db = new SqlEntities())
            {
                string sql = string.Format(@"select ID id,[名称] name , [用户站类型] usertype , [用户站参数] userparameter ,[管理ID] managementid,[通讯设备ID] communicationid,[传输设备ID] transmission,[数据采集方式] collectionmethod,
 [是否启用] isenabled,[衍生相关量] relatedquantity,[显示量] displayvolume from [设备信息] where [管理ID] ={0}", id);
                IEnumerable<sbxxModel> queryable = db.Database.SqlQuery<sbxxModel>(sql);
                list= queryable.ToList();
            }
            return list;

        }
        /// <summary>
        /// 获取水位信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public lsjlModel getOldRecordingList(int id)
        {
            string year = DateTime.Now.Year.ToString();
            string oldid = id.ToString().PadLeft(6, '0');
            string bm = "历史记录_" + oldid + "_" + year;
            using (SqlEntities db = new SqlEntities())
            {
                string sql = string.Format(@"select [记录时间] recordingtime, [上报水位] waterlevel from [{0}] ORDER BY [记录时间] desc", bm);
                lsjlModel model = db.Database.SqlQuery<lsjlModel>(sql).FirstOrDefault();

                return model;
            }
        }


        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void Add(LowLyingModel model) {
            using (Entities db=new Entities())
            {
                low_oldlying lmodel = new low_oldlying();

                lmodel.id = model.id;
                lmodel.jkdmc = model.jkdmc;
                lmodel.zt = model.zt;
                lmodel.whdw = model.whdw;
                lmodel.whry = model.whry;
                lmodel.bjljz = model.bjljz;
                lmodel.dz = model.dz;
                db.low_oldlying.Add(lmodel);
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="model"></param>
        public void Edit(LowLyingModel model)
        {
            using (Entities db = new Entities())
            {
                low_oldlying lmodel = db.low_oldlying.FirstOrDefault(a=>a.id ==model.id);

                lmodel.id = model.id;
                lmodel.jkdmc = model.jkdmc;
                lmodel.zt = model.zt;
                lmodel.whdw = model.whdw;
                lmodel.whry = model.whry;
                lmodel.dz = model.dz;
                db.SaveChanges();
            }
        }

        public void AddPolice(LowLyingOldModel model) {
            using (Entities db=new Entities())
            {
                low_newlying ln = new low_newlying();
                ln.lowid = model.lowid;
                ln.bjz = model.bjz;
                ln.bjljz = model.bjljz;
                ln.sfbj = model.sfbj;
                ln.cjsj = model.cjsj;
                ln.clqk = model.clqk;
                db.low_newlying.Add(ln);
                db.SaveChanges();
            }
        
        }


        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<LowLyingModel> GetApiLowLyinglist(List<Filter> filters, int start, int limit)
        {
            List<LowLyingModel> list = new List<LowLyingModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select lo.id,lo.jkdmc,lo.zt,lo.whdw,lo.whry,lo.bjljz,lo.dz,ln.sfbj from low_oldlying lo RIGHT JOIN low_newlying ln  on lo.id=ln.lowid ORDER BY ln.cjsj DESC) tab1 GROUP BY tab1.id");
                IEnumerable<LowLyingModel> querybale = db.Database.SqlQuery<LowLyingModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    { }
                }
                list = querybale.OrderBy(t => t.id).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetApiLowLyingCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select lo.id,lo.jkdmc,lo.zt,lo.whdw,lo.whry,lo.bjljz,lo.dz,ln.sfbj from low_oldlying lo RIGHT JOIN low_newlying ln  on lo.id=ln.lowid ORDER BY ln.cjsj DESC) tab1 GROUP BY tab1.id");
                IEnumerable<LowLyingModel> querybale = db.Database.SqlQuery<LowLyingModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    { }
                }
                return querybale.Count();
            }
        }


    }
}
