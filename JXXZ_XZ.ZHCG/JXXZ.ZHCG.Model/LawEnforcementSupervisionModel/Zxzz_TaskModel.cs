using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.LawEnforcementSupervisionModel
{
    public class Zxzz_TaskModel
    {
        public string taskid { get; set; }
        public string title { get; set; }
        public string tasktype { get; set; }
        public Nullable<int> level { get; set; }
        public Nullable<int> term { get; set; }
        public Nullable<System.DateTime> starttime { get; set; }
        public Nullable<System.DateTime> endtime { get; set; }
        public string region { get; set; }
        public string taskexplain { get; set; }
        public string grometry { get; set; }
        public Nullable<int> fqr { get; set; }
        public Nullable<System.DateTime> fqtime { get; set; }
        public string xdzd { get; set; }
        public string leader { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<System.DateTime> summarytime { get; set; }
        public Nullable<int> summaryuserid { get; set; }
        public string summary { get; set; }
        public string results { get; set; }
        public string experiences { get; set; }
        public string[] uploadpanelValue { get; set; }
        public string[] xdzdValue { get; set; }

        public string wfsid { get; set; }
        public string wfsname { get; set; }
        public string dealcontent { get; set; }
        public string wfid { get; set; }
        public string wfname { get; set; }
        public string wfdid { get; set; }
        public string wfdname { get; set; }
        public string wfsaid { get; set; }
        public string wfsuid { get; set; }
        public string nextwfdid { get; set; }
        public string zd_name { get; set; }
        public Nullable<int> seqnum { get; set; }

        public int userid { get; set; }
        public string username { get; set; }
        public string wfwname { get; set; }
        public string nextusername { get; set; }
        public int? nextuserid { get; set; }
        public string levelstr { get; set; }
        public string setime { get; set; }
    }

    public class Zxzz_TaskFiles
    {
        public int fileid { get; set; }
        public string sourceid { get; set; }
        public string filename { get; set; }
        public string filetype { get; set; }
        public string filepath { get; set; }
        public Nullable<double> filesize { get; set; }
    }

    public class Zxzz_TaskWorkFlowModel 
    {
        public string tablenameid { get; set; }
        public string wfsuid { get; set; }
        public Nullable<int> userid { get; set; }
        public string username { get; set; }
        public string unitname { get; set; }
        public Nullable<System.DateTime> dealtime { get; set; }
        public string dealtype { get; set; }
        public string content { get; set; }
    }
}
