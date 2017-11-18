using JXXZ.ZHCG.BLL.AccountBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AccountModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Account
{
    public class ImageController : ApiController
    {
        private AccountImageBLL bll = new AccountImageBLL();

        /// <summary>
        /// 获取所有台帐任务列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public List<AccountImageModel> GetAllImageList()
        {
            return bll.GetAccountImage();
        }

        /// <summary>
        /// 根据类型选出所有台帐图片列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<AccountImageModel> GetAllImageMonthList(int tz_type)
        {
            return bll.GetAllImageMonthList(tz_type);
        }

        /// <summary>
        /// 根据类型和年月筛选图片文件
        /// </summary>
        /// <param name="tz_type"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        [HttpGet]
        public List<AccountImageModel> GetAllImageFileList(int tz_type, string dt)
        {
            return bll.GetAllImageFileList(tz_type, dt);
        }
    }
}