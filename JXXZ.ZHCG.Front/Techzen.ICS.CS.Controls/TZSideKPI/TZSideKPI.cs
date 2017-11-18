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
    public class TZSideKPI : ItemsControl
    {
        private const string ARROWS_IMAGE_NAME = "arrowsImage";
        private const string BORDER_NAME = "border";

        private double _onActualWidth;
        private double _offActualWidth;
        private bool _isCollapse;

        private Arrows _arrowsImage;
        private Border _borderPenal;

        private bool GoToState(bool useTransitions, string stateName)
        {
            return VisualStateManager.GoToState(this, stateName, useTransitions);
        }

        public TZSideKPI()
        {
            _isCollapse = true;
            this.DefaultStyleKey = typeof(TZSideKPI);

        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();
            _arrowsImage = base.GetTemplateChild(ARROWS_IMAGE_NAME) as Arrows;
            _borderPenal = base.GetTemplateChild(BORDER_NAME) as Border;
            if (_arrowsImage != null)
            {
                _arrowsImage.MouseLeftButtonUp += _arrows_MouseLeftButtonUp;
            }
        }

        private void _arrows_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            Arrows arr = sender as Arrows;
            
            if (arr.path.Visibility==Visibility.Visible)
            {
                arr.path.Visibility = Visibility.Collapsed;
                arr.path2.Visibility = Visibility.Visible;
            }
            else
            {
                arr.path.Visibility = Visibility.Visible;
                arr.path2.Visibility = Visibility.Collapsed;
            }

            int offActualWidth = 23;//Arrows 的 Height + margin.left=23 待优化

            if (this._onActualWidth == 0)
            {
                this._onActualWidth = _borderPenal.ActualWidth - offActualWidth;
            }
            if (this._offActualWidth == 0)
            {
                this._offActualWidth = offActualWidth;
            }
            double actualWidth = 0;

            if (!this._isCollapse)
            {
                actualWidth = 0;
            }
            else
            {
                actualWidth = _onActualWidth;
            }
            _borderPenal.Margin = new Thickness(actualWidth, _borderPenal.Margin.Top, _borderPenal.Margin.Right, _borderPenal.Margin.Bottom);
            this._isCollapse = !this._isCollapse;

        }

    }
}
