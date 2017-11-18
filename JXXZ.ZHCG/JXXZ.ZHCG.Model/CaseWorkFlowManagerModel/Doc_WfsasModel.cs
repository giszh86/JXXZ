using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
    public class Doc_WfsasModel
    {
        public int dwfsasid { get; set; }
        public string wfsaid { get; set; }
        public Nullable<int> ddid { get; set; }
        public Nullable<int> filetyoe { get; set; }
        public string filename { get; set; }
        public string filepath { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> caseid { get; set; }
        public string lastwordpath { get; set; }
        public string lastpdfpath { get; set; }
        public string lastdwfname { get; set; }
        public string lastdwfcode { get; set; }
        public string ddtablename { get; set; }
        public string doccode { get; set; }
        public Nullable<int> ddtableid { get; set; }
        public Nullable<int> documentid { get; set; }
        public Nullable<int> status { get; set; }


        public string dcjg { get; set; }
        public string wfss { get; set; }
        public string ajdx { get; set; }
        public string ajdxremark { get; set; }
        public string jyaq { get; set; }
        public int? xzcftype { get; set; }
        public string xzcfje { get; set; }
        public string xzcfnr { get; set; }
        public string xzcffs { get; set; }

        public string dsrreplay { get; set; }
        public string dsryj { get; set; }
        public Nullable<System.DateTime> cssbtime { get; set; }
        public string tzjgsm { get; set; }
        public string tzclr { get; set; }
        public Nullable<System.DateTime> tzcltime { get; set; }
        public string xzcfbgbz { get; set; }
        public string xzcfbgclr { get; set; }
        public Nullable<System.DateTime> xzcfbgcltime { get; set; }
        public string sdremark { get; set; }
        public string dsrzxfs { get; set; }
        public string sfyj { get; set; }
        public string yjdw { get; set; }
        public Nullable<System.DateTime> yjtime { get; set; }

        public Nullable<int> issave { get; set; }

        public string  wsbh { get; set; }
    }

    public class DocList {
        public int dwfsasid { get; set; }
        public string wfsaid { get; set; }
        public Nullable<int> ddid { get; set; }
        public Nullable<int> filetyoe { get; set; }
        public string filename { get; set; }
        public string filepath { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> caseid { get; set; }
        public string lastwordpath { get; set; }
        public string lastpdfpath { get; set; }
        public string lastdwfname { get; set; }
        public string lastdwfcode { get; set; }
        public string ddtablename { get; set; }
        public Nullable<int> ddtableid { get; set; }
        public Nullable<int> doccount { get; set; }

        public string wfdid { get; set; }
        public string doccode { get; set; }
        public string  ddname { get; set; }
        public string text { get; set; }
        public int phaseid { get; set; }
        public string phasename { get; set; }
        public bool leaf { get; set; }
    }

    public class DocPageList
    {
        public int id { get; set; }
        public string text { get; set; }
        public bool leaf { get; set; }
        public List<DocList> children { get; set; }
    }

    public class PhaseModel
    {
        public int phaseid { get; set; }
        public string phasename { get; set; }
        public string wfid { get; set; }
        public int? seq { get; set; }
    }
}
