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
using Techzen.ArcGIS.Client;

namespace Techzen.ICS.CS.Controls
{
    public partial class MovingPointMapTip : UserControl
    {
        private GPSPoint _gpsPoint;

        public GPSPoint GPSPoint
        {
            get { return _gpsPoint; }
            set
            {
                _gpsPoint = value;
                this.txtGPSTime.Text = value.StartTime.ToString("yyyy-MM-dd HH:mm:ss");
                this.txtSpeed.Text = value.Speed.ToString();
            }
        }

        public MovingPointMapTip()
        {
            InitializeComponent();
        }

        public MovingPointMapTip(DateTime gpsTime, int speed)
        {
            InitializeComponent();

            this.txtGPSTime.Text = gpsTime.ToString("yyyy-MM-dd HH:mm:ss");
            this.txtSpeed.Text = speed.ToString();
        }
    }
}
