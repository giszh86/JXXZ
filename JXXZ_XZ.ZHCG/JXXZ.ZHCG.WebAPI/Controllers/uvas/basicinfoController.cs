using JXXZ.ZHCG.DAL.uvasDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.uvasModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.uvas
{
    public class basicinfoController : ApiController
    {
        private basicinfoBLL bll = new basicinfoBLL();

        #region 无人机基本信息列表
        /// <summary>
        /// 无人机基本信息列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<basicinfoModel> GetBaseInfoList(int start, int limit)
        {
            return bll.GetBaseInfoList(null, start, limit);
        }

        /// <summary>
        /// 无人机基本信息列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<basicinfoModel> GetBaseInfoList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetBaseInfoList(filters, start, limit);
        }
        #endregion

        #region 新增无人机基本信息
        [HttpPost]
        public HttpResponseMessage AddApproveInf(basicinfoModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.AddBasicInfo(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 删除一条无人机基本信息
        [HttpPost]
        public int DeleteBasicInfo(int ovaid)
        {
            return bll.DeleteBasicInfo(ovaid);
        }
        #endregion

        #region 编辑无人机基本信息
        [HttpPost]
        public HttpResponseMessage EditBasicInfo(basicinfoModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.EditBasicInfo(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 获取无人机基本信息详情
        [HttpGet]
        public basicinfoModel GetBasicInfo(int ovaid)
        {
            return bll.GetBasicInfo(ovaid);
        }
        #endregion

        /// <summary>
        ///获取文件夹目录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public FolderTree GetFolders()
        {
            FolderTree node = new FolderTree();
            GetFolders(ConfigManageClass.UAVPath, node);
            return node;
        }

        public void GetFolders(string filePath, FolderTree node)
        {
            DirectoryInfo folder = new DirectoryInfo(filePath);
            node.text = folder.Name.Contains("UAVS") ? "无人机视频" : folder.Name;
            node.FullName = folder.FullName;

            //FileInfo[] chldFiles = folder.GetFiles("*.*");
            //foreach (FileInfo chlFile in chldFiles)
            //{
            //    FolderTree chldNode = new FolderTree();
            //    chldNode.leaf = true;
            //    chldNode.text = chlFile.Name;
            //    chldNode.FullName = chlFile.FullName;
            //    node.children.Add(chldNode);
            //}
            DirectoryInfo[] chldFolders = folder.GetDirectories();
            foreach (DirectoryInfo chldFolder in chldFolders)
            {
                DirectoryInfo folderChild = new DirectoryInfo(chldFolder.FullName);
                DirectoryInfo[] chlds = folderChild.GetDirectories();
                FolderTree chldNode = new FolderTree();
                chldNode.text = folder.Name.Contains("UAVS") ? "无人机视频" : folder.Name;
                chldNode.FullName = folder.FullName;
                node.children.Add(chldNode);
                GetFolders(chldFolder.FullName, chldNode);
                if (chlds.Length > 0)
                {
                    chldNode.leaf = false;
                }
                else
                {
                    chldNode.leaf = true;
                }
            }
        }

        /// <summary>
        ///获取文件夹目录(前台)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<FolderTreeWeb> GetFoldersForWeb()
        {
            List<FolderTreeWeb> list=new List<FolderTreeWeb> ();
            FolderTreeWeb node = new FolderTreeWeb();
            GetFoldersForWeb(ConfigManageClass.UAVPath, node);
            list.Add(node);
            return list;
        }


        public void GetFoldersForWeb(string filePath, FolderTreeWeb node)
        {
            DirectoryInfo folder = new DirectoryInfo(filePath);
            node.text = folder.Name.Contains("UAVS") ? "无人机视频" : folder.Name;
           // node.id = folder.FullName;
            node.nodes = new List<FolderTreeWeb>();
            FileInfo[] chldFiles = folder.GetFiles("*.*");
            foreach (FileInfo chlFile in chldFiles)
            {
                FolderTreeWeb chldNode = new FolderTreeWeb();
                chldNode.leaf = true;
                chldNode.text = chlFile.Name;
                chldNode.path = chlFile.FullName;
               // chldNode.id = chlFile.FullName;
                chldNode.parentid = node.id;
                node.nodes.Add(chldNode);
            }
            DirectoryInfo[] chldFolders = folder.GetDirectories();
            foreach (DirectoryInfo chldFolder in chldFolders)
            {
                DirectoryInfo folderChild = new DirectoryInfo(chldFolder.FullName);
                DirectoryInfo[] chlds = folderChild.GetDirectories();
                FolderTreeWeb chldNode = new FolderTreeWeb();
                chldNode.text = folder.Name.Contains("UAVS") ? "无人机视频" : folder.Name;
               // chldNode.id = folder.FullName;
                chldNode.parentid = node.id;
                node.nodes.Add(chldNode);
                GetFoldersForWeb(chldFolder.FullName, chldNode);
                if (chlds.Length > 0)
                {
                    chldNode.leaf = false;
                }
                else
                {
                    chldNode.leaf = true;
                }
            }
        }






        [HttpGet]
        public Paging<List<FileInfoModel>> GetUAVFiles(int start, int limit)
        {
            List<FileInfoModel> list = new List<FileInfoModel>();
            ListFiles(list, new DirectoryInfo(ConfigManageClass.UAVPath));
            list = list.OrderByDescending(t => t.UploadTime).Skip(start).Take(limit).ToList();
            int total = list.Count();

            Paging<List<FileInfoModel>> paging = new Paging<List<FileInfoModel>>();
            paging.Items = list;
            paging.Total = total;

            return paging;

        }

        [HttpGet]
        public Paging<List<FileInfoModel>> GetUAVFiles(string filter, int start, int limit)
        {
            List<FileInfoModel> list = new List<FileInfoModel>();
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            if (filters != null && filters.Count > 0)
            {
                foreach (Filter f in filters)
                {
                    string value = f.value;
                    switch (f.property)
                    {
                        case "FullName":
                            if (!string.IsNullOrEmpty(value))
                            {
                                ListFiles(list, new DirectoryInfo(value));
                            }
                            break;
                    }
                }
            }

            list = list.OrderByDescending(t => t.UploadTime).Skip(start).Take(limit).ToList();
            int total = list.Count();

            Paging<List<FileInfoModel>> paging = new Paging<List<FileInfoModel>>();
            paging.Items = list;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 获取所有文件
        /// </summary>
        /// <param name="info"></param>
        public static void ListFiles(List<FileInfoModel> list, FileSystemInfo info)
        {
            if (!info.Exists) return;
            DirectoryInfo dir = info as DirectoryInfo;
            //不是目录 
            if (dir == null) return;
            FileSystemInfo[] files = dir.GetFileSystemInfos();
            for (int i = 0; i < files.Length; i++)
            {
                FileInfo file = files[i] as FileInfo;
                //是文件 
                if (file != null)
                {
                    FileInfoModel model = new FileInfoModel();
                    model.FileName = file.Name;
                    model.FullPath = file.FullName;
                    model.UploadTime = file.LastWriteTime;
                    list.Add(model);
                }
                //对于子目录，进行递归调用 
                else
                    ListFiles(list, files[i]);
            }
        }

    }
}