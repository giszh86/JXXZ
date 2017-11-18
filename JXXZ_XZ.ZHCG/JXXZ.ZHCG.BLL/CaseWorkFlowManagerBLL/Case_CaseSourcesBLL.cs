using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
   public class Case_CaseSourcesBLL
    {
       private Case_CaseSourcesDAL dal = new Case_CaseSourcesDAL();
       private Doc_WfsasDAL DWdal = new Doc_WfsasDAL();
       private Case_YjdwsDAL CYdal = new Case_YjdwsDAL();
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       public int AddCaseSources(Case_CaseSourcesModel model)
       {
           return dal.AddCaseSources(model);
       
       }

       /// <summary>
       /// 处理
       /// </summary>
       /// <param name="caseid"></param>
       /// <returns></returns>
       public int HandleCaseSources(Case_CaseSourcesModel model)
       {
           return dal.HandleCaseSources(model);

       }

       /// <summary>
       /// 立案
       /// </summary>
       /// <param name="caseid"></param>
       /// <returns></returns>
       public int RegisterCaseSources(int caseid)
       {
           return dal.RegisterCaseSources(caseid);

       }

       /// <summary>
       /// 待办列表
       /// </summary>
       /// <returns></returns>
       public Paging<List<Case_CaseSourcesModel>> GetPendingCaseSourcesList(List<Filter> filter, int start, int limit,int userid)
       {

           List<Case_CaseSourcesModel> items = dal.GetPendingCaseSourcesList(filter, start, limit,userid).ToList();
           int total = dal.GetPendingCaseSourcesCount(filter,userid);

           Paging<List<Case_CaseSourcesModel>> paging = new Paging<List<Case_CaseSourcesModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }

       /// <summary>
       /// 已办列表
       /// </summary>
       /// <returns></returns>
       public Paging<List<Case_CaseSourcesModel>> GetProcessedCaseSourcesList(List<Filter> filter, int start, int limit, int userid)
       {

           List<Case_CaseSourcesModel> items = dal.GetProcessedCaseSourcesList(filter, start, limit,userid).ToList();
           int total = dal.GetProcessedCaseSourcesCount(filter,userid);

           Paging<List<Case_CaseSourcesModel>> paging = new Paging<List<Case_CaseSourcesModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }

       /// <summary>
       /// 已办列表
       /// </summary>
       /// <returns></returns>
       public Paging<List<Case_CaseSourcesModel>> GetAllCaseSourcesList(List<Filter> filter, int start, int limit)
       {

           List<Case_CaseSourcesModel> items = dal.GetAllCaseSourcesList(filter, start, limit).ToList();
           int total = dal.GetAllCaseSourcesCount(filter);

           Paging<List<Case_CaseSourcesModel>> paging = new Paging<List<Case_CaseSourcesModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }

       /// <summary>
       /// 全部案源列表导出
       /// </summary>
       /// <returns></returns>
       public List<Case_CaseSourcesModel> GetAllCaseSourcesListExcel(List<Filter> filter = null)
       {
           List<Case_CaseSourcesModel> list = dal.GetAllCaseSourcesListExcel(filter);

           return list;
       }


        /// <summary>
        /// 移交单位
        /// </summary>
        /// <returns></returns>
       public List<ClassModel> GetYjdwClass()
       {
           return CYdal.GetYjdwClass();
       }

        /// <summary>
       /// 增加当前处理用户的附件
       /// </summary>
       public void function_AddWfsas(List<Doc_WfsasModel> WfsasList)
       {
           DWdal.function_AddWfsas(WfsasList);
       }

       /// <summary>
        /// 生成WORD、PDF文件
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> ToWordPDF(string docname,string abspath, string FilePath, Dictionary<string, string> dic)
        {
            DateTime dt = DateTime.Now;
            if (!Directory.Exists(FilePath))
            {
                Directory.CreateDirectory(FilePath);
            }
            string OriginalPathYear = FilePath + "\\" + dt.Year;
            if (!Directory.Exists(OriginalPathYear))
            {
                Directory.CreateDirectory(OriginalPathYear);
            }
            string OriginalPathdate = OriginalPathYear + "\\" + dt.ToString("yyyyMMdd");
            if (!Directory.Exists(OriginalPathdate))
            {
                Directory.CreateDirectory(OriginalPathdate);
            }
            string wordtimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string wordfileName = docname + wordtimeStr + ".docx";
            string wordPath = Path.Combine(OriginalPathdate, wordfileName);

            string pdftimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string pdffileName = docname + pdftimeStr + ".pdf";
            string pdfPath = Path.Combine(OriginalPathdate, pdffileName);            

            WordInfo info = new WordInfo(abspath, wordPath, pdfPath);
            info.ReplaceRangs(dic);
            info.WordToPdf();
            info.Dispose();

            Dictionary<string, string> doc = new Dictionary<string, string>();
            doc.Add("WordPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + wordfileName);
            doc.Add("PDFPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + pdffileName);
            return doc;
        }

        /// <summary>
        /// 图片生成WORD、PDF文件
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> ImagesToWordPDF(string docname,string abspath, string FilePath, Dictionary<string, string> imgdic)
        {
            DateTime dt = DateTime.Now;
            if (!Directory.Exists(FilePath))
            {
                Directory.CreateDirectory(FilePath);
            }
            string OriginalPathYear = FilePath + "\\" + dt.Year;
            if (!Directory.Exists(OriginalPathYear))
            {
                Directory.CreateDirectory(OriginalPathYear);
            }
            string OriginalPathdate = OriginalPathYear + "\\" + dt.ToString("yyyyMMdd");
            if (!Directory.Exists(OriginalPathdate))
            {
                Directory.CreateDirectory(OriginalPathdate);
            }
            string wordtimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string wordfileName = docname + wordtimeStr + ".docx";
            string wordPath = Path.Combine(OriginalPathdate, wordfileName);

            string pdftimeStr = dt.ToString("yyyyMMddHHmmssffff") + new Random().Next(10000, 99999);
            string pdffileName = docname + pdftimeStr + ".pdf";
            string pdfPath = Path.Combine(OriginalPathdate, pdffileName);
            
            WordInfo info = new WordInfo(abspath, wordPath, pdfPath);
            info.AddPictures(imgdic);
            info.WordToPdf();
            info.Dispose();

            Dictionary<string, string> doc = new Dictionary<string, string>();
            doc.Add("WordPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + wordfileName);
            doc.Add("PDFPath", dt.Year + "/" + dt.ToString("yyyyMMdd") + "/" + pdffileName);
            return doc;
        }
    }
}
