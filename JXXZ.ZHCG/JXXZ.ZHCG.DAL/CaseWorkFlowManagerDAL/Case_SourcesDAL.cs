using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_SourcesDAL
    {
        /// <summary>
        /// 获取来源
        /// </summary>
        /// <returns></returns>
        public List<ClassModel> GetSourcesClass()
        {
            List<ClassModel> list = new List<ClassModel>();
            using (Entities db = new Entities())
            {
                IQueryable<ClassModel> queryable = from a in db.case_sources
                                                   select new ClassModel
                                                   {
                                                       id = a.sourceid,
                                                       name = a.sourcename,
                                                   };
                list = queryable.ToList();
            }
            return list;
        }

        /// <summary>
        /// 根据ID获取来源名称
        /// </summary>
        /// <returns></returns>
        public string GetSourcesNameByID(int? sourceid)
        {
            Entities db = new Entities();     
            return db.case_sources.FirstOrDefault(a=>a.sourceid == sourceid).sourcename;
        }

    }
}
