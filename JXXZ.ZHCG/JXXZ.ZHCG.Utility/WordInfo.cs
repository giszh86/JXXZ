using Microsoft.Office.Interop.Word;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Word = Microsoft.Office.Interop.Word;

namespace JXXZ.ZHCG.Utility
{
    public class WordInfo : IDisposable
    {
        /// <summary>
        /// Word进程
        /// </summary>
        private Word._Application wApp = null;
        /// <summary>
        /// Word文档
        /// </summary>
        private Word._Document wDoc = null;
        /// <summary>
        /// 表示缺少的 System.Object。此类不能被继承。
        /// </summary>
        private object missing = Missing.Value;
        /// <summary>
        /// Word模板路径
        /// </summary>
        private string strWordTemplatesFilePath;
        /// <summary>
        /// Word路径
        /// </summary>
        private string strWordFilePath;
        /// <summary>
        /// PDF路径
        /// </summary>
        private string strPdfFilePath;
        /// <summary>
        /// 基本信息，用于写log
        /// </summary>
        private StringBuilder strBaseInfo = new StringBuilder();
        /// <summary>
        /// 指示资源是否已经释放
        /// </summary>
        private bool dispose = false;

        /// <summary>
        /// 初始化WordInfo，添加Word文档
        /// </summary>
        public WordInfo()
        {
            this.Init();
        }
        /// <summary>
        /// 初始化WordInfo，打开Word文档
        /// </summary>
        /// <param name="WordFilePath"></param>
        public WordInfo(string WordFilePath)
        {
            this.strWordFilePath = WordFilePath;
            this.strBaseInfo.AppendLine("WordFilePath:" + WordFilePath);
            this.Init();
        }
        /// <summary>
        /// 初始化WordInfo，打开Word文档
        /// </summary>
        /// <param name="WordFilePath"></param>
        /// <param name="PdfFilePath"></param>
        public WordInfo(string WordFilePath, string PdfFilePath)
        {
            this.strWordFilePath = WordFilePath;
            this.strPdfFilePath = PdfFilePath;
            this.strBaseInfo.AppendLine("WordFilePath:" + WordFilePath);
            this.strBaseInfo.AppendLine("PdfFilePath:" + PdfFilePath);
            this.Init();
        }/// <summary>
        /// 初始化WordInfo，打开Word文档
        /// </summary>
        /// <param name="tempFile">Word 模版路径</param>
        /// <param name="saveWordFile">生成的 Word 文件路径</param>
        /// <param name="savePDFFile">生成的 PDF 文件路径</param>
        public WordInfo(string WordTemplatesFilePath, string WordFilePath, string PdfFilePath)
        {
            this.strWordTemplatesFilePath = WordTemplatesFilePath;
            this.strWordFilePath = WordFilePath;
            this.strPdfFilePath = PdfFilePath;
            this.strBaseInfo.AppendLine("WordTemplatesFilePath:" + WordTemplatesFilePath);
            this.strBaseInfo.AppendLine("WordFilePath:" + WordFilePath);
            this.strBaseInfo.AppendLine("PdfFilePath:" + PdfFilePath);
            this.Init();
        }
        /// <summary>
        /// 析构函数
        /// </summary>
        ~WordInfo()
        {
            this.Dispose(false);
        }
        /// <summary>
        /// 初始化 Common.Office.WordInfo 
        /// </summary>
        private void Init()
        {
            try
            {
                this.wApp = new Word.Application() { Visible = true };
                if (this.strWordFilePath == null)
                {
                    this.wDoc = this.wApp.Documents.Add();
                }
                else
                {
                    if (this.strWordTemplatesFilePath == null)
                    {
                        this.wDoc = this.wApp.Documents.Open(this.strWordFilePath);
                    }
                    else
                    {
                        this.wDoc = this.wApp.Documents.Add(this.strWordTemplatesFilePath, ref missing, ref missing, ref missing);
                    }
                }
                if (this.wDoc == null)
                {
                    throw new Exception("Failed to open the Word file");
                }
                wDoc.Activate();// 当前文档置前

                wDoc.SaveAs2(this.strWordFilePath, ref missing, ref missing,
                             ref missing, ref missing, ref missing, ref missing,
                             ref missing, ref missing, ref missing, ref missing,
                             ref missing, ref missing, ref missing, ref missing,
                             ref missing);
            }
            catch (Exception ex)
            {
                Log.WriteLog(null, strBaseInfo, ex);
            }
        }

        /// <summary>
        /// 替换 Word 模版中的多个变量
        /// </summary>
        /// <param name="dic"></param>
        public void ReplaceRangs(Dictionary<string, string> dic)
        {
            try
            {
                if (this.wDoc == null)
                {
                    throw new Exception("Word file does not exist");
                }
                foreach (string key in dic.Keys)
                {
                    object objReplaceKey = key;
                    object objReplaceValue = dic[key];
                    object replaceArea = Word.WdReplace.wdReplaceAll;
                    //从选择或从查找或替换操作中指定的格式删除文本和段落格式。
                    wApp.Selection.Find.ClearFormatting();
                    //运行指定的查找操作。
                    wApp.Selection.Find.Execute(ref objReplaceKey, ref missing,
                        ref missing, ref missing, ref missing, ref missing, ref missing,
                        ref missing, ref missing, ref objReplaceValue, ref replaceArea,
                        ref missing, ref missing, ref missing, ref missing);
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog(null, strBaseInfo, ex);
            }
        }

        /// <summary>
        /// 替换 Word 模版中的变量(可替换超过500个字符的变量，可设置字体样式)
        /// </summary>
        /// <param name="replaceKey">要替换的变量</param>
        /// <param name="replaceValue">替换后的值</param>
        /// <param name="fontName">字体名称(为空表示不设置字体)</param>
        public void ReplaceAdvanced(string replaceKey, string replaceValue, string fontName)
        {
            try
            {
                if (this.wDoc == null)
                {
                    throw new Exception("Word file does not exist");
                }
                this.wApp.Selection.Find.Execute();
                //如果键入或粘贴的结果替换选择，则为true。如果在选择前添加了键入或粘贴的结果，则会使选择不完整。
                this.wApp.Options.ReplaceSelection = true;
                //从选择或从查找或替换操作中指定的格式删除文本和段落格式。
                this.wApp.Selection.Find.ClearFormatting();
                this.wApp.Selection.Find.Text = replaceKey;
                this.wApp.Selection.Find.Replacement.Text = "";
                this.wApp.Selection.Find.Forward = true;
                this.wApp.Selection.Find.Wrap = Word.WdFindWrap.wdFindContinue;
                this.wApp.Selection.Find.Format = false;
                this.wApp.Selection.Find.MatchCase = false;
                this.wApp.Selection.Find.MatchWholeWord = false;
                this.wApp.Selection.Find.MatchByte = true;
                this.wApp.Selection.Find.MatchWildcards = false;
                this.wApp.Selection.Find.MatchSoundsLike = false;
                this.wApp.Selection.Find.MatchAllWordForms = false;
                //wApp.Selection.Find.Execute(ref missing, ref missing, ref missing,
                //                            ref missing, ref missing, ref missing, ref missing,
                //                            ref missing, ref missing, ref missing, ref missing,
                //                            ref missing, ref missing, ref missing, ref missing);

                //this.wApp.Selection.Find.Execute(ref object FindText = Type.Missing, ref object MatchCase = Type.Missing, ref object MatchWholeWord = Type.Missing,
                //                                 ref object MatchWildcards = Type.Missing, ref object MatchSoundsLike = Type.Missing, ref object MatchAllWordForms = Type.Missing,
                //                                 ref object Forward = Type.Missing, ref object Wrap = Type.Missing, ref object Format = Type.Missing,
                //                                 ref object ReplaceWith = Type.Missing, ref object Replace = Type.Missing, ref object MatchKashida = Type.Missing,
                //                                 ref object MatchDiacritics = Type.Missing, ref object MatchAlefHamza = Type.Missing, ref object MatchControl = Type.Missing);
                if (this.wApp.Selection.Find.Execute(replaceKey))
                {
                    this.wApp.Selection.Find.Execute();
                    //设置替换变量的字体
                    if (!string.IsNullOrWhiteSpace(fontName))
                    {
                        this.wApp.Selection.Font.Name = fontName;
                        //this.wApp.Selection.Find.Font.Name = fontName;
                    }
                    this.wApp.Selection.TypeText(string.IsNullOrWhiteSpace(replaceValue) ? "" : replaceValue);
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog(null, strBaseInfo, ex);
            }
        }
        /// <summary>
        /// 向 Word 文件中添加单张图片
        /// </summary>
        /// <param name="variableName">word 模版中的变量</param>
        /// <param name="fileFullName">图片文件的全路径名</param>
        public void AddPicture(string variableName, string fileFullName)
        {
            //object replaceAll = Word.WdReplace.wdReplaceAll;
            wApp.Options.ReplaceSelection = true;
            wApp.Selection.Find.Forward = true;
            wApp.Selection.Find.Wrap = Word.WdFindWrap.wdFindContinue;
            wApp.Selection.Find.Format = false;
            wApp.Selection.Find.MatchCase = false;
            wApp.Selection.Find.MatchWholeWord = false;
            wApp.Selection.Find.MatchByte = true;
            wApp.Selection.Find.MatchWildcards = false;
            wApp.Selection.Find.MatchSoundsLike = false;
            wApp.Selection.Find.MatchAllWordForms = false;
            wApp.Selection.Find.ClearFormatting();
            wApp.Selection.Find.Text = variableName;
            wApp.Selection.Find.Replacement.Text = "";
            wApp.Selection.Find.Execute(ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing);

            wApp.Selection.InlineShapes.AddPicture(fileFullName,
                 ref missing, ref missing, ref missing);
        }
        /// <summary>
        /// 向 Word 文件中添加单张图片
        /// </summary>
        /// <param name="variableName">word 模版中的变量</param>
        /// <param name="fileFullName">图片文件的全路径名</param>
        /// <param name="width">图片宽度</param>
        /// <param name="height">图片高度</param>
        public void AddPicture(string variableName, string fileFullName, int width, int height)
        {
            //object replaceAll = Word.WdReplace.wdReplaceAll;
            wApp.Options.ReplaceSelection = true;
            wApp.Selection.Find.Forward = true;
            wApp.Selection.Find.Wrap = Word.WdFindWrap.wdFindContinue;
            wApp.Selection.Find.Format = false;
            wApp.Selection.Find.MatchCase = false;
            wApp.Selection.Find.MatchWholeWord = false;
            wApp.Selection.Find.MatchByte = true;
            wApp.Selection.Find.MatchWildcards = false;
            wApp.Selection.Find.MatchSoundsLike = false;
            wApp.Selection.Find.MatchAllWordForms = false;
            wApp.Selection.Find.ClearFormatting();
            wApp.Selection.Find.Text = variableName;
            wApp.Selection.Find.Replacement.Text = "";

            wApp.Selection.Find.Execute(ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing);
            Word.InlineShape rang = wApp.Selection.InlineShapes.AddPicture(fileFullName,
                 ref missing, ref missing, ref missing);
            rang.Width = width;
            rang.Height = height;
            rang.Reset();
        }
        /// <summary>
        /// 向 Word 文件中添加多张图片
        /// </summary>
        /// <param name="dic">图片变量和图片路径对应列表</param>
        public void AddPictures(Dictionary<string, string> dic)
        {
            foreach (string key in dic.Keys)
            {
                this.AddPicture(key, dic[key], 450, 450);
            }
        }

        /// <summary>
        /// 向 Word 文件中添加多张图片
        /// </summary>
        /// <param name="dic">图片变量和图片路径对应列表</param>
        public void AddPictures(List<Dictionary<string, string>> list)
        {
            for (int i = 0; i < list.Count; i++)
            {
                Dictionary<string, string> dic = new Dictionary<string, string>();
                dic = list[i];
                List<string> strList = new List<string>();
                string variableName = string.Empty;
                foreach (string key in dic.Keys)
                {
                    variableName = key;
                    strList.Add(dic[key]);
                }
                this.AddPictures(variableName, strList, 450, 450);
            }

        }

        /// <summary>
        /// 向 Word 文件中添加单张图片
        /// </summary>
        /// <param name="variableName">word 模版中的变量</param>
        /// <param name="fileFullName">图片文件的全路径名</param>
        /// <param name="width">图片宽度</param>
        /// <param name="height">图片高度</param>
        public void AddPictures(string variableName, List<string> fileFullNames, int width, int height)
        {
            //object replaceAll = Word.WdReplace.wdReplaceAll;
            wApp.Options.ReplaceSelection = true;
            wApp.Selection.Find.Forward = true;
            wApp.Selection.Find.Wrap = Word.WdFindWrap.wdFindContinue;
            wApp.Selection.Find.Format = false;
            wApp.Selection.Find.MatchCase = false;
            wApp.Selection.Find.MatchWholeWord = false;
            wApp.Selection.Find.MatchByte = true;
            wApp.Selection.Find.MatchWildcards = false;
            wApp.Selection.Find.MatchSoundsLike = false;
            wApp.Selection.Find.MatchAllWordForms = false;
            wApp.Selection.Find.ClearFormatting();
            wApp.Selection.Find.Text = variableName;
            wApp.Selection.Find.Replacement.Text = "";

            wApp.Selection.Find.Execute(ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing);


            foreach (var fileFullName in fileFullNames)
            {
                Word.InlineShape rang = wApp.Selection.InlineShapes.AddPicture(fileFullName,
               ref missing, ref missing, ref missing);
                rang.Width = width;
                rang.Height = height;
                rang.Reset();
            }


        }



        /// <summary>
        /// 换行
        /// </summary>
        public void NewLine()
        {
            wApp.Selection.Font.Underline = Microsoft.Office.Interop.Word.WdUnderline.wdUnderlineSingle;
            // 换行 
            wApp.Selection.TypeParagraph();
        }

        /// <summary>
        /// 往 Word 文件中的 Table 插入数据
        /// </summary>
        /// <param name="tableIndex">Word 文档中 Table 的下标（从 1 开始）</param>
        /// <param name="dtSouce">要插入的数据源（DataTable 类型）</param>
        public void InsertTable(int tableIndex, System.Data.DataTable dtSouce)
        {
            object autoFitBehavior = Word.WdAutoFitBehavior.wdAutoFitWindow;
            Word.Table table = wDoc.Tables[tableIndex];
            object miss = System.Reflection.Missing.Value;

            for (int i = 1; i <= dtSouce.Rows.Count; i++)
            {
                table.Rows.Add(ref miss);
                for (int j = 1; j <= dtSouce.Columns.Count; j++)
                {
                    wDoc.Content.Tables[tableIndex].Cell(i + 1, j).Range.Text = dtSouce.Rows[i - 1][j - 1].ToString();
                }
            }
        }

        /// <summary>
        /// 往 Word 文件中的 Table 插入数据
        /// </summary>
        /// <param name="tableIndex">Word 文档中 Table 的下标（从 1 开始）</param>
        /// <param name="objectList">要插入的数据源（List 集合类型）</param>
        public void InsertTable(int tableIndex, IList objectList)
        {
            System.Data.DataTable dtSouce = ToDataTable(objectList);
            object autoFitBehavior = Word.WdAutoFitBehavior.wdAutoFitWindow;
            Word.Table table = wDoc.Tables[tableIndex];
            object miss = System.Reflection.Missing.Value;

            for (int i = 1; i <= dtSouce.Rows.Count; i++)
            {
                table.Rows.Add(ref miss);
                for (int j = 1; j <= dtSouce.Columns.Count; j++)
                {
                    wDoc.Content.Tables[tableIndex].Cell(i + 1, j).Range.Text = dtSouce.Rows[i - 1][j - 1].ToString();
                }
            }
        }

        /// <summary>
        /// 把 List 集合转化为 DataTable 对象
        /// </summary>
        /// <param name="objectList"></param>
        /// <returns></returns>
        private static System.Data.DataTable ToDataTable(IList objectList)
        {
            System.Data.DataTable result = new System.Data.DataTable();

            if (objectList.Count <= 0)
            {
                return result;
            }

            PropertyInfo[] propertys = objectList[0].GetType().GetProperties();
            foreach (PropertyInfo pi in propertys)
            {
                result.Columns.Add(pi.Name, pi.PropertyType);
            }

            for (int i = 0; i < objectList.Count; i++)
            {
                ArrayList tempList = new ArrayList();
                foreach (PropertyInfo pi in propertys)
                {
                    object obj = pi.GetValue(objectList[i], null);
                    tempList.Add(obj);
                }
                object[] array = tempList.ToArray();
                result.LoadDataRow(array, true);
            }
            return result;
        }

        /// <summary>
        /// Word转PDF
        /// </summary>
        /// <param name="WordFilePath">Word文件路径</param>
        /// <param name="PdfFilePath">PDF文件路径</param>
        public void WordToPdf()
        {
            try
            {
                this.wDoc.ExportAsFixedFormat(this.strPdfFilePath, Word.WdExportFormat.wdExportFormatPDF);
            }
            catch (Exception ex)
            {
                Log.WriteLog(null, strBaseInfo, ex);
            }
        }
        /// <summary>
        /// 释放由 Common.Office.WordInfo 使用的所有资源
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// 释放由 Common.Office.WordInfo 占用的非托管资源，还可以另外再释放托管资源。
        /// </summary>
        /// <param name="disposing">true 表示释放托管资源和非托管资源；false 表示仅释放非托管资源。</param>
        protected virtual void Dispose(bool disposing)
        {
            if (this.dispose)
            {
                return;
            }
            if (disposing)
            {

            }
            try
            {
                if (this.wDoc != null)
                {
                    this.wDoc.Close();
                    this.wDoc = null;
                }
                if (this.wApp != null)
                {
                    this.wApp.Quit();
                    this.wApp = null;
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog(null, strBaseInfo, ex);
            }
            this.dispose = true;
        }

        public Dictionary<string, string> ReplaceString(string origialString, string destinationString, Dictionary<string, string> dic)
        {
            destinationString = destinationString.Replace("<br>", "^p");
            destinationString = destinationString.Replace("&nbsp;", " ");
            if (destinationString.Length > 255)
            {
                int count = destinationString.Length / 255 + ((destinationString.Length % 255) == 0 ? 0 : 1);
                List<string> origianlStringList = new List<string>();
                List<string> destinationStringList = new List<string>();
                for (int i = 0; i < count; i++)
                {
                    origianlStringList.Add("$$$" + origialString + i.ToString() + "$");

                    int length; //每小段的长度  
                    if (i != count - 1)
                    {
                        length = 255;
                    }
                    else
                    {
                        length = destinationString.Length % 255;
                    }
                    destinationStringList.Add(destinationString.Substring(i * 255, length));
                }
                for (int i = 0; i < origianlStringList.Count(); i++)
                {
                    dic.Add(origianlStringList[i],destinationStringList[i]);
                }

                string origianlStringListTotalString = string.Empty;
                for (int i = 0; i < count; i++)
                {
                    origianlStringListTotalString += origianlStringList[i];
                }
                this.ReplaceString(origialString, origianlStringListTotalString,dic);
                dic.Remove(origialString);

                object objReplaceKey = origialString;
                object objReplaceValue = origianlStringListTotalString;
                object replaceArea = Word.WdReplace.wdReplaceAll;
                //从选择或从查找或替换操作中指定的格式删除文本和段落格式。
                wApp.Selection.Find.ClearFormatting();
                //运行指定的查找操作。
                wApp.Selection.Find.Execute(ref objReplaceKey, ref missing,
                    ref missing, ref missing, ref missing, ref missing, ref missing,
                    ref missing, ref missing, ref objReplaceValue, ref replaceArea,
                    ref missing, ref missing, ref missing, ref missing);
            }
            else
            {
                dic[origialString] = destinationString;
            }
            return dic;
        }  
    }
}
