using JXXZ.ZHCG.DAL.receptionFirstPage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.receptionFirstPage
{
    public class receptionFirstPageBLL
    {
        receptionFirstPageDAL dal = new receptionFirstPageDAL();

        public List<int> getCase()
        {
            return dal.getCase();
        }

        public List<int> GetEvent()
        {
            return dal.GetEvent();
        }

        public List<int> GetEventChart()
        {
            return dal.GetEventChart();
        }

        public List<int> getProgress()
        {
            return dal.getProgress();
        }
    }
}
