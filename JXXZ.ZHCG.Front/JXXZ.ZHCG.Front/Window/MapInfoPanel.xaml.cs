using JXXZ.ZHCG.Front.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using Techzen.ICS.CS.Controls;
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class MapInfoPanel : UserControl
    {
        private int _id;
        private MapElement _mapElement;

        public event EventHandler OnClosing;

        public MapInfoPanel()
        {
            InitializeComponent();
        }

        public MapInfoPanel(MapElement mapElement)
        {
            InitializeComponent();
            _id = mapElement.ID;
            this._mapElement = mapElement;

            Info_Init();

            this.closeBtn.MouseLeftButtonUp += CloseBtn_MouseLeftButtonUp;
        }

        private void Info_Init()
        {
            List<SystemConfig> configList = new List<SystemConfig>();

            List<SystemConfig> detailsConfig = ContainerManager.SystemConfigs.GetSystemConfigs("MapElement", _mapElement.MapElementCategoryID, "MapInfoPanel");

            string controlMode = detailsConfig.Where(t => t.Name == "ControlMode").FirstOrDefault().Value;
            string controlName = detailsConfig.Where(t => t.Name == "ControlName").FirstOrDefault().Value;
            string displayMode = detailsConfig.Where(t => t.Name == "DisplayMode").FirstOrDefault().Value;


            //标题
            this.detailTitle.Text = "详情";

            //控件模式
            switch (controlMode)
            {
                case "Auto":    //自动生成
                    SystemConfig tempConfig = detailsConfig.Where(t => t.Name == "FieldItems").FirstOrDefault();
                    List<SystemConfig> dsList = ContainerManager.SystemConfigs.GetSystemConfigs(tempConfig);

                    if (displayMode == "Data")
                    {
                        #region 数据显示模式

                        for (int i = 0; i < dsList.Count; i++)
                        {
                            List<SystemConfig> itemConfig = ContainerManager.SystemConfigs.GetSystemConfigs(dsList[i]);
                            if (itemConfig.Count == 0)
                                break;
                            string name;
                            string bindField;
                            string value;

                            #region 获得配置信息

                            name = itemConfig.Where(t => t.Name == "Name").FirstOrDefault().Value;
                            bindField = itemConfig.Where(t => t.Name == "BindField").FirstOrDefault().Value;
                            value = bindField.IndexOf('.') == -1 ? GetFieldValue(bindField) : GetXMLFieldValue(bindField);

                            TZPanelItem pItem = new TZPanelItem();
                            pItem.NameText = name;
                            pItem.ValueText = value;
                            this.infoPanel.Children.Add(pItem);

                            #endregion
                        }
                        #endregion
                    }
                    else if (displayMode == "Avatar")
                    {
                        //创建详情面板
                        Grid grid = new Grid()
                        {
                            Margin = new Thickness(5, 8, 0, 8)
                        };

                        grid.RowDefinitions.Add(new RowDefinition() { Height = new GridLength(80, GridUnitType.Pixel) });
                        grid.RowDefinitions.Add(new RowDefinition() { Height = new GridLength(1, GridUnitType.Star) });

                        grid.ColumnDefinitions.Add(new ColumnDefinition() { Width = new GridLength(5, GridUnitType.Star) });
                        grid.ColumnDefinitions.Add(new ColumnDefinition() { Width = new GridLength(5, GridUnitType.Star) });

                        this.infoPanel.Children.Insert(0, grid);

                        StackPanel topPanel = new StackPanel()
                        {
                            VerticalAlignment = VerticalAlignment.Center
                        };

                        topPanel.SetValue(Grid.RowProperty, 0);
                        topPanel.SetValue(Grid.ColumnProperty, 1);
                        grid.Children.Add(topPanel);

                        Image avatarImage = new Image()
                        {
                            Stretch = Stretch.Uniform,
                            HorizontalAlignment = HorizontalAlignment.Left,
                            Margin = new Thickness(0, 0, 5, 0),
                            Source = new System.Windows.Media.Imaging.BitmapImage(new Uri(this._mapElement.Avatar == null ? "" : this._mapElement.Avatar, UriKind.RelativeOrAbsolute))
                        };

                        avatarImage.SetValue(Grid.RowProperty, 0);
                        avatarImage.SetValue(Grid.ColumnProperty, 0);
                        grid.Children.Add(avatarImage);

                        WrapPanel contentPanel = new WrapPanel();

                        contentPanel.SetValue(Grid.RowProperty, 1);
                        contentPanel.SetValue(Grid.ColumnSpanProperty, 2);
                        grid.Children.Add(contentPanel);

                        for (int i = 0; i < dsList.Count; i++)
                        {
                            List<SystemConfig> itemConfig = ContainerManager.SystemConfigs.GetSystemConfigs(dsList[i]);
                            string name;
                            string bindField;
                            string value;

                            #region 获得配置信息
                            name = itemConfig.Where(t => t.Name == "Name").FirstOrDefault().Value;
                            bindField = itemConfig.Where(t => t.Name == "BindField").FirstOrDefault().Value;
                            value = bindField.IndexOf('.') == -1 ? GetFieldValue(bindField) : GetXMLFieldValue(bindField);

                            #endregion

                            if (i > 2)
                            {
                                TZPanelItem itemControl = new TZPanelItem()
                                {
                                    NameText = name,
                                    ValueText = value,
                                    HorizontalAlignment = HorizontalAlignment.Left,
                                    Margin = new Thickness(0, 5, 5, 0)
                                };

                                contentPanel.Children.Add(itemControl);
                            }
                            else
                            {
                                TextBlock itemControl = new TextBlock()
                                {
                                    Text = value,
                                    HorizontalAlignment = HorizontalAlignment.Left,
                                    Margin = new Thickness(6),
                                    Style = Application.Current.Resources["DefaultTextBlockStyle3"] as Style
                                };
                                topPanel.Children.Add(itemControl);
                            }

                        }
                    }
                    break;
                case "Custom":  //自定义
                    //UIElement customControl = Activator.CreateInstance(Type.GetType(controlName)) as UIElement;
                    //PropertyInfo propInfo = customControl.GetType().GetProperty("MapElement");
                    //propInfo.SetValue(customControl, this._mapElement, null);
                    //this.Content = customControl;
                    break;
            }

            SystemConfig tempBtnItemsConfig = detailsConfig.Where(t => t.Name == "ButtonItems").FirstOrDefault();
            List<SystemConfig> btnItems = ContainerManager.SystemConfigs.GetSystemConfigs(tempBtnItemsConfig);

            foreach (SystemConfig btnItem in btnItems)
            {
                List<SystemConfig> itemPropertys = ContainerManager.SystemConfigs.GetSystemConfigs(btnItem);

                string type = itemPropertys.Where(t => t.Name == "Type").FirstOrDefault().Value;
                string tooltip = itemPropertys.Where(t => t.Name == "Tooltip").FirstOrDefault().Value;
                string imageUrl = itemPropertys.Where(t => t.Name == "ImageUrl").FirstOrDefault().Value;
                string command = itemPropertys.Where(t => t.Name == "Command").FirstOrDefault().Value;

                ConfigHelper.ProcessImageUrl(ref imageUrl);

                Image btn = new Image()
                {
                    Height = 18,
                    Width = 18,
                    Stretch = Stretch.Uniform,
                    Source = new System.Windows.Media.Imaging.BitmapImage(new Uri(imageUrl, UriKind.RelativeOrAbsolute)),
                    Cursor = Cursors.Hand
                };

                if (btnItems.IndexOf(btnItem) > 0)
                {
                    btn.Margin = new Thickness(10, 0, 0, 0);
                }

                switch (type)
                {
                    case "Details":
                        btn.MouseLeftButtonUp += imgDetails_MouseLeftButtonUp;
                        break;
                    case "Playback":
                        btn.MouseLeftButtonUp += imgTrajectory_MouseLeftButtonUp;
                        break;
                    case "Round":
                        btn.MouseLeftButtonUp += imgRound_MouseLeftButtonUp;
                        break;
                    case "Custom":
                        btn.MouseLeftButtonUp += imgDetails_MouseLeftButtonUp;
                        break;
                    case "Cells":
                        btn.MouseLeftButtonUp += imgCells_MouseLeftButtonUp;
                        break;
                    default:
                        break;
                }
                this.buttonItems.Children.Add(btn);
            }




            if (this._mapElement.MapElementCategoryID == 1)
            {
                this.tbLastLocationPanel.Visibility = Visibility.Visible;

                //最后定位时间
                WebAPIHelper dt = new WebAPIHelper();

                dt.GetDataCompleted += (s, args) =>
                {
                    MapElementHisCoord entity = args.DataResult as MapElementHisCoord;

                    if (entity != null)
                    {
                        DateTime nowTime = DateTime.Now;
                        DateTime historyTime = entity.SatelliteTime;
                        TimeSpan ts = nowTime.Subtract(historyTime).Duration();

                        if (ts.TotalMinutes > 0)
                        {
                            if (ts.TotalMinutes <= 60)
                                tbLastLocation.Text = string.Format("{0}分钟前", Convert.ToInt32(ts.TotalMinutes));
                            else if (ts.TotalHours <= 24)
                                tbLastLocation.Text = string.Format("{0}小时前", Convert.ToInt32(ts.TotalHours));
                            else
                                tbLastLocation.Text = string.Format("{0}天前", Convert.ToInt32(ts.TotalDays));
                        }
                    }
                };

                string url = String.Format("api/MapElementHisCoord/GetNew?mapElementCategoryID=1&mapElementID={0}", this._id);

                dt.GetDataAsync<MapElementHisCoord>(url);
            }
            else
            {
                this.tbLastLocationPanel.Visibility = Visibility.Collapsed;
            }
        }

        private void CloseBtn_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            this.OnClosing?.Invoke(this, null);
        }

        private void imgDetails_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            DetailWindow window = new DetailWindow(_mapElement);
            window.Show();
        }
        private void imgCells_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            //BodyContainer BodyContainer = ContainerManager.BodyContainer as BodyContainer;
            //BodyContainer.DrowMap(_mapElement.ID);
        }
        private void imgTrajectory_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            ContainerManager.PlayBackBodyContainer.Visibility = Visibility.Visible;
            ContainerManager.BodyContainer.Visibility = Visibility.Collapsed;

            foreach (WindowBase item in RadWindowManager.Current.GetWindows())
            {
                item.Visibility = Visibility.Collapsed;
            }

            PlayBackBodyContainer pbbcControl = ContainerManager.PlayBackBodyContainer as PlayBackBodyContainer;
            pbbcControl.map.Layers.Clear();
            //pbbcControl.PlayBack(this._mapElement.MapElementCategoryID, _id);

        }

        private void imgRound_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            //FilterWindow window = new FilterWindow()
            //{
            //    Header = "周边筛选",
            //    Content = new RoundFilter(_mapElement)
            //};
            //window.Show();
        }

        public string GetXMLFieldValue(string bindField)
        {
            string value = "";

            string[] strs = bindField.Split('.');
            string fieldName = strs[0];
            string xmlNodeName = strs[1];

            string xmlStr = GetFieldValue(fieldName);

            Dictionary<string, string> xmlDic = XMLHelper.ConvertXMLToDictionary(xmlStr);

            if (xmlDic.Keys.Contains(xmlNodeName))
                value = xmlDic[xmlNodeName];

            return value;
        }

        public string GetFieldValue(string bindField)
        {
            string value = "";
            Type t = this._mapElement.GetType();
            PropertyInfo pi = t.GetProperty(bindField);
            object obj = pi.GetValue(this._mapElement, null);

            if (obj != null)
                value = obj.ToString();

            return value;
        }

    }
}
