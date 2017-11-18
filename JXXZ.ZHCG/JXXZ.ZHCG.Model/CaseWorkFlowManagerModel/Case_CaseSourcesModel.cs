using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Case_CaseSourcesModel
    {
        public int caseid { get; set; }
        public Nullable<int> sourceid { get; set; }
        public string contact { get; set; }
        public string contactphone { get; set; }
        public string contactaddress { get; set; }
        public string wfxwfsdz { get; set; }
        public string cluecontent { get; set; }
        public string processopinion { get; set; }
        public string notetaker { get; set; }
        public System.DateTime notetime { get; set; }
        public Nullable<int> sfla { get; set; }
        public Nullable<int> casetype { get; set; }
        public Nullable<int> sfbyla { get; set; }
        public Nullable<int> sfzc { get; set; }
        public Nullable<int> sfyj { get; set; }
        public Nullable<int> yjdwid { get; set; }
        public System.DateTime createtime { get; set; }
        public int createuserid { get; set; }
        public string casetypename { get; set; }
        public Nullable<int> status { get; set; }
        public string statusname { get; set; }
        public Nullable<int> lastatus { get; set; }
        public string wfsid { get; set; }
        public string wfsaid { get; set; }

        public string  createusername { get; set; }
        public string sourcename { get; set; }
    }

   public class InheritCaseSourceModel
   {
       public string powerid { get; set; }
       public string code { get; set; }
       public string powername { get; set; }
       public string flfg { get; set; }
       public string clyj { get; set; }
       public string wfqx { get; set; }
       public string cf { get; set; }
       public string createtime { get; set; }
   }

   
}
