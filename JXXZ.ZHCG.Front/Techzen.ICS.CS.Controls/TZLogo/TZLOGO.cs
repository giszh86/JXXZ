using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace Techzen.ICS.CS.Controls
{
    public class TZLogo : HyperlinkButton
    {
        #region Source 图片来源
        /// <summary>
        /// 图片来源
        /// </summary>
        public ImageSource Source
        {
            get { return (ImageSource)GetValue(SourceProperty); }
            set { SetValue(SourceProperty, value); }
        }

        public static readonly DependencyProperty SourceProperty = DependencyProperty.Register(
            "Source",
            typeof(ImageSource),
            typeof(TZLogo),
            new PropertyMetadata(new System.Windows.Media.Imaging.BitmapImage(new Uri("/Techzen.ICS.CS.Controls;component/Images/logo.png", UriKind.RelativeOrAbsolute)))
        );
        #endregion

        public TZLogo()
        {
            this.DefaultStyleKey = typeof(TZLogo);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            if (this.NavigateUri != null)
            {
                this.Cursor = Cursors.Hand;
            }
            else
            {
                this.Cursor = Cursors.Arrow;
            }
        }
    }
}
