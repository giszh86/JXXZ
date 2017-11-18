using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
    public class Case_CasesModel
    {
        public int? caseid { get; set; }
        public string casebh { get; set; }
        public string casetypeid { get; set; }
        public string casesourceid { get; set; }
        public string casesourcename { get; set; }
        public string casename { get; set; }
        public string qlsxid { get; set; }
        public string qlsx { get; set; }
        public string casereason { get; set; }
        public string fromcasesource { get; set; }
        public string caseaddress { get; set; }
        public DateTime sitedatetime { get; set; }
        public string geographical84 { get; set; }
        public string geographical2000 { get; set; }
        public string persontype { get; set; }
        private string _p_name = "";

        public string p_name
        {
            get { return _p_name; }
            set { _p_name = value; }
        }
        public string p_sex { get; set; }
        public string p_cardtype { get; set; }
        public string p_cardnum { get; set; }
        public string p_contactphone { get; set; }
        public string p_contactaddress { get; set; }
        public string f_name { get; set; }
        public string f_dbr { get; set; }
        public string f_cardtype { get; set; }
        public string f_card { get; set; }
        public string f_wtr { get; set; }
        public string f_cardnum { get; set; }
        public string f_contactphone { get; set; }
        public string f_contactaddress { get; set; }
        public string contactphone { get; set; }
        public string contactaddress { get; set; }
        public string flfg { get; set; }
        public string clyj { get; set; }
        public string wfqx { get; set; }
        public string cf { get; set; }
        public double? zdmj { get; set; }
        public double? gdmj { get; set; }
        public double? gtjzmj { get; set; }
        public double? ghjzmj { get; set; }
        public string casecontent { get; set; }
        public DateTime? createtime { get; set; }
        public int createuserid { get; set; }
        public string casetypename { get; set; }
        public string sourcename { get; set; }
        public string p_cardtypename { get; set; }
        public string f_cardtypename { get; set; }
        public string displayname { get; set; }
        public Nullable<int> zbuserid { get; set; }
        public Nullable<int> xbuserid { get; set; }
        public string zbusername { get; set; }
        public string xbusername { get; set; }
        public Nullable<int> issave { get; set; }
        public Nullable<int> sszd { get; set; }
        public Nullable<int> ssxbzd { get; set; }
        public int? dwfsasid { get; set; }
        public int? tzcsid { get; set; }
        public string cswfsid { get; set; }
        public string wfsaid { get; set; }
        public string wfsid { get; set; }
        public string wfdid { get; set; }
        public string lastpdfpath { get; set; }
        public DateTime? lastdealtime { get; set; }
        public DateTime? stime { get; set; }
        public DateTime? etime { get; set; }

        public string cbr { get; set; }
        public string cbryj { get; set; }
        public string cbrtime { get; set; }
        public string cbjg { get; set; }
        public string cbjgyj { get; set; }
        public string cbjgtime { get; set; }
        public string fzjg { get; set; }
        public string fzjgyj { get; set; }
        public string fzjgtime { get; set; }
        public string shr { get; set; }
        public string shryj { get; set; }
        public string shrtime { get; set; }
    }

    public class CaseList
    {
        public string wfsaid { get; set; }
        public string wfsid { get; set; }
        public string wfsid2 { get; set; }
        public string casemode { get; set; }
        public string wfsname { get; set; }
        public string currentwfsaid { get; set; }
        public int? filestatus { get; set; }
        public int? casetype { get; set; }
        public int? casesourceid { get; set; }
        public string sourcename { get; set; }
        public string casereasonid { get; set; }
        public string casename { get; set; }
        public string casereason { get; set; }
        public string persontype { get; set; }
        public string casereasonname { get; set; }
        public string contact { get; set; }
        public string contactphone { get; set; }
        public string address { get; set; }
        public string casetypeid { get; set; }
        public string caseaddress { get; set; }
        public string zd_name { get; set; }
        public string casebh { get; set; }
        public DateTime? createtime { get; set; }
        public DateTime? sitedatetime { get; set; }
        public string wfdid { get; set; }
        public DateTime? dealtime { get; set; }
        public Casr_WorkFlowClass process { get; set; }
        public DateTime? etime { get; set; }        
        public int? caseid { get; set; }
        public string wfid { get; set; }
        public double term { get; set; }
        public DateTime? overtime  { get; set; }
        public string dealusername { get; set; }
        public string dealunitname { get; set; }
        public int? zbunitid { get; set; }
        public string zbunitname { get; set; }//所属中队
        public string p_name { get; set; }
        public string f_name { get; set; }
        public string path { get; set; }

        //案件统计增加字段
        public DateTime? ay_createtime { get; set; }//案件来源时间
        public string ysh_ysrq { get; set; }//去函时间
        public DateTime? dczj_createtime { get; set; }//调查终结时间
        public DateTime? sxgz_createtime { get; set; }//行政处罚事先告知时间
        public DateTime? cssbtime { get; set; }//陈述申辩时间
        public DateTime? tzcltime { get; set; }//听证时间        
        public DateTime? xzcfbgcltime { get; set; }//行政处罚时间
        public DateTime? cfjd_createtime { get; set; }//行政处罚送达时间
        public string xzcfnr { get; set; }//处罚内容
        public string xzcfje { get; set; }//涉及金额
        public DateTime? fkjntime { get; set; }//罚款缴纳时间
        public string fkpjbh { get; set; }//罚没款发票编号
        public DateTime? dw_ga { get; set; }//移送公安
        public DateTime? dw_gz { get; set; }//移送国资
        public DateTime? dw_jw { get; set; }//移送纪委
        public DateTime? dw_fy { get; set; }//移送法院
        public string cgsj { get; set; }//催告时间
        public DateTime? ajja_createtime { get; set; }//结案时间
        public string zbusername { get; set; }//主办人
        public string xbusername { get; set; }//协办人
        public string classname { get; set; }//固定值
        public string ysh_hhsj { get; set; }//回函时间
        public string zdmj { get; set; }//占地面积
        public string gdmj { get; set; }//耕地面积
        public string gtjzmj { get; set; }//国土建筑面积
        public string ghjzmj { get; set; }//规划建筑面积
        public string sqsj { get; set; }//申请时间
        public string zxsj { get; set; }//执行时间
        public string remark { get; set; }//备注

    }

    public class CaseWorkFlowOldModel
    {
        public string wfsaid { get; set; }
        public string wfsid { get; set; }
        public Nullable<int> status { get; set; }
        public Nullable<int> dealuserid { get; set; }
        public Nullable<System.DateTime> dealtime { get; set; }
        public string wfdid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }

        public string wfsuid { get; set; }
        public Nullable<int> userid { get; set; }
        public string content { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<int> ismainuser { get; set; }
        public string remark { get; set; }

        public string wfdname { get; set; }
        public string username { get; set; }
        public string createusername { get; set; }
        public DateTime? stime { get; set; }
        public DateTime? etime { get; set; }
    }

    public class DealWithModel
    {
        /// <summary>
        /// 当前流程ID
        /// </summary>
        public string wfdid { get; set; }
        /// <summary>
        /// 下一步流程ID
        /// </summary>
        public string nextwfdid { get; set; }
        /// <summary>
        /// 下一步流程处理人员
        /// </summary>
        public string nextwfuserids { get; set; }
        /// <summary>
        /// 流程ID
        /// </summary>
        public string wfsaid { get; set; }
        /// <summary>
        /// 流程ID
        /// </summary>
        public string wfsid { get; set; }
        /// <summary>
        /// 处理意见
        /// </summary>
        public string dealcontent { get; set; }
        /// <summary>
        ///  当前流程创建人
        /// </summary>
        public int? wfcreateuserid { get; set; }
        /// <summary>
        /// 是否发送短信
        /// </summary>
        public string IsSendMsg { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? stime { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime? etime { get; set; }
    }

    public class AlreadyModel
    {
        public string wfsaid { get; set; }
        public string wfsid { get; set; }
        public string wfsid2 { get; set; }
        public string casemode { get; set; }
        public string wfsname { get; set; }
        public string currentwfsaid { get; set; }
        public int? filestatus { get; set; }
        public int? casetype { get; set; }
        public int? casesourceid { get; set; }
        public string sourcename { get; set; }
        public string casereason { get; set; }
        public string casereasonname { get; set; }
        public string contact { get; set; }
        public string contactphone { get; set; }
        public string address { get; set; }
        public string casetypeid { get; set; }
        public string casebh { get; set; }
        public DateTime? createtime { get; set; }
        public string wfdid { get; set; }
        public DateTime? dealtime { get; set; }
        public Casr_WorkFlowClass process { get; set; }
        public DateTime? etime { get; set; }
        public Nullable<int> caseid { get; set; }
        public int?  supid { get; set; }
        public int? alreadyuserid { get; set; }
        public string p_name { get; set; }
        public string f_name { get; set; }
        public string dealname { get; set; }
        public string phone { get; set; }
        public string zd_name { get; set; }
        public string  unitname { get; set; }
        public int? clrid { get; set; }
        public string casename { get; set; }
    }


    public class CaseCount {

        public string id { get; set; }
        public string name { get; set; }
        public int count { get; set; }
        public int  complete { get; set; }
        public int kept { get; set; }
    }

    public class CaseLbModel {
        public string wfsid { get; set; }
        public string casetype { get; set; }
        public string wfsname { get; set; }
        public DateTime? createtime { get; set; }
        public DateTime? etime { get; set; }
    }

    public class receptionCaseList {
        public int count { get; set; }
        public int sourceid { get; set; }
    }
}
