using ESRI.ArcGIS.Client;
using JXXZ.ZHCG.Front.Window;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Imaging;
using Techzen.ArcGIS.Client;
using Techzen.ICS.PublicModel;

namespace JXXZ.ZHCG.Front.Helper
{
    public class MarkerMapElement : ArcGISMapElement
    {
        private string reservedField1;
        private int v;
        private MapElement _mapElement;

        public int ID { get; set; }
        public int MapElementCategoryID { get; set; }
        public string Name { get; set; }

        public MarkerMapElement(int id, int mapElementCategoryID, string name, Point point, int direction, Map map, ElementLayer mapMarkerLayer)
        {
            Image img = new Image()
            {
                Width = 32,
                Height = 37,
                Margin = new Thickness(0, 0, 0, 37),
                Source = new BitmapImage(new Uri(@"/Techzen.ICS.CS;component/Images/location_event_icon.png", UriKind.RelativeOrAbsolute)),
                Cursor = Cursors.Hand
            };

            switch (mapElementCategoryID)
            {
                case 1:
                    img.Source = new BitmapImage(new Uri(@"/Techzen.ICS.CS;component/Images/location_person_icon.png", UriKind.RelativeOrAbsolute));
                    break;
                case 2:
                    img.Source = new BitmapImage(new Uri(@"/Techzen.ICS.CS;component/Images/location_car_icon.png", UriKind.RelativeOrAbsolute));
                    break;
                case 3:
                    img.Source = new BitmapImage(new Uri(@"/Techzen.ICS.CS;component/Images/location_monitor_icon.png", UriKind.RelativeOrAbsolute));
                    break;
                case 4:
                    img.Source = new BitmapImage(new Uri(@"/Techzen.ICS.CS;component/Images/location_event_icon.png", UriKind.RelativeOrAbsolute));
                    break;
                case 5:
                    img.Source = new BitmapImage(new Uri(@"/Techzen.ICS.CS;component/Images/location_shop_icon.png", UriKind.RelativeOrAbsolute));
                    break;
                default:
                    break;
            }

            this.ID = id;
            this.MapElementCategoryID = mapElementCategoryID;
            this.Name = name;
            this.Point = point;
            this.Direction = direction;
            this.MapMarker = img;

            ToolTipService.SetToolTip(this.MapMarker, name);

            this.Map = map;
            this.ElementLayer = mapMarkerLayer;
        }

        public MarkerMapElement(int iD, string reservedField1, Point point, int v, Map map, ElementLayer elementLayer)
        {
            ID = iD;
            this.reservedField1 = reservedField1;
            Point = point;
            this.v = v;
            Map = map;
            ElementLayer = elementLayer;
        }

        public MarkerMapElement(MapElement element, int direction, Map map, ElementLayer mapMarkerLayer)
        {
            Image img = new Image()
            {
                Width = 32,
                Height = 37,
                Margin = new Thickness(0, 0, 0, 37),
                Source = new BitmapImage(new Uri(GetIconUrl(element), UriKind.RelativeOrAbsolute)),
                Cursor = Cursors.Hand
            };

            this._mapElement = element;
            this.ID = element.ID;
            this.MapElementCategoryID = (int)element.MapElementCategoryID;
            this.Name = element.ReservedField1;
            this.Point = new Point((double)element.X, (double)element.Y);
            this.Direction = direction;
            this.MapMarker = img;

            ToolTipService.SetToolTip(this.MapMarker, this.Name);

            this.Map = map;
            this.ElementLayer = mapMarkerLayer;
        }
        public MarkerMapElement(MapElement element, int direction, Map map, ElementLayer mapMarkerLayer,Dictionary<int,Image> imglist)
        {
            this._mapElement = element;
            this.ID = element.ID;
            this.MapElementCategoryID = (int)element.MapElementCategoryID;
            this.Name = element.ReservedField1;
            this.Point = new Point((double)element.X, (double)element.Y);
            this.Direction = direction;
            if (element.MapElementCategoryID != 4)
            {
                this.MapMarker = new Image()
                {
                    Width = 32,
                    Height = 37,
                    Margin = new Thickness(0, 0, 0, 37),
                    Source = imglist[_mapElement.MapElementBizTypeID.Value].Source,
                    Cursor = Cursors.Hand
                };
            }
            else
            {
                this.MapMarker = new Image()
                {
                    Width = 32,
                    Height = 37,
                    Margin = new Thickness(0, 0, 0, 37),
                    Source = imglist[_mapElement.ReservedField8.Value].Source,
                    Cursor = Cursors.Hand
                };

            }

            ToolTipService.SetToolTip(this.MapMarker, this.Name);

            this.Map = map;
            this.ElementLayer = mapMarkerLayer;
        }
        /// <summary>
        /// 获取到图片路径
        /// </summary>
        /// <param name="element"></param>
        /// <returns></returns>
        private string GetIconUrl(MapElement element)
        {
            List<SystemConfig> configList = new List<SystemConfig>();
            List<SystemConfig> columnConfig = new List<SystemConfig>();
            ConfigHelper.GetSystemConfigColumn("02", element.MapElementCategoryID, "MapIcons", ref configList, ref columnConfig);

            foreach (SystemConfig column in columnConfig)
            {
                List<SystemConfig> mapIcon = configList.Where(t => t.ParentCode == column.Code).ToList();

                string iconSource = mapIcon.Where(t => t.Name == "IconSource").FirstOrDefault().Value;
                int mapElementBizTypeID = int.Parse(mapIcon.Where(t => t.Name == "MapElementBizType").FirstOrDefault().Value);
                //int mapElementDeviceTypeID = int.Parse(mapIcon.Where(t => t.Name == "MapElementDeviceType").FirstOrDefault().Value);

                element.MapElementBizTypeID = element.MapElementBizTypeID == null ? 0 : element.MapElementBizTypeID;
                element.MapElementDeviceTypeID = element.MapElementDeviceTypeID == null ? 0 : element.MapElementDeviceTypeID;
                if (element.MapElementCategoryID == 4) {
                    return HttpHelper.GetVirtualPath()+"";
                }
                if (mapElementBizTypeID == element.MapElementBizTypeID)
                {
                    string iconUrl = "";
                    switch (iconSource)
                    {
                        case "Database":
                            iconUrl = element.Avatar;
                            break;
                        case "Http":
                            iconUrl = mapIcon.Where(t => t.Name == "IconUrl").FirstOrDefault().Value;
                            break;
                        default:
                            break;
                    }

                    if (string.IsNullOrEmpty(iconUrl))
                        iconUrl = "/Techzen.ICS.CS;component/Images/default_picture.jpg";
                    else
                        ConfigHelper.ProcessImageUrl(ref iconUrl);

                    return iconUrl;
                }
            }
            return @"/Techzen.ICS.CS;component/Images/location_event_icon.png";
        }

        //protected override FrameworkElement GetMapInfoPanel()
        //{
        //    MapInfoPanel m = new MapInfoPanel(_mapElement)
        //    {
        //        Margin = new Thickness(305, 109, 0, 0)
        //    };

        //    m.OnClosing += MapInfoPanel_OnClosing;

        //    return m;


        //}

        private void MapInfoPanel_OnClosing(object sender, EventArgs e)
        {
            this.Unselect();
        }
    }
}
