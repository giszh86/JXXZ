using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.ConservationBLL;
using JXXZ.ZHCG.Model;
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
    public class YhLogController : ApiController
    {
        private YH_YhLogBLL bll = new YH_YhLogBLL();
        private YH_FileBLL filebll = new YH_FileBLL();
        /// <summary>
        /// 养护日志列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_YhLogModel>> GetYhLogList(int start, int limit, int year, int month)
        {
            return bll.GetYhLogList(null, start, limit, year, month);
        }

        /// <summary>
        /// 养护日志列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_YhLogModel>> GetYhLogList(string filter, int start, int limit, int year, int month)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetYhLogList(filters, start, limit, year, month);
        }
        /// <summary>
        /// 添加养护日志
        /// </summary>
        [HttpPost]
        public HttpResponseMessage AddLog(YH_YhLogModel model)
        {
            int success = bll.AddLog(model);
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

            foreach (var item in list)
            {
                YH_FileModel filemodel = new YH_FileModel();
                filemodel.filesource = 2;
                filemodel.sourceid = success;
                filemodel.filename = item.OriginalName;
                filemodel.filetype = item.OriginalType;
                filemodel.filepath = item.OriginalPath;
                filemodel.filesize = item.size;
                filebll.AddFile(filemodel);
            }

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

        // api/YhLog/GetYhLogModel?yhlogid=1
        /// <summary>
        /// 获取养护日志详情
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public YH_YhLogModel GetYhLogModel(int yhlogid)
        {
            return bll.GetYhLogModel(yhlogid);
        }

        // api/YhLog/AddLogApi
        /// <summary>
        /// 添加养护日志
        /// </summary>
        [HttpPost]
        public object AddLogApi(YH_YhLogModel model)
        {
            try
            {
                int success = bll.AddLog(model);

                #region 图片处理
                List<FileClass> list = new List<FileClass>();
                string OriginPath = ConfigManageClass.YhLogOriginalPath;
                string smallPath = ConfigManageClass.YhLogFilesPath;
                if (model.photo1 != null && model.photo1.Length != 0)
                {
                    string[] spilt = model.photo1.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        list.Add(FC);
                    }

                }
                if (model.photo2 != null && model.photo2.Length != 0)
                {
                    string[] spilt = model.photo2.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        list.Add(FC);
                    }
                }
                if (model.photo3 != null && model.photo3.Length != 0)
                {
                    string[] spilt = model.photo3.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        list.Add(FC);
                    }
                }
              
                #endregion

                foreach (var item in list)
                {
                    YH_FileModel filemodel = new YH_FileModel();
                    filemodel.filesource = 2;
                    filemodel.sourceid = success;
                    filemodel.filename = item.OriginalName;
                    filemodel.filetype = item.OriginalType;
                    filemodel.filepath = item.OriginalPath;
                    filemodel.filesize = item.size;
                    filebll.AddFile(filemodel);
                }

                if (success > 0)
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
            }

        }


        #region 养护日志导出
        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, int month,int year, string filter)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<YH_YhLogModel> list = bll.GetYhLogListExcel(month, year, filters);

            //获取导出的Excel表
            CommonFunctionBLL<YH_YhLogModel> cfBll = new CommonFunctionBLL<YH_YhLogModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
        #endregion
    }
}