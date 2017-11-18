using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Techzen.ICS.PublicModel
{
    public class RoadsStatistics
    {
        public int id { get; set; }
        public int regionid { get; set; }
        public string regionname { get; set; }

        public int total { get; set; }
        public decimal length { get; set; }
        public DateTime statistime { get; set; }

    }
}
