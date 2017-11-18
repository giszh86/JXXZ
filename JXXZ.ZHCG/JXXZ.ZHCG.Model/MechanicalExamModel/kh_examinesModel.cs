using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.MechanicalExaminationDAL
{
    public class kh_examinesModel
    {
        public int examineid { get; set; }
        public int? companyid { get; set; }
        public int? contractid { get; set; }
        public System.DateTime? examinedate { get; set; }
        public double? score { get; set; }
        public Nullable<int> status { get; set; }
        public double sumscore { get; set; }

        private string isRelease;

        public string IsRelease
        {
            get { return status==1?"是":"否"; }
            set { isRelease = value; }
        }

        public string contractname { get; set; }
        public string companyname { get; set; }
        public int? createuserid { get; set; }
        public DateTime? createtime { get; set; }

        public List<kh_scoresModel> scoresList { get; set; }
    }

    public class kh_scoresModel
    {
        public int scoreid { get; set; }
        public int? examineid { get; set; }
        public string deail { get; set; }
        public double? deduct { get; set; }
        public int? deductuserid { get; set; }
        public DateTime? examinetime { get; set; }
        public string deductusername { get; set; }
    }

    public class EcamineCount {
        public string name { get; set; }
        public int value { get; set; }
    }
}
