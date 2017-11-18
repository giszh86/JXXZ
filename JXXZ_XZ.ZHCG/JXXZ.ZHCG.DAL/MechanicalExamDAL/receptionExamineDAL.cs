using JXXZ.ZHCG.DAL.MechanicalExaminationDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace JXXZ.ZHCG.DAL.MechanicalExamDAL
{
   public  class receptionExamineDAL
    {
       public List<int> GetExamine(int yf)
       {
           List<int> list = new List<int>();
           DateTime time = Convert.ToDateTime(DateTime.Now.ToString("yyyy-"+yf+"-01")); ;
           DateTime dt1 = Convert.ToDateTime(time.ToString("yyyy-MM-01"));
           DateTime dt2 = Convert.ToDateTime(time.AddMonths(1).ToString("yyyy-MM-01"));
           using (Entities db=new Entities())
           {
               IQueryable<kh_examines> queryable = db.kh_examines.Where(a => a.examinedate >= dt1 && a.examinedate < dt2);

               int jsfyskh = queryable.Where(t => t.score >= 90).Count();
               list.Add(jsfyskh);
               int lsfyskh = queryable.Where(t => t.score < 90 && t.score>=60).Count();
               list.Add(lsfyskh);
               int lsfyxkh = queryable.Where(t => t.score < 60).Count();
               list.Add(lsfyxkh);
               int zs = jsfyskh + lsfyskh + lsfyxkh;
               list.Add(zs);
           }
           return list;
       }

       public string GetExamineList()
       {
           List<EcamineCount> list = new List<EcamineCount>();
           DateTime time = DateTime.Now;
           List<string> namelist = new List<string>();
           List<int> valuelist = new List<int>();
           using (Entities db=new Entities())
           {
               string sql = string.Format(@"select yc.contractname as name,count(yyt.yhtaskid) as value from yh_yhtasks yyt 
RIGHT JOIN yh_contracts yc on yyt.yhcontract =yc.contractid 
where yc.contactendtime>=str_to_date('{0}','%Y/%m/%d %H:%i:%s')
 group by yc.contractid ", time);
               IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
               queryable = queryable.Skip(0).Take(5);
               foreach (var item in queryable)
               {
                   namelist.Add(item.name);
                   valuelist.Add(item.value);
               }
               string str = JsonConvert.SerializeObject(namelist).ToString() + "|" + JsonConvert.SerializeObject(valuelist).ToString();
               return str;
           }
          
       }

       public string GetExamineZjbf()
       {
           List<int> list = new List<int>();
           List<string> namelist = new List<string>();
           List<int> valuelist = new List<int>();
           int value = 0;
           using (Entities db = new Entities())
           {
               string sql = string.Format(@"select bz.zd_name as name, count(a.wtsource) as value from yh_yhtasks a 
RIGHT JOIN base_zds bz on a.wtsource = bz.zd_id 
where bz.zd_type='type_yhrw_wtly'
GROUP BY bz.zd_id ");
               IEnumerable<EcamineCount> queryable = db.Database.SqlQuery<EcamineCount>(sql);
               queryable = queryable.OrderByDescending(a=>a.value).Skip(0).Take(3);
               foreach (var item in queryable)
               {
                   value = value + item.value;
                   namelist.Add(item.name);
                   valuelist.Add(item.value);
               }
               valuelist.Add(value);
               string str = JsonConvert.SerializeObject(namelist).ToString() + "|" + JsonConvert.SerializeObject(valuelist).ToString();
               return str;
               //int ybje = 56;
               //list.Add(ybje);
               //int bfje =64;
               //list.Add(bfje);
               //int zjbf = 77;
               //list.Add(zjbf);
               //int zs = ybje + bfje + zjbf;
               //list.Add(zs);
           }
       }


    }
}
