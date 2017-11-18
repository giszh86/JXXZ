using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.BLL.CitizenServiceBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using JXXZ.ZHCG.Utility;
using JXXZ.ZHCG.WebAPI.Attributes;
using Newtonsoft.Json;
using System.Collections.Specialized;
using System.Net.Http.Headers;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.BLL.WorkFlowManagerBLL;
using JXXZ.ZHCG.DAL;
using System.Threading;
using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.BLL;
using Newtonsoft.Json.Linq;
using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.BLL.IllegalConstructionBLL;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using System.IO;
using JXXZ.ZHCG.BLL.SMSMessagesBLL;

namespace JXXZ.ZHCG.WebAPI.Controllers
{
    [LoggingFilter]
    public class CitizenEventController : ApiController
    {
        /// <summary>
        /// 添加市民事件
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCizitenEvent(RSM_CitizenModel cmmodel)
        {
            UserBLL userbll = new UserBLL();
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            HttpFileCollectionBase files = request.Files;
            sm_citizenservices model = new sm_citizenservices();
            List<FileClass> list = new List<FileClass>();
            string[] fileClass = cmmodel.uploadpanelValue;

            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass infileClass = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    infileClass.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    infileClass.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    infileClass.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    infileClass.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(infileClass);
                }
            }

            if (!string.IsNullOrEmpty(request.Form["dutytime"]))
                model.dutytime = Convert.ToDateTime(request.Form["dutytime"]);
            model.eventid = request.Form["eventid"];
            model.sourceid = Convert.ToInt32(request.Form["sourceid"]);
            model.complainant = request.Form["complainant"];
            if (!string.IsNullOrEmpty(request.Form["cnumber"]))
                model.cnumber = Convert.ToInt32(request.Form["cnumber"]);
            if (!string.IsNullOrEmpty(request.Form["foundtime"]))
                model.foundtime = Convert.ToDateTime(request.Form["foundtime"]);
            model.contactphone = request.Form["contactphone"];
            model.contactaddress = request.Form["contactaddress"];
            model.eventaddress = request.Form["eventaddress"];
            model.eventtitle = request.Form["eventtitle"];
            model.eventcontent = request.Form["eventcontent"];
            model.bigtypeid = Convert.ToInt32(request.Form["bigtypeid"]);
            model.smalltypeid = Convert.ToInt32(request.Form["smalltypeid"]);
            if (!string.IsNullOrEmpty(request.Form["limittime"]))
                model.limittime = Convert.ToDateTime(request.Form["limittime"]);
            model.recorduser = request.Form["recorduser"];
            model.grometry = request.Form["grometry"];
            model.sfzxzz = Convert.ToInt32(request.Form["sfzxzz"]);
            if (!string.IsNullOrEmpty(request.Form["srid"]))
                model.srid = Convert.ToInt32(request.Form["srid"]);
            model.createtime = DateTime.Now;
            model.createuserid = Convert.ToInt32(request.Form["userid"]);
            model.workflowtype = request.Form["zptype"];
            model.suggest = request.Form["suggest"];
            model.officeuserid = Convert.ToInt32(request.Form["userid"]);
            if (!string.IsNullOrEmpty(request.Form["xzid"]))
            {
                model.xzid = Convert.ToInt32(request.Form["xzid"]);
                model.pqxzid = request.Form["xzid"];
            }
            WorkFlowClass wf = new WorkFlowClass();
            WorkFlowClass wfs = new WorkFlowClass();
            string userids = request.Form["userid"];
            if (!string.IsNullOrEmpty(userids))
            {
                string useridsstr = "";
                foreach (UserModel item in userbll.GetUsersStaffList(2))
                {
                    useridsstr += item.ID + ",";
                }
                userids = "," + useridsstr;
            }


            #region 事件流程
            wf.FunctionName = "sm_citizenservices";//市民事件表名
            wf.WFID = "2017021409560001";//工作流程编号 2017021409560001 事件流程
            wf.WFDID = "2017021410240010";//工作流详细编号 2017021410240001 上报事件
            wf.NextWFDID = request.Form["zptype"];//下一步流程编号 2017021410240002 事件派遣
            wf.NextWFUSERIDS = request.Form["zptype"] == "2017021410240001" ? userids : request.Form["nextperson"]; //下一步流程ID   
            wf.DEALCONTENT = request.Form["suggest"];
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]); //当前流程创建人
            wf.files = list;
            #endregion

            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            string wf_id = bll.WF_Submit(wf, model);
            string[] wf_ids = null;
            string wfsid = "";
            string wfasid = "";
            string citizenid = "";
            if (!string.IsNullOrEmpty(wf_id))
            {
                wf_ids = wf_id.Split(',');
                wfsid = wf_ids[0];
                wfasid = wf_ids[1];
                citizenid = wf_ids[2];
            }

            #region 违章建筑同步信息
            if (request.Form["sfwj"] == "1")
            {
                WJ_WzjzsBLL wjbll = new WJ_WzjzsBLL();
                WJ_WzjzsModel wjmodel = new WJ_WzjzsModel();
                WJ_FilesBLL filebll = new WJ_FilesBLL();
                wjmodel.wjholder = model.eventtitle;
                wjmodel.citizenid = citizenid;
                wjmodel.foundtime = model.foundtime;
                wjmodel.address = model.eventaddress;
                wjmodel.contactphone = model.contactphone;

                int wjid = wjbll.AddWzjzs(wjmodel);
                wjmodel.parentid = wjid;
                int success = wjbll.AddWzjzs(wjmodel);

                foreach (var item in list)
                {
                    WJ_FilesModel wjfilemodel = new WJ_FilesModel();
                    wjfilemodel.filetype = item.OriginalType;
                    wjfilemodel.filename = item.OriginalName;
                    wjfilemodel.filepath = item.OriginalPath;
                    wjfilemodel.source = 1;
                    wjfilemodel.sourceid = success;
                    wjfilemodel.filesize = item.size;
                    filebll.AddCqxm(wjfilemodel);

                    //复制文件
                    DateTime dt = DateTime.Now;
                    if (!Directory.Exists(ConfigManageClass.IllegallyBuiltOriginalPath))
                    {
                        Directory.CreateDirectory(ConfigManageClass.IllegallyBuiltOriginalPath);
                    }
                    string OriginalPathYear = ConfigManageClass.IllegallyBuiltOriginalPath + "\\" + dt.Year;
                    if (!Directory.Exists(OriginalPathYear))
                    {
                        Directory.CreateDirectory(OriginalPathYear);
                    }
                    string OriginalPathdate = OriginalPathYear + "\\" + dt.ToString("yyyyMMdd");
                    if (!Directory.Exists(OriginalPathdate))
                    {
                        Directory.CreateDirectory(OriginalPathdate);
                    }
                    File.Copy(ConfigManageClass.CitizenServiceOriginalPath + wjfilemodel.filepath, ConfigManageClass.IllegallyBuiltOriginalPath + wjfilemodel.filepath, true);
                }
            }
            #endregion

            #region 添加日志
            SystemLogBLL slbll = new SystemLogBLL();
            slbll.WriteSystemLog("市民事件", "", Convert.ToInt32(request.Form["userid"]));
            #endregion

            //#region 发送短信
            //string phone = "";//15888309757,18768196242
            //SMS_Messages sm = new SMS_Messages();
            //string[] phones = phone.Split(',');
            //string content = "您有一条新的市民事件需要处理，限办期限：" + model.limittime + ",请及时处理";
            //sm.SendMessage(phones, content);
            //#endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 事件流程
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage CizitenEventFlow(RSM_CitizenModel cmmodel)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            sm_citizenservices model = new sm_citizenservices();
            //文件上传
            HttpFileCollectionBase files = request.Files;

            List<FileClass> list = new List<FileClass>();
            string[] fileClass = cmmodel.uploadpanelValue;

            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass infileClass = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    infileClass.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    infileClass.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    infileClass.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    infileClass.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(infileClass);
                }
            }

            model.processmode = request.Form["processmode"];
            model.satisfaction = request.Form["satisfaction"];
            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.processuserid = Convert.ToInt32(request.Form["userid"]);
            if (request.Form["nextwfdid"] == "2017021410240006" || request.Form["nextwfdid"] == "2017021410240009")
                model.gdsj = DateTime.Now;
            if (request.Form["wfdid"] == "2017021410240001" && !string.IsNullOrEmpty(request.Form["userid"]))
            {
                model.officeuserid = Convert.ToInt32(request.Form["userid"]);
                model.workflowtype = request.Form["nextwfdid"];
                model.suggest = request.Form["suggest"];
            }
            WorkFlowManagerBLL wfbll = new WorkFlowManagerBLL();
            string nextperson = request.Form["nextperson"];
            if (request.Form["nextperson"] == "0")
            {
                WF_WorkFlowLinkOld oldmodel = wfbll.GetOldLink(request.Form["wfsid"], "2017021410240001");
                if (oldmodel != null)
                    nextperson = oldmodel.dealuserid.ToString();
            }
            if (nextperson == "0")
            {
                string userids = "";
                UserBLL userbll = new UserBLL();
                //获取指挥中心人员id
                foreach (UserModel item in userbll.GetUsersStaffList(2))
                {
                    userids += item.ID + ",";
                }
                nextperson = "," + userids;
            }

            WorkFlowClass wf = new WorkFlowClass();

            #region 事件完成生成交办单
            if (request.Form["nextwfdid"] == "2017021410240006")
            {
                SM_CitizenServicesBLL smbll = new SM_CitizenServicesBLL();
                Case_CaseSourcesBLL casesourcebll = new Case_CaseSourcesBLL();
                DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
                SM_CitizenServicesModel smmodel = smbll.GetCitizenServiceModel(request["citizenid"]);
                Dictionary<string, string> dic = casesourcebll.ToWordPDF("事件交办单", System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/市民事件交办单.docx"), ConfigManageClass.CitizenServiceOriginalPath, drhbll.GetDocumentDictory(smmodel));
                FileClass infileClass = new FileClass();
                infileClass.OriginalPath = dic["PDFPath"];
                infileClass.OriginalName = "事件交办单";
                infileClass.OriginalType = ".pdf";
                list.Add(infileClass);
            }
            #endregion

            #region 事件流程
            wf.FunctionName = "sm_citizenservices";//市民事件表名
            wf.WFID = "2017021409560001";//工作流程编号 2017021409560001 事件流程
            wf.WFDID = request.Form["wfdid"];//工作流详细编号 2017021410240003 事件处理
            wf.NextWFDID = request.Form["nextwfdid"];//下一步流程编号 2017021410240004 中队长审核
            wf.NextWFUSERIDS = nextperson;//下一步流程ID
            wf.WFSAID = request.Form["wfsaid"];
            wf.WFSID = request.Form["wfsid"];
            wf.DEALCONTENT = request.Form["suggest"];
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]); //当前流程创建人
            wf.files = list;
            #endregion

            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            bll.WF_Submit(wf, model);

            //#region 发送短信
            //string phone = "";//15888309757,18768196242
            //SMS_Messages sm = new SMS_Messages();
            //string[] phones = phone.Split(',');
            //string content = "您有一条新的市民事件需要处理，限办期限：" + model.limittime + ",请及时处理";
            //sm.SendMessage(phones, content);
            //#endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 编辑市民事件基础信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage CizitenEventEdit(RSM_CitizenModel cmmodel)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            HttpFileCollectionBase files = request.Files;
            sm_citizenservices model = new sm_citizenservices();
            string[] fileClass = cmmodel.uploadpanelValue;

            if (fileClass != null && fileClass.Length > 0)
            {
                //当有图片时，获取上报时的用户活动实例
                string wfsuid = bll.GetEditWFSUID(request.Form["wfsid"]);

                foreach (var item in fileClass)
                {
                    FileClass infileClass = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    infileClass.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    infileClass.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    infileClass.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    infileClass.size = jo["size"] == null ? 0 : (double)jo["size"];
                    infileClass.wfsuid = wfsuid;
                    bll.AddEditPictures(infileClass);
                }
            }

            model.citizenid = request.Form["citizenid"];
            if (!string.IsNullOrEmpty(request.Form["dutytime"]))
                model.dutytime = Convert.ToDateTime(request.Form["dutytime"]);
            //model.eventid = request.Form["eventid"];
            //model.sourceid = Convert.ToInt32(request.Form["sourceid"]);
            model.complainant = request.Form["complainant"];
            if (!string.IsNullOrEmpty(request.Form["cnumber"]))
                model.cnumber = Convert.ToInt32(request.Form["cnumber"]);
            if (!string.IsNullOrEmpty(request.Form["foundtime"]))
                model.foundtime = Convert.ToDateTime(request.Form["foundtime"]);
            model.contactphone = request.Form["contactphone"];
            model.contactaddress = request.Form["contactaddress"];
            model.eventaddress = request.Form["eventaddress"];
            model.eventtitle = request.Form["eventtitle"];
            model.eventcontent = request.Form["eventcontent"];
            model.bigtypeid = Convert.ToInt32(request.Form["bigtypeid"]);
            model.smalltypeid = Convert.ToInt32(request.Form["smalltypeid"]);
            if (!string.IsNullOrEmpty(request.Form["limittime"]))
                model.limittime = Convert.ToDateTime(request.Form["limittime"]);
            model.recorduser = request.Form["recorduser"];
            model.grometry = request.Form["grometry"];

            bll.CizitenEventEdit(model);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 市民服务事件来源
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SM_SourcesModel> GetSourcesTypes()
        {
            SM_SourcesBLL bll = new SM_SourcesBLL();
            return bll.GetSourcesTypes();
        }

        /// <summary>
        /// 市民服务大小类
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SM_ClassesModel> GetClassTypes(int? parentid = null)
        {
            SM_ClassesBLL bll = new SM_ClassesBLL();
            return bll.GetClassTypes(parentid);
        }

        /// <summary>
        /// 待办已办事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetCitizenServicesList(int start, int limit, int userid, int status)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetCitizenServicesList(null, start, limit, userid, status);
        }

        /// <summary>
        /// 待办事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetCitizenServicesList(string filter, int start, int limit, int userid, int status)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetCitizenServicesList(filters, start, limit, userid, status);
        }

        /// <summary>
        /// 已办事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetAlreadyCitizenServicesList(int start, int limit, int userid, int status)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetAlreadyCitizenServicesList(null, start, limit, userid, status);
        }

        /// <summary>
        /// 已办事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetAlreadyCitizenServicesList(string filter, int start, int limit, int userid, int status)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetAlreadyCitizenServicesList(filters, start, limit, userid, status);
        }

        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetAllCitizenServicesList(int start, int limit, int? XZID = null)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetAllCitizenServicesList(null, start, limit, 0, 0, XZID);
        }

        /// <summary>
        /// 全部事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetAllCitizenServicesList(string filter, int start, int limit, int? XZID = null)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetAllCitizenServicesList(filters, start, limit, 0, 0, XZID);
        }

        /// <summary>
        /// 获取事件历史记录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<WF_WorkFlowOldModel> GetOldList(string wfsid)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetOldList(wfsid);
        }

        /// <summary>
        /// 获取环节名称
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SelectListItemModel> GetSelectListItem(string wfsid)
        {
            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            return bll.GetSelectListItem(wfsid);
        }

        /// <summary>
        /// 获取快速上报的内勤和分组组长
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Dictionary<string, string> GetQuickReportUsers(string wfsid)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetQuickReportUsers(wfsid);
        }

        #region API
        ///   /api/CitizenEvent/Quantity?userid=3
        /// <summary>
        /// 获取数量
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        public QuantityModel Quantity(int userid, string type = "7,")
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();

            return bll.Quantity(userid, type);
        }

        //   /api/CitizenEvent/EditExtension?citizenid=230125415214524&day=5&extensioncontent=
        /// <summary>
        /// 添加延期申请
        /// </summary>
        /// <param name="citizenid"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        [HttpGet]
        public object EditExtension(string citizenid, int day, string extensioncontent)
        {
            try
            {
                SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
                int id = bll.EditExtension(citizenid, day, extensioncontent);
                if (id > 0)
                {
                    return new
                    {
                        msg = "上报成功",
                        resCode = 1
                    };
                }
                else
                {
                    return new
                    {
                        msg = "json数据不正确",
                        resCode = 0
                    };
                }

            }
            catch (Exception)
            {
                return new
                {
                    msg = "json数据不正确",
                    resCode = 0
                };
                // return "{\"msg\":\"json数据不正确\",\"resCode\":\"0\"}";
            }

        }

        ///   /api/CitizenEvent/GetCitizenServiceModel?citizenid=2017022016345509590631
        /// <summary>
        /// 获取事件详情
        /// </summary>
        /// <param name="citizenid">事件ID</param>
        /// <returns></returns>
        [HttpGet]
        public SM_CitizenServicesModel GetCitizenServiceModel(string citizenid)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetCitizenServiceModel(citizenid);
        }

        // /api/CitizenEvent/AddCitizenService
        /// <summary>
        /// 手机端上报事件
        /// </summary>
        /// <param name="model"></param>
        [HttpPost]
        public object AddCitizenService(AddCitizenEventModel scmodel)
        {
            try
            {
                SM_CitizenServicesBLL scbll = new SM_CitizenServicesBLL();
                WorkFlowClass wf = new WorkFlowClass();
                UserBLL userbll = new UserBLL();
                sm_citizenservices model = new sm_citizenservices();
                string userids = "";

                //获取指挥中心人员id
                foreach (UserModel item in userbll.GetUsersStaffList(2))
                {
                    userids += item.ID + ",";
                }
                userids = "," + userids;

                #region 图片处理
                List<FileClass> List_FC = new List<FileClass>();
                string OriginPath = ConfigManageClass.CitizenServiceOriginalPath;
                string smallPath = ConfigManageClass.CitizenServiceFilesPath;


                if (scmodel.photo1 != null && scmodel.photo1.Length != 0)
                {
                    string[] spilt = scmodel.photo1.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }

                }
                if (scmodel.photo2 != null && scmodel.photo2.Length != 0)
                {
                    string[] spilt = scmodel.photo2.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                if (scmodel.photo3 != null && scmodel.photo3.Length != 0)
                {
                    string[] spilt = scmodel.photo3.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                if (scmodel.photo4 != null && scmodel.photo4.Length != 0)
                {
                    string[] spilt = scmodel.photo4.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                #endregion

                #region 事件流程
                if (scmodel.processingType == 1)
                {

                    wf.FunctionName = "sm_citizenservices";//市民事件表名
                    wf.WFID = "2017021409560001";//工作流程编号 2017021409560001 事件流程
                    wf.WFDID = "2017021410240010";//工作流详细编号 2017021410240001 上报事件
                    wf.NextWFDID = "2017021410240003";//下一步流程编号 2017021410240002 事件派遣
                    wf.NextWFUSERIDS = scmodel.createuserid.ToString(); //下一步流程ID           
                    wf.IsSendMsg = "false"; //是否发送短信
                    wf.WFCreateUserID = scmodel.createuserid; //当前流程创建人
                    wf.files = List_FC;

                }
                else
                {
                    wf.FunctionName = "sm_citizenservices";//市民事件表名
                    wf.WFID = "2017021409560001";//工作流程编号 2017021409560001 事件流程
                    wf.WFDID = "2017021410240010";//工作流详细编号 2017021410240001 上报事件
                    wf.NextWFDID = "2017021410240001";//下一步流程编号 2017021410240002 事件派遣
                    wf.NextWFUSERIDS = userids; //下一步流程ID           
                    wf.IsSendMsg = "false"; //是否发送短信
                    wf.WFCreateUserID = scmodel.createuserid; //当前流程创建人
                    wf.files = List_FC;
                }
                #endregion
                string id = (scbll.GetCitizenAutoID()["AutoXCFXDayID"] + 1).ToString();
                if (id.Length == 1)
                    id = "00" + id;
                else if (id.Length == 2)
                    id = "0" + id;
                model.dutytime = scmodel.dutytime;
                model.eventid = "巡查发现" + DateTime.Now.ToString("yyyyMMdd") + id; //scmodel.eventid;
                model.sourceid = scmodel.sourceid;
                model.complainant = scmodel.complainant;
                model.cnumber = scmodel.cnumber;
                model.foundtime = scmodel.foundtime;
                model.contactphone = scmodel.contactphone;
                model.contactaddress = scmodel.contactaddress;
                model.eventaddress = scmodel.eventaddress;
                model.eventtitle = scmodel.eventtitle;
                model.eventcontent = scmodel.eventcontent;
                model.bigtypeid = scmodel.bigtypeid;
                model.smalltypeid = scmodel.smalltypeid;
                model.limittime = scmodel.limittime;
                model.recorduser = scmodel.recorduser;
                model.grometry = scmodel.grometry;
                model.sfzxzz = scmodel.sfzxzz;
                model.srid = scmodel.srid;
                model.createtime = DateTime.Now;
                model.createuserid = scmodel.createuserid;
                WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
                string wf_id = bll.WF_Submit(wf, model);

                //#region 发送短信
                //if (scmodel.isSendMsg == "1")
                //{
                //    string phone = userbll.GetPhones(wf.NextWFUSERIDS);//15888309757,18768196242
                //    string[] phones = phone.Split(',');
                //    string content = "您有一条新的市民事件需要处理，限办期限：" + scmodel.limittime + ",请及时处理";
                //    SMSMessagesBLL smsbll = new SMSMessagesBLL();
                //    smsbll.SendMessage(phones, content);
                //}
                //#endregion
                //return "{\"msg\":\"上报成功！\",\"resCode\":\"1\"}";
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
                // return "{\"msg\":\"json数据不正确\",\"resCode\":\"0\"}";
            }

        }

        //  /api/CitizenEvent/CizitenEventFlowLink
        /// <summary>
        /// 事件流程
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public object CizitenEventFlowLink(DealWithLinkModel scmodel)
        {


            try
            {
                sm_citizenservices model = new sm_citizenservices();
                UserBLL userbll = new UserBLL();
                #region 图片处理
                List<FileClass> List_FC = new List<FileClass>();
                string OriginPath = ConfigManageClass.CitizenServiceOriginalPath;
                string smallPath = ConfigManageClass.CitizenServiceFilesPath;


                if (scmodel.photo1 != null && scmodel.photo1.Length != 0)
                {
                    string[] spilt = scmodel.photo1.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }

                }
                if (scmodel.photo2 != null && scmodel.photo2.Length != 0)
                {
                    string[] spilt = scmodel.photo2.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                if (scmodel.photo3 != null && scmodel.photo3.Length != 0)
                {
                    string[] spilt = scmodel.photo3.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                if (scmodel.photo4 != null && scmodel.photo4.Length != 0)
                {
                    string[] spilt = scmodel.photo4.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                #endregion

                model.processmode = scmodel.processmode;
                model.satisfaction = scmodel.satisfaction;
                model.processuserid = scmodel.processuserid;
                if (scmodel.nextwfdid == "2017021410240006")
                    model.gdsj = DateTime.Now;
                if (scmodel.wfdid == "2017021410240001")
                {
                    model.officeuserid = scmodel.wfcreateuserid;
                    model.workflowtype = scmodel.nextwfdid;
                    model.suggest = scmodel.dealcontent;
                }
                WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
                string nextperson = scmodel.nextwfuserids;
                if (nextperson == "0")
                {
                    WF_WorkFlowLinkOld oldmodel = bll.GetOldLink(scmodel.wfsid, scmodel.nextwfdid);
                    if (oldmodel != null && scmodel.wfdid != "2017021410240008")
                        nextperson = oldmodel.dealuserid.ToString();
                }
                if (nextperson == "0")
                {
                    string userids = "";

                    //获取指挥中心人员id
                    foreach (UserModel item in userbll.GetUsersStaffList(2))
                    {
                        userids += item.ID + ",";
                    }
                    nextperson = "," + userids;
                }




                WorkFlowClass wf = new WorkFlowClass();

                #region 事件流程
                wf.FunctionName = "sm_citizenservices";//市民事件表名
                wf.WFID = "2017021409560001";//工作流程编号 2017021409560001 事件流程
                wf.WFDID = scmodel.wfdid;//工作流详细编号 2017021410240003 事件处理
                wf.NextWFDID = scmodel.nextwfdid;//下一步流程编号 2017021410240004 中队长审核
                wf.NextWFUSERIDS = nextperson; //下一步流程用户ID
                wf.WFSAID = scmodel.wfsaid;
                wf.WFSID = scmodel.wfsid;
                wf.DEALCONTENT = scmodel.dealcontent;
                wf.IsSendMsg = "false"; //是否发送短信
                wf.WFCreateUserID = scmodel.wfcreateuserid; //当前流程创建人
                wf.files = List_FC;
                #endregion

                bll.WF_Submit(wf, model);
               

                //#region 发送短信
                //if (scmodel.isSendMsg == "1" && !string.IsNullOrEmpty(wf.NextWFUSERIDS))
                //{
                //    string phone = userbll.GetPhones(wf.NextWFUSERIDS);//15888309757,18768196242
                //    string[] phones = phone.Split(',');
                //    string content = "您有一条新的市民事件需要处理，限办期限：" + scmodel.limittime + ",请及时处理";
                //    SMSMessagesBLL smsbll = new SMSMessagesBLL();
                //    smsbll.SendMessage(phones, content);
                //}
                //#endregion
                return new
                {
                    msg = "提交成功",
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
        /// 延期列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetAllCitizenServicesReviewList(int start, int limit)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetAllCitizenServicesReviewList(null, start, limit, 0, 0);
        }

        /// <summary>
        /// 延期列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetAllCitizenServicesReviewList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetAllCitizenServicesReviewList(filters, start, limit, 0, 0);
        }

        /// <summary>
        /// 延期
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditEventReview(SM_CitizenServicesModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            if (model == null)
            {
                model = new SM_CitizenServicesModel();
                model.citizenid = request["citizenid"];
                model.reviewextension = string.IsNullOrEmpty(request["reviewextension"]) ? 0 : Convert.ToInt32(request["reviewextension"]);
                model.extensiontime = string.IsNullOrEmpty(request["extensiontime"]) ? 0 : Convert.ToInt32(request["extensiontime"]);
                model.auditopinion = request["auditopinion"];
            }
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            int success = bll.EditEventReview(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        // api/CitizenEvent/GetCitizenServicesAttr?citizenid=123141341234&wfdid=721637816317,12312312312
        /// <summary>
        /// 获取图片
        /// </summary>
        /// <param name="citizenid">事件ID</param>
        /// <param name="wfdid">当前流程ID</param>
        /// <returns></returns>
        [HttpGet]
        public List<FileClass> GetCitizenServicesAttr(string citizenid, string wfdid)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetCitizenServicesAttr(citizenid, wfdid);
        }

        /// <summary>
        /// 根据userid获取今日上报
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<SM_CitizenServicesModel> GetCitizenModel(int userid)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetCitizenModel(userid);
        }

        /// <summary>
        /// 获取系统生成最大ID
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Dictionary<string, int?> GetCitizenAutoID()
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetCitizenAutoID();
        }

        /// <summary>
        /// 事件登记编号是否重复
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public bool IsCitizenRepeat(string eventid)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.IsCitizenRepeat(eventid);
        }

        /// <summary>
        /// 指挥中心处理事件是否完成
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public bool EventIsHandle(string wfsaid)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.EventIsHandle(wfsaid);
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

            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<SM_CitizenServicesModel> list = bll.GetAllCitizenServicesListExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<SM_CitizenServicesModel> cfBll = new CommonFunctionBLL<SM_CitizenServicesModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }


        /// <summary>
        /// 当天全部事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetDateAllCitizenServicesList(int start, int limit)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetDateAllCitizenServicesList(null, start, limit, 0, 0);
        }

        /// <summary>
        /// 当天全部事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetDateAllCitizenServicesList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            return bll.GetDateAllCitizenServicesList(filters, start, limit, 0, 0);
        }
    }
}