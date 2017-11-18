using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.ZXZZDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ZXZZBLL
{
    public class ZXZZBLL
    {
        private ZXZZDAL dal = new ZXZZDAL();

        /// <summary>
        /// 根据ID获取模型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public sm_specialrectifications GetClassByID(int id)
        {
            return dal.GetClassByID(id);
        }
    }
}
