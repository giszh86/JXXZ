using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using Techzen.ICS.CS.Controls;
using Techzen.ICS.PublicModel;
using ESRI.ArcGIS.Client.Geometry;
using Telerik.Windows.Controls;
using JXXZ.ZHCG.Front.Helper;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class RoundFilter : UserControl
    {
        private double _radius;
        private string _categoriesID;
        private MapElement _entity;

        public RoundFilter()
        {
            InitializeComponent();
        }

        public RoundFilter(MapElement entity)
        //public RoundFilter(int id)
        {
            InitializeComponent();

            this._entity = entity;

            radius_Load();
            categories_Load();
        }

        //半径
        private void radius_Load()
        {
            List<int> list = new List<int>();
            list.Add(50);
            list.Add(100);
            list.Add(200);
            list.Add(500);
            list.Add(1000);
            foreach (int item in list)
            {
                RadioButton rbtn = new RadioButton();
                rbtn.Foreground = new SolidColorBrush(Colors.White);
                rbtn.Margin = new Thickness(10, 0, 0, 0);
                rbtn.GroupName = "wpRadius";
                rbtn.Content = item.ToString();
                rbtn.VerticalAlignment = VerticalAlignment.Center;
                rbtn.HorizontalAlignment = HorizontalAlignment.Center;
                rbtn.Checked += Rbtn_Checked;

                if (item == 200)
                {
                    rbtn.IsChecked = true;
                }

                wpRadius.Children.Add(rbtn);
            }

            TZRadioInput rIpt = new TZRadioInput();
            rIpt.GroupName = "wpRadius";
            rIpt.Text = "其他";
            rIpt.VerticalAlignment = VerticalAlignment.Center;
            rIpt.HorizontalAlignment = HorizontalAlignment.Center;
            rIpt.Margin = new Thickness(10, 0, 0, 0);
            rIpt.TZChecked += RIpt_Checked;
            rIpt.TZTextChanged += RIpt_TZTextChanged;

            wpRadius.Children.Add(rIpt);
        }

        //种类
        private void categories_Load()
        {
            WebAPIHelper dt = new WebAPIHelper();

            dt.GetDataCompleted += (s, args) =>
            {
                rbiLoad.IsBusy = true;

                List<MapElementCategorie> _dataList = args.DataResult as List<MapElementCategorie>;

                TZCheckBox cbtnAll = new TZCheckBox();
                cbtnAll.Value = -1;
                cbtnAll.Content = "全部";
                cbtnAll.Foreground = new SolidColorBrush(Colors.White);
                cbtnAll.Width = 120;
                cbtnAll.Margin = new Thickness(10, 6, 0, 0);
                cbtnAll.HorizontalAlignment = HorizontalAlignment.Left;
                cbtnAll.IsChecked = true;
                cbtnAll.Checked += CbtnAll_Checked;
                cbtnAll.Unchecked += CbtnAll_Unchecked;

                wpZL.Children.Add(cbtnAll);

                foreach (var item in _dataList)
                {
                    TZCheckBox cbtn = new TZCheckBox();
                    cbtn.Value = item.ID;
                    cbtn.Content = item.Name;
                    cbtn.Foreground = new SolidColorBrush(Colors.White);
                    cbtn.Width = 120;
                    cbtn.Margin = new Thickness(10, 6, 0, 0);
                    cbtn.HorizontalAlignment = HorizontalAlignment.Left;
                    cbtn.Checked += Cbtn_Checked;
                    cbtn.Unchecked += Cbtn_Unchecked;
                    cbtn.IsChecked = true;

                    wpZL.Children.Add(cbtn);
                }

                rbiLoad.IsBusy = false;
            };

            string url = "api/MapElementCategorie/Query";
            dt.GetDataAsync<List<MapElementCategorie>>(url);
        }

        private void Rbtn_Checked(object sender, RoutedEventArgs e)
        {
            RadioButton rBtn = sender as RadioButton;
            _radius = int.Parse(rBtn.Content.ToString());
        }

        private void RIpt_Checked(object sender, RoutedEventArgs e)
        {
            TZRadioInput rBtn = sender as TZRadioInput;

            if (rBtn.Value == "")
                return;

            _radius = int.Parse(rBtn.Value);
        }


        private void RIpt_TZTextChanged(object sender, EventArgs e)
        {
            TZRadioInput rBtn = sender as TZRadioInput;

            if (rBtn.Value == "")
                return;

            _radius = int.Parse(rBtn.Value);
        }

        private void CbtnAll_Checked(object sender, RoutedEventArgs e)
        {
            _categoriesID = null;

            TZCheckBox cBtn = sender as TZCheckBox;

            foreach (TZCheckBox item in wpZL.Children)
                item.IsChecked = true;
        }

        private void CbtnAll_Unchecked(object sender, RoutedEventArgs e)
        {
            TZCheckBox cBtn = sender as TZCheckBox;

            foreach (TZCheckBox item in wpZL.Children)
                item.IsChecked = false;

            _categoriesID = null;
        }


        private void Cbtn_Checked(object sender, RoutedEventArgs e)
        {
            TZCheckBox cBtn = sender as TZCheckBox;
            _categoriesID += cBtn.Value + ",";
        }

        private void Cbtn_Unchecked(object sender, RoutedEventArgs e)
        {
            TZCheckBox cBtn = sender as TZCheckBox;
            string value = cBtn.Value + ",";
            _categoriesID = _categoriesID.Replace(value, "");
        }

        private void Border_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            string categoriesID = "";
            if (!string.IsNullOrEmpty(_categoriesID))
                categoriesID = _categoriesID.Substring(0, _categoriesID.Length - 1);

            MainPage m = ContainerManager.BodyContainer as MainPage;
            //m.CloseFilter();

            ListWindow window = new ListWindow()
            {
                Header = "周边列表",
                Content = new RoundList(_radius, categoriesID, _entity)
            };

            window.Show();
        }
    }
}
