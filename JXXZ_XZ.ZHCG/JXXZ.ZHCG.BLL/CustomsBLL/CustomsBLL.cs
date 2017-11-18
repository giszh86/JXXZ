using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.CustomsDAL;
using JXXZ.ZHCG.Model.CustomsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CustomsBLL
{
   public class CustomsBLL
    {
       private CustomsDAL dal=new CustomsDAL();
       public map_customs AddCustoms(CustomsModel model)
       {
           return dal.AddCustoms(model);
       }


       public List<CustomsModel> GetCustomList() {
           return dal.GetCustomList();
       }

       public CustomsModel GetCustomModel(int id) {
           return dal.GetCustomModel(id);
       }

       public int DeleteCustomModel(CustomsModel model)
       {
           return dal.DeleteCustomModel(model);
       }
    }
}
