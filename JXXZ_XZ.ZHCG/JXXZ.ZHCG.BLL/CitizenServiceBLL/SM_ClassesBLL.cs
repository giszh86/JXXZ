using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CitizenServiceBLL
{
    public class SM_ClassesBLL
    {
        private SM_ClassesDAL dal = new SM_ClassesDAL();

        /// <summary>
        /// 市民服务大小类
        /// </summary>
        /// <returns></returns>
        public List<SM_ClassesModel> GetClassTypes(int? parentid)
        {
            return dal.GetClassTypes(parentid);
        }
    }
}
