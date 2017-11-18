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

    [TemplatePart(Name = FILTER_RADIO_BUTTON, Type = typeof(RadioButton))]
    [TemplatePart(Name = VALUE1_STACK_PANEL, Type = typeof(StackPanel))]
    public class TZFilterGroupItem : Control
    {
        private const string FILTER_RADIO_BUTTON = "FilterRadioButton";
        private const string VALUE1_STACK_PANEL = "Value1StackPanel";

        private RadioButton _filterRadioButton;
        private StackPanel _value1StackPanel;
        
        public static readonly DependencyProperty ModeProperty =
            DependencyProperty.Register("Mode", typeof(TZFilterGroupItemMode), typeof(TZFilterGroupItem), new PropertyMetadata(TZFilterGroupItemMode.TrueValue));

        public bool? IsChecked
        {
            get { return (bool?)GetValue(IsCheckedProperty); }
            set { SetValue(IsCheckedProperty, value); }
        }

        // Using a DependencyProperty as the backing store for IsChecked.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty IsCheckedProperty =
            DependencyProperty.Register("IsChecked", typeof(bool?), typeof(TZFilterGroupItem), new PropertyMetadata(false));

        public string GroupName
        {
            get { return (string)GetValue(GroupNameProperty); }
            set { SetValue(GroupNameProperty, value); }
        }

        // Using a DependencyProperty as the backing store for GroupName.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty GroupNameProperty =
            DependencyProperty.Register("GroupName", typeof(string), typeof(TZFilterGroupItem), new PropertyMetadata(null));



        public static readonly DependencyProperty IDProperty =
            DependencyProperty.Register("ID", typeof(int), typeof(TZFilterGroupItem), new PropertyMetadata(0));

        public static readonly DependencyProperty TextProperty =
            DependencyProperty.Register("Text", typeof(string), typeof(TZFilterGroupItem), new PropertyMetadata(""));

        public static readonly DependencyProperty Value1Property =
            DependencyProperty.Register("Value1", typeof(string), typeof(TZFilterGroupItem), new PropertyMetadata("0"));

        public static readonly DependencyProperty Value2Property =
            DependencyProperty.Register("Value2", typeof(string), typeof(TZFilterGroupItem), new PropertyMetadata("0"));
        
        public TZFilterGroupItemMode Mode
        {
            get { return (TZFilterGroupItemMode)GetValue(ModeProperty); }
            set { SetValue(ModeProperty, value); }
        }

        public int ID
        {
            get { return (int)GetValue(IDProperty); }
            set { SetValue(IDProperty, value); }
        }

        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        public string Value1
        {
            get { return (string)GetValue(Value1Property); }
            set { SetValue(Value1Property, value); }
        }

        public string Value2
        {
            get { return (string)GetValue(Value2Property); }
            set { SetValue(Value2Property, value); }
        }

        public event RoutedEventHandler OnChecked;

        public TZFilterGroupItem()
        {
            this.DefaultStyleKey = typeof(TZFilterGroupItem);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            this._filterRadioButton = base.GetTemplateChild(FILTER_RADIO_BUTTON) as RadioButton;
            this._value1StackPanel = base.GetTemplateChild(VALUE1_STACK_PANEL) as StackPanel;

            if (_filterRadioButton != null)
            {
                _filterRadioButton.Checked += new RoutedEventHandler(FilterRadioButton_Checked);
            }

            if (TZFilterGroupItemMode.OneValue == Mode)
            {
                _value1StackPanel.Visibility = Visibility.Collapsed;
            }
            else if (TZFilterGroupItemMode.OneValue == Mode)
            {
                _value1StackPanel.Visibility = Visibility.Visible;
            }
        }

        private void FilterRadioButton_Checked(object sender, RoutedEventArgs e)
        {
            OnChecked?.Invoke(this, new RoutedEventArgs());
        }
    }
}
