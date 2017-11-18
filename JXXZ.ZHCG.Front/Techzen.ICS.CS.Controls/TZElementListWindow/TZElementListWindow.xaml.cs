using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Windows.Threading;
using Techzen.ICS.CS.Controls.Helper;
using Telerik.Windows.Controls;

namespace Techzen.ICS.CS.Controls
{
    public partial class TZElementListWindow : UserControl
    {

        public IEnumerable<object> DataSource
        {
            get
            {
                return (IEnumerable<object>)GetValue(DataSourceProperty);
            }
            set
            {
                SetValue(DataSourceProperty, value);
            }
        }

        public static DependencyProperty DataSourceProperty = DependencyProperty.Register(
                "DataSource",
                typeof(IEnumerable<object>),
                typeof(TZElementListWindow),
               new PropertyMetadata(null, (d, e) =>
               {
                   TZElementListWindow lw = (TZElementListWindow)d;
                   if (lw.eLWlist != null)
                   {
                       lw.eLWlist.ItemsSource = (IEnumerable<object>)e.NewValue;
                       // lw.pager.Source = (IEnumerable<object>)e.NewValue;
                   }
               })
        );

        public DataTemplate ListDataTemplate
        {
            set
            {
                ELWlist.ItemTemplate = value;
            } 
        }


        //public TextBlock ListHeader
        //{
        //    set
        //    {
        //        eLWlistHeader.Children.Add(value);
        //    }
        //}

        /// <summary>
        /// 输入提示
        /// </summary>
        public string WatermarkContent
        {
            set
            {
                eLWSearcherInput.WatermarkContent = (string)value;
            }
        }

        public int PageSize
        {
            get { return this.pager.PageSize; }
            set
            {
                this.pager.PageSize = (int)value;
            }
        }

        public int PageIndex
        {
            get { return this.pager.PageIndex; }
            set
            {
                this.pager.PageIndex = (int)value;
            }
        }

        public int PageCount
        {
            get { return this.pager.PageCount; }
        }

        public int ItemCount
        {
            get { return this.pager.ItemCount; }
            set
            {
                this.pager.ItemCount = (int)value;
            }

        }
        public RadBusyIndicator SearchBusyIndicator
        {
            get { return this.searchBusyIndicator; }
            set { searchBusyIndicator = value; }
        }

        public RadWatermarkTextBox ELWSearcherInput
        {
            get { return this.eLWSearcherInput; }
            set { eLWSearcherInput = value; }
        }

        public Image ELWSearcherButton
        {
            get { return this.eLWSearcherButton; }
            set { eLWSearcherButton = value; }
        }

        public Grid ELWListHeader
        {
            get { return this.eLWlistHeader; }
            set { eLWlistHeader = value; }
        }

        public TZListBox ELWlist
        {
            get { return this.eLWlist; }
            set { eLWlist = value; }
        }

        public RadDataPager Pager
        {
            get { return this.pager; }
            set { pager = value; }
        }

        public Border PositionAllButton
        {
            get { return this.positionAllButton; }
            set { positionAllButton = value; }
        }

        public event EventHandler ELWSearcherButtonClick;
        private void OnELWSearcherButton_Click(object sender, MouseButtonEventArgs e)
        {
            if (ELWSearcherButtonClick != null)
            {
                ELWSearcherButtonClick(sender, e);
            }
        }

        public event EventHandler PositionAllButtonClick;
        private void OnPositionAllButton_Click(object sender, MouseButtonEventArgs e)
        {
            if (PositionAllButtonClick != null)
            {
                PositionAllButtonClick(sender, e);
            }
        }

        public event EventHandler PagerIndexChanged;
        private void OnPager_PageIndexChanged(object sender, PageIndexChangedEventArgs e)
        {
            if (PagerIndexChanged != null)
            {
                PagerIndexChanged(sender, e);
            }
        }

        public event EventHandler OneSelectionChanged;

        private void OnELWlist_SelectionChanged(object sender, EventArgs e)
        {
            if (OneSelectionChanged != null)
            {
                OneSelectionChanged(sender, e);
            }
        }

        public event EventHandler DoubleSelectionChanged;
        private void OnELWlist_DoubleSelectionChanged(object sender, EventArgs e)
        {
            if (DoubleSelectionChanged != null)
            {
                DoubleSelectionChanged(sender, e);
            }
        }

        public TZElementListWindow()
        {
            InitializeComponent();
            this.Loaded += UserControl_Loaded;
        }

        //private void PageIndexChanged()
        //{
        //    //SearchBusyIndicator.IsBusy = true;
        //    var data = dataSource.Where(m => m.MapElementStatusName.Contains(this.eLWSearcherInput.Text));
        //    PagedCollectionView itemListView = new PagedCollectionView(data);
        //    // pager.Source = itemListView;
        //    // eLWlist.ItemsSource = itemListView;
        //    // ELWlist.DataContext = data;
        //    // pager.DataContext = data;
        //    this.DataContext = itemListView;
        //    // SearchBusyIndicator.IsBusy = false;
        //}

        private void UserControl_Loaded(object sender, RoutedEventArgs e)
        {

            this.ELWSearcherButton.MouseLeftButtonUp += OnELWSearcherButton_Click;
            this.PositionAllButton.MouseLeftButtonUp += OnPositionAllButton_Click;
            this.Pager.PageIndexChanged += OnPager_PageIndexChanged;
            this.ELWlist.SelectionChanged += OnELWlist_SelectionChanged;
            this.eLWFilterButton.MouseLeftButtonUp += ELWFilterButton_MouseLeftButtonUp;
            //this.ELWlist.OneSelectionChanged += OnELWlist_SelectionChanged;
            //this.ELWlist.DoubleSelectionChanged += OnELWlist_DoubleSelectionChanged;
        }
        public event EventHandler ELWFilterButtonClick;
        private void ELWFilterButton_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            if (ELWFilterButtonClick != null) {
                ELWFilterButtonClick(this,e);
            }
        }

        private void eLWSearcherButton_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            //  PageIndexChanged();
        }


        private void positionAllButton_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            //ELWlist.ItemsSource = itemsSource.Where(m => m.MapElementStatusName.Contains(this.eLWSearcherInput.Text));
        }
    }
}
