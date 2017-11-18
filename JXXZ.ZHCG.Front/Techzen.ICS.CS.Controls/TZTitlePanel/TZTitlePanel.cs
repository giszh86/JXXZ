using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;


namespace Techzen.ICS.CS.Controls
{
    public class TZTitlePanel : ContentControl
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title
        {
            get
            {
                return (string)GetValue(TitleProperty);
            }
            set
            {
                SetValue(TitleProperty, value);
            }
        }

        public static DependencyProperty TitleProperty = DependencyProperty.Register(
                "Title",
                typeof(string),
                typeof(TZTitlePanel),
                new PropertyMetadata("标题"));

        public TZTitlePanel()
        {
            this.DefaultStyleKey = typeof(TZTitlePanel);
        }
    }
}
