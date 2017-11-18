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
    public partial class TZSaveAsBtn : UserControl
    {
        public TZSaveAsBtn()
        {
            InitializeComponent();
        }
        private void LayoutRoot_MouseEnter(object sender, MouseEventArgs e)
        {
            LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xc3, 0xc3, 0xc3));
        }

        private void LayoutRoot_MouseLeave(object sender, MouseEventArgs e)
        {
            LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xdd, 0xdd, 0xdd));
        }

        private void LayoutRoot_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xcc, 0xcc, 0xcc));
        }

        private void LayoutRoot_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xdd, 0xdd, 0xdd));
        }
    }
}
