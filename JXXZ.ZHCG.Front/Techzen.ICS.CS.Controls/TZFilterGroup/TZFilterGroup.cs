using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;


namespace Techzen.ICS.CS.Controls
{

    [TemplatePart(Name = TITLE_TEXT_BLOCK, Type = typeof(TextBlock))]
    public class TZFilterGroup : ItemsControl
    {
        private const string TITLE_TEXT_BLOCK = "TitleTextBlock";

        private TextBlock _titleTextBlock;
        
        public static readonly DependencyProperty TitleProperty =
            DependencyProperty.Register("Title", typeof(string), typeof(TZFilterGroup), new PropertyMetadata("标题"));

        public string Title
        {
            get { return (string)GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }

        public TZFilterGroup()
        {
            this.DefaultStyleKey = typeof(TZFilterGroup);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();
            
            this._titleTextBlock = base.GetTemplateChild(TITLE_TEXT_BLOCK) as TextBlock;
        }
    }
}
