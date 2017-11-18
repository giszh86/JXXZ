using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.CarSynchronize
{
    class Program
    {
        static void Main(string[] args)
        {
            //Synchronize gm = new Synchronize();
            //Console.WriteLine("开始分析数据!");
            //gm.GetAllListEvent();
            //Console.WriteLine("数据分析完成!");
            GetCarGPS gps = new GetCarGPS();
            gps.GetGPS();
        }
    }
}
