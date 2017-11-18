using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class TreeMenu
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int? ParentID { get; set; }
        public string text { get; set; }
        public bool expanded { get; set; }
        public bool leaf { get; set; }
        public string icon { get; set; }
        public List<TreeMenu> children { get; set; }
    }

    public class MenuList : Menu
    {
        public MenuList(Menu menu)
            : base()
        {
            this.ID = menu.ID;
            this.Name = menu.Name;
            this.ParentID = menu.ParentID;
            this.Path = menu.Path;
            this.Url = menu.Url;
            this.Comment = menu.Comment;
            this.icon = menu.icon;
            this.Type = menu.Type;
            this.Children = new List<MenuList>();
        }
        public List<MenuList> Children { get; set; }
    }

    public class PhoneMenu
    {
        public PhoneMenu()
        {
            Menu = new List<MenuList>();
            Report = new List<MenuList>();
            Page3 = new List<MenuList>();
            ToDo = new List<Menu>();
        }
        //九宫格权限.
        public List<MenuList> Menu { get; set; }

        //上报页面权限
        public List<MenuList> Report { get; set; }

        //第3个页面的权限.
        public List<MenuList> Page3 { get; set; }

        //待办事件
        public List<Menu> ToDo { get; set; }
    }


    public class FolderTree
    {
        public string text { get; set; }
        public string FullName { get; set; }
        public bool leaf { get; set; }
        private List<FolderTree> _children = new List<FolderTree>();

        public List<FolderTree> children
        {
            get { return _children; }
            set { _children = value; }
        }
    }


    public class FolderTreeWeb
    {
        public string id { get; set; }
        public string parentid { get; set; }

        public string text { get; set; }
        public string path { get; set; }
        public bool @checked { get; set; }
        public bool expanded { get; set; }
        public bool leaf { get; set; }
        public List<FolderTreeWeb> nodes { get; set; }
        //private List<FolderTreeWeb> _nodes = new List<FolderTreeWeb>();

        //public List<FolderTreeWeb> nodes
        //{
        //    get { return _nodes; }
        //    set { _nodes = value; }
        //}
    }

}
