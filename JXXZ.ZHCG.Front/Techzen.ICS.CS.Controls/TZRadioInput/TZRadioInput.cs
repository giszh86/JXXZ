using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Techzen.ICS.CS.Controls
{
    public class TZRadioInput : RadioButton
    {
        private const string I_RADIO_BUTTON_NAME = "iRadioButton";
        private const string I_RADIO_Text_Box_NAME = "iRadioTextBox";

        private RadioButton _radioButton;
        private TextBox _iRadioTextBox;
        public int ID
        {
            get
            {
                return (int)GetValue(IDProperty);
            }
            set
            {
                SetValue(IDProperty, value);
            }
        }

        public static DependencyProperty IDProperty = DependencyProperty.Register(
            "ID",
            typeof(int),
            typeof(TZRadioInput),
            new PropertyMetadata(0));

        public string Text
        {
            get
            {
                return (string)GetValue(TextProperty);
            }
            set
            {
                SetValue(TextProperty, value);
            }
        }

        public static DependencyProperty TextProperty = DependencyProperty.Register(
                "Text",
                typeof(string),
                typeof(TZRadioInput),
                new PropertyMetadata("内容"));

        public string Value
        {
            get
            {
                return this._iRadioTextBox.Text;
            }
            set
            {
                SetValue(ValueProperty, value);
            }
        }

        public static DependencyProperty ValueProperty = DependencyProperty.Register(
                "Value",
                typeof(string),
                typeof(TZRadioInput),
                new PropertyMetadata(null, (d, e) =>
                {
                    TZRadioInput input = (TZRadioInput)d;
                    if (input._iRadioTextBox != null)
                    {
                        input._iRadioTextBox.Text = e.NewValue.ToString();
                    }
                })
        );

        public event RoutedEventHandler TZChecked;

        private void OnRadioButton_Checked(object sender, RoutedEventArgs e)
        {
            //将自定义事件绑定到控件事件上
            if (TZChecked != null)
            {
                TZChecked(this, new RoutedEventArgs());
            }
        }

        public event EventHandler TZTextChanged;

        private void _iRadioTextBox_TextChanged(object sender, EventArgs e)
        {
            if (TZTextChanged != null)
            {
                TZTextChanged(this, new EventArgs());
            }
        }

        private void _iRadioTextBox_GotFocus(object sender, RoutedEventArgs e)
        {
            this._radioButton.IsChecked = true;
        }

        private void _iRadioTextBox_KeyDown(object sender, KeyEventArgs e)
        {
            TextBox txt = sender as TextBox;
            //屏蔽非法按键，只能输入整数
            if ((e.Key >= Key.NumPad0 && e.Key <= Key.NumPad9 || e.Key >= Key.D0 && e.Key <= Key.D9))
            {
                e.Handled = false;
            }
            else
            {
                e.Handled = true;
            }
        }

        public TZRadioInput()
        {
            this.DefaultStyleKey = typeof(TZRadioInput);
        }

        public override void OnApplyTemplate()
        {
            if (_radioButton != null)
            {
                _radioButton.Checked -= OnRadioButton_Checked;
            }
            _radioButton = base.GetTemplateChild(I_RADIO_BUTTON_NAME) as RadioButton;
            _iRadioTextBox = base.GetTemplateChild(I_RADIO_Text_Box_NAME) as TextBox;
            _iRadioTextBox.GotFocus += _iRadioTextBox_GotFocus;
            _iRadioTextBox.TextChanged += _iRadioTextBox_TextChanged;
            _radioButton.Checked += OnRadioButton_Checked;
            _iRadioTextBox.KeyDown += _iRadioTextBox_KeyDown;
            base.OnApplyTemplate();
        }
    }
}
