using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace Techzen.ICS.CS.Controls
{
    [TemplatePart(Name = IMAGE, Type = typeof(Image))]
    [TemplatePart(Name = TITLE_TEXT_BLOCK, Type = typeof(TextBlock))]
    [TemplatePart(Name = VALUE_TEXT_BLOCK, Type = typeof(TextBlock))]
    public class TZMainKPIItem : Control
    {
        private const string IMAGE = "Image";
        private const string TITLE_TEXT_BLOCK = "TitleTextBlock";
        private const string VALUE_TEXT_BLOCK = "ValueTextBlock";

        private Image _image;
        private TextBlock _titleTextBlock;
        private TextBlock _valueTextBlock;
        
        public static readonly DependencyProperty ImageSourceProperty =
            DependencyProperty.Register("ImageSource", typeof(ImageSource), typeof(TZMainKPIItem), new PropertyMetadata(new System.Windows.Media.Imaging.BitmapImage(new Uri("/Techzen.ICS.CS.Controls;component/Images/Indicator.png", UriKind.RelativeOrAbsolute))));

        public static readonly DependencyProperty TitleProperty =
            DependencyProperty.Register("Title", typeof(string), typeof(TZMainKPIItem), new PropertyMetadata("标题"));

        public static readonly DependencyProperty ValueProperty =
            DependencyProperty.Register("Value", typeof(string), typeof(TZMainKPIItem), new PropertyMetadata("0"));

        public TZMainKPIItem()
        {
            this.DefaultStyleKey = typeof(TZMainKPIItem);
        }

        public ImageSource ImageSource
        {
            get { return (ImageSource)GetValue(ImageSourceProperty); }
            set { SetValue(ImageSourceProperty, value); }
        }

        public string Title
        {
            get { return (string)GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }

        public string Value
        {
            get { return (string)GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }
        
        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            this._image = base.GetTemplateChild(IMAGE) as Image;
            this._titleTextBlock = base.GetTemplateChild(TITLE_TEXT_BLOCK) as TextBlock;
            this._valueTextBlock = base.GetTemplateChild(VALUE_TEXT_BLOCK) as TextBlock;
        }
    }
}
