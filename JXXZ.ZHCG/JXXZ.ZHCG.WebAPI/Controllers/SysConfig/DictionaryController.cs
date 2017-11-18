using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.SysConfig
{
    public class DictionaryController : ApiController
    {
        private Base_ZdsBLL bll = new Base_ZdsBLL();

        // /api/Dictionary/GetZdList?zd_type=case_type_car
        /// <summary>
        /// 根据类型获取字典数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <returns></returns>
        [HttpGet]
        public List<Base_ZdsModel> GetZdList(string zd_type)
        {
            return bll.GetZdList(zd_type);
        }

        // /api/Dictionary/GetZdList?zd_type=case_type_car&zd_id=1
        /// <summary>
        /// 获取子数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <param name="zd_id"></param>
        /// <returns></returns>
        public List<Base_ZdsModel> GetZdChildList(string zd_type, string zd_id)
        {
            return bll.GetZdChildList(zd_type, zd_id);
        }
        #region 根据id返回类型
        /// <summary>
        /// 根据id返回店铺类型
        /// </summary>
        /// <param name="storeid"></param>
        /// <returns></returns>
        [HttpGet]
        public object GetTypeById(int id, string type)
        {
            object obj = bll.GetTypeById(Convert.ToString(id), type);
            return obj;
        }

        /// <summary>
        /// 根据名称和类型获取ID
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <returns>ID</returns>
        public string GetIdByName(string name, string type)
        {
            return bll.GetIdByName(name, type);
        }
        #endregion
    }
}