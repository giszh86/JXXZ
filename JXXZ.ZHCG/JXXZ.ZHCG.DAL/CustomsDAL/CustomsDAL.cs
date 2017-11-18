using JXXZ.ZHCG.Model.CustomsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CustomsDAL
{
    public class CustomsDAL
    {

        public map_customs AddCustoms(CustomsModel model)
        {
            using (Entities db = new Entities())
            {
                map_customs cmmodel = new map_customs();

                cmmodel.x = model.x;
                cmmodel.y = model.y;
                cmmodel.userid = model.userid;
                cmmodel.remark = model.remark;
                cmmodel.createtime = DateTime.Now;
                db.map_customs.Add(cmmodel);
                db.SaveChanges();
                return cmmodel;
            }
        }

        public List<CustomsModel> GetCustomList()
        {
            List<CustomsModel> list = new List<CustomsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<CustomsModel> queryable = from a in db.map_customs
                                                     select new CustomsModel
                                                     {
                                                         id = a.id,
                                                         x = a.x,
                                                         y = a.y,
                                                         userid = a.userid,
                                                         remark = a.remark,
                                                         createtime = a.createtime,
                                                     };
                list = queryable.ToList();
            }
            return list;
        }

        public CustomsModel GetCustomModel(int id)
        {
            CustomsModel model = new CustomsModel();
            using (Entities db = new Entities())
            {
                IQueryable<CustomsModel> queryable = from a in db.map_customs
                                                     select new CustomsModel
                                                     {
                                                         id = a.id,
                                                         x = a.x,
                                                         y = a.y,
                                                         userid = a.userid,
                                                         remark = a.remark,
                                                         createtime = a.createtime,
                                                     };
                model = queryable.FirstOrDefault(a => a.id == id);
            }
            return model;
        }


        public int DeleteCustomModel(CustomsModel model)
        {
            using (Entities db = new Entities())
            {
                map_customs entity = db.map_customs.FirstOrDefault(a => a.id == model.id);
                if (model != null)
                {
                    db.map_customs.Remove(entity);
                }
                return db.SaveChanges();
            }

        }
    }
}
