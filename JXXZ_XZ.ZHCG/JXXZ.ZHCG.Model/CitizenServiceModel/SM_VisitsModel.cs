using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
   public class SM_VisitsModel
    {
        public int visitid { get; set; }
        public string citizenid { get; set; }
        public Nullable<System.DateTime> visittime { get; set; }
        public string respondents { get; set; }
        public string contact { get; set; }
        public Nullable<int> returnvisit { get; set; }
        public string returnvisitstr { get; set; }
        public string returnvisitcontent { get; set; }
        public Nullable<int> satisfaction { get; set; }
        public string satisfactionstr { get; set; }
        public Nullable<int> processmode { get; set; }
        public string processopinion { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }

        public string eventtitle { get; set; }
    }
}
