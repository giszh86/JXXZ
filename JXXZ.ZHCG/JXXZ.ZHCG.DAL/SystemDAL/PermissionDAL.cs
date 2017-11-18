using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL
{
    public class PermissionDAL
    {
        public List<Permission> GetPermissions()
        {
            List<Permission> list = new List<Permission>();

            using (Entities db = new Entities())
            {
                IQueryable<Permission> queryable =
                    from a in db.base_permissions
                    orderby a.seqno
                    select new Permission()
                    {
                        Code = a.code,
                        Name = a.name,
                        ParentCode = a.parentcode,
                        Path = a.path
                    };

                list = queryable.ToList();
            }

            return list;
        }

        public List<Permission> GetPermissions(List<Filter> filters, int start, int limit)
        {
            List<Permission> list = new List<Permission>();

            using (Entities db = new Entities())
            {
                IQueryable<Permission> queryable =
                    from a in db.base_permissions
                    orderby a.seqno
                    select new Permission()
                    {
                        Code = a.code,
                        Name = a.name,
                        ParentCode = a.parentcode,
                        Path = a.path,
                        Comment = a.comment,
                        SeqNo = a.seqno
                    };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "ParentCode":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.ParentCode.Contains(value));
                                break;
                        }
                    }
                }

                list = queryable.ToList();
            }

            return list;
        }

        public int GetPermissionCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<Permission> queryable =
                    from a in db.base_permissions
                    orderby a.seqno
                    select new Permission()
                    {
                        Code = a.code,
                        Name = a.name,
                        ParentCode = a.parentcode
                    };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "ParentCode":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.ParentCode.Contains(value));
                                break;
                        }
                    }
                }

                return queryable.Count();
            }
        }

        public List<Permission> GetPermissionsByRoleID(int roleID)
        {
            List<Permission> list = new List<Permission>();

            using (Entities db = new Entities())
            {
                IQueryable<Permission> queryable =
                    from a in db.base_permissions
                    join b in db.base_rolepermissions on a.code equals b.permissioncode
                    where b.roleid == roleID
                    orderby a.seqno
                    select new Permission()
                    {
                        Code = a.code,
                        Name = a.name
                    };

                list = queryable.ToList();
            }

            return list;
        }

        public List<Permission> GetPermissionsByUserID(int userID)
        {
            List<Permission> list = new List<Permission>();

            using (Entities db = new Entities())
            {
                IQueryable<Permission> queryable =
                    from a in db.base_userroles
                    join b in db.base_roles on a.roleid equals b.id
                    join c in db.base_rolepermissions on b.id equals c.roleid
                    join d in db.base_permissions on c.permissioncode equals d.code
                    where a.userid == userID
                    group d by new { d.code, d.name } into pms
                    select new Permission()
                    {
                        Code = pms.Key.code,
                        Name = pms.Key.name
                    };

                
                list = queryable.ToList();
            }

            return list;
        }

        public List<Permission> GetPermissionsByPath(string path)
        {
            List<Permission> list = new List<Permission>();

            using (Entities db = new Entities())
            {
                IQueryable<Permission> queryable =
                    from a in db.base_permissions
                    where a.path.Contains(path)
                    select new Permission()
                    {
                        Code = a.code,
                        Name = a.name
                    };

                list = queryable.ToList();
            }

            return list;
        }

        public int AddPermission(Permission model)
        {
            using (Entities db = new Entities())
            {
                base_permissions newModel = new base_permissions()
                {
                    code = model.Code,
                    name = model.Name,
                    parentcode = model.ParentCode,
                    path = model.Path,
                    comment = model.Comment,
                    seqno = model.SeqNo
                };
                db.base_permissions.Add(newModel);

                return db.SaveChanges();
            }
        }

        public int EditPermission(Permission model)
        {
            using (Entities db = new Entities())
            {
                base_permissions newModel = db.base_permissions.Find(model.Code);

                if (newModel != null)
                {
                    newModel.code = model.Code;
                    newModel.name = model.Name;
                    newModel.comment = model.Comment;
                    newModel.seqno = model.SeqNo;

                    return db.SaveChanges();
                }
            }

            return 0;
        }

        public int DeletePermission(string code)
        {
            using (Entities db = new Entities())
            {
                base_permissions model = db.base_permissions.Find(code);

                if (model != null)
                {
                    List<base_permissionmenus> pmList = db.base_permissionmenus.Where(t => t.permissioncode == code).ToList();

                    if (pmList.Count > 0)
                    {
                        foreach (base_permissionmenus item in pmList)
                        {
                            db.base_permissionmenus.Remove(item);
                        }
                    }

                    List<base_rolepermissions> rmList = db.base_rolepermissions.Where(t => t.permissioncode == code).ToList();

                    if (rmList.Count > 0)
                    {
                        foreach (base_rolepermissions item in rmList)
                        {
                            db.base_rolepermissions.Remove(item);
                        }
                    }

                    db.base_permissions.Remove(model);
                }

                return db.SaveChanges();
            }
        }
    }
}
