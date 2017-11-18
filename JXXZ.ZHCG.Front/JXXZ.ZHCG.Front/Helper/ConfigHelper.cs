using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Techzen.ICS.PublicModel;

namespace JXXZ.ZHCG.Front.Helper
{
    public static class ConfigHelper
    {
        /// <summary>
        /// 处理图片URL 判断图片是否以http://开头，否则添加项目http地址
        /// </summary>
        /// <param name="imageUrl">图片URL</param>
        public static void ProcessImageUrl(ref string imageUrl)
        {
            if (!string.IsNullOrEmpty(imageUrl) && imageUrl.ToLower().IndexOf("http://") == -1)
            {
                //imageUrl = HttpHelper.GetVirtualPath() + imageUrl;
            }
        }

        /// <summary>
        /// 根据统计类型标识获取统计类型名称
        /// </summary>
        /// <param name="statisticTypeID">统计类型标识</param>
        /// <returns></returns>
        public static string GetStatTypeName(int statisticTypeID)
        {
            return statisticTypeID == 1 ? "Unit" : "Region";
        }

        /// <summary>
        /// 获得MapElement类的XML字段值
        /// </summary>
        /// <param name="bindField">绑定字段 格式: 字段名.节点名</param>
        /// <returns>值</returns>
        public static string GetXMLFieldValue(MapElement mapElement, string bindField)
        {
            string value = "";

            string[] strs = bindField.Split('.');
            string fieldName = strs[0];
            string xmlNodeName = strs[1];

            string xmlStr = GetFieldValue(mapElement, fieldName);

            Dictionary<string, string> xmlDic = XMLHelper.ConvertXMLToDictionary(xmlStr);

            if (xmlDic.Keys.Contains(xmlNodeName))
                value = xmlDic[xmlNodeName];

            return value;
        }


        /// <summary>
        /// 获得MapElement类的字段值
        /// </summary>
        /// <param name="bindField">绑定字段 格式: 字段名.节点名</param>
        /// <returns>值</returns>
        public static string GetFieldValue(object mapElement, string bindField)
        {
            try
            {
                string value = "";
                Type t = mapElement.GetType();
                PropertyInfo pi = t.GetProperty(bindField);
                object obj = pi.GetValue(mapElement, null);

                if (obj != null)
                    value = obj.ToString();

                return value;
            }
            catch (Exception)
            {

                return "";
            }
            
        }

        public static void GetSystemConfigColumn(string code, int mapElementCategoryID, string windowName, ref List<SystemConfig> configList, ref List<SystemConfig> columnConfig)
        {
            configList = ContainerManager.SystemConfigs.Where(t => t.Code.StartsWith(code)).ToList();

            //找到对应的地图元素种类筛选配置
            List<SystemConfig> mecIDList = configList.Where(t => t.Name == "MapElementCategoryID").ToList();

            foreach (var mecIDConfig in mecIDList)
            {
                if (mecIDConfig == null || string.IsNullOrEmpty(mecIDConfig.Value))
                    continue;

                int mcID = Convert.ToInt32(mecIDConfig.Value);

                if (mapElementCategoryID == mcID)
                {
                    //获得列表列配置
                    SystemConfig tempConfig = configList.Where(t => t.ParentCode == mecIDConfig.ParentCode && t.Name == windowName).FirstOrDefault();
                    columnConfig = configList.Where(t => t.ParentCode == tempConfig.Code).ToList();
                    break;
                }
            }

        }

        /// <summary>
        /// 根据Name获取 根节点 下的节点集合
        /// </summary>
        /// <param name="configList"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        public static List<SystemConfig> GetSystemConfigs(this List<SystemConfig> configList,string Name)
        {
            SystemConfig configItem = ContainerManager.SystemConfigs.Where(t => t.Name== Name).FirstOrDefault();
            return configList.Where(t => t.ParentCode == configItem.Code).ToList();
        }

        /// <summary>
        /// / 根据SystemConfig的Code获取 根节点 下的节点集合
        /// </summary>
        /// <param name="configList"></param>
        /// <param name="systemconfig"></param>
        /// <returns></returns>
        public static List<SystemConfig> GetSystemConfigs(this List<SystemConfig> configList, SystemConfig systemconfig)
        {
            return ContainerManager.SystemConfigs.Where(t => t.ParentCode == systemconfig.Code).ToList();
        }

        /// <summary>
        /// 根据name获取根节点下是mapElementCategoryID类型的name1下的节点集合
        /// </summary>
        /// <param name="configList"></param>
        /// <param name="name"></param>
        /// <param name="mapElementCategoryID"></param>
        /// <param name="name1"></param>
        /// <returns></returns>
        public static List<SystemConfig> GetSystemConfigs(this List<SystemConfig> configList, string name, int mapElementCategoryID, string name1)
        {
            List<SystemConfig> list1 = ContainerManager.SystemConfigs.GetSystemConfigs(name);
            List<SystemConfig> list3 = new List<SystemConfig>();
            foreach (SystemConfig item in list1)
            {
                List<SystemConfig> list2 = ContainerManager.SystemConfigs.GetSystemConfigs(item);
                if (int.Parse(list2.Where(t => t.Name == "MapElementCategoryID").FirstOrDefault().Value) == mapElementCategoryID)
                {
                    SystemConfig item1 = list2.Where(t => t.Name == name1).FirstOrDefault();
                    list3 = ContainerManager.SystemConfigs.GetSystemConfigs(item1);
                    break;
                }
            }
            return list3;
        }

        /// <summary>
        /// 根据地图元素名称和地图元素种类标识找到地图元素配置信息
        /// </summary>
        /// <param name="configList">配置列表</param>
        /// <param name="mapElementCategoryID">地图元素种类标识</param>
        /// <param name="nodeName">地图元素名称 MapIcons、FilterWindow、ListWindow、MapInfoPanel、DetailsWindow</param>
        /// <returns></returns>
        public static List<SystemConfig> GetMapElementConfigs(this List<SystemConfig> configList, int mapElementCategoryID, string nodeName)
        {
            List<SystemConfig> mapElementList = ContainerManager.SystemConfigs.GetSystemConfigs("MapElement");
            List<SystemConfig> retrunConfigs = new List<SystemConfig>();

            foreach (SystemConfig mapElement in mapElementList)
            {
                List<SystemConfig> mapElementConfigs = ContainerManager.SystemConfigs.GetSystemConfigs(mapElement);
                
                string strMecID = mapElementConfigs.Where(t => t.Name == "MapElementCategoryID").FirstOrDefault().Value;

                if (string.IsNullOrEmpty(strMecID))
                    continue;

                if (int.Parse(strMecID) == mapElementCategoryID)
                {
                    SystemConfig returnConfig = mapElementConfigs.Where(t => t.Name == nodeName).FirstOrDefault();
                    retrunConfigs = ContainerManager.SystemConfigs.GetSystemConfigs(returnConfig);
                    break;
                }
            }

            return retrunConfigs;
        }

    }
}
