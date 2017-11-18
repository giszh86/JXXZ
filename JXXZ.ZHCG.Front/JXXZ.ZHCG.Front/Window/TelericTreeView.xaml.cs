using JXXZ.ZHCG.Front.Helper;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using Techzen.ICS.PublicModel;
using Telerik.Windows.Controls;

namespace JXXZ.ZHCG.Front.Window
{
    public partial class TelericTreeView : UserControl
    {
        public TelericTreeView()
        {
            InitializeComponent();
            //BindData();
            BindRadTreeView();
            radTreeView.Selected += TreeView_Selected;
        }

        private void TreeView_Selected(object sender, Telerik.Windows.RadRoutedEventArgs e)
        {
            RadTreeView source = sender as RadTreeView;

            RadTreeViewItem aa= source.SelectedItem as RadTreeViewItem;

            //MessageBox.Show("111"+ aa.Header);
        }

        private void BindData()
        {
            List<FolderView> folders = new List<FolderView>();

            WebAPIHelper dt1 = new WebAPIHelper();
            dt1.GetDataCompleted += (s, args) =>
            {
                IList<Region> cps = args.DataResult as IList<Region>;

                WebAPIHelper dt2 = new WebAPIHelper();
                dt2.GetDataCompleted += (s2, args2) =>
                {
                    IList<Region> cps2 = args2.DataResult as IList<Region>;

                    foreach (Region item in cps)
                    {
                        FolderView folder = new FolderView();
                        folder.Name = item.Name;
                        folder.Visibility = "Collapsed";

                        IList<Region> iRegion = cps2.Where(d => d.ParentID == item.ID).ToList();
                        IList<FolderView> folderChildren = new List<FolderView>();

                        foreach (Region children in iRegion)
                        {
                            FolderView fv = new FolderView();

                            fv.Name = children.Name;
                            fv.Visibility = "Visible";
                            fv.Children = null;

                            folderChildren.Add(fv);
                        }
                        folder.Children = folderChildren;
                        folders.Add(folder);
                    }

                    this.treeView.ItemsSource = folders;
                };
                string statUrl2 = "/api/Region/Query";
                Dictionary<string, object> itemFilters2 = new Dictionary<string, object>();
                itemFilters2.Add("RegionTypeID", 3);
                dt2.GetDataAsync<List<Region>>(statUrl2, itemFilters2);
            };
            string statUrl1 = "/api/Region/Query";
            Dictionary<string, object> itemFilters1 = new Dictionary<string, object>();
            itemFilters1.Add("RegionTypeID", 2);
            dt1.GetDataAsync<List<Region>>(statUrl1, itemFilters1);
        }

        public void BindRadTreeView()
        {
            WebAPIHelper dt1 = new WebAPIHelper();
            dt1.GetDataCompleted += (s, args) =>
            {
                IList<Region> RL = args.DataResult as IList<Region>;
                List<Region> pRL = RL.Where(a => a.ParentID == 0 && a.Code != "-100").ToList();
                foreach (var c in pRL)
                {
                    RadTreeViewItem parentitem = new RadTreeViewItem();
                    parentitem.Style = App.Current.Resources["RadTreeViewItemStyle1"] as Style;
                    parentitem.Header = c.Name;
                    List<Region> cRL = RL.Where(a => a.ParentID == c.ID).ToList();
                    foreach (var child in cRL)
                    {
                        RadTreeViewItem childitem = new RadTreeViewItem();
                        childitem.Style = App.Current.Resources["RadTreeViewItemStyle1"] as Style;
                        childitem.Header = child.Name;
                        childitem.DefaultImageSrc = "/Techzen.ICS.CS.Controls;component/Images/sousuo.png";

                        parentitem.Items.Add(childitem);
                    }
                    radTreeView.Items.Add(parentitem);
                }
            };
            string statUrl1 = "/api/Region/Query";
            dt1.GetDataAsync<List<Region>>(statUrl1);
        }

        public class FileView
        {
            public string Name { get; set; }

            public string Visibility { get; set; }
        }

        public class FolderView
        {
            public string Name { get; set; }

            public string Visibility { get; set; }

            public IList<FolderView> Children { get; set; }
        }
    }
}
