//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace JXXZ.ZHCG.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class doc_wfsas
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
        public Nullable<int> ddtableid { get; set; }
        public Nullable<int> documentid { get; set; }
        public Nullable<int> status { get; set; }
        public string dcjg { get; set; }
        public string wfss { get; set; }
        public string ajdx { get; set; }
        public string ajdxremark { get; set; }
        public string jyaq { get; set; }
        public Nullable<int> xzcftype { get; set; }
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
    
        public virtual case_workflowspecificactivitys case_workflowspecificactivitys { get; set; }
        public virtual doc_definitions doc_definitions { get; set; }
    }
}
