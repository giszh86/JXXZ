using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.LegalCaseModel
{
    /// <summary>
    /// 自由裁量
    /// </summary>
    public class FreeDiscretionModel
    {
        public string powerid { get; set; }
        public string lawid { get; set; }
        public string standardid { get; set; }
        public string sourcekey { get; set; }
        //权力基本码
        public string powercode { get; set; }
        //权力事项名称
        public string powername { get; set; }
        //法律法规名称
        public string lawname { get; set; }
        //裁量依据具体内容
        public string lawcontent { get; set; }
        //违法情形
        public string wfqx { get; set; }
        //处罚结果
        public string result { get; set; }
    }
}
