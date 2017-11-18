using JXXZ.ZHCG.BLL.AccountBLL;
using JXXZ.ZHCG.BLL.CitizenServiceBLL;
using JXXZ.ZHCG.BLL.ZXZZBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AccountModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
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
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Account
{
    public class AccountRegisterController : ApiController
    {
        private AccountRegisterBLL bll = new AccountRegisterBLL();
        private ZXZZBLL zxzzbll = new ZXZZBLL();

        /// <summary>
        /// 获取所有台帐登记列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<AccountRegisterModel>> GetALLAccountRegisterList(string filter, int start, int limit,int type)
        {
            return bll.GetAccountRegisterList(null, start, limit, type);
        }

        /// <summary>
        /// 获取过滤条件后的台帐登记列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<AccountRegisterModel>> GetAccountRegisterList(int start, int limit, int type, string filter = null)
        {

            if (filter != null)
            {
                List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
                return bll.GetAccountRegisterList(filters, start, limit, type);
            }
            return bll.GetAccountRegisterList(null, start, limit, type);
        }

        /// <summary>
        /// 添加台帐任务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddAccountRegister(AccountRegisterModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string[] fileClass = model.uploadpanelValue;
            string AccountRegisterPath = ConfigManageClass.AccountRegisterPath;
            List<FileUploadClass> list = new List<FileUploadClass>();
            List<Dictionary<string, string>> XGDicList = new List<Dictionary<string, string>>();

            #region 生成Word文件夹
            DateTime dt = DateTime.Now;
            string AccountRegisterWordPath = ConfigManageClass.AccountRegisterWordPath;
            //原图 创建文件夹
            if (!Directory.Exists(AccountRegisterWordPath))
            {
                Directory.CreateDirectory(AccountRegisterWordPath);
            }
            string OriginalPathYear = AccountRegisterWordPath + "\\" + dt.Year;
            if (!Directory.Exists(OriginalPathYear))
            {
                Directory.CreateDirectory(OriginalPathYear);
            }
            string OriginalPathdate = OriginalPathYear + "\\" + dt.ToString("yyyyMMdd");
            if (!Directory.Exists(OriginalPathdate))
            {
                Directory.CreateDirectory(OriginalPathdate);
            }
            string timeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);

            string fileName = model.title + new Random().Next(10000, 99999) + ".docx";

            string OPath = Path.Combine(OriginalPathdate, fileName);

            #endregion
            if (fileClass != null && fileClass.Length > 0)
            {

                foreach (var item in fileClass)
                {

                    FileUploadClass file = new FileUploadClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                    Dictionary<string, string> dic = new Dictionary<string, string>();
                    dic.Add("$相关照片$", AccountRegisterPath + file.OriginalPath);
                    XGDicList.Add(dic);
                }
            }
            model.createtime = dt;



            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);
            model.createtime = DateTime.Now;

            #region 获取事件附件生成台帐
            string citizenid = model.citizenid;
            List<FileClass> imgList = new List<FileClass>();
            if (!string.IsNullOrEmpty(citizenid))
            {
                SM_CitizenServicesModel eventModel = new SM_CitizenServicesBLL().GetCitizenServiceModel(citizenid);
                if (eventModel != null)
                {
                    string abspath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/AccountDoc/自动事件生成台帐清单.docx");
                    WordInfo word = new WordInfo(abspath, OPath, "pdf");
                    Dictionary<string, string> dic = new Dictionary<string, string>();

                    //找到图片存入
                    dic.Add("$事件标题$", eventModel.eventtitle);
                    dic.Add("$当 事 人$", eventModel.complainant);
                    dic.Add("$事件内容$", eventModel.eventcontent);
                    dic.Add("$发现时间$", eventModel.foundtime.ToString("yyyy-MM-dd HH:mm:ss"));
                    dic.Add("$问题大类$", eventModel.bigtypename);
                    dic.Add("$问题小类$", eventModel.smalltypename);
                    dic.Add("$处理情况$", eventModel.processmode);
                    word.ReplaceRangs(dic);
                    List<Dictionary<string, string>> qdicList = new List<Dictionary<string, string>>();
                    List<Dictionary<string, string>> hdicList = new List<Dictionary<string, string>>();

                    if (eventModel.attachment != null && eventModel.attachment.Count > 0)
                    {

                        imgList = eventModel.attachment;
                        string OriginalPath = ConfigManageClass.CitizenServiceOriginalPath;

                        for (int i = 0; i < imgList.Count; i++)
                        {
                            if (imgList[i].WFDID == "2017021410240010")
                            {
                                Dictionary<string, string> qdic = new Dictionary<string, string>();
                                qdic.Add("$处理前照片$", OriginalPath + imgList[i].OriginalPath);
                                qdicList.Add(qdic);

                                string fileLast = System.IO.Path.GetFileName(OriginalPath + imgList[i].OriginalPath);

                                string fileLastPath = AccountRegisterPath + imgList[i].OriginalPath;

                                string AccountLastPath = fileLastPath.Substring(0, (fileLastPath.Length - fileLast.Length));

                                if (!Directory.Exists(AccountLastPath))
                                {
                                    Directory.CreateDirectory(AccountLastPath);
                                }

                                System.IO.File.Copy(OriginalPath + imgList[i].OriginalPath, AccountRegisterPath + imgList[i].OriginalPath, true);
                            }
                            else
                            {
                                Dictionary<string, string> hdic = new Dictionary<string, string>();
                                hdic.Add("$处理后照片$", OriginalPath + imgList[i].OriginalPath);
                                hdicList.Add(hdic);

                                string fileLast = System.IO.Path.GetFileName(OriginalPath + imgList[i].OriginalPath);

                                string fileLastPath = AccountRegisterPath + imgList[i].OriginalPath;

                                string AccountLastPath = fileLastPath.Substring(0, (fileLastPath.Length - fileLast.Length));

                                if (!Directory.Exists(AccountLastPath))
                                {
                                    Directory.CreateDirectory(AccountLastPath);
                                }

                                System.IO.File.Copy(OriginalPath + imgList[i].OriginalPath, AccountRegisterPath + imgList[i].OriginalPath, true);
                            }
                        }

                        word.AddPictures(qdicList);
                        word.AddPictures(hdicList);
                        word.Dispose();
                    }

                }
            }
            else
            {
                TZWord(model, XGDicList, OPath);
            }
            #endregion

            model.wordname = fileName;
            model.wordpath = dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + fileName;

            int result = bll.AddAccountRegister(model, list, imgList);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 生成Word
        /// </summary>
        /// <param name="model">页面模型</param>
        /// <param name="XGDicList">生成字典集合</param>
        private void TZWord(AccountRegisterModel model, List<Dictionary<string, string>> XGDicList, string OPath)
        {
            string abspath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/AccountDoc/手动生成台帐清单.docx");
            WordInfo word = new WordInfo(abspath, OPath, "pdf");
            Dictionary<string, string> dic = new Dictionary<string, string>();

            //找到图片存入
            dic.Add("$事件标题$", model.title);
            dic.Add("$当 事 人$", model.people);
            dic.Add("$事件内容$", model.content);
            dic.Add("$发现时间$", model.registertime.ToString("yyyy-MM-dd HH:mm:ss"));
            dic.Add("$地    点$", model.address);
            string srname = string.Empty;
            if (!string.IsNullOrEmpty(model.taskclassid))
            {
                sm_specialrectifications sms = zxzzbll.GetClassByID(int.Parse(model.taskclassid));
                if (sms != null)
                {
                    srname = sms.srname;
                }
            }
            dic.Add("$任务分类$", srname);
            word.ReplaceRangs(dic);
            word.AddPictures(XGDicList);
            word.Dispose();
        }

        /// <summary>
        /// 编辑台帐任务
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditAccountRegister(AccountRegisterModel model)
        {
            //model.createtime = DateTime.Now;

            //int result = bll.EditAccountRegister(model);

            //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            //response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            //return response;


            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string[] fileClass = model.uploadpanelValue;
            string AccountRegisterPath = ConfigManageClass.AccountRegisterPath;

            #region 生成Word文件夹
            DateTime dt = DateTime.Now;
            string AccountRegisterWordPath = ConfigManageClass.AccountRegisterWordPath;
            //原图 创建文件夹
            if (!Directory.Exists(AccountRegisterWordPath))
            {
                Directory.CreateDirectory(AccountRegisterWordPath);
            }
            string OriginalPathYear = AccountRegisterWordPath + "\\" + dt.Year;
            if (!Directory.Exists(OriginalPathYear))
            {
                Directory.CreateDirectory(OriginalPathYear);
            }
            string OriginalPathdate = OriginalPathYear + "\\" + dt.ToString("yyyyMMdd");
            if (!Directory.Exists(OriginalPathdate))
            {
                Directory.CreateDirectory(OriginalPathdate);
            }
            string timeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);

            string fileName = model.title + new Random().Next(10000, 99999) + ".docx";

            string OPath = Path.Combine(OriginalPathdate, fileName);

            #endregion


            List<FileUploadClass> list = new List<FileUploadClass>();
            List<Dictionary<string, string>> XGDicList = new List<Dictionary<string, string>>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileUploadClass file = new FileUploadClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                    Dictionary<string, string> dic = new Dictionary<string, string>();
                    dic.Add("$相关照片$", AccountRegisterPath + file.OriginalPath);
                    XGDicList.Add(dic);
                }
            }
            List<FileUploadClass> list_old = GetTaskFilesByRegisterid(model.registerid);
            foreach (var item in list_old)
            {
                Dictionary<string, string> dic = new Dictionary<string, string>();
                dic.Add("$相关照片$", AccountRegisterPath + item.OriginalPath);
                XGDicList.Add(dic);
            }
            model.createtime = dt;

            TZWord(model, XGDicList, OPath);

            model.wordname = fileName;
            model.wordpath = dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + fileName;

            int result = bll.EditAccountRegister(model, list);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 事件
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_CitizenServicesModel>> GetEvent(int start, int limit, string filter = null)
        {
            if (filter == null)
            {
                return bll.GetEvent(null, start, limit);
            }
            else
            {
                List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
                return bll.GetEvent(filters, start, limit);
            }

        }
        [HttpGet]
        public List<Unit> GetUnitsALLSquadron()
        {
            return bll.GetUnitsALLSquadron();
        }

        [HttpGet]
        /// <summary>
        /// 根据部门ID获取树
        /// </summary>
        /// <param name="unittypeid">单位类型标识</param>
        /// <returns></returns>
        public List<AccountRegisterTask> GetUnitsAccountRegister(int? unitID)
        {
            return bll.GetUnitsAccountRegister(unitID);
        }


        /// <summary>
        /// 根据登记ID获取附件
        /// </summary>
        /// <param name="registerid"></param>
        /// <param name="isphoto"> 0表示非图片 1表示只取图片</param>
        /// <returns></returns>
        [HttpGet]
        public List<FileUploadClass> GetTaskFilesByRegisterid(int registerid)
        {
            return bll.GetTaskFilesByRegisterid(registerid);
        }


        /// <summary>
        /// 获取事件图片
        /// </summary>
        /// <param name="citizenid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<FileUploadClass> GetCitizenServicesAttr(string citizenid)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();

            if (!string.IsNullOrEmpty(citizenid))
            {
                list = bll.GetCitizenServicesAttr(citizenid);
            }
            return list;
        }

        /// <summary>
        /// 获取当前所有登记过的台帐任务类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<base_zds> GetTaskClassNowYear()
        {
            return bll.GetTaskClassNowYear();
        }

    }

}