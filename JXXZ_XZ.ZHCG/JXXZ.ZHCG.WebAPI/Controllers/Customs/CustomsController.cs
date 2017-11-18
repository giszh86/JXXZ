using JXXZ.ZHCG.BLL.CustomsBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model.CustomsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Customs
{
    public class CustomsController : ApiController
    {
        private CustomsBLL bll = new CustomsBLL();


        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public map_customs AddCustoms(CustomsModel model)
        {
            return bll.AddCustoms(model);
        }


        /// <summary>
        /// 查询历史
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<CustomsModel> GetCustomList()
        {
            return bll.GetCustomList();
        }


        /// <summary>
        /// 查询详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public CustomsModel GetCustomModel(int id)
        {
            return bll.GetCustomModel(id);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public int DeleteCustomModel(CustomsModel model)
        {
            return bll.DeleteCustomModel(model);
        }
    }
}