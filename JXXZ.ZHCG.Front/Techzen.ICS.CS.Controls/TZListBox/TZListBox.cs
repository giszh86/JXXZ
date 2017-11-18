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
    public class TZListBox : ListBox
    {
        public TZListBox()
        {
            this.DefaultStyleKey = typeof(TZListBox);
        }

        public Brush NormalItemBackground
        {
            get { return (Brush)GetValue(NormalItemBackgroundProperty); }
            set { SetValue(NormalItemBackgroundProperty, value); }
        }

        public Brush AlternatingItemBackground
        {
            get { return (Brush)GetValue(AlternatingItemBackgroundProperty); }
            set { SetValue(AlternatingItemBackgroundProperty, value); }
        }

        public static readonly DependencyProperty NormalItemBackgroundProperty = 
            DependencyProperty.Register("NormalItemBackground", typeof(Brush), typeof(TZListBox), new PropertyMetadata(new SolidColorBrush(Color.FromArgb(255, 17, 55, 77))));
        public static readonly DependencyProperty AlternatingItemBackgroundProperty = 
            DependencyProperty.Register("AlternatingItemBackground", typeof(Brush), typeof(TZListBox), new PropertyMetadata(new SolidColorBrush(Color.FromArgb(255, 38, 69, 89))));

        protected override void PrepareContainerForItemOverride(
                    DependencyObject element, object item)
        {
            base.PrepareContainerForItemOverride(element, item);

            int index = ItemContainerGenerator.IndexFromContainer(element);
            ListBoxItem listeBoxItem = (ListBoxItem)element;

            if (index % 2 == 0)
                listeBoxItem.Background = this.AlternatingItemBackground;
            else
                listeBoxItem.Background = this.NormalItemBackground;
        }
    }
}
