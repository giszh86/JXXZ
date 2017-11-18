using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_PhasesDAL
    {
        /// <summary>
        /// 文书配置文书
        /// </summary>
        /// <returns></returns>
        public List<CaseLinkTreeModel> GetDefinitionClass()
        {
            List<CaseLinkTreeModel> list = new List<CaseLinkTreeModel>();
            using (Entities db = new Entities())
            {
                IQueryable<CaseLinkTreeModel> queryable = from a in db.case_phases
                                                          select new CaseLinkTreeModel
                                                      {
                                                          id = a.phaseid,
                                                          name = a.phasename,
                                                          seq = a.seq,
                                                          wfid=a.wfid,
                                                          text = a.phasename,
                                                          leaf = true,
                                                      };
                list = queryable.ToList();
            }
            return list;
        }

        /// <summary>
        /// 根据ID获取wfid
        /// </summary>
        /// <param name="phaseid"></param>
        /// <returns></returns>
        public string GetCasePhasesById(int phaseid)
        {
            string wfid = "";
            using (Entities db = new Entities())
            {
                case_phases model = db.case_phases.SingleOrDefault(a => a.phaseid == phaseid);
                wfid = model.wfid;
            };
            return wfid;
        }

    }
}
