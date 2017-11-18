using JXXZ.ZHCG.Front.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Techzen.ICS.CS.Controls;
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class TZMonitorListWindow : UserControl
    {

        TZElementListWindow _listWindow = new TZElementListWindow();

        Dictionary<string, object> _results = new Dictionary<string, object>();
        MapElementPaging list;

        public TZMonitorListWindow()
        {
            InitializeComponent();
            CreateMonitorListWindow();



        }

        public void CreateMonitorListWindow(int typeID, Dictionary<string, string> filter)
        {





        }

        public void CreateMonitorListWindow()
        {
            TZMonitor.Width = 230;
            TZMonitor.Height = 450;

            TextBlock t = CreateHeadTextBlock("名称", new Thickness(4, 0, 0, 0));
            TextBlock t1 = CreateHeadTextBlock("类型", new Thickness(121, 0, 0, 0));

            listWindow.ELWListHeader.Children.Add(t);
            listWindow.ELWListHeader.Children.Add(t1);

            listWindow.WatermarkContent = "请输入名称";
            listWindow.ListDataTemplate = listDataTemplate;

            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                list = args.DataResult as MapElementPaging;
                listWindow.DataSource = list.Items;
                listWindow.ItemCount = list.Total;

            };

            Dictionary<string, object> dic = new Dictionary<string, object>();
            //dic.Add("MapElementCategoryIDArr", 1);
            // dic.Add("ReservedField1", "");
            int pageIndex = listWindow.PageIndex + 1;
            string url = String.Format(@"api/MapElement/Query?pageSize=10&currentPage={0}", pageIndex);

            dt.GetDataAsync<MapElementPaging>(url);



            listWindow.PositionAllButtonClick += listWindow_PositionAllButtonClick;
            listWindow.ELWSearcherButtonClick += listWindow_ELWSearcherButtonClick;
            listWindow.PagerIndexChanged += listWindow_PagerIndexChanged;

        }



        private void listWindow_PagerIndexChanged(object sender, EventArgs e)
        {
            GetMonitors(this.listWindow.ELWSearcherInput.Text);
        }

        private void listWindow_ELWSearcherButtonClick(object sender, EventArgs e)
        {
            GetMonitors(this.listWindow.ELWSearcherInput.Text);
        }

        private void listWindow_PositionAllButtonClick(object sender, EventArgs e)
        {
            GetAllMonitors(this.listWindow.ELWSearcherInput.Text);
        }

        private void GetMonitors(string value)
        {
            MessageBox.Show("GetMonitors"+ this.listWindow.PageIndex);

            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                list = args.DataResult as MapElementPaging;
                listWindow.DataSource = list.Items;
                listWindow.ItemCount = list.Total;

            };
            _results["ReservedField1"] = value;
            int pageIndex = this.listWindow.PageIndex + 1;
            string url = "api/MapElement/Query?pageSize=10&currentPage=" + pageIndex;

            dt.GetDataAsync<MapElementPaging>(url, _results);
        }

        private void GetAllMonitors(string value)
        {

            MessageBox.Show("GetAllMonitors"+ this.listWindow.PageIndex);

            //WebAPIHelper dt = new WebAPIHelper();

            //dt.GetDataCompleted += (s, args) =>
            //{
            //    List<MapElement> _currentList = args.DataResult as List<MapElement>;
            //    List<MapElement> _positionList = _currentList.Where(m => m.X != null).ToList();
            //    Dictionary<int, Image> imglist = GetIconUrl(_mapElementCategoryID);
            //    foreach (MapElement obj in _positionList)
            //    {
            //        if (obj.X == null)
            //            continue;
            //        MarkerMapElement element = new MarkerMapElement(obj, 0, ContainerManager.Map, LayerManager.ElementLayer, imglist);
            //        element.AddToMap();
            //        _currentMapElementList.Add(element);
            //    }

            //    ContainerManager.Map.Extent = GpsHelper.MapExtent4Road(_currentList);
            //};

            //_results["ReservedField1"] = value;
            //string url = "api/MapElement/Query";

            //dt.GetDataAsync<List<MapElement>>(url, _results);
        }


        public TextBlock CreateHeadTextBlock(string text, Thickness margin)
        {
            TextBlock textBlock = new TextBlock()
            {
                VerticalAlignment = VerticalAlignment.Center,
                HorizontalAlignment = HorizontalAlignment.Left,
                FontWeight = FontWeights.Bold,
                Margin = margin,
                Text = text,
                Style = Application.Current.Resources["DefaultTextBlockStyle"] as Style
            };

            return textBlock;
        }
    }
}
