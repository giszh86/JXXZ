using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using Techzen.ICS.CS.Controls;
using System.Windows.Browser;
using Techzen.ICS.PublicModel;
using Newtonsoft.Json;
using ESRI.ArcGIS.Client.Symbols;
using Techzen.ArcGIS.Client;
using System.Windows.Media.Imaging;
using Telerik.Windows.Controls;
using ESRI.ArcGIS.Client;
using Techzen.ArcGIS.TiledMapServiceLayers;
using ESRI.ArcGIS.Client.Geometry;
using JXXZ.ZHCG.Front.Helper;
using System.Windows.Media;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class PlayBackBodyContainer : UserControl
    {
        private TZPlayback _tzPlayback;
        private List<GPSPoint> _gpsPointList;
        private string _url;

        public PlayBackBodyContainer()
        {
            InitializeComponent();
            //Bindmap();
           // ArcGISTiledMapServiceLayer layer = new ArcGISTiledMapServiceLayer();


        }
        public void Bindmap()
        {
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
            string mapExtent = Application.Current.Resources["mapExtent"] as string;
            double x1 = Convert.ToDouble(mapExtent.Split('|')[0]);
            double y1 = Convert.ToDouble(mapExtent.Split('|')[1]);
            double x2 = Convert.ToDouble(mapExtent.Split('|')[2]);
            double y2 = Convert.ToDouble(mapExtent.Split('|')[3]);
            this.map.Extent = new Envelope((double)x1, (double)y1, (double)x2, (double)y2);
        }
        public void PlayBack(string url, string icon)
        {
            this.map.Layers.Clear();
            //_mapElementCategoryID = mapElementCategoryID;
            //_id = id;
            Bindmap();
            _url = url;
            Image imgMapMarker = new Image()
            {
                Width = 34,
                Height = 50,
                Source = new BitmapImage(new Uri(icon, UriKind.RelativeOrAbsolute)),
                Margin = new Thickness(0, -30, 0, 0)
            };

            PictureMarkerSymbol stayPointSymbol = (PictureMarkerSymbol)this.LayoutRoot.Resources["StayPointSymbol"];

            MapElementPlayback mpp = new MapElementPlayback(this.map)
            {
                MarkerElement = imgMapMarker,
                StayPointSymbol = stayPointSymbol,
                IsDisplayStayPoint = true,
                IsFilterStayPoint = true
            };
           
            _tzPlayback = new TZPlayback(mpp);
            _tzPlayback.Playing += _tzPlayback_Playing;

            double browserWidth = Convert.ToDouble(HtmlPage.Document.Body.GetProperty("clientWidth"));
            double browserHeight = Convert.ToDouble(HtmlPage.Document.Body.GetProperty("clientHeight"));
            double top = (browserHeight - 120);
            double left = ((browserWidth / 2) - 300);

            RadWindow tzPlaybackWindow = new RadWindow()
            {
                WindowStartupLocation = Telerik.Windows.Controls.WindowStartupLocation.Manual,
                Left = left,
                //Top = top,
                Header = "轨迹回放",
                Foreground = new SolidColorBrush(Colors.White),
                Content = this._tzPlayback,
                HideMaximizeButton = true,
                ResizeMode = ResizeMode.CanMinimize
            };

            tzPlaybackWindow.Closed += TzPlaybackWindow_Closed;

            tzPlaybackWindow.Show();
        }

        private void _tzPlayback_Playing(object sender, EventArgs e)
        {
            if (this._tzPlayback.IsPaused)
                this._tzPlayback.Play(this._gpsPointList);
            else
            {
                this.rbiLoad.IsBusy = true;
                this._tzPlayback.IsEnabled = false;

                WebAPIHelper dt = new WebAPIHelper();

                 dt.GetDataCompleted += (s, args) =>
                {
                    this.rbiLoad.IsBusy = false;
                    this._tzPlayback.IsEnabled = true;

                    List<GPSPoint> list = args.DataResult as List<GPSPoint>;

                    //if (list == null || list.Count == 0)
                    //{
                    //    this.toastTip.Text = "暂无定位数据";
                    //    this.toastTip.IsOpened = true;
                    //    return;
                    //}

                    this._gpsPointList = list;//list.Where(t => t.Longitude != null && t.Latitude != null && t.X != null & t.Y != null)
                    //.Select(t => new GPSPoint()
                    //{
                    //    Longitude = (double)t.Latitude,
                    //    Latitude = (double)t.Latitude,
                    //    X = (double)t.X,
                    //    Y = (double)t.Y,
                    //    Speed = t.Speed == null ? 0 : (int)t.Speed,
                    //    StartTime = t.SatelliteTime,
                    //    EndTime = t.SatelliteTime
                    //}).ToList();

                    //double x1 = (double)list.Min(m => m.X);
                    //double y1 = (double)list.Min(m => m.Y);
                    //double x2 = (double)list.Max(m => m.X);
                    //double y2 = (double)list.Max(m => m.Y);
                    //new ESRI.ArcGIS.Client.Geometry.Envelope(x1, y1, x2, y2);

                    this._tzPlayback.Play(this._gpsPointList);

                };
                string url = string.Format(_url, Convert.ToDateTime(_tzPlayback.StartTime).ToString("yyyy-MM-dd HH:mm:ss"), Convert.ToDateTime(_tzPlayback.EndTime).ToString("yyyy-MM-dd HH:mm:ss"));
                dt.GetDataAsync<List<GPSPoint>>(url);
            }

            //this._tzPlayback.Play(GetTestGPSPoints());
        }

        private void TzPlaybackWindow_Closed(object sender, WindowClosedEventArgs e)
        {
            ContainerManager.PlayBackBodyContainer.Visibility = Visibility.Collapsed;
            ContainerManager.Map.Visibility = Visibility.Visible;

            foreach (WindowBase item in RadWindowManager.Current.GetWindows())
            {
                item.Visibility = Visibility.Visible;
            }
        }

        //测试数据
        private List<GPSPoint> GetTestGPSPoints()
        {
            List<GPSPoint> points = new List<GPSPoint>();

            string str = "120.11846507123676,30.293795043214253;120.11846507123676,30.293795043214253;362568.86969685,3317619.35413753;362646.29262426,3317610.06338624;362748.490888441,3317610.06338624;362887.852157779,3317600.77263495;362965.275085189,3317591.48188367;362943.596665515,3317222.94874919;362934.305914225,3316764.60501893;362937.402831322,3316513.75473412;363414.328064168,3316482.78556315;363854.090291857,3316513.75473412;364157.588167304,3316523.04548541;364355.790861474,3316532.3362367;364600.44731209,3316526.1424025;364662.385654018,3316529.2393196;364668.579488211,3316872.9971173;364687.160990789,3317232.23950048;364315.530939221,3317244.62716887;364293.852519546,3317532.64045883;364696.451742078,3317510.96203916";
           // { { "EndTime":"2017-04-18 13:21:20","StartTime":"2017-04-18 13:21:20","Latitude":30.293821047330542,"Longitude":120.11847208306642,"X":120.11847208306642,"Y":30.293821047330542,"Speed":0},{ "EndTime":"2017-04-18 13:21:30","StartTime":"2017-04-18 13:21:30","Latitude":30.293821047330542,"Longitude":120.11847208306642,"X":120.11847208306642,"Y":30.293821047330542,"Speed":0},{ "EndTime":"2017-04-18 13:21:41","StartTime":"2017-04-18 13:21:41","Latitude":30.29380003769305,"Longitude":120.11846006078561,"X":120.11846006078561,"Y":30.29380003769305,"Speed":0},{ "EndTime":"2017-04-18 13:21:52","StartTime":"2017-04-18 13:21:52","Latitude":30.29380003769305,"Longitude":120.11846006078561,"X":120.11846006078561,"Y":30.29380003769305,"Speed":0},{ "EndTime":"2017-04-18 13:22:03","StartTime":"2017-04-18 13:22:03","Latitude":30.293803037364434,"Longitude":120.11846006053074,"X":120.11846006053074,"Y":30.293803037364434,"Speed":0},{ "EndTime":"2017-04-18 13:23:30","StartTime":"2017-04-18 13:23:30","Latitude":30.293811037482744,"Longitude":120.11846106185628,"X":120.11846106185628,"Y":30.293811037482744,"Speed":0},{ "EndTime":"2017-04-18 14:22:23","StartTime":"2017-04-18 14:22:23","Latitude":30.293739245990086,"Longitude":120.1186624718121,"X":120.1186624718121,"Y":30.293739245990086,"Speed":0},{ "EndTime":"2017-04-18 14:22:36","StartTime":"2017-04-18 14:22:36","Latitude":30.293787316953324,"Longitude":120.11873862084124,"X":120.11873862084124,"Y":30.293787316953324,"Speed":0},{ "EndTime":"2017-04-18 14:22:47","StartTime":"2017-04-18 14:22:47","Latitude":30.293787316953324,"Longitude":120.11873862084124,"X":120.11873862084124,"Y":30.293787316953324,"Speed":0},{ "EndTime":"2017-04-18 14:23:01","StartTime":"2017-04-18 14:23:01","Latitude":30.293801037583506,"Longitude":120.11846006070067,"X":120.11846006070067,"Y":30.293801037583506,"Speed":0},{ "EndTime":"2017-04-18 14:27:40","StartTime":"2017-04-18 14:27:40","Latitude":30.293838047458184,"Longitude":120.11847408563351,"X":120.11847408563351,"Y":30.293838047458184,"Speed":0},{ "EndTime":"2017-04-18 15:20:29","StartTime":"2017-04-18 15:20:29","Latitude":30.293844043815628,"Longitude":120.11847107910677,"X":120.11847107910677,"Y":30.293844043815628,"Speed":0},{ "EndTime":"2017-04-18 15:20:45","StartTime":"2017-04-18 15:20:45","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},{ "EndTime":"2017-04-18 15:20:56","StartTime":"2017-04-18 15:20:56","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},{ "EndTime":"2017-04-18 15:21:01","StartTime":"2017-04-18 15:21:01","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},{ "EndTime":"2017-04-18 15:21:17","StartTime":"2017-04-18 15:21:17","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},{ "EndTime":"2017-04-18 15:21:27","StartTime":"2017-04-18 15:21:27","Latitude":30.293798178496377,"Longitude":120.11860134407462,"X":120.11860134407462,"Y":30.293798178496377,"Speed":0},{ "EndTime":"2017-04-18 15:21:38","StartTime":"2017-04-18 15:21:38","Latitude":30.293798178496377,"Longitude":120.11860134407462,"X":120.11860134407462,"Y":30.293798178496377,"Speed":0},{ "EndTime":"2017-04-18 15:21:49","StartTime":"2017-04-18 15:21:49","Latitude":30.293798178496377,"Longitude":120.11860134407462,"X":120.11860134407462,"Y":30.293798178496377,"Speed":0},{ "EndTime":"2017-04-18 15:21:59","StartTime":"2017-04-18 15:21:59","Latitude":30.293798178496377,"Longitude":120.11860134407462,"X":120.11860134407462,"Y":30.293798178496377,"Speed":0},{ "EndTime":"2017-04-18 15:22:11","StartTime":"2017-04-18 15:22:11","Latitude":30.293775316259264,"Longitude":120.11873661782866,"X":120.11873661782866,"Y":30.293775316259264,"Speed":0},{ "EndTime":"2017-04-18 15:22:21","StartTime":"2017-04-18 15:22:21","Latitude":30.293775316259264,"Longitude":120.11873661782866,"X":120.11873661782866,"Y":30.293775316259264,"Speed":0},{ "EndTime":"2017-04-18 15:22:31","StartTime":"2017-04-18 15:22:31","Latitude":30.293775316259264,"Longitude":120.11873661782866,"X":120.11873661782866,"Y":30.293775316259264,"Speed":0},{ "EndTime":"2017-04-18 15:22:41","StartTime":"2017-04-18 15:22:41","Latitude":30.293775316259264,"Longitude":120.11873661782866,"X":120.11873661782866,"Y":30.293775316259264,"Speed":0},{ "EndTime":"2017-04-18 15:22:51","StartTime":"2017-04-18 15:22:51","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},{ "EndTime":"2017-04-18 15:23:01","StartTime":"2017-04-18 15:23:01","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},{ "EndTime":"2017-04-18 15:23:12","StartTime":"2017-04-18 15:23:12","Latitude":30.293774230140961,"Longitude":120.11865044468458,"X":120.11865044468458,"Y":30.293774230140961,"Speed":0},{ "EndTime":"2017-04-18 15:23:23","StartTime":"2017-04-18 15:23:23","Latitude":30.293774230140961,"Longitude":120.11865044468458,"X":120.11865044468458,"Y":30.293774230140961,"Speed":0},{ "EndTime":"2017-04-18 15:23:33","StartTime":"2017-04-18 15:23:33","Latitude":30.293774230140961,"Longitude":120.11865044468458,"X":120.11865044468458,"Y":30.293774230140961,"Speed":0},{ "EndTime":"2017-04-18 15:23:43","StartTime":"2017-04-18 15:23:43","Latitude":30.293774230140961,"Longitude":120.11865044468458,"X":120.11865044468458,"Y":30.293774230140961,"Speed":0},{ "EndTime":"2017-04-18 15:23:53","StartTime":"2017-04-18 15:23:53","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},{ "EndTime":"2017-04-18 15:24:04","StartTime":"2017-04-18 15:24:04","Latitude":30.293784184027995,"Longitude":120.11860535330706,"X":120.11860535330706,"Y":30.293784184027995,"Speed":0},
            string[] xy = str.Split(';');

            int ss = 12;

            foreach (string item in xy)
            {
                points.Add(new GPSPoint()
                {
                    Longitude =Convert.ToDouble(item.Split(',')[0]),
                    Latitude = Convert.ToDouble(item.Split(',')[1]),
                    Speed = 20,
                    StartTime = DateTime.Parse("2016-05-06 12:11:"+ ss)
                });
                ss++;
            }



            //points.Add(new GPSPoint() { Longitude = 362122.913634968, Latitude = 3317634.83872302, Speed = 20, StartTime = DateTime.Parse("2016-05-06 12:11:02") });
            //points.Add(new GPSPoint() { Longitude = 11541142.5068983, Latitude = 3585577.71067535, Speed = 22, StartTime = DateTime.Parse("2016-05-06 12:11:03") });
            //points.Add(new GPSPoint() { Longitude = 11541142.5068983, Latitude = 3585577.71067535, Speed = 0, StartTime = DateTime.Parse("2016-05-06 12:12:03") });
            //points.Add(new GPSPoint() { Longitude = 11541142.5068983, Latitude = 3585577.71067535, Speed = 0, StartTime = DateTime.Parse("2016-05-06 12:13:03") });
            //points.Add(new GPSPoint() { Longitude = 11541142.5068983, Latitude = 3585577.71067535, Speed = 0, StartTime = DateTime.Parse("2016-05-06 12:15:03") });
            //points.Add(new GPSPoint() { Longitude = 11541142.5068983, Latitude = 3585577.71067535, Speed = 0, StartTime = DateTime.Parse("2016-05-06 12:20:03") });
            //points.Add(new GPSPoint() { Longitude = 11541142.5068983, Latitude = 3585577.71067535, Speed = 0, StartTime = DateTime.Parse("2016-05-06 12:25:03") });
            //points.Add(new GPSPoint() { Longitude = 11541190.280041, Latitude = 3585576.51634678, Speed = 13, StartTime = DateTime.Parse("2016-05-06 12:26:03") });
            //points.Add(new GPSPoint() { Longitude = 11541179.5310839, Latitude = 3585410.50467599, Speed = 25, StartTime = DateTime.Parse("2016-05-06 12:27:04") });
            //points.Add(new GPSPoint() { Longitude = 11541272.6887121, Latitude = 3585402.14437602, Speed = 33, StartTime = DateTime.Parse("2016-05-06 12:28:10") });
            //points.Add(new GPSPoint() { Longitude = 11541275.0773693, Latitude = 3585305.40376211, Speed = 32, StartTime = DateTime.Parse("2016-05-06 12:29:17") });
            //points.Add(new GPSPoint() { Longitude = 11541309.7128977, Latitude = 3585304.20943354, Speed = 15, StartTime = DateTime.Parse("2016-05-06 12:30:24") });
            //points.Add(new GPSPoint() { Longitude = 11541301.3525977, Latitude = 3585243.29867663, Speed = 10, StartTime = DateTime.Parse("2016-05-06 12:31:31") });
            //points.Add(new GPSPoint() { Longitude = 11541310.9072263, Latitude = 3585108.33954858, Speed = 12, StartTime = DateTime.Parse("2016-05-06 12:32:38") });
            //points.Add(new GPSPoint() { Longitude = 11541554.5502539, Latitude = 3585102.36790574, Speed = 35, StartTime = DateTime.Parse("2016-05-06 12:33:45") });

            foreach (GPSPoint point in points)
            {
                point.EndTime = point.StartTime;
                point.X = point.Longitude;
                point.Y = point.Latitude;
            }

            return points;
        }
    }
}
