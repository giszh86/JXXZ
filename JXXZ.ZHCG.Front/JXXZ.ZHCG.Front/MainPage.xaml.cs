using ESRI.ArcGIS.Client;
using JXXZ.ZHCG.Front.Helper;
using JXXZ.ZHCG.Front.Window;
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
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;
using Newtonsoft.Json;
using ESRI.ArcGIS.Client.Geometry;
using System.Windows.Media.Imaging;
using ESRI.ArcGIS.Client.FeatureService.Symbols;
using System.Windows.Browser;
using Techzen.ArcGIS.TiledMapServiceLayers;

namespace JXXZ.ZHCG.Front
{
    public partial class MainPage : UserControl
    {
        List<MarkerMapPoint> _currentMapElementList = new List<MarkerMapPoint>();
        public MainPage()
        {
            InitializeComponent();
            HtmlPage.RegisterScriptableObject("MapInfo", this);
            string MapLayerType = Application.Current.Resources["mapType"] as string;
            switch (MapLayerType)
            {
                case "ArcGISTiledMap":
                    ArcGISTiledMapServiceLayer layer = new ArcGISTiledMapServiceLayer();
                    layer.ID = "ArcGISTiledMap";
                    layer.Url = Application.Current.Resources["mapUrl"] as string;
                    layer.Visible = true;
                    this.map.Layers.Insert(0, layer);
                    break;
                case "ArcGISDynamicMap":
                    ArcGISDynamicMapServiceLayer arcGISDynamicMap = new ArcGISDynamicMapServiceLayer();
                    arcGISDynamicMap.ID = "ArcGISDynamicMap";
                    arcGISDynamicMap.Url = Application.Current.Resources["mapUrl"] as string;
                    arcGISDynamicMap.Visible = true;
                    this.map.Layers.Insert(0, arcGISDynamicMap);
                    break;
                case "GoogleMap":
                    GoogleMapLayer googleMapLayer = new GoogleMapLayer();
                    googleMapLayer.Visible = true;
                    this.map.Layers.Insert(0, googleMapLayer);
                    break;
                case "GoogleSatelliteMap":
                    GoogleMapSatelliteLayer googleMapSatelliteLayer = new GoogleMapSatelliteLayer();
                    googleMapSatelliteLayer.Visible = true;
                    this.map.Layers.Insert(0, googleMapSatelliteLayer);
                    break;
                case "GoogleTerrainMap":
                    GoogleMapTerrainLayer googleMapTerrainLayer = new GoogleMapTerrainLayer();
                    googleMapTerrainLayer.Visible = true;
                    this.map.Layers.Insert(0, googleMapTerrainLayer);
                    break;
                case "TianDiTuMap":
                    TianDiTuLayer tianDiTuLayer = new TianDiTuLayer();
                    tianDiTuLayer.Visible = true;
                    this.map.Layers.Insert(0, tianDiTuLayer);
                    break;
                case "TianDiTuSatelliteMap":
                    TianDiTuSatelliteLayer tianDiTuSatelliteLayer = new TianDiTuSatelliteLayer();
                    tianDiTuSatelliteLayer.Visible = true;
                    this.map.Layers.Insert(0, tianDiTuSatelliteLayer);
                    break;
                default:
                    break;
            }

            PlayBackBodyContainer playBackBodyContainer = new PlayBackBodyContainer()
            {
                HorizontalAlignment = HorizontalAlignment.Stretch,
                VerticalAlignment = VerticalAlignment.Stretch,
                Visibility = Visibility.Collapsed
            };
            body.Children.Add(playBackBodyContainer);
            ContainerManager.PlayBackBodyContainer = playBackBodyContainer;

            //ContainerManager.ToastTip = this.toastTip;
            ContainerManager.BodyContainer = this;
            ContainerManager.Map = map;
            LayerManager.ElementLayer = this.map.Layers["ElementLayer"] as ElementLayer;


            string mapExtent = Application.Current.Resources["mapExtent"] as string;

            double x1 = Convert.ToDouble(mapExtent.Split('|')[0]);
            double y1 = Convert.ToDouble(mapExtent.Split('|')[1]);
            double x2 = Convert.ToDouble(mapExtent.Split('|')[2]);
            double y2 = Convert.ToDouble(mapExtent.Split('|')[3]);





            // this.map.Extent= new Envelope((double)x1, (double)y1, (double)x2, (double)y2);
            ContainerManager.Map.Extent = new Envelope((double)x1, (double)y1, (double)x2, (double)y2);
            //Location("");
            //Round(369839.4480747870000000, 3308466.1026192900000000, 15, "");


            #region 控件版
            //ContainerManager.BodyContainer = this;
            //ContainerManager.Map = map;
            //LayerManager.ElementLayer = this.map.Layers["ElementLayer"] as ElementLayer;
            //WebAPIHelper dt = new WebAPIHelper();

            //dt.GetDataCompleted += (s, args) =>
            //{
            //    List<SystemConfig> list = args.DataResult as List<SystemConfig>;
            //    ContainerManager.SystemConfigs = list;


            //    WebAPIHelper mecDt = new WebAPIHelper();
            //    mecDt.GetDataCompleted += (a, b) =>
            //    {
            //        List<MapElementCategorie> mecList = b.DataResult as List<MapElementCategorie>;
            //        ContainerManager.MapElementCategorys = mecList;

            //        ShowMyWindow(1);





            //    };

            //    mecDt.GetDataAsync<List<MapElementCategorie>>("api/MapElementCategorie/Query");
            //};
            //string url = "api/SystemConfig/Query";

            //dt.GetDataAsync<List<SystemConfig>>(url);

            #endregion
        }
        /// <summary>
        /// 定位
        /// </summary>
        [ScriptableMember]
        public void Location(string Jsondata)
        {

            //string str= @"[{/""MapPointList/"":[{/""X/"":120.199997984195,/""Y/"":33.2838481078603},{/""X/"":120.20085629108,/""Y/"":33.2838481078603},{/""X/"":120.201714597965,/""Y/"":33.2831305928853},{/""X/"":120.201371275211,/""Y/"":33.2823413195999},{/""X/"":120.199997984195,/""Y/"":33.2823413195999},{/""X/"":120.199997984195,/""Y/"":33.2838481078603}],/""colour/"":/""248,10,97/"",/""name/"":/""住宅用户/""}]";

            //List<MapPoint> points = JsonConvert.DeserializeObject<List<MapPoint>>(str);
            // MessageBox.Show("123");
            //ContainerManager.ToastTip.Text = "正在加载..";
            //ContainerManager.ToastTip.IsOpened = true;
            List<MapElementPoint> objList = JsonConvert.DeserializeObject<List<MapElementPoint>>(Jsondata);// new List<MapElementPoint>();//new List<MapElementPoint>();//= 
                                                                                                           //MapElementPoint p = new MapElementPoint()
                                                                                                           //{
                                                                                                           //    ID = 2,
                                                                                                           //    Type = 1,
                                                                                                           //    X = 119.905900224839,
                                                                                                           //    Y = 33.4571349076769,
                                                                                                           //    Icon = "/JXXZ.ZHCG.Front;component/Images/leftImg_14.png"
                                                                                                           //};
                                                                                                           //MapElementPoint p1 = new MapElementPoint()
                                                                                                           //{
                                                                                                           //    ID = 1,
                                                                                                           //    Type = 1,
                                                                                                           //    X = 369739.4480747870000000,
                                                                                                           //    Y = 3307466.1026192900000000,
                                                                                                           //    Icon = "/JXXZ.ZHCG.Front;component/Images/leftImg_14.png"
                                                                                                           //};
                                                                                                           // objList.Add(p);
                                                                                                           // objList.Add(p1);




            ElementLayer ElementLayer1 = map.Layers["ElementLayer"] as ElementLayer;
           // ElementLayer1.Children.Clear();
            foreach (MapElementPoint obj in objList)
            {
                //MarkerMapPoint element = new MarkerMapPoint(obj, 0, ContainerManager.Map, LayerManager.ElementLayer);
                //element.AddToMap();
                //_currentMapElementList.Add(element);

                Image img = new Image()
                {
                    Width = 32,
                    Height = 37,
                    Margin = new Thickness(0, 0, 0, 37),
                    Source = new BitmapImage(new Uri(obj.Icon, UriKind.RelativeOrAbsolute)),
                    Cursor = Cursors.Hand,
                    DataContext = obj
                };
                img.MouseLeftButtonUp += Img_MouseLeftButtonUp;
                MapPoint c = new MapPoint
                {
                    X = obj.X,
                    Y = obj.Y
                };
                ElementLayer.SetEnvelope(img, new Envelope(c, c));
                ElementLayer1.Children.Add(img);
            }
            // ContainerManager.Map.PanTo(new ESRI.ArcGIS.Client.Geometry.Geometry(objList[0].X, objList[0].Y));
            ContainerManager.Map.PanTo(new ESRI.ArcGIS.Client.Geometry.Envelope((double)objList[0].X, (double)objList[0].Y, (double)objList[0].X, (double)objList[0].Y));
        }

        private void Img_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            Image img = sender as Image;
            MapElementPoint obj = img.DataContext as MapElementPoint;
            // TrackPlayback("", "");//MessageBox.Show(obj.ID.ToString());
            //弹出概要面板
            HtmlPage.Window.Invoke("clickPonitsShow2DPanel", obj.ID, obj.Type);
        }


        /// <summary>
        /// 周边
        /// </summary>
        [ScriptableMember]
        public void Round(double centerX, double centerY, double radius, string jsondata)
        {
            //定位点
            Location(jsondata);
            //画圆
            GraphicsLayer Cityrode = map.Layers["GraphicsLayer"] as GraphicsLayer;
            Cityrode.Graphics.Clear();
            Graphic result = new Graphic();
            //radius = radius / 111321;
            List<MapPoint> points = new List<MapPoint>();
            for (double i = 0; i <= 360; i++)
            {
                points.Add(new MapPoint((centerX - Math.Cos(Math.PI * i / 180.0) * radius), (centerY - Math.Sin(Math.PI * i / 180.0) * radius)));
            }
            //ESRI.ArcGIS.Client.Geometry.
            ESRI.ArcGIS.Client.Geometry.PointCollection pCollection = new ESRI.ArcGIS.Client.Geometry.PointCollection(points);
            ESRI.ArcGIS.Client.Geometry.Polygon g = new ESRI.ArcGIS.Client.Geometry.Polygon();
            g.Rings.Add(pCollection);
            result.Geometry = g;
            SimpleFillSymbol sfs = new SimpleFillSymbol();
            sfs.BorderBrush = new SolidColorBrush(Colors.Transparent);
            sfs.BorderThickness = 2;
            sfs.Fill = new SolidColorBrush(Colors.Red);
            result.Symbol = sfs;
            Cityrode.Graphics.Add(result);
            ContainerManager.Map.PanTo(new ESRI.ArcGIS.Client.Geometry.Envelope((double)centerX, (double)centerY, (double)centerX, (double)centerY));
        }


        /// <summary>
        /// 热力图
        /// </summary>
        [ScriptableMember]
        public void Thermodynamic(double centerX, double centerY, double radius, string colour, int id, int typeid)
        {
            //画圆
            GraphicsLayer Cityrode = map.Layers["GraphicsLayerRL"] as GraphicsLayer;
            //Cityrode.Graphics.Clear();
            Graphic result = new Graphic();
            radius = radius / 111321;
            List<MapPoint> points = new List<MapPoint>();
            for (double i = 0; i <= 360; i++)
            {
                points.Add(new MapPoint((centerX - Math.Cos(Math.PI * i / 180.0) * radius), (centerY - Math.Sin(Math.PI * i / 180.0) * radius)));
            }
            //ESRI.ArcGIS.Client.Geometry.
            ESRI.ArcGIS.Client.Geometry.PointCollection pCollection = new ESRI.ArcGIS.Client.Geometry.PointCollection(points);
            ESRI.ArcGIS.Client.Geometry.Polygon g = new ESRI.ArcGIS.Client.Geometry.Polygon();
            g.Rings.Add(pCollection);
            result.Geometry = g;
            SimpleFillSymbol sfs = new SimpleFillSymbol();
            sfs.BorderBrush = new SolidColorBrush(Colors.Transparent);
            sfs.BorderThickness = 2;
            string[] str = colour.Split(',');
            sfs.Fill = new SolidColorBrush(Color.FromArgb(0x7f, Convert.ToByte(str[0]), Convert.ToByte(str[1]), Convert.ToByte(str[2])));
            result.Symbol = sfs;
            result.MouseLeftButtonUp += delegate
            {
                HtmlPage.Window.Invoke("clickPonitsShowThermodynamic", id, typeid);
            };
            Cityrode.Graphics.Add(result);
            ContainerManager.Map.PanTo(new ESRI.ArcGIS.Client.Geometry.Envelope((double)centerX, (double)centerY, (double)centerX, (double)centerY));
        }


        /// 清除
        /// </summary>
        [ScriptableMember]
        public void Clean()
        {
            GraphicsLayer GraphicsLayerRL = map.Layers["GraphicsLayerRL"] as GraphicsLayer;
            GraphicsLayerRL.Graphics.Clear();
            GraphicsLayer GraphicsLayerCq = map.Layers["GraphicsLayerCq"] as GraphicsLayer;
            GraphicsLayerCq.Graphics.Clear();
            ElementLayer ElementLayer1 = map.Layers["ElementLayer"] as ElementLayer;
            ElementLayer1.Children.Clear();
            GraphicsLayer GraphicsLayer = map.Layers["GraphicsLayer"] as GraphicsLayer;
            GraphicsLayer.Graphics.Clear();
        }

        /// <summary>
        /// 轨迹回放
        /// </summary>
        [ScriptableMember]
        public void TrackPlayback(string url, string icon)
        {

            int id = 4421;
           // MessageBox.Show("123");
            ContainerManager.PlayBackBodyContainer.Visibility = Visibility.Visible;
            ContainerManager.Map.Visibility = Visibility.Collapsed;

            foreach (WindowBase item in RadWindowManager.Current.GetWindows())
            {
                item.Visibility = Visibility.Collapsed;
            }

            PlayBackBodyContainer pbbcControl = ContainerManager.PlayBackBodyContainer as PlayBackBodyContainer;
            //pbbcControl.map.Layers.Clear();
            pbbcControl.PlayBack(url, icon);

        }
        [ScriptableMember]
        public void DrowGraphical(string url)
        {
            WebAPIHelper dt = new WebAPIHelper();
            GraphicsLayer Cityrode = map.Layers["GraphicsLayerCq"] as GraphicsLayer;
            dt.GetDataCompleted += (s, args) =>
            {
                List<MapGraphical> list = args.DataResult as List<MapGraphical>;
                foreach (var model in list)
                {
                    SimpleFillSymbol style = new SimpleFillSymbol();
                    string[] str = model.colour.Split(',');
                    List<MapPoint> MapPointList = new List<MapPoint>();
                    foreach (var po in model.MapPointList)
                    {
                        MapPointList.Add(new MapPoint { X = po.X, Y = po.Y });
                    }
                    //Color ColorFill = ConvertToHtml(model.colour);
                    Graphic graphic = new Graphic();
                    style.Fill = new SolidColorBrush(Color.FromArgb(0x7f, Convert.ToByte(str[0]), Convert.ToByte(str[1]), Convert.ToByte(str[2]))); 
                    ESRI.ArcGIS.Client.Geometry.PointCollection pCollection = new ESRI.ArcGIS.Client.Geometry.PointCollection(MapPointList);
                    ESRI.ArcGIS.Client.Geometry.Polygon g = new ESRI.ArcGIS.Client.Geometry.Polygon();
                    g.Rings.Add(pCollection);
                    graphic.Geometry = g;
                    graphic.Symbol = style;
                    //ESRI.ArcGIS.Client.Geometry.Polygon polygon = (ESRI.ArcGIS.Client.Geometry.Polygon)graphic.Geometry;
                    //GraphicsLayerCq
                    Cityrode.Graphics.Add(graphic);
                }

            };
            dt.GetDataAsync<List<MapGraphical>>(url);


        }

        public  Color ConvertToHtml(string color)
        {
            if (string.IsNullOrEmpty(color))
                return Colors.White;

            color = color.Trim();
            if (color.StartsWith("#"))
            {
                color = color.Substring(1);
            }

            if (color.Length == 6)
            {
                Byte r = Convert.ToByte(color.Substring(0, 2), 16);
                Byte g = Convert.ToByte(color.Substring(2, 2), 16);
                Byte b = Convert.ToByte(color.Substring(4, 2), 16);

                return Color.FromArgb(255, r, g, b);
            }

            if (color.Length == 8)
            {
                Byte alph = Convert.ToByte(color.Substring(0, 2), 16);
                Byte r = Convert.ToByte(color.Substring(2, 2), 16);
                Byte g = Convert.ToByte(color.Substring(4, 2), 16);
                Byte b = Convert.ToByte(color.Substring(6, 2), 16);
                return Color.FromArgb(alph, r, g, b);
            }

            return Colors.White;
        }

        public class MapGraphical
        {
            public List<MapPoint1> MapPointList { get; set; }
            public string colour { get; set; }
            public string name { get; set; }


        }


        public class MapPoint1
        {
            public double X { get; set; }
            public double Y { get; set; }
        }

        #region 控件部分代码块
        //<!--<telerik:RadWindow Header = "筛选面板" x:Name="Radwin" CanClose="True" Style="{StaticResource RadWindowStyle}" PreviewClosed="Radwin_Closed">-->
        //public void ShowMyWindow(int type)
        //{
        //    if (MyWindow == null)
        //    {
        //        MyWindow = new RadWindow
        //        {
        //            Header = "筛选面板",
        //            Height = 500,
        //            Width = 700,
        //            HorizontalAlignment = HorizontalAlignment.Center,
        //            VerticalAlignment = VerticalAlignment.Center,
        //            Content = new TZFilterWindow(type),
        //            Style = Application.Current.Resources["RadWindowStyle"] as Style,
        //            WindowStartupLocation= Telerik.Windows.Controls.WindowStartupLocation.CenterScreen
        //        };
        //    }
        //    MyWindow.HorizontalContentAlignment = HorizontalAlignment.Center;
        //    MyWindow.Show();
        //}
        //public void ShowRoundWindow(MapElement obj)
        //{
        //    MyWindow = null;
        //    MyWindow = new RadWindow
        //    {
        //        Header = "周边面板",
        //        Height = 500,
        //        Width = 700,
        //        HorizontalAlignment = HorizontalAlignment.Center,
        //        VerticalAlignment = VerticalAlignment.Center,
        //        Content = new RoundFilter(obj),
        //        Style = Application.Current.Resources["RadWindowStyle"] as Style,
        //        WindowStartupLocation = Telerik.Windows.Controls.WindowStartupLocation.CenterScreen
        //    };
        //    MyWindow.Show();
        //}

        //public void CloseFilter()
        //{
        //    if (MyWindow != null)
        //    {
        //        MyWindow.Close();


        //       // MyWindow.Visibility = Visibility.Collapsed;
        //    }
        //}

        #endregion
    }
}
