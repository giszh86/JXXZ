using JXXZ.ZHCG.DAL.WorkFlowManagerDAL;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.WorkFlowManagerBLL
{
   public class WorkFlowManagerBLL
    {

       private WorkFlowManagerDAL dal = new WorkFlowManagerDAL();

       /// <summary>
       /// 活动流程
       /// </summary>
       /// <param name="WFID">流程ID</param>
       /// <param name="WFSID">实例编号</param>
       /// <returns></returns>
       public WorkFlowClass ProcessIndex(string WFID, string WFDID, string WFSID, string WFSAID, string TYPE)
       {
           return dal.ProcessIndex(WFID, WFDID, WFSID, WFSAID);
       }

       /// <summary>
       /// 流程提交
       /// </summary>
       /// <param name="workflow">流程实例模型</param>
       /// <param name="TableModel">具体表模型</param>
       /// <returns></returns>
       public string WF_Submit(WorkFlowClass workflow, object TableModel)
       {
           return dal.WF_Submit(workflow, TableModel);
       }

       /// <summary>
       /// 环节名称
       /// </summary>
       /// <returns></returns>
       public List<SelectListItemModel> GetSelectListItem( string wfid)
       {
           WF_WorkFlowDetailDAL wddal = new WF_WorkFlowDetailDAL();
           return wddal.GetSelectListItem(wfid);
       }


       public WF_WorkFlowLinkOld GetOldLink(string wfsid, string wfdid)
       {
           WF_WorkFlowSpecificActivitysDAL wfsadal = new WF_WorkFlowSpecificActivitysDAL();
           return wfsadal.GetOldLink(wfsid, wfdid);
       }

       /// <summary>
       /// 删除流程里的图片
       /// </summary>
       /// <returns></returns>
       public bool DeleteWorkFlowPictures(string tablename, string wordname, int id)
       {
           return dal.DeleteWorkFlowPictures(tablename,wordname,id);
       }
    }
}
