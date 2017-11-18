using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace ZGM.SZCGInterface
{
   public  class HttpWebPost
    {

        /// <summary>
        /// 返回Web页面数据
        /// </summary>
        /// <param name="url">url字符串</param>
        /// <param name="isPost">请求方式true：post false：get</param>
        /// <param name="postString">post请求的参数</param>
        /// <returns>返回字符串</returns>
        public static string Request(string url, bool isPost, string postString)
        {
            HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
            request.Method = isPost ? "POST" : "GET";
            request.UserAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko";
            request.ContentType = "application/x-www-form-urlencoded";
            //request.CookieContainer = this.cookie;
            request.KeepAlive = false;

            if (isPost)
            {
                byte[] postData = Encoding.UTF8.GetBytes(postString);

                request.ContentLength = postData.Length;

                using (Stream stream = request.GetRequestStream())
                {
                    stream.Write(postData, 0, postData.Length);
                }
            }

            string respString = null;

            using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
            {
                using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                {
                    respString = reader.ReadToEnd();
                }
            }
            string aaaa = respString.Replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "").Replace("<string xmlns=\"ZHCGWebService/zhcgforphone\">", "").Replace("</string>","");
            
            return aaaa;
        }
    }
}
