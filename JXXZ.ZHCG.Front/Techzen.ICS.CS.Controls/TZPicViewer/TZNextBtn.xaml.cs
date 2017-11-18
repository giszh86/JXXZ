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
    public partial class TZNextBtn : UserControl
    {
        public TZNextBtn()
        {
            InitializeComponent();
        }

        public bool IsControlEnable
        {
            get { return (bool)GetValue(IsControlEnableProperty); }
            set { SetValue(IsControlEnableProperty, value); }
        }

        public static readonly DependencyProperty IsControlEnableProperty =
            DependencyProperty.Register("IsControlEnable", typeof(bool), typeof(TZNextBtn),
            new PropertyMetadata(true, (s, e) =>
            {
                TZNextBtn sender = s as TZNextBtn;
                sender.Icon.Fill = sender.IsControlEnable ? new SolidColorBrush(Color.FromArgb(0xFF, 0x47, 0x9d, 0xfa)) :
                    new SolidColorBrush(Color.FromArgb(0xFF, 0xcc, 0xcc, 0xcc));
                sender.LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0x00, 0xd5, 0xd5, 0xd5));
            }));

        private void LayoutRoot_MouseEnter(object sender, MouseEventArgs e)
        {
            if (IsControlEnable)
            {
                LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xd5, 0xd5, 0xd5));
            }
        }

        private void LayoutRoot_MouseLeave(object sender, MouseEventArgs e)
        {
            if (IsControlEnable)
            {
                LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0x00, 0xd5, 0xd5, 0xd5));
            }
        }

        private void LayoutRoot_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (IsControlEnable)
            {
                LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xb8, 0xb8, 0xb8));
            }
        }

        private void LayoutRoot_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            if (IsControlEnable)
            {
                LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xd5, 0xd5, 0xd5));
            }
        }
    }
}