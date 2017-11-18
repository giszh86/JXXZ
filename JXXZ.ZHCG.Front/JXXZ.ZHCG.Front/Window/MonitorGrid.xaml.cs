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
using Techzen.ICS.CS.Controls;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class MonitorGrid : UserControl
    {
        public MonitorGrid()
        {
            InitializeComponent();

            btnJK.MouseLeftButtonUp += BtnJK_MouseLeftButtonUp;
            btnZT.MouseLeftButtonUp += BtnZT_MouseLeftButtonUp;

            

            

        }

        private void BtnZT_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            btnJK.Background = new SolidColorBrush(Colors.Transparent);
            btnZT.Background = new SolidColorBrush(Color.FromArgb(255, 183, 148, 71)); ;
            MonitorBoder.Visibility = Visibility.Collapsed;
            ZTBoder.Visibility = Visibility.Visible;
        }

        private void BtnJK_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            btnJK.Background = new SolidColorBrush(Color.FromArgb(255, 183, 148, 71));
            btnZT.Background = new SolidColorBrush(Colors.Transparent);
           

            MonitorBoder.Visibility = Visibility.Visible;
            ZTBoder.Visibility = Visibility.Collapsed;
        }

        
    }
}
