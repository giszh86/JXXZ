using JXXZ.ZHCG.DAL.AccountDAL;
using JXXZ.ZHCG.Model.AccountModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.AccountBLL
{
    public class AccountImageBLL
    {
        private AccountImageDAL dal = new AccountImageDAL();

        /// <summary>
        /// 获取
        /// </summary>
        /// <returns></returns>
        public List<AccountImageModel> GetAccountImage()
        {
            return dal.GetAccountImage();
        }

        /// <summary>
        /// 根据类型选出所有台帐图片列表
        /// </summary>
        /// <returns></returns>
        public List<AccountImageModel> GetAllImageMonthList(int tz_type)
        {
            return dal.GetAllImageMonthList(tz_type);
        }

        /// <summary>
        /// 根据类型和年月筛选图片文件
        /// </summary>
        /// <param name="tz_type"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        public List<AccountImageModel> GetAllImageFileList(int tz_type, string dt)
        {
            return dal.GetAllImageFileList(tz_type, dt);
        }
    }
}
