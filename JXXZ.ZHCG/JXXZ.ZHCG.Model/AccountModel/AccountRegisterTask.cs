using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.AccountModel
{
    public class AccountRegisterTask
    {
        //专题
        public string special { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string text { get; set; }
        public int seq { get; set; }
        public bool leaf { get; set; }
        public List<AccountRegisterTaskChild> children { get; set; }
    }
}
