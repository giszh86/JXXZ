
using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.DAL.ConservationDAL;
using JXXZ.ZHCG.DAL.LawEnforcementSupervisionDAL;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.WorkFlowManagerDAL
{
    public class WorkFlowManagerDAL
    {
        /// <summary>
        /// 活动流程
        /// </summary>
        /// <param name="WFID">流程ID</param>
        /// <param name="WFSID">实例编号</param>
        /// <returns></returns>
        public WorkFlowClass ProcessIndex(string WFID, string WFDID, string WFSID, string WFSAID)
        {
            WorkFlowClass workflow = new WorkFlowClass();
            if (!string.IsNullOrEmpty(WFID))
            {
                wf_workflows wfModel = new WF_WorkFlowsDAL().GetSingle(WFID);
                if (wfModel != null)
                {
                    workflow.currentActivityName = wfModel.wfname;
                    //跳转的方法
                    workflow.FunctionName = wfModel.tablename;
                    workflow.WFID = WFID;
                    workflow.WFDID = WFDID;
                    workflow.WFSID = WFSID;
                    workflow.WFSAID = WFSAID;
                    workflow.GetTableColumns = new WF_WorkFlowsDAL().GetTableColumns(wfModel.tablename);
                }
                else
                {
                    workflow.WorkFlowState = 1;//表示该流程不存在
                }


                IList<wf_workflowdetails> wfdList = new WF_WorkFlowDetailDAL()
                    .GetList().Where(a => a.wfid == WFID).ToList();//获取当前流程所有环节
                if (wfdList == null && wfdList.Count() <= 0)
                {
                    workflow.WorkFlowState = 2;
                    return workflow;
                }
                ////获取主要内容
                //if (!string.IsNullOrEmpty(WFSID))
                //{
                //    workflow.contentPath = new WF_WorkFlowSpecificDAL().GetContentPath(WFSID);
                //}

                #region 获取下一步流程

                //下一步流程编号集合 格式为：【，流程编号，流程编号，流程编号，】
                string nextWFDIDS = string.Empty;
                wf_workflowdetails wfdModel = new WF_WorkFlowDetailDAL().GetSingle(WFDID);
                if (wfdModel != null)
                    nextWFDIDS = wfdModel.nextid;
                else
                {
                    workflow.WorkFlowState = 2;
                    return workflow;
                }

                if (!string.IsNullOrEmpty(nextWFDIDS))
                {
                    #region 下一步的所有流程
                    //下一步流程 格式为：【;流程编号,流程名称,是否有下一个流程;流程编号,流程名称,是否有下一个流程;流程编号,流程名称,是否有下一个流程;】
                    string nextWFDIDNames = "";

                    string[] nextWFDIDS_split = nextWFDIDS.Split(',');
                    foreach (string NEXTID in nextWFDIDS_split)
                    {
                        if (!string.IsNullOrEmpty(NEXTID))
                        {
                            string temp = "";
                            string WFDNAME = string.Empty;
                            wf_workflowdetails wfdMpdel = wfdList.FirstOrDefault(a => a.wfdid == NEXTID);
                            if (wfdMpdel == null || string.IsNullOrEmpty(wfdMpdel.wfdname))
                            {
                                workflow.WorkFlowState = 2;
                                return workflow;
                            }
                            else
                                WFDNAME = wfdMpdel.wfdname;
                            //int isNextW = 0;//是否还有下步流程，如果没有则表示结束
                            //if (string.IsNullOrEmpty(wfdMpdel.nextid))
                            //    isNextW = 1;

                            temp += NEXTID;

                            if (!string.IsNullOrEmpty(nextWFDIDNames))
                                nextWFDIDNames += temp + ";";
                            else
                                nextWFDIDNames += ";" + temp + ";";
                        }
                    }

                    workflow.nextWFDIDNames = nextWFDIDNames;//下一步流程 
                    #endregion

                    #region 查找下一步默认的用户 如果默认下一个步骤只有一步，并且明确制定用户，则直接将对应的用户加载出来
                    string UserIDs = string.Empty;
                    string UserNames = string.Empty;
                    string NextWFDID = string.Empty;

                    if (!string.IsNullOrEmpty(wfdModel.nextiddefaultuser))
                    {
                        string[] nextDefaultUser = wfdModel.nextiddefaultuser.Split(',');
                        for (int i = 0; i < nextDefaultUser.Length; i++)
                        {
                            if (!string.IsNullOrEmpty(nextDefaultUser[i]))
                            {
                                UserNames += ",";
                                if (nextDefaultUser[i] == "0")
                                    UserNames += "暂无,";
                                else
                                    UserNames += UserDAL.GetUserNameByUserID(Convert.ToDecimal(nextDefaultUser[i])) + ",";
                            }
                        }

                        workflow.NextWFUSERIDS = wfdModel.nextiddefaultuser;
                        workflow.NextUserNames = UserNames;
                        workflow.NextWFDID = wfdModel.nextiddefault;
                    }
                    if (!string.IsNullOrEmpty(wfdModel.nextiddefaultdept))
                    {
                        string[] nextDefaultDept = wfdModel.nextiddefaultdept.Split(',');
                        for (int i = 0; i < nextDefaultDept.Length; i++)
                        {
                            if (!string.IsNullOrEmpty(nextDefaultDept[i]))
                            {
                                UserNames += ",";
                                if (nextDefaultDept[i] == "0")
                                    UserNames += "暂无,";
                                else
                                    UserNames += UserDAL.GetUserNameByDeptID(Convert.ToDecimal(nextDefaultDept[i])) + ",";
                                UserNames = "";
                            }
                        }
                        workflow.NextWFUSERIDS = wfdModel.nextiddefaultuser;
                        workflow.NextUserNames = UserNames;
                        workflow.NextWFDID = wfdModel.nextiddefault;
                    }

                    if (!string.IsNullOrEmpty(wfdModel.nextiddefaultrole))
                    {
                        string[] nextDefaultRole = wfdModel.nextiddefaultrole.Split(',');
                        for (int i = 0; i < nextDefaultRole.Length; i++)
                        {
                            if (!string.IsNullOrEmpty(nextDefaultRole[i]))
                            {
                                UserNames += ",";
                                if (nextDefaultRole[i] == "0")
                                    UserNames += "暂无,";
                                else
                                    UserNames += UserDAL.GetUserNameByRoleID(Convert.ToDecimal(nextDefaultRole[i])) + ",";

                            }
                        }
                        workflow.NextWFUSERIDS = wfdModel.nextiddefaultuser;
                        workflow.NextUserNames = UserNames;
                        workflow.NextWFDID = wfdModel.nextiddefault;
                    }

                    #endregion
                }
                #endregion
            }
            return workflow;
        }

        /// <summary>
        /// 流程提交
        /// </summary>
        /// <param name="workflow">流程实例模型</param>
        /// <param name="TableModel">具体表模型</param>
        /// <returns></returns>
        public string WF_Submit(WorkFlowClass workflow, object TableModel)
        {

            #region 获取数据
            string tableName = workflow.FunctionName;//获取表名
            string WFID = workflow.WFID;//工作流编号
            string WFDID = workflow.WFDID;//工作流环节编号
            string WFSID = workflow.WFSID;//活动实例编号
            string WFSAID = workflow.WFSAID;//当前环节实例编号
            string dealContent = workflow.DEALCONTENT;//会签意见
            string NextWFDID = workflow.NextWFDID;//下一个环节编号
            string NextWFUSERIDS = workflow.NextWFUSERIDS;//获取下一个环节的用户
            string IsSendMsg = workflow.IsSendMsg;//是否发送短信
            string Remark = workflow.Remark;
            string processmode = workflow.processmode;
            string satisfaction = workflow.satisfaction;
            #endregion

            #region 增加/修改 对应的流程
            string TABLENAMEID = string.Empty;//对应表数据编号
            string WFSNAME = string.Empty;//活动流程名称
            switch (workflow.FunctionName)
            {
                case "sm_citizenservices"://市民服务基础表
                    TABLENAMEID = function_citizenservices(out WFSNAME, workflow.WFSID, (sm_citizenservices)TableModel);
                    break;
                case "yh_yhtasks"://养护任务基础表
                    TABLENAMEID = function_yhtasks(out WFSNAME, workflow.WFSID, (yh_yhtasks)TableModel);
                    break;
                case "zxzz_tasks"://专项整治基础表
                    TABLENAMEID = function_specialtasks(out WFSNAME, workflow.WFSID, (zxzz_tasks)TableModel);
                    break;
                case "audit_project_w"://行政审批基础表
                    TABLENAMEID = workflow.syncrowguid;
                    break;
                default:
                    break;
            }
            #endregion

            #region 检查是否存在当前实例，如果不存在则增加当前活动实例

            wf_workflowspecifics WFSModel = null;
            if (!string.IsNullOrEmpty(workflow.WFSID))
            {
                WFSModel = new WF_WorkFlowSpecificDAL().GetSingle(workflow.WFSID);
                if (WFSModel == null)
                    WFSID = "";
                else
                {
                    WFSModel.wfsname = WFSNAME;
                    new WF_WorkFlowSpecificDAL().Update(WFSModel);
                }
            }

            if (string.IsNullOrEmpty(WFSID))
            {
                WFSModel = new wf_workflowspecifics();
                WFSModel.wfsid = GetNewId();
                WFSModel.wfid = WFID;
                WFSModel.tablename = tableName;
                WFSModel.createuserid = workflow.WFCreateUserID;
                WFSModel.createtime = DateTime.Now;
                WFSModel.status = 1;
                WFSModel.tablenameid = TABLENAMEID;
                WFSModel.wfsname = WFSNAME;
                new WF_WorkFlowSpecificDAL().Add(WFSModel);
                WFSID = WFSModel.wfsid;
            }
            #endregion

            #region 增加活动实例具体的流程

            #region 更新当前环节
            decimal oldStatus;//当前环节是否已经处理完成 1：未处理，2已经处理
            //更新或者增加当前流程的具体事例---返回当前环节编号
            WFSAID = function_WF_DealCurentActivity(WFSAID, WFSID, workflow.WFCreateUserID.Value, 2, WFDID, out oldStatus);
            //更新或者增加当前环节用户处理的意见---返回当前环节用户需要处理的编号
            string WFSUID = function_WF_DealCurentActivityUser(WFSAID, workflow.WFCreateUserID.Value, dealContent, 2, DateTime.Now, "false", WFSNAME, workflow.WFCreateUserID.Value, Remark, processmode, satisfaction);
            //增加当前处理用户的附件
            switch (workflow.FunctionName)
            {
                case "sm_citizenservices"://市民服务
                    function_WF_WorkFlowAttrach_smsj(WFSUID, workflow.files, workflow.FileSource);
                    break;
                case "yh_yhtasks"://养护任务
                    function_WF_WorkFlowAttrach_smsj(WFSUID, workflow.files, workflow.FileSource);
                    break;
                case "zxzz_tasks"://专项整治
                    function_WF_WorkFlowAttrach_smsj(WFSUID, workflow.files, workflow.FileSource);
                    break;
                case "audit_project_w"://行政审批基础表
                    function_WF_WorkFlowAttrach_smsj(WFSUID, workflow.files, workflow.FileSource);
                    break;
                default:
                    break;
            }

            #endregion
            //当前状态为处理，则说明是第一个人处理，则需要增加下一个环节，如果当前环节已经处理，则不需要增加下一个环节
            string NextWFSAID = "";
            if (oldStatus == 1)
            {
                //获取该环节是否为最后一个环节
                wf_workflowdetails wfdModel = new WF_WorkFlowDetailDAL().GetSingle(NextWFDID);
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
                    //结束该流程
                    WFSModel = new WF_WorkFlowSpecificDAL().GetSingle(WFSID);
                    if (WFSModel != null)
                    {
                        WFSModel.status = 2;
                        new WF_WorkFlowSpecificDAL().Update(WFSModel);
                    }
                    status_wfsa = 2;
                    content_wfsa = "已结束";
                }

                #region 增加下一个环节

                //增加环节
                NextWFSAID = function_WF_DealCurentActivity("", WFSID, workflow.WFCreateUserID.Value, status_wfsa, NextWFDID, out oldStatus);

                #region 更新活动实例的当前环节编号
                WFSModel = new WF_WorkFlowSpecificDAL().GetSingle(WFSID);
                if (WFSModel != null)
                {
                    WFSModel.currentwfsaid = NextWFSAID;
                    WFSModel.status = status_wfsa;
                    new WF_WorkFlowSpecificDAL().Update(WFSModel);
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
                            function_WF_DealCurentActivityUser(NextWFSAID, (int)userid, content_wfsa, status_wfsa, dealTime, IsSendMsg, WFSNAME, workflow.WFCreateUserID, Remark, processmode, satisfaction);
                        }
                    }
                }

                #endregion
            }
            #endregion
            return WFSID + "," + NextWFSAID + "," + TABLENAMEID;
        }


        /// <summary>
        /// 协同管理执法的逻辑处理
        /// </summary>
        /// <param name="WFSNAME">流程详细名称</param>
        /// <param name="WFSID">流程详细ID</param>
        /// <param name="smsj">要处理的表(smsj)</param>
        /// <returns></returns>
        public string function_citizenservices(out string WFSNAME, string WFSID, sm_citizenservices smsj)
        {
            Entities dbsmsj = new Entities();
            sm_citizenservices citizenservicesmodel = null;
            string INDID = string.Empty;
            wf_workflowspecifics wfsmodel = new WF_WorkFlowSpecificDAL().GetSingle(WFSID);
            if (wfsmodel != null && !string.IsNullOrEmpty(wfsmodel.tablenameid))
            {
                citizenservicesmodel = dbsmsj.sm_citizenservices.SingleOrDefault(t => t.citizenid == wfsmodel.tablenameid);

                if (citizenservicesmodel == null)
                {
                    citizenservicesmodel = new sm_citizenservices();
                    INDID = GetNewId();
                }
                if (!string.IsNullOrEmpty(smsj.processmode) || !string.IsNullOrEmpty(smsj.satisfaction))
                {
                    citizenservicesmodel.processmode = smsj.processmode;
                    citizenservicesmodel.satisfaction = smsj.satisfaction;
                    new SM_CitizenServicesDAL().UpdateCitizen(citizenservicesmodel);
                }
                if (smsj.processuserid != null)
                {
                    citizenservicesmodel.processuserid = smsj.processuserid;
                    new SM_CitizenServicesDAL().UpdateCitizenProcess(citizenservicesmodel);
                }
                if (smsj.officeuserid != null)
                {
                    citizenservicesmodel.officeuserid = smsj.officeuserid;
                    new SM_CitizenServicesDAL().UpdateCitizenOffice(citizenservicesmodel);
                }
                if (!string.IsNullOrEmpty(smsj.workflowtype))
                {
                    citizenservicesmodel.workflowtype = smsj.workflowtype;
                    new SM_CitizenServicesDAL().UpdateCitizenOffice(citizenservicesmodel);
                }
                if (!string.IsNullOrEmpty(smsj.suggest))
                {
                    citizenservicesmodel.suggest = smsj.suggest;
                    new SM_CitizenServicesDAL().UpdateCitizenOffice(citizenservicesmodel);
                }
                if (smsj.gdsj != null)
                {
                    citizenservicesmodel.gdsj = smsj.gdsj;
                    new SM_CitizenServicesDAL().UpdateCitizengdsj(citizenservicesmodel);
                }
                if (!string.IsNullOrEmpty(smsj.pqxzid))
                {
                    citizenservicesmodel.pqxzid = smsj.pqxzid;
                    new SM_CitizenServicesDAL().UpdateCitizenpqxz(citizenservicesmodel);
                }

            }
            else
            {
                citizenservicesmodel = new sm_citizenservices();
                INDID = GetNewId();
            }

            if (!string.IsNullOrEmpty(INDID))//说明不存在
            {
                citizenservicesmodel.citizenid = INDID;
                citizenservicesmodel.sourceid = smsj.sourceid;
                citizenservicesmodel.dutytime = smsj.dutytime;
                citizenservicesmodel.eventid = smsj.eventid;
                citizenservicesmodel.complainant = smsj.complainant;
                citizenservicesmodel.cnumber = smsj.cnumber;
                citizenservicesmodel.foundtime = smsj.foundtime;
                citizenservicesmodel.contactphone = smsj.contactphone;
                citizenservicesmodel.contactaddress = smsj.contactaddress;
                citizenservicesmodel.eventaddress = smsj.eventaddress;
                citizenservicesmodel.eventtitle = smsj.eventtitle;
                citizenservicesmodel.eventcontent = smsj.eventcontent;
                citizenservicesmodel.bigtypeid = smsj.bigtypeid;
                citizenservicesmodel.smalltypeid = smsj.smalltypeid;
                citizenservicesmodel.limittime = smsj.limittime;
                citizenservicesmodel.recorduser = smsj.recorduser;
                citizenservicesmodel.grometry = smsj.grometry;
                citizenservicesmodel.createtime = smsj.createtime;
                citizenservicesmodel.createuserid = smsj.createuserid;
                citizenservicesmodel.sfzxzz = smsj.sfzxzz;
                citizenservicesmodel.srid = smsj.srid;
                citizenservicesmodel.processmode = smsj.processmode;
                citizenservicesmodel.satisfaction = smsj.satisfaction;
                citizenservicesmodel.processuserid = smsj.processuserid;
                citizenservicesmodel.gdsj = smsj.gdsj;
                citizenservicesmodel.workflowtype = smsj.workflowtype;
                citizenservicesmodel.suggest = smsj.suggest;
                citizenservicesmodel.xzid = smsj.xzid;
                citizenservicesmodel.pqxzid = smsj.pqxzid;
            }
            if (!string.IsNullOrEmpty(INDID))
            {
                //添加
                dbsmsj.sm_citizenservices.Add(citizenservicesmodel);
                dbsmsj.SaveChanges();
            }
            //else
            //{
            //    //更新
            //    sm_citizenservices smsjmodel = dbsmsj.sm_citizenservices.SingleOrDefault(a => a.citizenid == wfsmodel.tablenameid);
            //    if (smsjmodel != null)
            //    {
            //        smsjmodel.sourceid = smsj.sourceid;
            //        smsjmodel.dutytime = smsj.dutytime;
            //        smsjmodel.eventid = smsj.eventid;
            //        smsjmodel.complainant = smsj.complainant;
            //        smsjmodel.cnumber = smsj.cnumber;
            //        smsjmodel.foundtime = smsj.foundtime;
            //        smsjmodel.contactphone = smsj.contactphone;
            //        smsjmodel.contactaddress = smsj.contactaddress;
            //        smsjmodel.eventaddress = smsj.eventaddress;
            //        smsjmodel.eventtitle = smsj.eventtitle;
            //        smsjmodel.eventcontent = smsj.eventcontent;
            //        smsjmodel.bigtypeid = smsj.bigtypeid;
            //        smsjmodel.smalltypeid = smsj.smalltypeid;
            //        smsjmodel.limittime = smsj.limittime;
            //        smsjmodel.recorduser = smsj.recorduser;
            //        smsjmodel.grometry = smsj.grometry;
            //        smsjmodel.createtime = smsj.createtime;
            //        smsjmodel.createuserid = smsj.createuserid;
            //        smsjmodel.sfzxzz = smsj.sfzxzz;
            //        smsjmodel.srid = smsj.srid;
            //        smsjmodel.processmode = smsj.processmode;
            //        smsjmodel.satisfaction = smsj.satisfaction;
            //        smsjmodel.processuserid = smsj.processuserid;
            //        smsjmodel.gdsj = smsj.gdsj;
            //        dbsmsj.SaveChanges();
            //    }
            //}


            if (string.IsNullOrEmpty(INDID))
            {
                INDID = citizenservicesmodel.citizenid;
            }

            WFSNAME = smsj.eventtitle;
            return INDID;
        }


        /// <summary>
        /// 养护任务逻辑处理
        /// </summary>
        /// <param name="WFSNAME">流程详细名称</param>
        /// <param name="WFSID">流程详细ID</param>
        /// <param name="smsj">要处理的表(smsj)</param>
        /// <returns></returns>
        public string function_yhtasks(out string WFSNAME, string WFSID, yh_yhtasks yhmodel)
        {
            Entities dbsmsj = new Entities();
            yh_yhtasks yhtasksmodel = null;
            string INDID = string.Empty;
            wf_workflowspecifics wfsmodel = new WF_WorkFlowSpecificDAL().GetSingle(WFSID);
            if (wfsmodel != null && !string.IsNullOrEmpty(wfsmodel.tablenameid))
            {
                yhtasksmodel = dbsmsj.yh_yhtasks.SingleOrDefault(t => t.yhtaskid == wfsmodel.tablenameid);

                if (yhtasksmodel == null)
                {
                    yhtasksmodel = new yh_yhtasks();
                    INDID = GetNewId();
                }
                //if (!string.IsNullOrEmpty(smsj.processmode) || !string.IsNullOrEmpty(smsj.satisfaction))
                //{
                //    citizenservicesmodel.processmode = smsj.processmode;
                //    citizenservicesmodel.satisfaction = smsj.satisfaction;
                //    new SM_CitizenServicesDAL().UpdateCitizen(citizenservicesmodel);
                //}
                if (yhmodel.pqrid != null)
                {
                    yhtasksmodel.pqrid = yhmodel.pqrid;
                    new YH_YhTaskDAL().UpdateCitizenProcess(yhtasksmodel);
                }
                //if (smsj.officeuserid!=null)
                //{
                //     citizenservicesmodel.officeuserid = smsj.officeuserid;
                //     new SM_CitizenServicesDAL().UpdateCitizenOffice(citizenservicesmodel);
                //}

            }
            else
            {
                yhtasksmodel = new yh_yhtasks();
                INDID = GetNewId();
            }

            if (!string.IsNullOrEmpty(INDID))//说明不存在
            {
                yhtasksmodel.yhtaskid = INDID;
                yhtasksmodel.yhcompany = yhmodel.yhcompany;
                yhtasksmodel.foundtime = yhmodel.foundtime;
                yhtasksmodel.fileename = yhmodel.fileename;
                yhtasksmodel.wtsource = yhmodel.wtsource;
                yhtasksmodel.yhtype = yhmodel.yhtype;
                yhtasksmodel.wtbigclass = yhmodel.wtbigclass;
                yhtasksmodel.wtsmallclass = yhmodel.wtsmallclass;
                yhtasksmodel.yhobject = yhmodel.yhobject;
                yhtasksmodel.weather = yhmodel.weather;
                yhtasksmodel.duetime = yhmodel.duetime;
                yhtasksmodel.outlay = yhmodel.outlay;
                yhtasksmodel.workload = yhmodel.workload;
                yhtasksmodel.yhcontract = yhmodel.yhcontract;
                yhtasksmodel.wtaddress = yhmodel.wtaddress;
                yhtasksmodel.wtdescribe = yhmodel.wtdescribe;
                yhtasksmodel.geography84 = yhmodel.geography84;

                yhtasksmodel.geography2000 = yhmodel.geography2000;
                yhtasksmodel.wtnature = yhmodel.wtnature;
                yhtasksmodel.points = yhmodel.points;
                yhtasksmodel.debit = yhmodel.debit;
                yhtasksmodel.sendusername = yhmodel.sendusername;
                yhtasksmodel.outlay = yhmodel.outlay;
                yhtasksmodel.sendopinion = yhmodel.sendopinion;
                yhtasksmodel.createtime = DateTime.Now;
                yhtasksmodel.createuserid = yhmodel.createuserid;


            }
            if (!string.IsNullOrEmpty(INDID))
            {
                //添加
                dbsmsj.yh_yhtasks.Add(yhtasksmodel);
                dbsmsj.SaveChanges();
            }

            if (string.IsNullOrEmpty(INDID))
            {
                INDID = yhtasksmodel.yhtaskid;
            }

            WFSNAME = yhmodel.yhobject;
            return INDID;
        }

        /// <summary>
        /// 专项整治逻辑处理
        /// </summary>
        /// <param name="WFSNAME">流程详细名称</param>
        /// <param name="WFSID">流程详细ID</param>
        /// <param name="smsj">要处理的表(smsj)</param>
        /// <returns></returns>
        public string function_specialtasks(out string WFSNAME, string WFSID, zxzz_tasks zxzzmodel)
        {
            Entities dbsmsj = new Entities();
            zxzz_tasks zxzztaskmodel = null;
            string INDID = string.Empty;
            wf_workflowspecifics wfsmodel = new WF_WorkFlowSpecificDAL().GetSingle(WFSID);
            if (wfsmodel != null && !string.IsNullOrEmpty(wfsmodel.tablenameid))
            {
                zxzztaskmodel = dbsmsj.zxzz_tasks.SingleOrDefault(t => t.taskid == wfsmodel.tablenameid);

                if (zxzztaskmodel == null)
                {
                    zxzztaskmodel = new zxzz_tasks();
                    INDID = GetNewId();
                }
                else
                {
                    zxzztaskmodel.summarytime = zxzzmodel.summarytime;
                    zxzztaskmodel.summaryuserid = zxzzmodel.summaryuserid;
                    zxzztaskmodel.summary = zxzzmodel.summary;
                    zxzztaskmodel.results = zxzzmodel.results;
                    zxzztaskmodel.experiences = zxzzmodel.experiences;

                    new Zxzz_SpecialTaskDAL().UpdateSpecailTask(zxzztaskmodel);
                }
            }
            else
            {
                zxzztaskmodel = new zxzz_tasks();
                INDID = GetNewId();
            }

            if (!string.IsNullOrEmpty(INDID))//说明不存在
            {
                zxzztaskmodel.taskid = INDID;
                zxzztaskmodel.title = zxzzmodel.title;
                zxzztaskmodel.tasktype = zxzzmodel.tasktype;
                zxzztaskmodel.level = zxzzmodel.level;
                zxzztaskmodel.term = zxzzmodel.term;
                zxzztaskmodel.starttime = zxzzmodel.starttime;
                zxzztaskmodel.endtime = zxzzmodel.endtime;
                zxzztaskmodel.region = zxzzmodel.region;
                zxzztaskmodel.taskexplain = zxzzmodel.taskexplain;
                zxzztaskmodel.grometry = zxzzmodel.grometry;
                zxzztaskmodel.fqr = zxzzmodel.fqr;
                zxzztaskmodel.fqtime = zxzzmodel.fqtime;
                zxzztaskmodel.xdzd = zxzzmodel.xdzd;
                zxzztaskmodel.leader = zxzzmodel.leader;
                zxzztaskmodel.createuserid = zxzzmodel.createuserid;
                zxzztaskmodel.createtime = DateTime.Now;
            }
            if (!string.IsNullOrEmpty(INDID))
            {
                //添加
                dbsmsj.zxzz_tasks.Add(zxzztaskmodel);
                dbsmsj.SaveChanges();
            }

            if (string.IsNullOrEmpty(INDID))
            {
                INDID = zxzztaskmodel.taskid;
            }

            WFSNAME = zxzzmodel.title;
            return INDID;
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
        public string function_WF_DealCurentActivity(string WFSAID, string WFSID, int UserID, int STATUS, string WFDID, out decimal oldStatus)
        {
            oldStatus = 1;
            wf_workflowspecificactivitys wfsaModel = new WF_WorkFlowSpecificActivitysDAL().GetSingle(WFSAID);
            #region 处理当前环节
            if (wfsaModel != null)//当前环节，如果存在，则修改状态，和更新处理人
            {
                if (wfsaModel.status != 2)//状态为已经更新，则就不需要更新
                {
                    //更新环节
                    wfsaModel.status = 2;
                    wfsaModel.dealtime = DateTime.Now;
                    wfsaModel.dealuserid = UserID;
                    new WF_WorkFlowSpecificActivitysDAL().Update(wfsaModel);
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
                wfsaModel = new wf_workflowspecificactivitys();
                wfsaModel.wfsaid = GetNewId();
                wfsaModel.createtime = DateTime.Now;
                wfsaModel.wfsid = WFSID;
                wfsaModel.status = STATUS;
                wfsaModel.dealuserid = UserID;
                wfsaModel.dealtime = DateTime.Now;
                wfsaModel.wfdid = WFDID;
                new WF_WorkFlowSpecificActivitysDAL().Add(wfsaModel);

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
        public string function_WF_DealCurentActivityUser(string WFSAID, int UserID, string CONTENT, int STATUS, DateTime? DEALTIME, string IsSendMsg, string OATitle, int? WFCreateUserID, string Remark, string processmode, string satisfaction)
        {
            WF_WorkFlowSpecificUsersDAL wfsuBLL = new WF_WorkFlowSpecificUsersDAL();
            string WFSUID = string.Empty;
            //更新当前环节登录用户的状态及处理的意见
            wf_workflowspecificusers wfsuModel = wfsuBLL.GetList()
                .FirstOrDefault(a => a.wfsaid == WFSAID && a.userid == UserID);
            if (wfsuModel != null)
            {
                wfsuModel.content = CONTENT;
                wfsuModel.dealtime = DEALTIME;
                wfsuModel.status = 2;
                wfsuModel.remark = Remark;
                wfsuModel.ismainuser = 1;//是主控人
                wfsuModel.processmode = processmode;
                wfsuModel.satisfaction = satisfaction;
                wfsuBLL.Update(wfsuModel);
                //返回当前处理人对应的编号
                WFSUID = wfsuModel.wfsuid;
            }
            else
            {
                wfsuModel = new wf_workflowspecificusers();
                wfsuModel.wfsuid = GetNewId();
                wfsuModel.userid = UserID;
                wfsuModel.content = CONTENT;
                wfsuModel.dealtime = DEALTIME;
                wfsuModel.remark = Remark;
                wfsuModel.status = STATUS;

                if (STATUS == 2)
                {
                    wfsuModel.ismainuser = 1;//是主控人
                }

                wfsuModel.wfsaid = WFSAID;
                wfsuModel.createuserid = WFCreateUserID;
                wfsuModel.createtime = DateTime.Now;
                wfsuModel.processmode = processmode;
                wfsuModel.satisfaction = satisfaction;
                wfsuBLL.Add(wfsuModel);
                //返回当前处理人对应的编号
                WFSUID = wfsuModel.wfsuid;

                #region 是否发送短信
                //if (IsSendMsg == "true")
                //{
                //    SYS_USERS uSmodel = UserBLL.GetUserByUserID(UserID);
                //    if (uSmodel != null && !string.IsNullOrEmpty(uSmodel.PHONE))
                //    {
                //        string phone = uSmodel.PHONE;

                //        //phone = "15858196099";
                //        string megContent = "您有一条新的工作需要办理，工作名称为:" + OATitle;

                //        SMSUtility.SendMessage(phone, megContent + "[" +uSmodel.USERNAME + "]", DateTime.Now.Ticks);
                //    }
                //}
                #endregion

            }
            return WFSUID;
        }

        /// <summary>
        /// 增加当前处理用户的附件
        /// </summary>
        /// <param name="WFSUID">当前环节处理用户对应的编号</param>
        public void function_WF_WorkFlowAttrach_smsj(string WFSUID, List<FileClass> files, int? fileSource)
        {
            if (files != null && files.Count > 0)
            {
                foreach (FileClass item in files)
                {
                    wf_workflowspecificuserfiles wfsufModel = new wf_workflowspecificuserfiles();
                    wfsufModel.wfsuid = WFSUID;
                    wfsufModel.filesource = fileSource;
                    wfsufModel.filepath = item.OriginalPath;
                    wfsufModel.filename = item.OriginalName;
                    wfsufModel.fileremark = "";
                    wfsufModel.filetype = item.OriginalType;
                    wfsufModel.filesize = item.size;
                    new WF_WorkFlowSpecificUsersFilesDAL().Add(wfsufModel);
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

        /// <summary>
        /// 删除流程里的图片
        /// </summary>
        /// <returns></returns>
        public bool DeleteWorkFlowPictures(string tablename,string wordname,int id)
        {
            Entities db = new Entities();
            string sql = string.Format("delete from {0} where {1} = {2}",tablename,wordname,id);
            int result = db.Database.ExecuteSqlCommand(sql);
            if (result > 0)
                return true;
            else
                return false;
        }

        #region 行政审批基础表

        #endregion
    }
}
