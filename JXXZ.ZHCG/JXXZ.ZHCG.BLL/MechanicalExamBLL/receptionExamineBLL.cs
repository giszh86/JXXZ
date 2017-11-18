using JXXZ.ZHCG.DAL.MechanicalExamDAL;
using JXXZ.ZHCG.DAL.MechanicalExaminationDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.MechanicalExamBLL
{
   public class receptionExamineBLL
    {
       private receptionExamineDAL dal = new receptionExamineDAL();
       public List<int> GetExamine(int yf)
       {
           return dal.GetExamine(yf);
       }

       public string GetExamineList() {
           return dal.GetExamineList();
       }
       public string GetExamineZjbf()
       {
           return dal.GetExamineZjbf();
       }
    }
}
