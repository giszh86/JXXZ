using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.WorkFlowManagerDAL
{
   public class WF_WorkFlowSpecificDAL
    {
        /// <summary>
        /// 获取主要内容
        /// </summary>
        /// <param name="WFSID">活动流程实例编号</param>
        /// <returns></returns>
        public string GetContentPath(string WFSID)
        {
            string contentPath = string.Empty;
            Entities db = new Entities();
            wf_workflowspecifics model = db.wf_workflowspecifics.SingleOrDefault(a => a.wfsid == WFSID);
            if (model != null)
            {
                string sql = "";
                if (model.tablename == "sm_citizenservices")
                {
                    sql = "select REMARK1 from " + model.tablename + " where citizenid='" + model.tablenameid + "'";
                }
                //else if (model.tablename == "XTGL_ZFSJS")
                //{
                //    sql = "select REMARK1 from " + model.tablename + " where ZFSJID='" + model.tablenameid + "'";
                //}
                //else if (model.tablename == "GCGL_SIMPLES")
                //{
                //    sql = "select REMARK1 from " + model.tablename + " where SIMPLEGCID='" + model.tablenameid + "'";
                //}

                IEnumerable<string> list = db.Database.SqlQuery<string>(sql).ToList();
                if (list != null && list.Count() > 0)
                {
                    contentPath = list.ToList()[0];
                }
            }
            return contentPath;
        }


        /// <summary>
        /// 获取单个流程实例根据工作流编号
        /// </summary>
        /// <param name="WFID">工作流编号</param>
        /// <returns></returns>
        public wf_workflowspecifics GetSingle(string WFSID)
        {
            Entities db = new Entities();
            wf_workflowspecifics model = db.wf_workflowspecifics.SingleOrDefault(a => a.wfsid == WFSID);
            return model;
        }

        /// <summary>
        /// 更新活动实例
        /// </summary>
        /// <param name="model"></param>
        public void Update(wf_workflowspecifics model)
        {
            Entities db = new Entities();
            wf_workflowspecifics result = db.wf_workflowspecifics.SingleOrDefault(a => a.wfsid == model.wfsid);
            if (result != null)
            {
                result.status = model.status;
                result.wfsname = model.wfsname;
                result.currentwfsaid = model.currentwfsaid;
                result.filestatus = model.filestatus;
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 增加活动实例
        /// </summary>
        /// <param name="model"></param>
        public void Add(wf_workflowspecifics model)
        {
            Entities db = new Entities();
            db.wf_workflowspecifics.Add(model);
            db.SaveChanges();
        }
    }
}
