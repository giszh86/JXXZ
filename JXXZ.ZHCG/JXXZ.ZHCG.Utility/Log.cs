using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;

namespace JXXZ.ZHCG.Utility
{
    public static class Log
    {
        /// <summary>
        /// 日志文件目录
        /// </summary>
        private static string strPath = string.Empty;

        /// <summary>
        /// 日志文件默认目录
        /// </summary>
        private static string default_strPath = @"C:\Log\MySolution\";

        /// <summary>
        /// 锁
        /// </summary>
        private static Object thisLock = new Object();

        static Log()
        {
            //if (ConfigurationManager.AppSettings["LogPath"] != null)
            //{
            //    strPath = ConfigurationManager.AppSettings["LogPath"].ToString();

            //}
            if (string.IsNullOrEmpty(strPath))
            {
                strPath = default_strPath;
            }
        }

        #region 写通用日志


        /// <summary>
        /// 开始
        /// </summary>
        public static void WriteLogStart()
        {
            WriteLog("", string.Format("------------------------------开始时间：{0}------------------------------", DateTime.Now.ToString()), null);
        }

        /// <summary>
        /// 开始
        /// </summary>
        public static void WriteLogEnd()
        {
            WriteLog("", string.Format("------------------------------结束时间：{0}------------------------------", DateTime.Now.ToString()), null);
        }

        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="strFileContent">文件内容（可以为空）</param>
        public static void WriteLog(string strFileContent)
        {
            WriteLog("", strFileContent, null);
        }
        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="strFileContent">文件内容（可以为空）</param>
        public static void WriteLog(StringBuilder FileContent)
        {
            WriteLog("", FileContent.ToString(), null);
        }
        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name='strFileName'>文件名（如果为空，则为yyyy-MM-dd.log）</param>
        /// <param name='strFileContent'>文件内容（可以为空）</param>
        /// <param name='ex'>应用程序执行过程中发生的错误（可以为空）</param>
        public static void WriteLog(Exception ex)
        {
            WriteLog("", "", ex);
        }
        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name='strFileName'>文件名（如果为空，则为yyyy-MM-dd.log）</param>
        /// <param name='ex'>应用程序执行过程中发生的错误（可以为空）</param>
        public static void WriteLog(string strFileName, Exception ex)
        {
            WriteLog(strFileName, "", ex);
        }
        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name='strFileName'>文件名（如果为空，则为yyyy-MM-dd.log）</param>
        /// <param name='strFileContent'>文件内容（可以为空）</param>
        public static void WriteLog(string strFileName, string strFileContent)
        {
            WriteLog(strFileName, strFileContent, null);
        }
        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name='strFileName'>文件名（如果为空，则为yyyy-MM-dd.log）</param>
        /// <param name='strFileContent'>文件内容（可以为空）</param>
        /// <param name='ex'>应用程序执行过程中发生的错误（可以为空）</param>
        public static void WriteLog(string strFileName, StringBuilder strFileContent, Exception ex)
        {
            WriteLog(strFileName, strFileContent.ToString(), ex);
        }


        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="strFileName">文件名（如果为空，则为yyyy-MM-dd.log）</param>
        /// <param name="strFileContent">文件内容（可以为空）</param>
        /// <param name="ex">应用程序执行过程中发生的错误（可以为空）</param>
        public static void WriteLog(string strFileName, string strFileContent, Exception ex)
        {
            DateTime dTime = DateTime.Now;
            StringBuilder sb = new StringBuilder();
            if (string.IsNullOrEmpty(strFileName)) { strFileName = dTime.ToString("yyyy-MM-dd") + ".log"; }
            if (!Directory.Exists(strPath)) { Directory.CreateDirectory(strPath); }
            if (!string.IsNullOrEmpty(strFileContent))
            {
                sb.AppendLine(strFileContent);
            }
            if (ex != null)
            {
                sb.AppendLine("Message:" + ex.Message);
                sb.AppendLine("Source:" + ex.Source);
                sb.AppendLine("StackTrace:" + ex.StackTrace);
                if (ex.InnerException != null)
                {
                    sb.AppendLine("InnerException.Message:" + ex.InnerException.Message);
                    sb.AppendLine("InnerException.Source:" + ex.InnerException.Source);
                    if (ex.InnerException.InnerException != null)
                    {
                        sb.AppendLine("InnerException.InnerException.Message:" + ex.InnerException.InnerException.Message);
                        sb.AppendLine("InnerException.InnerException.Source: " + ex.InnerException.InnerException.Source);
                    }
                }
            }
            lock (thisLock)
            {
                StreamWriter sw = new StreamWriter(strPath + strFileName, true, Encoding.UTF8);
                try
                {

                    sb.AppendLine();
                    sw.Write(sb.ToString());
                }
                finally
                {
                    sw.Close();
                }
            }
        }
        #endregion

    }
}
