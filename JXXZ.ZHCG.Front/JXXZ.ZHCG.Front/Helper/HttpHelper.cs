
using System;
using System.Windows;

namespace JXXZ.ZHCG.Front.Helper
{
    public class HttpHelper
    {
        /// <summary>
        /// 获得当前网站虚拟路径
        /// </summary>
        /// <returns>网站虚拟路径</returns>
        public static string GetVirtualPath()
        {
            Uri source = Application.Current.Host.Source;
            string url = source.Scheme + "://" + source.Host + ":" + source.Port.ToString();
            
            return url;
        }
    }
}
