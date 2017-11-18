using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CitizenServiceBLL
{
   public class StatisticalReportBLL
   {
       private StatisticalReportDAL dal = new StatisticalReportDAL();
     
       /// <summary>
       /// 统计列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<StatisticalReportModel>> GetEventReport(List<Filter> filters, int start, int limit)
       {
            Paging<List<StatisticalReportModel>> paging = dal.GetEventReport(filters, start, limit);

           return paging;
       }

       public DataTable ClassificationStatistics(int year)
       {
           return dal.ClassificationStatistics(year);
       }

       public List<StatisticalReportModel> GetEventReport(string year, string month, string sourceid)
       {
           List<StatisticalReportModel> list = dal.GetEventReport(year,month, sourceid);

           return list;
       }
    }
}
