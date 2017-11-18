using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_WorkFlowManagerDAL
    {
        /// <summary>
        /// 活动流程
        /// </summary>
        /// <param name="WFID">流程ID</param>
        /// <param name="WFSID">实例编号</param>
        /// <returns></returns>
        public Casr_WorkFlowClass ProcessIndex(string WFID, string WFDID)//, string WFSID, string WFSAID)
        {
            Casr_WorkFlowClass workflow = new Casr_WorkFlowClass();
            List<nextwfdidname> list = new List<nextwfdidname>();
            if (!string.IsNullOrEmpty(WFID))
            {

                IList<case_workflowdetails> wfdList = new Case_WorkFlowDetailsDAL().GetList().Where(a => a.wfid == WFID).ToList();//获取当前流程所有环节
                if (wfdList == null && wfdList.Count() <= 0)
                {
                    workflow.WorkFlowState = 2;
                    return workflow;
                }
                #region 获取下一步流程

                //下一步流程编号集合 格式为：【，流程编号，流程编号，流程编号，】
                string nextWFDIDS = string.Empty;
                case_workflowdetails wfdModel = new Case_WorkFlowDetailsDAL().GetSingle(WFDID);
                if (wfdModel != null)
                    nextWFDIDS = wfdModel.nextid;
                else
                {
                    workflow.WorkFlowState = 2;
                    return workflow;
                }
                workflow.wfdname = wfdModel.wfdname;
                workflow.wfdid = wfdModel.wfdid;
                if (!string.IsNullOrEmpty(nextWFDIDS))
                {
                    #region 下一步的所有流程
                    //下一步流程 格式为：【;流程编号,流程名称,是否有下一个流程;流程编号,流程名称,是否有下一个流程;流程编号,流程名称,是否有下一个流程;】
                    string[] nextWFDIDS_split = nextWFDIDS.Split(',');
                    foreach (string NEXTID in nextWFDIDS_split)
                    {
                        nextwfdidname nextmodel = new nextwfdidname();
                        if (!string.IsNullOrEmpty(NEXTID))
                        {
                            //string temp = "";
                            string WFDNAME = string.Empty;
                            case_workflowdetails wfdMpdel = wfdList.FirstOrDefault(a => a.wfdid == NEXTID);
                            if (wfdMpdel == null || string.IsNullOrEmpty(wfdMpdel.wfdname))
                            {
                                workflow.WorkFlowState = 2;
                                return workflow;
                            }
                            else
                                WFDNAME = wfdMpdel.wfdname;
                            nextmodel.nextid = NEXTID;
                            nextmodel.wfdname = wfdMpdel.wfdname;
                            nextmodel.nextroleid = wfdMpdel.nextroleid;
                            nextmodel.nextunitid = wfdMpdel.nextunitid;
                            list.Add(nextmodel);
                        }
                    }
                    workflow.nextwfdidname = list;//下一步流程 
                    #endregion
                }
                #endregion
            }
            return workflow;
        }


        public string WF_Submit(Case_WorkFlowClass workflow)
        {
            string FunctionName = workflow.FunctionName;//具体表名
            string WFID = workflow.WFID;//工作流编号
            string WFDID = workflow.WFDID;//工作流环节编号
            string WFSID = workflow.WFSID;//活动实例编号
            string WFSAID = workflow.WFSAID;//当前环节实例编号
            string dealContent = workflow.DEALCONTENT;//会签意见
            string NextWFDID = workflow.NextWFDID;//下一个环节编号
            string NextWFUSERIDS = workflow.NextWFUSERIDS;//获取下一个环节的用户
            string IsSendMsg = workflow.IsSendMsg;//是否发送短信
          

            int? casetype = workflow.casetype;//案件类型
            int? casesourceid = workflow.casesourceid;//案件来源
            string casebh = workflow.casebh;//立案编号
            string casereason = workflow.casereason;//案由
            string casetypeid = workflow.casetypeid;//案件类型
            string contact = workflow.contact;//联系人
            string contactphone = workflow.contactphone;//联系电话
            string address = workflow.address;//案发地址
            string cswfsid = workflow.cswfsid;//案源表标识
            string casemode = workflow.casemode;//一般案件状态
            string casestatus = workflow.casestatus;//案件属于类型
            int? caseid = workflow.caseid;
            DateTime? stime = workflow.STIME;
            DateTime? etime = workflow.ETIME;


            #region 检查是否存在当前实例，如果不存在则增加当前活动实例
            case_workflowdetails cwfsmodel =new Case_WorkFlowDetailsDAL().GetSingle(NextWFDID);
            string wfsname = cwfsmodel.wfdname;//活动流程名称
            case_workflowspecifics WFSModel = null;
            if (!string.IsNullOrEmpty(workflow.WFSID))
            {
                WFSModel = new Case_WorkFlowSpecificsDAL().GetSingle(workflow.WFSID);
                if (WFSModel == null)
                    WFSID = "";
                else
                {
                    WFSModel.wfsname = wfsname;
                    new Case_WorkFlowSpecificsDAL().Update(WFSModel);
                }
            }

            if (string.IsNullOrEmpty(WFSID))
            {
                WFSModel = new case_workflowspecifics();
                WFSModel.wfsid = GetNewId();
                WFSModel.wfid = WFID;
                WFSModel.createuserid = workflow.WFCreateUserID;
                WFSModel.createtime = DateTime.Now;
                WFSModel.status = 1;
                WFSModel.wfsname = wfsname;
                WFSModel.currentwfsaid = WFDID;
                WFSModel.filestatus = 1;
                WFSModel.casetype = casetype;
                WFSModel.casebh = casebh;
                WFSModel.casesourceid = casesourceid;
                WFSModel.casereason = casereason;
                WFSModel.casetypeid = casetypeid;
                WFSModel.contact = contact;
                WFSModel.contactphone = contactphone;
                WFSModel.address = address;
                WFSModel.cswfsid = cswfsid;
                WFSModel.casemode = casemode;
                WFSModel.caseid = caseid;
                WFSModel.casestatus = casestatus;
                new Case_WorkFlowSpecificsDAL().Add(WFSModel);
                WFSID = WFSModel.wfsid;
            }
            #endregion
            string wfdname = "当前环节名称";
            decimal oldStatus;//当前环节是否已经处理完成 1：未处理，2已经处理
            //更新或者增加当前流程的具体事例---返回当前环节编号
            WFSAID = function_Case_DealCurentActivity(WFSAID, WFSID, workflow.WFCreateUserID.Value, 2, WFDID, out oldStatus, stime, etime);
            //更新或者增加当前环节用户处理的意见---返回当前环节用户需要处理的编号
            string WFSUID = function_WF_DealCurentActivityUser(WFSAID, workflow.WFCreateUserID.Value, dealContent, 2, DateTime.Now, "false", wfsname, workflow.WFCreateUserID.Value);
            #region 附件处理
            //增加当前处理用户的附件
            //switch (workflow.FunctionName)
            //{
            //    case "case_casesources"://案源管理
            //        function_Case_WorkFlowAttrach_smsj(WFSAID, workflow.WfsasModel);
            //        break;
            //    default:
            //        break;
            //}
            #endregion
           
            //当前状态为处理，则说明是第一个人处理，则需要增加下一个环节，如果当前环节已经处理，则不需要增加下一个环节
            string NextWFSAID = "";
            if (oldStatus == 1)
            {
                //获取该环节是否为最后一个环节
                case_workflowdetails wfdModel = new Case_WorkFlowDetailsDAL().GetSingle(NextWFDID);
                //如果下一个环节的子环节存在，则状态为执行中，内容为空，否则下一个环节状态为结束，内容为已结束
                int status_wfsa = 0;
                string content_wfsa = string.Empty;
                if (wfdModel != null && !string.IsNullOrEmpty(wfdModel.nextid))
                {
                    status_wfsa = 1;
                    content_wfsa = "";
                }
                else
                {
                    wfdname = wfdModel.wfdname;
                    //结束该流程
                    WFSModel = new Case_WorkFlowSpecificsDAL().GetSingle(WFSID);
                    if (WFSModel != null)
                    {
                        WFSModel.status = 2;
                        new Case_WorkFlowSpecificsDAL().Update(WFSModel);
                    }
                    status_wfsa = 2;
                    content_wfsa = "已结束";
                }
                wfdname = wfdModel.wfdname;

                #region 增加下一个环节

                //增加环节
                NextWFSAID = function_Case_DealCurentActivity("", WFSID, workflow.WFCreateUserID.Value, status_wfsa, NextWFDID, out oldStatus, stime, etime);

                #region 更新活动实例的当前环节编号
                WFSModel = new Case_WorkFlowSpecificsDAL().GetSingle(WFSID);
                if (WFSModel != null)
                {
                    WFSModel.currentwfsaid = NextWFSAID;
                    WFSModel.status = status_wfsa;
                    WFSModel.wfsname=wfsname;
                    new Case_WorkFlowSpecificsDAL().Update(WFSModel);
                }
                #endregion

                //增加下一个环节的能操作的用户
                if (!string.IsNullOrEmpty(NextWFUSERIDS))
                {
                    string[] NextWFUSERIDS_split = NextWFUSERIDS.Split(',');
                    foreach (var item in NextWFUSERIDS_split)
                    {
                        decimal userid;
                        DateTime? dealTime = null;
                        if (decimal.TryParse(item, out userid))
                        {
                            if (status_wfsa == 2)
                            {
                                userid = workflow.WFCreateUserID.Value;
                                dealTime = DateTime.Now;
                                IsSendMsg = "false";
                            }
                            //增加流程能操作的用户
                            function_WF_DealCurentActivityUser(NextWFSAID, (int)userid, content_wfsa, status_wfsa, dealTime, IsSendMsg, wfsname, workflow.WFCreateUserID);
                        }
                    }
                }

                #endregion
            }
            return "\"wfsid\":\"" + WFSID + "\",\"wfsaid\":\"" + WFSAID + "\",\"nextwfsaid\":\"" + NextWFSAID + "\",\"wfdid\":\"" + WFDID + "\",\"wfdname\":\"" + wfdname + "\"";
        }


        //法制科科员回复
        public int WF_Reply(Case_WorkFlowClass workflow)
        {
            using(Entities db = new Entities()){

                case_workflowspecificusers model = db.case_workflowspecificusers.FirstOrDefault(t => t.userid == workflow.WFCreateUserID && t.wfsaid == workflow.WFSAID);
                model.content = workflow.DEALCONTENT;
                model.dealtime = DateTime.Now;
                model.status = 2;
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 更新或增加当前流程的具体事例
        /// </summary>
        /// <param name="CurrentWFSAID">环节实例编号</param>
        /// <param name="UserID">当前处理的用户</param>
        /// <param name="STATUS">当前环节状态</param>
        /// <param name="WFDID">环节编号</param>
        /// <param name="oldStatus">返回当前环节是否已经处理完成 1：未处理，2已经处理</param>
        /// <returns>返回当前环节编号</returns>
        public string function_Case_DealCurentActivity(string WFSAID, string WFSID, int UserID, int STATUS, string WFDID, out decimal oldStatus ,DateTime? stime,DateTime? etime)
        {
            oldStatus = 1;
            case_workflowspecificactivitys wfsaModel = new Case_WorkFlowSpecificActivitysDAL().GetSingle(WFSAID);
            #region 处理当前环节
            if (wfsaModel != null)//当前环节，如果存在，则修改状态，和更新处理人
            {
                if (wfsaModel.status != 2)//状态为已经更新，则就不需要更新
                {
                    //更新环节
                    wfsaModel.status = 2;
                    wfsaModel.dealtime = DateTime.Now;
                    wfsaModel.dealuserid = UserID;
                    new Case_WorkFlowSpecificActivitysDAL().Update(wfsaModel);
                }
                else
                {
                    oldStatus = 2;
                }

                WFSAID = wfsaModel.wfsaid;
            }
            else//否则增加状态
            {
                //增加当前环节
                wfsaModel = new case_workflowspecificactivitys();
                wfsaModel.wfsaid = GetNewId();
                wfsaModel.createtime = DateTime.Now;
                wfsaModel.wfsid = WFSID;
                wfsaModel.status = STATUS;
                wfsaModel.dealuserid = UserID;
                wfsaModel.dealtime = DateTime.Now;
                wfsaModel.wfdid = WFDID;
                wfsaModel.stime = stime;
                wfsaModel.etime = etime;
                new Case_WorkFlowSpecificActivitysDAL().Add(wfsaModel);

                WFSAID = wfsaModel.wfsaid;
            }
            #endregion

            return WFSAID;
        }

        /// <summary>
        /// 更新当前环节用户处理的意见
        /// </summary>
        /// <param name="WFSAID">当前环节实例编号</param>
        /// <param name="UserID">处理的人员编号</param>
        /// <param name="CONTENT">处理的意见</param>
        /// <param name="STATUS">当前状态</param>
        /// <param name="STATUS">处理时间</param>
        /// <param name="IsSendMsg">是否发送短信</param>
        /// <param name="OATitle">公文标题</param>
        /// <param name="ISMAINWF">是否主流程</param>
        /// <returns></returns>
        public string function_WF_DealCurentActivityUser(string WFSAID, int UserID, string CONTENT, int STATUS, DateTime? DEALTIME, string IsSendMsg, string OATitle, int? WFCreateUserID)
        {
            Case_WorkFlowSpecificUsersDAL wfsuBLL = new Case_WorkFlowSpecificUsersDAL();
            string WFSUID = string.Empty;
            //更新当前环节登录用户的状态及处理的意见
            case_workflowspecificusers wfsuModel = wfsuBLL.GetList()
                .FirstOrDefault(a => a.wfsaid == WFSAID && a.userid == UserID);
            if (wfsuModel != null)
            {
                wfsuModel.content = CONTENT;
                wfsuModel.dealtime = DEALTIME;
                wfsuModel.status = 2;
                wfsuModel.ismainuser = 1;//是主控人
                wfsuBLL.Update(wfsuModel);
                //返回当前处理人对应的编号
                WFSUID = wfsuModel.wfsuid;
            }
            else
            {
                wfsuModel = new case_workflowspecificusers();
                wfsuModel.wfsuid = GetNewId();
                wfsuModel.userid = UserID;
                wfsuModel.content = CONTENT;
                wfsuModel.dealtime = DEALTIME;
                wfsuModel.status = STATUS;
                wfsuModel.wfsaid = WFSAID;
                wfsuModel.createuserid = WFCreateUserID;
                wfsuModel.createtime = DateTime.Now;
                wfsuBLL.Add(wfsuModel);
                //返回当前处理人对应的编号
                WFSUID = wfsuModel.wfsuid;

            }
            return WFSUID;
        }

        /// <summary>
        /// 增加当前处理用户的附件
        /// </summary>
        /// <param name="WFSUID">当前环节处理用户对应的编号</param>
        public void function_Case_WorkFlowAttrach_smsj(string wfsaid, List<Doc_WfsasModel> WfsasList)
        {
            if (WfsasList != null && WfsasList.Count > 0)
            {
                foreach (Doc_WfsasModel item in WfsasList)
                {
                    doc_wfsas wfsufModel = new doc_wfsas();
                    wfsufModel.wfsaid = wfsaid;
                    wfsufModel.filepath = item.filepath;
                    wfsufModel.filename = item.filename;
                    wfsufModel.dwfsasid = item.dwfsasid;
                    wfsufModel.ddid = item.ddid;
                    wfsufModel.filetyoe = item.filetyoe;
                    wfsufModel.createuserid = item.createuserid;
                    wfsufModel.createtime = item.createtime;
                    wfsufModel.caseid = item.caseid;
                    wfsufModel.lastwordpath = item.lastwordpath;
                    wfsufModel.lastpdfpath = item.lastpdfpath;
                    wfsufModel.lastdwfname = item.lastdwfname;
                    wfsufModel.lastdwfcode = item.lastdwfcode;
                    wfsufModel.ddtablename = item.ddtablename;
                    wfsufModel.ddtableid = item.ddtableid;
                    new Doc_WfsasDAL().Add(wfsufModel);
                    System.Threading.Thread.Sleep(500);
                }
            }
        }

        /// <summary>
        /// 获取的编号
        /// </summary>
        private string GetNewId()
        {
            return DateTime.Now.ToString("yyyyMMddHHmmssfff") + new Random().Next(10000, 99999);
        }
    }
}
