using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ConservationModel
{
    public class YH_FileModel
    {
        public int fileid { get; set; }
        public Nullable<int> filesource { get; set; }
        public Nullable<int> sourceid { get; set; }
        public string filename { get; set; }
        public string filetype { get; set; }
        public string filepath { get; set; }
        public Nullable<double> filesize { get; set; }
    }
}
