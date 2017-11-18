using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.BLL.ConservationBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.BLL.WorkFlowManagerBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.ConservationModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Conservation
{
    public class YhTaskController : ApiController
    {
        private YH_YhTaskBLL bll = new YH_YhTaskBLL();

        /// <summary>
        /// 养护任务上报
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddYhTask(YH_YhtaskModel model)
        {
            string[] fileClass = model.uploadpanelValue;
            List<FileClass> list = new List<FileClass>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass file = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                }
            }


            yh_yhtasks yhmodel = new yh_yhtasks();
            yhmodel.yhcompany = model.yhcompany;
            yhmodel.foundtime = model.foundtime;
            yhmodel.fileename = model.fileename;
            yhmodel.wtsource = model.wtsource;
            yhmodel.yhtype = model.yhtype;
            yhmodel.wtbigclass = model.wtbigclass;
            yhmodel.wtsmallclass = model.wtsmallclass;
            yhmodel.yhobject = model.yhobject;
            yhmodel.weather = model.weather;
            yhmodel.duetime = model.duetime;
            yhmodel.outlay = model.outlay;
            yhmodel.workload = model.workload;
            yhmodel.yhcontract = model.yhcontract;
            yhmodel.wtaddress = model.wtaddress;
            yhmodel.wtdescribe = model.wtdescribe;
            yhmodel.geography84 = model.geography84;
            //if (!string.IsNullOrEmpty(model.geography84))
            //{
            //    yhmodel.geography2000=new MapXYConvent().WGS84ToCGCS2000(model.geography84);
            //}
            yhmodel.wtnature = model.wtnature;
            yhmodel.points = model.points;
            yhmodel.debit = model.debit;
            yhmodel.sendusername = model.sendusername;
            yhmodel.sendopinion = model.sendopinion;
            yhmodel.createuserid = model.createuserid;
            WorkFlowClass wf = new WorkFlowClass();

            wf.FunctionName = "yh_yhtasks";//市民事件表名
            wf.WFID = "2017040610490001";//工作流程编号 2017021409560001 事件流程
            wf.WFDID = "2017040610570001";//工作流详细编号 2017021410240001 上报事件
            wf.NextWFDID = "2017040610570002";//下一步流程编号 2017021410240002 事件派遣
            wf.NextWFUSERIDS = model.createuserid.ToString(); //下一步流程ID           
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = model.createuserid; //当前流程创建人
            wf.files = list;
            WorkFlowManagerBLL wfbll = new WorkFlowManagerBLL();
            string wf_id = wfbll.WF_Submit(wf, yhmodel);

            #region 添加日志
            SystemLogBLL slbll = new SystemLogBLL();
            slbll.WriteSystemLog("养护问题", "", (int)model.createuserid);
            #endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }



        /// <summary>
        /// 手机端养护任务上报
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public object AddYhTaskApi(YH_YhtaskModel model)
        {
            #region 图片处理
            List<FileClass> List_FC = new List<FileClass>();
            string OriginPath = ConfigManageClass.YhTaskOriginalPath;
            string smallPath = ConfigManageClass.YhTaskFilesPath;

            for (int i = 0; i < model.uploadpanelValue.Length; i++)
            {
                string imgArray = model.uploadpanelValue[i];
                string[] spilt = imgArray.Split(',');
                if (spilt.Length > 0)
                {
                    byte[] imgByte = Convert.FromBase64String(spilt[1]);
                    FileClass imgFile = FileFactory.FileUpload(imgByte, ".jpg", OriginPath, smallPath, 100, 100);
                    List_FC.Add(imgFile);
                }
            }

            #endregion

            yh_yhtasks yhmodel = new yh_yhtasks();
            yhmodel.yhcompany = model.yhcompany;
            yhmodel.foundtime = model.foundtime;
            yhmodel.fileename = model.fileename;
            yhmodel.wtsource = model.wtsource;
            yhmodel.yhtype = model.yhtype;
            yhmodel.wtbigclass = model.wtbigclass;
            yhmodel.wtsmallclass = model.wtsmallclass;
            yhmodel.yhobject = model.yhobject;
            yhmodel.weather = model.weather;
            yhmodel.duetime = model.duetime;
            yhmodel.outlay = model.outlay;
            yhmodel.workload = model.workload;
            yhmodel.yhcontract = model.yhcontract;
            yhmodel.wtaddress = model.wtaddress;
            yhmodel.wtdescribe = model.wtdescribe;
            yhmodel.geography84 = model.geography84;
            yhmodel.wtnature = model.wtnature;
            yhmodel.points = model.points;
            yhmodel.debit = model.debit;
            yhmodel.sendusername = model.sendusername;
            yhmodel.sendopinion = model.sendopinion;
            yhmodel.createuserid = model.createuserid;
            WorkFlowClass wf = new WorkFlowClass();

            wf.FunctionName = "yh_yhtasks";//市民事件表名
            wf.WFID = "2017040610490001";//工作流程编号 2017021409560001 事件流程
            wf.WFDID = "2017040610570001";//工作流详细编号 2017021410240001 上报事件
            wf.NextWFDID = "2017040610570003";//下一步流程编号 2017021410240002 事件派遣
            wf.NextWFUSERIDS = model.createuserid.ToString(); //下一步流程ID           
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = model.createuserid; //当前流程创建人
            wf.files = List_FC;

            try
            {
                WorkFlowManagerBLL wfbll = new WorkFlowManagerBLL();
                string wf_id = wfbll.WF_Submit(wf, yhmodel);
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

        /// <summary>
        /// 养护任务列表待办，已办
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YhtaskList>> GetYhtaskList(int start, int limit, int userid, int status)
        {
            return bll.GetYhtaskList(null, start, limit, userid, status);
        }

        /// <summary>
        /// 养护任务列表待办，已办
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YhtaskList>> GetYhtaskList(string filter, int start, int limit, int userid, int status)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetYhtaskList(filters, start, limit, userid, status);
        }


        /// <summary>
        /// 养护全部列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YhtaskList>> GetAllYhtaskList(int start, int limit)
        {
            return bll.GetAllYhtaskList(null, start, limit);
        }

        /// <summary>
        /// 养护全部列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YhtaskList>> GetAllYhtaskList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetAllYhtaskList(filters, start, limit);
        }


        /// <summary>
        /// 养护任务详情
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public YhtaskModel GetYHTaskModel(string wfsid)
        {
            return bll.GetYHTaskModel(wfsid);
        }


        //  /api/YhTask/YHTaskFlowLink
        /// <summary>
        /// 事件流程
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public object YHTaskFlowLink(YHDealWithLinkModel scmodel)
        {
            try
            {
                yh_yhtasks model = new yh_yhtasks();

                #region 图片处理
                List<FileClass> List_FC = new List<FileClass>();
                string[] fileClass = scmodel.uploadpanelValue;
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
                        List_FC.Add(infileClass);
                    }
                }
                #endregion
                if (scmodel.wfdid == "2017040610570002")
                    model.pqrid = scmodel.wfcreateuserid;

                WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
                SMS_Messages sm = new SMS_Messages();
                UserBLL userbll = new UserBLL();
                if (scmodel.nextwfuserids == "0")//回退
                {
                    WF_WorkFlowLinkOld oldmodel = bll.GetOldLink(scmodel.wfsid, scmodel.nextwfdid);
                    if (oldmodel != null)
                        scmodel.nextwfuserids = oldmodel.dealuserid.ToString();
                }
                if (scmodel.nextwfuserids == "-1")//无派遣
                {
                    scmodel.nextwfuserids = "";
                    //获取市容环卫科人员ID
                    foreach (UserModel item in userbll.GetUsersStaff(8))
                    {
                        scmodel.nextwfuserids += item.ID + ",";
                    }
                    scmodel.nextwfuserids = "," + scmodel.nextwfuserids;
                }
                #region 发送短信
                //if (!string.IsNullOrEmpty(scmodel.mobile))
                //{
                //    sm.SendMessage(scmodel.mobile);
                //}
                #endregion



                WorkFlowClass wf = new WorkFlowClass();

                #region 事件流程
                wf.FunctionName = "yh_yhtasks";//市民事件表名
                wf.WFID = "2017040610490001";//工作流程编号 2017021409560001 事件流程
                wf.WFDID = scmodel.wfdid;//工作流详细编号 2017021410240003 事件处理
                wf.NextWFDID = scmodel.nextwfdid;//下一步流程编号 2017021410240004 中队长审核
                wf.NextWFUSERIDS = scmodel.nextwfuserids; //下一步流程用户ID
                wf.WFSAID = scmodel.wfsaid;
                wf.WFSID = scmodel.wfsid;
                wf.DEALCONTENT = scmodel.dealcontent;
                wf.IsSendMsg = "false"; //是否发送短信
                wf.WFCreateUserID = scmodel.wfcreateuserid; //当前流程创建人
                wf.files = List_FC;
                #endregion

                bll.WF_Submit(wf, model);
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

        // api/YhTask/GetCitizenServicesAttr?yhtaskid=123141341234&wfdids=721637816317,12312312312
        /// <summary>
        /// 获取执法事件图片
        /// </summary>
        /// <param name="ZFSJID">执法事件ID</param>
        /// <param name="WFDID">环节ID</param>
        /// <returns></returns>
        [HttpGet]
        public List<FileUploadClass> GetYHTaskAttr(string yhtaskid, string wfdids)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            List<Attachment> li = bll.GetYHTaskAttr(yhtaskid, wfdids);
            foreach (Attachment item in li)
            {
                FileUploadClass fi = new FileUploadClass();
                fi.OriginalPath = item.FILEPATH;
                fi.OriginalName = item.FILENAME;
                fi.OriginalType = item.FILETYPE;
                fi.size = item.size;
                list.Add(fi);
            }
            return list;
        }

        /// <summary>
        /// 获取养护代办数量
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpGet]
        public QuantityModel GetyhtaskNum(int userid)
        {
            return bll.GetyhtaskNum(userid);
        }
    }
}