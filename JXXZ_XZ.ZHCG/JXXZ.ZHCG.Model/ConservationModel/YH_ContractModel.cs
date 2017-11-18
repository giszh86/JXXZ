using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ConservationModel
{
   public class YH_ContractModel
    {
        public int contractid { get; set; }
        public string contractname { get; set; }
        public string patrolexplain { get; set; }
        public string contractnum { get; set; }
        public string jfdw { get; set; }
        public string jfdb { get; set; }
        public string yfdw { get; set; }
        public string yfdb { get; set; }
        public string jldw { get; set; }
        public System.DateTime starttime { get; set; }
        public System.DateTime endtime { get; set; }
        public System.DateTime signdate { get; set; }
        public double summoney { get; set; }
        public int htzxzt { get; set; }
        public double currentmoney { get; set; }
        public double? patrolemoney { get; set; }
        public double? yhmoney { get; set; }
        public System.DateTime contactendtime { get; set; }
        public string contacttype { get; set; }
        public string contracttype { get; set; }
        public int createuserid { get; set; }
        public System.DateTime createtime { get; set; }

        public string  contacttypename { get; set; }
        public string contracttypename { get; set; }
        public string createusername { get; set; }
        public string[] uploadpanelValue { get; set; }
        public string contractstate { get; set; }

        public List<YH_FileModel> filelist { get; set; }
    }


   public class ExaminesModel {
       public int examineid { get; set; }
       public DateTime examinedate { get; set; }
       public double score { get; set; }
       public string contractname { get; set; }
       public string companyname { get; set; }
       public double fraction { get; set; }
       public double currentmoney { get; set; }
       public double summoney { get; set; }
       public double  patrolemoney { get; set; }
   }

   public class Fraction {
       public string deail { get; set; }
       public double deduct { get; set; }
   }
}
