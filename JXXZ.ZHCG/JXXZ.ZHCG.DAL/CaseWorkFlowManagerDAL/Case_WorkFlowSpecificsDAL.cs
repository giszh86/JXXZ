using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
   public class Case_WorkFlowSpecificsDAL
    {

        /// <summary>
        /// 获取单个流程实例根据工作流编号
        /// </summary>
        /// <param name="WFID">工作流编号</param>
        /// <returns></returns>
       public case_workflowspecifics GetSingle(string WFSID)
        {
            Entities db = new Entities();
            case_workflowspecifics model = db.case_workflowspecifics.SingleOrDefault(a => a.wfsid == WFSID);
            return model;
        }

         /// <summary>
        /// 更新活动实例
        /// </summary>
        /// <param name="model"></param>
       public void Update(case_workflowspecifics model)
       {
           Entities db = new Entities();
           case_workflowspecifics result = db.case_workflowspecifics.SingleOrDefault(a => a.wfsid == model.wfsid);
           if (result != null)
           {

               result.wfid = model.wfid;
               result.createuserid = model.createuserid;
               result.createtime = model.createtime;
               result.wfsname = model.wfsname;
               result.currentwfsaid = model.currentwfsaid;
               result.filestatus = model.filestatus;
               result.casetype = model.casetype;
               result.casesourceid = model.casesourceid;
               result.casereason = model.casereason;
               result.casemode = model.casemode;
               result.contact = model.contact;
               result.contactphone = model.contactphone;
               result.address = model.address;

               db.SaveChanges();
           }
       }
       /// <summary>
       /// 增加活动实例
       /// </summary>
       /// <param name="model"></param>
       public void Add(case_workflowspecifics model)
       {
           Entities db = new Entities();
           db.case_workflowspecifics.Add(model);
           db.SaveChanges();
       }
    }
}
