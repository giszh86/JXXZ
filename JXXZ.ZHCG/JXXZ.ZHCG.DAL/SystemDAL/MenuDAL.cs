using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL
{
    public class MenuDAL
    {
        /// <summary>
        /// 根据用户标识查询菜单列表
        /// </summary>
        public List<Menu> GetMenusByUserID(int userID, int? roleID = null)
        {
            List<Menu> list = new List<Menu>();
            using (Entities db = new Entities())
            {
                if (roleID != null)
                {
                    list = (from rp in db.base_rolepermissions
                            join pm in db.base_permissionmenus on rp.permissioncode equals pm.permissioncode
                            join menu in db.base_menus on pm.menuid equals menu.id
                            where rp.roleid == roleID && menu.type == 1
                            group menu by new { menu.id, menu.name, menu.parentid, menu.path, menu.url, menu.seqno, menu.icon } into g
                            orderby g.Key.seqno
                            select new Menu
                            {
                                ID = g.Key.id,
                                Name = g.Key.name,
                                ParentID = g.Key.parentid,
                                Path = g.Key.path,
                                Url = g.Key.url,
                                icon = g.Key.icon
                            }).ToList();
                }
                else
                {
                    list = (from ur in db.base_userroles
                            join rp in db.base_rolepermissions on ur.roleid equals rp.roleid
                            join pm in db.base_permissionmenus on rp.permissioncode equals pm.permissioncode
                            join menu in db.base_menus on pm.menuid equals menu.id
                            where ur.userid == userID && menu.type == 1
                            group menu by new { menu.id, menu.name, menu.parentid, menu.path, menu.url, menu.seqno, menu.icon } into g
                            orderby g.Key.seqno
                            select new Menu
                            {
                                ID = g.Key.id,
                                Name = g.Key.name,
                                ParentID = g.Key.parentid,
                                Path = g.Key.path,
                                Url = g.Key.url,
                                icon = g.Key.icon
                            }).ToList();
                }

                return list;
            }

        }

        public IEnumerable<Menu> GetMenusByPhone(int userID)
        {
            using (Entities db = new Entities())
            {
                //menu只要手机端的
                var menuList = from menu in db.base_menus where menu.type != 1 select menu;

                var queryable =
                    from ur in db.base_userroles
                    join rp in db.base_rolepermissions on ur.roleid equals rp.roleid
                    join pm in db.base_permissionmenus on rp.permissioncode equals pm.permissioncode
                    join menu in menuList on pm.menuid equals menu.id
                    where ur.userid == userID
                    group menu by new { menu.id, menu.name, menu.parentid, menu.path, menu.url, menu.seqno, menu.icon, menu.comment, menu.type } into g
                    orderby g.Key.seqno, g.Key.id
                    select new Menu
                    {
                        ID = g.Key.id,
                        Name = g.Key.name,
                        ParentID = g.Key.parentid,
                        Path = g.Key.path,
                        Url = g.Key.url,
                        icon = g.Key.icon,
                        Comment = g.Key.comment,
                        Type = g.Key.type ?? 2
                    };
                List<Menu> rst = queryable.ToList();
                return rst;
            }
        }


    }
}
