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
    public partial class Arrows : UserControl
    {
        public Arrows()
        {
            InitializeComponent();
        }

        #region 动画

        bool isFocused;
        bool isMouseOver;
        //焦点进入
        protected override void OnGotFocus(RoutedEventArgs e)
        {
            base.OnGotFocus(e);
            isFocused = true;
            FocusedState(true);
        }

        //失去焦点
        protected override void OnLostFocus(RoutedEventArgs e)
        {
            base.OnLostFocus(e);
            isFocused = false;
            FocusedState(isFocused);
        }

        protected override void OnMouseEnter(System.Windows.Input.MouseEventArgs e)
        {
            base.OnMouseEnter(e);
            isMouseOver = true;
            ChangeVisualState(true);
        }

        protected override void OnMouseLeave(System.Windows.Input.MouseEventArgs e)
        {
            base.OnMouseLeave(e);
            isMouseOver = false;
            ChangeVisualState(true);
        }

        private void ChangeVisualState(bool useTransitions)
        {
            if (isFocused == true)
            {
                return;
            }
            if (isMouseOver)
            {
                GoToState(useTransitions, "Pressed");
            }
            else
            {
                GoToState(useTransitions, "Normal");
            }
        }

        private void FocusedState(bool useTransitions)
        {
            if (isFocused)
            {
                GoToState(useTransitions, "Pressed");
            }
            else
            {
                GoToState(useTransitions, "Normal");
            }
        }


        private bool GoToState(bool useTransitions, string stateName)
        {
            return VisualStateManager.GoToState(this, stateName, useTransitions);
        }
        #endregion

    }
}
