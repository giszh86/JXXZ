using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.ReportBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ReportModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.ReportCenter
{
    public class ReportCenterController : ApiController
    {
        private ReportBLL bll = new ReportBLL();

        #region （表一）秀洲区综合行政执法局土地执法案件情况分类统计报表

        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        [HttpGet]
        public List<LandLawReportModel> GetLandLawReport(DateTime reportdate)
        {
            //DateTime dt = DateTime.Now;
            return bll.GetLandLawReport(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddLandLaw(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid);
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    LandLawReportModel model = new LandLawReportModel();
                    model = SetReportModel(userid, unitid, unitname, remark, item);
                    bll.LandLawAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            LandLawReportModel model = new LandLawReportModel();
                            model = SetReportModel(userid, unitid, unitname, remark, item);
                            bll.LandLawAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private static LandLawReportModel SetReportModel(int userid, int createunitid, string createunitname, string remark, JObject item)
        {
            LandLawReportModel model = new LandLawReportModel();
            model.ccwfjzmj = Convert.ToDouble(item["ccwfjzmj"]);
            model.cfqt = Convert.ToDouble(item["cfqt"]);
            model.classname = Convert.ToString(item["classname"]);
            model.cqqzcs = Convert.ToDouble(item["cqqzcs"]);
            model.createtime = DateTime.Now;
            model.createuserid = userid;
            model.fkje = Convert.ToDouble(item["fkje"]);
            model.gtbmyss = Convert.ToDouble(item["gtbmyss"]);
            model.lacczjs = Convert.ToDouble(item["lacczjs"]);
            model.mldzykn = Convert.ToString(item["mldzykn"]);
            model.czdzywt = Convert.ToString(item["czdzywt"]);
            model.msmj = Convert.ToDouble(item["msmj"]);
            model.mswfsd = Convert.ToDouble(item["mswfsd"]);
            model.nysd = Convert.ToDouble(item["nysd"]);
            model.qzgdmj = Convert.ToDouble(item["qzgdmj"]);
            model.reportdate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM") + "-25");
            model.sazmj = Convert.ToDouble(item["sazmj"]);
            model.sjcf = Convert.ToDouble(item["sjcf"]);
            model.sqqzzxjs = Convert.ToDouble(item["sqqzzxjs"]);
            model.tccfjy = Convert.ToDouble(item["tccfjy"]);
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.updatetime = DateTime.Now;
            model.wfydajzjs = Convert.ToDouble(item["wfydajzjs"]);
            model.wjazjs = Convert.ToDouble(item["wjazjs"]);
            model.xdcfjdsjs = Convert.ToDouble(item["xdcfjdsjs"]);
            model.xgdyjjy = Convert.ToString(item["xgdyjjy"]);
            model.yjajs = Convert.ToDouble(item["yjajs"]);
            model.ysgajg = Convert.ToDouble(item["ysgajg"]);
            model.yysd = Convert.ToDouble(item["yysd"]);
            model.zhzfbmslyss = Convert.ToDouble(item["zhzfbmslyss"]);
            model.zjxszr = Convert.ToDouble(item["zjxszr"]);
            model.zjxszrqt = Convert.ToDouble(item["zjxszrqt"]);
            model.zygzld = Convert.ToString(item["zygzld"]);
            model.remark = remark;
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            return model;
        }

        #endregion

        #region （表二）秀洲区综合行政执法局安全生产执法情况报表

        /// <summary>
        /// 获取安全生产报表数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SafetifyinProductionReportModel> GetSafetifyinProductionReport(DateTime reportdate)
        {
            //DateTime dt = DateTime.Now;
            return bll.GetSafetifyinProductionReport(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddSafetifyinProduction(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid); ;
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            string preparer = Convert.ToString(obj.preparer);
            string xzshuser = Convert.ToString(obj.shuser);
            string preparerphone = Convert.ToString(obj.preparerphone);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    SafetifyinProductionReportModel model = new SafetifyinProductionReportModel();
                    model = SetSaftity(userid, unitid, unitname, remark, item, preparer, xzshuser, preparerphone);
                    bll.SafetifyinProductionAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            SafetifyinProductionReportModel model = new SafetifyinProductionReportModel();
                            model = SetSaftity(userid, unitid, unitname, remark, item, null, null, null);
                            bll.SafetifyinProductionAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private SafetifyinProductionReportModel SetSaftity(int userid, int createunitid, string createunitname, string remark, JObject item, string preparer, string xzshuser, string preparerphone)
        {
            SafetifyinProductionReportModel model = new SafetifyinProductionReportModel();
            model.cdzfry = Convert.ToInt32(item["cdzfry"]);
            model.classname = Convert.ToString(item["classname"]);
            model.createtime = DateTime.Now;
            model.createuserid = userid;
            model.czdzywt = Convert.ToString(item["czdzywt"]);
            model.fxaqyh = Convert.ToInt32(item["fxaqyh"]);
            model.ja = Convert.ToInt32(item["ja"]);
            model.jcfx = Convert.ToInt32(item["jcfx"]);
            model.jcscjydw = Convert.ToInt32(item["jcscjydw"]);
            model.jg = Convert.ToInt32(item["jg"]);
            model.jsys = Convert.ToInt32(item["jsys"]);
            model.la = Convert.ToInt32(item["la"]);
            model.mldzykn = Convert.ToString(item["mldzykn"]);
            model.reportdate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM") + "-25");
            model.sjsjfmk = Convert.ToDouble(item["sjsjfmk"]);
            model.tctyzd = Convert.ToInt32(item["tctyzd"]);
            model.tqgb = Convert.ToInt32(item["tqgb"]);
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            model.updatetime = DateTime.Now;
            model.updatetime = DateTime.Now;
            model.wczgaqyh = Convert.ToInt32(item["wczgaqyh"]);
            model.xcclcsjds = Convert.ToInt32(item["xcclcsjds"]);
            model.xcjcjl = Convert.ToInt32(item["xcjcjl"]);
            model.xgdyjjy = Convert.ToString(item["xgdyjjy"]);
            model.xswy = Convert.ToInt32(item["xswy"]);
            model.zgfcyjs = Convert.ToInt32(item["zgfcyjs"]);
            model.zlxqzgzls = Convert.ToInt32(item["zlxqzgzls"]);
            model.zygzld = Convert.ToString(item["zygzld"]);

            model.jdfke = Convert.ToInt32(item["jdfke"]);
            model.zyfzr = Convert.ToInt32(item["zyfzr"]);
            model.aqsctj = Convert.ToInt32(item["aqsctj"]);
            model.pxhczglgd = Convert.ToInt32(item["pxhczglgd"]);
            model.sgyhpc = Convert.ToInt32(item["sgyhpc"]);
            model.stsgd = Convert.ToInt32(item["stsgd"]);
            model.sbglhjycsgd = Convert.ToInt32(item["sbglhjycsgd"]);
            model.ldbhldhtgl = Convert.ToInt32(item["ldbhldhtgl"]);
            model.yxkjzy = Convert.ToInt32(item["yxkjzy"]);
            model.dwjjzajdgl = Convert.ToInt32(item["dwjjzajdgl"]);

            model.preparer = preparer;
            model.shuser = xzshuser;
            model.preparerphone = preparerphone;
            model.remark = remark;
            return model;
        }

        #endregion

        #region (表三) 秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表

        /// <summary>
        /// 获取秸秆、城市垃圾露天焚烧报表数据
        /// </summary>mo
        /// <returns></returns>
        [HttpGet]
        public List<StrawAndWasteControlModel> GetStrawAndWasteControlReport(DateTime reportdate)
        {
            //DateTime dt = DateTime.Now;
            return bll.GetStrawAndWasteControlReport(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddStrawAndWasteControl(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid); ;
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    StrawAndWasteControlModel model = new StrawAndWasteControlModel();
                    model = SetStrawAndWasteControl(userid, unitid, unitname, item);
                    bll.StrawAndWasteControlModelAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            StrawAndWasteControlModel model = new StrawAndWasteControlModel();
                            model = SetStrawAndWasteControl(userid, unitid, unitname, item);
                            bll.StrawAndWasteControlModelAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private StrawAndWasteControlModel SetStrawAndWasteControl(int userid, int createunitid, string createunitname, JObject item)
        {
            StrawAndWasteControlModel model = new StrawAndWasteControlModel();
            model.cdzfcl = Convert.ToInt32(item["cdzfcl"]);
            model.cdzfry = Convert.ToInt32(item["cdzfry"]);
            model.classname = Convert.ToString(item["classname"]);
            model.createtime = DateTime.Now;
            model.createuserid = userid;
            model.czdzywt = Convert.ToString(item["czdzywt"]);
            model.fscsljja = Convert.ToInt32(item["fscsljja"]);
            model.fscsljla = Convert.ToInt32(item["fscsljla"]);
            model.fscsljsjsjfmk = Convert.ToDouble(item["fscsljsjsjfmk"]);
            model.fxczmhd = Convert.ToInt32(item["fxczmhd"]);
            model.fxczs = Convert.ToInt32(item["fxczs"]);
            model.fxysjtd = Convert.ToInt32(item["fxysjtd"]);
            model.ghmj1 = Convert.ToDouble(item["ghmj1"]);
            model.ghmj2 = Convert.ToDouble(item["ghmj2"]);
            model.kzzfdccs = Convert.ToInt32(item["kzzfdccs"]);
            model.kzzfxccs1 = Convert.ToInt32(item["kzzfxccs1"]);
            model.kzzfxccs2 = Convert.ToInt32(item["kzzfxccs2"]);
            model.ltfsjgja = Convert.ToInt32(item["ltfsjgja"]);
            model.ltfsjgla = Convert.ToInt32(item["ltfsjgla"]);
            model.ltfsjgsjsjfk = Convert.ToDouble(item["ltfsjgsjsjfk"]);
            model.mldzykn = Convert.ToString(item["mldzykn"]);
            model.nyjyja = Convert.ToInt32(item["nyjyja"]);
            model.nyjyla = Convert.ToInt32(item["nyjyla"]);
            model.nyjysjsjfmk = Convert.ToDouble(item["nyjysjsjfmk"]);
            model.reportdate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM") + "-25");
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            model.updatetime = DateTime.Now;
            model.remark = "";
            model.xgdyjjy = Convert.ToString(item["xgdyjjy"]);
            model.zygzld = Convert.ToString(item["zygzld"]);
            return model;
        }

        #endregion

        #region （表四）秀洲区综合行政执法局规模养殖场执法管控情况报表
        /// <summary>
        /// 获取规模养殖场执法管控情况
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<ScaleFarmsControlReportModel> GetScaleFarmsControl(DateTime reportdate)
        {
            return bll.GetScaleFarmsControl(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddScaleFarmsControl(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid);
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    ScaleFarmsControlReportModel model = new ScaleFarmsControlReportModel();
                    model = SetFarmsControlReportModel(userid, unitid, unitname, remark, item);
                    bll.ScaleFarmsControlReportModelAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            ScaleFarmsControlReportModel model = new ScaleFarmsControlReportModel();
                            model = SetFarmsControlReportModel(userid, unitid, unitname, remark, item);
                            bll.ScaleFarmsControlReportModelAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private ScaleFarmsControlReportModel SetFarmsControlReportModel(int userid, int createunitid, string createunitname, string remark, JObject item)
        {
            ScaleFarmsControlReportModel model = new ScaleFarmsControlReportModel();
            model.reportdate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM") + "-25");
            model.classname = Convert.ToString(item["classname"]);
            model.createtime = DateTime.Now;
            model.createuserid = userid;
            model.czdzywt = Convert.ToString(item["czdzywt"]);
            model.mldzykn = Convert.ToString(item["mldzykn"]);
            model.qtcc = Convert.ToInt32(item["qtcc"]);
            model.qtccwjmj = Convert.ToInt32(item["qtccwjmj"]);
            model.qtj = Convert.ToInt32(item["qtj"]);
            model.qtkjxqzgtzs = Convert.ToInt32(item["qtkjxqzgtzs"]);
            model.qtla = Convert.ToInt32(item["qtla"]);
            model.qtqt = Convert.ToInt32(item["qtqt"]);
            model.qtry = Convert.ToInt32(item["qtry"]);
            model.qtsjsjfmk = Convert.ToInt32(item["qtsjsjfmk"]);
            model.qty = Convert.ToInt32(item["qty"]);
            model.qtzfjccs = Convert.ToInt32(item["qtzfjccs"]);
            model.qtzfjcjl = Convert.ToInt32(item["qtzfjcjl"]);
            model.remark = Convert.ToString(item["remark"]);
            model.szcyl = Convert.ToInt32(item["szcyl"]);
            model.szja = Convert.ToInt32(item["szja"]);
            model.szla = Convert.ToInt32(item["szla"]);
            model.szsjjffmk = Convert.ToInt32(item["szsjjffmk"]);
            model.szxqzgtzs = Convert.ToInt32(item["szxqzgtzs"]);
            model.szyjsfjg = Convert.ToInt32(item["szyjsfjg"]);
            model.szzfjccs = Convert.ToInt32(item["szzfjccs"]);
            model.szzfjcjl = Convert.ToInt32(item["szzfjcjl"]);
            model.szzgyzwt = Convert.ToInt32(item["szzgyzwt"]);
            model.tqts = Convert.ToInt32(item["tqts"]);
            model.tqgb = Convert.ToInt32(item["tqgb"]);
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.updatetime = DateTime.Now;
            model.xgdyjjy = Convert.ToString(item["xgdyjjy"]);
            model.zygzld = Convert.ToString(item["zygzld"]);
            model.remark = remark;
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            return model;
        }
        #endregion

        #region （表五）秀洲区综合行政执法局水行政执法情况报表
        /// <summary>
        /// 获取规模养殖场执法管控情况
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<LawInWaterModel> GetLawInWater(DateTime reportdate)
        {
            return bll.GetLawInWater(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddLawInWater(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid); ;
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            string preparer = Convert.ToString(obj.preparer);
            string xzshuser = Convert.ToString(obj.xzshuser);
            string preparerphone = Convert.ToString(obj.preparerphone);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    LawInWaterModel model = new LawInWaterModel();
                    model = SetLawInWaterReportModel(userid, unitid, unitname, remark, item, preparer, xzshuser, preparerphone);
                    bll.LawInWaterReportModelAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            LawInWaterModel model = new LawInWaterModel();
                            model = SetLawInWaterReportModel(userid, unitid, unitname, remark, item, null, null, null);
                            bll.LawInWaterReportModelAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private LawInWaterModel SetLawInWaterReportModel(int userid, int createunitid, string createunitname, string remark, JObject item, string preparer, string xzshuser, string preparerphone)
        {
            LawInWaterModel model = new LawInWaterModel();
            model.reportdate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM") + "-25");
            model.cdzfcl = Convert.ToInt32(item["cdzfcl"]);
            model.cdzfry = Convert.ToInt32(item["cdzfry"]);
            model.classname = Convert.ToString(item["classname"]);
            model.createtime = DateTime.Now;
            model.csgsl = Convert.ToInt32(item["csgsl"]);
            model.czdzywt = Convert.ToString(item["czdzywt"]);
            model.fxsswt = Convert.ToInt32(item["fxsswt"]);
            model.hdfqw = Convert.ToInt32(item["hdfqw"]);
            model.jas = Convert.ToInt32(item["jas"]);
            model.jcfx = Convert.ToInt32(item["jcfx"]);
            model.jsfaxhdjzw = Convert.ToInt32(item["jsfaxhdjzw"]);
            model.jsys = Convert.ToInt32(item["jsys"]);
            model.kzzfxccs = Convert.ToInt32(item["kzzfxccs"]);
            model.mldzykn = Convert.ToString(item["mldzykn"]);
            model.ncgsl = Convert.ToInt32(item["ncgsl"]);
            model.pslj = Convert.ToInt32(item["pslj"]);
            model.psywscll = Convert.ToInt32(item["psywscll"]);
            model.sjsjfmk = Convert.ToInt32(item["sjsjfmk"]);
            model.updatetime = DateTime.Now;
            model.wczgsswt = Convert.ToInt32(item["wczgsswt"]);
            model.xgdyjjy = Convert.ToString(item["xgdyjjy"]);
            model.zlas = Convert.ToInt32(item["zlas"]);
            model.zlxqzgtzs = Convert.ToInt32(item["zlxqzgtzs"]);
            model.zygzld = Convert.ToString(item["zygzld"]);
            model.tsjb = Convert.ToInt32(item["tsjb"]);
            model.remark = remark;
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            model.createuserid = userid;
            model.preparer = preparer;
            model.shuser = xzshuser;
            model.preparerphone = preparerphone;
            return model;
        }
        #endregion

        #region （表六）秀洲区综合行政执法局中心工作开展情况报表
        public List<BureauCenterWorkReportModel> GetBureauCenterWork(DateTime reportdate)
        {
            return bll.GetBureauCenterWork(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddBureauCenterWork(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid); ;
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    BureauCenterWorkReportModel model = new BureauCenterWorkReportModel();
                    model = SetBureauCenterWorkReportModel(userid, unitid, unitname, remark, item);
                    bll.BureauCenterWorkModelAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            BureauCenterWorkReportModel model = new BureauCenterWorkReportModel();
                            model = SetBureauCenterWorkReportModel(userid, unitid, unitname, remark, item);
                            bll.BureauCenterWorkModelAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private BureauCenterWorkReportModel SetBureauCenterWorkReportModel(int userid, int createunitid, string createunitname, string remark, JObject item)
        {
            BureauCenterWorkReportModel model = new BureauCenterWorkReportModel();
            model.cccztsjb = Convert.ToInt32(item["cccztsjb"]);
            model.ccsjsjfmk = Convert.ToInt32(item["ccsjsjfmk"]);
            model.ccyyczzwt = Convert.ToInt32(item["ccyyczzwt"]);
            model.ccyyla = Convert.ToInt32(item["ccyyla"]);
            model.classname = Convert.ToString(item["classname"]);
            model.createtime = DateTime.Now;
            model.czccmj = Convert.ToInt32(item["czccmj"]);
            model.czczmj = Convert.ToInt32(item["czczmj"]);
            model.czdzywt = Convert.ToString(item["czdzywt"]);
            model.czja = Convert.ToInt32(item["czja"]);
            model.czla = Convert.ToInt32(item["czla"]);
            model.czsjsjfmk = Convert.ToInt32(item["czsjsjfmk"]);
            model.czxzccmj = Convert.ToInt32(item["czxzccmj"]);
            model.czzsmj = Convert.ToInt32(item["czzsmj"]);
            model.dlcztsjb = Convert.ToInt32(item["dlcztsjb"]);
            model.dlczzwt = Convert.ToInt32(item["dlczzwt"]);
            model.dlla = Convert.ToInt32(item["dlla"]);
            model.dlsjsjfmk = Convert.ToInt32(item["dlsjsjfmk"]);
            model.fxzghdwt = Convert.ToString(item["fxzghdwt"]);
            model.fzhdmc = Convert.ToString(item["fzhdmc"]);
            model.gmczf = Convert.ToString(item["gmczf"]);
            model.jgcsljfs = Convert.ToString(item["jgcsljfs"]);
            model.kzzfcs = Convert.ToInt32(item["kzzfcs"]);
            model.mldzykn = Convert.ToString(item["mldzykn"]);
            model.qlczmj = Convert.ToInt32(item["qlczmj"]);
            model.qlczsl = Convert.ToInt32(item["qlczsl"]);
            model.shzf = Convert.ToString(item["shzf"]);
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            model.remark = remark;
            model.updatetime = DateTime.Now;
            model.xccs = Convert.ToString(item["xccs"]);
            model.xgdyjjy = Convert.ToString(item["xgdyjjy"]);
            model.zlxqzgtzs = Convert.ToInt32(item["zlxqzgtzs"]);
            model.zygzld = Convert.ToString(item["zygzld"]);
            int month = DateTime.Now.Month;
            model.reportdate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM") + "-25");
            model.createuserid = userid;
            return model;
        }
        #endregion

        #region （表七）H7N9疫情(活禽交易)防控工作信息日报表
        public List<H7N7ReportModel> GetH7N7Report(DateTime reportdate)
        {
            return bll.GetH7N7Report(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddH7N7Report(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid); ;
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    H7N7ReportModel model = new H7N7ReportModel();
                    model = SetH7N7ReportModel(userid, unitid, unitname, remark, item);
                    bll.H7N7ReportAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            H7N7ReportModel model = new H7N7ReportModel();
                            model = SetH7N7ReportModel(userid, unitid, unitname, remark, item);
                            bll.H7N7ReportAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private H7N7ReportModel SetH7N7ReportModel(int userid, int createunitid, string createunitname, string remark, JObject item)
        {
            H7N7ReportModel model = new H7N7ReportModel();
            model.cchqjy = Convert.ToInt32(item["cchqjy"]);
            model.cdcl = Convert.ToInt32(item["cdcl"]);
            model.cdry = Convert.ToInt32(item["cdry"]);
            model.createtime = DateTime.Now;
            model.createuserid = userid;
            model.czhqsl = Convert.ToInt32(item["czhqsl"]);
            model.drgzzf = Convert.ToString(item["drgzzf"]);
            model.ffxczl = Convert.ToInt32(item["ffxczl"]);
            model.qlhqjy = Convert.ToInt32(item["qlhqjy"]);
            model.qt = Convert.ToString(item["qt"]);
            model.updatetime = DateTime.Now;
            model.reportdate = DateTime.Now;
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            model.remark = remark;
            model.xccs = Convert.ToInt32(item["xccs"]);
            return model;
        }
        #endregion

        #region （表八）特殊时期（互联网峰会）环境保障工作日报表
        public List<SpecialPeriodReportModel> GetSpecialReport(DateTime reportdate)
        {
            return bll.GetSpecialPeriodReport(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddSpecialReport(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid); ;
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            string statisticsuser = Convert.ToString(obj.statisticsuser);
            string shuser = Convert.ToString(obj.shuser);
            string bzcslshdcqk = Convert.ToString(obj.bzcslshdcqk);
            string fxwtycljg = Convert.ToString(obj.fxwtycljg);
            string drjxyrdgzap = Convert.ToString(obj.drjxyrdgzap);
            string xysjcmxtjjsx = Convert.ToString(obj.xysjcmxtjjsx);
            var starttime = Convert.ToString(obj.starttime);
            var endtime = Convert.ToString(obj.endtime);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    SpecialPeriodReportModel model = new SpecialPeriodReportModel();
                    model = SetSpecialPeriodReportModel(userid, unitid, unitname, remark, item, statisticsuser, shuser, bzcslshdcqk, fxwtycljg, drjxyrdgzap, xysjcmxtjjsx, starttime, endtime);
                    bll.SpecialPeriodReportAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            SpecialPeriodReportModel model = new SpecialPeriodReportModel();
                            model = SetSpecialPeriodReportModel(userid, unitid, unitname, remark, item, null, null, null, null, null, null, null, null);
                            bll.SpecialPeriodReportAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private SpecialPeriodReportModel SetSpecialPeriodReportModel(int userid, int createunitid, string createunitname, string remark, JObject item, string statisticsuser, string shuser, string bzcslshdcqk, string fxwtycljg, string drjxyrdgzap, string xysjcmxtjjsx, string starttime, string endtime)
        {
            SpecialPeriodReportModel model = new SpecialPeriodReportModel();
            model.bzcslshdcqk = bzcslshdcqk;
            model.cdcc = Convert.ToInt32(item["cdcc"]);
            model.cdrs = Convert.ToInt32(item["cdrs"]);
            model.dccs = Convert.ToInt32(item["dccs"]);
            model.drjxyrdgzap = drjxyrdgzap;
            model.ffxcgzs = Convert.ToInt32(item["ffxcgzs"]);
            model.fkje = Convert.ToInt32(item["fkje"]);
            model.fkjey = Convert.ToInt32(item["fkjey"]);
            model.fxs = Convert.ToInt32(item["fxs"]);
            model.fxwtycljg = fxwtycljg;
            model.gdzbcsctfy = Convert.ToInt32(item["gdzbcsctfy"]);
            model.ghzmj = Convert.ToInt32(item["ghzmj"]);
            model.qd = Convert.ToInt32(item["qd"]);
            model.shuser = shuser;
            model.starttime = Convert.ToDateTime(starttime);
            model.endtime = Convert.ToDateTime(endtime);
            model.whattime = Convert.ToDateTime(endtime);
            model.statisticsuser = statisticsuser;
            model.syqdjzlj = Convert.ToInt32(item["syqdjzlj"]);
            model.wagdsjqyjzlj = Convert.ToInt32(item["wagdsjqyjzlj"]);
            model.wzqyjzlj = Convert.ToInt32(item["wzqyjzlj"]);
            model.xysjcmxtjjsx = xysjcmxtjjsx;
            model.xzzf = Convert.ToInt32(item["xzzf"]);
            model.zg = Convert.ToInt32(item["zg"]);
            model.zgwcs = Convert.ToInt32(item["zgwcs"]);
            model.zgzmj = Convert.ToInt32(item["zgzmj"]);
            model.updatetime = DateTime.Now;
            model.reportdate = DateTime.Now;
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            model.remark = remark;
            model.createtime = DateTime.Now;
            model.createuserid = userid;
            return model;
        }
        #endregion

        #region （表九）秀洲区综合行政执法局土地执法案件情况分类统计报表（半月报）

        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        [HttpGet]
        public List<LandLawReportModel> GetLandLawHalfMonthReport(DateTime reportdate)
        {
            //DateTime dt = DateTime.Now;
            return bll.GetLandLawHalfMonthReport(reportdate);
        }

        [HttpPost]
        public HttpResponseMessage AddLandLawHalfMonth(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int userid = Convert.ToInt32(obj.userid);
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            string remark = Convert.ToString(obj.remark);

            //如果是行政许可科的，则更新全部
            if (unitid == ConfigManageClass.XZXKKID)
            {
                foreach (JObject item in jo)
                {
                    LandLawReportModel model = new LandLawReportModel();
                    model = SetLandLawHalfMonthModel(userid, unitid, unitname, remark, item);
                    bll.LandLawHalfMonthAddOrEdit(model);
                }
            }
            else
            {
                //否则，更新当前中队
                if (unittype == ConfigManageClass.ZDID)
                {
                    foreach (JObject item in jo)
                    {
                        if (unitid == Convert.ToInt32(item["unitid"]))
                        {
                            LandLawReportModel model = new LandLawReportModel();
                            model = SetLandLawHalfMonthModel(userid, unitid, unitname, remark, item);
                            bll.LandLawHalfMonthAddOrEdit(model);
                        }
                    }
                }
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        private static LandLawReportModel SetLandLawHalfMonthModel(int userid, int createunitid, string createunitname, string remark, JObject item)
        {
            LandLawReportModel model = new LandLawReportModel();
            model.ccwfjzmj = Convert.ToDouble(item["ccwfjzmj"]);
            model.cfqt = Convert.ToDouble(item["cfqt"]);
            model.classname = Convert.ToString(item["classname"]);
            model.cqqzcs = Convert.ToDouble(item["cqqzcs"]);
            model.createtime = DateTime.Now;
            model.createuserid = userid;
            model.fkje = Convert.ToDouble(item["fkje"]);
            model.gtbmyss = Convert.ToDouble(item["gtbmyss"]);
            model.lacczjs = Convert.ToDouble(item["lacczjs"]);
            model.mldzykn = Convert.ToString(item["mldzykn"]);
            model.czdzywt = Convert.ToString(item["czdzywt"]);
            model.msmj = Convert.ToDouble(item["msmj"]);
            model.mswfsd = Convert.ToDouble(item["mswfsd"]);
            model.nysd = Convert.ToDouble(item["nysd"]);
            model.qzgdmj = Convert.ToDouble(item["qzgdmj"]);
            model.reportdate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM") + "-15");
            model.sazmj = Convert.ToDouble(item["sazmj"]);
            model.sjcf = Convert.ToDouble(item["sjcf"]);
            model.sqqzzxjs = Convert.ToDouble(item["sqqzzxjs"]);
            model.tccfjy = Convert.ToDouble(item["tccfjy"]);
            model.unitid = Convert.ToInt32(item["unitid"]);
            model.unitname = Convert.ToString(item["unitname"]);
            model.updatetime = DateTime.Now;
            model.wfydajzjs = Convert.ToDouble(item["wfydajzjs"]);
            model.wjazjs = Convert.ToDouble(item["wjazjs"]);
            model.xdcfjdsjs = Convert.ToDouble(item["xdcfjdsjs"]);
            model.xgdyjjy = Convert.ToString(item["xgdyjjy"]);
            model.yjajs = Convert.ToDouble(item["yjajs"]);
            model.ysgajg = Convert.ToDouble(item["ysgajg"]);
            model.yysd = Convert.ToDouble(item["yysd"]);
            model.zhzfbmslyss = Convert.ToDouble(item["zhzfbmslyss"]);
            model.zjxszr = Convert.ToDouble(item["zjxszr"]);
            model.zjxszrqt = Convert.ToDouble(item["zjxszrqt"]);
            model.zygzld = Convert.ToString(item["zygzld"]);
            model.remark = remark;
            model.createunitid = createunitid;
            model.createunitname = createunitname;
            return model;
        }

        #endregion

        #region 获取报表模板列表
        [HttpGet]
        public Pag<ReportListModel> GetTemplateList(int start, int limit, int userid)
        {
            return bll.GetTemplateList(null, start, limit, userid);
        }

        [HttpGet]
        public Pag<ReportListModel> GetTemplateList(string filter, int start, int limit, int userid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetTemplateList(filters, start, limit, userid);
        }
        #endregion

        #region 获取报表列表
        [HttpGet]
        public Pag<ReportListModel> GetReportList(int start, int limit)
        {
            return bll.GetReportList(null, start, limit);
        }

        [HttpGet]
        public Pag<ReportListModel> GetReportList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetReportList(filters, start, limit);
        }
        #endregion

        #region 获取历史报表数据
        [HttpGet]
        public Pag<ReportListModel> GetHisReportList(int start, int limit)
        {
            return bll.GetHisReportList(null, start, limit);
        }

        [HttpGet]
        public Pag<ReportListModel> GetHisReportList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetHisReportList(filters, start, limit);
        }
        #endregion

        #region 获取累计报表列表数据
        [HttpGet]
        public Pag<ReportListModel> GetAddUpReportList(int start, int limit)
        {
            return bll.GetAddUpReportList(null, start, limit);
        }

        [HttpGet]
        public Pag<ReportListModel> GetAddUpReportList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetAddUpReportList(filters, start, limit);
        }
        #endregion

        #region 启用报表模板
        public HttpResponseMessage EnableReport(ReportListModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            int success = bll.EnableReport(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 报表模板编辑
        [HttpPost]
        public HttpResponseMessage ModifyTemplateReport(ReportListModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            int success = bll.ModifyTemplateReport(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 报表统计
        [HttpPost]
        public HttpResponseMessage StatisticalReport(dynamic obj)
        {
            string json = Convert.ToString(obj.json);
            JArray jo = new JArray();
            jo = (JArray)JsonConvert.DeserializeObject(json);
            int reportid = Convert.ToInt32(obj.reportid); ;
            DateTime reportdate = Convert.ToDateTime(obj.reportdate);
            string remark = Convert.ToString(obj.remark);
            int userid = Convert.ToInt32(obj.userid); ;
            int unitid = Convert.ToInt32(obj.unitid);
            int unittype = Convert.ToInt32(obj.unittype);
            string unitname = Convert.ToString(obj.unitname);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = 0;
            if (unitid == ConfigManageClass.XZXKKID)
            {
                switch (reportid)
                {
                    case 1:
                        AddLandLaw(obj);
                        break;
                    case 2:
                        AddSafetifyinProduction(obj);
                        break;
                    case 3:
                        AddStrawAndWasteControl(obj);
                        break;
                    case 4:
                        AddScaleFarmsControl(obj);
                        break;
                    case 5:
                        AddLawInWater(obj);
                        break;
                    case 6:
                        AddBureauCenterWork(obj);
                        break;
                    case 7:
                        AddH7N7Report(obj);
                        break;
                    case 8:
                        AddSpecialReport(obj);
                        break;
                    case 9:
                        AddLandLawHalfMonth(obj);
                        break;
                    default:
                        break;

                };
                success = bll.StatisticalReport(reportid, reportdate, remark);
            }
            else
            {
                response.Content = new StringContent("failure", Encoding.GetEncoding("UTF-8"), "text/html");
                return response;
            }
            if (success > 0)
            {
                response.Content = new StringContent("success", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("fault", Encoding.GetEncoding("UTF-8"), "text/html");
                return response;
            }
            return response;
        }
        #endregion

        #region 报表导出
        /// <summary>
        /// 报表导出
        /// </summary>
        /// <param name="type">type=1填报报表 type=2:累计报表</param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage ExportExcel()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string excelname = request["excelname"];
            string exceltitle = request["exceltitle"];
            string exceldata = request["exceldata"];
            string filter = request["filter"];
            int reportid = Convert.ToInt32(request["reportid"]);
            int year=0;
            if (request["reportyear"] != null)
            {
                year = Convert.ToInt32(request["reportyear"]);
            }
            int type = Convert.ToInt32(request["type"]);
            DateTime reportdate=new DateTime();
            if(request["reportdate"]!=null)
            {
                reportdate = Convert.ToDateTime(request["reportdate"]);
            }
            string filetemppath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/reportTemplate.xls");
            if (type == 2) {
                filetemppath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/reportTemplate2.xls");
            }
            string outtemppath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/out.xls");

            if (reportid == 1)
            {
                List<LandLawReportModel> list = GetLandLawReport(reportdate);
                CommonFunctionBLL<LandLawReportModel> cfBll = new CommonFunctionBLL<LandLawReportModel>(exceldata);
                return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle,0);
            }
            else if (reportid == 2)
            {
                List<SafetifyinProductionReportModel> list = new List<SafetifyinProductionReportModel>();
                CommonFunctionBLL<SafetifyinProductionReportModel> cfBll = new CommonFunctionBLL<SafetifyinProductionReportModel>(exceldata);
                if (type == 1)
                {
                    list = GetSafetifyinProductionReport(reportdate);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 1);
                }
                else
                {
                    list = ViewAddUpSafetifyinProductionReport(year);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 2);
                }
            }
            else if (reportid == 3)
            {
                List<StrawAndWasteControlModel> list = new List<StrawAndWasteControlModel>();
                CommonFunctionBLL<StrawAndWasteControlModel> cfBll = new CommonFunctionBLL<StrawAndWasteControlModel>(exceldata);

                if (type == 1)
                {
                    list = GetStrawAndWasteControlReport(reportdate);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 1);
                }
                else
                {
                    list = ViewStrawAndWasteControlReport(year);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 2);
                }
            }
            else if (reportid == 4)
            {
                List<ScaleFarmsControlReportModel> list = new List<ScaleFarmsControlReportModel>();
                CommonFunctionBLL<ScaleFarmsControlReportModel> cfBll = new CommonFunctionBLL<ScaleFarmsControlReportModel>(exceldata);

                if (type == 1)
                {
                    list = GetScaleFarmsControl(reportdate);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 1);
                }
                else
                {
                    list = ViewScaleFarmsControl(year);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 2);
                }
            }
            else if (reportid == 5)
            {
                List<LawInWaterModel> list = new List<LawInWaterModel>();
                CommonFunctionBLL<LawInWaterModel> cfBll = new CommonFunctionBLL<LawInWaterModel>(exceldata);
                if (type == 1)
                {
                    list = GetLawInWater(reportdate);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 1);
                }
                else
                {
                    list = ViewLawInWater(year);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 2);
                }
            }
            else if (reportid == 6)
            {
                List<BureauCenterWorkReportModel> list = new List<BureauCenterWorkReportModel>();
                CommonFunctionBLL<BureauCenterWorkReportModel> cfBll = new CommonFunctionBLL<BureauCenterWorkReportModel>(exceldata);
                if (type == 1)
                {
                    list = GetBureauCenterWork(reportdate);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 1);
                }
                else
                {
                    list = ViewBureauCenterWork(year);
                    return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 2);
                }
            }
            else if (reportid == 7)
            {
                List<H7N7ReportModel> list = GetH7N7Report(reportdate);
                CommonFunctionBLL<H7N7ReportModel> cfBll = new CommonFunctionBLL<H7N7ReportModel>(exceldata);
                return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 0);
            }
            else if (reportid == 8)
            {
                List<SpecialPeriodReportModel> list = GetSpecialReport(reportdate);
                CommonFunctionBLL<SpecialPeriodReportModel> cfBll = new CommonFunctionBLL<SpecialPeriodReportModel>(exceldata);
                return cfBll.saveExcel(reportid, filetemppath, outtemppath, list, excelname, exceltitle, 0);
            }
            else
            {
                return null;
            }

        }
        #endregion

        #region 累计报表查看

        #region 表二
        /// <summary>
        /// （表二）安全生产（月报）
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        public List<SafetifyinProductionReportModel> ViewAddUpSafetifyinProductionReport(int year)
        {
            return bll.ViewAddUpSafetifyinProductionReport(year);
        }
        #endregion

        #region 表三
        /// <summary>
        /// （表三）秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        public List<StrawAndWasteControlModel> ViewStrawAndWasteControlReport(int year)
        {
            //环境保护
            return bll.ViewStrawAndWasteControlReport(year);
        }
        #endregion

        #region 表四
        /// <summary>
        /// （表四）规模养殖场执法管控情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        public List<ScaleFarmsControlReportModel> ViewScaleFarmsControl(int year)
        {
            //环境保护（二）
            return bll.ViewScaleFarmsControl(year);
        }
        #endregion

        #region 表五
        /// <summary>
        /// （表五）秀洲区综合行政执法局水行政执法情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        public List<LawInWaterModel> ViewLawInWater(int year)
        {
            //水利
            return bll.ViewLawInWater(year);
        }
        #endregion

        #region 表六
        /// <summary>
        /// （表六）秀洲区综合行政执法局中心工作开展情况报表
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        public List<BureauCenterWorkReportModel> ViewBureauCenterWork(int year)
        {
            //中心工作
            return bll.ViewBureauCenterWork(year);
        }
        #endregion

        #endregion

    }
}