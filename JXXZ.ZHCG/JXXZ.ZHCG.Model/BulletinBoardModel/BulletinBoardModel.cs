using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.BulletinBoardModel
{
    public class BulletinBoardModel
    {
        public int id { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string author { get; set; }
        public Nullable<int> seq { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<int> status { get; set; }
        public string filename { get; set; }
        public string filepath { get; set; }
        public Nullable<double> filesize { get; set; }
    }
}
