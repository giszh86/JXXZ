using ESRI.ArcGIS.Client.Symbols;
using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Techzen.ArcGIS.Client;

namespace Techzen.ICS.CS.Controls
{
    public partial class TZPlayback : UserControl
    {
        private bool _isPaused = false;

        /// <summary>
        /// 默认当前时间减 2 小时
        /// </summary>
        public DateTime? StartTime
        {
            get { return this.startTime.SelectedValue; }
            set { this.startTime.SelectedValue = value; }
        }

        /// <summary>
        /// 默认当前时间
        /// </summary>
        public DateTime? EndTime
        {
            get { return this.endTime.SelectedValue; }
            set { this.endTime.SelectedValue = value; }
        }

        /// <summary>
        /// 是否暂停
        /// </summary>
        public bool IsPaused
        {
            get { return _isPaused; }
            set { _isPaused = value; }
        }

        public event EventHandler Playing;
        public event EventHandler Pausing;
        public event EventHandler Stopping;

        private MapElementPlayback _mpp;

        public TZPlayback(MapElementPlayback mpp)
        {
            InitializeComponent();

            this._mpp = mpp;
            this._mpp.LineSymbol = (Symbol)this.Resources["DefaultLineSymbol"];
            this._mpp.MovingPointMapTip = new MovingPointMapTip();
            this._mpp.StayPointMapTip = new StayPointMapTip();
            this.speedSlider.Value = 7;
            this.StartTime = DateTime.Now.AddHours(-2);
            this.EndTime = DateTime.Now;
        }

        //播放 需手动调用
        public void Play(List<GPSPoint> gpsPoints)
        {
            if (this.IsPaused)
            {
                this._mpp.Resume();
            }
            else
            {
                this._mpp.Play(gpsPoints);
            }

            PlayButton.IsEnabled = false;
            PauseButton.IsEnabled = true;
            StopButton.IsEnabled = true;

            this.IsPaused = false;
        }

        private void PlayButton_Click(object sender, RoutedEventArgs e)
        {
            Playing?.Invoke(sender, e);
        }

        private void PauseButton_Click(object sender, RoutedEventArgs e)
        {
            Pausing?.Invoke(sender, e);

            this._mpp.Pause();

            this.PlayButton.IsEnabled = true;
            this.PauseButton.IsEnabled = false;
            this.StopButton.IsEnabled = true;

            this.IsPaused = true;
        }

        private void StopButton_Click(object sender, RoutedEventArgs e)
        {
            Stopping?.Invoke(sender, e);

            this._mpp.Stop();

            PlayButton.IsEnabled = true;
            PauseButton.IsEnabled = false;
            StopButton.IsEnabled = false;

            this.IsPaused = false;
        }

        private void RadSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (this.speedValue == null)
                return;

            if (e.NewValue == 1)
                _mpp.PlaySpeed = 1;
            else if (e.NewValue == 2)
                _mpp.PlaySpeed = 2;
            else if (e.NewValue == 3)
                _mpp.PlaySpeed = 5;
            else if (e.NewValue == 4)
                _mpp.PlaySpeed = 10;
            else if (e.NewValue == 5)
                _mpp.PlaySpeed = 20;
            else if (e.NewValue == 6)
                _mpp.PlaySpeed = 30;
            else if (e.NewValue == 7)
                _mpp.PlaySpeed = 60;
            else if (e.NewValue == 8)
                _mpp.PlaySpeed = 120;
            else if (e.NewValue == 9)
                _mpp.PlaySpeed = 240;
            else if (e.NewValue == 10)
                _mpp.PlaySpeed = 480;
            else if (e.NewValue == 11)
                _mpp.PlaySpeed = 960;

            this.speedValue.Text = _mpp.PlaySpeed.ToString();
        }
    }
}
