using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.AlarmDetail
{
    public class AlarmDetailModel
    {
        public int id { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<double> longitude { get; set; }
        public Nullable<double> latitude { get; set; }
        public Nullable<System.DateTime> gpstime { get; set; }
        public Nullable<double> speed { get; set; }
        public Nullable<System.DateTime> alarmstrattime { get; set; }
        public Nullable<System.DateTime> alarmendtime { get; set; }
        public Nullable<int> alarmtype { get; set; }
        public Nullable<int> userid { get; set; }
        public Nullable<int> state { get; set; }
        public string content { get; set; }
        public Nullable<System.DateTime> dealtime { get; set; }
        public Nullable<int> dealuserid { get; set; }
        public Nullable<int> isallege { get; set; }
        public string allegereason { get; set; }
        public Nullable<System.DateTime> allegetime { get; set; }
        public string username { get; set; }
        public int? unitid { get; set; }
        public string unitname { get; set; }
        public int? appeals { get; set; }

        //报警类型名称
        public string alarmtypename { get; set; }
        //报警状态名称
        public string statename { get; set; }
        //申诉状态
        public string isallegename { get; set; }
        //审核状态
        public string appealsname { get; set; }
    }
}
