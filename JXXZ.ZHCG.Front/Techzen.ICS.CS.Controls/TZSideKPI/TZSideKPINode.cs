using System;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;

namespace Techzen.ICS.CS.Controls
{
    [TemplatePart(Name = TOP_GRID, Type = typeof(Grid))]
    public class TZSideKPINode : ItemsControl
    {
        private const string TOP_GRID = "TopGrid";
        
        private Grid _topGrid;

        public static readonly DependencyProperty ImageSourceProperty =
            DependencyProperty.Register("ImageSource", typeof(ImageSource), typeof(TZSideKPINode), new PropertyMetadata(new System.Windows.Media.Imaging.BitmapImage(new Uri("/Techzen.ICS.CS.Controls;component/Images/IndicatorBox_Icon.png", UriKind.RelativeOrAbsolute))));

        public static readonly DependencyProperty TitleProperty =
            DependencyProperty.Register("Title", typeof(string), typeof(TZSideKPINode), new PropertyMetadata("标题"));

        public static readonly DependencyProperty ValueProperty =
            DependencyProperty.Register("Value", typeof(string), typeof(TZSideKPINode), new PropertyMetadata("0"));

        public double AniValueProperty
        {
            get { return (double)GetValue(AniValuePropertyProperty); }
            set { SetValue(AniValuePropertyProperty, value); }
        }

        // Using a DependencyProperty as the backing store for AniValueProperty.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty AniValuePropertyProperty =
            DependencyProperty.Register("AniValueProperty", typeof(double), typeof(TZSideKPINode), new PropertyMetadata(0D, new PropertyChangedCallback(ValueChangeHandle)));


        private static void ValueChangeHandle(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            TZSideKPINode sender = d as TZSideKPINode;
            double to = Convert.ToDouble(e.NewValue);
            // 新建动画
            Storyboard storyBoard = new Storyboard();
            DoubleAnimationUsingKeyFrames frame = new DoubleAnimationUsingKeyFrames();
            Storyboard.SetTarget(frame, sender);
            Storyboard.SetTargetProperty(frame, new PropertyPath("TZSideKPINode.TemplateBoardValue"));
            SplineDoubleKeyFrame splineFrame = new SplineDoubleKeyFrame();
            splineFrame.KeyTime = TimeSpan.FromSeconds(0.7);
            splineFrame.Value = to;
            splineFrame.KeySpline = new KeySpline() { ControlPoint1 = new Point(), ControlPoint2 = new Point(0.5, 1) };

            frame.KeyFrames.Add(splineFrame);
            storyBoard.Children.Add(frame);
            storyBoard.Begin();
        }
        public static readonly DependencyProperty PrecisionProperty =
         DependencyProperty.Register("Precision", typeof(int), typeof(TZSideKPINode), new PropertyMetadata(0));

        public int Precision
        {
            get { return (int)GetValue(PrecisionProperty); }
            set { SetValue(PrecisionProperty, value); }
        }

        public double TemplateBoardValue
        {
            get { return (double)GetValue(TemplateBoardValueProperty); }
            set { SetValue(TemplateBoardValueProperty, value); }
        }

        public static readonly DependencyProperty TemplateBoardValueProperty =
            DependencyProperty.Register("TemplateBoardValue", typeof(double), typeof(TZSideKPINode), new PropertyMetadata(0D, new PropertyChangedCallback((s, e) =>
            {
                TZSideKPINode sender = s as TZSideKPINode;
                double newValue = Convert.ToDouble(e.NewValue);
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

        public TZSideKPINode()
        {
            this.DefaultStyleKey = typeof(TZSideKPINode);
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

        public event MouseButtonEventHandler OnTopGridClick;

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();
            
            this._topGrid = base.GetTemplateChild(TOP_GRID) as Grid;

            if (this._topGrid != null)
            {
                this._topGrid.MouseLeftButtonUp += new MouseButtonEventHandler(TopGrid_MouseLeftButtonUp);

                if (this.OnTopGridClick != null)
                    this._topGrid.Cursor = Cursors.Hand;
            }
        }

        private void TopGrid_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            this.OnTopGridClick?.Invoke(sender, e);
        }
    }
}
