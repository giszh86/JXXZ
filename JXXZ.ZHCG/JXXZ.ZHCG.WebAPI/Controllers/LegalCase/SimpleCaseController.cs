using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
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
    public class SimpleCaseController : ApiController
    {
        /// <summary>
        /// 获取字典类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Case_ZdModel> GeDictoryType(string zd_type)
        {
            Case_ZdBLL bll = new Case_ZdBLL();
            return bll.GetZdList(zd_type);
        }

        /// <summary>
        /// 获取字典数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Case_ZdModel> GeDictoryData(string zd_type, string zd_id)
        {
            Case_ZdBLL bll = new Case_ZdBLL();
            return bll.GetZdListChild(zd_type, zd_id);
        }

        /// <summary>
        /// 新增案件登记
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddSimpleCase()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            Case_CaseSourcesBLL casesourcebll = new Case_CaseSourcesBLL();
            Case_SimpleCasesModel model = new Case_SimpleCasesModel();

            model.cfjdsbh = request["cfjdsbh"];
            model.casetypeid = request["casetypeid"];
            model.casename = request["casename"];
            model.qlsxid = request["qlsxid"];
            model.qlsx = request["qlsx"];
            model.casereason = request["casereason"];
            model.fromcasesource = request["fromcasesource"];
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
            model.p_cardnum = request["p_cardnum"];
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
            model.jktype = request["jktype"];
            if (!string.IsNullOrEmpty(request["fk_money"]))
                model.fk_money = Convert.ToDecimal(request["fk_money"]);
            model.bank_name = request["bank_name"];
            model.bank_account = request["bank_account"];
            model.bank_accountname = request["bank_accountname"];
            model.zfr_name = request["zfr_name"];
            model.zf_card = request["zf_card"];
            model.zf_time = Convert.ToDateTime(request["zf_time"]);
            model.zf_address = request["zf_address"];
            model.createuserid = Convert.ToInt32(request["userid"]);
            model.cswfsid = request["cswfsid"];
            if (!string.IsNullOrEmpty(request["tzcsid"]))
            {
                model.tzcsid = Convert.ToInt32(request["tzcsid"]);
            }

            model.isphone = 0;

            int caseid = bll.AddSimpleCases(model);

            Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
            Case_WorkFlowClass wf = new Case_WorkFlowClass();

            if (!string.IsNullOrEmpty(request["tzcsid"]))
            {
                casesourcebll.RegisterCaseSources(Convert.ToInt32(request["tzcsid"]));
            }

            #region 案件流程
            wf.FunctionName = "case_simplecases";
            wf.WFID = "2017022316200001";
            wf.WFDID = "2017022316250001";
            wf.NextWFDID = "2017022316250002";
            wf.NextWFUSERIDS = ""; //下一步流程ID
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]); //当前流程创建人
            wf.caseid = caseid;
            wf.casetype = 3;
            wf.casereason = model.casereason;
            #endregion

            string wf_data = wfbll.WF_Submit(wf);

            #region 简易案件文书
            List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
            Doc_WfsasModel dwmodel = new Doc_WfsasModel();

            dwmodel.wfsaid = wf_data.Split(new string[] { "wfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22);
            dwmodel.filetyoe = 3;
            dwmodel.ddid = 12;
            dwmodel.createuserid = Convert.ToInt32(request["userid"]);
            dwmodel.ddtablename = "case_simplecases";
            dwmodel.caseid = caseid;
            dwmodel.ddtableid = caseid;
            dwmodel.filename = "立案审批表";
            dwmodel.status = 0;

            //生成WORD、PDF文件
            DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
            Dictionary<string, string> dic = casesourcebll.ToWordPDF(dwmodel.filename, System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + dwmodel.filename + (model.persontype == "type_zrr" ? "（个人）" : "（单位）") + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(model));

            dwmodel.lastwordpath = dic["WordPath"];
            dwmodel.lastpdfpath = dic["PDFPath"];

            WfsasList.Add(dwmodel);
            casesourcebll.function_AddWfsas(WfsasList);
            #endregion
            #region 添加日志
            SystemLogBLL slbll = new SystemLogBLL();
            slbll.WriteSystemLog("简易案件", "", Convert.ToInt32(request["userid"]));
            #endregion
            
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true," + wf_data + "}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        /// <summary>
        /// 编辑简易案件
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditSimpleCase()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            Case_CaseSourcesBLL casesourcebll = new Case_CaseSourcesBLL();
            Case_SimpleCasesModel model = bll.GetSimpleCaseList(Convert.ToInt32(request["simpleid"]));

            model.cfjdsbh = request["cfjdsbh"];
            model.casetypeid = request["casetypeid"];
            model.casesourcename = request["casesourcename"];
            model.casename = request["casename"];
            model.qlsxid = request["qlsxid"];
            model.qlsx = request["qlsx"];
            model.casereason = request["casereason"];
            model.fromcasesource = request["fromcasesource"];
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
            model.p_cardnum = request["p_cardnum"];
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
            model.jktype = request["jktype"];
            if (!string.IsNullOrEmpty(request["fk_money"]))
                model.fk_money = Convert.ToDecimal(request["fk_money"]);
            model.bank_name = request["bank_name"];
            model.bank_account = request["bank_account"];
            model.bank_accountname = request["bank_accountname"];
            model.zfr_name = request["zfr_name"];
            model.zf_card = request["zf_card"];
            model.zf_time = Convert.ToDateTime(request["zf_time"]);
            model.zf_address = request["zf_address"];
            model.createuserid = Convert.ToInt32(request["userid"]);
            model.cswfsid = request["cswfsid"];
            model.isphone = 0;

            bll.EditSimpleCases(model);

            #region 简易案件文书
            //生成WORD、PDF文件
            DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
            Dictionary<string, string> dic = casesourcebll.ToWordPDF("立案审批表", System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + "立案审批表" + (model.persontype == "type_zrr" ? "（个人）" : "（单位）") + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(model));

            Doc_WfdddrsBLL dwbll = new Doc_WfdddrsBLL();
            int result = dwbll.EditWFSASModel(Convert.ToInt32(request["dwfsasid"]), dic["WordPath"], dic["PDFPath"], Convert.ToInt32(request["userid"]));
            #endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        /// <summary>
        /// 新增案件文书
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddSimpleCaseDocument()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            HttpFileCollectionBase files = request.Files;
            List<Doc_WfsasModel> list = new List<Doc_WfsasModel>();
            Doc_WfsasModel dwmodel = new Doc_WfsasModel();
            if (files != null && files.Count > 0)
            {
                FileUploadClass fileClass = new FileUploadClass();
                if (files["file"].ContentLength != 0)
                {
                    fileClass = FileHelper.UploadFile(files["file"], ConfigManageClass.LegalCasePath);
                    if (!string.IsNullOrEmpty(request.Form["caseid"]))
                        dwmodel.caseid = Convert.ToInt32(request.Form["caseid"]);
                    dwmodel.filename = fileClass.OriginalName;
                    dwmodel.filepath = fileClass.OriginalPath;
                    dwmodel.createtime = DateTime.Now;
                    dwmodel.createuserid = Convert.ToInt32(request.Form["userid"]);
                    list.Add(dwmodel);
                }
            }

            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            bll.function_AddWfsas(list);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        /// <summary>
        /// 简易案件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_SimpleCasesModel>> GetSimpleCaseList(int start, int limit)
        {
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            return bll.GetSimpleCaseList(null, start, limit);
        }

        //  /api/SimpleCase/GetSimpleCaseModel?simpleid=134
        /// <summary>
        /// 简易案件详情
        /// </summary>
        /// <param name="simpleid"></param>
        /// <returns></returns>
        [HttpGet]
        public Case_SimpleCasesModel GetSimpleCaseModel(int simpleid)
        {
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            return bll.GetSimpleCaseList(simpleid);
        }

        /// <summary>
        /// 简易案件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_SimpleCasesModel>> GetSimpleCaseList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            return bll.GetSimpleCaseList(filters, start, limit);
        }

        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            List<Case_SimpleCasesModel> list = bll.GetSimpleCaseListExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<Case_SimpleCasesModel> cfBll = new CommonFunctionBLL<Case_SimpleCasesModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }



        #region API

        // /api/SimpleCase/AddSimpleCaseApi
        /// <summary>
        /// 新增案件登记
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public object AddSimpleCaseApi(Case_SimpleCasesModel csmodel)
        {
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            Case_CaseSourcesBLL casesourcebll = new Case_CaseSourcesBLL();
            Case_SimpleCasesModel model = new Case_SimpleCasesModel();

            #region 图片处理
            List<FileClass> List_FC = new List<FileClass>();
            string OriginPath = ConfigManageClass.LegalCasePath;
            string smallPath = ConfigManageClass.LegalCasePath;
            if (csmodel.uploadpanelValue != null)
            {
                for (int i = 0; i < csmodel.uploadpanelValue.Length; i++)
                {
                    string imgArray = csmodel.uploadpanelValue[i];
                    string[] spilt = imgArray.Split(',');
                    if (spilt.Length > 0)
                    {
                        byte[] imgByte = Convert.FromBase64String(spilt[1]);
                        FileClass imgFile = FileFactory.FileUpload(imgByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(imgFile);
                    }
                }
            }

            #endregion

            try
            {
                model.cfjdsbh = csmodel.cfjdsbh;
                model.casetypeid = csmodel.casetypeid;
                model.casename = csmodel.casename;
                model.qlsxid = csmodel.qlsxid;
                model.qlsx = csmodel.qlsx;
                model.casereason = csmodel.casereason;
                model.caseaddress = csmodel.caseaddress;
                model.sitedatetime = csmodel.sitedatetime;
                model.geographical84 = csmodel.geographical84;
                model.persontype = csmodel.persontype;
                if (csmodel.persontype == "type_zrr")
                {
                    model.p_name = csmodel.p_name;
                    model.f_card = csmodel.p_cardnum;

                }
                else
                {
                    model.f_card = csmodel.f_cardnum;
                    model.f_name = csmodel.f_name;
                    model.f_dbr = csmodel.f_dbr;
                    model.f_cardnum = csmodel.f_card;

                }

                model.p_sex = csmodel.p_sex;
                model.p_cardtype = csmodel.p_cardtype;
                model.f_cardtype = csmodel.p_cardtype;
                model.p_cardnum = csmodel.p_cardnum;
                model.f_wtr = csmodel.f_wtr;
                model.contactphone = csmodel.contactphone;
                model.contactaddress = csmodel.contactaddress;
                model.flfg = csmodel.flfg;
                model.clyj = csmodel.clyj;
                model.wfqx = csmodel.wfqx;
                model.cf = csmodel.cf;
                model.casecontent = csmodel.casecontent;
                model.jktype = csmodel.jktype;
                model.fk_money = csmodel.fk_money;
                model.bank_name = csmodel.bank_name;
                model.bank_account = csmodel.bank_account;
                model.bank_accountname = csmodel.bank_accountname;
                model.zfr_name = csmodel.zfr_name;
                model.zf_card = csmodel.zf_card;
                model.zf_time = csmodel.zf_time;
                model.zf_address = csmodel.zf_address;
                model.createuserid = csmodel.createuserid;

                model.isphone = 1;



                int simpleid = bll.AddSimpleCases(model);

                Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
                Case_WorkFlowClass wf = new Case_WorkFlowClass();

                #region 案件流程
                wf.FunctionName = "case_sources";
                wf.WFID = "2017022219210001";
                wf.WFDID = "2017022219200001";
                wf.NextWFDID = "2017022219200002";
                wf.NextWFUSERIDS = ""; //下一步流程ID           
                wf.IsSendMsg = "false"; //是否发送短信
                wf.casereason = csmodel.casereason;
                wf.WFCreateUserID = csmodel.createuserid; //当前流程创建人
                wf.casetype = 3;
                wf.caseid = simpleid;
                #endregion

                string wf_data = wfbll.WF_Submit(wf);

                #region 简易案件文书
                List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
                Doc_WfsasModel dwmodel = new Doc_WfsasModel();

                dwmodel.wfsaid = wf_data.Split(new string[] { "wfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22);
                dwmodel.filetyoe = 3;
                dwmodel.ddid = 12;
                dwmodel.createuserid = csmodel.createuserid;
                dwmodel.ddtablename = "case_simplecases";
                dwmodel.caseid = simpleid;
                dwmodel.ddtableid = simpleid;
                dwmodel.filename = "立案审批表";
                dwmodel.status = 0;

                //生成WORD、PDF文件
                DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
                Dictionary<string, string> dic = casesourcebll.ToWordPDF(dwmodel.filename, System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + dwmodel.filename + (model.persontype == "type_zrr" ? "（个人）" : "（单位）") + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(model));

                dwmodel.lastwordpath = dic["WordPath"];
                dwmodel.lastpdfpath = dic["PDFPath"];

                WfsasList.Add(dwmodel);
                casesourcebll.function_AddWfsas(WfsasList);
                #endregion


                #region 手机端上报图片文书
                int i = 0;
                Dictionary<string, string> imgdic = new Dictionary<string, string>();
                string abspath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/图片模板.docx");
                foreach (var item in List_FC)
                {
                    imgdic.Add(i.ToString(), OriginPath + item.OriginalPath);
                    i++;
                }
                casesourcebll.ImagesToWordPDF(dwmodel.filename, abspath, ConfigManageClass.LegalCasePath, imgdic);

                #endregion

                #region 添加日志
                SystemLogBLL slbll = new SystemLogBLL();
                slbll.WriteSystemLog("简易案件", "", csmodel.createuserid);
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
    }
}
