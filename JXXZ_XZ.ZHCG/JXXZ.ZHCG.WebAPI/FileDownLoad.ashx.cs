using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JXXZ.ZHCG.WebAPI
{
    /// <summary>
    /// FileDownLoad 的摘要说明
    /// </summary>
    public class FileDownLoad : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string filepath = context.Request["FilePath"];
                string fileName = context.Request["FileName"];

                if (!string.IsNullOrEmpty(filepath))
                {

                    if (System.IO.File.Exists(filepath))
                    {
                        System.IO.FileStream fs = new System.IO.FileStream(filepath, System.IO.FileMode.Open);
                        byte[] bytes = new byte[(int)fs.Length];
                        fs.Read(bytes, 0, bytes.Length);
                        fs.Close();
                        context.Response.Charset = "UTF-8";
                        context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
                        context.Response.ContentType = "application/octet-stream";
                        if (string.IsNullOrEmpty(fileName))
                            fileName = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                        //解决文件名乱码问题
                        context.Response.AddHeader("Content-Disposition", "attachment;filename=" + fileName);
                        context.Response.BinaryWrite(bytes);
                        context.Response.Flush();
                        context.Response.End();
                    }
                    else
                    {
                        context.Response.Write("<script>alert('该文件不存在!');history.back();</script>");
                    }
                }
            }
            catch (Exception)
            {
                
               
            }
           
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