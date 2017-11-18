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
    public class TZToastTip : Control
    {
        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        public static readonly DependencyProperty TextProperty =
            DependencyProperty.Register("Text", typeof(string), typeof(TZToastTip), new PropertyMetadata(""));
        public bool IsOpened
        {
            get { return (bool)GetValue(IsOpenedProperty); }
            set
            {
                SetValue(IsOpenedProperty, value);
            }
        }

        public static readonly DependencyProperty IsOpenedProperty =
            DependencyProperty.Register("IsOpened", typeof(bool), typeof(TZToastTip), new PropertyMetadata(false, (s, e) =>
            {
                (s as TZToastTip).UpdateState();
            }));

        public TZToastTip()
        {
            this.DefaultStyleKey = typeof(TZToastTip);

        }

        public void UpdateState()
        {
            VisualStateManager.GoToState(this, IsOpened ? "IsOpened" : "Normal", true);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            var groups = VisualStateManager.GetVisualStateGroups((Border)GetTemplateChild("TemplateElement"));
            VisualStateGroup visualStateGroup = groups[0] as VisualStateGroup;

            VisualState isOpenState = visualStateGroup.States[1] as VisualState;
            isOpenState.Storyboard.Completed += (s, e) =>
            {
                this.IsOpened = false;
            };
        }
    }
}
