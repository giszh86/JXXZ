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
    public partial class TZPicItem : UserControl
    {
        public EventHandler SelectionChanged;
        public bool IsSelected
        {
            get { return (bool)GetValue(IsSelectedProperty); }
            set { SetValue(IsSelectedProperty, value); }
        }

        public static readonly DependencyProperty IsSelectedProperty =
            DependencyProperty.Register("IsSelected", typeof(bool), typeof(TZPicItem), new PropertyMetadata(false, (s, e) =>
            {
                TZPicItem sender = s as TZPicItem;
                sender.LayoutRoot.Background = new SolidColorBrush((bool)e.NewValue ? Color.FromArgb(0xFF, 0x46, 0x8f, 0xdd) : Color.FromArgb(0x00, 0xb0, 0xca, 0xe6));
                if (sender.SelectionChanged != null)
                {
                    sender.SelectionChanged(sender, new EventArgs());
                }
            }));

        public TZPicItem()
        {
            InitializeComponent();
        }

        private void LayoutRoot_MouseEnter(object sender, MouseEventArgs e)
        {
            if (!this.IsSelected)
            {
                LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xb0, 0xca, 0xe6));
            }
        }

        private void LayoutRoot_MouseLeave(object sender, MouseEventArgs e)
        {
            if (!this.IsSelected)
            {
                LayoutRoot.Background = new SolidColorBrush(Color.FromArgb(0x00, 0xb0, 0xca, 0xe6));
            }
        }
    }
}
