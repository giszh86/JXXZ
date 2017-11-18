using JXXZ.ZHCG.Front.Helper;
using Newtonsoft.Json.Linq;
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
using Techzen.ICS.CS.Controls;
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class TZFilterWindow : UserControl
    {
        private List<JObject> _dataList = new List<JObject>();
        private Dictionary<string, List<JObject>> _typeDatas = new Dictionary<string, List<JObject>>();
        private Dictionary<string, int> _filterValues = new Dictionary<string, int>();
        private Dictionary<string, object> _results = new Dictionary<string, object>();
        public TZFilterWindow()
        {
            InitializeComponent();
        }
        public TZFilterWindow(int typeID)
        {
            InitializeComponent();
            CreateFilter(typeID);
        }
        public void CreateFilter(int typeID)
        {
            if (filterGrid != null)
            {
                this.filterGrid.Children.Clear();
            }

            List<SystemConfig> filterConfigs = ContainerManager.SystemConfigs.GetMapElementConfigs(typeID, "FilterWindow");

            //获得元素种类信息
            SystemConfig itemsConfig = filterConfigs.Where(t => t.Name == "Filters").FirstOrDefault();
            List<SystemConfig> fsList = ContainerManager.SystemConfigs.GetSystemConfigs(itemsConfig);

            //List<FilterModel> FilterModelList = new List<FilterModel>();
            ////获得筛选条件
            //FilterModel filte = new FilterModel()
            //{
            //    Name = "监控类型",
            //    FilterType = "Region",
            //    Height = "150"
            //};
            //FilterModel filte1 = new FilterModel()
            //{
            //    Name = "监控来源",
            //    FilterType = "Region",
            //    Height = "150"
            //};
            //FilterModel filte2 = new FilterModel()
            //{
            //    Name = "所属乡镇",
            //    FilterType = "Region",
            //    Height = "150"
            //};
            //FilterModelList.Add(filte);
            //FilterModelList.Add(filte1);
            //FilterModelList.Add(filte2);
            //循环生成筛选条件
            foreach (var f in fsList)
            {
                List<SystemConfig> fiConfig = ContainerManager.SystemConfigs.GetSystemConfigs(f);
                //获得筛选项配置
                string filterType;
                string name;
                double? height;

                #region 获得配置信息
                filterType = fiConfig.Where(t => t.Name == "FilterType").FirstOrDefault().Value;//f.FilterType;

                name = fiConfig.Where(t => t.Name == "Name").FirstOrDefault().Value;//f.Name;

                string strHeight = fiConfig.Where(t => t.Name == "Height").FirstOrDefault().Value;//f.Height;

                if (!string.IsNullOrEmpty(strHeight))
                    height = double.Parse(strHeight);
                else
                    height = null;
                #endregion

                //分组名称
                //sco.Content = filterGrid;
                string groupName = fiConfig.Where(t => t.Name == "Name").FirstOrDefault().Value; //f.Name;

                //生成一级筛选分组
                TZFilterGroup filterGroup = CreateFilterGroup(filterGrid, groupName, name, height);
                this._filterValues[filterGroup.Name] = -1;

                WebAPIHelper itemDt = new WebAPIHelper();

                itemDt.GetDataCompleted += (a, b) =>
                {
                    List<JObject> typeList = b.DataResult as List<JObject>;
                    foreach (var obj in typeList)
                    {
                        Statistic statEntity = new Statistic()
                        {
                            MapElementCategoryID = 1,
                            ID = Convert.ToInt32(obj.GetValue("ID").ToString()),
                            Name = obj.GetValue("Name").ToString(),
                            Onlines = 0,
                            Offlines = 0,
                            Totals = 0
                        };
                        TZFilterGroupItem itemControl = CreateFilterGroupItem(statEntity, filterType, filterType, -1);
                        filterGroup.Items.Add(itemControl);
                    }
                };

                Dictionary<string, object> itemFilters = new Dictionary<string, object>();
                itemFilters.Add("Level", "2");

                string itemTypeUrl = string.Format("api/{0}/Query", filterType);
                itemDt.GetDataAsync<List<JObject>>(itemTypeUrl, itemFilters);
            }

        }
        

        private TZFilterGroupItem CreateFilterGroupItem(Statistic statEntity, string groupName, string filterType, int checkedID)
        {
            TZFilterGroupItem control = new TZFilterGroupItem()
            {
                ID = statEntity.ID,
                Text = statEntity.Name,
                GroupName = groupName,
                Width = 170,
                Margin = new Thickness(4, 4, 4, 0),
                DataContext = statEntity,
                Mode= TZFilterGroupItemMode.OneValue
        };
            control.IsChecked = statEntity.ID == checkedID;
            control.OnChecked += Control_OnChecked;
            return control;
        }

        private void Control_OnChecked(object sender, RoutedEventArgs e)
        {
            TZFilterGroupItem control = sender as TZFilterGroupItem;

            Statistic statEntity = control.DataContext as Statistic;

            string strs = control.GroupName;
            string filterType = strs;
            this._results[filterType + "ID"] = statEntity.ID.ToString();
        }
        private TZFilterGroup CreateFilterGroup(Grid filterGrid, string name, string title, double? height)
        {
            RowDefinition row = new RowDefinition()
            {
               // Height = height == null ? new GridLength(1, GridUnitType.Star) : new GridLength((double)height)
            };

            filterGrid.RowDefinitions.Add(row);

            int rowIndex = filterGrid.RowDefinitions.Count - 1;

            //创建筛选项分组
            TZFilterGroup filterGroup = new TZFilterGroup()
            {
                Name = name,
                Title = title,
                Margin = new Thickness(0, 0, 0, 0)
            };

            filterGroup.SetValue(Grid.RowProperty, rowIndex);
            filterGrid.Children.Add(filterGroup);

            return filterGroup;
        }

        private void TextBlock_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            MainPage m = ContainerManager.BodyContainer as MainPage;
           // m.CloseFilter();

            if (ContainerManager.ListWindows != null)
            {
                ContainerManager.ListWindows.Close();
            }

            //ContainerManager.ListWindows = new ListWindow(3, _results);//监控
            ContainerManager.ListWindows = new ListWindow(1, _results);//人

            ContainerManager.ListWindows.Show();

        }
    }
}
