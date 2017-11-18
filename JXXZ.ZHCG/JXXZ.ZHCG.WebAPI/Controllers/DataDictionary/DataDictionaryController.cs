using JXXZ.ZHCG.BLL.DataDictionaryBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.DataDictionaryModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.DataDictionary
{
    public class DataDictionaryController : ApiController
    {
        private DataDictionaryBLL bll = new DataDictionaryBLL();
        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<DataDictionaryModel>> GetDataDictionaryList(int start, int limit)
        {
            return bll.GetDataDictionaryList(null, start, limit);
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<DataDictionaryModel>> GetDataDictionaryList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            return bll.GetDataDictionaryList(filters, start, limit);
        }

        /// <summary>
        /// 获取类型
        /// </summary>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionaryTypeList()
        {
            return bll.GetDataDictionaryTypeList();
        }

        /// <summary>
        /// 获取类型数据
        /// </summary>
        /// <param name="zdtype"></param>
        /// <returns></returns>
        public List<DataDictionaryType> GetDataDictionaryNameList(string zdtype)
        {
            return bll.GetDataDictionaryNameList(zdtype);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public HttpResponseMessage AddDataDictionary(DataDictionaryModel model)
        {
            bll.AddDataDictionary(model);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditDataDictionary(DataDictionaryModel model)
        {
            bll.EditDataDictionary(model);
            return new HttpResponseMessage(HttpStatusCode.OK);

        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="type"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public int DeleteDataDictionary(string type, string id)
        {
            return bll.DeleteDataDictionary(type, id);
        }

        [HttpGet]
        public List<DataDictionaryType> GetTree()
        {
            return bll.GetTree();
        }
    }
}