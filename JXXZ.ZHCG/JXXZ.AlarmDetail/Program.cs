using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.AlarmDetail
{
    class Program
    {
        static void Main(string[] args)
        {
            AlarmDetail gm = new AlarmDetail();
            Console.WriteLine("开始分析数据!");
            gm.YJTlAlarmDetail();
            gm.LxAlarmDetail();
            gm.CARYJTlAlarmDetail();
            gm.CARLxAlarmDetail();
            Console.WriteLine("数据分析完成!");
        }
    }
}
