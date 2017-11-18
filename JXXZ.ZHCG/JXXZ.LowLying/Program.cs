using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.LowLying
{
    class Program
    {
        static void Main(string[] args)
        {
            LowLying ll = new LowLying();
            Console.WriteLine("开始分析数据!");
            ll.LowLyingPolice();
            Console.WriteLine("数据分析完成!");
        }
    }
}
