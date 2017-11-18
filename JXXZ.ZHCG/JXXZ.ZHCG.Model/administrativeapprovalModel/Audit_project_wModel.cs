using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace JXXZ.ZHCG.Model.administrativeapprovalModel
{
    public class Audit_project_wModel
    {
        /// <summary>
        /// 流程实例标识
        /// </summary>
        public string pviguid { get; set; }
        /// <summary>
        /// 审批号
        /// </summary>
        public string xiangmubh { get; set; }
        /// <summary>
        /// 审批事项
        /// </summary>
        public string processversioninstancename { get; set; }
        /// <summary>
        /// 申报号
        /// </summary>
        public string flowsn { get; set; }
        /// <summary>
        /// 审批类型
        /// </summary>
        public Nullable<decimal> tasktype { get; set; }
        /// <summary>
        /// 事项描述
        /// </summary>
        public string taskcaseguid { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string address { get; set; }
        /// <summary>
        /// 申请单位名称
        /// </summary>
        public string applyername { get; set; }
        /// <summary>
        /// 法定代表人
        /// </summary>
        public string legal { get; set; }
        /// <summary>
        /// 证件类型
        /// </summary>
        public Nullable<decimal> certtype { get; set; }
        /// <summary>
        /// 证件名
        /// </summary>
        public string certname { get; set; }
        /// <summary>
        /// 证件号
        /// </summary>
        public string certnum { get; set; }
        /// <summary>
        /// 邮编
        /// </summary>
        public string contactpostcode { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string contactperson { get; set; }
        /// <summary>
        /// 手机
        /// </summary>
        public string contactmobile { get; set; }
        /// <summary>
        /// 电话号码
        /// </summary>
        public string contactphone { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string remark { get; set; }
        /// <summary>
        /// 办理部门
        /// </summary>
        public string windowname { get; set; }
        /// <summary>
        /// 收件人
        /// </summary>
        public string receiveusername { get; set; }
        /// <summary>
        /// 办件申请时间
        /// </summary>
        public Nullable<System.DateTime> receivedate { get; set; }
        /// <summary>
        /// 处理时间
        /// </summary>
        public Nullable<System.DateTime> acceptuserdate { get; set; }
        /// <summary>
        /// 办件承诺期限
        /// </summary>
        public Nullable<System.DateTime> promiseenddate { get; set; }
        /// <summary>
        /// 办件承诺期限（天）
        /// </summary>
        public int promise_day { get; set; }
        /// <summary>
        /// 承诺办结时间
        /// </summary>
        public Nullable<System.DateTime> banwandate { get; set; }
        /// <summary>
        /// 办结时间
        /// </summary>
        public Nullable<System.DateTime> banjiedate { get; set; }
        /// <summary>
        /// 活动名称
        /// </summary>
        public string activityname { get; set; }
        /// <summary>
        /// 意见类型
        /// </summary>
        public string opinion { get; set; }
        /// <summary>
        /// 办理人
        /// </summary>
        public string acceptusername { get; set; }
        /// <summary>
        /// 办结单位
        /// </summary>
        public string banjieuserguid { get; set; }
        /// <summary>
        /// 办结人姓名
        /// </summary>
        public string banjieusername { get; set; }
        /// <summary>
        /// 审批号
        /// </summary>
        public decimal row_id { get; set; }
        /// <summary>
        /// 审批类型
        /// </summary>
        public string projectname { get; set; }
        /// <summary>
        /// 派遣意见
        /// </summary>
        public string advice { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public Nullable<System.DateTime> createtime { get; set; }
        /// <summary>
        /// 创建人userid
        /// </summary>
        public Nullable<int> createuserid { get; set; }
        /// <summary>
        /// 下一流程用户userid
        /// </summary>
        public string nextuserid { get; set; }
        /// <summary>
        /// 队员处理附件
        /// </summary>
        public string[] uploadpanelValue { get; set; }
        /// <summary>
        /// 操作者显示姓名
        /// </summary>
        public string OperatorForDisplayName { get; set; }
        /// <summary>
        /// 操作时间
        /// </summary>
        public Nullable<System.DateTime> OperationDate { get; set; }
        /// <summary>
        /// 唯一主键
        /// </summary>
        public string syncrowguid { get; set; }
        /// <summary>
        /// 工作流详细编号
        /// </summary>
        public string wfdid { get; set; }
        /// <summary>
        /// 下一步流程编号
        /// </summary>
        public string nextwfdid { get; set; }
        /// <summary>
        /// 流程id
        /// </summary>
        public string wfsid { get; set; }
        /// <summary>
        /// 流程实例id
        /// </summary>
        public string wfsaid { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string wfsuid { get; set; }
        /// <summary>
        /// 队员上报地理位置
        /// </summary>
        public string geography { get; set; }
        /// <summary>
        /// 手机上报图片
        /// </summary>
        public string[] base64 { get; set; }

        //行政许可科办件派遣
        /// <summary>
        /// 处理期限开始时间
        /// </summary>
        public string xzxkstarttime { get; set; }

        /// <summary>
        /// 结束时间
        /// </summary>
        public string xzxkendtime { get; set; }

        /// <summary>
        /// 行政许可地点
        /// </summary>
        public string xzxkaddress { get; set; }

        /// <summary>
        /// 当前流程用户名称
        /// </summary>
        public string flowusername { get; set; }

        /// <summary>
        /// wfdid名称
        /// </summary>
        public string wfdidname { get; set; }

        public string currentwfsaid { get; set; }

        /// <summary>
        /// 是否发送手机短信 0:不发送 1：发送
        /// </summary>
        public int isSendMsg { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string phone { get; set; }

        /// <summary>
        /// 行政审批开始时间
        /// </summary>
        public Nullable<System.DateTime> starttime { get; set; }

        /// <summary>
        /// 行政审批结束时间
        /// </summary>
        public Nullable<System.DateTime> endtime { get; set; }

        /// <summary>
        /// 附件
        /// </summary>
        public List<FileClass> filelist { get; set; }

        /// <summary>
        /// 派遣的多个中队，以","间隔
        /// </summary>
        public string hidedealusername { get; set; }

        /// <summary>
        /// 行政科审批地址
        /// </summary>
        public string xzkspaddress { get; set; }

        /// <summary>
        /// 定位信息
        /// </summary>
        public string location { get; set; }

    }

    /// <summary>
    /// 行政审批详情
    /// </summary>
    public class approvalDetail {
        public int xzkid { get; set; }

        /// <summary>
        /// 当前用户所处流程阶段
        /// </summary>
        public int? currentstage { get; set; }

        /// <summary>
        /// 当前用户处理状态
        /// </summary>
        public int? currentuserstate { get; set; }

        /// <summary>
        /// 行政科派遣状态
        /// </summary>
        public int? xzkstatus { get; set; }

        //行政许可归档
        /// <summary>
        /// 归档处理意见
        /// </summary>
        public string archiveadvice { get; set; }

        /// <summary>
        /// 归档处理人
        /// </summary>
        public string archivedealname { get; set; }

        /// <summary>
        /// 归档处理人id
        /// </summary>
        public string archivedealid { get; set; }

        /// <summary>
        /// 行政科归档状态
        /// </summary>
        public int archiveOnFileStatus { get; set; }

        /// <summary>
        /// 归档处理时间
        /// </summary>
        public Nullable<System.DateTime> archivedealtime { get; set; }

        //行政许可科办件派遣
        /// <summary>
        /// 处理期限开始时间
        /// </summary>
        public string xzxkstarttime { get; set; }

        public Nullable<System.DateTime> starttime { get; set; }

        /// <summary>
        /// 结束时间
        /// </summary>
        public string xzxkendtime { get; set; }

        public Nullable<System.DateTime> endtime { get; set; }

        /// <summary>
        /// 行政许可处理地点
        /// </summary>
        public string xzxkaddress { get; set; }

        /// <summary>
        /// 行政许可处理内容
        /// </summary>
        public string xzxkcontent { get; set; }

        /// <summary>
        /// 行政科处理人
        /// </summary>
        public string xzxkdealname { get; set; }

        /// <summary>
        /// 行政科处理时间
        /// </summary>
        public Nullable<System.DateTime> xzxkdealtime { get; set; }

        /// <summary>
        /// filewfsuid
        /// </summary>
        public string xzxkwfsuid { get; set; }

        /// <summary>
        /// 中队内勤名称
        /// </summary>
        public string unitofficename { get; set; }
        /// <summary>
        /// 派遣队员名称
        /// </summary>
        public string teammembername { get; set; }
        /// <summary>
        /// 内勤派遣意见
        /// </summary>
        public string officeadvice { get; set; }

        /// <summary>
        /// 中队内情处理时间
        /// </summary>
        public Nullable<System.DateTime> officedealtime { get; set; }

        /// <summary>
        /// 队员上报地理位置
        /// </summary>
        public string address { get; set; }
        /// <summary>
        /// 队员上报处理意见
        /// </summary>
        public string teamdealadvice { get; set; }
        /// <summary>
        /// 队员上报时间
        /// </summary>
        public Nullable<System.DateTime> createtime { get; set; }
        /// <summary>
        /// 流程id
        /// </summary>
        public string wfsid { get; set; }
        /// <summary>
        /// 当前流程实例id
        /// </summary>
        public string currentwfsaid { get; set; }
        /// <summary>
        /// 流程实例id
        /// </summary>
        public string wfsaid { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string wfsuid { get; set; }
        /// <summary>
        /// 下一个流程wfdid
        /// </summary>
        public string nextid { get; set; }
        /// <summary>
        /// 工作流详细编号
        /// </summary>
        public string wfdid { get; set; }
        public string status { get; set; }

        /// <summary>
        /// 行政科派遣附件
        /// </summary>
        public List<FileClass> filelist { get; set; }

        /// <summary>
        /// 派遣的内勤
        /// </summary>
        public List<dispatchTeam> dispatchteamlist { get; set; }

        /// <summary>
        /// 定位信息
        /// </summary>
        public string location { get; set; }
    }

    /// <summary>
    /// 派遣的内勤
    /// </summary>
    public class dispatchTeam {
        /// <summary>
        /// 内勤id
        /// </summary>
        public int nqid { get; set; }

        /// <summary>
        /// 内勤所属单位id
        /// </summary>
        public int? nqunitid { get; set; }

        public string nqunitname { get; set; }

        ///// <summary>
        ///// 内勤派遣的队员
        ///// </summary>
        //public Hashtable sendteammember { get; set; }

        public List<member> sendmember { get; set; }

        /// <summary>
        /// 内勤派遣意见
        /// </summary>
        public string nqadvice { get; set; }

        /// <summary>
        /// 内勤处理人
        /// </summary>
        public string nqname { get; set; }

        /// <summary>
        /// 内勤处理状态
        /// </summary>
        public int? nqstatus { get; set; }

        /// <summary>
        /// 内勤处理时间
        /// </summary>
        public Nullable<System.DateTime> nqdealtime { get; set; }

        /// <summary>
        /// 内勤派遣的队员
        /// </summary>
        public List<memberDeal> memberlist { get; set; }
    }

    /// <summary>
    /// 队员处理
    /// </summary>
    public class memberDeal {
        /// <summary>
        /// 队员id
        /// </summary>
        public int dyid { get; set; }

        public int? dysourceid { get; set; }

        /// <summary>
        /// 队员名称
        /// </summary>
        public string dyname { get; set; }

        /// <summary>
        /// 队员处理时间
        /// </summary>
        public Nullable<System.DateTime> dydealtime { get; set; }

        /// <summary>
        /// 地理位置
        /// </summary>
        public string dyaddress { get; set; }

        /// <summary>
        /// 队员处理意见
        /// </summary>
        public string dyadvice { get; set; }

        /// <summary>
        /// 队员处理状态 0:未处理 1：处理
        /// </summary>
        public int? dystatus { get; set; }

        /// <summary>
        /// 附件
        /// </summary>
        public List<FileClass> filelist { get; set; }
    }

    public class member {
        public string name { get; set; }
        public int? state { get; set; }
    }
}
