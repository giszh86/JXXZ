using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using JXXZ.ZHCG.DAL;
using System.Web;
using JXXZ.ZHCG.BLL.AccountBLL;
using JXXZ.ZHCG.Model;
using Newtonsoft.Json;
using JXXZ.ZHCG.Model.AccountModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using Newtonsoft.Json.Linq;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.BLL;

namespace JXXZ.ZHCG.WebAPI.Controllers.Account
{
    public class AccountTaskController : ApiController
    {
        private AccountTaskBLL bll = new AccountTaskBLL();
        private Base_ZdsBLL zdbll = new Base_ZdsBLL();
        private UnitBLL unitbll = new UnitBLL();

        /// <summary>
        /// 获取所有台帐任务列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<AccountTaskModel>> GetAllTZTaskList(int start, int limit)
        {
            return bll.GetTZTaskList(null, start, limit);
        }

        /// <summary>
        /// 获取过滤条件后的台帐任务列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<AccountTaskModel>> GetAllTZTaskList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetTZTaskList(filters, start, limit);
        }

        /// <summary>
        /// 添加台帐任务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddAccountTask(AccountTaskModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string[] fileClass = model.uploadpanelValue;
            List<FileUploadClass> list = new List<FileUploadClass>();
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
                }
            }
            List<tz_taskclasses> list_tzclass = new List<tz_taskclasses>();
            string sszd = string.Empty;
            if (!string.IsNullOrEmpty(model.tz_json))
            {
                JArray jo = new JArray();
                jo = (JArray)JsonConvert.DeserializeObject(model.tz_json);

                foreach (JObject item in jo)
                {
                    if (item["zd_name"] == null)
                    {
                        continue;
                    }
                    else
                    {
                        string typeclassID = zdbll.GetIdByName(item["zd_name"].ToString(), "type_task");
                        string zd_name = item["zd_name"].ToString();
                        if (item["机动中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "机动中队", typeclassID));
                        }
                        if (item["新城中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "新城中队", typeclassID));
                        }
                        if (item["高照中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "高照中队", typeclassID));
                        }
                        if (item["王店中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "王店中队", typeclassID));
                        }
                        if (item["洪合中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "洪合中队", typeclassID));
                        }
                        if (item["新塍中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "新塍中队", typeclassID));
                        }
                        if (item["王江泾中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "王江泾中队", typeclassID));
                        }
                        if (item["油车港中队"] != null)
                        {
                            list_tzclass.Add(Gettz_taskclasses(item, "油车港中队", typeclassID));
                        }
                    }

                }

            }
           
            model.createtime = DateTime.Now;
            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);
            model.createtime = DateTime.Now;

            int result = bll.AddAccountTask(model, list, list_tzclass);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 提取类
        /// </summary>
        /// <param name="zdName"></param>
        /// <param name="typeclassID"></param>
        /// <returns></returns>
        public tz_taskclasses Gettz_taskclasses(JObject item, string zdName, string typeclassID)
        {
            tz_taskclasses tzclass = new tz_taskclasses();
            tzclass.classid = typeclassID;
            tzclass.sszd = unitbll.GetUnitByName(zdName, 2).id;
            tzclass.status = (int)item[zdName];
            tzclass.tasktime = DateTime.Now;
            return tzclass;
        }


        /// <summary>
        /// 编辑台帐任务
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditAccountTask(AccountTaskModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string[] fileClass = model.uploadpanelValue;
            List<FileUploadClass> list = new List<FileUploadClass>();
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
                }
            }

            #region 已注释
            //List<tz_taskclasses> list_tzclass = new List<tz_taskclasses>();
          
            //if (!string.IsNullOrEmpty(model.tz_json))
            //{
            //    JArray jo = new JArray();
            //    jo = (JArray)JsonConvert.DeserializeObject(model.tz_json);

            //    foreach (JObject item in jo)
            //    {
            //        if (item["zd_name"] == null)
            //        {
            //            continue;
            //        }
            //        else
            //        {
            //            string typeclassID = zdbll.GetIdByName(item["zd_name"].ToString(), "type_task");
            //            string zd_name = item["zd_name"].ToString();
            //            if (item["机动中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "机动中队", typeclassID));
            //            }
            //            if (item["新城中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "新城中队", typeclassID));
            //            }
            //            if (item["高照中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "高照中队", typeclassID));
            //            }
            //            if (item["王店中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "王店中队", typeclassID));
            //            }
            //            if (item["洪合中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "洪合中队", typeclassID));
            //            }
            //            if (item["新塍中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "新塍中队", typeclassID));
            //            }
            //            if (item["王江泾中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "王江泾中队", typeclassID));
            //            }
            //            if (item["油车港中队"] != null)
            //            {
            //                list_tzclass.Add(Gettz_taskclasses(item, "油车港中队", typeclassID));
            //            }
            //        }

            //    }

            //}
            #endregion
            model.createtime = DateTime.Now;
            int result = bll.EditAccountTask(model, list);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 根据任务ID获取任务类别
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        public List<TaskClassModel> GetTaskClassByTaskID(int TaskID)
        {
            return bll.GetTaskClassByTaskID(TaskID);
        }

        public List<TaskClassModel> GetTaskZDByTaskID(int TaskID)
        {
            return bll.GetTaskZDByTaskID(TaskID);
        }


        /// <summary>
        /// 根据任务ID获取附件
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        public List<FileUploadClass> GetTaskFilesByTaskID(int TaskID)
        {
            return bll.GetTaskFilesByTaskID(TaskID);
        }

        /// <summary>
        /// 获取任务中队(初始化)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<AccountUnitModel> GetAccountUnit()
        {
            return bll.GetAccountUnit();
        }

    }
}