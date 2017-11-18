using JXXZ.ZHCG.Front.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using Techzen.ICS.CS.Controls;
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;

namespace JXXZ.ZHCG.Front.Window
{
    public class DetailWindow : RadWindow
    {
        private MapElement _mapElement;

        public DetailWindow()
        {
            this.Width = 550;
            this.Height = 338;
            this.WindowStartupLocation = Telerik.Windows.Controls.WindowStartupLocation.CenterScreen;
            this.ResizeMode = ResizeMode.NoResize;
            this.Opacity = 0.95;
            this.Style = Application.Current.Resources["RadWindowStyle"] as Style;
        }

        public DetailWindow(MapElement mapElement)
        {
            this.Width = 550;
            this.Height = 338;
            this.WindowStartupLocation = Telerik.Windows.Controls.WindowStartupLocation.CenterScreen;
            this.ResizeMode = ResizeMode.NoResize;
            this.Opacity = 0.95;
            this.Style = Application.Current.Resources["RadWindowStyle"] as Style;

            this._mapElement = mapElement;
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            if (this._mapElement == null)
                return;
            
            List<SystemConfig> detailsConfigs = ContainerManager.SystemConfigs.GetMapElementConfigs(this._mapElement.MapElementCategoryID, "DetailsWindow");
            
            MapElementCategorie mecEntity;
            string controlMode;
            string controlName;
            string displayMode;

            #region 获得配置信息
            //获得元素种类信息
            mecEntity = ContainerManager.MapElementCategorys.Where(t => t.ID == this._mapElement.MapElementCategoryID).FirstOrDefault();

            controlMode = detailsConfigs.Where(t => t.Name == "ControlMode").FirstOrDefault().Value;
            controlName = detailsConfigs.Where(t => t.Name == "ControlName").FirstOrDefault().Value;
            displayMode = detailsConfigs.Where(t => t.Name == "DisplayMode").FirstOrDefault().Value;

            #endregion

            //标题
            this.Header = mecEntity.Name + "详情";

            //控件模式
            switch (controlMode)
            {
                case "Auto":    //自动生成
                    SystemConfig itemsConfig = detailsConfigs.Where(t => t.Name == "Items").FirstOrDefault();
                    List<SystemConfig> itemList = ContainerManager.SystemConfigs.GetSystemConfigs(itemsConfig);

                    if (displayMode == "Data")
                    {
                        #region 数据显示模式
                        //创建详情面板
                        Grid grid = new Grid()
                        {
                            Margin = new Thickness(0, 0, 0, 8)
                        };

                        grid.RowDefinitions.Add(new RowDefinition() { Height = new GridLength(60, GridUnitType.Pixel) });
                        grid.RowDefinitions.Add(new RowDefinition() { Height = new GridLength(1, GridUnitType.Pixel) });
                        grid.RowDefinitions.Add(new RowDefinition() { Height = new GridLength(1, GridUnitType.Star) });

                        this.Content = grid;

                        TextBlock topTextBlock = new TextBlock()
                        {
                            Margin = new Thickness(10, 0, 0, 0),
                            FontSize = 20,
                            Foreground = new SolidColorBrush(Colors.Orange),
                            HorizontalAlignment = HorizontalAlignment.Left,
                            VerticalAlignment = VerticalAlignment.Center
                        };
                        topTextBlock.SetValue(Grid.RowProperty, 0);

                        grid.Children.Add(topTextBlock);

                        Grid lineGrid = new Grid()
                        {
                            Background = new SolidColorBrush(Colors.Gray)
                        };
                        lineGrid.SetValue(Grid.RowProperty, 1);

                        grid.Children.Add(lineGrid);

                        WrapPanel contentPanel = new WrapPanel()
                        {
                            HorizontalAlignment = HorizontalAlignment.Stretch,
                            VerticalAlignment = VerticalAlignment.Top,
                            Margin = new Thickness(5, 0, 0, 0)
                        };
                        contentPanel.SetValue(Grid.RowProperty, 2);

                        grid.Children.Add(contentPanel);

                        for (int i = 0; i < itemList.Count; i++)
                        {
                            List<SystemConfig> itemConfigs = ContainerManager.SystemConfigs.GetSystemConfigs(itemList[i]);
                            string name;
                            string bindField;
                            string value;
                            double? width = null;
                            double? height = null;

                            #region 获得配置信息
                            name = itemConfigs.Where(t => t.Name == "Name").FirstOrDefault().Value;
                            bindField = itemConfigs.Where(t => t.Name == "BindField").FirstOrDefault().Value;
                            value = bindField.IndexOf('.') == -1 ? ConfigHelper.GetFieldValue(this._mapElement, bindField) : ConfigHelper.GetXMLFieldValue(this._mapElement, bindField);

                            string strWidth = itemConfigs.Where(t => t.Name == "Width").FirstOrDefault().Value;

                            if (!string.IsNullOrEmpty(strWidth))
                                width = Convert.ToInt32(strWidth);

                            string strHeight = itemConfigs.Where(t => t.Name == "Height").FirstOrDefault().Value;

                            if (!string.IsNullOrEmpty(strHeight))
                                height = Convert.ToInt32(strHeight);
                            #endregion

                            if (i == 0)
                            {
                                topTextBlock.Text = value;
                            }
                            else
                            {
                                TZPanelItem itemControl = new TZPanelItem()
                                {
                                    NameText = name,
                                    ValueText = value,
                                    Margin = new Thickness(0, 0, 5, 0),
                                    HorizontalAlignment = HorizontalAlignment.Left
                                };

                                if (width != null)
                                    itemControl.Width = (double)width;

                                if (height != null)
                                    itemControl.Height = (double)height;

                                contentPanel.Children.Add(itemControl);
                            }
                        }
                        #endregion
                    }
                    else if (displayMode == "Avatar")
                    {
                        #region 头像显示模式
                        //创建详情面板
                        Grid grid = new Grid()
                        {
                            Margin = new Thickness(5, 8, 0, 8)
                        };

                        grid.RowDefinitions.Add(new RowDefinition() { Height = new GridLength(100, GridUnitType.Pixel) });
                        grid.RowDefinitions.Add(new RowDefinition() { Height = new GridLength(1, GridUnitType.Star) });

                        grid.ColumnDefinitions.Add(new ColumnDefinition() { Width = new GridLength(5, GridUnitType.Star) });
                        grid.ColumnDefinitions.Add(new ColumnDefinition() { Width = new GridLength(5, GridUnitType.Star) });

                        this.Content = grid;


                        StackPanel topPanel = new StackPanel()
                        {
                            VerticalAlignment = VerticalAlignment.Center
                        };

                        topPanel.SetValue(Grid.RowProperty, 0);
                        topPanel.SetValue(Grid.ColumnProperty, 1);
                        grid.Children.Add(topPanel);

                        //创建头像
                        Image avatarImage = new Image()
                        {
                            Stretch = Stretch.Uniform,
                            HorizontalAlignment = HorizontalAlignment.Left,
                            Margin = new Thickness(0, 0, 5, 0)
                        };

                        string imageUrl = this._mapElement.Avatar;

                        if (string.IsNullOrEmpty(imageUrl))
                            imageUrl = "/Techzen.ICS.CS;component/Images/default_picture.jpg";
                        else
                            ConfigHelper.ProcessImageUrl(ref imageUrl);

                        avatarImage.Source = new System.Windows.Media.Imaging.BitmapImage(new Uri(imageUrl, UriKind.RelativeOrAbsolute));

                        avatarImage.SetValue(Grid.RowProperty, 0);
                        avatarImage.SetValue(Grid.ColumnProperty, 0);
                        grid.Children.Add(avatarImage);

                        WrapPanel contentPanel = new WrapPanel();

                        contentPanel.SetValue(Grid.RowProperty, 1);
                        contentPanel.SetValue(Grid.ColumnSpanProperty, 2);
                        grid.Children.Add(contentPanel);

                        for (int i = 0; i < itemList.Count; i++)
                        {
                            List<SystemConfig> itemConfigs = ContainerManager.SystemConfigs.GetSystemConfigs(itemList[i]);
                            string name;
                            string bindField;
                            string value;
                            double? width = null;
                            double? height = null;

                            #region 获得配置信息
                            name = itemConfigs.Where(t => t.Name == "Name").FirstOrDefault().Value;
                            bindField = itemConfigs.Where(t => t.Name == "BindField").FirstOrDefault().Value;
                            value = bindField.IndexOf('.') == -1 ? ConfigHelper.GetFieldValue(this._mapElement, bindField) : ConfigHelper.GetXMLFieldValue(this._mapElement, bindField);

                            string strWidth = itemConfigs.Where(t => t.Name == "Width").FirstOrDefault().Value;

                            if (!string.IsNullOrEmpty(strWidth))
                                width = Convert.ToInt32(strWidth);

                            string strHeight = itemConfigs.Where(t => t.Name == "Height").FirstOrDefault().Value;

                            if (!string.IsNullOrEmpty(strHeight))
                                height = Convert.ToInt32(strHeight);
                            #endregion

                            TZPanelItem itemControl = new TZPanelItem()
                            {
                                NameText = name,
                                ValueText = value,
                                HorizontalAlignment = HorizontalAlignment.Left,
                                Margin = new Thickness(0, 0, 5, 0)
                            };

                            if (width != null)
                                itemControl.Width = (double)width;

                            if (height != null)
                                itemControl.Height = (double)height;

                            if (i < 3)
                                topPanel.Children.Add(itemControl);
                            else
                                contentPanel.Children.Add(itemControl);
                        } 
                        #endregion
                    }
                    break;
                case "Custom":  //自定义
                    UIElement customControl = Activator.CreateInstance(Type.GetType(controlName)) as UIElement;
                    PropertyInfo propInfo = customControl.GetType().GetProperty("MapElement");
                    propInfo.SetValue(customControl, this._mapElement, null);
                    this.Content = customControl;
                    break;
            }
        }
    }
}
