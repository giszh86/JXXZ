using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
   public class Case_YjdwsDAL
    {
        /// <summary>
        /// 移交单位
        /// </summary>
        /// <returns></returns>
        public List<ClassModel> GetYjdwClass()
        {
            List<ClassModel> list = new List<ClassModel>();
            using (Entities db = new Entities())
            {
                IQueryable<ClassModel> queryable = from a in db.case_yjdws
                                                   select new ClassModel
                                                   {
                                                       id = a.yjdwid,
                                                       name = a.yjdwname,
                                                   };
                list = queryable.ToList();
            }
            return list;
        }
    }
}
