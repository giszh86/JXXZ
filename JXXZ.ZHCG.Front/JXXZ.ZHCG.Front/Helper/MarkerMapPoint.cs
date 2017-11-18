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
    public class MarkerMapPoint : ArcGISMapElement
    {
        private string reservedField1;
        private int v;
        private MapElementPoint _mapElement;

        public int ID { get; set; }

        public MarkerMapPoint(int id, int mapElementCategoryID, string name, Point point, int direction, Map map, ElementLayer mapMarkerLayer)
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
            this.Point = point;
            this.Direction = direction;
            this.MapMarker = img;

            ToolTipService.SetToolTip(this.MapMarker, name);

            this.Map = map;
            this.ElementLayer = mapMarkerLayer;
        }

        public MarkerMapPoint(int iD, string reservedField1, Point point, int v, Map map, ElementLayer elementLayer)
        {
            ID = iD;
            this.reservedField1 = reservedField1;
            Point = point;
            this.v = v;
            Map = map;
            ElementLayer = elementLayer;
        }

        public MarkerMapPoint(MapElementPoint element, int direction, Map map, ElementLayer mapMarkerLayer)
        {
            Image img = new Image()
            {
                Width = 32,
                Height = 37,
                Margin = new Thickness(0, 0, 0, 37),
                Source = new BitmapImage(new Uri(element.Icon, UriKind.RelativeOrAbsolute)),
                Cursor = Cursors.Hand
            };

            this._mapElement = element;
            this.ID = element.ID;
            this.Point = new Point((double)element.X, (double)element.Y);
            this.Direction = direction;
            this.MapMarker = img;

            //ToolTipService.SetToolTip(this.MapMarker, this.Name);

            this.Map = map;
            this.ElementLayer = mapMarkerLayer;
        }
     
       
  

        private void MapInfoPanel_OnClosing(object sender, EventArgs e)
        {
            this.Unselect();
        }
    }
}
