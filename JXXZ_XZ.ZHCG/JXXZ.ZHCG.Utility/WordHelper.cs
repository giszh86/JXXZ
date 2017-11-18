using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Word = Microsoft.Office.Interop.Word;

namespace JXXZ.ZHCG.Utility
{
    /// <summary>
    /// Word帮助类
    /// </summary>
    public static class WordHelper
    {
        /// <summary>
        /// Word转PDF
        /// </summary>
        /// <param name="WordFilePath">Word文件路径</param>
        /// <param name="PdfFilePath">PDF文件路径</param>
        public static void WordToPdf(string WordFilePath, string PdfFilePath)
        {
            Word._Application wordApp = null;
            Word._Document wordDoc = null;
            try
            {
                wordApp = new Word.Application() { Visible = false };
                wordDoc = wordApp.Documents.Open(WordFilePath);
                if (wordDoc == null)
                {
                    throw new Exception("Failed to open the Word file");
                }
                wordDoc.ExportAsFixedFormat(PdfFilePath, Word.WdExportFormat.wdExportFormatPDF);
            }
            catch (Exception ex)
            {
                Log.WriteLog("", "", ex);
            }
            finally
            {
                if (wordDoc != null)
                {
                    wordDoc.Close();
                }
                if (wordApp != null)
                {
                    wordApp.Quit();
                }
            }
        }
    }
}
