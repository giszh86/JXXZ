using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ConservationModel
{
    public class YH_CompanyModel
    {
        public int companyid { get; set; }
        public string companyname { get; set; }
        public string legal { get; set; }
        public string contact { get; set; }
        public string mobilephone { get; set; }
        public string telephone { get; set; }
        public string faxnumber { get; set; }
        public string email { get; set; }
        public string companytype { get; set; }
        public string address { get; set; }
        public Nullable<int> isenadle { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public string isenadlename { get; set; }
        public string  companytypename { get; set; }

        public List<YH_FileModel> filelist { get; set; }

    }
}
