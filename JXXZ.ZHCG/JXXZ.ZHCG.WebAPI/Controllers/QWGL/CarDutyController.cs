using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.QWGL
{
    public class CarDutyController : ApiController
    {
        /// <summary>
        /// 添加车辆任务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCarDuty()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            QW_CarTasksModel model = new QW_CarTasksModel();
            QW_CarTasksBLL bll = new QW_CarTasksBLL();

            if (!string.IsNullOrEmpty(request.Form["carids[]"]))
            {
                List<CarNum> carlist = new List<CarNum>();
                foreach (var item in request.Form["carids[]"].Split(','))
                {
                    CarNum cnmodel = new CarNum();
                    cnmodel.carid = Convert.ToInt32(item);
                    cnmodel.carnum = bll.GetCarNumByID(Convert.ToInt32(item));
                    carlist.Add(cnmodel);
                }
                model.carnums = carlist;
            }
            if (!string.IsNullOrEmpty(request.Form["weeks[]"]))
            {
                List<string> weeklist = new List<string>();
                foreach (var item in request.Form["weeks[]"].Split(','))
                {
                    weeklist.Add(item);
                }
                model.weeks = weeklist;
            }
            if (!string.IsNullOrEmpty(request.Form["taskstarttime"]))
                model.taskstarttime = Convert.ToDateTime(request.Form["taskstarttime"]);
            if (!string.IsNullOrEmpty(request.Form["taskendtime"]))
                model.taskendtime = Convert.ToDateTime(request.Form["taskendtime"]);
            if (!string.IsNullOrEmpty(request.Form["patrolid"]))
                model.patrolid = Convert.ToInt32(request.Form["patrolid"]);
            if (!string.IsNullOrEmpty(request.Form["sszd"]))
                model.sszd = Convert.ToInt32(request.Form["sszd"]);
            if (!string.IsNullOrEmpty(request.Form["ssbc"]))
                model.ssbc = Convert.ToInt32(request.Form["ssbc"]);

            model.carnum = request.Form["carnum"];
            model.taskexplain = request.Form["taskexplain"];
            model.createtime = DateTime.Now;
            model.createuserid = Convert.ToInt32(request.Form["userid"]);

            bll.AddCarTask(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 查询任务详情
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public QW_CarTasksModel GetCarTask(string carnum, string sdate)
        {
            QW_CarTasksBLL bll = new QW_CarTasksBLL();
            DateTime? SDate = null;
            if (!string.IsNullOrEmpty(sdate))
                SDate = Convert.ToDateTime(sdate);

            return bll.GetCarTask(carnum, (DateTime)SDate);
        }

        /// <summary>
        /// 根据部门获取车辆
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<QW_CarsModel> GetCarsUnitList(string unitid)
        {
            QW_CarsBLL bll = new QW_CarsBLL();

            return bll.GetCarsUnitList(Convert.ToInt32(unitid));
        }

        /// <summary>
        /// 修改车辆任务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage ModifyCarTask()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            QW_CarTasksBLL bll = new QW_CarTasksBLL();
            QW_CarTasksModel model = new QW_CarTasksModel();

            model.carnum = request.Form["carnum"];
            if (!string.IsNullOrEmpty(request.Form["taskstarttime"]))
                model.taskstarttime = Convert.ToDateTime(request.Form["taskstarttime"]);
            if (!string.IsNullOrEmpty(request.Form["patrolid"]))
                model.patrolid = Convert.ToInt32(request.Form["patrolid"]);
            model.taskexplain = request.Form["taskexplain"];
            bll.ModifyCarTask(model);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }

        /// <summary>
        /// 删除车辆任务
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage DeleteCarTask(int cartaskid)
        {
            QW_CarTasksBLL bll = new QW_CarTasksBLL();
            bll.DeleteCarTask(cartaskid);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 获取车辆排班表格视图
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public QW_ViewDuty GetCarDutyView(string timeParams, string unitId)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;

            //查询时间段
            DateTime dt = DateTime.Now;
            int timeparams = Convert.ToInt32(timeParams);
            if (timeparams != 0)
                dt = dt.AddDays(timeparams);
            QW_ViewDuty model = new QW_ViewDuty();

            model.GetTableOneMes = GetTableOneMes(dt);//表格日期
            model.GetTableContentMes = GetTableContentMes(dt, Convert.ToInt32(unitId));//获得表格内容

            return model;
        }

        /// <summary>
        /// 获取日期表
        /// </summary>
        /// <param name="dtNow">时间</param>
        /// <returns></returns>
        public string GetTableOneMes(DateTime dtNow)
        {
            StringBuilder sbMes = new StringBuilder();
            sbMes.Append("<tr>");
            sbMes.Append("<th style=\"text-align: center; width: 12%; height:30px; border:1px solid #ddd; border-collapse: collapse;\">&nbsp;</th>");

            int startIndex = 0;
            int endIndex = 0;
            GetStartEndIndex(dtNow, ref startIndex, ref endIndex);

            for (int i = startIndex; i < endIndex; i++)
            {
                string dayWeek;
                string MD = GetMDT(dtNow, i, out dayWeek);
                sbMes.Append("<th style=\"text-align: center; width: 12%; height:30px; border:1px solid #ddd; border-collapse: collapse;\">" + MD + "(" + dayWeek.Replace("星期", "") + ")</th>");
            }

            sbMes.Append("</tr>");
            return sbMes.ToString();
        }

        /// <summary>
        /// 获取起始时间和结束时间
        /// </summary>
        /// <param name="dtNow">时间</param>
        /// <param name="startIndex">起始编号</param>
        /// <param name="endIndex">结束编号</param>
        public static void GetStartEndIndex(DateTime dtNow, ref int startIndex, ref int endIndex)
        {
            switch (dtNow.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    startIndex = 0;
                    endIndex = 7;
                    break;
                case DayOfWeek.Tuesday:
                    startIndex = -1;
                    endIndex = 6;
                    break;
                case DayOfWeek.Wednesday:
                    startIndex = -2;
                    endIndex = 5;
                    break;
                case DayOfWeek.Thursday:
                    startIndex = -3;
                    endIndex = 4;
                    break;
                case DayOfWeek.Friday:
                    startIndex = -4;
                    endIndex = 3;
                    break;
                case DayOfWeek.Saturday:
                    startIndex = -5;
                    endIndex = 2;
                    break;
                case DayOfWeek.Sunday:
                    startIndex = -6;
                    endIndex = 1;
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// 返回月.日
        /// </summary>
        /// <param name="dtnow">时间</param>
        /// <param name="type">以当前为星期一计算前7天和后7天【-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6，7】</param>
        /// <returns></returns>
        private string GetMDT(DateTime dtnow, int type, out string dayWeek)
        {
            DateTime dtnow_New = dtnow.AddDays(type);
            dayWeek = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.GetDayName(dtnow_New.DayOfWeek);
            return dtnow_New.Month + "." + dtnow_New.Day;
        }

        /// <summary>
        /// 获取内容
        /// </summary>
        /// <param name="dtNow">时间</param>
        /// <returns></returns>
        public string GetTableContentMes(DateTime dtNow, int unitId)
        {
            StringBuilder sbMes = new StringBuilder();
            QW_CarsBLL bll = new QW_CarsBLL();
            QW_CarTasksBLL utbll = new QW_CarTasksBLL();
            IList<QW_CarsModel> carList = bll.GetCarsUnitList(unitId);

            #region 拼接日历视图
            if (carList != null && carList.Count() > 0)
            {
                //获取要显示的周期
                int startIndex = 0;
                int endIndex = 0;
                GetStartEndIndex(dtNow, ref startIndex, ref endIndex);
                IList<qw_cartasks> CarTaskList = utbll.GetCarTaskList();

                foreach (var item in carList)
                {
                    sbMes.Append("<tr>");
                    sbMes.Append("<td style=\"text-align: center; width: 12%; height:30px; border:1px solid #ddd; border-collapse: collapse; line-height:60px; background:#f2f5f7\">" + item.carnumber + "</td>");
                    for (int i = startIndex; i < endIndex; i++)//遍历对应时间的勤务
                    {

                        DateTime dtnow_New = dtNow.AddDays(i);

                        DateTime dtOne = dtnow_New.Date.Date;
                        DateTime dtTwo = dtOne.AddDays(1);

                        IList<qw_cartasks> CarTaskList_Where = CarTaskList
                            .Where(a => a.carnum == item.carnumber && a.taskstarttime >= dtOne && a.taskstarttime < dtTwo).ToList();

                        string onlyT = item.carid + "_" + dtnow_New.ToString("yyyyMMdd");

                        if (CarTaskList_Where != null && CarTaskList_Where.Count() > 0)
                        {
                            sbMes.Append("<td  id=\"td_" + onlyT + "\"   style=\"text-align: center; width: 12%; height:30px; border:1px solid #ddd; border-collapse: collapse;background:#F0AD4E\" ><img src='/Images/images/normal.png' style='width:30px; height:30px; cursor:pointer;' title='点我修改车辆任务' onclick=\"EditCarTask('" + item.carnumber + "','" + dtnow_New.ToString("yyyy-MM-dd") + "','" + item.unitid + "','" + item.carid + "')\"/></td>");
                        }
                        else
                        {
                            sbMes.Append("<td id=\"td_" + onlyT + "\"  style=\"text-align: center; width: 12%; height:30px; border:1px solid #ddd; border-collapse: collapse;background:#f2f5f7\" ><img src='/Images/images/abnormal.png' style='width:30px; height:30px; cursor:pointer;' title='点我添加车辆任务' onclick=\"AddCarTask('" + item.carnumber + "','" + dtnow_New.ToString("yyyy-MM-dd") + "','" + item.unitid + "','" + item.carid + "')\" /></td>");
                        }
                    }
                    sbMes.Append("</tr>");
                }
            }
            else
            {
                sbMes.Append("<tr>");
                sbMes.Append("<td style=\"text-align: center; width: 12%; height:30px; border:1px solid #ddd; border-collapse: collapse; color:red;\" colspan=\"8\">没有查询到车辆</td>");
                sbMes.Append("</tr>");
            }
            #endregion




            return sbMes.ToString();
        }

    }
}
