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

    public class TZPanelItem : Control
    {
        private const string ITEM_NAME_TEXT_BLOCK = "ItemNameTextBlock";
        private const string ITEM_VALUE_TEXT_BLOCK = "ItemValueTextBlock";

        private TextBlock _itemNameTextBlock;
        private TextBlock _itemValueTextBlock;

        #region 属性封装
        #region NameText 名称
        /// <summary>
        /// 名称
        /// </summary>
        public string NameText
        {
            get { return (string)GetValue(NameTextProperty); }
            set { SetValue(NameTextProperty, value); }
        }
        public static readonly DependencyProperty NameTextProperty = DependencyProperty.Register(
            "NameText",
            typeof(string),
            typeof(TZPanelItem),
            new PropertyMetadata("名称"));
        #endregion

        #region NameWidth 名称宽度
        /// <summary>
        /// 名称宽度
        /// </summary>
        public double NameWidth
        {
            get { return (double)GetValue(NameWidthProperty); }
            set { SetValue(NameWidthProperty, value); }
        }
        public static readonly DependencyProperty NameWidthProperty = DependencyProperty.Register(
            "NameWidth",
            typeof(double),
            typeof(TZPanelItem),
            new PropertyMetadata(60.0));
        #endregion

        #region NameColor 名称颜色
        /// <summary>
        /// 名称颜色
        /// </summary>
        public Brush NameColor
        {
            get { return (Brush)GetValue(NameColorProperty); }
            set { SetValue(NameColorProperty, value); }
        }
        public static readonly DependencyProperty NameColorProperty = DependencyProperty.Register(
            "NameColor",
            typeof(Brush),
            typeof(TZPanelItem),
            new PropertyMetadata(new SolidColorBrush(Colors.White)));
        #endregion

        #region ValueText 值
        /// <summary>
        /// 值
        /// </summary>
        public string ValueText
        {
            get { return (string)GetValue(ValueTextProperty); }
            set { SetValue(ValueTextProperty, value); }
        }
        public static readonly DependencyProperty ValueTextProperty = DependencyProperty.Register(
            "ValueText",
            typeof(string),
            typeof(TZPanelItem),
            new PropertyMetadata("值"));
        #endregion
        
        #region ValueColor 值颜色
        /// <summary>
        /// 名称颜色
        /// </summary>
        public Brush ValueColor
        {
            get { return (Brush)GetValue(ValueColorProperty); }
            set { SetValue(ValueColorProperty, value); }
        }
        public static readonly DependencyProperty ValueColorProperty = DependencyProperty.Register(
            "ValueColor",
            typeof(Brush),
            typeof(TZPanelItem),
            new PropertyMetadata(new SolidColorBrush(Colors.White)));
        #endregion
        #endregion

        public TZPanelItem()
        {
            this.DefaultStyleKey = typeof(TZPanelItem);

            this._itemNameTextBlock = base.GetTemplateChild(ITEM_NAME_TEXT_BLOCK) as TextBlock;
            this._itemValueTextBlock = base.GetTemplateChild(ITEM_VALUE_TEXT_BLOCK) as TextBlock;

            base.OnApplyTemplate();
        }
    }
}
