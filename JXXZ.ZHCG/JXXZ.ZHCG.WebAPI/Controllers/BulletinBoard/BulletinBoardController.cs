using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.BulletinBoardDAL;
using JXXZ.ZHCG.DAL.SystemDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.BulletinBoardModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.BulletinBoard
{
    public class BulletinBoardController : ApiController
    {
        BulletinBoardBLL bll = new BulletinBoardBLL();
        SystemLogBLL logbll = new SystemLogBLL();

        #region 获取列表
        [HttpGet]
        public Paging<List<BulletinBoardModel>> GetBulletinBoardList(string filter, int start, int limit, int userid)
        {

            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetBulletinBoardList(filters, start, limit, userid);
        }

        [HttpGet]
        public Paging<List<BulletinBoardModel>> GetBulletinBoardList(int start, int limit, int userid)
        {
            return bll.GetBulletinBoardList(null, start, limit, userid);
        }

        [HttpGet]
        public List<BulletinBoardModel> GetBulletinBoardList()
        {
            return bll.GetBulletinBoardList();
        }

        #endregion

        #region 添加公告信息
        /// <summary>
        /// 添加公告信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddBulletinBoard()
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            BulletinBoardModel model = new BulletinBoardModel();
            //获取附件
            HttpPostedFileBase upfile = request.Files["fileNewName"];
            if (upfile != null && upfile.ContentLength > 0)
            {
                DateTime tfile = DateTime.Now;
                //创建绝对路径
                string tempPath = tfile.Year + @"\" + tfile.ToString("yyyyMMdd");
                string serverPath = Path.Combine(ConfigManageClass.BulletinBoardPath, tempPath);
                //判断绝对路径是否存在，如果没有，则创建
                if (!Directory.Exists(serverPath))
                {
                    Directory.CreateDirectory(serverPath);
                }
                //获取客户端上传的文件名字
                string newfile = upfile.FileName;
                //获取文件的后缀名
                string filetype = Path.GetExtension(newfile);
                //获取路径中文件的名字（不带文件的扩展名）
                string filename = Path.GetFileNameWithoutExtension(newfile).Replace('(', 'a').Replace(')', 'a');
                string newfilename = filename  + filetype;
                string filepath = Path.Combine(serverPath, newfilename);
                request.Files["fileNewName"].SaveAs(filepath);
                model.filename = newfilename;
                model.filepath = filepath;
                model.filesize = upfile.ContentLength;
            }

            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);

            model.author = request.Form["author"];
            model.content = request.Form["hidcontent"];
            model.createtime = Convert.ToDateTime(request.Form["createtime"]);
            model.seq = Convert.ToInt32(request.Form["seq"]);
            model.title = request.Form["title"];

            int success = bll.AddBulletinBoard(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 删除公告信息
        /// <summary>
        /// 删除公告信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage DeleteBulletinBoard(int id)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.DeleteBulletinBoard(id);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 编辑公告信息
        /// <summary>
        /// 编辑公告信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditBulletinBoard()
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            BulletinBoardModel model = new BulletinBoardModel();

            //获取附件
            HttpPostedFileBase upfile = request.Files["fileNewName"];
            if (upfile != null && upfile.ContentLength > 0)
            {
                DateTime tfile = DateTime.Now;
                //创建绝对路径
                string tempPath = tfile.Year + @"\" + tfile.ToString("yyyyMMdd");
                string serverPath = Path.Combine(ConfigManageClass.BulletinBoardPath, tempPath);
                //判断绝对路径是否存在，如果没有，则创建
                if (!Directory.Exists(serverPath))
                {
                    Directory.CreateDirectory(serverPath);
                }
                //获取客户端上传的文件名字
                string newfile = upfile.FileName;
                //获取文件的后缀名
                string filetype = Path.GetExtension(newfile);
                //获取路径中文件的名字（不带文件的扩展名）
                string filename = Path.GetFileNameWithoutExtension(newfile).Replace('(', 'a').Replace(')', 'a');
                string newfilename = filename  + filetype;
                string filepath = Path.Combine(serverPath, newfilename);
                request.Files["fileNewName"].SaveAs(filepath);
                model.filename = newfilename;
                model.filepath = filepath;
                model.filesize = upfile.ContentLength;
            }
            model.id = Convert.ToInt32(request.Form["id"]);
            model.author = request.Form["author"];
            model.content = request.Form["hidcontent"];
            model.seq = Convert.ToInt32(request.Form["seq"]);
            model.title = request.Form["title"];

            int success = bll.EditBulletinBoard(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 查看公告详情信息
        /// <summary>
        /// 查看公告详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public BulletinBoardModel ViewBulletinBoard(int id)
        {
            return bll.ViewBulletinBoard(id);
        }
        #endregion

        #region 首页日志列表
        [HttpGet]
        public List<SystemLogModel> GetSysLogList()
        {
            return logbll.GetSysLogList();
        }
        #endregion
    }
}