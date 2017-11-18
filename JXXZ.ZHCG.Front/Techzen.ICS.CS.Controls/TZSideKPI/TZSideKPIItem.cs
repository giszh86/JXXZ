using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;

namespace Techzen.ICS.CS.Controls
{
    [TemplatePart(Name = IMAGE, Type = typeof(Image))]
    [TemplatePart(Name = NAME_TEXT_BLOCK, Type = typeof(TextBlock))]
    [TemplatePart(Name = VALUE_TEXT_BLOCK, Type = typeof(TextBlock))]
    public class TZSideKPIItem : Control
    {
        private const string IMAGE = "Image";
        private const string NAME_TEXT_BLOCK = "TitleTextBlock";
        private const string VALUE_TEXT_BLOCK = "ValueTextBlock";

        private Image _image;
        private TextBlock _nameTextBlock;
        private TextBlock _valueTextBlock;

        public static readonly DependencyProperty ImageSourceProperty =
            DependencyProperty.Register("ImageSource", typeof(ImageSource), typeof(TZSideKPIItem), new PropertyMetadata(new System.Windows.Media.Imaging.BitmapImage(new Uri("/Techzen.ICS.CS.Controls;component/Images/IndicatorBoxItem.png", UriKind.RelativeOrAbsolute))));

        public static readonly DependencyProperty TitleProperty =
            DependencyProperty.Register("Title", typeof(string), typeof(TZSideKPIItem), new PropertyMetadata("标题"));

        public static readonly DependencyProperty ValueProperty =
            DependencyProperty.Register("Value", typeof(string), typeof(TZSideKPIItem), new PropertyMetadata("0"));

        public double AniValueProperty
        {
            get { return (double)GetValue(AniValuePropertyProperty); }
            set { SetValue(AniValuePropertyProperty, value); }
        }

        // Using a DependencyProperty as the backing store for AniValueProperty.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty AniValuePropertyProperty =
            DependencyProperty.Register("AniValueProperty", typeof(double), typeof(TZSideKPIItem), new PropertyMetadata(0D,new PropertyChangedCallback(ValueChangeHandle)));


        private static void ValueChangeHandle(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            TZSideKPIItem sender = d as TZSideKPIItem;
            double to = Convert.ToDouble(e.NewValue);
            // 新建动画
            Storyboard storyBoard = new Storyboard();
            DoubleAnimationUsingKeyFrames frame = new DoubleAnimationUsingKeyFrames();
            Storyboard.SetTarget(frame, sender);
            Storyboard.SetTargetProperty(frame, new PropertyPath("TZSideKPIItem.TemplateBoardValue"));
            SplineDoubleKeyFrame splineFrame = new SplineDoubleKeyFrame();
            splineFrame.KeyTime = TimeSpan.FromSeconds(0.7);
            splineFrame.Value = to;
            splineFrame.KeySpline = new KeySpline() { ControlPoint1 = new Point(), ControlPoint2 = new Point(0.5, 1) };

            frame.KeyFrames.Add(splineFrame);
            storyBoard.Children.Add(frame);
            storyBoard.Begin();
        }
        public static readonly DependencyProperty PrecisionProperty =
         DependencyProperty.Register("Precision", typeof(int), typeof(TZSideKPIItem), new PropertyMetadata(0));

        public int Precision
        {
            get { return (int)GetValue(PrecisionProperty); }
            set { SetValue(PrecisionProperty, value); }
        }

        //public string TemplateValue
        //{
        //    get { return (string)GetValue(TemplateValueProperty); }
        //    set { SetValue(TemplateValueProperty, value); }
        //}

        //public static readonly DependencyProperty TemplateValueProperty =
        //    DependencyProperty.Register("TemplateValue", typeof(string), typeof(TZSideKPIItem), new PropertyMetadata("0"));


        public double TemplateBoardValue
        {
            get { return (double)GetValue(TemplateBoardValueProperty); }
            set { SetValue(TemplateBoardValueProperty, value); }
        }

        public static readonly DependencyProperty TemplateBoardValueProperty =
            DependencyProperty.Register("TemplateBoardValue", typeof(double), typeof(TZSideKPIItem), new PropertyMetadata(0D, new PropertyChangedCallback((s, e) =>
            {
                TZSideKPIItem sender = s as TZSideKPIItem;
                double newValue =  Convert.ToDouble(e.NewValue);
                StringBuilder precisionBuilder = new StringBuilder();
                if (sender.Precision > 0)
                {
                    precisionBuilder.Append(".");
                    // 如果经度大于0
                    for (int i = 0; i < sender.Precision; i++)
                    {
                        precisionBuilder.Append("0");
                    }
                }
                string precision = precisionBuilder.ToString();

                sender.Value = newValue > 999
                    ? string.Format("{0:0,00}" + precision, newValue)
                    : newValue.ToString("0" + precision);
            })));

        public TZSideKPIItem()
        {
            this.DefaultStyleKey = typeof(TZSideKPIItem);
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

        public event EventHandler OnValueClick;

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            this._image = base.GetTemplateChild(IMAGE) as Image;
            this._nameTextBlock = base.GetTemplateChild(NAME_TEXT_BLOCK) as TextBlock;
            this._valueTextBlock = base.GetTemplateChild(VALUE_TEXT_BLOCK) as TextBlock;

            if (this._valueTextBlock != null)
            {
                this._valueTextBlock.MouseLeftButtonUp += new MouseButtonEventHandler(ValueTextBlock_MouseLeftButtonUp);
            }
        }

        private void ValueTextBlock_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            this.OnValueClick?.Invoke(sender, e);
        }
    }
}
