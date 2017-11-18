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
    public partial class TZPicToolBtn : UserControl
    {
        public event EventHandler LeftBtnClick;
        public event EventHandler RightBtnClick;

        public ImageSource LeftImageSource
        {
            get { return (ImageSource)GetValue(LeftImageSourceProperty); }
            set { SetValue(LeftImageSourceProperty, value); }
        }
        public ImageSource RightImageSource
        {
            get { return (ImageSource)GetValue(RightImageSourceProperty); }
            set { SetValue(RightImageSourceProperty, value); }
        }


        public static readonly DependencyProperty LeftImageSourceProperty =
            DependencyProperty.Register("LeftImageSource", typeof(ImageSource), typeof(TZPicToolBtn), new PropertyMetadata(null, (s, e) =>
            {
                TZPicToolBtn sender = s as TZPicToolBtn;
                sender.LeftImg.Source = (ImageSource)e.NewValue;
            }));

        public static readonly DependencyProperty RightImageSourceProperty =
            DependencyProperty.Register("RightImageSource", typeof(ImageSource), typeof(TZPicToolBtn), new PropertyMetadata(null, (s, e) =>
            {
                TZPicToolBtn sender = s as TZPicToolBtn;
                sender.RightImg.Source = (ImageSource)e.NewValue;
            }));


        public TZPicToolBtn()
        {
            InitializeComponent();
        }

        private void LeftBtn_MouseEnter(object sender, MouseEventArgs e)
        {
            LeftBtn.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xc3, 0xc3, 0xc3));
        }

        private void LeftBtn_MouseLeave(object sender, MouseEventArgs e)
        {
            LeftBtn.Background = new SolidColorBrush(Color.FromArgb(0x00, 0xc3, 0xc3, 0xc3));
        }

        private void LeftBtn_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            LeftBtn.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xcc, 0xcc, 0xcc));
        }

        private void LeftBtn_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            LeftBtn.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xc3, 0xc3, 0xc3));

            if (this.LeftBtnClick != null)
            {
                this.LeftBtnClick(this, new EventArgs());
            }
        }

        private void RightBtn_MouseEnter(object sender, MouseEventArgs e)
        {
            RightBtn.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xc3, 0xc3, 0xc3));
        }

        private void RightBtn_MouseLeave(object sender, MouseEventArgs e)
        {
            RightBtn.Background = new SolidColorBrush(Color.FromArgb(0x00, 0xc3, 0xc3, 0xc3));
        }

        private void RightBtn_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            RightBtn.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xcc, 0xcc, 0xcc));
        }

        private void RightBtn_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            RightBtn.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xc3, 0xc3, 0xc3));

            if (this.RightBtnClick != null)
            {
                this.RightBtnClick(this, new EventArgs());
            }
        }
    }
}