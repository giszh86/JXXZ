using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.DataDictionaryModel
{
    public class DataDictionaryModel
    {
        public string zd_typename { get; set; }
        public string zd_type { get; set; }
        public string zd_id { get; set; }
        public string zd_name { get; set; }
        public int zd_seq { get; set; }
        public int status { get; set; }
        public string remark { get; set; }
        public string parentid { get; set; }
    }
    public class DataDictionaryType
    {
        public string zdid { get; set; }
        public string ddid { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string parentid { get; set; }
        public string parentname { get; set; }
        public string remark { get; set; }
        public string text { get; set; }
        public bool leaf { get; set; }
        public List<DataDictionaryType> children { get; set; }
    }
}
