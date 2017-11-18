using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.AccountModel
{
    public class AccountRegisterTaskChild
    {
        public int id { get; set; }
        public string monthstring { get; set; }
        public int year { get; set; }
        public int month { get; set; }
        public string name { get; set; }
        public string text { get; set; }
        public int seq { get; set; }
        public int phaseid { get; set; }
        public bool leaf { get; set; }
    }
}
