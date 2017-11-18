using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL
{
    public class PermissionBLL
    {
        private PermissionDAL dal = new PermissionDAL();

        /// <summary>
        /// 获得权限列表
        /// </summary>
        public List<Permission> GetPermissions()
        {
            return dal.GetPermissions();
        }

        /// <summary>
        /// 查询权限分页列表
        /// </summary>
        public Paging<List<Permission>> GetPermissions(List<Filter> filters, int start, int limit)
        {
            List<Permission> items = dal.GetPermissions(filters, start, limit);
            int total = dal.GetPermissionCount(filters);

            Paging<List<Permission>> paging = new Paging<List<Permission>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 根据据角色标识获得权限列表
        /// </summary>
        public List<Permission> GetPermissionsByRoleID(int roleID)
        {
            return dal.GetPermissionsByRoleID(roleID);
        }

        /// <summary>
        /// 根据据角色标识获得权限列表
        /// </summary>
        public List<Permission> GetPermissionsByUserID(int userID)
        {
            return dal.GetPermissionsByUserID(userID);
        }

        /// <summary>
        /// 获得树形权限列表
        /// </summary>
        public List<TreePermission> GetTreePermissions()
        {
            List<TreePermission> dataList = dal.GetPermissions()
                .Select(t => new TreePermission
                {
                    Code = t.Code,
                    Name = t.Name,
                    ParentCode = t.ParentCode,
                    Path = t.Path,
                    SeqNo = t.SeqNo
                }).OrderBy(t => t.SeqNo).ToList();

            List<TreePermission> list = new List<TreePermission>();

            if (dataList.Count > 0)
            {
                for (int i = 0; i < dataList.Count; i++)
                {
                    TreePermission item = dataList[i];

                    if (string.IsNullOrEmpty(item.ParentCode))
                    {
                        item = GetPermissionChildren(dataList, item);
                        list.Add(item);
                    }
                }
            }

            return list;
        }

        /// <summary>
        /// 添加权限
        /// </summary>
        public void AddPermission(Permission permission)
        {
            permission.Path = string.Format("{0}{1}/", permission.Path, permission.Code);
            dal.AddPermission(permission);
        }

        /// <summary>
        /// 修改权限
        /// </summary>
        public void EditPermission(Permission permission)
        {
            dal.EditPermission(permission);
        }

        /// <summary>
        /// 是否包含子集权限
        /// </summary>
        public bool IsExistsChildPermission(string code)
        {
            List<Permission> permissionList = dal.GetPermissionsByPath(string.Format("/{0}/", code));
            return permissionList.Count > 1;
        }

        /// <summary>
        /// 删除权限
        /// </summary>
        public void DeletePermission(string code)
        {
            dal.DeletePermission(code);
        }

        private TreePermission GetPermissionChildren(List<TreePermission> dataList, TreePermission item)
        {
            List<TreePermission> list = new List<TreePermission>();

            for (int i = 0; i < dataList.Count; i++)
            {
                TreePermission childrenItem = dataList[i];

                if (!string.IsNullOrEmpty(childrenItem.ParentCode) && item.Code == childrenItem.ParentCode)
                {
                    childrenItem = GetPermissionChildren(dataList, childrenItem);
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
