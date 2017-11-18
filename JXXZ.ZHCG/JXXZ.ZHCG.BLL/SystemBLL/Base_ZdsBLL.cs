using JXXZ.ZHCG.DAL.SystemDAL;
using JXXZ.ZHCG.Model;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.SystemBLL
{
   public class Base_ZdsBLL
    {
       private Base_ZdsDAL dal=new Base_ZdsDAL();

        /// <summary>
        /// 根据类型获取字典数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <returns></returns>
       public List<Base_ZdsModel> GetZdList(string zd_type)
       {
           return dal.GetZdList(zd_type);
       }

        /// <summary>
        /// 获取子数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <param name="zd_id"></param>
        /// <returns></returns>
       public List<Base_ZdsModel> GetZdChildList(string zd_type, string zd_id)
       {
           return dal.GetZdChildList(zd_type, zd_id);
       }

       #region  根据id获取typeName
       /// <summary>
       /// 根据id获取typeName
       /// </summary>
       /// <param name="id"></param>
       /// <param name="type"></param>
       /// <returns></returns>
       public Hashtable GetTypeById(string id, string type)
       {
           return dal.GetTypeById(id, type);
       }


       /// <summary>
       /// 根据名称和类型获取ID
       /// </summary>
       /// <param name="name">名称</param>
       /// <param name="type">类型</param>
       /// <returns>ID</returns>
       public string GetIdByName(string name, string type)
       {

           return dal.GetIdByName(name, type);
       }
       #endregion
    }
}
 