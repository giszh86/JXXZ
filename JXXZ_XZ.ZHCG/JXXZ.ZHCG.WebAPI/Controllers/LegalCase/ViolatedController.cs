using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.DAL;
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
using JXXZ.ZHCG.BLL.MonitorBLL;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class ViolatedController : ApiController
    {
        private Case_WtajsBLL bll = new Case_WtajsBLL();
        private FI_CamerasBLL cameraBll = new FI_CamerasBLL();

        /// <summary>
        /// 违停案件列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="processstatus"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_WtajsModel>> GetPendingCaseWtajsList(int start, int limit, string processstatus)
        {
            return bll.GetPendingCaseWtajsList(null, start, limit, processstatus);
        }

        /// <summary>
        /// 违停案件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_WtajsModel>> GetPendingCaseWtajsList(string filter, int start, int limit, string processstatus)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetPendingCaseWtajsList(filters, start, limit, processstatus);
        }

        /// <summary>
        /// 全部违停案件列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="processstatus"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_WtajsModel>> GetAllCaseWtajsList(int start, int limit)
        {
            return bll.GetAllCaseWtajsList(null, start, limit);
        }

        /// <summary>
        /// 全部违停案件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_WtajsModel>> GetAllCaseWtajsList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetAllCaseWtajsList(filters, start, limit);
        }

        /// <summary>
        /// 违停详情
        /// </summary>
        /// <param name="wtid"></param>
        /// <returns></returns>
        [HttpGet]
        public Case_WtajsModel GetcaseModel(int wtid)
        {
            return bll.Getcase(wtid);
        }


        [HttpPost]
        public HttpResponseMessage AddCaseSources(Case_WtajsModel model)
        {


            int success = bll.ModifyWtajs(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }


            return response;
        }

        //  /api/Violated/AddWtajs
        /// <summary>
        /// 添加违停
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public object AddWtajs(Case_WtajsModel model)
        {

            try
            {
                case_wtajs cwmodel = new case_wtajs();
                cwmodel.wtid = model.wtid;
                cwmodel.car_num = model.car_num;
                cwmodel.car_type = model.car_type;
                cwmodel.processstatus = model.processstatus;
                cwmodel.wt_time = model.wt_time;
                cwmodel.wt_address = model.wt_address;
                cwmodel.wfxw = model.wfxw;
                cwmodel.cfjdsh = model.cfjdsh;
                cwmodel.cjdw = model.cjdw;
                cwmodel.cjr = model.cjr;
                cwmodel.dsr = model.dsr;
                cwmodel.dsr_phone = model.dsr_phone;
                cwmodel.dsr_address = model.dsr_address;
                cwmodel.jdr = model.jdr;
                cwmodel.jdsj = model.jdsj;
                cwmodel.shr = model.shr;
                cwmodel.shsj = model.shsj;
                cwmodel.zfreason = model.zfreason;
                cwmodel.datastatus = model.datastatus;
                cwmodel.cldw = model.cldw;
                cwmodel.fkje = model.fkje;
                cwmodel.fphm = model.fphm;
                cwmodel.processuser = model.processuser;
                cwmodel.processtime = model.processtime;

                cwmodel.jsr = model.jsr;
                cwmodel.jssj = model.jssj;
                cwmodel.isphone = model.isphone;
                cwmodel.reportuserid = model.reportuserid;
                cwmodel.reporttime = DateTime.Now;
                cwmodel.x84 = model.x84;
                cwmodel.y84 = model.y84;
                cwmodel.unitid = model.unitid;
                //string geometry = model.x84 + "," + model.y84;
                //string map2000 = new MapXYConvent().WGS84ToCGCS2000(geometry);
                //if (!string.IsNullOrEmpty(map2000))
                //{
                //    cwmodel.x2000 = double.Parse(map2000.Split(',')[0]);
                //    cwmodel.y2000 = double.Parse(map2000.Split(',')[1]);
                //}
                int wtid = bll.AddWtajs(cwmodel);
                #region 图片处理
                List<FileClass> List_FC = new List<FileClass>();
                string OriginPath = ConfigManageClass.WTCarOriginalPath;
                string smallPath = ConfigManageClass.WTCarFilesPath;


                if (model.photo1 != null && model.photo1.Length != 0)
                {
                    string[] spilt = model.photo1.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }

                }
                if (model.photo2 != null && model.photo2.Length != 0)
                {
                    string[] spilt = model.photo2.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                if (model.photo3 != null && model.photo3.Length != 0)
                {
                    string[] spilt = model.photo3.Split(',');
                    if (spilt.Length > 1)
                    {
                        byte[] myByte = Convert.FromBase64String(spilt[1]);
                        FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                        List_FC.Add(FC);
                    }
                }
                foreach (var item in List_FC)
                {
                    case_wtfiles cfilemodel = new case_wtfiles();
                    cfilemodel.wtid = wtid;
                    cfilemodel.filename = item.OriginalName;
                    cfilemodel.filepath = item.OriginalPath;
                    cfilemodel.filetype = item.OriginalType;
                    cfilemodel.filesize = item.size;
                    bll.AddWtFile(cfilemodel);

                }
                #endregion

                #region 添加日志
                SystemLogBLL slbll = new SystemLogBLL();
                slbll.WriteSystemLog("违停案件", "", (int)model.reportuserid);
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


        /// <summary>
        /// 图片加载
        /// </summary>
        /// <param name="wtid"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetFileUpload(int wtid)
        {
            return bll.GetFileUpload(wtid);
        }

        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, string status, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<Case_WtajsModel> list = bll.GetWtajsCaseListExcel(status, filters);

            //获取导出的Excel表
            CommonFunctionBLL<Case_WtajsModel> cfBll = new CommonFunctionBLL<Case_WtajsModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }


        /// <summary>
        /// 全部违停案件列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="processstatus"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_WtajsModel>> GetDateAllCaseWtajsList(int start, int limit)
        {
            return bll.GetDateAllCaseWtajsList(null, start, limit);
        }

        /// <summary>
        /// 全部违停案件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_WtajsModel>> GetDateAllCaseWtajsList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetDateAllCaseWtajsList(filters, start, limit);
        }

        #region 车辆列表列表导出
        /// <summary>
        /// 车辆列表列表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<Case_WtajsModel> list = bll.GetCaseWtajsList(filters);

            //获取导出的Excel表
            CommonFunctionBLL<Case_WtajsModel> cfBll = new CommonFunctionBLL<Case_WtajsModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
        #endregion


        /// <summary>
        /// 抓拍对接插入违停数据
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        public string AddWTByCamera(dynamic obj)
        {
            try
            {
                string szCameraId = Convert.ToString(obj.szCameraId);
                string szCarNum = Convert.ToString(obj.szCarNum);
                if (!string.IsNullOrEmpty(szCameraId))
                {
                    fi_cameras camera = cameraBll.GetCameraDetails(szCameraId);
                    if (camera != null)
                    {
                        case_wtajs wt = new case_wtajs();
                        wt.car_num = szCarNum;
                        wt.wt_address = camera.cameraname;
                        wt.x84 = camera.x84 == null ? 0 : camera.x84.Value;
                        wt.y84 = camera.y84 == null ? 0 : camera.y84.Value;
                        wt.wt_time = DateTime.Now;
                        wt.car_type = "1";
                        wt.processstatus = "0";
                        wt.wfxw = "不按规定停放机动车，影响其他车辆和行人通行的";
                        wt.cjdw = "秀洲区综合行政执法局";
                        wt.isphone = 0;
                        wt.reporttime = DateTime.Now;
                        int wtid = bll.AddWtajs(wt);//插入违停案件

                       // List<FileClass> List_FC = new List<FileClass>();
                        string OriginPath = ConfigManageClass.WTCarOriginalPath;
                        string smallPath = ConfigManageClass.WTCarFilesPath;
                        if (obj.photo1 != null)
                        {

                            byte[] myByte = Convert.FromBase64String(Convert.ToString(obj.photo1));
                            FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                            // List_FC.Add(FC);
                            AddWTFiles(wtid, FC);

                        }
                        if (obj.photo2 != null)
                        {

                            byte[] myByte = Convert.FromBase64String(Convert.ToString(obj.photo2));
                            FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                            // List_FC.Add(FC);
                            AddWTFiles(wtid, FC);

                        }
                        if (obj.photo3 != null)
                        {
                            byte[] myByte = Convert.FromBase64String(Convert.ToString(obj.photo3));
                            FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                            // List_FC.Add(FC);
                            AddWTFiles(wtid, FC);

                        }
                        if (obj.photo4 != null)
                        {

                            byte[] myByte = Convert.FromBase64String(Convert.ToString(obj.photo4));
                            FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                            // List_FC.Add(FC);
                            AddWTFiles(wtid, FC);

                        }
                        if (obj.photo5 != null)
                        {
                            byte[] myByte = Convert.FromBase64String(Convert.ToString(obj.photo5));
                            FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                            //  List_FC.Add(FC);
                            AddWTFiles(wtid, FC);

                        }
                        if (obj.photo6 != null)
                        {
                            byte[] myByte = Convert.FromBase64String(Convert.ToString(obj.photo6));
                            FileClass FC = FileFactory.FileUpload(myByte, ".jpg", OriginPath, smallPath, 100, 100);
                            // List_FC.Add(FC);
                            AddWTFiles(wtid, FC);

                        }
                    }
                }
                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        /// <summary>
        /// 插入违停附件
        /// </summary>
        /// <param name="wtid"></param>
        /// <param name="FC"></param>
        private void AddWTFiles(int wtid, FileClass FC)
        {
            case_wtfiles cfilemodel = new case_wtfiles();
            cfilemodel.wtid = wtid;
            cfilemodel.filename = FC.OriginalName;
            cfilemodel.filepath = FC.OriginalPath;
            cfilemodel.filetype = FC.OriginalType;
            cfilemodel.filesize = FC.size;
            bll.AddWtFile(cfilemodel);
        }
    }
}