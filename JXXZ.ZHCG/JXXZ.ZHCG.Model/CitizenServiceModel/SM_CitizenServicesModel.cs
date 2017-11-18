using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
    public class SM_CitizenServicesModel
    {
        public int IsSend { get; set; }
        public string citizenid { get; set; }
        public int sourceid { get; set; }
        public string spath { get; set; }
        public System.DateTime dutytime { get; set; }
        public string eventid { get; set; }
        public string complainant { get; set; }
        //public Nullable<int> cnumber { get; set; }

        private string _cnumber = "";

        public string cnumber
        {
            get
            {
                if (_cnumber == null)
                    _cnumber = "";
                return _cnumber;
            }
            set { _cnumber = value; }
        }

        public System.DateTime foundtime { get; set; }
        public string contactphone { get; set; }
        public string contactaddress { get; set; }
        public string eventaddress { get; set; }
        public string eventtitle { get; set; }
        public string eventcontent { get; set; }
        public int bigtypeid { get; set; }
        public int smalltypeid { get; set; }
        public System.DateTime limittime { get; set; }
        public string recorduser { get; set; }
        public string grometry { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        //public string processmode { get; set; }
        private string _processmode = "";

        public string processmode
        {
            get
            {
                if (_processmode == null)
                    _processmode = "";
                return _processmode; }
            set { _processmode = value; }
        }
        //public string satisfaction { get; set; }
        private string _satisfaction = "";

        public string satisfaction
        {
            get
            {
                if (_satisfaction == null)
                    _satisfaction = "";
                return _satisfaction;
            }
            set { _satisfaction = value; }
        }

        public DateTime? gdsj { get; set; }
        public int isdealwith { get; set; }
        public string sourcename { get; set; }
        public string bigtypename { get; set; }
        public string smalltypename { get; set; }
        public string createusername { get; set; }

        public string wfsid { get; set; }
        public string wfsname { get; set; }
        public string status { get; set; }
        public string wfid { get; set; }
        public string wfname { get; set; }
        public string wfdid { get; set; }
        public string wfdname { get; set; }
        public string wfsaid { get; set; }
        public DateTime? dealtime { get; set; }
        
        public string username { get; set; }
        public string wfwname { get; set; }
        public int? officeuserid { get; set; }
        public string pqusername { get; set; }
        public string pqmobile { get; set; }
        public string pqunitname { get; set; }
        public string nextusername { get; set; }
        public string dbnextusername { get; set; }
        public string workflowtype { get; set; }
        public string suggest { get; set; }
        public string ldsuggest { get; set; }//领导审核意见
        public int? nextuserid { get; set; }
        public string path { get; set; }
        public int sfzxzz { get; set; }
        public int? xzid { get; set; }//乡镇标识
        public string pqxzid { get; set; }//指挥中心派遣到乡镇标识

        public int? isextension { get; set; }
        public int? reviewextension { get; set; }
        public int? extensiontime { get; set; }

        /// <summary>
        /// 延期审核意见
        /// </summary>
        public string auditopinion { get; set; }
        /// <summary>
        /// 延期意见
        /// </summary>
        public string extensioncontent { get; set; }
        /// <summary>
        /// 2017.3.30 15.08分更改台账登记需要 wcy
        /// </summary>
        public int? srid { get; set; }

        /// <summary>
        /// 任务附件内容集合
        /// </summary>
        public List<FileClass> attachment { get; set; }
        public List<Attachment> Attachment { get; set; }
        /// <summary>
        /// 历史环节
        /// </summary>
        public List<WF_WorkFlowOldModel> workflowold { get; set; }

        /// <summary>
        /// 处理人
        /// </summary>
        public int? processuserid { get; set; }
        /// <summary>
        /// 处理类型
        /// </summary>
        public int processingType { get; set; }
        /// <summary>
        /// 图片1
        /// </summary>
        public string photo1 { get; set; }
        /// <summary>
        /// 图片2
        /// </summary>
        public string photo2 { get; set; }
        /// <summary>
        /// 图片3
        /// </summary>
        public string photo3 { get; set; }
        /// <summary>
        /// 图片4
        /// </summary>
        public string photo4 { get; set; }
        /// <summary>
        /// 处理结果
        /// </summary>
        public string content { get; set; }
    }


    public class DealWithLinkModel
    {
        /// <summary>
        /// 图片1
        /// </summary>
        public string photo1 { get; set; }
        /// <summary>
        /// 图片2
        /// </summary>
        public string photo2 { get; set; }
        /// <summary>
        /// 图片3
        /// </summary>
        public string photo3 { get; set; }
        /// <summary>
        /// 图片4
        /// </summary>
        public string photo4 { get; set; }

        /// <summary>
        /// 处理方式
        /// </summary>
        public string processmode { get; set; }
        /// <summary>
        /// 满意度
        /// </summary>
        public string satisfaction { get; set; }
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
        /// <summary>
        /// 手机号码
        /// </summary>
        public string mobile { get; set; }

        public string isSendMsg { get; set; }

        public string limittime { get; set; }
    }

    public class RSM_CitizenModel
    {
        public string[] uploadpanelValue { get; set; }
    }

    public class AddCitizenEventModel {
        public int sourceid { get; set; }
        public System.DateTime dutytime { get; set; }
        public string complainant { get; set; }
        public Nullable<int> cnumber { get; set; }
        public System.DateTime foundtime { get; set; }
        public string contactphone { get; set; }
        public string contactaddress { get; set; }
        public string eventaddress { get; set; }
        public string eventtitle { get; set; }
        public string eventcontent { get; set; }
        public int bigtypeid { get; set; }
        public int smalltypeid { get; set; }
        public System.DateTime limittime { get; set; }
        public string recorduser { get; set; }
        public string grometry { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public int sfzxzz { get; set; }
        /// <summary>
        /// 2017.3.30 15.08分更改台账登记需要 wcy
        /// </summary>
        public int? srid { get; set; }
        //public string processmode { get; set; }
        //public string satisfaction { get; set; }
        //public DateTime? gdsj { get; set; }
        //public int isdealwith { get; set; }
        //public string sourcename { get; set; }
        //public string bigtypename { get; set; }
        //public string smalltypename { get; set; }
        //public string createusername { get; set; }

        /// <summary>
        /// 处理类型
        /// </summary>
        public int processingType { get; set; }
        /// <summary>
        /// 图片1
        /// </summary>
        public string photo1 { get; set; }
        /// <summary>
        /// 图片2
        /// </summary>
        public string photo2 { get; set; }
        /// <summary>
        /// 图片3
        /// </summary>
        public string photo3 { get; set; }
        /// <summary>
        /// 图片4
        /// </summary>
        public string photo4 { get; set; }

        public string isSendMsg { get; set; }
    }



    public class SM_Count {
        public int sm_count { get; set; }
        public string Source { get; set; }
        public string SourceName { get; set; }
    }
}
