using JXXZ.ZHCG.BLL.IllegalConstructionBLL;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.IllegalConstruction
{
    public class WjFileController : ApiController
    {

        private WJ_FilesBLL bll = new WJ_FilesBLL();



        /// <summary>
        /// 获取拆迁违建附件
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type">1违建2拆迁</param>
        /// <returns></returns>
        [HttpGet]
        public List<WJ_FilesModel> GetFileList(int id, int type)
        {
            return bll.GetFileList(id, type);
        }

        /// <summary>
        /// 获取附件
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetFileUpload(int id, int type)
        {
            return bll.GetFileUpload(id, type);
        }
    }
}