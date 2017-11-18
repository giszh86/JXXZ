using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.WorkFlowManagerDAL
{
   public class WF_WorkFlowSpecificUsersFilesDAL
    {
        /// <summary>
        /// 增加单个流程文件
        /// </summary>
        /// <param name="model"></param>
        public void Add(wf_workflowspecificuserfiles model)
        {
            Entities db = new Entities();
            db.wf_workflowspecificuserfiles.Add(model);
            db.SaveChanges();

        }

    }
}
