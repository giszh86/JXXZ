using Newtonsoft.Json;
using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Techzen.ICS.CS.Controls.Helper
{
    public class WebAPIHelper
    {
        public event WebAPIHelperDownloadStringCompletedEventHandler GetDataCompleted;
        public WebAPIHelper()
        {
        }

        public void GetData<T>(string uri)
        {
            WebClient webClient = new WebClient();

            webClient.DownloadStringCompleted += (o,e)=> 
            {
                T t=JsonConvert.DeserializeObject<T>(e.Result);
                if (this.GetDataCompleted != null)
                {
                    WebAPIHelperDownloadStringCompletedEventArgs args = new WebAPIHelperDownloadStringCompletedEventArgs();
                    args.DataResult = t;
                    this.GetDataCompleted(this, args);
                }
            };

            webClient.DownloadStringAsync(new Uri(uri));
        }
    }

    public delegate void WebAPIHelperDownloadStringCompletedEventHandler(object sender, WebAPIHelperDownloadStringCompletedEventArgs e);

    public class WebAPIHelperDownloadStringCompletedEventArgs
    {
        public object DataResult { get; set; }
    }
}
