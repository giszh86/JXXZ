using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ConservationModel
{
    public class YH_YhtaskModel
    {
        public string yhtaskid { get; set; }
        public int yhcompany { get; set; }
        public System.DateTime foundtime { get; set; }
        public string fileename { get; set; }
        public string wtsource { get; set; }
        public string yhtype { get; set; }
        public string wtbigclass { get; set; }
        public string wtsmallclass { get; set; }
        public string yhobject { get; set; }
        public string weather { get; set; }
        public Nullable<double> duetime { get; set; }
        public Nullable<double> outlay { get; set; }
        public Nullable<double> workload { get; set; }
        public int yhcontract { get; set; }
        public string wtaddress { get; set; }
        public string wtdescribe { get; set; }
        public string geography84 { get; set; }
        public string geography2000 { get; set; }
        public string wtnature { get; set; }
        public Nullable<double> points { get; set; }
        public Nullable<double> debit { get; set; }
        public string sendusername { get; set; }
        public string sendopinion { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }



        public string[] uploadpanelValue { get; set; }

       
    }

    public class YhtaskList {
        public string wtaddress { get; set; }
        public string wfsid { get; set; }
        public string wfsname { get; set; }
        public int? status { get; set; }
        public string wfid { get; set; }
        public string yhtaskid { get; set; }
        public string wfname { get; set; }
        public string wfdid { get; set; }
        public string wfdname { get; set; }
        public string wfsaid { get; set; }
        public string wtlyname { get; set; }
        public string yhlxname { get; set; }
        public string wtdlname { get; set; }
        public string wtxlname { get; set; }
        public string yhdxname { get; set; }
        public string wtxzname { get; set; }
        //public string wtaddress { get; set; }
        public string companyname { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public string contractname { get; set; }
        public System.DateTime foundtime { get; set; }
        public Nullable<double> workload { get; set; }
        public Nullable<double> outlay { get; set; }
        public int? yhcompany { get; set; }
        public int? yhcontract { get; set; }
        public string wtsource { get; set; }
        public string photo1 { get; set; }
    }

    public class YhtaskModel
    {
        public string wfsid { get; set; }
        public string wfsname { get; set; }
        public int? status { get; set; }
        public string wfid { get; set; }
        public string yhtaskid { get; set; }
        public string wfname { get; set; }
        public string wfdid { get; set; }
        public string wfdname { get; set; }
        public string wfsaid { get; set; }
        public string wtlyname { get; set; }
        public string yhlxname { get; set; }
        public string wtdlname { get; set; }
        public string wtxlname { get; set; }
        public string yhdxname { get; set; }
        public string wtaddress { get; set; }
        public string companyname { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public string contractname { get; set; }
        public System.DateTime foundtime { get; set; }
        public Nullable<double> workload { get; set; }
        public Nullable<double> outlay { get; set; }
        public Nullable<int> pqrid { get; set; }
        public DateTime? limittime { get; set; }
        public string sendopinion { get; set; }
        public string sendusername { get; set; }
        public Nullable<double> points { get; set; }
        public Nullable<double> debit { get; set; }
        public string wtnature { get; set; }
        public string geography84 { get; set; }
        public string geography2000 { get; set; }
        public string wtdescribe { get; set; }
        public double? duetime { get; set; }
        public string weather { get; set; }
        public string fileename { get; set; }
        public string wtxzname { get; set; }
        public int? clrid { get; set; }
        public List<Attachment> attachment { get; set; }
    }


    public class YHDealWithLinkModel
    {
        /// <summary>
        /// 附件
        /// </summary>
        public string[] uploadpanelValue { get; set; }
      
        /// <summary>
        /// 处理人
        /// </summary>
        public int? processuserid { get; set; }
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

        public string wfsaid { get; set; }

        public string wfsid { get; set; }
        /// <summary>
        /// 处理意见
        /// </summary>
        public string dealcontent { get; set; }
        /// <summary>
        ///  当前流程创建人
        /// </summary>
        public int? wfcreateuserid { get; set; }
       
    }



}
