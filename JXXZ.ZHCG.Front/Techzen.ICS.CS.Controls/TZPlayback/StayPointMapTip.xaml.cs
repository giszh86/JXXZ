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
    public partial class StayPointMapTip : UserControl
    {
        private GPSPoint _gpsPoint;

        public GPSPoint GPSPoint
        {
            get { return _gpsPoint; }
            set
            {
                _gpsPoint = value;

                if (_gpsPoint == null)
                    return;

                DateTime startTime = value.StartTime;
                DateTime endTime = value.EndTime;

                this.txtStartTime.Text = startTime.ToString("yyyy-MM-dd HH:mm:ss");
                this.txtEndTime.Text = endTime.ToString("yyyy-MM-dd HH:mm:ss");

                TimeSpan duration = endTime - startTime;

                if (duration < TimeSpan.FromMinutes(1))
                    this.txtDuration.Text = Convert.ToInt32(duration.TotalSeconds).ToString() + " 秒";
                else if (duration < TimeSpan.FromHours(1))
                    this.txtDuration.Text = Convert.ToInt32(duration.TotalMinutes).ToString() + " 分钟";
                else if (duration < TimeSpan.FromDays(1))
                    this.txtDuration.Text = Convert.ToInt32(duration.TotalHours).ToString() + " 小时";
                else if (duration > TimeSpan.FromDays(1))
                    this.txtDuration.Text = Convert.ToInt32(duration.TotalDays).ToString() + " 天";
            }
        }

        public StayPointMapTip()
        {
            InitializeComponent();
        }

        public StayPointMapTip(DateTime startTime, DateTime endTime)
        {
            InitializeComponent();

            this.txtStartTime.Text = startTime.ToString("yyyy-MM-dd HH:mm:ss");
            this.txtEndTime.Text = endTime.ToString("yyyy-MM-dd HH:mm:ss");

            TimeSpan duration = endTime - startTime;

            if (duration < TimeSpan.FromMinutes(1))
                this.txtDuration.Text = Convert.ToInt32(duration.TotalSeconds).ToString() + " 秒";
            else if (duration < TimeSpan.FromHours(1))
                this.txtDuration.Text = Convert.ToInt32(duration.TotalMinutes).ToString() + " 分钟";
            else if (duration < TimeSpan.FromDays(1))
                this.txtDuration.Text = Convert.ToInt32(duration.TotalHours).ToString() + " 小时";
            else if (duration > TimeSpan.FromDays(1))
                this.txtDuration.Text = Convert.ToInt32(duration.TotalDays).ToString() + " 天";
        }
    }
}
