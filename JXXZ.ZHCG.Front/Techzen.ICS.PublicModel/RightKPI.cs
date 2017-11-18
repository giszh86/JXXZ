using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    //public  class RightKPI
    // {
    //     /// <summary>
    //     /// 标示ID类别
    //     /// </summary>
    //     public int ID { get; set; }
    //     /// <summary>
    //     /// 名称
    //     /// </summary>
    //     public string Name { get; set; }
    //     /// <summary>
    //     /// 总类别数量
    //     /// </summary>
    //     public int Count { get; set; }
    //     /// <summary>
    //     /// 流程信息
    //     /// </summary>
    //     public List<Process> Process { get; set; }

    // }
    /// <summary>
    /// 时效类
    /// </summary>
    public class PrescriptionCase
    {
        /// <summary>
        /// 标示ID类别
        /// </summary>
        public int ID { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 总类别数量
        /// </summary>
        public int Count { get; set; }

    }
    /// <summary>
    /// 时效类流程统计
    /// </summary>
    public class Process
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 总数
        /// </summary>
        public int Count { get; set; }
        /// <summary>
        /// 标示流程所在ID 
        /// </summary>
        public int ID { get; set; }
    }
    /// <summary>
    /// 时效案件列表对象
    /// </summary>
    public class ProcessPaging
    {
       /// <summary>
       /// 总数
       /// </summary>
        public int Total { get; set; }
        /// <summary>
        /// 数据
        /// </summary>
        public List<CaseBriefly> CaseBrieflyList { get; set; }
    }
    /// <summary>
    /// 时效类案件概要
    /// </summary>
    public class CaseBriefly
    {
        public int ID { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// 编号
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        ///  /// <summary>
        ///地址
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// 图标
        /// </summary>
        public string Icon { get; set; }
        /// <summary>
        /// 经度
        /// </summary>
        public double? Longitude { get; set; }
        /// <summary>
        /// 纬度
        /// </summary>
        public double? Latitude { get; set; }
        /// <summary>
        /// 上报时间
        /// </summary>
        public DateTime? ReportTime { get; set; }
        /// <summary>
        /// 案件所处环节
        /// </summary>
        public int? Tacheid { get; set; }
        /// <summary>
        /// 案件所处环节名称
        /// </summary>
        public string TacheName { get; set; }
        /// <summary>
        /// 城区名
        /// </summary>
        public string RegionName { get; set; }
        /// <summary>
        /// 大类名称
        /// </summary>
        public string MaintenanceBigtypeName { get; set; }
        /// <summary>
        /// 案件描述
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// 处理时长
        /// </summary>
        public int? ProcessTimeLong { get; set; }
        /// <summary>
        /// 养护类型
        /// </summary>
        public string MaintenancetypeID { get; set; }
        /// <summary>
        /// 所属路段名称
        /// </summary>
        public string RoadName { get; set; }
        /// <summary>
        /// 来源名称
        /// </summary>
        public string SourcesName { get; set; }
    }
    /// <summary>
    /// 计划案件列表对象
    /// </summary>
    public class PlanPaging
    {
        /// <summary>
        /// 总数
        /// </summary>
        public int Total { get; set; }
        /// <summary>
        /// 数据
        /// </summary>
        public List<CasePlan> CasePlanList { get; set; }
    }
    public class CasePlan
    {
        public int ID { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// 编号
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        ///  /// <summary>
        ///地址
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// 定位点
        /// </summary>
        public string Location { get; set; }
        /// <summary>
        /// 上报时间
        /// </summary>
        public DateTime? ReportTime { get; set; }
        /// <summary>
        /// 城区名
        /// </summary>
        public string RegionName { get; set; }
        /// <summary>
        /// 计划类别
        /// </summary>
        public string MaintenanceBigtypeName { get; set; }
        /// <summary>
        /// 所在道路名称
        /// </summary>
        public string RoadName { get; set; }
    }
    /// <summary>
    /// 养护工程
    /// </summary>
    public class Maintenance
    {
        /// <summary>
        /// 1是时效类2是计划类
        /// </summary>
        public int ID { get; set; }
        /// <summary>
        /// 面积
        /// </summary>
        public double Fests { get; set; }
    }
    /// <summary>
    /// 专项工程
    /// </summary>
    public class SpecialProject
    {
        public int ID { get; set; }
        /// <summary>
        /// 状态 0为实施中，1为已结项
        /// </summary>
        public int? Status { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 编号
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 开工日期
        /// </summary>
        public DateTime? Startdate { get; set; }
        /// <summary>
        /// 完工日期
        /// </summary>
        public DateTime? Enddate { get; set; }
        /// <summary>
        /// 阶段名称
        /// </summary>
        public string StageName { get; set; }
        /// <summary>
        /// 城区名
        /// </summary>
        public string RegionName { get; set; }
        /// <summary>
        /// 地图定位
        /// </summary>
        public string Location { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string AddRess { get; set; }
    }
    /// <summary>
    /// 养护考核
    /// </summary>
    public class MaintenanceAssessment
    {
        public int ID { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 扣分
        /// </summary>
        public int? Cumulativepoints { get; set; }
        /// <summary>
        /// 扣费
        /// </summary>
        public double? Cumulativefee { get; set; }
        /// <summary>
        /// 巡查发现数
        /// </summary>
        public int? xcfxwts { get; set; }
    }
    /// <summary>
    /// 养护大小类及损坏类型
    /// </summary>
    public class MintenanceType
    {
        public int ID { get; set; }
        public string Name { get; set;}
    }
    /// <summary>
    /// 计划类型
    /// </summary>
    public class PlanType
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
