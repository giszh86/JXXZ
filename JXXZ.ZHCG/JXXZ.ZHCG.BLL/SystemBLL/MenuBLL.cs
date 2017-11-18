using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL
{
    public class MenuBLL
    {
        private MenuDAL dal = new MenuDAL();

        public List<TreeMenu> GetTreeMenus(int userID, int? roleID = null)
        {
            List<TreeMenu> dataList = dal.GetMenusByUserID(userID, roleID)
                .Select(t => new TreeMenu
                {
                    ID = t.ID,
                    Name = t.Name,
                    text = t.Name,
                    ParentID = t.ParentID,
                    Url = t.Url,
                    icon = t.icon
                }).ToList();

            List<TreeMenu> list = new List<TreeMenu>();

            if (dataList.Count > 0)
            {
                for (int i = 0; i < dataList.Count; i++)
                {
                    TreeMenu item = dataList[i];

                    if (item.ParentID == null)
                    {
                        item = GetMenuChildren(dataList, item);
                        list.Add(item);
                    }
                }
            }

            return list;
        }

        public PhoneMenu GetMenuByPhone(int userID)
        {
            PhoneMenu rst = new PhoneMenu();
            var list = dal.GetMenusByPhone(userID);
            
            //处理九宫格
            _menuList = list.Where(t => t.Type == 2).ToList();   //筛选出所有的菜单按钮权限.
            var clist = _menuList.Where(t => (t.ParentID ?? 0) == 0);
            foreach (var item in clist)
            {
                add(item, rst.Menu);
            }

            //处理上报页面
            _menuList = list.Where(t => t.Type == 3).ToList();
            var dList = _menuList.Where(t => (t.ParentID ?? 0) == 0);
            foreach (var item in dList)
            {
                add(item, rst.Report);
            }

            //第3个页面的权限
            _menuList = list.Where(t => t.Type == 5).ToList();
            dList = _menuList.Where(t => (t.ParentID ?? 0) == 0);
            foreach (var item in dList)
            {
                add(item, rst.Page3);
            }

            //待办事件
            var todoList = list.Where(t => t.Type == 4).ToList();
            rst.ToDo = todoList;

            return rst;
        }

        private List<Menu> _menuList;

        private void add(Menu model, List<MenuList> list)
        {
            MenuList item = new MenuList(model);
            list.Add(item);
            var cList = _menuList.Where(t => (t.ParentID ?? -1) == model.ID);
            foreach (var citem in cList)
            {
                add(citem, item.Children);
            }

        }



        private TreeMenu GetMenuChildren(List<TreeMenu> dataList, TreeMenu item)
        {
            List<TreeMenu> list = new List<TreeMenu>();

            for (int i = 0; i < dataList.Count; i++)
            {
                TreeMenu childrenItem = dataList[i];

                if (childrenItem.ParentID != null && childrenItem.ParentID == item.ID)
                {
                    childrenItem = GetMenuChildren(dataList, childrenItem);
                    list.Add(childrenItem);
                }
            }

            if (list.Count > 0)
            {
                item.expanded = true;
                item.leaf = false;
            }
            else
            {
                item.expanded = false;
                item.leaf = true;
            }

            item.children = list;

            return item;
        }
    }
}
