using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JXXZ.ZHCG.WebAPI
{
    /// <summary>
    /// GetPDFFile 的摘要说明
    /// </summary>
    public class GetPDFFile : IHttpHandler
    {
        public void ProcessRequest (HttpContext context) {
            string DocPath = context.Request["DocPath"];
            string PathClass = context.Request["PathClass"];
            string AbsolutePath = System.Configuration.ConfigurationManager.AppSettings[PathClass];
            string fileName = AbsolutePath + DocPath;

            context.Response.ContentType = "application/pdf";

            if (System.IO.File.Exists(fileName))
                context.Response.WriteFile(fileName);
        }
     
        public bool IsReusable {
            get {
                return false;
            }
        }
    }
}