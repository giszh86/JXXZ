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
    
    public partial class tz_tztasks
    {
        public tz_tztasks()
        {
            this.tz_taskclasses = new HashSet<tz_taskclasses>();
        }
    
        public int taskid { get; set; }
        public string taskname { get; set; }
        public Nullable<int> taskyear { get; set; }
        public Nullable<int> tz_type { get; set; }
        public Nullable<System.DateTime> starttime { get; set; }
        public Nullable<System.DateTime> endtime { get; set; }
        public string remark { get; set; }
        public string tz_json { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public string sszd { get; set; }
        public string ssrw { get; set; }
    
        public virtual ICollection<tz_taskclasses> tz_taskclasses { get; set; }
    }
}