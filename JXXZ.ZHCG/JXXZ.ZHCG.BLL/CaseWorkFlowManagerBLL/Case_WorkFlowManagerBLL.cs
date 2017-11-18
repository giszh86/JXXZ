using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
    public class Case_WorkFlowManagerBLL
    {
        private Case_WorkFlowManagerDAL dal = new Case_WorkFlowManagerDAL();
        public string WF_Submit(Case_WorkFlowClass workflow)
        {
            return dal.WF_Submit(workflow);
        }

        public Casr_WorkFlowClass ProcessIndex(string WFID, string WFDID)
        {
            return dal.ProcessIndex(WFID, WFDID);
        }

        //法制科科员回复
        public int WF_Reply(Case_WorkFlowClass workflow)
        {
            return dal.WF_Reply(workflow);
        }
    }
}
