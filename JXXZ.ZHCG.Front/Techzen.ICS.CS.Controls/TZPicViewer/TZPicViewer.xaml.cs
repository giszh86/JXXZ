using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Browser;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Techzen.ICS.CS.Controls
{
    public partial class TZPicViewer : UserControl
    {
        private const double ShrinkRate = 0.618;
        private const double EnlargeRate = 1.382;
        private double _rotation = 0;
        private int _selectedIndex = -1; //当前选中图片索引
        private TZPicItem _selectedTZPicItem = null; //当前选中图片

        /// <summary>
        /// 图片Sources列表
        /// </summary>
        public List<ImageSource> ItemsSources
        {
            get { return (List<ImageSource>)GetValue(ItemsSourcesProperty); }
            set { SetValue(ItemsSourcesProperty, value); }
        }

        public static readonly DependencyProperty ItemsSourcesProperty = DependencyProperty.Register("ItemsSources", typeof(List<ImageSource>), typeof(TZPicViewer), new PropertyMetadata(null, (s, e) =>
        {
            TZPicViewer sender = s as TZPicViewer;
            sender.UpdateView();
        }));

        public TZPicViewer()
        {
            InitializeComponent();
        }

        private void ImageListCanvas_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            RectangleGeometry clip = new RectangleGeometry();
            clip.Rect = new Rect(0, 0, ImageListCanvas.ActualWidth - 3, ImageListCanvas.ActualHeight);
            ImageListCanvas.Clip = clip;
        }

        private void ImageScrollViewer_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            RectangleGeometry clip = new RectangleGeometry();
            clip.Rect = new Rect(0, 0, ImageScrollViewer.ActualWidth, ImageScrollViewer.ActualHeight);
            ImageScrollViewer.Clip = clip;
        }

        private void ImageStackPanel_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            RectangleGeometry clip = new RectangleGeometry();
            clip.Rect = new Rect(0, 0, ImageStackPanel.ActualWidth, ImageStackPanel.ActualHeight);
            ImageStackPanel.Clip = clip;
        }

        private void ImageGrid_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            RectangleGeometry clip = new RectangleGeometry();
            clip.Rect = new Rect(0, 0, ImageGrid.ActualWidth, ImageGrid.ActualHeight);
            ImageGrid.Clip = clip;
        }

        private void TopTZNextBtn_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            int newIndex = _selectedIndex < 0 ? (ItemsSources.Count > 0 ? ItemsSources.Count - 1 : -1) : (_selectedIndex + ItemsSources.Count - 1) % ItemsSources.Count;
            if (_selectedTZPicItem != null)
            {
                _selectedTZPicItem.IsSelected = false;
            }
            if (newIndex < 0) { return; }
            _selectedTZPicItem = ImageListSubCanvas.Children[newIndex] as TZPicItem;
            (ImageListSubCanvas.Children[newIndex] as TZPicItem).IsSelected = true;
        }

        private void BottomTZNextBtn_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            int newIndex = _selectedIndex < 0 ? (ItemsSources.Count > 0 ? 0 : -1) : (_selectedIndex + 1) % ItemsSources.Count;
            if (_selectedTZPicItem != null)
            {
                _selectedTZPicItem.IsSelected = false;
            }
            if (newIndex < 0) { return; }
            _selectedTZPicItem = ImageListSubCanvas.Children[newIndex] as TZPicItem;
            (ImageListSubCanvas.Children[newIndex] as TZPicItem).IsSelected = true;
        }

        private void FlipPtb_LeftBtnClick(object sender, EventArgs e)
        {
            PlaneProjection projection = ShowImage.Projection as PlaneProjection;
            projection.RotationY = projection.RotationY == 180 ? 0 : 180;
        }

        private void FlipPtb_RightBtnClick(object sender, EventArgs e)
        {
            PlaneProjection projection = ShowImage.Projection as PlaneProjection;
            projection.RotationX = projection.RotationX == 180 ? 0 : 180;
        }

        private void ZoomPtb_LeftBtnClick(object sender, EventArgs e)
        {
            ZoomImage(EnlargeRate);
        }

        private void ZoomPtb_RightBtnClick(object sender, EventArgs e)
        {
            ZoomImage(ShrinkRate);
        }

        private void RotatePtb_LeftBtnClick(object sender, EventArgs e)
        {
            InitShowImageSize();

            CompositeTransform trans = ShowImage.RenderTransform as CompositeTransform;
            _rotation = (trans.Rotation + 90) % 360;
            
            trans.Rotation = _rotation;
            showImageStory.Begin();
        }

        private void RotatePtb_RightBtnClick(object sender, EventArgs e)
        {
            InitShowImageSize();

            CompositeTransform trans = ShowImage.RenderTransform as CompositeTransform;
            _rotation = (trans.Rotation - 90 + 360) % 360;

            trans.Rotation = _rotation;
            showImageStory.Begin();
        }

        private void ShowImage_MouseWheel(object sender, MouseWheelEventArgs e)
        {
            if (e.Delta > 0)
            {
                ZoomImage(EnlargeRate);
            }
            else
            {
                ZoomImage(ShrinkRate);
            }
        }

        private void ShowImage_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            Image img = sender as Image;
            string url = (img.Source as BitmapImage).UriSource.AbsoluteUri;
            HtmlWindow html = HtmlPage.Window;
            html.Navigate(new Uri(url, UriKind.RelativeOrAbsolute), "_blank");
        }

        //更新视图
        private void UpdateView()
        {
            if (ItemsSources != null)
            {
                int length = ItemsSources.Count;
                //初始化画布
                Canvas.SetTop(ImageListSubCanvas, 0);
                ImageListSubCanvas.Children.Clear();

                //循环向画布中添加图片
                for (int i = 0; i < length; i++)
                {
                    //初始化图片
                    TZPicItem TZPicItem = new TZPicItem { Width = 83, Height = 83 };
                    TZPicItem.PicImage.Source = ItemsSources[i];
                    TZPicItem.Tag = i;

                    //设置图片位置
                    Canvas.SetTop(TZPicItem, i * TZPicItem.Height);

                    //添加图片SelectionChanged事件
                    TZPicItem.SelectionChanged += (s, e) =>
                    {
                        TZPicItem sender = s as TZPicItem;
                        if (!sender.IsSelected) { return; }

                        //更新当前选中图片索引
                        _selectedIndex = int.Parse(TZPicItem.Tag.ToString());

                        //让选中的图片移动到中间
                        // 计算要移动的位移
                        double offset = (double.Parse(TZPicItem.Tag.ToString()) + 0.5) * TZPicItem.ActualHeight - ImageListCanvas.ActualHeight / 2;
                        offset = offset > 0 ? offset : 0;

                        //动画移动
                        Storyboard moveStory = new Storyboard();
                        DoubleAnimation animation = new DoubleAnimation();
                        animation.To = -offset;
                        animation.Duration = new Duration(new TimeSpan(0, 0, 0, 0, 300));
                        Storyboard.SetTarget(animation, ImageListSubCanvas);
                        Storyboard.SetTargetProperty(animation, new PropertyPath("(Canvas.Top)"));
                        moveStory.Children.Add(animation);
                        moveStory.Begin();

                        //初始化变换
                        CompositeTransform trans = ShowImage.RenderTransform as CompositeTransform;
                        trans.Rotation = _rotation = 0;

                        //初始化图片大小
                        InitShowImageSize();

                        ShowImage.Source = TZPicItem.PicImage.Source;
                        showImageStory.Begin();
                    };

                    //添加图片MouseLeftButtonUp事件
                    TZPicItem.MouseLeftButtonUp += (s, e) =>
                    {
                        if (_selectedTZPicItem != null)
                        {
                            _selectedTZPicItem.IsSelected = false;
                        }
                        _selectedTZPicItem = TZPicItem;
                        TZPicItem.IsSelected = true;
                        TZPicItem.Cursor = Cursors.Hand;
                    };

                    //把图片添加到画布中
                    ImageListSubCanvas.Children.Add(TZPicItem);

                    //设置默认选中参数
                    if (length > 0)
                    {
                        _selectedIndex = 0;
                        _selectedTZPicItem = (ImageListSubCanvas.Children[0] as TZPicItem);
                        _selectedTZPicItem.IsSelected = true;
                    }
                }
            }
        }

        // 初始图片显示大小
        private void InitShowImageSize()
        {
            //隐藏滚动条
            ImageScrollViewer.HorizontalScrollBarVisibility = ScrollBarVisibility.Hidden;
            ImageScrollViewer.VerticalScrollBarVisibility = ScrollBarVisibility.Hidden;

            //根据控件大小显示大图片，并调用动画
            ImageStackPanel.Height = ActualHeight - 32;
            ImageStackPanel.Width = ActualWidth - 97;
            ImageGrid.Height = ActualHeight - 40;
            ImageGrid.Width = ActualWidth - 100;
            ShowImage.ClearValue(Image.WidthProperty);
            ShowImage.ClearValue(Image.HeightProperty);
        }

        //图片缩放
        private void ZoomImage(double rate)
        {
            double maxWidth = ActualHeight - 100;
            double maxHeight = ActualWidth - 32;

            //计算图片缩放后高宽
            double width = ShowImage.ActualWidth * rate;
            double height = ShowImage.ActualHeight * rate;

            ShowImage.Width = width;
            ShowImage.Height = height;
            ImageGrid.Width = width;
            ImageGrid.Height = height;

            ImageStackPanel.Width = width > maxWidth ? width : maxWidth;
            ImageStackPanel.Height = height > maxHeight ? height : maxHeight;

            if (width > maxWidth || height > maxHeight)
            {
                //显示滚动条
                ImageScrollViewer.HorizontalScrollBarVisibility = ScrollBarVisibility.Visible;
                ImageScrollViewer.VerticalScrollBarVisibility = ScrollBarVisibility.Visible;
            }
            else
            {
                ImageScrollViewer.HorizontalScrollBarVisibility = ScrollBarVisibility.Hidden;
                ImageScrollViewer.VerticalScrollBarVisibility = ScrollBarVisibility.Hidden;
            }
            showImageStory.Begin();
        }
    }
}
