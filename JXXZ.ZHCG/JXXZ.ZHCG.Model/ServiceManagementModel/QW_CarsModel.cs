using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
    public class QW_CarsModel
    {
        public int carid { get; set; }
        public string code { get; set; }
        public string cartypeid { get; set; }
        public int unitid { get; set; }
        public string unitname { get; set; }
        public string carnumber { get; set; }
        public string cartel { get; set; }
        public int isonline { get; set; }
        public int createuserid { get; set; }
        public System.DateTime createtime { get; set; }
        public int status { get; set; }
        public Nullable<int> ssbc { get; set; }
        public string ssbcname { get; set; }
        public int? carstatus { get; set; }
        public string cartypename { get; set; }
        public string remarks { get; set; }
        public decimal? x84 { get; set; }
        public decimal? y84 { get; set; }
        private Nullable<System.DateTime> _positiontime;
        public Nullable<System.DateTime> positiontime
        {
            get
            {
                if (_positiontime == null)
                {
                    _positiontime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _positiontime;
            }
            set { _positiontime = value; }
        }
    }
}
