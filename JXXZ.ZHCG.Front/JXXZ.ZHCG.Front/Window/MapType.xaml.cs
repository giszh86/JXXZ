using ESRI.ArcGIS.Client;
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
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class MapType : UserControl
    {

        Storyboard sboardEnter = new Storyboard();
        Storyboard sboardLeave = new Storyboard();
        Map myMap;
        Dictionary<int, Layer> _myMap = new Dictionary<int, Layer>();

        const int ITEM_WIDTH = 88;
        const int ITEM_MARGIN_BACK = 4;

        public MapType()
        {
            InitializeComponent();
        }

        public MapType(Map map)
        {
            InitializeComponent();

            this.myMap = map;

            for (int i = 0; i < map.Layers.Count; i++)
            {
                string type = map.Layers[i].GetType().ToString();
                switch (type)
                {
                    case "ESRI.ArcGIS.Client.GraphicsLayer":
                        break;
                    case "ESRI.ArcGIS.Client.ElementLayer":
                        break;
                    default:
                        _myMap.Add(i, map.Layers[i]);
                        break;
                }
            }

            CreateLayout();
            CreateGridAnimation();
        }

        private void CreateLayout()
        {
            for (int i = 0; i < _myMap.Count; i++)
            {
                byte z = (byte)(i * 30);

                Border mapItem = new Border()
                {
                    BorderBrush = new SolidColorBrush(Color.FromArgb(0, 0, 0, 0)),
                    BorderThickness = new Thickness(2),
                    Height = 50,
                    Width = 80,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    Opacity = 0.2,
                    Margin = new Thickness(ITEM_MARGIN_BACK, ITEM_MARGIN_BACK * 2, ITEM_MARGIN_BACK, ITEM_MARGIN_BACK * 2),
                    Background = new SolidColorBrush(Color.FromArgb(255, 255, z, 0)),
                    Name = "item_" + i
                };

                ColumnDefinition _col = new ColumnDefinition();
                if (i == _myMap.Count - 1)
                {
                    _col.Width = new System.Windows.GridLength(ITEM_WIDTH);
                    this.mapItems.ColumnDefinitions.Add(_col);

                    //mapItem.Margin = new Thickness(ITEM_MARGIN_BACK, ITEM_MARGIN_BACK * 2, ITEM_MARGIN_BACK * 2, ITEM_MARGIN_BACK * 2);
                    mapItem.Opacity = 1;
                    mapItem.Background = new SolidColorBrush(Colors.Yellow);
                    mapItem.HorizontalAlignment = HorizontalAlignment.Right;

                    mapItem.SetValue(Canvas.ZIndexProperty, 10);
                }
                else
                {

                    //if (i == 0)
                    //{
                    //    _col.Width = new System.Windows.GridLength(ITEM_WIDTH + ITEM_MARGIN_BACK);
                    //    mapItem.Margin = new Thickness(ITEM_MARGIN_BACK * 2, ITEM_MARGIN_BACK * 2, ITEM_MARGIN_BACK, ITEM_MARGIN_BACK * 2);
                    //}
                     _col.Width = new GridLength(1, GridUnitType.Star);
                    this.mapItems.ColumnDefinitions.Add(_col);
                    //动画特效，透明
                    DoubleAnimation danima01 = new DoubleAnimation();
                    danima01.SetValue(Storyboard.TargetNameProperty, mapItem.Name);
                    danima01.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("UIElement.Opacity"));
                    danima01.From = 0.2;
                    danima01.To = 1;
                    danima01.Duration = new Duration(TimeSpan.FromSeconds(0.2));
                    sboardEnter.Children.Add(danima01);

                    DoubleAnimation danima02 = new DoubleAnimation();
                    danima02.SetValue(Storyboard.TargetNameProperty, mapItem.Name);
                    danima02.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("UIElement.Opacity"));
                    danima02.From = 1;
                    danima02.To = 0.2;
                    danima02.Duration = new Duration(TimeSpan.FromSeconds(0.2));
                    sboardLeave.Children.Add(danima02);
                }
                mapItem.SetValue(Grid.ColumnProperty, i);
                ImageBrush brush = new ImageBrush()
                {
                    ImageSource = new BitmapImage(new Uri("/Techzen.ICS.CS.Controls;component/Images/logo.png", UriKind.RelativeOrAbsolute))
                };
                mapItem.Background = brush;

                ColorAnimation colorItemEnter = new ColorAnimation();
                colorItemEnter.SetValue(Storyboard.TargetNameProperty, mapItem.Name);
                colorItemEnter.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("(UIElement.BorderBrush).(SolidColorBrush.Color)"));
                colorItemEnter.From = Color.FromArgb(0, 51, 133, 255);
                colorItemEnter.To = Color.FromArgb(200, 51, 133, 255);
                colorItemEnter.Duration = new Duration(TimeSpan.FromSeconds(0.1));
                Storyboard itemEnter = new Storyboard();
                itemEnter.Children.Add(colorItemEnter);
                this.mapItems.Resources.Add("StoryboardItemEnter" + i, itemEnter);

                ColorAnimation colorItemLeave = new ColorAnimation();
                colorItemLeave.SetValue(Storyboard.TargetNameProperty, mapItem.Name);
                colorItemLeave.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("(UIElement.BorderBrush).(SolidColorBrush.Color)"));
                colorItemLeave.From = Color.FromArgb(200, 51, 133, 255);
                colorItemLeave.To = Color.FromArgb(0, 51, 133, 255);
                colorItemLeave.Duration = new Duration(TimeSpan.FromSeconds(0.1));
                Storyboard itemLeave = new Storyboard();
                itemLeave.Children.Add(colorItemLeave);
                this.mapItems.Resources.Add("StoryboardItemLeave" + i, itemLeave);

                mapItem.MouseLeftButtonDown += MapItem_MouseLeftButtonDown;
                mapItem.MouseEnter += (d, e) =>
                {
                    itemEnter.Begin();
                };
                mapItem.MouseLeave += (d, e) =>
                {
                    itemLeave.Begin();
                };
                this.mapItems.Children.Add(mapItem);
            }

        }

        private void CreateGridAnimation()
        {
            int maxwitdh, minWitdh;
            maxwitdh = _myMap.Count * ITEM_WIDTH + ITEM_MARGIN_BACK * 2;
            this.mapItems.Width = minWitdh = ITEM_WIDTH + _myMap.Count * ITEM_MARGIN_BACK * 2;

            //移入特效
            DoubleAnimation danima = new DoubleAnimation();
            danima.SetValue(Storyboard.TargetNameProperty, "mapItems");
            danima.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("UIElement.Width"));
            danima.From = minWitdh;
            danima.To = maxwitdh;
            danima.Duration = new Duration(TimeSpan.FromSeconds(0.2));
            sboardEnter.Children.Add(danima);

            ColorAnimation danima01 = new ColorAnimation();
            danima01.SetValue(Storyboard.TargetNameProperty, "mapItems");
            danima01.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("(UIElement.Background).(SolidColorBrush.Color)"));
            danima01.From = Color.FromArgb(20, 9, 49, 73);
            danima01.To = Color.FromArgb(140, 9, 49, 73);
            danima01.Duration = new Duration(TimeSpan.FromSeconds(0.2));
            sboardEnter.Children.Add(danima01);

            //移出特效
            DoubleAnimation danima1 = new DoubleAnimation();
            danima1.SetValue(Storyboard.TargetNameProperty, "mapItems");
            danima1.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("UIElement.Width"));
            danima1.From = maxwitdh;
            danima1.To = minWitdh;
            danima1.Duration = new Duration(TimeSpan.FromSeconds(0.2));
            sboardLeave.Children.Add(danima1);

            ColorAnimation danima02 = new ColorAnimation();
            danima02.SetValue(Storyboard.TargetNameProperty, "mapItems");
            danima02.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("(UIElement.Background).(SolidColorBrush.Color)"));
            danima02.From = Color.FromArgb(140, 9, 49, 73);
            danima02.To = Color.FromArgb(20, 9, 49, 73);
            danima02.Duration = new Duration(TimeSpan.FromSeconds(0.2));
            sboardLeave.Children.Add(danima02);

            this.mapItems.Resources.Add("Storyboard", sboardEnter);
            this.mapItems.Resources.Add("Storyboard1", sboardLeave);

        }



        private void MapItem_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            Border border = (Border)sender;
            int id = int.Parse(border.Name.Split('_')[1]);
            foreach (var item in _myMap)
            {
                myMap.Layers[item.Key].Visible = false;
            }
            myMap.Layers[id].Visible = true;
        }

        private void gird_MouseEnter(object sender, MouseEventArgs e)
        {
            sboardEnter.Begin();
        }

        private void gird_MouseLeave(object sender, MouseEventArgs e)
        {
            sboardLeave.Begin();
        }
    }
}
