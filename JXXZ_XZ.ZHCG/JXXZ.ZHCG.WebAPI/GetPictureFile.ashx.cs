using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JXXZ.ZHCG.WebAPI
{
    /// <summary>
    /// GetPictureFile 的摘要说明
    /// </summary>
    public class GetPictureFile : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string PicPath = context.Request["PicPath"];
            string PathClass = string.Empty;
            string fileName = PicPath;
            if (!string.IsNullOrEmpty(context.Request["PathClass"]))
            {
                PathClass = context.Request["PathClass"];
                string AbsolutePath = System.Configuration.ConfigurationManager.AppSettings[PathClass];
                fileName = AbsolutePath + PicPath;
            }

            // string PathClass = context.Request["PathClass"];

            // string fileName = AbsolutePath + PicPath;

            context.Response.ContentType = "image/JPEG";

            if (System.IO.File.Exists(fileName))
                context.Response.WriteFile(fileName);
            else
                context.Response.Write("/Images/images/NotFoundDefault.png");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}