using ESRI.ArcGIS.Client;
using JXXZ.ZHCG.Front.Window;
using System;
using System.Collections.Generic;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Windows.Threading;
using Techzen.ICS.CS.Controls;
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;

namespace JXXZ.ZHCG.Front.Helper
{
    public class ContainerManager
    {
        public static UserControl BodyContainer; //正常主体

        public static UserControl PlayBackBodyContainer; //轨迹回放主体

        public static Map Map;

        public static TZToastTip ToastTip;

        /// <summary>
        /// 系统配置
        /// </summary>
        public static List<SystemConfig> SystemConfigs;

        public static List<MapElementCategorie> MapElementCategorys;

        public static ListWindow ListWindows;
    }
}
