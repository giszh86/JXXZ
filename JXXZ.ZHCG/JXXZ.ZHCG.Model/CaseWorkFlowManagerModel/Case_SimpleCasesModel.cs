using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Case_SimpleCasesModel
    {
        public int caseid { get; set; }
        public int simpleid { get; set; }
        public string cfjdsbh { get; set; }
        public string casetypeid { get; set; }
        public string casesourcename { get; set; }
        public string casename { get; set; }
        public string qlsxid { get; set; }
        public string qlsx { get; set; }
        public string casereason { get; set; }
        public string fromcasesource { get; set; }
        public string caseaddress { get; set; }
        public System.DateTime sitedatetime { get; set; }
        public string geographical84 { get; set; }
        public string geographical2000 { get; set; }
        public string persontype { get; set; }
        public string p_name { get; set; }
        public string p_sex { get; set; }
        public string p_cardtype { get; set; }
        public string p_cardnum { get; set; }
        public string p_contactphone { get; set; }
        public string p_contactaddress { get; set; }
        public string f_name { get; set; }
        public string f_dbr { get; set; }
        public string f_cardtype { get; set; }
        public string f_card { get; set; }
        public string f_wtr { get; set; }
        public string f_cardnum { get; set; }
        public string f_contactphone { get; set; }
        public string f_contactaddress { get; set; }
        public string pf_name { get; set; }
        public string contactphone { get; set; }
        public string contactaddress { get; set; }
        public string flfg { get; set; }
        public string clyj { get; set; }
        public string wfqx { get; set; }
        public string cf { get; set; }
        public double? zdmj { get; set; }
        public double? gdmj { get; set; }
        public double? gtjzmj { get; set; }
        public double? ghjzmj { get; set; }
        public string casecontent { get; set; }
        public string jktype { get; set; }
        public decimal fk_money { get; set; }
        public string bank_name { get; set; }
        public string bank_account { get; set; }
        public string bank_accountname { get; set; }
        public string zfr_name { get; set; }
        public string zf_card { get; set; }
        public System.DateTime zf_time { get; set; }
        public string zf_address { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public int createuserid { get; set; }
        public string wfsaid { get; set; }
        public string cswfsid { get; set; }
        public int? tzcsid { get; set; }
        public string wfsid1 { get; set; }
        public string wfsid2 { get; set; }
        public int? dwfsasid { get; set; }
        public int? isphone { get; set; }

        public string createusername { get; set; }
        public string cardName { get; set; }
        public string fcardName { get; set; }
        public string  casereasonname { get; set; }
        public string casetypename { get; set; }
        public string p_cardtypename { get; set; }
        public string  f_cardtypename { get; set; }
        public string  bankname { get; set; }
        public string bankaccount { get; set; }
        public string bankaccountname { get; set; }
        public string fkpjbh { get; set; }

        public int? unitid { get; set; }
        public int? parentid { get; set; }

        public string[] uploadpanelValue { get; set; }
    }
}
