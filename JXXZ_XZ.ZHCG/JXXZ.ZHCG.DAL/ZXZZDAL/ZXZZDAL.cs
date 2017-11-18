using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ZXZZDAL
{
    public class ZXZZDAL
    {
        /// <summary>
        /// 根据ID获取模型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public  sm_specialrectifications GetClassByID(int id)
        {
            using (Entities db = new Entities())
            {
                sm_specialrectifications model = db.sm_specialrectifications.Where(t => t.srid == id).FirstOrDefault();
                return model;
            }
        }
    }
}
