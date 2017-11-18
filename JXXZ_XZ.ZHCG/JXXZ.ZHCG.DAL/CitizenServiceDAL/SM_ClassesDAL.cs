using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CitizenServiceDAL
{
   public class SM_ClassesDAL
    {
        /// <summary>
        /// 市民服务大小类
        /// </summary>
        /// <returns></returns>
        public List<SM_ClassesModel> GetClassTypes(int? parentid)
        {
            List<SM_ClassesModel> list = new List<SM_ClassesModel>();

            using (Entities db = new Entities())
            {
                IQueryable<SM_ClassesModel> queryable = from classes in db.sm_classes
                                                     select new SM_ClassesModel
                                                  {
                                                      ID = classes.classid,
                                                      Name = classes.classname,
                                                      parentid=classes.parentid
                                                  };
                if (parentid==null)
                {
                   queryable= queryable.Where(a=>a.parentid==null);
                }
                else
                {
                  queryable=  queryable.Where(a => a.parentid == parentid);
                }
                list = queryable.ToList();
            }

            return list;
        }

    }
}
