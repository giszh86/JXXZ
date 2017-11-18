using ESRI.ArcGIS.Client;
using ESRI.ArcGIS.Client.Geometry;
using JXXZ.ZHCG.Front.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Techzen.ICS.PublicModel;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class RoundList : UserControl
    {

        private List<MarkerMapElement> _currentMarkerMapElementList = new List<MarkerMapElement>();
        private double _radius;
        private string _categoriesID;
        private MapElement _entity;
        private GraphicsLayer graphicsLayer;
        public RoundList()
        {
            InitializeComponent();
        }

        public RoundList(double radius, string categoriesID, MapElement entity)
        {
            InitializeComponent();

            this._radius = radius;
            this._categoriesID = categoriesID;
            this._entity = entity;

            TextBlock t = CreateHeadTextBlock("名称", new Thickness(4, 0, 0, 0));
            TextBlock t1 = CreateHeadTextBlock("类型", new Thickness(121, 0, 0, 0));

            listWindow.ELWListHeader.Children.Add(t);
            listWindow.ELWListHeader.Children.Add(t1);

            listWindow.WatermarkContent = "请输入名称";
            listWindow.ListDataTemplate = listDataTemplate;

            CreateRound(_radius, _entity);
            GetRound(_radius, _categoriesID, _entity, "");
        }

        private void CreateRound(double radius, MapElement entity)
        {
            MapPoint point = new MapPoint();
            point.X = (double)entity.X;
            point.Y = (double)entity.Y;
            double Graphic84Radius = radius / 111321; //84坐标需要

            graphicsLayer = new GraphicsLayer();
            //graphicsLayer.Graphics.Add(GpsHelper.GetEllipseGraphic84(Graphic84Radius, point));

            ContainerManager.Map.Layers.Insert(1, graphicsLayer);
        }

        private void GetRound(double radius, string categoriesID, MapElement entity, string value)
        {
            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                MapElementPaging list = args.DataResult as MapElementPaging;
                listWindow.DataSource = list.Items;
                listWindow.ItemCount = list.Total;
            };

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("MapElementCategoryIDArr", categoriesID);
            dic.Add("ReservedField1", value);
            int pageIndex = this.listWindow.PageIndex + 1;
            string url = String.Format(@"api/MapElementCoord/GetNearList?pageSize=10&currentPage={0}&x={1}&y={2}&radius={3}", pageIndex, (double)entity.X, (double)entity.Y, radius);

            dt.GetDataAsync<MapElementPaging>(url, dic);
        }

        private void GetAllRound(double radius, string categoriesID, MapElement entity, string value)
        {
            ContainerManager.ToastTip.Text = "正在加载..";
            ContainerManager.ToastTip.IsOpened = true;

            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                List<MapElement> currentList = args.DataResult as List<MapElement>;

                //   listWindow.DataSource = currentList;

                foreach (MapElement obj in currentList)
                {
                    MarkerMapElement element = new MarkerMapElement(obj.ID, obj.MapElementCategoryID, obj.ReservedField1, new Point((double)obj.X, (double)obj.Y), 0, ContainerManager.Map, LayerManager.ElementLayer);
                    element.AddToMap();
                    _currentMarkerMapElementList.Add(element);
                }

                //ContainerManager.Map.Extent = Helper.GpsHelper.MapExtent4Road(currentList);
            };

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("MapElementCategoryIDArr", categoriesID);
            string url = String.Format(@"api/MapElementCoord/GetNearList?x={0}&y={1}&radius={2}", (double)entity.X, (double)entity.Y, radius);

            dt.GetDataAsync<List<MapElement>>(url, dic);
        }

        private void listWindow_PositionAllButtonClick(object sender, EventArgs e)
        {
            GetAllRound(_radius, _categoriesID, _entity, listWindow.ELWSearcherInput.Text);
        }

        private void listWindow_ELWSearcherButtonClick(object sender, EventArgs e)
        {
            GetRound(_radius, _categoriesID, _entity, listWindow.ELWSearcherInput.Text);
        }

        private void listWindow_PagerIndexChanged(object sender, EventArgs e)
        {
            GetRound(_radius, _categoriesID, _entity, listWindow.ELWSearcherInput.Text);
        }

        private void Grid_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            Grid g = sender as Grid;
            MapElement obj = g.DataContext as MapElement;

            if (obj == null)
                return;

            if (!obj.X.HasValue && !obj.Y.HasValue)
            {
                ContainerManager.ToastTip.Text = "暂无定位数据";
                ContainerManager.ToastTip.IsOpened = true;
                return;
            }

            MarkerMapElement carMapElement = _currentMarkerMapElementList.FirstOrDefault(m => m.ID == obj.ID);
            if (carMapElement == null)
            {
                MarkerMapElement element = new MarkerMapElement(obj.ID, obj.MapElementCategoryID, obj.ReservedField1, new Point((double)obj.X, (double)obj.Y), 0, ContainerManager.Map, LayerManager.ElementLayer);
                element.AddToMap();
                element.Select();
                _currentMarkerMapElementList.Add(element);
            }
            else
            {
                carMapElement.Select();
            }

            ContainerManager.ToastTip.Text = "正在定位..";
            ContainerManager.ToastTip.IsOpened = true;
            ContainerManager.Map.PanTo(new ESRI.ArcGIS.Client.Geometry.Envelope((double)obj.X, (double)obj.Y, (double)obj.X, (double)obj.Y));
        }

        public void Close()
        {
            foreach (MarkerMapElement obj in _currentMarkerMapElementList)
            {
                obj.RemoveFromMap();
            }
            graphicsLayer.Graphics.Clear();
            ContainerManager.Map.Layers.Remove(graphicsLayer);
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

        private void UserControl_Unloaded(object sender, RoutedEventArgs e)
        {
            if (!this.Focus())
                Close();
        }
    }
}
