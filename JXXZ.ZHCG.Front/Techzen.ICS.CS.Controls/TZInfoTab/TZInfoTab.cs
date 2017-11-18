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
    [TemplatePart(Name = HIDER_BORDER, Type = typeof(Border))]
    [TemplatePart(Name = INFO_TAB_GRID, Type = typeof(Grid))]
    public class TZInfoTab : TabControl
    {
        private const string INFO_TAB_GRID = "InfoTabGrid";
        private const string HIDER_BORDER = "HiderBorder";

        private const string PATH = "path";
        private const string PATH2 = "path2";
        private Path _PATH;
        private Path _PATH2;

        private Grid _infoTabGrid;
        private Border _hiderBorder;

        private bool isHide;

        public TZInfoTab()
        {
            this.DefaultStyleKey = typeof(TZInfoTab);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            this._infoTabGrid = base.GetTemplateChild(INFO_TAB_GRID) as Grid;
            this._hiderBorder = base.GetTemplateChild(HIDER_BORDER) as Border;

            this._hiderBorder.MouseLeftButtonUp += HiderBorder_MouseLeftButtonUp;
        }

        private void HiderBorder_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {

            this._PATH = base.GetTemplateChild(PATH) as Path;
            this._PATH2 = base.GetTemplateChild(PATH2) as Path;

            if (this._PATH.Visibility == Visibility.Visible)
            {
                this._PATH.Visibility = Visibility.Collapsed;
                this._PATH2.Visibility = Visibility.Visible;
            }
            else
            {
                this._PATH.Visibility = Visibility.Visible;
                this._PATH2.Visibility = Visibility.Collapsed;
            }

            if (!this.isHide)
            {
                double top = this._infoTabGrid.ActualHeight - 36;
                this._infoTabGrid.Margin = new Thickness(0, top, 0, 0);
            }
            else
            {
                this._infoTabGrid.Margin = new Thickness(0, 0, 0, 0);
            }

            this.isHide = !this.isHide;
        }
    }
}
