using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.WorkFlowManagerBLL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Reflection.Emit;
using System.Runtime.Remoting;
using System.Text;
using System.Web;
using System.Web.Compilation;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Common
{
    public class CommonController : ApiController
    {
        [HttpPost]
        public string UploadFile()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            FileUploadClass fileClass = new FileUploadClass();
            fileClass.success = false;
            if (request != null && request.Files.Count > 0)
            {
                string path = request.Form["path"];
                if (!string.IsNullOrEmpty(path))
                {
                    HttpPostedFileBase file = request.Files[0];
                    fileClass = FileHelper.UploadFile(file, path);
                }
            }
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(fileClass);
            //  return "{\"success\":true,\"OriginalPath:\"" + fileClass.OriginalPath + "\",\"OriginalName:\"" + fileClass.OriginalName + "\",\"OriginalType\":" + fileClass.OriginalType + "\"}";
            return json;

        }

        /// <summary>
        /// 新增文书
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCaseDocument(DocumentForm model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
            //是否有已暂存的信息
            Case_CasesBLL ccbll = new Case_CasesBLL();
            Doc_WfsasModel dwmodel = ccbll.GetFlowSaveInfo(model.wfsaid, 0) == null ? new Doc_WfsasModel() : ccbll.GetFlowSaveInfo(model.wfsaid, 0);

            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            Dictionary<string, string> uploaddic = new Dictionary<string, string>();
            Dictionary<string, string> dic = new Dictionary<string, string>();
            string[] fileClass = model.uploadpanelValue;
            List<DocumentWPQD> goodsClass = model.goodsValue;

            dwmodel.wfsaid = model.wfsaid;
            dwmodel.filetyoe = model.actiontype;
            dwmodel.ddid = model.ddid;
            dwmodel.createuserid = model.userid;
            dwmodel.ddtablename = model.sourcetable;
            dwmodel.caseid = model.caseid;
            dwmodel.ddtableid = model.caseid;
            dwmodel.filename = model.documentname;
            dwmodel.status = 0;

            if (model.actiontype != 3)
            {
                if (fileClass != null && fileClass.Length > 0)
                {
                    int i = 0;
                    foreach (var item in fileClass)
                    {
                        JObject jo = new JObject();
                        jo = (JObject)JsonConvert.DeserializeObject(item);
                        string OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                        string OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                        string OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                        double size = jo["size"] == null ? 0 : (double)jo["size"];
                        uploaddic.Add(i.ToString(), ConfigManageClass.LegalCasePath + OriginalPath);
                        i++;
                    }
                    if (dwmodel.filetyoe == 1)
                    {
                        dic = ImagesToWordPDF(dwmodel.filename, ConfigManageClass.LegalCasePath, uploaddic);
                        dwmodel.lastwordpath = dic["WordPath"];
                        dwmodel.lastpdfpath = dic["PDFPath"];
                    }
                    else if (dwmodel.filetyoe == 2)
                    {
                        dic = WordToPDF(dwmodel.filename, ConfigManageClass.LegalCasePath, uploaddic.FirstOrDefault().Value);
                        dwmodel.lastpdfpath = dic["PDFPath"];
                    }
                    else
                    {
                        //增加文书模版
                        Doc_DefinitionsBLL ddbll = new Doc_DefinitionsBLL();
                        Doc_DefinitionsModel ddmodel = new Doc_DefinitionsModel();
                        ddmodel.ddname = request["wsmc"];
                        ddmodel.isunique = 0;
                        ddmodel.ddstate = 2;
                        ddmodel.createtime = DateTime.Now;
                        ddmodel.createuserid = model.userid;
                        int nowddid = ddbll.AddDefinition(ddmodel);

                        dic = ImagesToWordPDF(dwmodel.filename, ConfigManageClass.LegalCasePath, uploaddic);
                        dwmodel.lastwordpath = dic["WordPath"];
                        dwmodel.lastpdfpath = dic["PDFPath"];
                        dwmodel.ddid = nowddid;
                        dwmodel.filetyoe = 1;
                        dwmodel.filename = request["wsmc"];
                    }
                    WfsasList.Add(dwmodel);
                    bll.function_AddWfsas(WfsasList);
                }
            }
            else
            {
                //新增文书数据和替换文本
                DocumentAction(dwmodel, WfsasList, dic, fileClass, goodsClass);
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        /// <summary>
        /// 编辑文书
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditCaseDocument(DocumentForm model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
            //是否有已暂存的信息
            Case_CasesBLL ccbll = new Case_CasesBLL();
            Doc_WfsasModel dwmodel = ccbll.EditDoc(Convert.ToInt32(request["dwfsasid"]));

            Dictionary<string, string> dic = new Dictionary<string, string>();
            string[] fileClass = model.uploadpanelValue;
            List<DocumentWPQD> goodsClass = model.goodsValue;
            int? status = 0;

            //编辑文书数据和替换文本
            DocumentAction(dwmodel, WfsasList, dic, fileClass, goodsClass, status);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        /// <summary>
        /// 文书操作
        /// </summary>
        /// <returns></returns>
        private void DocumentAction(Doc_WfsasModel dwmodel, List<Doc_WfsasModel> WfsasList, Dictionary<string, string> dic, string[] fileClass, List<DocumentWPQD> goodsClass, int? status = null)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
            Dictionary<string, string> indic = new Dictionary<string, string>();
            List<Dictionary<string, string>> imgdic = null;
            List<DocumentWPQDdt> goodsdtlist = new List<DocumentWPQDdt>();

            if (status != null && !string.IsNullOrEmpty(request.Form["dwfsasid"]))
            {
                //查询环节文书详情                
                dwmodel.createuserid = Convert.ToInt32(request.Form["edituserid"]);
                dwmodel.createtime = DateTime.Now;
                dwmodel.status = 0;

                //改变doc_wfsas的状态
                drhbll.EditDocumentStatus(Convert.ToInt32(request.Form["dwfsasid"]), 1);
            }

            int? strlength = null;
            int documentid = 0;
            switch (dwmodel.filename)
            {
                case "现场检查（勘验）笔录":
                    #region 现场检查（勘验）笔录 数据
                    DocumentXCJCKYBL xcjckybl = new DocumentXCJCKYBL();
                    xcjckybl.jcdate = request.Form["jcdate"];
                    xcjckybl.sjctime = request.Form["sjctime"];
                    xcjckybl.ejctime = request.Form["ejctime"];
                    xcjckybl.jcplace = request.Form["jcplace"];
                    xcjckybl.zkyr = request.Form["zkyr"];
                    xcjckybl.zdwzw = request.Form["zdwzw"];
                    xcjckybl.xkyr = request.Form["xkyr"];
                    xcjckybl.xdwzw = request.Form["xdwzw"];
                    xcjckybl.dsr = request.Form["dsr"];
                    xcjckybl.dsrdwzw = request.Form["dsrdwzw"];
                    xcjckybl.xcfzr = request.Form["xcfzr"];
                    xcjckybl.xcdwzw = request.Form["xcdwzw"];
                    xcjckybl.byqr = request.Form["byqr"];
                    xcjckybl.byqdwzw = request.Form["byqdwzw"];
                    xcjckybl.jlr = request.Form["jlr"];
                    xcjckybl.jlrdwzw = request.Form["jlrdwzw"];
                    xcjckybl.zzfry = request.Form["zzfry"];
                    xcjckybl.xzfry = request.Form["xzfry"];
                    xcjckybl.zzjhm = request.Form["zzjhm"];
                    xcjckybl.xzjhm = request.Form["xzjhm"];
                    xcjckybl.xcqk = request.Form["xcqk"];
                    xcjckybl.jzr = request.Form["jzr"];

                    documentid = drhbll.AddDocumentBySQL("temp_xcjckybl", xcjckybl);
                    indic = drhbll.GetDocumentDictory(xcjckybl);
                    #endregion
                    break;
                case "调 查（询 问）笔 录":
                    #region 调 查（询 问）笔 录 数据
                    DocumentDCXWBL dcxwbl = new DocumentDCXWBL();
                    dcxwbl.dcdate = request.Form["dcdate"];
                    dcxwbl.casereason = request.Form["casereason"];
                    dcxwbl.sdctime = request.Form["sdctime"];
                    dcxwbl.edctime = request.Form["edctime"];
                    dcxwbl.dcplace = request.Form["dcplace"];
                    dcxwbl.bdcuser = request.Form["bdcuser"];
                    dcxwbl.sex = request.Form["sex"];
                    dcxwbl.mz = request.Form["mz"];
                    dcxwbl.sfz = request.Form["sfz"];
                    dcxwbl.gzdw = request.Form["gzdw"];
                    dcxwbl.zwzy = request.Form["zwzy"];
                    dcxwbl.phone = request.Form["phone"];
                    dcxwbl.address = request.Form["address"];
                    dcxwbl.zipcode = request.Form["zipcode"];
                    dcxwbl.ybagx = request.Form["ybagx"];
                    dcxwbl.zdcxwr = request.Form["zdcxwr"];
                    dcxwbl.zzfzh = request.Form["zzfzh"];
                    dcxwbl.xdcxwr = request.Form["xdcxwr"];
                    dcxwbl.xzfzh = request.Form["xzfzh"];
                    dcxwbl.jlperson = request.Form["jlperson"];
                    dcxwbl.zcperson = request.Form["zcperson"];
                    dcxwbl.sfqr = request.Form["sfqr"];
                    dcxwbl.sfhb = request.Form["sfhb"];
                    dcxwbl.sftq = request.Form["sftq"];
                    dcxwbl.remark = request.Form["remark"];

                    documentid = drhbll.AddDocumentBySQL("temp_dcxwbl", dcxwbl);
                    indic = drhbll.GetDocumentDictory(dcxwbl);
                    #endregion
                    break;
                case "行政处罚事先告知书":
                    #region 行政处罚事先告知书 数据
                    strlength = 1;
                    DocumentXZCFSXGZS xzcfsxgzs = new DocumentXZCFSXGZS();
                    xzcfsxgzs.wsbh = request.Form["wsbh"];
                    xzcfsxgzs.dsr = request.Form["dsr"];
                    xzcfsxgzs.gzszw = request.Form["gzszw"];
                    xzcfsxgzs.dwdz = request.Form["dwdz"];
                    xzcfsxgzs.yzbm = request.Form["yzbm"];
                    xzcfsxgzs.lxr = request.Form["lxr"];
                    xzcfsxgzs.lxdh = request.Form["lxdh"];

                    documentid = drhbll.AddDocumentBySQL("temp_xzcfsxgzs", xzcfsxgzs);
                    indic = drhbll.GetDocumentDictory(xzcfsxgzs);
                    #endregion
                    break;
                case "行政处罚决定书":
                    #region 行政处罚决定书 数据
                    strlength = 1;
                    DocumentXZCFJDS xzcfjds = new DocumentXZCFJDS();
                    xzcfjds.wsbh = request.Form["wsbh"];
                    xzcfjds.dsr = request.Form["dsr"];
                    xzcfjds.xb = request.Form["xb"];
                    xzcfjds.zjlx = request.Form["zjlx"];
                    xzcfjds.zjh = request.Form["zjh"];
                    xzcfjds.dwmc = request.Form["dwmc"];
                    xzcfjds.fddbr = request.Form["fddbr"];
                    xzcfjds.address = request.Form["address"];
                    xzcfjds.jdszw = request.Form["jdszw"];

                    documentid = drhbll.AddDocumentBySQL("temp_xzcfjds", xzcfjds);
                    indic = drhbll.GetDocumentDictory(xzcfjds, request["persontype"]);
                    #endregion
                    break;
                case "照片（图片、影像资料）证据":
                    #region 照片（图片、影像资料）证据 数据
                    DocumentZPZJ zpzj = new DocumentZPZJ();
                    zpzj.smfywt = request.Form["smfywt"];
                    zpzj.psdd = request.Form["psdd"];
                    zpzj.psr = request.Form["psr"];
                    zpzj.dsrhjzr = request.Form["dsrhjzr"];
                    zpzj.zfry1 = request.Form["zfry1"];
                    zpzj.zfzh1 = request.Form["zfzh1"];
                    zpzj.zfry2 = request.Form["zfry2"];
                    zpzj.zfzh2 = request.Form["zfzh2"];
                    zpzj.pssj = request.Form["pssj"];
                    zpzj.remark = request.Form["remark"];

                    documentid = drhbll.AddDocumentBySQL("temp_zpzj", zpzj);
                    indic = drhbll.GetDocumentDictory(zpzj);

                     #region 添加文书附件
                    if ((fileClass != null && fileClass.Length > 0) || status != null)
                    {
                        imgdic = new List<Dictionary<string, string>>();
                        if (fileClass != null && fileClass.Length > 0)
                        {
                            foreach (var item in fileClass)
                            {
                                JObject jo = new JObject();
                                jo = (JObject)JsonConvert.DeserializeObject(item);
                                string OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                                string OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                                string OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                                double size = jo["size"] == null ? 0 : (double)jo["size"];
                                Dictionary<string, string> imgdicc = new Dictionary<string, string>();
                                imgdicc.Add("$图片$", ConfigManageClass.LegalCasePath + OriginalPath);
                                imgdic.Add(imgdicc);

                                DocumentFileModel filemodel = new DocumentFileModel();
                                filemodel.documentid = documentid;
                                filemodel.documenttype = "temp_zpzj";
                                filemodel.filename = OriginalName;
                                filemodel.filepath = OriginalPath;
                                filemodel.filetype = OriginalType;
                                filemodel.filesize = size;
                                drhbll.AddDocumentFiles(filemodel);
                            }
                        }
                        if (status != null)
                        {
                            List<DocumentFileModel> dflist = drhbll.GetDocumentFiles((int)dwmodel.documentid, "temp_zpzj");//获取文书附件
                            if (dflist != null)
                            {
                                foreach (var item in dflist)
                                {
                                    Dictionary<string, string> imgdicc = new Dictionary<string, string>();
                                    imgdicc.Add("$图片$", ConfigManageClass.LegalCasePath + item.filepath);
                                    imgdic.Add(imgdicc);

                                    DocumentFileModel filemodel = new DocumentFileModel();
                                    filemodel.documentid = documentid;
                                    filemodel.documenttype = "temp_zpzj";
                                    filemodel.filename = item.filename;
                                    filemodel.filepath = item.filepath;
                                    filemodel.filetype = item.filetype;
                                    filemodel.filesize = item.filesize;
                                    drhbll.AddDocumentFiles(filemodel);
                                }
                            }
                        }
                    }else
                        indic.Add("$图片$", "");

                    #endregion
                    #endregion
                    break;
                case "责令停止违法行为通知书":
                    #region 责令停止违法行为通知书 数据
                    DocumentZLTZWFXWTZS zltzwfxwtzs = new DocumentZLTZWFXWTZS();
                    zltzwfxwtzs.wsbh = request.Form["wsbh"];
                    zltzwfxwtzs.dsr = request.Form["dsr"];
                    zltzwfxwtzs.afsj = request.Form["afsj"];
                    zltzwfxwtzs.afdz = request.Form["afdz"];
                    zltzwfxwtzs.wfxw = request.Form["wfxw"];
                    zltzwfxwtzs.wfgd = request.Form["wfgd"];
                    zltzwfxwtzs.zfry1 = request.Form["zfry1"];
                    zltzwfxwtzs.zfzh1 = request.Form["zfzh1"];
                    zltzwfxwtzs.zfry2 = request.Form["zfry2"];
                    zltzwfxwtzs.zfzh2 = request.Form["zfzh2"];
                    zltzwfxwtzs.lxdh = request.Form["lxdh"];
                    zltzwfxwtzs.lxdz = request.Form["lxdz"];

                    documentid = drhbll.AddDocumentBySQL("temp_zltzwfxwtzs", zltzwfxwtzs);
                    indic = drhbll.GetDocumentDictory(zltzwfxwtzs);
                    #endregion
                    break;
                case "询问（调查）通知书":
                    #region 询问（调查）通知书 数据
                    DocumentXWDCTZS xwdctzs = new DocumentXWDCTZS();
                    xwdctzs.wsbh = request.Form["wsbh"];
                    xwdctzs.dsr = request.Form["dsr"];
                    xwdctzs.afsj = request.Form["afsj"];
                    xwdctzs.afdd = request.Form["afdd"];
                    xwdctzs.dcxwsj = request.Form["dcxwsj"];
                    xwdctzs.dcxwdd = request.Form["dcxwdd"];
                    xwdctzs.wfgd = request.Form["wfgd"];
                    xwdctzs.clsfz = request.Form["clsfz"];
                    xwdctzs.clyyzz = request.Form["clyyzz"];
                    xwdctzs.clsfzmhwts = request.Form["clsfzmhwts"];
                    xwdctzs.clqtzm = request.Form["clqtzm"];
                    xwdctzs.lxr = request.Form["lxr"];
                    xwdctzs.lxdh = request.Form["lxdh"];
                    xwdctzs.lxdz = request.Form["lxdz"];
                    xwdctzs.fcrq = request.Form["fcrq"];

                    documentid = drhbll.AddDocumentBySQL("temp_xwdctzs", xwdctzs);
                    indic = drhbll.GetDocumentDictory(xwdctzs);
                    #endregion
                    break;
                case "函告书":
                    #region 函告书
                    strlength = 1;
                    DocumentHGS hgs = new DocumentHGS();
                    hgs.dsr = request.Form["dsr"];
                    hgs.hgsj = request.Form["hgsj"];
                    hgs.lxr = request.Form["lxr"];
                    hgs.lxdh = request.Form["lxdh"];
                    hgs.lxdz = request.Form["lxdz"];
                    hgs.nrsm = request.Form["nrsm"];
                    documentid = drhbll.AddDocumentBySQL("temp_hgs", hgs);
                    indic = drhbll.GetDocumentDictory(hgs);
                    #endregion
                    break;
                case "罚款催缴通知书":
                    #region 罚款催缴通知书
                    DocumentFKCJTZS fkcjtzs = new DocumentFKCJTZS();
                    fkcjtzs.wsbh = request.Form["wsbh"];
                    fkcjtzs.dsr = request.Form["dsr"];
                    fkcjtzs.cfrq = request.Form["cfrq"];
                    fkcjtzs.xzcfjdsbh = request.Form["xzcfjdsbh"];
                    fkcjtzs.gdjkrq = request.Form["gdjkrq"];
                    fkcjtzs.yhzh = request.Form["yhzh"];
                    documentid = drhbll.AddDocumentBySQL("temp_fkcjtzs", fkcjtzs);
                    indic = drhbll.GetDocumentDictory(fkcjtzs);
                    #endregion
                    break;
                case "执法文书送达回证":
                    #region 执法文书送达回证
                    DocumentZFWSSDHZ zfwssdhz = new DocumentZFWSSDHZ();
                    zfwssdhz.ssdrmchxm = request.Form["ssdrmchxm"];
                    zfwssdhz.wsbh = request.Form["wsbh"];
                    zfwssdhz.sdwsmcjwh = request.Form["sdwsmcjwh"];
                    zfwssdhz.sdrq = request.Form["sdrq"];
                    zfwssdhz.sddd = request.Form["sddd"];
                    zfwssdhz.sdfs = request.Form["sdfs"];
                    zfwssdhz.bz = request.Form["bz"];
                    documentid = drhbll.AddDocumentBySQL("temp_zfwssdhz", zfwssdhz);
                    indic = drhbll.GetDocumentDictory(zfwssdhz);
                    #endregion
                    break;
                case "行政处罚集体讨论记录":
                    #region 行政处罚集体讨论记录
                    strlength = 1;
                    DocumentXZCFJTTLJL xzcfjttljl = new DocumentXZCFJTTLJL();
                    xzcfjttljl.ajmc = request.Form["ajmc"];
                    xzcfjttljl.kssj = request.Form["kssj"];
                    xzcfjttljl.jssj = request.Form["jssj"];
                    xzcfjttljl.dd = request.Form["dd"];
                    xzcfjttljl.zcr = request.Form["zcr"];
                    xzcfjttljl.hbr = request.Form["hbr"];
                    xzcfjttljl.jlr = request.Form["jlr"];
                    xzcfjttljl.cxryxmjzw = request.Form["cxryxmjzw"];
                    xzcfjttljl.tlnr = request.Form["tlnr"];
                    xzcfjttljl.tljl = request.Form["tljl"];
                    xzcfjttljl.zjxyj = request.Form["zjxyj"];

                    documentid = drhbll.AddDocumentBySQL("temp_xzcfjttljl", xzcfjttljl);
                    indic = drhbll.GetDocumentDictory(xzcfjttljl);
                    #endregion
                    break;
                case "责令（限期）整改指令书":
                    #region 责令（限期）整改指令书
                    strlength = 1;
                    DocumentZLXQZGZLS zlxqzgzls = new DocumentZLXQZGZLS();
                    zlxqzgzls.wjbh = request.Form["wjbh"];
                    zlxqzgzls.dsr = request.Form["dsr"];
                    zlxqzgzls.wtms = request.Form["wtms"];
                    zlxqzgzls.zfdy1 = request.Form["zfdy1"];
                    zlxqzgzls.zfzh1 = request.Form["zfzh1"];
                    zlxqzgzls.zfdy2 = request.Form["zfdy2"];
                    zlxqzgzls.zfzh2 = request.Form["zfzh2"];

                    documentid = drhbll.AddDocumentBySQL("temp_zlxqzgzls", zlxqzgzls);
                    indic = drhbll.GetDocumentDictory(zlxqzgzls);
                    #endregion
                    break;
                case "案件移送函":
                    #region 案件移送函
                    strlength = 1;
                    DocumentAJYSH ajysh = new DocumentAJYSH();
                    ajysh.wsbh = request.Form["wsbh"];
                    ajysh.dsr = request.Form["dsr"];
                    ajysh.lasj = request.Form["lasj"];
                    ajysh.ay = request.Form["ay"];
                    ajysh.ysly = request.Form["ysly"];
                    ajysh.yjdflgd = request.Form["yjdflgd"];
                    ajysh.ajxgzl = request.Form["ajxgzl"];
                    ajysh.ysrq = request.Form["ysrq"];

                    documentid = drhbll.AddDocumentBySQL("temp_ajysh", ajysh);
                    indic = drhbll.GetDocumentDictory(ajysh);
                    #endregion
                    break;
                case "移送案件涉案物品清单":
                    #region 移送案件涉案物品清单数据
                    strlength = 1;
                    DocumentYSAJSAWPQD ysajsawpqd = new DocumentYSAJSAWPQD();
                    ysajsawpqd.ysdw = request.Form["ysdw"];
                    ysajsawpqd.ysajjsr = request.Form["ysajjsr"];
                    ysajsawpqd.jssj = request.Form["jssj"];
                    ysajsawpqd.ysajysr = request.Form["ysajysr"];
                    ysajsawpqd.yssj = request.Form["yssj"];

                    documentid = drhbll.AddDocumentBySQL("temp_ysajsawpqd", ysajsawpqd);

                    //物品清单
                    foreach (DocumentWPQD good in goodsClass)
                    {
                        good.id = 0;
                        good.documentid = documentid;
                        good.documentname = "temp_ysajsawpqd";
                        drhbll.AddDocumentBySQL("temp_goods", good);

                        //物品清单dt
                        DocumentWPQDdt goodsdt = new DocumentWPQDdt();
                        goodsdt.goodsname = good.goodsname;
                        goodsdt.goodscount = good.goodscount;
                        goodsdt.goodspj = good.goodspj;
                        goodsdt.goodsgg = good.goodsgg;
                        goodsdt.goodsxh = good.goodsxh;
                        goodsdt.goodsxt = good.goodsxt;
                        goodsdt.goodsremark = good.goodsremark;
                        goodsdtlist.Add(goodsdt);
                    }

                    indic = drhbll.GetDocumentDictory(ysajsawpqd);
                    #endregion
                    break;
                case "责令（限期）改正通知书":
                    #region 责令（限期）改正通知书
                    strlength = 1;
                    DocumentZLXQGZTZS zlxqgztzs = new DocumentZLXQGZTZS();
                    zlxqgztzs.wsbh = request.Form["wsbh"];
                    zlxqgztzs.dsr = request.Form["dsr"];
                    zlxqgztzs.afsj = request.Form["afsj"];
                    zlxqgztzs.afdz = request.Form["afdz"];
                    zlxqgztzs.wfxw = request.Form["wfxw"];
                    zlxqgztzs.flyj = request.Form["flyj"];
                    zlxqgztzs.zfzh2 = request.Form["zfzh2"];
                    zlxqgztzs.gznr = request.Form["gznr"];
                    zlxqgztzs.zlgzqx = request.Form["zlgzqx"];
                    zlxqgztzs.tzsj = request.Form["tzsj"];
                    zlxqgztzs.zfry1 = request.Form["zfry1"];
                    zlxqgztzs.zfzh1 = request.Form["zfzh1"];
                    zlxqgztzs.zfry2 = request.Form["zfry2"];
                    zlxqgztzs.zfzh2 = request.Form["zfzh2"];
                    zlxqgztzs.lxdh = request.Form["lxdh"];
                    zlxqgztzs.lxdz = request.Form["lxdz"];
                    documentid = drhbll.AddDocumentBySQL("temp_zlxqgztzs", zlxqgztzs);
                    indic = drhbll.GetDocumentDictory(zlxqgztzs);
                    #endregion
                    break;
                case "调查取证联系函":
                    #region 调查取证联系函
                    strlength = 1;
                    DocumentDCQZLXH dcqzlxh = new DocumentDCQZLXH();
                    dcqzlxh.wsbh = request.Form["wsbh"];
                    dcqzlxh.qhbm = request.Form["qhbm"];
                    dcqzlxh.cbbm = request.Form["cbbm"];
                    dcqzlxh.lxdh = request.Form["lxdh"];
                    dcqzlxh.lxr = request.Form["lxr"];
                    dcqzlxh.ajjbqk = request.Form["ajjbqk"];
                    dcqzlxh.qhrq = request.Form["qhrq"];
                    documentid = drhbll.AddDocumentBySQL("temp_dcqzlxh", dcqzlxh);
                    indic = drhbll.GetDocumentDictory(dcqzlxh);
                    #endregion
                    break;
                case "听  证  报  告":
                    #region 听证报告
                    strlength = 1;
                    DocumentTZBG tzbg = new DocumentTZBG();
                    tzbg.ajmc = request.Form["ajmc"];
                    tzbg.ajbh = request.Form["ajbh"];
                    tzbg.tzrq = request.Form["tzrq"];
                    tzbg.tzstime = request.Form["tzstime"];
                    tzbg.tzetime = request.Form["tzetime"];
                    tzbg.tzdd = request.Form["tzdd"];
                    tzbg.tzfs = request.Form["tzfs"];
                    tzbg.tzzcr1 = request.Form["tzzcr1"];
                    tzbg.tzy1 = request.Form["tzy1"];
                    tzbg.jlr = request.Form["jlr"];
                    tzbg.tzsqr = request.Form["tzsqr"];
                    tzbg.fddbr = request.Form["fddbr"];
                    tzbg.wtdlr = request.Form["wtdlr"];
                    tzbg.ajdcr = request.Form["ajdcr"];
                    tzbg.gzdw = request.Form["gzdw"];
                    tzbg.tzhjbqk = request.Form["tzhjbqk"];
                    tzbg.ajss = request.Form["ajss"];
                    tzbg.clyjjjy = request.Form["clyjjjy"];
                    tzbg.tzzcr2 = request.Form["tzzcr2"];
                    tzbg.tzy2 = request.Form["tzy2"];
                    documentid = drhbll.AddDocumentBySQL("temp_tzbg", tzbg);
                    indic = drhbll.GetDocumentDictory(tzbg);
                    #endregion
                    break;
                case "听  证  笔  录":
                    #region 听证笔录
                    strlength = 1;
                    DocumentTZBL tzbl = new DocumentTZBL();
                    tzbl.ajmc = request.Form["ajmc"];
                    tzbl.ajbh = request.Form["ajbh"];
                    tzbl.tzrq = request.Form["tzrq"];
                    tzbl.tzkssj = request.Form["tzkssj"];
                    tzbl.tzjssj = request.Form["tzjssj"];
                    tzbl.tzdd = request.Form["tzdd"];
                    tzbl.tzfs = request.Form["tzfs"];
                    tzbl.tzsqr = request.Form["tzsqr"];
                    tzbl.fzr = request.Form["fzr"];
                    tzbl.xb = request.Form["xb"];
                    tzbl.gzdw = request.Form["gzdw"];
                    tzbl.zwhzy = request.Form["zwhzy"];
                    tzbl.sfzh = request.Form["sfzh"];
                    tzbl.zzhzs = request.Form["zzhzs"];
                    tzbl.yb = request.Form["yb"];
                    tzbl.dh = request.Form["dh"];
                    tzbl.wtdlr1 = request.Form["wtdlr1"];
                    tzbl.xb1 = request.Form["xb1"];
                    tzbl.sfzh1 = request.Form["sfzh1"];
                    tzbl.gzdw1 = request.Form["gzdw1"];
                    tzbl.zw1 = request.Form["zw1"];
                    tzbl.dh1 = request.Form["dh1"];
                    tzbl.wtdlr2 = request.Form["wtdlr2"];
                    tzbl.xb2 = request.Form["xb2"];
                    tzbl.sfzh2 = request.Form["sfzh2"];
                    tzbl.gzdw2 = request.Form["gzdw2"];
                    tzbl.zw2 = request.Form["zw2"];
                    tzbl.dh2 = request.Form["dh2"];
                    tzbl.qtcjr = request.Form["qtcjr"];
                    tzbl.ajdcr1 = request.Form["ajdcr1"];
                    tzbl.gzdwjzw1 = request.Form["gzdwjzw1"];
                    tzbl.ajdcr2 = request.Form["ajdcr2"];
                    tzbl.gzdwjzw2 = request.Form["gzdwjzw2"];
                    tzbl.tzzcr = request.Form["tzzcr"];
                    tzbl.tzr = request.Form["tzr"];
                    tzbl.jlr = request.Form["jlr"];
                    tzbl.gzdw3 = request.Form["gzdw3"];
                    tzbl.tzbl = request.Form["tzbl"];
                    documentid = drhbll.AddDocumentBySQL("temp_tzbl", tzbl);
                    indic = drhbll.GetDocumentDictory(tzbl);
                    #endregion
                    break;
                case "听证通知书":
                    #region 听证通知书
                    strlength = 1;
                    DocumentTZTZS tztzs = new DocumentTZTZS();
                    tztzs.wsbh = request.Form["wsbh"];
                    tztzs.dsr = request.Form["dsr"];
                    tztzs.sqsj = request.Form["sqsj"];
                    tztzs.ay = request.Form["ay"];
                    tztzs.tzsj = request.Form["tzsj"];
                    tztzs.tzdd = request.Form["tzdd"];
                    tztzs.tzzcr = request.Form["tzzcr"];
                    tztzs.tzy = request.Form["tzy"];
                    tztzs.jlr = request.Form["jlr"];
                    tztzs.xgsx = request.Form["xgsx"];
                    tztzs.lxr = request.Form["lxr"];
                    tztzs.lxdh = request.Form["lxdh"];
                    tztzs.dz = request.Form["dz"];
                    tztzs.yzbm = request.Form["yzbm"];
                    documentid = drhbll.AddDocumentBySQL("temp_tztzs", tztzs);
                    indic = drhbll.GetDocumentDictory(tztzs);
                    #endregion
                    break;
                case "陈述申辩笔录":
                    #region 陈述申辩笔录
                    strlength = 1;
                    DocumentCSSBBL cssbbl = new DocumentCSSBBL();
                    cssbbl.sbsj = request.Form["sbsj"];
                    cssbbl.sbdd = request.Form["sbdd"];
                    cssbbl.dsrjbqk = request.Form["dsrjbqk"];
                    cssbbl.sx = request.Form["sx"];
                    cssbbl.cssbnr = request.Form["cssbnr"];

                    documentid = drhbll.AddDocumentBySQL("temp_cssbbl", cssbbl);
                    indic = drhbll.GetDocumentDictory(cssbbl);
                    #endregion
                    break;
                case "抄告单":
                    #region 抄告单
                    strlength = 1;
                    DocumentCGD cgd = new DocumentCGD();
                    cgd.cgdw = request.Form["cgdw"];
                    cgd.dsr = request.Form["dsr"];
                    cgd.wfsj = request.Form["wfsj"];
                    cgd.xdzgtzsj = request.Form["xdzgtzsj"];
                    cgd.lasj = request.Form["lasj"];
                    cgd.afdz = request.Form["afdz"];
                    cgd.wfxwms = request.Form["wfxwms"];
                    cgd.wfdgd = request.Form["wfdgd"];
                    cgd.cgnr = request.Form["cgnr"];
                    cgd.lxr = request.Form["lxr"];
                    cgd.lxdh = request.Form["lxdh"];
                    cgd.lxdz = request.Form["lxdz"];
                    documentid = drhbll.AddDocumentBySQL("temp_cgd", cgd);
                    indic = drhbll.GetDocumentDictory(cgd);
                    #endregion
                    break;
                case "非法财物移交书":
                    #region 非法财物移交书
                    strlength = 1;
                    DocumentFFCWYJS ffcwyjs = new DocumentFFCWYJS();
                    ffcwyjs.yjdw = request.Form["yjdw"];
                    ffcwyjs.dsr = request.Form["dsr"];
                    ffcwyjs.wfsj = request.Form["wfsj"];
                    ffcwyjs.wfdd = request.Form["wfdd"];
                    ffcwyjs.rdwfssms = request.Form["rdwfssms"];
                    ffcwyjs.wfdfl = request.Form["wfdfl"];
                    ffcwyjs.jdskjrq = request.Form["jdskjrq"];
                    ffcwyjs.jdsbh = request.Form["jdsbh"];

                    documentid = drhbll.AddDocumentBySQL("temp_ffcwyjs", ffcwyjs);
                    indic = drhbll.GetDocumentDictory(ffcwyjs);
                    #endregion
                    break;
                case "催 告 书":
                    #region 催 告 书
                    strlength = 1;
                    DocumentCGS cgs = new DocumentCGS();
                    cgs.wsbh = request.Form["wsbh"];
                    cgs.dsr = request.Form["dsr"];
                    cgs.cgsj = request.Form["cgsj"];
                    cgs.cgnr = request.Form["cgnr"];
                    documentid = drhbll.AddDocumentBySQL("temp_cgs", cgs);
                    indic = drhbll.GetDocumentDictory(cgs);
                    #endregion
                    break;
                case "抽样取证通知书":
                    #region 抽样取证通知书
                    strlength = 1;
                    DocumentCYQZTZS cyqztzs = new DocumentCYQZTZS();
                    cyqztzs.wsbh = request.Form["wsbh"];
                    cyqztzs.dsr = request.Form["dsr"];
                    cyqztzs.tzsj = request.Form["tzsj"];
                    cyqztzs.wfxw = request.Form["wfxw"];
                    cyqztzs.wfdgd = request.Form["wfdgd"];
                    cyqztzs.cydz = request.Form["cydz"];
                    cyqztzs.bcyqzr = request.Form["bcyqzr"];
                    cyqztzs.tztime = request.Form["tztime"];
                    cyqztzs.zfry = request.Form["zfry"];
                    cyqztzs.zfsj = request.Form["zfsj"];
                    cyqztzs.sftjcwtzs = "0";
                    documentid = drhbll.AddDocumentBySQL("temp_cyqztzs", cyqztzs);

                    //物品清单
                    foreach (DocumentWPQD good in goodsClass)
                    {
                        good.id = 0;
                        good.documentid = documentid;
                        good.documentname = "temp_cyqztzs";
                        drhbll.AddDocumentBySQL("temp_goods", good);

                        //物品清单dt
                        DocumentWPQDdt goodsdt = new DocumentWPQDdt();
                        goodsdt.goodsname = good.goodsname;
                        goodsdt.goodscount = good.goodscount;
                        goodsdt.goodspj = good.goodspj;
                        goodsdt.goodsgg = good.goodsgg;
                        goodsdt.goodsxh = good.goodsxh;
                        goodsdt.goodsxt = good.goodsxt;
                        goodsdt.goodsremark = good.goodsremark;
                        goodsdtlist.Add(goodsdt);
                    }

                    indic = drhbll.GetDocumentDictory(cyqztzs);
                    #endregion
                    break;
                case "抽样取证物品处理通知书":
                    #region 抽样取证物品处理通知书
                    strlength = 1;
                    DocumentCYQZWPCLTZS cypzwpcltzs = new DocumentCYQZWPCLTZS();
                    cypzwpcltzs.wsbh = request.Form["wsbh"];
                    cypzwpcltzs.dsr = request.Form["dsr"];
                    cypzwpcltzs.qztzsj = request.Form["qztzsj"];
                    cypzwpcltzs.qzwp = request.Form["qzwp"];
                    cypzwpcltzs.yjdflgd = request.Form["yjdflgd"];
                    cypzwpcltzs.cyqztzsbh = request.Form["cyqztzsbh"];
                    cypzwpcltzs.cljg = request.Form["cljg"];
                    cypzwpcltzs.bcyqzr = request.Form["bcyqzr"];
                    cypzwpcltzs.tzsj = request.Form["tzsj"];
                    cypzwpcltzs.zfry = request.Form["zfry"];
                    cypzwpcltzs.zfsj = request.Form["zfsj"];
                    documentid = drhbll.AddDocumentBySQL("temp_cyqzwpcltzs", cypzwpcltzs);
                    if (!string.IsNullOrEmpty(cypzwpcltzs.cyqztzsbh))
                        new Doc_WfdddrsBLL().EditCyqztzs(cypzwpcltzs.cyqztzsbh);
                    //物品清单
                    foreach (DocumentWPQD good in goodsClass)
                    {
                        good.id = 0;
                        good.documentid = documentid;
                        good.documentname = "temp_cyqzwpcltzs";
                        drhbll.AddDocumentBySQL("temp_goods", good);

                        //物品清单dt
                        DocumentWPQDdt goodsdt = new DocumentWPQDdt();
                        goodsdt.goodsname = good.goodsname;
                        goodsdt.goodscount = good.goodscount;
                        goodsdt.goodspj = good.goodspj;
                        goodsdt.goodsgg = good.goodsgg;
                        goodsdt.goodsxh = good.goodsxh;
                        goodsdt.goodsxt = good.goodsxt;
                        goodsdt.goodsremark = good.goodsremark;
                        goodsdtlist.Add(goodsdt);
                    }

                    indic = drhbll.GetDocumentDictory(cypzwpcltzs);
                    #endregion
                    break;
                case "罚款收缴凭证":
                    #region 罚款收缴凭证
                    strlength = 1;
                    DocumentFKSJPZ fksjpz = new DocumentFKSJPZ();
                    fksjpz.wsbh = request.Form["wsbh"];
                    fksjpz.bcfr = request.Form["bcfr"];
                    fksjpz.fkpjbh = request.Form["fkpjbh"];
                    documentid = drhbll.AddDocumentBySQL("temp_fksjpz", fksjpz);
                    indic = drhbll.GetDocumentDictory(fksjpz);

                    #region 添加文书附件
                    if ((fileClass != null && fileClass.Length > 0) || status != null)
                    {
                        imgdic = new List<Dictionary<string, string>>();
                        if (fileClass != null && fileClass.Length > 0)
                        {
                            foreach (var item in fileClass)
                            {
                                JObject jo = new JObject();
                                jo = (JObject)JsonConvert.DeserializeObject(item);
                                string OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                                string OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                                string OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                                double size = jo["size"] == null ? 0 : (double)jo["size"];
                                Dictionary<string, string> imgdicc = new Dictionary<string, string>();
                                imgdicc.Add("$图片$", ConfigManageClass.LegalCasePath + OriginalPath);
                                imgdic.Add(imgdicc);

                                DocumentFileModel filemodel = new DocumentFileModel();
                                filemodel.documentid = documentid;
                                filemodel.documenttype = "temp_fksjpz";
                                filemodel.filename = OriginalName;
                                filemodel.filepath = OriginalPath;
                                filemodel.filetype = OriginalType;
                                filemodel.filesize = size;
                                drhbll.AddDocumentFiles(filemodel);
                            }
                        }
                        if (status != null)
                        {
                            List<DocumentFileModel> dflist = drhbll.GetDocumentFiles((int)dwmodel.documentid, "temp_fksjpz");//获取文书附件
                            if (dflist != null)
                            {
                                foreach (var item in dflist)
                                {
                                    Dictionary<string, string> imgdicc = new Dictionary<string, string>();
                                    imgdicc.Add("$图片$", ConfigManageClass.LegalCasePath + item.filepath);
                                    imgdic.Add(imgdicc);

                                    DocumentFileModel filemodel = new DocumentFileModel();
                                    filemodel.documentid = documentid;
                                    filemodel.documenttype = "temp_fksjpz";
                                    filemodel.filename = item.filename;
                                    filemodel.filepath = item.filepath;
                                    filemodel.filetype = item.filetype;
                                    filemodel.filesize = item.filesize;
                                    drhbll.AddDocumentFiles(filemodel);
                                }
                            }
                        }
                    }
                    else
                        indic.Add("$图片$", "");

                    #endregion
                    #endregion
                    break;

            }
            dic = ToWordPDF(dwmodel.filename, ConfigManageClass.LegalCasePath, indic, imgdic == null ? null : imgdic, strlength == null ? null : strlength, goodsdtlist == null ? null : goodsdtlist);

            dwmodel.lastwordpath = dic["WordPath"];
            dwmodel.lastpdfpath = dic["PDFPath"];
            dwmodel.documentid = documentid;

            WfsasList.Add(dwmodel);
            bll.function_AddWfsas(WfsasList);
        }

        /// <summary>
        /// 删除文书
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage DeleteCaseDocument(int dwfsasid)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
            int result = 0;
            //改变doc_wfsas的状态
            result = drhbll.EditDocumentStatus(dwfsasid, -1);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        /// <summary>
        /// 查看文书附件详情
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public object GetWFSADocumentInfo(int id, string tablename)
        {
            DocumentReplaceHandleBLL bll = new DocumentReplaceHandleBLL();
            object obj = new object();
            switch (tablename)
            {
                case "现场检查（勘验）笔录":
                    obj = bll.GetWFSADocumentInfo(id, "temp_xcjckybl", new DocumentXCJCKYBL());
                    break;
                case "调 查（询 问）笔 录":
                    obj = bll.GetWFSADocumentInfo(id, "temp_dcxwbl", new DocumentDCXWBL());
                    break;
                case "行政处罚事先告知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_xzcfsxgzs", new DocumentXZCFSXGZS());
                    break;
                case "行政处罚决定书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_xzcfjds", new DocumentXZCFJDS());
                    break;
                case "照片（图片、影像资料）证据":
                    obj = bll.GetWFSADocumentInfo(id, "temp_zpzj", new DocumentZPZJ());
                    break;
                case "责令停止违法行为通知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_zltzwfxwtzs", new DocumentZLTZWFXWTZS());
                    break;
                case "询问（调查）通知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_xwdctzs", new DocumentXWDCTZS());
                    break;
                case "函告书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_hgs", new DocumentHGS());
                    break;
                case "罚款催缴通知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_fkcjtzs", new DocumentFKCJTZS());
                    break;
                case "执法文书送达回证":
                    obj = bll.GetWFSADocumentInfo(id, "temp_zfwssdhz", new DocumentZFWSSDHZ());
                    break;
                case "行政处罚集体讨论记录":
                    obj = bll.GetWFSADocumentInfo(id, "temp_xzcfjttljl", new DocumentXZCFJTTLJL());
                    break;
                case "责令（限期）整改指令书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_zlxqzgzls", new DocumentZLXQZGZLS());
                    break;
                case "案件移送函":
                    obj = bll.GetWFSADocumentInfo(id, "temp_ajysh", new DocumentAJYSH());
                    break;
                case "移送案件涉案物品清单":
                    obj = bll.GetWFSADocumentInfo(id, "temp_ysajsawpqd", new DocumentYSAJSAWPQDlist(), "temp_goods");
                    break;
                case "责令（限期）改正通知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_zlxqgztzs", new DocumentZLXQGZTZS());
                    break;
                case "调查取证联系函":
                    obj = bll.GetWFSADocumentInfo(id, "temp_dcqzlxh", new DocumentDCQZLXH());
                    break;
                case "听  证  报  告":
                    obj = bll.GetWFSADocumentInfo(id, "temp_tzbg", new DocumentTZBG());
                    break;
                case "听  证  笔  录":
                    obj = bll.GetWFSADocumentInfo(id, "temp_tzbl", new DocumentTZBL());
                    break;
                case "听证通知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_tztzs", new DocumentTZTZS());
                    break;
                case "陈述申辩笔录":
                    obj = bll.GetWFSADocumentInfo(id, "temp_cssbbl", new DocumentCSSBBL());
                    break;
                case "抄告单":
                    obj = bll.GetWFSADocumentInfo(id, "temp_cgd", new DocumentCGD());
                    break;
                case "非法财物移交书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_ffcwyjs", new DocumentFFCWYJS());
                    break;
                case "催 告 书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_cgs", new DocumentCGS());
                    break;
                case "抽样取证通知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_cyqztzs", new DocumentCYQZTZSList(), "temp_goods");
                    break;
                case "抽样取证物品处理通知书":
                    obj = bll.GetWFSADocumentInfo(id, "temp_cyqzwpcltzs", new DocumentCYQZWPCLTZSList(), "temp_goods");
                    break;
                case "罚款收缴凭证":
                    obj = bll.GetWFSADocumentInfo(id, "temp_fksjpz", new DocumentFKSJPZ());
                    break;
            }

            return obj;
        }

        /// <summary>
        /// 创建文件夹
        /// </summary>
        /// <returns></returns>
        public string CraeteDocument(string FilePath)
        {
            DateTime dt = DateTime.Now;
            if (!Directory.Exists(FilePath))
            {
                Directory.CreateDirectory(FilePath);
            }
            string OriginalPathYear = FilePath + "\\" + dt.Year;
            if (!Directory.Exists(OriginalPathYear))
            {
                Directory.CreateDirectory(OriginalPathYear);
            }
            string OriginalPathdate = OriginalPathYear + "\\" + dt.ToString("yyyyMMdd");
            if (!Directory.Exists(OriginalPathdate))
            {
                Directory.CreateDirectory(OriginalPathdate);
            }
            return OriginalPathdate;
        }

        /// <summary>
        /// 图片生成WORD、PDF文件
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> ImagesToWordPDF(string docname, string FilePath, Dictionary<string, string> imgdic)
        {
            DateTime dt = DateTime.Now;
            string OriginalPathdate = CraeteDocument(FilePath);
            string wordtimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string wordfileName = docname + wordtimeStr + ".docx";
            string wordPath = Path.Combine(OriginalPathdate, wordfileName);

            string pdftimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string pdffileName = docname + pdftimeStr + ".pdf";
            string pdfPath = Path.Combine(OriginalPathdate, pdffileName);

            string abspath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/图片模板.docx");
            WordInfo info = new WordInfo(abspath, wordPath, pdfPath);
            info.AddPictures(imgdic);
            info.WordToPdf();
            info.Dispose();

            Dictionary<string, string> doc = new Dictionary<string, string>();
            doc.Add("WordPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + wordfileName);
            doc.Add("PDFPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + pdffileName);
            return doc;
        }

        /// <summary>
        /// WORD生成PDF文件
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> WordToPDF(string docname, string FilePath, string DocFilePath)
        {
            DateTime dt = DateTime.Now;
            string OriginalPathdate = CraeteDocument(FilePath);

            string pdftimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string pdffileName = docname + pdftimeStr + ".pdf";
            string pdfPath = Path.Combine(OriginalPathdate, pdffileName);

            WordInfo info = new WordInfo(DocFilePath, pdfPath);
            info.WordToPdf();
            info.Dispose();

            Dictionary<string, string> doc = new Dictionary<string, string>();
            doc.Add("PDFPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + pdffileName);
            return doc;
        }

        /// <summary>
        /// 表单生成WORD、PDF文件
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> ToWordPDF(string docname, string FilePath, Dictionary<string, string> dic, List<Dictionary<string, string>> imgdic = null, int? strlength = null, List<DocumentWPQDdt> goodslist = null)
        {
            DateTime dt = DateTime.Now;
            string OriginalPathdate = CraeteDocument(FilePath);
            string wordtimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string wordfileName = docname + wordtimeStr + ".docx";
            string wordPath = Path.Combine(OriginalPathdate, wordfileName);

            string pdftimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string pdffileName = docname + pdftimeStr + ".pdf";
            string pdfPath = Path.Combine(OriginalPathdate, pdffileName);

            var abspath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + docname + ".docx");

            WordInfo info = new WordInfo(abspath, wordPath, pdfPath);

            if (goodslist.Count() != 0)
            {
                info.InsertTable(1, goodslist);
            }
            string[] allreplaces = new string[] { "$正文$", "$确认记录$", "$违法行为$", "$询问内容$", "$出席人员姓名及职务$", "$讨论内容$", "$讨论记录$", "$结论性意见$", "$移送理由$", "$依据的法律规定$", "$案件相关资料$", "$当事人基本情况$", "$事项$", "$陈述申辩内容$", "$听证会基本情况$", "$案件事实$", "$处理意见及建议$", "$违法行为$", "$法律依据$", "$改正内容$", "$违法行为描述$", "$违反的规定$" };
            foreach (string item in allreplaces)
            {
                if (strlength != null && dic.Keys.Contains(item))
                {
                    dic = info.ReplaceString(item, dic[item], dic);
                }
            }
            info.ReplaceRangs(dic);

            if (imgdic != null && imgdic.Count() != 0)
            {
                info.AddPictures(imgdic);
            }

            info.WordToPdf();
            info.Dispose();

            Dictionary<string, string> doc = new Dictionary<string, string>();
            doc.Add("WordPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + wordfileName);
            doc.Add("PDFPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + pdffileName);
            return doc;
        }

        /// <summary>
        /// 删除流程里的图片
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public bool DeleteWorkFlowPictures(string tablename, string wordname, int id)
        {
            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            return bll.DeleteWorkFlowPictures(tablename,wordname,id);
        }
    }
}