using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.AlarmDetail
{
    public class AlarmList
    {
        public string ACCOUNT { get; set; }
        public double? SPEED { get; set; }
        public DateTime CREATETIME { get; set; }
        public double? LONGITUDE { get; set; }
        public double? LATITUDE { get; set; }
        public double? X { get; set; }
        public double? Y { get; set; }
        public DateTime GPSTIME { get; set; }
        public int ALARMOVER { get; set; }//判断该次报警是否已经结束，1未结束，2已结束
        public DateTime? ALARMSTRATTIME { get; set; }
        public DateTime? ALARMENDTIME { get; set; }
        public int ALARMTYPE { get; set; }
        public int USERID { get; set; }
    }
}
