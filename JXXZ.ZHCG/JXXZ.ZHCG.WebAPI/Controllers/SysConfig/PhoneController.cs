using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.BLL.administrativeapprovalBLL;
using JXXZ.ZHCG.BLL.AlarmDetail;
using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.CitizenServiceBLL;
using JXXZ.ZHCG.BLL.ConservationBLL;
using JXXZ.ZHCG.BLL.PeripheryBLL;
using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.LegalCaseDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AlarmDetail;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.PeripheryModel;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using JXXZ.ZHCG.WebAPI.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.SysConfig
{
    [LoggingFilter]
    public class PhoneController : ApiController
    {
        #region 行政审批

        #region 审批
        /// <summary>
        /// 待办审批列表
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<object> GetSubjectList(int userId, int start, int limit)
        {
            //var obj = new
            //{
            //    id = 1,
            //    name = "关于嘉兴市秀洲区供水分公司道路开挖一般审批",
            //    title = "道路开挖",
            //    date = DateTime.Now
            //};
            //return PagHelper.GetPagList(obj, start, limit);
            LicenseBLL bll = new LicenseBLL();
            List<Filter> filters = new List<Filter>();
            List<object> rst = new List<object>();
            var list = bll.GetPendingCaseSourcesList(filters, start, limit, userId);
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.licensingid,
                    title = item.splx,
                    name = item.xksx,
                    date = item.createtime,
                    address = item.b_address
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);
        }

        /// <summary>
        /// 已办审批
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<object> GetAlreadyApprovedList(int userId, int start, int limit)
        {
            //return GetSubjectList(userId, start, limit);
            LicenseBLL bll = new LicenseBLL();
            List<Filter> filters = new List<Filter>();
            List<object> rst = new List<object>();
            var list = bll.GetFinishCaseSourcesList(filters, start, limit, userId);
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.licensingid,
                    title = item.splx,
                    name = item.xksx,
                    date = item.createtime,
                    address = item.b_address
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);

        }

        /// <summary>
        /// 全部审批
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<object> GetAllApproved(int userId, int start, int limit)
        {
            LicenseBLL bll = new LicenseBLL();
            List<Filter> filters = new List<Filter>();
            List<object> rst = new List<object>();
            var list = bll.GetAllCaseSourcesList(filters, start, limit);
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.licensingid,
                    title = item.splx,
                    name = item.xksx,
                    date = item.createtime,
                    address = item.b_address
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);
        }

        #endregion

        #region 行政许可
        [HttpGet]
        public Pag<object> GetXZXKList(int userId, int start, int limit, string filter)
        {
            //return GetSubjectList(userId, start, limit);
            LicenseBLL bll = new LicenseBLL();
            List<Filter> filters = new List<Filter>();
            List<object> rst = new List<object>();
            filters.Add(CreateFilter("xksx", filter));
            var list = bll.GetAllCaseSourcesList(filters, start, limit);
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.licensingid,
                    title = item.splx,
                    name = item.xksx,
                    date = item.createtime,
                    address = item.b_address
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);

            //var obj = new
            //{
            //    id = 1,
            //    name = "关于嘉兴市秀洲区供水分公司道路开挖一般审批",
            //    title = "道路开挖",
            //    date = DateTime.Now
            //};
            //return PagHelper.GetPagList(obj, start, limit);


        }
        #endregion

        #region 门前三包
        /// <summary>
        /// 门前三包列表
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<object> GetMQSBList(int userId, int start, int limit, string filter)
        {
            ThreeBagsBLL bll = new ThreeBagsBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("storename", filter));
            List<object> rst = new List<object>();
            var list = bll.GetSourcesList(filters, start, limit);
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.storeid,
                    name = item.storename,
                    address = item.address,
                    date = item.createtime,
                    imageUrl = "图片路径(可能为null).jpg"
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);
        }

        /// <summary>
        /// 获取门前三包详情.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public object GetMQSBDetail(int id)
        {
            ThreeBagsBLL bll = new ThreeBagsBLL();
            var model = bll.GetThreeBagsInfo(id);
            var gps = GetGPS(model.geography);
            var obj = new
            {
                id = model.storeid,
                name = model.storename,
                typeId = model.storetype,         //店家类型id
                type = model.storetypename,
                personName = model.person,
                zjh = model.card,     //证件号
                phone = model.contactphone,
                address = model.address,
                longitude = gps.longitude,
                latitude = gps.latitude,
                geography = model.geography,
                remark = model.remark,
                imageList = model.imgUrl
            };
            //for (int i = 0; i < 2; i++)
            //{
            //    var image = new
            //    {
            //        id = i + 1,
            //        name = "图片名称.jpg",
            //        path = "图片路径.jpg"
            //    };
            //    obj.imageList.Add(image);
            //}
            return obj;

        }
        #endregion

        #endregion

        #region 法律法规
        /// <summary>
        /// 法律法规列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetFLFGList(string filter, int start, int limit)
        {
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("powername", filter));
            FreeDiscretionBLL bll = new FreeDiscretionBLL();
            Paging<List<InheritCaseSourceModel>> list = bll.GetFreeDiscretionList(filters, start, limit);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    ID = item.powerid,
                    value = item.powername,
                    date = item.createtime
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);
        }

        /// <summary>
        /// 法律法规详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object GetFLFGModel(string id)
        {
            FreeDiscretionBLL bll = new FreeDiscretionBLL();
            InheritCaseSourceModel model = bll.GetFreeDiscretionModel(id);
            var obj = new
            {
                id = id,
                qllx = model.powername,     //权力事项
                wftk = model.flfg,      //法律法规
                cfyj = model.clyj,     //裁量依据
                qjqw = model.wfqx,     //违法情形
                qjyb = model.cf,     //处罚结果
            };
            return obj;
        }
        #endregion

        #region 通讯录
        /// <summary>
        /// 返回通讯录
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IEnumerable<object> GetMainList(int userId, int unitid, string name)
        {
            UserBLL userbll = new UserBLL();
            UnitBLL unitbll = new UnitBLL();
            int id = 0;
            List<Filter> filters = new List<Filter>();
            if (!string.IsNullOrEmpty(name))
                filters.Add(CreateFilter("DisplayName", name));
            base_units model = unitbll.GetUnitById(unitid);
            if (model != null)
            {
                if (model.unittypeid == 2)
                    id = model.id;
                else if (model.unittypeid == 4)
                    id = (int)model.parentid;
            }

            List<PhoneModel> list = userbll.GetTreeMonitor(filters, id);
            return list;

        }

        public phoneDetails GetphoneDetails(int userid)
        {
            UserBLL bll = new UserBLL();
            return bll.GetphoneDetails(userid);
        }
        #endregion

        #region 一般案件
        /// <summary>
        /// 一般案件列表.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetCaseList(int userId, int start, int limit)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            List<object> rst = new List<object>();
            var list = bll.GetCaseList(null, start, limit, userId, 1, "2017030613400001");
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.wfsid,
                    title = item.casename,      //案由
                    segmentValue = item.wfsname,      //当前环节
                    segmentId = item.wfsid,                      //当前环节id
                    disposePerson = item.contact,
                    wfdid = item.wfdid,
                    wfsid = item.wfsid,
                    wfsaid = item.wfsaid,
                    disposePersonId = 1,
                    unitId = 2,
                    caseid = item.caseid,
                    extendedDate = item.etime ?? DateTime.MinValue
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);

        }

        public Pag<object> GetCaseListByUnitId(int? unitId, DateTime startTime, DateTime endTime, int start, int limit)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            List<Filter> filters = new List<Filter>();
            if (unitId != null && unitId != 0)
            {
                filters.Add(CreateFilter("unitid", unitId.ToString()));
            }

            filters.Add(CreateFilter("stime", startTime.ToString("yyyy-MM-dd HH:mm:ss")));
            filters.Add(CreateFilter("etime", endTime.ToString("yyyy-MM-dd HH:mm:ss")));
            var list = bll.GetAllCaseList(filters, start, limit, "2017030613400001");
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.wfsid,
                    title = item.casereason,      //案由
                    segmentValue = item.wfsname,      //当前环节
                    segmentId = item.wfsid,                      //当前环节id
                    disposePerson = item.contact,
                    wfsid = item.wfsid,
                    wfdid = item.wfdid,
                    wfsaid = item.wfsaid,
                    disposePersonId = 1,
                    caseid = item.caseid,
                    unitId = 2,
                    p_name = item.p_name,
                    f_name = item.f_name,
                    extendedDate = item.etime ?? DateTime.MinValue
                };
                rst.Add(obj);
            }

            return PagHelper.CreatePag(rst, list.Total);
        }

        //  api/Phone/GetUsersListRole?rolename=中队长
        /// <summary>
        /// 根据用户角色获取用户
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<object> GetUsersListRole(string rolename,int? caseid=null)
        {
            UserBLL bll = new UserBLL();

            List<object> rst = new List<object>();
            List<UserModel> list = bll.GetUsersListRole(rolename, 0, caseid);
            foreach (var item in list)
            {
                var obj = new
                {
                    value = item.ID,
                    text = item.DisplayName,
                };
                rst.Add(obj);
            };
            return rst;
        }

        //  api/Phone/GetUsersListUnit?unitname=法制科
        /// <summary>
        /// 根据用户类型获取用户
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<object> GetUsersListUnit(string unitname)
        {
            UserBLL bll = new UserBLL();
            List<object> rst = new List<object>();
            List<UserModel> list = bll.GetUsersListUnit(unitname);
            foreach (var item in list)
            {
                var obj = new
                {
                    value = item.ID,
                    text = item.DisplayName,
                };
                rst.Add(obj);
            };
            return rst;
        }
        #endregion

        #region 简易案件
        /// <summary>
        /// 获取简易案件
        /// </summary>
        /// <param name="userId">用户id</param>
        /// <param name="teamId">中队id</param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetEasyCaseList(int userId, int? teamId, DateTime startTime, DateTime endTime, int start, int limit)
        {
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            List<Filter> filters = new List<Filter>();
            if (teamId != null && teamId != 0)
            {
                filters.Add(CreateFilter("unitid", teamId.ToString()));
            }
            filters.Add(CreateFilter("stime", startTime.ToString("yyyy-MM-dd HH:mm:ss")));
            filters.Add(CreateFilter("etime", endTime.ToString("yyyy-MM-dd HH:mm:ss")));
            var list = bll.GetSimpleCaseList(filters, start, limit);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.simpleid,
                    name = item.casereason,
                    address = item.caseaddress,
                    imgUrl = "图片地址.jpg",
                    date = item.createtime ?? DateTime.MinValue
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);


        }

        /// <summary>
        /// 获取全部简易案件
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="name"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetAllEasyCaseList(int userId, string name, int start, int limit)
        {
            Case_SimpleCasesBLL bll = new Case_SimpleCasesBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("casereason", name));
            var list = bll.GetSimpleCaseList(filters, start, limit);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.simpleid,
                    name = item.casereason,
                    address = item.caseaddress,
                    imgUrl = "图片地址.jpg",
                    date = item.createtime ?? DateTime.MinValue
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);

        }

        #endregion

        #region 巡查任务
        /// <summary>
        /// 我的巡查任务
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<object> GetPatrolList(int userId, int start, int limit)
        {
            QW_UserTasksBLL bll = new QW_UserTasksBLL();
            var list = bll.GetNewUserTaskList(userId, start, limit);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                bool flg = item.taskstarttime.Date == DateTime.Now.Date;
                var obj = new
                {
                    id = item.usertaskid,
                    time = item.taskstarttime,
                    patrolStartTime = returnTime(item.taskstarttime, item.taskstarttime),   //巡查开始时间
                    patrolEndTime = returnTime(item.taskstarttime, item.taskendtime),    //巡查结束时间
                    signStartTime = returnTime(item.taskstarttime, item.start_stime),     //签到开始
                    signEndTime = returnTime(item.taskstarttime, item.end_stime),       //签到结束
                    signOutStartTime = returnTime(item.taskstarttime, item.end_stime), //签退开始
                    signOutEndTime = returnTime(item.taskstarttime, item.end_etime),   //签退结束
                    patrolPoint = item.xcgrometry,
                    signPoint = item.qdgrometry,
                    remark = item.taskexplain,
                    isSignIn = flg,
                    patrolname = item.patrolname,
                    signinareaname = item.signinareaname,

                };
                rst.Add(obj);
            }

            return PagHelper.CreatePag(rst, list.Total);
        }

        /// <summary>
        /// 巡查历史
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<object> GetPatrolHistory(int userId, int start, int limit)
        {
            QW_UserTasksBLL bll = new QW_UserTasksBLL();
            var list = bll.GetOldUserTaskList(userId, start, limit);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                bool flg = item.taskstarttime.Date == DateTime.Now.Date;
                var obj = new
                {
                    id = item.usertaskid,
                    time = item.taskstarttime,
                    patrolStartTime = returnTime(item.taskstarttime, item.taskstarttime),   //巡查开始时间
                    patrolEndTime = returnTime(item.taskstarttime, item.taskendtime),    //巡查结束时间

                };
                rst.Add(obj);
            }

            return PagHelper.CreatePag(rst, list.Total);

        }

        /// <summary>
        /// 违停案件列表
        /// </summary>
        /// <param name="unitId"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetIllegalList(int? unitId, DateTime startTime, DateTime endTime, int start, int limit)
        {
            Case_WtajsBLL bll = new Case_WtajsBLL();
            List<object> list = new List<object>();
            List<Filter> filters = new List<Filter>();
            if (unitId != null && unitId != 0)
            {
                filters.Add(CreateFilter("unitid", unitId.ToString()));
            }
            filters.Add(CreateFilter("stime", startTime.ToString("yyyy-MM-dd HH:mm:ss")));
            filters.Add(CreateFilter("etime", endTime.ToString("yyyy-MM-dd HH:mm:ss")));
            var rst = bll.GetApiWt(filters, start, limit);
            var items = rst.Items;
            foreach (var item in items)
            {
                var obj = new
                {
                    id = item.wtid,
                    imgPath = item.photo1,
                    address = item.wt_address,
                    carNumber = item.car_num,
                    time = item.wt_time,
                    imgUrl = item.photo1
                };
                list.Add(obj);
            }

            return PagHelper.PagList(list, rst.Total);
        }

        public Pag<object> GetAllIllegalList(int userId, string name, int start, int limit)
        {
            Case_WtajsBLL bll = new Case_WtajsBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("carnum", name));
            var list = bll.GetApiWt(filters, start, limit);
            List<object> rst = new List<object>();
            var items = list.Items;
            foreach (var item in items)
            {
                var obj = new
                {
                    id = item.wtid,
                    imgPath = item.photo1,
                    address = item.wt_address,
                    carNumber = item.car_num,
                    time = item.wt_time,
                    imgUrl = item.photo1
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);

        }

        #endregion

        #region 报警中心

        public Pag<object> GetAlarmList(int userId, DateTime startTime, DateTime endTime, int start, int limit)
        {
            AlarmDetailBLL bll = new AlarmDetailBLL();
            List<object> list = new List<object>();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("stime", startTime.ToString("yyyy-MM-dd HH:mm:ss")));
            filters.Add(CreateFilter("etime", endTime.ToString("yyyy-MM-dd HH:mm:ss")));
            var AlarmDetail = bll.GetUserAlarmDetailList(filters, start, limit, userId);
            DateTime date = startTime;
            Random rnd = new Random();
            foreach (var item in AlarmDetail.Items)
            {
                var obj = new
                {
                    id = item.id,
                    time = item.createtime,
                    status = item.state == 0 ? "未处理" : item.state == 1 ? "已生效" : "已作废",
                    name = item.username,
                    type = item.alarmtype == 1 ? "停留报警" : item.alarmtype == 2 ? "越界报警" : "离线报警",
                    startDate = item.alarmstrattime,
                    endDate = item.alarmendtime,
                    isallege = item.isallege
                };
                list.Add(obj);
            }

            return PagHelper.CreatePag(list, AlarmDetail.Total);
        }

        /// <summary>
        /// 提交申诉
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpPost]
        public object SubmitAlarmDetailAppeals(AlarmDetailModel model)
        {
            AlarmDetailBLL bll = new AlarmDetailBLL();
            try
            {
                int id = bll.SubmitAlarmDetailAppeals(model);
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
            }

        }
        #endregion

        #region 智能巡查

        /// <summary>
        /// 智能巡查查询.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="radius">半径</param>
        /// <param name="type">类型,1:沿街店家,2:小摊小贩,3:行政审批</param>
        /// <returns></returns>
        [HttpGet]
        public Pag<object> GetPatrolList(int userId, string name, int radius, int type, int start, int limit, double lat, double lng)
        {
            List<object> rst = new List<object>();
            PeripheryBLL peripherybll = new PeripheryBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("name", name));
            var list = new Paging<List<PeripheryInspection>>();
            switch (type)
            {
                case 1:
                    list = peripherybll.GetMqsbList(filters,lat, lng, radius, 1, start, limit);
                    break;
                case 2:
                    list = peripherybll.GetMqsbList(filters,lat, lng, radius, 2, start, limit);
                    break;
                case 3:
                    break;
                default:
                    break;
            }
            foreach (var item in list.Items)
            {
                var obj = new
                 {
                     id = item.id,
                     name = item.name,
                     explain = type == 2 ? item.explain : "",
                     distance = item.distance,
                     type = type
                 };
                rst.Add(obj);
            }

            return PagHelper.CreatePag(rst, list.Total);

        }
        #endregion

        #region 统计分析
        /// <summary>
        /// 统计市民事件
        /// </summary>
        /// <param name="type">1=日,2=月,3=年</param>
        /// <returns></returns>
        [HttpGet]
        public object GetStatisticsBySMSJ(int type)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<SM_Count> list = bll.GetStatisticsBySMSJ(type);

            Random rnd = new Random();
            int count = 0;
            //int maxCount = (int)Math.Pow(10, type);
            List<object> rst = new List<object>();
            for (int i = 0; i < list.Count(); i++)
            {
                var obj = new
                {
                    id = list[i].Source,
                    name = list[i].SourceName,
                    count = list[i].sm_count
                };
                count += obj.count;
                rst.Add(obj);
            }

            return new
            {
                Items = rst,
                Total = bll.CqEventCount(0, type),//count,
                Complete = bll.CqEventCount(1, type),
                Kept = bll.CqEventCount(2, type)

            };
        }
        /// <summary>
        /// 执法案件分析
        /// </summary>
        /// <param name="type">1=日,2=月,3=年</param>
        /// <returns></returns>
        [HttpGet]
        public object GetStatisticsByZFAJ(int type)
        {
            Case_CasesBLL bll = new Case_CasesBLL();
            List<CaseCount> list = bll.GetCaseCount(type);
            Random rnd = new Random();
            int count = 0;
            int maxCount = (int)Math.Pow(10, type);
            List<object> rst = new List<object>();
            for (int i = 0; i < list.Count(); i++)
            {
                int _count = rnd.Next(0, maxCount);
                var obj = new
                {
                    id = list[i].id,
                    name = list[i].name,
                    count = list[i].count,
                    complete = list[i].complete,
                    kept = list[i].kept

                };
                count += obj.count;
                rst.Add(obj);
            }
            return new
            {
                Items = rst,
                Total = count
            };

        }

        #endregion

        #region 督办
        /// <summary>
        /// 督办列表
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="name">筛选</param>
        /// <param name="type">1:未督办,2:自己督办,3:他人督办</param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetSuperviseList(int userId, string name, int type, int start, int limit)
        {
            Case_LeadersuperviseBLL bll = new Case_LeadersuperviseBLL();
            List<Filter> filters = new List<Filter>();
            List<object> rst = new List<object>();
            int total = 0;
            filters.Add(CreateFilter("casereason", name));
            if (type == 1)
            {
                var list = bll.GetNoAlreadySupervise(filters, start, limit);
                foreach (var item in list.Items)
                {
                    var obj = new
                    {
                        id = item.caseid,
                        title = item.casename,
                        currentName = item.wfsname,
                        currentUserid = ((string.IsNullOrEmpty(item.p_name)) ? (string.IsNullOrEmpty(item.p_name) ? "无" : item.p_name) : item.p_name),
                        overTime = (string.IsNullOrEmpty(item.etime.ToString())) ? "无" : item.etime.ToString(),
                        wfsid = item.wfsid,
                        caseid = item.caseid,
                        clrid = item.clrid,
                    };
                    rst.Add(obj);
                }
                total = list.Total;
            }
            else if (type == 2)
            {
                var list = bll.GetYesUserAlreadySupervise(filters, start, limit, userId);
                foreach (var item in list.Items)
                {
                    var obj = new
                    {
                        id = item.caseid,
                        title = item.casename,
                        currentName = item.wfsname,
                        currentUserid = ((string.IsNullOrEmpty(item.p_name)) ? (string.IsNullOrEmpty(item.p_name) ? "无" : item.p_name) : item.p_name),
                        overTime = (string.IsNullOrEmpty(item.etime.ToString())) ? "无" : item.etime.ToString(),
                        wfsid = item.wfsid,
                        caseid = item.caseid,
                        clrid = item.clrid,
                    };
                    rst.Add(obj);
                }
                total = list.Total;
            }
            else if (type == 3)
            {
                var list = bll.GetNoUserAlreadySupervise(filters, start, limit, userId);
                foreach (var item in list.Items)
                {
                    var obj = new
                    {
                        id = item.caseid,
                        title = item.casename,
                        currentName = item.wfsname,
                        currentUserid = ((string.IsNullOrEmpty(item.p_name)) ? (string.IsNullOrEmpty(item.p_name) ? "无" : item.p_name) : item.p_name),
                        overTime = (string.IsNullOrEmpty(item.etime.ToString())) ? "无" : item.etime.ToString(),
                        wfsid = item.wfsid,
                        caseid = item.caseid,
                        clrid = item.clrid,
                    };
                    rst.Add(obj);
                }
                total = list.Total;
            }

            return PagHelper.CreatePag(rst, total);


            //var obj = new
            //{
            //    id = 1,
            //    title = "任何单位或个人随意亲到,抛撒或者堆放垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾垃圾" + name,
            //    currentName = "分管局领导审核立案申请",
            //    currentId = 10,
            //    currentUserid = "张图途",
            //    overTime = DateTime.Now.AddDays(1)
            //};
            //return PagHelper.GetPagList(obj, start, limit);
        }

        /// <summary>
        /// 获取案件督办历史
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Pag<object> GetSuperviseHistory(int id, int start, int limit)
        {
            Case_LeadersuperviseBLL bll = new Case_LeadersuperviseBLL();
            List<object> rst = new List<object>();
            var list = bll.GetLeadersuperviseList(start, limit, id);
            foreach (var item in list.Items)
            {
                var obj = new
                {

                    id = item.supid,
                    content = item.supopinion,
                    urgencyLevelId = 1,
                    urgencyLevel = item.level == 1 ? "一般" : item.level == 2 ? "紧急" : "特急",
                    phoneName = item.username,
                    time = item.suptime,
                    phone = item.mobile,
                    dbrname = item.dbrname
                };
                rst.Add(obj);
            }


            //Random rnd = new Random();
            //List<object> rst = new List<object>();
            //for (int i = 0; i < limit; i++)
            //{
            //    int z = rnd.Next(0, 2);
            //    var obj1 = new
            //    {
            //        id = i + 1,
            //        content = "此案件需要及时处理",
            //        urgencyLevelId = 1,
            //        urgencyLevel = "紧急",
            //        phoneName = "张三",
            //        time = DateTime.Now,
            //        phone = "",
            //    };

            //    var obj = new
            //    {
            //        id = i + 1,
            //        content = "此案件及时处理",
            //        urgencyLevelId = 2,
            //        urgencyLevel = "一般",
            //        phoneName = "李四",
            //        phone = "18915484123",
            //    };
            //    if (z == 0)
            //    {
            //        rst.Add(obj1);
            //    }
            //    else
            //    {
            //        rst.Add(obj);
            //    }

            //}
            return PagHelper.CreatePag(rst, list.Total);

        }

        #endregion

        #region 养护待办
        /// <summary>
        /// 养护人员养护待办
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="title">筛选</param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetMaintainList(int userId, string title, int start, int limit)
        {


            YH_YhTaskBLL bll = new YH_YhTaskBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("contractname", title));
            var list = bll.GetYhtaskList(filters, start, limit, userId, 1);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.wfsid,
                    title = item.contractname,
                    address = item.wtaddress,
                    date = item.foundtime,
                    imageUrl = "图片地址.jpg"
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);

        }

        /// <summary>
        /// 养护人员事件待办
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="title"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetDealtEventList(int userId, string title, int start, int limit)
        {
            var obj = new
            {
                id = 1,
                title = "聚贤路15号炸鸡店油烟污染XXXXXXXXXXXXXXX",
                address = "聚贤路15号炸鸡店",
                date = DateTime.Now
            };
            return PagHelper.GetPagList(obj, start, limit);
        }

        /// <summary>
        /// 养护日志
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetMaintainLogList(int userId, DateTime startTime, DateTime endTime, int start, int limit)
        {
            YH_YhLogBLL bll = new YH_YhLogBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("startdate", startTime.ToString("yyyy-MM-dd HH:mm:ss")));
            filters.Add(CreateFilter("enddate", endTime.ToString("yyyy-MM-dd HH:mm:ss")));

            var list = bll.GetYhLogList(filters, start, limit, 0, 0);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.yhlogid,
                    title = item.yhcontractname,
                    address = item.patrolexplain,
                    date = item.patroltime
                };
                rst.Add(obj);
            }

            return PagHelper.CreatePag(rst, list.Total);
            //return PagHelper.GetPagList(obj, start, limit);
        }

        /// <summary>
        /// 养护问题
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="title"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetMaintainMaintainProblemList(int userId, string title, int start, int limit)
        {
            YH_YhTaskBLL bll = new YH_YhTaskBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("contractname", title));
            var list = bll.GetAllYhtaskList(filters, start, limit);
            List<object> rst = new List<object>();
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.wfsid,
                    title = item.contractname,
                    address = item.wtaddress,
                    date = item.foundtime,
                    imageUrl = item.photo1
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);
        }

        #endregion

        #region 巡查日志
        /// <summary>
        /// 巡查历史
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<object> GetPatrolsList(int userId, int start, int limit)
        {
            QW_PatrolLogsBLL bll = new QW_PatrolLogsBLL();
            List<object> rst = new List<object>();
            var list = bll.GetApiPatrolLogsList(null, start, limit, userId);
            foreach (var item in list.Items)
            {
                var obj = new
                {
                    id = item.logid,
                    name = item.username,
                    date = item.reporttime,
                };
                rst.Add(obj);
            }
            return PagHelper.CreatePag(rst, list.Total);
        }

        /// <summary>
        /// 巡查检查项
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public object GetReportPatrol(int userId)
        {
            Base_ZdsBLL bll = new Base_ZdsBLL();
            List<Base_ZdsModel> GetZdList = bll.GetZdList("type_xcrz_jcx");
            List<object> list = new List<object>();
            for (int i = 0; i < GetZdList.Count(); i++)
            {
                var obj = new
                {
                    id = GetZdList[i].zd_id,
                    name = GetZdList[i].zd_name,
                    isnot = 0,
                };
                list.Add(obj);
            }
            return new
            {
                date = DateTime.Now.Date,
                week = WeekDay(DateTime.Now.Date),
                list = list
            };
        }

        /// <summary>
        /// 巡查日志详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object GetReportDetail(int id)
        {
            Random rnd = new Random();
            Base_ZdsBLL bll = new Base_ZdsBLL();
            QW_PatrolLogsBLL qpbll = new QW_PatrolLogsBLL();
            List<Base_ZdsModel> GetZdList = bll.GetZdList("type_xcrz_jcx");
            var model = qpbll.GetPatrolLogModel(id);

            List<object> list = new List<object>();
            for (int i = 0; i < GetZdList.Count(); i++)
            {
                //var a = model.checkid.Contains(GetZdList[i].zd_id + ",");
                var obj = new
                {
                    id = GetZdList[i].zd_id,
                    name = GetZdList[i].zd_name,
                    value = model.isfound == 0 ? 0 : model.checkid.Contains(GetZdList[i].zd_id + ",") ? 1 : 0,
                };
                list.Add(obj);
            }
            return new
            {
                id = id,
                date = DateTime.Now.Date,
                week = WeekDay(DateTime.Now.Date),
                list = list,
                remark = model.remark
            };
        }

        #endregion

        #region 市民事件
        /// <summary>
        /// 获取市民事件已办列表
        /// </summary>
        /// <param name="name"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public Pag<SM_CitizenServicesModel> GetAlreadyCitizenServicesList(string name, int start, int limit, int userId, int status)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("eventtitle", name));
            var list = bll.GetAlreadyCitizenServicesList(filters, start, limit, userId, status);
            Pag<SM_CitizenServicesModel> rst = new Pag<SM_CitizenServicesModel>()
            {
                Items = list.Items,
                Total = list.Total
            };
            return rst;
        }
        /// <summary>
        /// 获取市民事件待办列表
        /// </summary>
        /// <param name="name"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public Pag<SM_CitizenServicesModel> GetCitizenServicesList(string name, int start, int limit, int userId, int status)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("eventtitle", name));
            var list = bll.GetCitizenServicesList(filters, start, limit, userId, status);
            Pag<SM_CitizenServicesModel> rst = new Pag<SM_CitizenServicesModel>()
            {
                Items = list.Items,
                Total = list.Total
            };
            return rst;
        }
        /// <summary>
        /// 获取市民事件待办列表
        /// </summary>
        /// <param name="name"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public Pag<SM_CitizenServicesModel> GetAllCitizenServicesList(string name, int start, int limit, int userId, int status)
        {
            SM_CitizenServicesBLL bll = new SM_CitizenServicesBLL();
            List<Filter> filters = new List<Filter>();
            filters.Add(CreateFilter("eventtitle", name));
            var list = bll.GetAllCitizenServicesList(filters, start, limit, userId, status);
            Pag<SM_CitizenServicesModel> rst = new Pag<SM_CitizenServicesModel>()
            {
                Items = list.Items,
                Total = list.Total
            };
            return rst;
        }
        #endregion

        #region 周边警力
        public object GetPeripheryPolice(int userId, double latitude, double longitude)
        {
            PeripheryBLL peripherybll = new PeripheryBLL();
            Random rnd = new Random();
            List<PeripheryModel> list = peripherybll.GetPeripheryUser(longitude, latitude, 1, userId);
            List<object> rst = new List<object>();
            foreach (var item in list)
            {
                var obj = new
                {
                    id = item.userid,
                    name = item.username,
                    unitName = item.unitname,
                    unitId = item.userid,
                    latitude = item.y84,
                    longitude = item.x84,
                    phone = item.phone,
                    ishelp = item.ishelp,
                    helptime = item.helptime,
                    remarks1 = item.remarks1,
                    shortnumber = item.shortnumber
                };
                rst.Add(obj);
            }
            //for (int i = 0; i < 5; i++)
            //{
            //    double lon = longitude + rnd.NextDouble() * 0.05 - rnd.NextDouble() * 0.05;
            //    double lat = latitude + rnd.NextDouble() * 0.05 - rnd.NextDouble() * 0.05;

            //}
            return new
            {
                list = rst,
                date = DateTime.Now,
                title= peripherybll.GetSoSContent(userId)

            };
        }

        /// <summary>
        /// 获取周边人员求助数量
        /// </summary>
        /// <param name="x84"></param>
        /// <param name="y84"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
        public int GetPeripheryUserCount(double x84, double y84, double radius, int userid)
        {
            PeripheryBLL peripherybll = new PeripheryBLL();
            return peripherybll.GetPeripheryUserCount(x84, y84, radius, userid);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="remarks"></param>
        /// <returns></returns>
        public int AddHelp(int userid, string remarks)
        {
            QW_UserLastPositionsBLL bll = new QW_UserLastPositionsBLL();
            return bll.AddHelp(userid, remarks);
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public int EditHelp(int userid)
        {
            QW_UserLastPositionsBLL bll = new QW_UserLastPositionsBLL();
            return bll.EditHelp(userid);
        }


        #endregion

        #region 版本更新
        /// <summary>
        /// 获取手机数据库中的版本号
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public object GetVersion()
        {
            ChooseBLL bll = new ChooseBLL();
            return bll.GetVersion();
        }
        #endregion

        #region function

        public class GPS
        {
            public double latitude { get; set; }
            public double longitude { get; set; }


        }

        public GPS GetGPS(string geograhy)
        {
            GPS gps = new GPS();
            if (string.IsNullOrEmpty(geograhy)) return gps;
            MatchCollection mat = Regex.Matches(geograhy, @"\d+\.\d+");
            if (mat.Count < 2) return gps;
            gps.longitude = double.Parse(mat[0].Value);
            gps.latitude = double.Parse(mat[1].Value);
            if (gps.longitude < 60)
            {
                double z = gps.longitude;
                gps.longitude = gps.latitude;
                gps.latitude = z;
            }
            return gps;
        }

        public DateTime returnTime(string str)
        {
            DateTime date = DateTime.Now;
            string st = date.ToString("yyyy-MM-dd ") + str;
            DateTime.TryParse(st, out date);
            return date;

        }

        public DateTime returnTime(DateTime date, DateTime time)
        {
            string str = time.ToString("HH:mm:ss");
            string st = date.ToString("yyyy-MM-dd ");
            DateTime rst = DateTime.Parse(st + str);
            return rst;
        }

        public DateTime GetTime(string str, DateTime date)
        {
            string st = date.ToString("yyyy-MM-dd ") + str;
            DateTime.TryParse(st, out date);
            return date;
        }

        public string Rept(string st, int number)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < number; i++)
            {
                sb.Append(st);
            }
            return sb.ToString();
        }

        /// <summary>
        /// 返回星期几
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public string WeekDay(DateTime date)
        {
            string[] day = new string[] { "日", "一", "二", "三", "四", "五", "六" };
            string week = day[Convert.ToInt32(DateTime.Now.DayOfWeek.ToString("d"))].ToString();
            return "星期" + week;

        }


        public Filter CreateFilter(string property, string value)
        {
            Filter item = new Filter()
            {
                property = property,
                value = value
            };
            return item;
        }



        #endregion


    }
}
