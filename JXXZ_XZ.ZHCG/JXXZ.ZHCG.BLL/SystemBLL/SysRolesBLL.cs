using  System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;

namespace JXXZ.ZHCG.BLL
{
    public class SysRolesBLL
    {
        private SysRolesDAL sysrolesdal = new SysRolesDAL();
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="roles"></param>
        /// <returns></returns>
        public void Insert(Role roles)
        {
            sysrolesdal.Insert(roles);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public int Delete(int roleId)
        {
            return sysrolesdal.Delete(roleId);
        }

        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="roles"></param>
        /// <returns></returns>
        public void Edit(Role roles)
        {
           sysrolesdal.Edit(roles);
        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <returns></returns>
        public List<Role> Select()
        {
            return sysrolesdal.Select().ToList();
        }

        /// <summary>
        /// 查询角色分页列表
        /// </summary>
        public Paging<List<Role>> Select(List<Filter> filters, int start, int limit)
        {
            List<Role> items = sysrolesdal.Select(filters, start, limit);
            int total = sysrolesdal.Select(filters);

            Paging<List<Role>> paging = new Paging<List<Role>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 查询单条数据
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public base_roles SelectSingle(int roleId)
        {
            return sysrolesdal.SelectSingle(roleId);
        }

        public List<Role> GetRolesByUserID(int userID)
        {
            return sysrolesdal.GetRolesByUserID(userID);
        }
    }
}
