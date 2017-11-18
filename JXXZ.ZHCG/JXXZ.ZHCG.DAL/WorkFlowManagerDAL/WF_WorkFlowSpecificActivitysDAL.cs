using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.WorkFlowManagerDAL
{
    public class WF_WorkFlowSpecificActivitysDAL
    {

        /// <summary>
        /// 获取单个流程实例具体环节根据工作流实例环节编号
        /// </summary>
        /// <param name="WFID">工作流实例环节编号</param>
        /// <returns></returns>
        public wf_workflowspecificactivitys GetSingle(string WFSAID)
        {
            Entities db = new Entities();
            wf_workflowspecificactivitys model = db.wf_workflowspecificactivitys
                .SingleOrDefault(a => a.wfsaid == WFSAID);
            return model;
        }

        /// <summary>
        /// 修改单个流程实例具体环节
        /// </summary>
        /// <param name="model"></param>
        public void Update(wf_workflowspecificactivitys model)
        {
            Entities db = new Entities();
            wf_workflowspecificactivitys result = db.wf_workflowspecificactivitys
                .SingleOrDefault(a => a.wfsaid == model.wfsaid);
            if (result != null)
            {
                result.status = model.status;
                result.dealuserid = model.dealuserid;
                result.dealtime = model.dealtime;
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 增加单个流程实例具体环节
        /// </summary>
        /// <param name="model"></param>
        public void Add(wf_workflowspecificactivitys model)
        {
            Entities db = new Entities();
            db.wf_workflowspecificactivitys.Add(model);
            db.SaveChanges();
        }

        /// <summary>
        /// 获取所有流程实例具体环节
        /// </summary>
        /// <returns></returns>
        public List<WF_WorkFlowOldModel> GetOldList(string wfsid)
        {
            Entities db = new Entities();
            List<WF_WorkFlowOldModel> lists = new List<WF_WorkFlowOldModel>();
            IQueryable<wf_workflowspecificactivitys> list = db.wf_workflowspecificactivitys.Where(a => a.wfsid == wfsid && a.status == 2).OrderBy(a => a.createtime);
            foreach (var item in list)
            {
                lists.AddRange(GetOldWorkFlow(item.wfsaid));
            }

            return lists;
        }

        public List<WF_WorkFlowOldModel> GetOldWorkFlow(string wfsaid)
        {
            List<WF_WorkFlowOldModel> list = new List<WF_WorkFlowOldModel>();
            using (Entities db = new Entities())
            {
                IQueryable<WF_WorkFlowOldModel> queryable = from a in db.wf_workflowspecificactivitys
                                                            join b_join in db.wf_workflowspecificusers on a.wfsaid equals b_join.wfsaid into btemp
                                                            from b in btemp.DefaultIfEmpty()
                                                            join c_join in db.base_users on a.dealuserid equals c_join.id into ctemp
                                                            from c in ctemp.DefaultIfEmpty()
                                                            join d_join in db.base_users on b.createuserid equals d_join.id into dtemp
                                                            from d in dtemp.DefaultIfEmpty()
                                                            join e_join in db.wf_workflowdetails on a.wfdid equals e_join.wfdid into etemp
                                                            from e in etemp.DefaultIfEmpty()
                                                            where a.wfsaid == wfsaid && b.ismainuser==1
                                                            select new WF_WorkFlowOldModel
                                                       {
                                                           wfsaid = a.wfsaid,
                                                           wfsid = a.wfsid,
                                                           status = a.status,
                                                           dealuserid = a.dealuserid,
                                                           wfdid = a.wfdid,
                                                           createtime = a.createtime,
                                                           wfsuid = b.wfsuid,
                                                           userid = b.userid,
                                                           content = b.content,
                                                           createuserid = b.createuserid,
                                                           ismainuser = b.ismainuser,
                                                           remark = b.remark,
                                                           processmode = b.processmode,
                                                           satisfaction = b.satisfaction,
                                                           wfdname=e.wfdname,
                                                           dealtime = a.dealtime,
                                                           username=c.displayname,
                                                           createusername=d.displayname
                                                       };


                list = queryable.ToList();
                return list;
            }

        }

        /// <summary>
        /// 获取历史环节人
        /// </summary>
        /// <param name="wfsid"></param>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public WF_WorkFlowLinkOld GetOldLink(string wfsid, string wfdid)
        {
            using (Entities db=new Entities())
            {
                string sql = string.Format(@"select * from (select dealuserid,wfdid from wf_workflowspecificactivitys where wfsid={0} and wfdid={1} and status=2
ORDER BY createtime desc) tab1 GROUP BY tab1.wfdid", wfsid, wfdid);
                IEnumerable<WF_WorkFlowLinkOld> query = db.Database.SqlQuery<WF_WorkFlowLinkOld>(sql);
                WF_WorkFlowLinkOld model = query.FirstOrDefault();
                return model;
            }

        }

        /// <summary>
        /// 获取历史环节人
        /// </summary>
        /// <param name="wfsid"></param>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<WF_WorkFlowLinkOld> GetOldLink(string wfsid)
        {
            List<WF_WorkFlowLinkOld> list = new List<WF_WorkFlowLinkOld>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from (select dealuserid,wfdid from wf_workflowspecificactivitys where wfsid={0} and status=2
ORDER BY createtime desc) tab1 GROUP BY tab1.wfdid", wfsid);
                IEnumerable<WF_WorkFlowLinkOld> query = db.Database.SqlQuery<WF_WorkFlowLinkOld>(sql);
                list = query.ToList();
            }
            return list;
        }

     }
}
