using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.SMSMessagesBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class CommonCaseController : ApiController
    {
        //<summary>
        //新增一般案件登记
        //</summary>
        //<returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCommonCase()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_CasesBLL bll = new Case_CasesBLL();
            UserBLL ubll = new UserBLL();
            Case_CaseSourcesBLL casesourcebll = new Case_CaseSourcesBLL();
            DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
            Case_CasesModel model = new Case_CasesModel();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int tableid = 0, modeltype = 0;

            if (!string.IsNullOrEmpty(request["caseid"]))
            {
                model = bll.GetSaveCommonCase(Convert.ToInt32(request["caseid"]), 1);
            }
            else
            {
                modeltype++;
                //新增时文书编号是否重复
                if (bll.CaseDocumentNumberEQ(request["casebh"]))
                {
                    response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
                    return response;
                }
            }
            
            if (model == null)
            {
                model = new Case_CasesModel();
                modeltype++;
            }
            model.casebh = request["casebh"];
            model.casetypeid = request["casetypeid"];
            model.casename = request["casename"];
            model.qlsxid = request["qlsxid"];
            model.qlsx = request["qlsx"];
            model.casereason = request["casereason"];
            model.fromcasesource = request["fromcasesource"];
            model.casesourceid = request["casesourceid"];
            model.casesourcename = request["casesourcename"];
            model.caseaddress = request["caseaddress"];
            model.sitedatetime = Convert.ToDateTime(request["sitedatetime"]);
            model.geographical84 = request["grometry"];
            model.persontype = request["persontype"];
            model.f_card = request["f_card"];
            if (request["persontype"] == "type_zrr")
            {
                model.p_name = request["p_name"];                
                model.p_contactphone = request["contactphone"];
                model.p_contactaddress = request["contactaddress"];
                model.p_cardtypename = request["f_cardtype"] == "1" ? "身份证" : request["f_cardtype"] == "2" ? "军官证" : "护照";
            }
            else
            {
                model.f_name = request["f_name"];
                model.f_dbr = request["f_dbr"];
                model.f_cardnum = request["f_cardnum"];
                model.f_contactphone = request["contactphone"];
                model.f_contactaddress = request["contactaddress"];
                model.f_cardtypename = request["f_cardtype"] == "1" ? "组织机构代码证" : request["f_cardtype"] == "2" ? "营业执照" : request["f_cardtype"] == "3" ? "税务登记证" : "社会信用代码";
            }
            model.p_sex = request["p_sex"];
            model.p_cardtype = request["p_cardtype"];
            model.f_cardtype = request["f_cardtype"];
            model.f_wtr = request["f_wtr"];
            model.contactphone = request["contactphone"];
            model.contactaddress = request["contactaddress"];
            model.flfg = request["flfg"];
            model.clyj = request["clyj"];
            model.wfqx = request["wfqx"];
            model.cf = request["cf"];
            model.zdmj = !string.IsNullOrEmpty(request["zdmj"]) ? Convert.ToDouble(request["zdmj"]) : 0;
            model.gdmj = !string.IsNullOrEmpty(request["gdmj"]) ? Convert.ToDouble(request["gdmj"]) : 0;
            model.gtjzmj = !string.IsNullOrEmpty(request["gtjzmj"]) ? Convert.ToDouble(request["gtjzmj"]) : 0;
            model.ghjzmj = !string.IsNullOrEmpty(request["ghjzmj"]) ? Convert.ToDouble(request["ghjzmj"]) : 0;
            model.casecontent = request["casecontent"];
            model.createuserid = Convert.ToInt32(request["userid"]);
            model.sszd = Convert.ToInt32(request["middleteam"]);
            model.ssxbzd = Convert.ToInt32(request["ssxbzd"]);
            model.zbuserid = Convert.ToInt32(request["zbuserid"]);
            model.xbuserid = Convert.ToInt32(request["xbuserid"]);
            model.issave = Convert.ToInt32(request["issave"]);
            model.cbr = ubll.GetUserById((int)model.zbuserid).displayname + "、" + ubll.GetUserById((int)model.xbuserid).displayname;
            model.cbryj = string.IsNullOrEmpty(request["content"]) ? model.cbryj : request["content"];
            model.cbrtime = DateTime.Now.ToString();
            if (!string.IsNullOrEmpty(request["tzcsid"]))
            {
                model.tzcsid = Convert.ToInt32(request["tzcsid"]);
            }

            Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
            Case_WorkFlowClass wf = new Case_WorkFlowClass();

            if (modeltype == 1)//当第一次暂存或处理案件
            {
                if (!string.IsNullOrEmpty(request["tzcsid"]))
                {
                    casesourcebll.RegisterCaseSources(Convert.ToInt32(request["tzcsid"]));
                }

                tableid = bll.AddCase(model);

                #region 案件流程
                wf.FunctionName = "case_cases";
                wf.WFID = "2017030613400001";
                wf.WFDID = "2017030613500001";
                if (model.issave == 0)
                {
                    wf.NextWFDID = "2017030613500002";
                    wf.NextWFUSERIDS = request["dealuserid"];
                    wf.DEALCONTENT = request["content"];
                    wf.STIME = Convert.ToDateTime(request["starttime"]);
                    wf.ETIME = Convert.ToDateTime(request["endtime"]);
                }
                else
                {
                    wf.NextWFDID = "2017030613500001";
                    wf.NextWFUSERIDS = request["userid"];
                    wf.casemode = "1";
                }
                wf.IsSendMsg = "false";
                wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]);
                wf.cswfsid = request["cswfsid"];
                wf.casetype = 2;
                wf.casesourceid = Convert.ToInt32(model.casesourceid);
                wf.casereason = model.casereason;
                wf.casebh = model.casebh;
                wf.casetypeid = model.casetypeid;
                wf.contact = model.p_name == null ? model.f_name : model.p_name;
                wf.contactphone = model.contactphone;
                wf.address = model.caseaddress;
                wf.caseid = tableid;
                #endregion

                string wf_data = wfbll.WF_Submit(wf);

                #region 生成WORD、PDF文件
                List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
                Doc_WfsasModel dwmodel = new Doc_WfsasModel();

                dwmodel.wfsaid = wf_data.Split(new string[] { "nextwfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22);
                if (model.issave == 0)
                    dwmodel.filetyoe = 3;
                else
                    dwmodel.filetyoe = 4;
                dwmodel.ddid = 9;
                dwmodel.createuserid = Convert.ToInt32(request["userid"]);
                dwmodel.ddtablename = "case_cases";
                dwmodel.caseid = tableid;
                dwmodel.ddtableid = 0;
                dwmodel.filename = "立案审批表";
                dwmodel.status = 0;

                Dictionary<string, string> dic = casesourcebll.ToWordPDF(dwmodel.filename, System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + dwmodel.filename + (model.persontype == "type_zrr" ? "（个人）" : "（单位）") + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(model));
                dwmodel.lastwordpath = dic["WordPath"];
                dwmodel.lastpdfpath = dic["PDFPath"];

                WfsasList.Add(dwmodel);
                Case_CaseSourcesBLL ccbll = new Case_CaseSourcesBLL();
                ccbll.function_AddWfsas(WfsasList);
                #endregion
                

                response.Content = new StringContent("{\"success\":true,\"caseid\":" + tableid + "," + wf_data + "}", Encoding.GetEncoding("UTF-8"), "text/html");
                return response;
            }
            else
            {//当已暂存后再处理案件
                string rqwfsid = string.IsNullOrEmpty(request["wfsid"]) ? request["savewfsid"] : request["wfsid"];
                bll.UpdateCaseInfo(model);//修改暂存信息
                bll.UpdateCaseWFS(rqwfsid, model);//修改暂存关联流程表信息

                if (model.issave == 0)
                {                    
                    bll.UpdateCaseStatus(rqwfsid,"2");//更改暂存状态

                    //更改文书状态
                    if (!string.IsNullOrEmpty(request.Form["dwfsasid"]))
                    {
                        drhbll.EditDocumentStatus(Convert.ToInt32(request.Form["dwfsasid"]), 1);
                    }

                    if (!string.IsNullOrEmpty(request["tzcsid"]))
                    {
                        casesourcebll.RegisterCaseSources(Convert.ToInt32(request["tzcsid"]));
                    }

                    #region 案件流程
                    wf.FunctionName = "case_cases";
                    wf.WFID = "2017030613400001";
                    wf.WFDID = "2017030613500001";
                    wf.NextWFDID = "2017030613500002";
                    wf.NextWFUSERIDS = request["dealuserid"];
                    wf.DEALCONTENT = request["content"];
                    wf.STIME = Convert.ToDateTime(request["starttime"]);
                    wf.ETIME = Convert.ToDateTime(request["endtime"]);
                    wf.IsSendMsg = "false";
                    wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]);
                    wf.cswfsid = request["cswfsid"];
                    wf.casetype = 2;
                    wf.casesourceid = Convert.ToInt32(model.casesourceid);
                    wf.casereason = model.casereason;
                    wf.casebh = model.casebh;
                    wf.casetypeid = model.casetypeid;
                    wf.contact = model.p_name == null ? model.f_name : model.p_name;
                    wf.contactphone = model.contactphone;
                    wf.address = model.caseaddress;
                    wf.caseid = model.caseid;
                    #endregion

                    string wf_data = wfbll.WF_Submit(wf);

                    #region 生成WORD、PDF文件
                    List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
                    Doc_WfsasModel dwmodel = new Doc_WfsasModel();

                    dwmodel.wfsaid = wf_data.Split(new string[] { "nextwfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22);
                    dwmodel.filetyoe = 3;
                    dwmodel.ddid = 9;
                    dwmodel.createuserid = Convert.ToInt32(request["userid"]);
                    dwmodel.ddtablename = "case_cases";
                    dwmodel.caseid = model.caseid;
                    dwmodel.ddtableid = model.caseid;
                    dwmodel.filename = "立案审批表";
                    dwmodel.status = 0;

                    Dictionary<string, string> dic = casesourcebll.ToWordPDF(dwmodel.filename, System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + dwmodel.filename + (model.persontype == "type_zrr" ? "（个人）" : "（单位）") + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(model));
                    dwmodel.lastwordpath = dic["WordPath"];
                    dwmodel.lastpdfpath = dic["PDFPath"];

                    WfsasList.Add(dwmodel);
                    Case_CaseSourcesBLL ccbll = new Case_CaseSourcesBLL();
                    ccbll.function_AddWfsas(WfsasList);
                    #endregion

                    //暂存后上报文书
                    bll.UpdateCaseReportDocStatus(rqwfsid, wf_data.Split(new string[] { "wfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22));
                }

                #region 添加日志
                SystemLogBLL slbll = new SystemLogBLL();
                slbll.WriteSystemLog("一般案件", "", Convert.ToInt32(request["userid"]));
                #endregion

                response.Content = new StringContent("{\"success\":true,\"caseid\":" + model.caseid + ",\"wfsid\":\"" + rqwfsid + "\",\"wfsaid\":\"" + model.wfsaid + "\",\"nextwfsaid\":\"" + model.wfsaid + "\",\"wfdid\":\"2017030613500001\",\"wfdname\":\"提出立案申请\"}", Encoding.GetEncoding("UTF-8"), "text/html");
                return response;
            }
        }

        //<summary>
        //处理一般案件
        //</summary>
        //<returns></returns>
        [HttpPost]
        public HttpResponseMessage CommonCaseHandler()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
            DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
            Case_CaseSourcesBLL casesourcebll = new Case_CaseSourcesBLL();
            Case_CasesBLL bll = new Case_CasesBLL();
            UserBLL userbll = new UserBLL();
            Case_WorkFlowClass wf = new Case_WorkFlowClass();
            string nextkyuserid = "";

            #region 案件流程
            wf.FunctionName = "case_cases";
            wf.WFID = "2017030613400001";
            wf.WFDID = request["wfdid"];
            wf.DEALCONTENT = request["content"];
            wf.STIME = Convert.ToDateTime(request["starttime"]);
            wf.ETIME = Convert.ToDateTime(request["endtime"]);
            wf.NextWFDID = request["nextwfdid"];
            wf.NextWFUSERIDS = request["dealuserid"];
            wf.IsSendMsg = "false";
            wf.WFSID = request["wfsid"];
            wf.WFSAID = request["wfsaid"];
            wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]);
            wf.casestatus = string.IsNullOrEmpty(request["ajdx"]) ? null : request["ajdx"] == "2017030613500006"?"重大案件":"一般案件";
            #endregion

            string[] wfdidarr = new string[] { "2017030613500003", "2017030613500006", "2017030613500008", "2017030613500012", "2017030613500016", "2017030613500019", "2017030613500025", "2017030613500029" };//法制科审核关联环节
            if (wfdidarr.Contains(request["nextwfdid"]))
            {
                UserBLL ubll = new UserBLL();
                List<UserModel> userlist = ubll.GetUsersStaffList(13);
                foreach (UserModel usermodel in userlist)
                {
                    nextkyuserid += "," + usermodel.ID.ToString();
                }
                wf.NextWFUSERIDS += nextkyuserid;
            }

            string wf_data = wfbll.WF_Submit(wf);

            //结束所有wfsu用户的未处理
            if (wfdidarr.Contains(request["wfdid"]))
                bll.OverAllWFSU(request["wfsaid"]);

            #region 生成WORD、PDF文件
            List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
            List<CaseWorkFlowOldModel> hislist = bll.GetCaseOidList(request["wfsid"]);
            Case_CasesModel newusermodel = bll.GetCaseInfoByWFSID(request["wfsid"]);
            string wfsaid = bll.GetParamsWFSAID(request["wfsid"], request["wfdid"]);
            Doc_WfsasModel dwmodel = bll.GetFlowSaveInfo(wfsaid, 0) == null ? new Doc_WfsasModel() : bll.GetFlowSaveInfo(wfsaid, 0);
            dwmodel.filetyoe = 3;
            dwmodel.status = 0;
            dwmodel.wfsaid = wf_data.Split(new string[] { "nextwfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22);
            string wfdid = request["wfdid"];

            #region 回退到立案上报环节处理
            if (request["nextwfdid"] == "2017030613500001")//回退到立案
            {
                bll.UpdateZCAllWFS(request["wfsid"], null, 1, dwmodel.wfsaid);
            }
            if (request["wfdid"] == "2017030613500001")//回退后到中队长立案审核
            {
                bll.UpdateZCAllWFS(request["wfsid"], null, 0, null);
            }
            #endregion 

            #region 案件环节中基础信息
            DocumentAllHJWS model = new DocumentAllHJWS();
            model.sqsx = request["sqsx"];
            model.casename = request["casename"];
            model.casereason = request["casereason"];
            model.casesource = string.IsNullOrEmpty(request["casesource"]) ? request["casesourcename"] : request["casesource"];
            model.sitedatetime = request["sitedatetime"];
            model.casebh = request["casebh"];
            model.casecontent = request["casecontent"];
            model.persontype = request["persontype"];
            model.f_card = request["f_card"];
            if (request["persontype"] == "type_zrr")
            {
                model.p_name = request["p_name"];                
                model.p_contactphone = request["contactphone"];
                model.p_contactaddress = request["contactaddress"];
                model.p_cardtypename = request["f_cardtype"] == "1" ? "身份证" : request["f_cardtype"] == "2" ? "军官证" : "护照";
            }
            else
            {
                model.f_name = request["f_name"];
                model.f_dbr = request["f_dbr"];
                model.f_cardnum = request["f_cardnum"];
                model.f_contactphone = request["contactphone"];
                model.f_contactaddress = request["contactaddress"];
                model.f_cardtypename = request["f_cardtype"] == "1" ? "组织机构代码证" : request["f_cardtype"] == "2" ? "营业执照" : request["f_cardtype"] == "3" ? "税务登记证" : "社会信用代码";
            }
            model.dcjg = request["dcjg"];
            model.wfss = request["wfss"];
            model.ajdx = request["ajdx"];
            model.ajdxremark = request["ajdxremark"];
            model.jyaq = request["jyaq"];            
            model.xzcfnr = request["xzcfnr"];
            model.xzcfje = request["xzcfje"];
            model.xzcffs = request["xzcffs"];


            //每个阶段的处理信息
            string[] laspbarr = new string[] { "2017030613500001", "2017030613500002", "2017030613500003", "2017030613500004" };//立案审批表关联环节
            string[] dczjbgarr = new string[] { "2017030613500005", "2017030613500007", "2017030613500008", "2017030613500009", "2017030613500006" };//调查终结报告关联环节
            string[] gzspbarr = new string[] { "2017030613500010", "2017030613500011", "2017030613500012", "2017030613500013" };//告知审批表关联环节
            string[] cfjdsarr = new string[] { "2017030613500017", "2017030613500018", "2017030613500019", "2017030613500020" };//处罚决定书关联环节
            string[] ajjabgarr = new string[] { "2017030613500023", "2017030613500024", "2017030613500025", "2017030613500026" };//案件结案报告关联环节
            string[] qtspsxarr = new string[] { "2017030613500027", "2017030613500028", "2017030613500029", "2017030613500030" };//其他审批事项关联环节
            Dictionary<int, string[]> arrdic = new Dictionary<int, string[]>();
            arrdic.Add(0, laspbarr);
            arrdic.Add(1, dczjbgarr);
            arrdic.Add(2, gzspbarr);
            arrdic.Add(3, cfjdsarr);
            arrdic.Add(4, ajjabgarr);
            arrdic.Add(5, qtspsxarr);
            if (laspbarr.Contains(wfdid))
            {
                dwmodel.filename = "立案审批表";
                dwmodel.ddid = 9;
            }
            else if (dczjbgarr.Contains(wfdid))
            {
                dwmodel.filename = "调查终结报告";
                dwmodel.ddid = 13;
            }
            else if (gzspbarr.Contains(wfdid))
            {
                dwmodel.filename = "案件处理审批表";
                dwmodel.ddid = 14;
            }
            else if (cfjdsarr.Contains(wfdid))
            {
                dwmodel.filename = "案件处理审批表";
                dwmodel.ddid = 15;
            }
            else if (ajjabgarr.Contains(wfdid))
            {
                dwmodel.filename = "行政处罚案件结案报告";
                dwmodel.ddid = 16;
            }
            else if (qtspsxarr.Contains(wfdid))
            {
                dwmodel.filename = "相关事项审批表";
                dwmodel.ddid = 17;
            }
            else {
                dwmodel.filename = "";
                dwmodel.ddid = null;
            }
            foreach (var arritem in arrdic)
            {
                if (arritem.Value.Contains(wfdid))
                {
                    foreach (var item in hislist)
                    {
                        if (item.wfdid == arritem.Value[0])
                        {
                            model.cbr = newusermodel.zbusername + "、" + newusermodel.xbusername;
                            model.cbryj = item.content;
                            model.cbrtime = item.dealtime.ToString();
                        }
                        else if (item.wfdid == arritem.Value[1])
                        {
                            model.cbjg = item.username;
                            model.cbjgyj = item.content;
                            model.cbjgtime = item.dealtime.ToString();
                        }
                        else if (item.wfdid == arritem.Value[2] && userbll.GetUserRole((int)item.userid).Contains("法制科科长"))
                        {
                            model.fzjg = item.username;
                            model.fzjgyj = item.content;
                            model.fzjgtime = item.dealtime.ToString();
                        }
                        else if (item.wfdid == arritem.Value[3])
                        {
                            model.shr = item.username;
                            model.shryj = item.content;
                            model.shrtime = item.dealtime.ToString();
                        }
                    }
                }
            }

            #endregion

            Dictionary<string, string> dic = casesourcebll.ToWordPDF(dwmodel.filename, System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + dwmodel.filename + (model.persontype == "type_zrr" ? "（个人）" : "（单位）") + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(model));
            dwmodel.lastwordpath = dic["WordPath"];
            dwmodel.lastpdfpath = dic["PDFPath"];

            WfsasList.Add(dwmodel);
            casesourcebll.function_AddWfsas(WfsasList);
            #endregion

            #region 发送短信
            var isSendMsg = Convert.ToInt32(request.Form["isSendMsg"]);
            var phone = request["phone"];
            //string phone = "18768196242";
            var casename = request["casename"];
            if (wf.NextWFUSERIDS != null && isSendMsg == 1 && phone != null && phone.Length > 0)
            {
               
                string[] numbers = phone.Split(',');
                string msg = "您有一条新的案件需要处理,案件名称:" + casename + "，限办日期" + wf.ETIME + "请及时处理";
                SMSMessagesBLL message = new SMSMessagesBLL();
                message.SendMessage(numbers, msg);
            }
            #endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        //<summary>
        //案件处理暂存
        //</summary>
        //<returns></returns>
        [HttpPost]
        public HttpResponseMessage CommonCaseHandlerSave()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
            Case_CasesBLL bll = new Case_CasesBLL();
            string paramswfdid = request["wfdid"];
            string wfsaid = bll.GetParamsWFSAID(request["wfsid"], paramswfdid);
            Doc_WfsasModel dwmodel = bll.GetFlowSaveInfo(wfsaid, 0);
            
            string[] dczjbgarr = new string[] { "2017030613500005", "2017030613500007", "2017030613500008", "2017030613500009", "2017030613500006" };//调查终结报告关联环节
            string[] gzspbarr = new string[] { "2017030613500010", "2017030613500011", "2017030613500012", "2017030613500013" };//告知审批表关联环节
            string[] cfjdsarr = new string[] { "2017030613500017", "2017030613500018", "2017030613500019", "2017030613500020" };//处罚决定书关联环节
            string[] ajjabgarr = new string[] { "2017030613500023", "2017030613500024", "2017030613500025", "2017030613500026" };//案件结案报告关联环节
            string[] qtspsxarr = new string[] { "2017030613500027", "2017030613500028", "2017030613500029", "2017030613500030" };//其他审批事项关联环节

            //调查终结报告修改面积
            if (paramswfdid == "2017030613500005") {
                int caseid = Convert.ToInt32(request["caseid"]);
                Case_CasesModel inmodel = bll.GetSaveCommonCase(caseid,0);
                inmodel.zdmj = !string.IsNullOrEmpty(request["zdmj"]) ? Convert.ToDouble(request["zdmj"]) : 0;
                inmodel.gdmj = !string.IsNullOrEmpty(request["gdmj"]) ? Convert.ToDouble(request["gdmj"]) : 0;
                inmodel.ghjzmj = !string.IsNullOrEmpty(request["ghjzmj"]) ? Convert.ToDouble(request["ghjzmj"]) : 0;
                inmodel.gtjzmj = !string.IsNullOrEmpty(request["gtjzmj"]) ? Convert.ToDouble(request["gtjzmj"]) : 0;
                bll.UpdateCaseInfo(inmodel);
            }

            dwmodel.wfsaid = wfsaid;
            dwmodel.filetyoe = 4;
            if (dczjbgarr.Contains(paramswfdid))
            {
                dwmodel.filename = "调查终结报告";
                dwmodel.ddid = 13;
            }
            else if (gzspbarr.Contains(paramswfdid) || gzspbarr.Contains(paramswfdid))
            {
                dwmodel.filename = "案件处理审批表";
                dwmodel.ddid = 14;
            }
            else if (cfjdsarr.Contains(paramswfdid) || cfjdsarr.Contains(paramswfdid))
            {
                dwmodel.filename = "案件处理审批表";
                dwmodel.ddid = 15;
            }
            else if (ajjabgarr.Contains(paramswfdid))
            {
                dwmodel.filename = "行政处罚案件结案报告";
                dwmodel.ddid = 16;
            }
            else if (qtspsxarr.Contains(paramswfdid))
            {
                dwmodel.filename = "相关事项审批表";
                dwmodel.ddid = 17;
            }
            else
            {
                dwmodel.filename = null;
                dwmodel.ddid = null;
            }

            dwmodel.createuserid = Convert.ToInt32(request["userid"]);
            dwmodel.ddtablename = "case_cases";
            dwmodel.caseid = Convert.ToInt32(request["caseid"]);
            dwmodel.ddtableid = Convert.ToInt32(request["caseid"]);
            dwmodel.status = 0;
            dwmodel.dcjg = string.IsNullOrEmpty(request["dcjg"]) ? dwmodel.dcjg : request["dcjg"];
            dwmodel.wfss = string.IsNullOrEmpty(request["wfss"]) ? dwmodel.wfss : request["wfss"];
            dwmodel.ajdx = string.IsNullOrEmpty(request["ajdx"]) ? dwmodel.ajdx : request["ajdx"];
            dwmodel.ajdxremark = string.IsNullOrEmpty(request["ajdxremark"]) ? dwmodel.ajdxremark : request["ajdxremark"];
            dwmodel.jyaq = string.IsNullOrEmpty(request["jyaq"]) ? dwmodel.jyaq : request["jyaq"];

            dwmodel.xzcftype = string.IsNullOrEmpty(request["xzcftype"]) ? dwmodel.xzcftype : Convert.ToInt32(request["xzcftype"]);
            dwmodel.xzcfje = string.IsNullOrEmpty(request["xzcfje"]) ? dwmodel.xzcfje : request["xzcfje"];
            dwmodel.xzcfnr = string.IsNullOrEmpty(request["xzcfnr"]) ? dwmodel.xzcfnr : request["xzcfnr"];
            dwmodel.xzcffs = string.IsNullOrEmpty(request["xzcffs"]) ? dwmodel.xzcffs : request["xzcffs"];

            dwmodel.dsrreplay = string.IsNullOrEmpty(request["dsrreplay"]) ? dwmodel.dsrreplay : request["dsrreplay"];
            dwmodel.dsryj = string.IsNullOrEmpty(request["dsryj"]) ? dwmodel.dsryj : request["dsryj"];
            dwmodel.cssbtime = string.IsNullOrEmpty(request["cssbtime"]) ? dwmodel.cssbtime : Convert.ToDateTime(request["cssbtime"]);
            dwmodel.tzjgsm = string.IsNullOrEmpty(request["tzjgsm"]) ? dwmodel.tzjgsm : request["tzjgsm"];
            dwmodel.tzclr = string.IsNullOrEmpty(request["tzclr"]) ? dwmodel.tzclr : request["tzclr"];
            dwmodel.tzcltime = string.IsNullOrEmpty(request["tzcltime"]) ? dwmodel.tzcltime : Convert.ToDateTime(request["tzcltime"]);
            dwmodel.xzcfbgbz = string.IsNullOrEmpty(request["xzcfbgbz"]) ? dwmodel.xzcfbgbz : request["xzcfbgbz"];
            dwmodel.xzcfbgclr = string.IsNullOrEmpty(request["xzcfbgclr"]) ? dwmodel.xzcfbgclr : request["xzcfbgclr"];
            dwmodel.xzcfbgcltime = string.IsNullOrEmpty(request["xzcfbgcltime"]) ? dwmodel.xzcfbgcltime : Convert.ToDateTime(request["xzcfbgcltime"]);
            dwmodel.sdremark = string.IsNullOrEmpty(request["sdremark"]) ? dwmodel.sdremark : request["sdremark"];
            dwmodel.dsrzxfs = string.IsNullOrEmpty(request["dsrzxfs"]) ? dwmodel.dsrzxfs : request["dsrzxfs"];
            dwmodel.yjdw = string.IsNullOrEmpty(request["yjdw"]) ? dwmodel.yjdw : request["yjdw"];
            dwmodel.sfyj = string.IsNullOrEmpty(request["sfyj"]) ? dwmodel.sfyj : request["sfyj"];
            dwmodel.yjtime = string.IsNullOrEmpty(request["yjtime"]) ? dwmodel.yjtime : Convert.ToDateTime(request["yjtime"]);

            WfsasList.Add(dwmodel);
            Case_CaseSourcesBLL ccbll = new Case_CaseSourcesBLL();
            ccbll.function_AddWfsas(WfsasList);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        //<summary>
        //撤销一般案件
        //</summary>
        //<returns></returns>
        [HttpPost]
        public HttpResponseMessage RevokeCommonCase()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_CasesBLL bll = new Case_CasesBLL();

            #region 案件流程
            Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
            Case_WorkFlowClass wf = new Case_WorkFlowClass();
            wf.FunctionName = "case_cases";
            wf.WFID = "2017030613400001";
            wf.WFDID = "2017030613500001";
            wf.NextWFDID = "2017030613500032";
            wf.NextWFUSERIDS = request["userid"];
            wf.IsSendMsg = "false";
            wf.WFSID = request["wfsid"];
            wf.WFSAID = request["wfsaid"];
            wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]);
            #endregion

            wfbll.WF_Submit(wf);
            bll.UpdateCaseStatus(wf.WFSID, "3");

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        //<summary>
        //法制科科员回复
        //</summary>
        //<returns></returns>
        [HttpPost]
        public HttpResponseMessage CommonCaseReply()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
            Case_WorkFlowClass wf = new Case_WorkFlowClass();

            #region 法制科科员回复
            wf.FunctionName = "case_cases";
            wf.WFID = "2017030613400001";
            wf.WFDID = request["wfdid"];
            wf.DEALCONTENT = request["content"];
            wf.STIME = Convert.ToDateTime(request["starttime"]);
            wf.ETIME = Convert.ToDateTime(request["endtime"]);
            wf.NextWFDID = request["wfdid"];
            wf.NextWFUSERIDS = "0";
            wf.IsSendMsg = "false";
            wf.WFSID = request["wfsid"];
            wf.WFSAID = request["wfsaid"];
            wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]);
            int result = wfbll.WF_Reply(wf);
            #endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }


        #region api
        // /api/CommonCase/CommonCaseHandlerApi
        //<summary>
        //处理一般案件
        //</summary>
        //<returns></returns>
        [HttpPost]
        public object CommonCaseHandlerApi(DealWithModel model)
        {
            Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
            Case_WorkFlowClass wf = new Case_WorkFlowClass();

            #region 案件流程
            wf.FunctionName = "case_cases";
            wf.WFID = "2017030613400001";
            wf.WFDID = model.wfdid;
            wf.DEALCONTENT = model.dealcontent;
            wf.STIME = model.stime;
            wf.ETIME = model.etime;
            wf.NextWFDID = model.nextwfdid;
            wf.NextWFUSERIDS = model.nextwfuserids;
            wf.IsSendMsg = "false";
            wf.WFSID = model.wfsid;
            wf.WFSAID = model.wfsaid;
            wf.WFCreateUserID = model.wfcreateuserid;
            wf.casestatus = null;
            #endregion
            try
            {
                string wf_data = wfbll.WF_Submit(wf);

                #region 生成WORD、PDF文件
                UserBLL userbll = new UserBLL();
                Case_CasesBLL bll = new Case_CasesBLL();
                Case_CaseSourcesBLL casesourcebll = new Case_CaseSourcesBLL();
                DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
                Case_CasesModel ccmodel = bll.GetCaseModel(model.wfsid);
                List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
                List<CaseWorkFlowOldModel> hislist = bll.GetCaseOidList(model.wfsid);
                Case_CasesModel newusermodel = bll.GetCaseInfoByWFSID(model.wfsid);
                string wfsaid = bll.GetParamsWFSAID(model.wfsid, model.wfdid);
                Doc_WfsasModel dwmodel = bll.GetFlowSaveInfo(wfsaid, 0) == null ? new Doc_WfsasModel() : bll.GetFlowSaveInfo(wfsaid, 0);
                dwmodel.filetyoe = 3;
                dwmodel.status = 0;
                dwmodel.wfsaid = wf_data.Split(new string[] { "nextwfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22);
                #region 案件环节中基础信息
                DocumentAllHJWS allmodel = new DocumentAllHJWS();
                allmodel.casename = ccmodel.casename;
                allmodel.casereason =ccmodel.casereason;
                allmodel.casesource = ccmodel.casereason;
                allmodel.sitedatetime = ccmodel.sitedatetime.ToString();
                allmodel.casebh = ccmodel.casebh;
                allmodel.casecontent = ccmodel.casecontent;
                allmodel.persontype = ccmodel.persontype;
                allmodel.f_card = ccmodel.f_card;
                if (ccmodel.persontype == "type_zrr")
                {
                    allmodel.p_name = ccmodel.p_name;
                    allmodel.p_contactphone = ccmodel.contactphone;
                    allmodel.p_contactaddress = ccmodel.contactaddress;
                    allmodel.p_cardtypename = ccmodel.f_cardtype == "1" ? "身份证" : ccmodel.f_cardtype == "2" ? "军官证" : "护照";
                }
                else
                {
                    allmodel.f_name = ccmodel.f_name;
                    allmodel.f_dbr = ccmodel.f_dbr;
                    allmodel.f_cardnum = ccmodel.f_cardnum;
                    allmodel.f_contactphone = ccmodel.contactphone;
                    allmodel.f_contactaddress = ccmodel.contactaddress;
                    allmodel.f_cardtypename = ccmodel.f_cardtype == "1" ? "组织机构代码证" : ccmodel.f_cardtype == "2" ? "营业执照" : ccmodel.f_cardtype == "3" ? "税务登记证" : "社会信用代码";
                }
                allmodel.dcjg = dwmodel.dcjg;
                allmodel.wfss = dwmodel.wfss;
                allmodel.ajdx = dwmodel.ajdx;
                allmodel.jyaq = dwmodel.jyaq;
                allmodel.xzcfnr = dwmodel.xzcfnr;
                allmodel.xzcfje = dwmodel.xzcfje;
                allmodel.xzcffs = dwmodel.xzcffs;


                //每个阶段的处理信息
                string[] laspbarr = new string[] { "2017030613500001", "2017030613500002", "2017030613500003", "2017030613500004" };//立案审批表关联环节
                string[] dczjbgarr = new string[] { "2017030613500005", "2017030613500007", "2017030613500008", "2017030613500009", "2017030613500006" };//调查终结报告关联环节
                string[] gzspbarr = new string[] { "2017030613500010", "2017030613500011", "2017030613500012", "2017030613500013" };//告知审批表关联环节
                string[] cfjdsarr = new string[] { "2017030613500017", "2017030613500018", "2017030613500019", "2017030613500020" };//处罚决定书关联环节
                string[] ajjabgarr = new string[] { "2017030613500023", "2017030613500024", "2017030613500025", "2017030613500026" };//案件结案报告关联环节
                string[] qtspsxarr = new string[] { "2017030613500027", "2017030613500028", "2017030613500029", "2017030613500030" };//其他审批事项关联环节
                allmodel.sqsx = gzspbarr.Contains(ccmodel.wfdid) ? "行政处罚事先告知" : cfjdsarr.Contains(ccmodel.wfdid) ? "行政处罚决定" : "相关事项审批表";
                Dictionary<int, string[]> arrdic = new Dictionary<int, string[]>();
                arrdic.Add(0, laspbarr);
                arrdic.Add(1, dczjbgarr);
                arrdic.Add(2, gzspbarr);
                arrdic.Add(3, cfjdsarr);
                arrdic.Add(4, ajjabgarr);
                arrdic.Add(5, qtspsxarr);
                if (laspbarr.Contains(model.wfdid))
                {
                    dwmodel.filename = "立案审批表";
                    dwmodel.ddid = 9;
                }
                else if (dczjbgarr.Contains(model.wfdid))
                {
                    dwmodel.filename = "调查终结报告";
                    dwmodel.ddid = 13;
                }
                else if (gzspbarr.Contains(model.wfdid) || gzspbarr.Contains(model.wfdid))
                {
                    dwmodel.filename = "案件处理审批表";
                    dwmodel.ddid = 14;
                }
                else if (cfjdsarr.Contains(model.wfdid) || cfjdsarr.Contains(model.wfdid))
                {
                    dwmodel.filename = "案件处理审批表";
                    dwmodel.ddid = 15;
                }
                else if (ajjabgarr.Contains(model.wfdid))
                {
                    dwmodel.filename = "行政处罚案件结案报告";
                    dwmodel.ddid = 16;
                }
                else if (qtspsxarr.Contains(model.wfdid))
                {
                    dwmodel.filename = "相关事项审批表";
                    dwmodel.ddid = 17;
                }
                foreach (var arritem in arrdic)
                {
                    if (arritem.Value.Contains(model.wfdid))
                    {
                        foreach (var item in hislist)
                        {
                            if (item.wfdid == arritem.Value[0])
                            {
                                allmodel.cbr = newusermodel.zbusername + "、" + newusermodel.xbusername;
                                allmodel.cbryj = item.content;
                                allmodel.cbrtime = item.dealtime.ToString();
                            }
                            else if (item.wfdid == arritem.Value[1])
                            {
                                allmodel.cbjg = item.username;
                                allmodel.cbjgyj = item.content;
                                allmodel.cbjgtime = item.dealtime.ToString();
                            }
                            else if (item.wfdid == arritem.Value[2] && userbll.GetUserRole((int)item.userid).Contains("法制科科长"))
                            {
                                allmodel.fzjg = item.username;
                                allmodel.fzjgyj = item.content;
                                allmodel.fzjgtime = item.dealtime.ToString();
                            }
                            else if (item.wfdid == arritem.Value[3])
                            {
                                allmodel.shr = item.username;
                                allmodel.shryj = item.content;
                                allmodel.shrtime = item.dealtime.ToString();
                            }
                        }
                    }
                }

                #endregion
                Dictionary<string, string> dic = casesourcebll.ToWordPDF(dwmodel.filename, System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + dwmodel.filename + (allmodel.persontype == "type_zrr" ? "（个人）" : "（单位）") + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(allmodel));
                dwmodel.lastwordpath = dic["WordPath"];
                dwmodel.lastpdfpath = dic["PDFPath"];

                WfsasList.Add(dwmodel);
                casesourcebll.function_AddWfsas(WfsasList);
                #endregion

                return new
                {
                    msg = "上报成功",
                    resCode = 1
                };

            }
            catch (Exception)
            {

                return new
                   {
                       msg = "json数据不正确",
                       resCode = 0
                   };
            }


        }
        #endregion
        

        /// <summary>
        /// 一般案件处理列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetCaseList(int start, int limit, int userid, int status)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetCaseList(null, start, limit, userid, status, "2017030613400001");
        }

        /// <summary>
        /// 一般案件处理列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetCaseList(string filter, int start, int limit, int userid, int status)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetCaseList(filters, start, limit, userid, status, "2017030613400001");
        }

        /// <summary>
        /// 一般案件全部列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetAllCaseList(int start, int limit, int? XZID = null)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetAllCaseList(null, start, limit, "2017030613400001",XZID);
        }

        /// <summary>
        /// 一般案件全部列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetAllCaseList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetAllCaseList(filters, start, limit, "2017030613400001");
        }

        /// <summary>
        /// 获取历史环节
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<CaseWorkFlowOldModel> GetCaseOidList(string wfsid)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetCaseOidList(wfsid);
        }

        /// <summary>
        /// 获取历史文书
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<DocPageList> GetCaseDocList(string ddtablename, string wfsid, string wfsid2 = null)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetCaseDocList(ddtablename, wfsid, wfsid2);
        }

        /// <summary>
        /// 一般事件详情
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        public Case_CasesModel GetCaseModel(string wfsid)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetCaseModel(wfsid);

        }        

        /// <summary>
        /// 获取流程暂存信息
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public Doc_WfsasModel GetFlowSaveInfo(string wfsaid, int type)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetFlowSaveInfo(wfsaid, type);
        }

        /// <summary>
        /// 修改流程暂存信息
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        public int UpdateFlowSaveInfo(Doc_WfsasModel dwmodel)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.UpdateFlowSaveInfo(dwmodel);
        }

        /// <summary>
        /// 获取上报流程暂存信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Case_CasesModel GetSaveCommonCase(int? caseid,int? issave = null)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetSaveCommonCase(caseid, issave);
        }

        /// <summary>
        /// 获取文书下的案由编号
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Case_CasesModel GetCaseReasonNumber(int? caseid, string tablename)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetCaseReasonNumber(caseid, tablename);
        }

        /// <summary>
        /// 根据wfsid获取流程活动环节数量
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public int? GetWFSANumber(string wfsid)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetWFSANumber(wfsid);
        }

        /// <summary>
        /// 全部事件列表Api
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetAllCaseListApi(int start, int limit)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetAllCaseListApi(null, start, limit);
        }

        /// <summary>
        ///全部事件列表Api
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetAllCaseListApi(string filter, int start, int limit, int userid, int status)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetAllCaseListApi(filters, start, limit);
        }

        /// <summary>
        /// 获取数量
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<TotalAmountList> GetTotalAmount()
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            string json = bll.GetTotalAmount();
            List<TotalAmountList> jsonlist = JsonConvert.DeserializeObject<List<TotalAmountList>>(json);
            return jsonlist;
        }


        // api/CommonCase/ProcessIndex?wfid=2017030613400001&wfdid=2017030613500005
        /// <summary>
        /// 获取下一步流程
        /// </summary>
        /// <param name="wfid"></param>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        [HttpGet]
        public Casr_WorkFlowClass ProcessIndex(string wfid, string wfdid)
        {
            Case_WorkFlowManagerBLL cwbll = new Case_WorkFlowManagerBLL();
            return cwbll.ProcessIndex(wfid, wfdid);
        }

        /// <summary>
        /// 根据部门获取立案审批表序号
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetCaseDocumentNumberByUnitId(int unitid)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetCaseDocumentNumberByUnitId(unitid);
        }

        /// <summary>
        /// 获取对接过来的案由数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<InheritCaseSourceModel> GetInheritCaseSource(string powername = null)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetInheritCaseSource(powername);
        }

        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata,int userid,int status, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            Case_CasesBLL bll = new Case_CasesBLL();
            List<CaseList> list = bll.GetCaseListExcel(userid,status, filters);

            //获取导出的Excel表
            CommonFunctionBLL<CaseList> cfBll = new CommonFunctionBLL<CaseList>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }

        /// <summary>
        /// 全部事件列表Api
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetDateAllCaseListApi(int start, int limit)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetDateAllCaseListApi(null, start, limit);
        }
        /// <summary>
        ///全部事件列表Api
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CaseList>> GetDateAllCaseListApi(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetDateAllCaseListApi(filters, start, limit);
        }

        /// <summary>
        /// 手机端获取案由相关信息
        /// </summary>
        /// <param name="page"></param>
        /// <param name="count"></param>
        /// <param name="powername"></param>
        /// <returns></returns>
        public Paging<List<InheritCaseSourceModel>> GetInheritCaseSourceAPI(int page, int count, string powername = null)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            return bll.GetInheritCaseSourceAPI(page, count, powername);
        }
    }
}
