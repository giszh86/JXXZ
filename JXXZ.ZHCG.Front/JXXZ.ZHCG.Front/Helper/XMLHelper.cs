using System.Collections.Generic;
using System.IO;
using System.Xml.Linq;

namespace JXXZ.ZHCG.Front.Helper
{
    public class XMLHelper
    {
        /// <summary>
        /// 将XML数据转换为Dictionary
        /// </summary>
        /// <param name="strXml">XML字符串</param>
        /// <returns>Dictionary</returns>
        public static Dictionary<string,string> ConvertXMLToDictionary(string strXml)
        {
            Dictionary<string, string> items = new Dictionary<string, string>();

            if (string.IsNullOrEmpty(strXml))
            {
                return items;
            }

            using (TextReader txtReader = new StringReader(strXml))
            {
                XDocument xDoc = XDocument.Load(txtReader);
                
                foreach (XElement item in xDoc.Elements().Elements())
                {
                    string key = item.Name.ToString();
                    string value = item.Value.ToString();
                    items.Add(key, value);
                }

                return items;
            }
        }

        /// <summary>
        /// 根据XML数据获得XElement列表
        /// </summary>
        /// <param name="strXml">XML字符串</param>
        /// <returns>XElement列表</returns>
        public static IEnumerable<XElement> GetXElements(string strXml)
        {
            IEnumerable<XElement> items = new List<XElement>();

            if (string.IsNullOrEmpty(strXml))
            {
                return items;
            }

            using (TextReader txtReader = new StringReader(strXml))
            {
                XDocument xDoc = XDocument.Load(txtReader);
                items = xDoc.Elements().Elements();
                return items;
            }
        }
    }
}
