using Newtonsoft.Json;
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
using Techzen.ICS.CS.Controls.Helper;
using Telerik.Windows.Controls;

namespace Techzen.ICS.CS.Controls
{
    public class TZClock : Control
    {
        private const string DATE_TEXT_BLOCK_NAME = "date";
        private const string TIME_TEXT_BLOCK_NAME = "time";
        private const string MESSAGE_RADBUSY_INDICATOR_NAME = "message";
        private const string INTERNET_URL = "http://www.timeapi.org/utc/now";
        private const string DATE_FORMAT = "yyyy-MM-dd";
        private const string TIME_FORMAT = "HH:mm:ss";
        private const string REMOTE_TIME_INPROGRESS = "同步中...";
        private const string REMOTE_TIME_FAILED = "同步失败！";

        private TextBlock _dateTextBlock;
        private TextBlock _timeTextBlock;
        private TextBlock _messageTextBlock;

        public string RemoteUri { get; set; }

        public TZClockSource DateTimeSourceType { get; set; }

        public DateTime CurrentDateTime
        {
            get
            {
                return (DateTime)GetValue(CurnentDateTimeProperty);
            }
            set
            {
                SetValue(CurnentDateTimeProperty, value);
            }
        }

        public static DependencyProperty CurnentDateTimeProperty = 
            DependencyProperty.Register("CurnentDateTime", typeof(DateTime), typeof(TZClock), new PropertyMetadata(DateTime.Now, new PropertyChangedCallback(OnCurrentDateTimeChanged)));

        private static void OnCurrentDateTimeChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            TZClock clock = (TZClock)d;
            DateTime dateTime = (DateTime)e.NewValue;

            if (clock._dateTextBlock != null)
            {
                clock._dateTextBlock.Text = dateTime.ToString(DATE_FORMAT);
            }

            if (clock._timeTextBlock != null)
            {
                clock._timeTextBlock.Text = dateTime.ToString(TIME_FORMAT);
            }
        }

        public TZClock()
        {
            this.DefaultStyleKey = typeof(TZClock);
            this.DateTimeSourceType = TZClockSource.Local;
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            this._dateTextBlock = base.GetTemplateChild(DATE_TEXT_BLOCK_NAME) as TextBlock;
            this._timeTextBlock = base.GetTemplateChild(TIME_TEXT_BLOCK_NAME) as TextBlock;
            this._messageTextBlock = base.GetTemplateChild(MESSAGE_RADBUSY_INDICATOR_NAME) as TextBlock;

            switch (this.DateTimeSourceType)
            {
                case TZClockSource.Local:
                    this.CurrentDateTime = DateTime.Now;
                    break;
                case TZClockSource.Remote:
                    this.RemoteUri = INTERNET_URL;
                    RequestRemoteTime();
                    break;
                default:
                    break;
            }

            StartTicking();
        }

        private void StartTicking()
        {
            System.Windows.Threading.DispatcherTimer timer = new System.Windows.Threading.DispatcherTimer();
            timer.Interval = TimeSpan.FromSeconds(1);

            timer.Tick += (o, e) =>
            {
                this.CurrentDateTime = this.CurrentDateTime.AddSeconds(1);
            };

            timer.Start();
        }

        private void RequestRemoteTime()
        {
            System.Threading.Thread thread = new System.Threading.Thread(Request);
            thread.Start();
        }

        private void Request()
        {
            try
            {
                System.Threading.Thread.Sleep(5000);

                this._messageTextBlock.Text = REMOTE_TIME_INPROGRESS;
                this._messageTextBlock.Visibility = Visibility.Visible;

                WebAPIHelper webAPIHelper = new WebAPIHelper();

                webAPIHelper.GetDataCompleted += (s, args) =>
                {
                    this.CurrentDateTime = (DateTime)args.DataResult;
                    _messageTextBlock.Visibility = Visibility.Collapsed;
                };

                webAPIHelper.GetData<DateTime>(this.RemoteUri);
            }
            catch (Exception)
            {
                _messageTextBlock.Text = REMOTE_TIME_FAILED;
            }
        }
    }
}