using JXXZ.ZHCG.Front.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Threading;
using Techzen.ICS.CS.Controls;
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;

namespace JXXZ.ZHCG.Front.Window
{
    public class ListWindow : RadWindow
    {
        const int LEFT_MARGIN = 120;

        int _mapElementCategoryID;
        string _value = "";
        MapElementPaging list;
        List<SystemConfig> columnList = new List<SystemConfig>();
        Dictionary<string, object> _results = new Dictionary<string, object>();
        TZElementListWindow _listWindow = new TZElementListWindow();
        List<MarkerMapElement> _currentMapElementList = new List<MarkerMapElement>();

        public ListWindow()
        {
            this.MinWidth = 250;
            this.MinHeight = 400;
            this.HorizontalAlignment = HorizontalAlignment.Left;
            this.VerticalAlignment = VerticalAlignment.Top;
            this.Top = 134;
            this.Left = 5;
            this.ResizeMode = ResizeMode.CanMinimize;
            this.Opacity = 0.95;
            this.Style = Application.Current.Resources["RadWindowStyle"] as Style;
        }

        public ListWindow(int mapElementCategoryID, Dictionary<string, object> results)
        {
            this.MinWidth = 250;
            this.MinHeight = 400;
            this.HorizontalAlignment = HorizontalAlignment.Left;
            this.VerticalAlignment = VerticalAlignment.Top;
            this.Top = 134;
            this.Left = 5;
            this.ResizeMode = ResizeMode.CanMinimize;
            this.Opacity = 0.95;
            this.Style = Application.Current.Resources["RadWindowStyle"] as Style;

            this._mapElementCategoryID = mapElementCategoryID;
            foreach (KeyValuePair<string, object> item in results)
                this._results.Add(item.Key, item.Value);
            _results["MapElementCategoryID"] = _mapElementCategoryID;

            columnList = ContainerManager.SystemConfigs.GetSystemConfigs("MapElement", _mapElementCategoryID, "ListWindow");

            SystemConfig Columns = columnList.Where(t => t.Name == "IsTodayData").FirstOrDefault();

            int isTodayData = Columns == null ? 0 : int.Parse(Columns.Value);
            if (isTodayData == 1)
                _results["BeginReservedField9"] = DateTime.Now.ToString("yyyy-MM-dd");

            this.Closed += ListWindow_Closed;
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            if (_mapElementCategoryID == 0)
                return;

            _listWindow.PositionAllButtonClick += listWindow_PositionAllButtonClick;
            _listWindow.ELWSearcherButtonClick += listWindow_ELWSearcherButtonClick;
            _listWindow.PagerIndexChanged += listWindow_PagerIndexChanged;

            _listWindow.ELWFilterButtonClick += _listWindow_ELWFilterButtonClick;

            #region Columns


            SystemConfig columen = columnList.Where(t => t.Name == "Columns").FirstOrDefault();
            columnList = ContainerManager.SystemConfigs.GetSystemConfigs(columen);

            foreach (SystemConfig columnItem in columnList)
            {
                List<SystemConfig> columnItem1 = ContainerManager.SystemConfigs.GetSystemConfigs(columnItem);
                string name = columnItem1.Where(t => t.Name == "Name").FirstOrDefault().Value;
                string bindField = columnItem1.Where(t => t.Name == "BindField").FirstOrDefault().Value;
                string type = columnItem1.Where(t => t.Name == "Type").FirstOrDefault().Value;
                int width = int.Parse(columnItem1.Where(t => t.Name == "Width").FirstOrDefault().Value);

                if (columnList.IndexOf(columnItem) == 1)
                {
                    _listWindow.WatermarkContent = "请输入" + name;
                }

                ColumnDefinition _col = new ColumnDefinition();
                _col.Width = new GridLength(width);
                _listWindow.ELWListHeader.ColumnDefinitions.Add(_col);

                TextBlock tb1 = new TextBlock()
                {
                    VerticalAlignment = VerticalAlignment.Center,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    FontWeight = FontWeights.Bold,
                    Text = name,
                    Style = Application.Current.Resources["DefaultTextBlockStyle"] as Style,
                    Margin = new Thickness(-25, 0, 0, 0)
                };
                tb1.SetValue(Grid.ColumnProperty, columnList.IndexOf(columnItem));
                _listWindow.ELWListHeader.Children.Add(tb1);

            }
            //获得元素种类信息
            MapElementCategorie _mecEntity = ContainerManager.MapElementCategorys.Where(t => t.ID == this._mapElementCategoryID).FirstOrDefault();
            this.Header = _mecEntity.Name + "列表";


            if (_mapElementCategoryID!=3)
            {
                this.Content = _listWindow;
            }
            else
            {

                MonitorGrid mGrid = new MonitorGrid();

                mGrid.MonitorBoder.Children.Add(_listWindow);


                TelericTreeView ttv = new TelericTreeView();


                ScrollViewer sv = new ScrollViewer();
                sv.Content = ttv;

                 mGrid.ZTBoder.Children.Add(sv);


                




                this.Content = mGrid;



                //#region 树结构
                //TelericTreeView treeView = new TelericTreeView();
                //treeView.Background = new SolidColorBrush(Colors.Green);
                //treeView.MaxHeight = 360;
                //#endregion


                //#region Table页（监控、专题）
                //RadTabControl rTab = new RadTabControl();

                ////rTab.Style


                //RadTabItem tabMonitor = new RadTabItem();
                //tabMonitor.Header = "监控";
                //tabMonitor.Width = 130;
                //tabMonitor.Content = _listWindow;

                //RadTabItem tabSpecial = new RadTabItem();
                //tabSpecial.Header = "专题";
                //tabSpecial.Width = 130;
                //tabSpecial.Content = treeView;

                //rTab.Items.Add(tabMonitor);
                //rTab.Items.Add(tabSpecial);
                //#endregion

                //this.Content = rTab;
            }



            GetPersons("");
            //  playerTimer();//地图点位实时刷新
            #endregion
        }

        /// <summary>
        /// 创建控件
        /// </summary>
        /// <param name="columnItem"></param>
        /// <param name="Items"></param>
        private void CreateItems(List<SystemConfig> columnItem, IEnumerable<MapElement> Items)
        {
            this._listWindow.ELWlist.Items.Clear();
            foreach (MapElement element in Items)
            {
                Grid sp = new Grid()
                {
                    DataContext = element
                };

                sp.MouseLeftButtonUp += Grid_MouseLeftButtonUp;
                this._listWindow.ELWlist.Items.Add(sp);
                int i = 0;

                foreach (SystemConfig item in columnItem)
                {
                    List<SystemConfig> columnItem1 = ContainerManager.SystemConfigs.GetSystemConfigs(item);
                    string name = columnItem1.Where(t => t.Name == "Name").FirstOrDefault().Value;
                    string bindField = columnItem1.Where(t => t.Name == "BindField").FirstOrDefault().Value;
                    string type = columnItem1.Where(t => t.Name == "Type").FirstOrDefault().Value;
                    int width = int.Parse(columnItem1.Where(t => t.Name == "Width").FirstOrDefault().Value);

                    ColumnDefinition _col = new ColumnDefinition();
                    _col.Width = new GridLength(width);
                    sp.ColumnDefinitions.Add(_col);

                    #region switch
                    switch (type)
                    {
                        case "Text":
                            TextBlock t = new TextBlock()
                            {
                                Style = Application.Current.Resources["DefaultTextBlockStyle1"] as Style,
                                HorizontalAlignment = HorizontalAlignment.Left,
                                VerticalAlignment = VerticalAlignment.Center,
                                Margin = new Thickness(6, 0, 0, 0)
                            };
                            object value = ConfigHelper.GetFieldValue(element, bindField);
                            if (value == null)
                                t.Text = "";
                            else
                                switch (value.GetType().ToString())
                                {
                                    case "System.Int":
                                        t.Text = (string)value;
                                        break;
                                    case "System.String":
                                        t.Text = (string)value;
                                        break;
                                    case "System.DateTime":
                                        DateTime time = (DateTime)value;
                                        t.Text = time.ToString("hh:ss");
                                        break;
                                    default:
                                        break;
                                }

                            t.SetValue(Grid.ColumnProperty, i);
                            sp.Children.Add(t);
                            break;
                        case "Image":
                            Image img = new Image()
                            {
                                Style = null,
                                HorizontalAlignment = HorizontalAlignment.Center,
                                VerticalAlignment = VerticalAlignment.Center,
                                Height = width,
                                Source = new BitmapImage(new Uri(ConfigHelper.GetFieldValue(element, bindField) == null ? "/Techzen.ICS.CS;component/Images/default_picture.jpg" : (string)ConfigHelper.GetFieldValue(element, bindField), UriKind.RelativeOrAbsolute))
                            };
                            img.SetValue(Grid.ColumnProperty, i);
                            sp.Children.Add(img);
                            break;
                        case "CustomImage":
                            Image customImage = new Image()
                            {
                                Style = null,
                                HorizontalAlignment = HorizontalAlignment.Center,
                                VerticalAlignment = VerticalAlignment.Center,
                                Height = width
                            };
                            SystemConfig image = columnItem1.Where(a => a.Name == "Images").FirstOrDefault();
                            List<SystemConfig> ImgList = ContainerManager.SystemConfigs.GetSystemConfigs(image);

                            foreach (SystemConfig images in ImgList)
                            {
                                List<SystemConfig> imgItem = ContainerManager.SystemConfigs.GetSystemConfigs(images);
                                int? id = int.Parse(imgItem.Where(t1 => t1.Name == "ID").FirstOrDefault().Value);
                                string imageUrl = imgItem.Where(t1 => t1.Name == "ImageUrl").FirstOrDefault().Value;

                                if (string.IsNullOrEmpty(imageUrl))
                                    imageUrl = "/Techzen.ICS.CS;component/Images/default_picture.jpg";
                                else
                                    ConfigHelper.ProcessImageUrl(ref imageUrl);

                                string fieldValue = ConfigHelper.GetFieldValue(element, bindField);
                                if (fieldValue != "" && id == int.Parse(fieldValue))
                                {
                                    customImage.Source = new BitmapImage(new Uri(imageUrl, UriKind.RelativeOrAbsolute));
                                    break;
                                }
                            }

                            customImage.SetValue(Grid.ColumnProperty, i);
                            sp.Children.Add(customImage);
                            break;
                        default:
                            break;
                    }
                    #endregion

                    i++;
                }

                ColumnDefinition _col1 = new ColumnDefinition();
                _col1.Width = new GridLength(15);
                sp.ColumnDefinitions.Add(_col1);
                Image btnImg = new Image()
                {
                    Style = null,
                    HorizontalAlignment = HorizontalAlignment.Right,
                    VerticalAlignment = VerticalAlignment.Center,
                    Height = 15,
                    Source = new BitmapImage(new Uri("/Techzen.ICS.CS.Controls;component/Images/datails.png", UriKind.RelativeOrAbsolute))
                };

                btnImg.MouseLeftButtonUp += Image_MouseLeftButtonUp;
                btnImg.SetValue(Grid.ColumnProperty, i);
                sp.Children.Add(btnImg);


            }

        }

        private void GetPersons(string value)
        {
            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                list = args.DataResult as MapElementPaging;
                _listWindow.ItemCount = list.Total;
                CreateItems(columnList, list.Items);
            };

            _results["ReservedField1"] = value;
            int pageIndex = this._listWindow.PageIndex + 1;
            string url = "api/MapElement/Query?pageSize=10&currentPage=" + pageIndex;

            dt.GetDataAsync<MapElementPaging>(url, _results);
        }

        private void GetAllPersons(string value)
        {
            ContainerManager.ToastTip.Text = "正在加载..";
            ContainerManager.ToastTip.IsOpened = true;

            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                List<MapElement> _currentList = args.DataResult as List<MapElement>;
                List<MapElement> _positionList = _currentList.Where(m => m.X != null).ToList();
                //var list = _positionList.Where(m => m.MapElementCategoryID == _mapElementCategoryID).Distinct(new SchoolComparer()).ToList();
                //List<Image> img = getImage(_mapElementCategoryID);
                Dictionary<int, Image> imglist = GetIconUrl(_mapElementCategoryID);
                foreach (MapElement obj in _positionList)
                {
                    if (obj.X == null)
                        continue;
                    //MarkerMapElement element = new MarkerMapElement(obj, 0, ContainerManager.Map, LayerManager.ElementLayer);
                    MarkerMapElement element = new MarkerMapElement(obj, 0, ContainerManager.Map, LayerManager.ElementLayer, imglist);
                    element.AddToMap();
                    _currentMapElementList.Add(element);
                }

                //ContainerManager.Map.Extent = GpsHelper.MapExtent4Road(_currentList);
            };

            _results["ReservedField1"] = value;
            string url = "api/MapElement/Query";

            dt.GetDataAsync<List<MapElement>>(url, _results);
        }
        public class SchoolComparer : EqualityComparer<MapElement>
        {
            public override bool Equals(MapElement x, MapElement y)
            {
                return x.MapElementBizTypeID == y.MapElementBizTypeID;
            }
            public override int GetHashCode(MapElement obj)
            {
                return obj.MapElementBizTypeID.GetHashCode();
            }
        }
        /// <summary>
        /// 获取到图片路径
        /// </summary>
        /// <param name="element"></param>
        /// <returns></returns>
        private Dictionary<int, Image> GetIconUrl(int MapElementCategoryID)
        {
            Dictionary<int, Image> imagelist = new Dictionary<int, Image>();
            List<SystemConfig> configList = new List<SystemConfig>();
            List<SystemConfig> columnConfig = new List<SystemConfig>();
            ConfigHelper.GetSystemConfigColumn("02", MapElementCategoryID, "MapIcons", ref configList, ref columnConfig);
            foreach (SystemConfig column in columnConfig)
            {
                List<SystemConfig> mapIcon = configList.Where(t => t.ParentCode == column.Code).ToList();
                int mapElementBizTypeID = int.Parse(mapIcon.Where(t => t.Name == "MapElementBizType").FirstOrDefault().Value);
                string iconSource = mapIcon.Where(t => t.Name == "IconSource").FirstOrDefault().Value;
                string iconUrl = "";
                var info = mapIcon.Where(t => t.Name == "IconUrl").ToList();
                if (info.Count > 0)
                {
                    iconUrl = mapIcon.Where(t => t.Name == "IconUrl").FirstOrDefault().Value;
                }
                if (string.IsNullOrEmpty(iconUrl))
                    iconUrl = "/Techzen.ICS.CS;component/Images/default_picture.jpg";
                else
                    ConfigHelper.ProcessImageUrl(ref iconUrl);
                Image img = new Image()
                {
                    Width = 32,
                    Height = 37,
                    Margin = new Thickness(0, 0, 0, 37),
                    Source = new BitmapImage(new Uri(iconUrl, UriKind.RelativeOrAbsolute)),
                    Cursor = Cursors.Hand
                };
                imagelist.Add(mapElementBizTypeID, img);
            }
            return imagelist;
        }

        private void _listWindow_ELWFilterButtonClick(object sender, EventArgs e)
        {
            MainPage m = ContainerManager.BodyContainer as MainPage;

            

            int type = 1;//监控类型id

            //m.ShowMyWindow(type);

        }

        private void listWindow_PositionAllButtonClick(object sender, EventArgs e)
        {
            GetAllPersons(this._listWindow.ELWSearcherInput.Text);
        }

        private void listWindow_ELWSearcherButtonClick(object sender, EventArgs e)
        {
            GetPersons(this._listWindow.ELWSearcherInput.Text);
        }

        private void listWindow_PagerIndexChanged(object sender, EventArgs e)
        {
            GetPersons(this._listWindow.ELWSearcherInput.Text);
        }

        private void Grid_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            Grid g = sender as Grid;
            MapElement obj = g.DataContext as MapElement;

            if (obj == null)
                return;

            if (!obj.X.HasValue && !obj.Y.HasValue)
            {
                //ContainerManager.ToastTip.Text = "暂无定位数据";
                //ContainerManager.ToastTip.IsOpened = true;
                return;
            }

            MarkerMapElement personMapElement = _currentMapElementList.FirstOrDefault(m => m.ID == obj.ID);
            if (personMapElement == null)
            {
                MarkerMapElement element = new MarkerMapElement(obj, 0, ContainerManager.Map, LayerManager.ElementLayer);
                element.AddToMap();
                element.Select();
                _currentMapElementList.Add(element);
            }
            else
            {
                personMapElement.Select();
            }

            //ContainerManager.ToastTip.Text = "正在定位..";
            //ContainerManager.ToastTip.IsOpened = true;
            ContainerManager.Map.PanTo(new ESRI.ArcGIS.Client.Geometry.Envelope((double)obj.X, (double)obj.Y, (double)obj.X, (double)obj.Y));
        }

        public void playerTimer()
        {
            DispatcherTimer dispatcherTimer = new System.Windows.Threading.DispatcherTimer();
            dispatcherTimer.Tick += new EventHandler(OnTimedEvent);
            dispatcherTimer.Interval = TimeSpan.FromSeconds(5);
            dispatcherTimer.Start();
        }

        private void OnTimedEvent(object sender, EventArgs e)
        {
            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                List<MapElement> _currentList = args.DataResult as List<MapElement>;
                _currentList = _currentList.Where(m => m.X > 0).ToList();
                _currentMapElementList = _currentMapElementList.OrderBy(m => m.ID).ToList();

                List<MapElement> list =
                (from a in _currentList
                 join b in _currentMapElementList on a.ID equals b.ID
                 select new MapElement()
                 {
                     ID = a.ID,
                     X = a.X,
                     Y = a.Y,
                     Latitude = (decimal?)b.Point.X,
                     Longitude = (decimal?)b.Point.Y
                 }).OrderBy(m => m.ID).ToList();

                for (int i = 0; i < list.Count; i++)
                {
                    if (Math.Round((double)list[i].X) == Math.Round((double)list[i].Latitude) && Math.Round((double)list[i].Y) == Math.Round((double)list[i].Longitude))
                        continue;
                    Point point = new Point();
                    point.X = (double)list[i].X;
                    point.Y = (double)list[i].Y;
                    _currentMapElementList[i].BeginMoveTo(point);
                }

            };

            _results.Remove("ReservedField1");
            _results.Add("ReservedField1", _value);
            _results["MapElementCategoryID"] = _mapElementCategoryID;
            string url = "api/MapElement/Query";

            dt.GetDataAsync<List<MapElement>>(url, _results);
        }

        private void Image_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            e.Handled = true;
            Image img = sender as Image;
            MapElement meEntity = img.DataContext as MapElement;

            DetailWindow window = new DetailWindow(meEntity);
            window.Show();
        }

        private void ListWindow_Closed(object sender, WindowClosedEventArgs e)
        {
            foreach (MarkerMapElement obj in _currentMapElementList)
            {
                obj.RemoveFromMap();
            }
        }
    }
}

