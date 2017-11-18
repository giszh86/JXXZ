using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
   public class receptionCasesBLL
    {
       private receptionCasesDAL dal = new receptionCasesDAL();

       public List<int> getCaseByStatus()
       {
           return dal.getCaseByStatus();
       }
       public List<int> getCaseBySource()
       {
           return dal.getCaseBySource();
       }
       public List<receptionWtajModel> getCaseNewList()
       {
           return dal.getCaseNewList();
       }

       public string getCaseBytype()
       {
           return dal.getCaseBytype();
       }

       public List<int> GetYbCaseTypeStatistics(int type)
       {
           return dal.GetYbCaseTypeStatistics(type);
       }
       public List<int> GetJyCaseTypeStatistics(int type)
       {
           return dal.GetJyCaseTypeStatistics(type);
       }

       public List<int> GetAysCaseTypeStatistics(int type)
       {
           return dal.GetAysCaseTypeStatistics(type);
       }
       public List<int> GetLasCaseTypeStatistics(int type)
       {
           return dal.GetLasCaseTypeStatistics(type);
       }
       public List<int> GetJasCaseTypeStatistics(int type)
       {
           return dal.GetJasCaseTypeStatistics(type);
       }

    }
}
