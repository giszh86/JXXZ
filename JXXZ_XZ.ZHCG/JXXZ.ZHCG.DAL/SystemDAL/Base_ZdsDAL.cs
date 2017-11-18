using JXXZ.ZHCG.Model;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.SystemDAL
{
    public class Base_ZdsDAL
    {

        /// <summary>
        /// 根据类型获取字典数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <returns></returns>
        public List<Base_ZdsModel> GetZdList(string zd_type)
        {
            List<Base_ZdsModel> list = new List<Base_ZdsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Base_ZdsModel> queryable = from a in db.base_zds
                                                      where a.zd_type == zd_type && a.status == 0
                                                      select new Base_ZdsModel
                                                      {
                                                          zd_type = a.zd_type,
                                                          zd_id = a.zd_id,
                                                          zd_name = a.zd_name,
                                                          zd_seq = a.zd_seq,
                                                          remark = a.remark,
                                                          parentid = a.parentid,

                                                      };
                list = queryable.OrderBy(a => a.zd_seq).ToList();
            }
            return list;
        }


        /// <summary>
        /// 获取子数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <param name="zd_id"></param>
        /// <returns></returns>
        public List<Base_ZdsModel> GetZdChildList(string zd_type, string zd_id)
        {
            List<Base_ZdsModel> list = new List<Base_ZdsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Base_ZdsModel> queryable = from a in db.base_zds
                                                      where a.remark == zd_type && a.parentid == zd_id && a.status == 0
                                                      select new Base_ZdsModel
                                                     {
                                                         zd_typename = a.zd_typename,
                                                         zd_type = a.zd_type,
                                                         zd_id = a.zd_id,
                                                         zd_name = a.zd_name,
                                                         zd_seq = a.zd_seq,
                                                         status = a.status,
                                                         remark = a.remark,
                                                         parentid = a.parentid
                                                     };
                list = queryable.OrderBy(a => a.zd_seq).ToList();
            }
            return list;

        }
        #region 根据类型获取ID
        public Hashtable GetTypeById(string id, string type)
        {
            Hashtable ht = new Hashtable();
            using (Entities db = new Entities())
            {
                base_zds model = db.base_zds.FirstOrDefault(a => a.zd_type == type && a.zd_id == id);
                if (model != null)
                {
                    ht.Add(id, model.zd_name);
                }
            }
            return ht;
        }

        /// <summary>
        /// 根据名称和类型获取ID
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <returns>ID</returns>
        public string GetIdByName(string name, string type)
        {

            using (Entities db = new Entities())
            {
                base_zds model = db.base_zds.FirstOrDefault(a => a.zd_type == type && a.zd_name == name);
                if (model != null)
                {
                    return model.zd_id;
                }
                else
                {
                    return "";
                }
            }
        }

        #endregion
    }
}
