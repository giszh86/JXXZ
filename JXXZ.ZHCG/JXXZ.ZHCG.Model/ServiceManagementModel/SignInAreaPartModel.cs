using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
    public class SignInAreaPartModel
    {
        /// <summary>
        /// 签到任务标识
        /// </summary>
        public int? sgid { get; set; }

        /// <summary>
        /// 签到区域标识
        /// </summary>
        public int? areaid { get; set; }

        /// <summary>
        /// 经纬度
        /// </summary>
        public string geometry { get; set; }

        /// <summary>
        /// 签到区域名称
        /// </summary>
        public string areaname { get; set; }

        /// <summary>
        /// 签到区域描述
        /// </summary>
        public string areadescription { get; set; }

        /// <summary>
        /// 是否签到成功
        /// </summary>
        public bool issignin { get; set; }

        /// <summary>
        /// 签到开始时间
        /// </summary>
        public System.DateTime start_stime { get; set; }
        /// <summary>
        /// 签到结束时间
        /// </summary>
        public System.DateTime start_etime { get; set; }
        /// <summary>
        /// 签退开始时间
        /// </summary>
        public System.DateTime end_stime { get; set; }
        /// <summary>
        /// 签退结束时间
        /// </summary>
        public System.DateTime end_etime { get; set; }

        /// <summary>
        /// 签到数据列表
        /// </summary>
        public List<UserSignInModel> usersigninlist { get; set; }

        /// <summary>
        /// 人员ID
        /// </summary>
        public int? userid { get; set; }
        /// <summary>
        /// 人员姓名
        /// </summary>
        public string username { get; set; }
        /// <summary>
        /// 中队id
        /// </summary>
        public int? sszd { get; set; }
        /// <summary>
        /// 中队名称
        /// </summary>
        public string sszdname { get; set; }
        /// <summary>
        /// 班组id
        /// </summary>
        public int? ssbc { get; set; }
        /// <summary>
        /// 班组名称
        /// </summary>
        public string ssbzname { get; set; }

        public Nullable<System.DateTime> time { get; set; }
    }

    /// <summary>
    /// 签到列表模型
    /// </summary>
    /// <returns></returns>
    public class UserSignInModel
    {
        /// <summary>
        /// 签到用户标识
        /// </summary>
        public decimal userid { get; set; }

        /// <summary>
        /// 签到任务标识a
        /// </summary>
        public decimal sgid { get; set; }
        /// <summary>
        /// 签到用户名字
        /// </summary>
        public string username { get; set; }

        /// <summary>
        /// 用户所属单位标识
        /// </summary>
        public decimal unitid { get; set; }

        /// <summary>
        /// 用户所属单位名字
        /// </summary>
        public string unitname { get; set; }

        /// <summary>
        /// 签到用户头像
        /// </summary>
        public string useravatar { get; set; }

        /// <summary>
        /// 签到全格式
        /// </summary>
        public DateTime? signinall { get; set; }

        /// <summary>
        /// 签到日期
        /// </summary>
        public string signindate { get; set; }

        /// <summary>
        /// 计划签到时间
        /// </summary>
        public DateTime? plansignintime { get; set; }

        /// <summary>
        /// 计划签到时间
        /// </summary>
        public string plansignintimestr { get; set; }

        /// <summary>
        /// 计划签退时间
        /// </summary>
        public DateTime? plansignouttime { get; set; }

        /// <summary>
        /// 计划签退时间
        /// </summary>
        public string plansignouttimestr { get; set; }

        /// <summary>
        /// 实际签到时间
        /// </summary>
        public DateTime? acsignintime { get; set; }

        /// <summary>
        /// 实际签到时间
        /// </summary>
        public string acsignintimestr { get; set; }

        /// <summary>
        /// 实际签退时间
        /// </summary>
        public DateTime? acsignouttime { get; set; }

        /// <summary>
        /// 实际签退时间
        /// </summary>
        public string acsignouttimestr { get; set; }

        /// <summary>
        /// 签到时间
        /// </summary>
        public string signintime { get; set; }

        /// <summary>
        /// 签到星期
        /// </summary>
        public string signinweek { get; set; }

        /// <summary>
        /// 签到坐标
        /// </summary>
        public string signinloglat { get; set; }

        /// <summary>
        /// 签到结果
        /// </summary>
        public string signinresult { get; set; }

        /// <summary>
        /// 签到区域标识
        /// </summary>
        public decimal areaid { get; set; }

        /// <summary>
        /// 签到区域名字
        /// </summary>
        public string areaname { get; set; }

        /// <summary>
        /// 签到区域描述
        /// </summary>
        public string areadescription { get; set; }

        /// <summary>
        /// 签到区域经纬度
        /// </summary>
        public string geometry { get; set; }

        /// <summary>
        /// 是否在签到区域
        /// </summary>
        public bool isinarea { get; set; }

        /// <summary>
        /// 今日签到次数
        /// </summary>
        public int signincount { get; set; }

        /// <summary>
        /// 被查询名字
        /// </summary>
        public string queryname { get; set; }

        /// <summary>
        /// 所属中队
        /// </summary>
        public int? sszd { get; set; }
        /// <summary>
        /// 所属班次
        /// </summary>
        public int? ssbc { get; set; }
    }

    /// <summary>
    /// 签到列表模型
    /// </summary>
    /// <returns></returns>
    public class UserSignInList
    {
        public string datetime { get; set; }
        public List<UserSignInModel> usersigninlist { get; set; }
    }

    public class NotSignModel
    {
        public int? sszd { get; set; }
        public int? ssbc { get; set; }
        public int? userid { get; set; }
        public string displayname { get; set; }
        public Nullable<System.DateTime> start_stime { get; set; }
        public Nullable<System.DateTime> start_etime { get; set; }
        public Nullable<System.DateTime> end_stime { get; set; }
        public Nullable<System.DateTime> end_etime { get; set; }
        public string sex { get; set; }

    }


    public class SignInModel {
        public int?  userid { get; set; }
        public string displayname { get; set; }
        public string  sex { get; set; }
        public string etime { get; set; }
        public string stime { get; set; }
        public int? sszd { get; set; }
        public int? ssbc { get; set; }
    }

    public class alarmModels {
        public int? alarmtype { get; set; }
        public int? userid { get; set; }
        public string path { get; set; }
    }
}
