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

namespace Techzen.ICS.CS.Controls
{
    /// <summary>
    /// 导航栏按钮
    /// </summary>
    public class TZNaviMenuItem : RadioButton
    {

        private const string NAVI_TEXT_BLOCK_NAME = "naviTextBlock";
        private const string NAVI_IMAGE_NAME = "naviImage";
        private const string NAVI_ICON_NAME = "naviIcon";
        private const string BORDER_BTN_NAME = "borderBtn";
        
        private TextBlock _naviTextBlock;
        private Image _naviImage;
        private TextBlock _naviIcon;
        private Border _borderBtn;

        public string Text
        {
            get
            {
                return (string)GetValue(TextProperty);
            }
            set
            {
                SetValue(TextProperty, value);
            }
        }

        public static DependencyProperty TextProperty = DependencyProperty.Register(
                "Text",
                typeof(string),
                typeof(TZNaviMenuItem),
                new PropertyMetadata("按钮内容"));

        public string ImageSource
        {
            get { return (string)GetValue(ImageSourceProperty); }
            set { SetValue(ImageSourceProperty, value); }
        }

        public static readonly DependencyProperty ImageSourceProperty = DependencyProperty.Register(
            "ImageSource",
            typeof(string),
            typeof(TZNaviMenuItem),
            new PropertyMetadata(null, (d, e) =>
            {
                TZNaviMenuItem naviButton = (TZNaviMenuItem)d;
                if (naviButton._naviImage != null)
                {
                    naviButton._naviImage.Source = new System.Windows.Media.Imaging.BitmapImage(new Uri(e.NewValue.ToString(), UriKind.RelativeOrAbsolute));
                }
            })
        );

        public string Icon
        {
            get
            {
                return (string)GetValue(IconProperty);
            }
            set
            {
                SetValue(IconProperty, value);
            }
        }

        public static readonly DependencyProperty IconProperty = DependencyProperty.Register(
            "Icon",
            typeof(string),
            typeof(TZNaviMenuItem),
            new PropertyMetadata(null)
        );

        public TZNaviMenuItem()
        {
            this.DefaultStyleKey = typeof(TZNaviMenuItem);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();
            _naviTextBlock = base.GetTemplateChild(NAVI_TEXT_BLOCK_NAME) as TextBlock;
            _naviImage = base.GetTemplateChild(NAVI_IMAGE_NAME) as Image;
            _naviIcon = base.GetTemplateChild(NAVI_ICON_NAME) as TextBlock;
            _borderBtn = base.GetTemplateChild(BORDER_BTN_NAME) as Border;
            if (_naviIcon.Text.Equals(""))
            {
                _naviIcon.Visibility = Visibility.Collapsed;
            }
            else
            {
                _naviImage.Visibility = Visibility.Collapsed;
            }
        }
        
    }
}
