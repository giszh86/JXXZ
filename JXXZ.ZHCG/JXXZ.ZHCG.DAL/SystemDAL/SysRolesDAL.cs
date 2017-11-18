using JXXZ.ZHCG.DAL.Enum;
using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL
{
    public class SysRolesDAL
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="roles"></param>
        /// <returns></returns>
        public void Insert(Role roles)
        {
            using (Entities db = new Entities())
            {
                base_roles roleEnd = new base_roles();
                roleEnd.id = roles.ID;
                roleEnd.name = roles.Name;
                roleEnd.issystem = 0;
                roleEnd.seqno = roles.SeqNo;
                roleEnd.updatedtime = DateTime.Now;
                roleEnd.createdtime = DateTime.Now;
                roleEnd.comment = roles.Comment;
                db.base_roles.Add(roleEnd);
                db.SaveChanges();

                foreach (string permissionCode in roles.PermissionCodeArr)
                {
                    base_rolepermissions newRp = new base_rolepermissions()
                    {
                        roleid = roleEnd.id,
                        permissioncode = permissionCode
                    };
                    db.base_rolepermissions.Add(newRp);
                }

                db.SaveChanges();
            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public int Delete(int roleId)
        {
            using (Entities db = new Entities())
            {
                base_roles roles = db.base_roles.First(t => t.id == roleId);
                if (roles != null)
                {
                    //删除现有角色权限
                    List<base_rolepermissions> rpList = db.base_rolepermissions.Where(t => t.roleid == roleId).ToList();
                    
                    if (rpList.Count > 0)
                    {
                        foreach (var rp in rpList)
                        {
                            db.base_rolepermissions.Remove(rp);
                        }
                    }

                    //删除角色
                    db.base_roles.Remove(roles);
                }

                db.base_roles.Remove(roles);
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="roles"></param>
        /// <returns></returns>
        public void Edit(Role roles)
        {
            using (Entities db = new Entities())
            {
                base_roles rolesEdit = db.base_roles.Find(roles.ID);
                if (rolesEdit != null)
                {
                    rolesEdit.name = roles.Name;
                    rolesEdit.comment = roles.Comment;
                    rolesEdit.seqno = roles.SeqNo;
                    rolesEdit.updatedtime = DateTime.Now;

                    //删除现有角色权限
                    List<base_rolepermissions> rpList = db.base_rolepermissions.Where(t => t.roleid == roles.ID && !t.permissioncode.Contains("PHONE_")).ToList();

                    if (rpList.Count > 0)
                    {
                        foreach (var rp in rpList)
                        {
                            db.base_rolepermissions.Remove(rp);
                        }
                    }

                    //添加新角色权限
                    foreach (string permissionCode in roles.PermissionCodeArr)
                    {
                        base_rolepermissions newRp = new base_rolepermissions()
                        {
                            roleid = rolesEdit.id,
                            permissioncode = permissionCode
                        };
                        db.base_rolepermissions.Add(newRp);
                    }
                    db.SaveChanges();
                }   
            }
        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <returns></returns>
        public List<Role> Select()
        {
            List<Role> list = new List<Role>();
            using (Entities db = new Entities())
            {
                list = db.base_roles.OrderBy(t => t.createdtime).Select(t => new Role
                {
                    ID = t.id,
                    Name = t.name,
                    Comment = t.comment,
                    IsSystem = t.issystem,
                    SeqNo = t.seqno,
                    CreatedTime = t.createdtime,
                    UpdatedTime = t.updatedtime
                }).ToList();
            }
            return list;
        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Role> Select(List<Filter> filters, int start, int limit)
        {
            List<Role> list = new List<Role>();

            using (Entities db = new Entities())
            {
                IQueryable<Role> queryable =
                     from a in db.base_roles
                     orderby a.updatedtime descending
                     select new Role()
                     {
                         ID = a.id,
                         Name = a.name,
                         Comment = a.comment,
                         IsSystem = a.issystem,
                         SeqNo = a.seqno,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime
                     };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "Name":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.Name.Contains(value));
                                break;
                            case "IsSystem":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int isSystem = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.IsSystem == isSystem);
                                }
                                break;
                        }
                    }
                }

                queryable = queryable.Skip(start).Take(limit);

                list = queryable.ToList();
            }

            return list;
        }

        /// <summary>
        /// 获取总数
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int Select(List<Filter> filters)
        {
            List<base_roles> list = new List<base_roles>();
            using (Entities db = new Entities())
            {
                IQueryable<base_roles> query = db.base_roles;
                //筛选
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "Name":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.name.Contains(value));
                                break;
                            case "IsSystem":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int isSystem = Convert.ToInt32(value);
                                    query = query.Where(t => t.issystem == isSystem);
                                }
                                break;
                        }
                    }
                }
                list = query.ToList();
                return list.Count();
            }
        }

        /// <summary>
        /// 查询单条数据
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public base_roles SelectSingle(int roleId)
        {
            using (Entities db = new Entities())
            {
                base_roles roles = db.base_roles.First(t => t.id == roleId);
                return roles;
            }
        }

        public List<Role> GetRolesByUserID(int userID)
        {
            List<Role> list = new List<Role>();

            using (Entities db = new Entities())
            {
                IQueryable<Role> queryable =
                    from a in db.base_userroles
                    join b in db.base_roles on a.roleid equals b.id
                    where a.userid == userID
                    orderby b.seqno
                    select new Role()
                    {
                        ID = b.id,
                        Name = b.name
                    };

                list = queryable.ToList();
            }

            return list;
        }
    }
}
