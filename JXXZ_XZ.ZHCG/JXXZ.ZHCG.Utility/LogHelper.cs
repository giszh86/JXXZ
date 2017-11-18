using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Utility
{
    public class LogHelper
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// 写入信息
        /// </summary>
        /// <param name="message"></param>
        public static void WriteInfo(string message)
        {
            log.InfoFormat(message);
        }

        /// <summary>
        /// 写入错误信息
        /// </summary>
        /// <param name="message"></param>
        public static void WriteErrorInfo(Exception ex)
        {
            log.Error(ex);
        }
    }
}
