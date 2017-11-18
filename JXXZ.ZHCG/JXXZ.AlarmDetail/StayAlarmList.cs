using JXXZ.ZHCG.Model.AlarmDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.AlarmDetail
{
   public class StayAlarmList
    {
        //停留报警记录
        //存放速度不正常的记录
        public static List<AlarmList> ErrorLists = new List<AlarmList>();
        //存放停留报警数据
        public static List<AlarmList> AlarmLists = new List<AlarmList>();



        //越界报警记录
        //存放位置不正常的记录
        public static List<AlarmList> OverstepErrorLists = new List<AlarmList>();
        //存放越界报警数据
        public static List<AlarmList> OverstepAlarmLists = new List<AlarmList>();



        //离线报警记录
        //存放全部当前所处位置的记录
        public static List<AlarmList> OffLineLists = new List<AlarmList>();
        //存放离线报警数据
        public static List<AlarmList> OffLineAlarmLists = new List<AlarmList>();
    }
}
