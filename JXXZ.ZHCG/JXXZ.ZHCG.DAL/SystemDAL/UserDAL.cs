using JXXZ.ZHCG.DAL.Enum;
using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;

namespace JXXZ.ZHCG.DAL
{
    public class UserDAL
    {
        public User GetUserByID(int id)
        {
            using (Entities db = new Entities())
            {
                User user = db.base_users.Where(t => t.id == id)
                    .Select(t => new User()
                    {
                        ID = t.id,
                        Code = t.code,
                        DisplayName = t.displayname,
                        LoginPwd = t.loginpwd,
                        UnitID = t.unitid,
                        UserTypeID = t.usertypeid
                    })
                    .SingleOrDefault();

                return user;
            }
        }

        public List<User> GetUsersByLoginName(string loginName)
        {
            List<User> list = new List<User>();

            using (Entities db = new Entities())
            {
                IQueryable<User> queryable = from t in db.base_users
                                             join un in db.base_units
                                             on t.unitid equals un.id
                                             where t.loginname == loginName
                                             select new User
                                             {
                                                 ID = t.id,
                                                 Code = t.code,
                                                 DisplayName = t.displayname,
                                                 LoginPwd = t.loginpwd,
                                                 UnitID = t.unitid,
                                                 UserTypeID = t.usertypeid,
                                                 UnitName = un.name,
                                                 UnitType = un.unittypeid
                                             };


                list = queryable.ToList();
            }

            return list;
        }

        //根据用户ID获取用户所有角色
        public string GetRoleIDsByUserID(int userid)
        {
            string roleids = "";
            using (Entities db = new Entities())
            {
                IQueryable<base_userroles> list = db.base_userroles.Where(t => t.userid == userid);
                foreach (var item in list)
                {
                    roleids += item.roleid.ToString() + ",";
                }
            }
            roleids = roleids.Substring(0, roleids.Length - 1);
            return roleids;
        }

        public List<User> GetUsersByUnitID(int unitID)
        {
            List<User> list = new List<User>();

            using (Entities db = new Entities())
            {
                IQueryable<User> queryable = from a in db.base_users
                                             join b_join in db.base_units on a.unitid equals b_join.id into btmp
                                             from b in btmp.DefaultIfEmpty()
                                             where a.unitid == unitID
                                             select new User
                                             {
                                                 ID = a.id,
                                                 DisplayName = a.displayname,
                                                 UnitID = b.id,
                                             };


                list = queryable.ToList();
            }

            return list;
        }

        public List<User> GetUsers(List<Filter> filters, int start, int limit)
        {
            List<User> list = new List<User>();

            using (Entities db = new Entities())
            {
                IQueryable<User> queryable =
                     from a in db.base_users
                     join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                     from c in cTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     select new User()
                     {
                         ID = a.id,
                         Code = a.code,
                         DisplayName = a.displayname,
                         UserTypeID = a.usertypeid,
                         UserTypeName = b == null ? "" : b.name,
                         UnitID = a.unitid,
                         UnitName = c == null ? "" : c.name,
                         LoginName = a.loginname,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime,
                         mobile = a.mobile,
                         Sepon = a.sepon,
                         phone = a.phone,
                         shortnumber = a.shortnumber,
                         remarks1 = a.remarks1,
                     };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "Code":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.Code.Contains(value));
                                break;
                            case "DisplayName":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.DisplayName.Contains(value));
                                break;
                            case "UnitID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.UnitID == unitID);
                                }
                                break;
                            case "UserTypeID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitTypeID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.UserTypeID == unitTypeID);
                                }
                                break;
                        }
                    }
                }

                queryable = queryable.OrderBy(t => t.Sepon).Skip(start).Take(limit);

                list = queryable.ToList();
            }

            return list;
        }

        public int GetUserCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<base_users> queryable = db.base_users.AsQueryable();

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "Code":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.code.Contains(value));
                                break;
                            case "DisplayName":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.displayname.Contains(value));
                                break;
                            case "UserTypeID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitTypeID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.usertypeid == unitTypeID);
                                }
                                break;
                        }
                    }
                }

                return queryable.Count();
            }
        }

        public void AddUser(User user)
        {
            using (Entities db = new Entities())
            {
                base_users newUser = new base_users()
                {
                    code = user.Code,
                    displayname = user.DisplayName,
                    unitid = user.UnitID,
                    usertypeid = user.UserTypeID,
                    loginname = user.LoginName,
                    loginpwd = user.LoginPwd,
                    createdtime = user.CreatedTime,
                    updatedtime = user.UpdatedTime,
                    avatar = user.avatar,
                    mobile = user.mobile,
                    sepon = user.Sepon,
                    phone = user.phone,
                    shortnumber = user.shortnumber,
                    remarks1 = user.remarks1,
                };

                db.base_users.Add(newUser);
                db.SaveChanges();

                foreach (int roleID in user.RoleIDArr)
                {
                    base_userroles newUserRole = new base_userroles()
                    {
                        userid = newUser.id,
                        roleid = roleID
                    };
                    db.base_userroles.Add(newUserRole);
                }

                db.SaveChanges();
            }
        }

        public void EditUser(User user)
        {
            using (Entities db = new Entities())
            {
                base_users newUser = db.base_users.Find(user.ID);

                if (newUser != null)
                {
                    newUser.code = user.Code;
                    newUser.displayname = user.DisplayName;
                    if (user.UnitID != null && user.UnitID.Value != 0)
                    {
                        newUser.unitid = user.UnitID;
                    }

                    newUser.usertypeid = user.UserTypeID;
                    newUser.loginname = user.LoginName;
                    newUser.sepon = user.Sepon;
                    if (!string.IsNullOrEmpty(user.avatar))
                    {
                        newUser.avatar = user.avatar;
                    }

                    newUser.mobile = user.mobile;
                    newUser.phone = user.phone;
                    newUser.shortnumber = user.shortnumber;
                    newUser.remarks1 = user.remarks1;
                    if (!string.IsNullOrEmpty(user.LoginPwd))
                        newUser.loginpwd = user.LoginPwd;

                    newUser.updatedtime = user.UpdatedTime;

                    //删除现有角色
                    List<base_userroles> userRoleList = db.base_userroles.Where(t => t.userid == user.ID).ToList();

                    if (userRoleList.Count > 0)
                    {
                        foreach (var userRole in userRoleList)
                        {
                            db.base_userroles.Remove(userRole);
                        }
                    }

                    //添加新角色
                    foreach (int roleID in user.RoleIDArr)
                    {
                        base_userroles newUserRole = new base_userroles()
                        {
                            userid = newUser.id,
                            roleid = roleID
                        };
                        db.base_userroles.Add(newUserRole);
                    }

                    db.SaveChanges();
                }
            }
        }

        public void EditUserLoginPwd(User user)
        {
            using (Entities db = new Entities())
            {
                base_users newUser = db.base_users.Find(user.ID);

                if (newUser != null)
                {
                    newUser.loginpwd = user.LoginPwd;
                    newUser.updatedtime = user.UpdatedTime;

                    db.SaveChanges();
                }
            }
        }


        public void DeleteUser(int id)
        {
            using (Entities db = new Entities())
            {
                base_users user = db.base_users.Where(t => t.id == id).SingleOrDefault();

                if (user != null)
                {
                    //删除现有角色
                    List<base_userroles> userRoleList = db.base_userroles.Where(t => t.userid == id).ToList();

                    if (userRoleList.Count > 0)
                    {
                        foreach (var userRole in userRoleList)
                        {
                            db.base_userroles.Remove(userRole);
                        }
                    }

                    //删除角色
                    db.base_users.Remove(user);
                }

                db.SaveChanges();
            }
        }


        /// <summary>
        /// 获取列表的总页数
        /// </summary>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetUsersListCount(string name, int limit)
        {
            PageModel model = new PageModel();
            using (Entities db = new Entities())
            {
                IQueryable<base_users> lists = db.base_users;
                if (!string.IsNullOrEmpty(name))
                {
                    lists = lists.Where(a => a.displayname.Contains(name));
                }
                int count = lists.Count();
                int pagecount = 0;
                if (count % limit == 0)
                {
                    pagecount = count / limit;
                }
                else
                {
                    pagecount = (count / limit) + 1;
                }

                return pagecount;
            }
        }


        public List<UserModel> GetUsersList(string name, int start, int limit)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable =
                     from a in db.base_users
                     join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                     from c in cTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     select new UserModel()
                     {
                         ID = a.id,
                         Code = a.code,
                         DisplayName = a.displayname,
                         UserTypeID = a.usertypeid,
                         UserTypeName = b == null ? "" : b.name,
                         UnitID = a.unitid,
                         UnitName = c == null ? "" : c.name,
                         LoginName = a.loginname,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime,
                         IsOnline = a.isonline
                     };

                if (!string.IsNullOrEmpty(name))
                {
                    queryable = queryable.Where(a => a.DisplayName.Contains(name));
                }

                queryable = queryable.OrderByDescending(a => a.IsOnline).Skip((start - 1) * limit).Take(limit);

                list = queryable.ToList();
            }

            return list;
        }

        public int GetUsersListCount(string name)
        {
            using (Entities db = new Entities())
            {
                IQueryable<base_users> queryable = db.base_users.AsQueryable();
                if (!string.IsNullOrEmpty(name))
                {
                    queryable = queryable.Where(a => a.displayname.Contains(name));
                }

                return queryable.Count();
            }
        }

        /// <summary>
        /// 根据用户标识获取用户
        /// </summary>
        /// <param name="userID">用户标识</param>
        /// <returns></returns>
        public static base_users GetUserByUserID(decimal userID)
        {
            Entities db = new Entities();

            return db.base_users.SingleOrDefault(t => t.id == userID);
        }

        /// <summary>
        /// 根据用户标识获取用户名
        /// </summary>
        /// <param name="userID">用户标识</param>
        /// <returns></returns>
        public static string GetUserNameByUserID(decimal userID)
        {
            base_users model = GetUserByUserID(userID);
            if (model != null)
                return model.displayname;
            else
                return "";
        }
        /// <summary>
        /// 根据部门获取用户
        /// </summary>
        /// <param name="userID">用户标识</param>
        /// <returns></returns>
        public static base_users GetUserByDeptID(decimal deptID)
        {
            Entities db = new Entities();

            return db.base_users.SingleOrDefault(t => t.unitid == deptID);
        }

        /// <summary>
        /// 根据部门编号获取用户名
        /// </summary>
        /// <param name="deptID"></param>
        /// <returns></returns>
        public static string GetUserNameByDeptID(decimal deptID)
        {
            base_users model = GetUserByDeptID(deptID);
            if (model != null)
                return model.displayname;
            else
                return "";
        }

        /// <summary>
        /// 根据部门获取用户
        /// </summary>
        /// <param name="userID">用户标识</param>
        /// <returns></returns>
        public static base_users GetUserByRoleID(decimal roleID)
        {
            Entities db = new Entities();

            return db.base_users.SingleOrDefault(t => t.usertypeid == roleID);
        }

        /// <summary>
        /// 根据角色ID获取用户名
        /// </summary>
        /// <param name="roleID"></param>
        /// <returns></returns>
        public static string GetUserNameByRoleID(decimal roleID)
        {
            base_users model = GetUserByRoleID(roleID);
            if (model != null)
                return model.displayname;
            else
                return "";
        }



        public List<UserModel> GetUsersPersonnelList(int? unitid, int roleid)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {

                IQueryable<UserModel> queryable =
                     from a in db.base_users
                     join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                     from c in cTemp.DefaultIfEmpty()
                     join d_join in db.base_userroles on a.id equals d_join.userid into dTemp
                     from d in dTemp.DefaultIfEmpty()
                     join e_join in db.base_roles on d.roleid equals e_join.id into eTemp
                     from e in eTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     where e.id == roleid
                     select new UserModel()
                     {
                         ID = a.id,
                         Code = a.code,
                         phone=a.phone,
                         DisplayName = a.displayname,
                         UserTypeID = a.usertypeid,
                         UserTypeName = b == null ? "" : b.name,
                         UnitID = a.unitid,
                         UnitName = c == null ? "" : c.name,
                         LoginName = a.loginname,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime,
                         IsOnline = a.isonline,
                         Path = c.path
                     };
                base_units model = db.base_units.FirstOrDefault(a => a.id == unitid);
                string path = "";
                if (model != null)
                {
                    if (model.unittypeid == 4)
                        path = "/1/2/" + model.parentid + "/";
                    else
                        path = model.path;
                    queryable = queryable.Where(a => a.Path.Contains(path));
                }
                list = queryable.ToList();
            }

            return list;
        }

        /// <summary>
        /// 根据用户部门标识获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersStaff(int unitid)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable =
                    from a in db.base_users
                    join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                    from b in bTemp.DefaultIfEmpty()
                    join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                    from c in cTemp.DefaultIfEmpty()
                    join d_join in db.base_userroles on a.id equals d_join.userid into dTemp
                    from d in dTemp.DefaultIfEmpty()
                    join e_join in db.base_roles on d.roleid equals e_join.id into eTemp
                    from e in eTemp.DefaultIfEmpty()
                    orderby a.updatedtime descending
                    where c.id == unitid
                    select new UserModel()
                    {
                        ID = a.id,
                        Code = a.code,
                        DisplayName = a.displayname,
                        UserTypeID = a.usertypeid,
                        UserTypeName = b == null ? "" : b.name,
                        UnitID = a.unitid,
                        UnitName = c == null ? "" : c.name,
                        LoginName = a.loginname,
                        CreatedTime = a.createdtime,
                        UpdatedTime = a.updatedtime,
                        IsOnline = a.isonline
                    };



                list = queryable.ToList();
            }

            return list;
        }

        /// <summary>
        /// 根据用户类型标识获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersStaffList(int roleid)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable =
                    from a in db.base_users
                    join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                    from b in bTemp.DefaultIfEmpty()
                    join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                    from c in cTemp.DefaultIfEmpty()
                    join d_join in db.base_userroles on a.id equals d_join.userid into dTemp
                    from d in dTemp.DefaultIfEmpty()
                    join e_join in db.base_roles on d.roleid equals e_join.id into eTemp
                    from e in eTemp.DefaultIfEmpty()
                    orderby a.updatedtime descending
                    where e.id == roleid
                    select new UserModel()
                    {
                        ID = a.id,
                        Code = a.code,
                        DisplayName = a.displayname,
                        UserTypeID = a.usertypeid,
                        UserTypeName = b == null ? "" : b.name,
                        UnitID = a.unitid,
                        UnitName = c == null ? "" : c.name,
                        LoginName = a.loginname,
                        CreatedTime = a.createdtime,
                        UpdatedTime = a.updatedtime,
                        IsOnline = a.isonline
                    };



                list = queryable.ToList();
            }

            return list;
        }


        /// <summary>
        /// 登录校验
        /// </summary>
        /// <param name="account">帐号</param>
        /// <param name="password">密码</param>
        /// <returns>根据账号密码获取登录用户</returns>
        public User LoginApi(User user)
        {
            Entities db = new Entities();
            IQueryable<User> queryable = from a in db.base_users
                                         join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                                         from b in bTemp.DefaultIfEmpty()
                                         join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                                         from c in cTemp.DefaultIfEmpty()
                                         orderby a.updatedtime descending
                                         where a.loginname == user.LoginName && a.loginpwd == user.LoginPwd
                                         select new User
                                         {
                                             ID = a.id,
                                             Code = a.code,
                                             DisplayName = a.displayname,
                                             UserTypeID = a.usertypeid,
                                             UserTypeName = b == null ? "" : b.name,
                                             UnitID = a.unitid,
                                             UnitName = c == null ? "" : c.name,
                                             LoginName = a.loginname,
                                             CreatedTime = a.createdtime,
                                             UpdatedTime = a.updatedtime,
                                             IsOnline = a.isonline,
                                             zfzbh = "todo",
                                             parentid = c == null ? 0 : c.parentid,
                                             mobile = a.mobile,
                                             sex = a.sex,
                                             avatar = a.avatar

                                         };
            User model = queryable.FirstOrDefault();
            if (model != null)
            {
                IQueryable<UserType> rolequeryable = from a in db.base_userroles
                                                     join b_join in db.base_roles on a.roleid equals b_join.id into bTemp
                                                     from b in bTemp.DefaultIfEmpty()
                                                     where a.userid == model.ID
                                                     select new UserType
                                                     {
                                                         ID = b.id,
                                                         Name = b.name
                                                     };
                List<UserType> roselist = rolequeryable.ToList();
                foreach (var item in roselist)
                {
                    model.Roles += item.ID + ",";
                    model.RoleNames += item.Name + ",";
                }
                model.Path = "UserUrlOriginalPath";
            }

            return model;
        }


        /// <summary>
        /// 根据用户角色获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersListRole(string rolename, int unitid, int? caseid = null)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable =
                    from a in db.base_users
                    join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                    from b in bTemp.DefaultIfEmpty()
                    join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                    from c in cTemp.DefaultIfEmpty()
                    join d_join in db.base_userroles on a.id equals d_join.userid into dTemp
                    from d in dTemp.DefaultIfEmpty()
                    join e_join in db.base_roles on d.roleid equals e_join.id into eTemp
                    from e in eTemp.DefaultIfEmpty()
                    orderby a.updatedtime descending
                    where e.name == rolename
                    select new UserModel()
                    {
                        ID = a.id,
                        Code = a.code,
                        DisplayName = a.displayname,
                        UserTypeID = a.usertypeid,
                        UserTypeName = b == null ? "" : b.name,
                        UnitID = a.unitid,
                        UnitName = c == null ? "" : c.name,
                        LoginName = a.loginname,
                        CreatedTime = a.createdtime,
                        UpdatedTime = a.updatedtime,
                        IsOnline = a.isonline
                    };

                if (rolename == "中队长")
                    queryable = queryable.Where(t => t.UnitID == unitid);

                if (rolename == "执法人员" && caseid != null)
                {
                    Case_CasesModel casemodel = (from model in db.case_cases
                                                 where model.caseid == caseid
                                                 select new Case_CasesModel
                                                 {
                                                     caseid = model.caseid,
                                                     zbuserid = model.zbuserid,
                                                     xbuserid = model.xbuserid
                                                 }).FirstOrDefault();
                    queryable = db.base_users.Where(t => t.id == casemodel.zbuserid || t.id == casemodel.xbuserid)
                                .Select(t => new UserModel
                                {
                                    ID = t.id,
                                    DisplayName = t.displayname
                                });
                }

                list = queryable.ToList();
            }

            return list;
        }

        /// <summary>
        /// 根据用户类型获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersListUnit(string unitname)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable =
                    from a in db.base_users
                    join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                    from b in bTemp.DefaultIfEmpty()
                    join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                    from c in cTemp.DefaultIfEmpty()
                    join d_join in db.base_userroles on a.id equals d_join.userid into dTemp
                    from d in dTemp.DefaultIfEmpty()
                    join e_join in db.base_roles on d.roleid equals e_join.id into eTemp
                    from e in eTemp.DefaultIfEmpty()
                    orderby a.updatedtime descending
                    where c.name == unitname && d.roleid == 16
                    select new UserModel()
                    {
                        ID = a.id,
                        Code = a.code,
                        DisplayName = a.displayname,
                        UserTypeID = a.usertypeid,
                        UserTypeName = b == null ? "" : b.name,
                        UnitID = a.unitid,
                        UnitName = c == null ? "" : c.name,
                        LoginName = a.loginname,
                        CreatedTime = a.createdtime,
                        UpdatedTime = a.updatedtime,
                        IsOnline = a.isonline
                    };



                list = queryable.ToList();
            }

            return list;
        }


        /// <summary>
        /// 根据userid查询手机号
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public UserMobile GetUserModel(int userid)
        {
            UserMobile model = new UserMobile();
            using (Entities db = new Entities())
            {
                IQueryable<UserMobile> query = from a in db.base_users
                                               where a.id == userid
                                               select new UserMobile
                                               {
                                                   name = a.displayname,
                                                   //mobile = a.mobile,
                                                   mobile = a.phone
                                               };

                model = query.FirstOrDefault();
            }
            return model;
        }

        /// <summary>
        /// 根据部门ID获取个人信息，手机号
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public List<PhoneModel> GetUserPhone(int unitid)
        {
            List<PhoneModel> list = new List<PhoneModel>();
            using (Entities db = new Entities())
            {
                IQueryable<PhoneModel> queryable = from a in db.base_users
                                                   where a.unitid == unitid
                                                   select new PhoneModel
                                                   {
                                                       id = a.id,
                                                       name = a.displayname,
                                                       phone = a.mobile,
                                                       parentid = 0,
                                                   };
                list = queryable.ToList();
            }
            return list;
        }



        public List<User> GetAllUsers(List<Filter> filters)
        {
            List<User> list = new List<User>();

            using (Entities db = new Entities())
            {
                IQueryable<User> queryable =
                     from a in db.base_users
                     join b_join in db.base_usertypes on a.usertypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                     from c in cTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     select new User()
                     {
                         ID = a.id,
                         Code = a.code,
                         DisplayName = a.displayname,
                         UserTypeID = a.usertypeid,
                         UserTypeName = b == null ? "" : b.name,
                         UnitID = a.unitid,
                         UnitName = c == null ? "" : c.name,
                         LoginName = a.loginname,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime,
                         mobile = a.mobile,
                     };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "DisplayName":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(a => a.DisplayName.Contains(value));
                                break;
                        }
                    }
                }

                list = queryable.ToList();
            }

            return list;
        }


        public BaseUserModel GetUserById(int userid)
        {

            DateTime datetime = DateTime.Now;
            DateTime d1 = datetime.Date;
            DateTime d2 = d1.AddDays(1);
            using (Entities db = new Entities())
            {
                IQueryable<BaseUserModel> queryable =
                     from a in db.base_users
                     join b_join in db.qw_userlastpositions on a.id equals b_join.userid into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                     from c in cTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     select new BaseUserModel()
                     {
                         id = a.id,
                         code = a.code,
                         displayname = a.displayname,
                         unitid = a.unitid,
                         usertypeid = a.usertypeid,
                         avatar = a.avatar,
                         regionid = a.regionid,
                         mapelementbiztype = a.mapelementbiztype,
                         mapelementdevicetype = a.mapelementdevicetype,
                         sex = a.sex,
                         birthday = a.birthday,
                         address = a.address,
                         mobile = a.mobile,
                         telephone = a.telephone,
                         email = a.email,
                         isonline = a.isonline,
                         updatedtime = a.updatedtime,
                         createdtime = a.createdtime,
                         positiontime = b.positiontime,
                         x84 = b.x84,
                         y84 = b.y84,
                         x2000 = b.x2000,
                         y2000 = b.y2000,
                         unitname = c.name,
                         phone = a.phone,
                     };
                BaseUserModel model = queryable.FirstOrDefault(a => a.id == userid);
                if (model != null)
                {
                    model.minutes = 0;
                    model.hour = 0;
                    model.IsOnDuty = 0;
                    model.FilesPath = "UserUrlOriginalPath";
                    UserTask usertaskmodel = new QW_UserTasksDAL().GetApiUserTaskList(userid).FirstOrDefault();
                    model.alarmsCount = db.qw_alarmmemorylocationdatas.Count(a => a.createtime >= d1 && a.createtime <= d2 && a.userid == userid);
                    if (usertaskmodel != null)
                        model.grometry = usertaskmodel.xcgrometry;

                    if (model.positiontime != null)
                    {
                        TimeSpan? ts = datetime - model.positiontime;

                        if (ts.Value.TotalMinutes > 1 && ts.Value.TotalMinutes != 0)
                        {
                            if (ts.Value.TotalMinutes < 15)
                                model.IsOnDuty = 1;
                            if (ts.Value.TotalMinutes > 60)
                                model.hour = (ts.Value.Days * 24) + ts.Value.Hours;
                            model.minutes = ts.Value.Minutes;
                        }
                        else
                        {
                            model.IsOnDuty = 1;
                        }
                    }

                    model.rolename = GetUserRole(userid);
                }
                return model;
            }

        }
        public List<string> GetUserRole(int userid)
        {
            List<string> rolename = new List<string>();
            using (Entities db = new Entities())
            {
                IQueryable<User> quwerbale = from a in db.base_userroles
                                             join b_join in db.base_roles on a.roleid equals b_join.id into btmp
                                             from b in btmp.DefaultIfEmpty()
                                             where a.userid == userid
                                             select new User
                                             {
                                                 RoleNames = b.name,
                                             };
                foreach (var item in quwerbale.ToList())
                {
                    rolename.Add(item.RoleNames);
                }
            }

            return rolename;
        }


        public List<User> GetZDUserList(List<Filter> filters, int start, int limit)
        {

            List<User> list = new List<User>();
            DateTime datetime = DateTime.Now;
            using (Entities db = new Entities())
            {
                IQueryable<User> queryable = (from a in db.base_users
                                              join b in db.base_units
                                              on a.unitid equals b.id
                                              join d_join in db.qw_userlastpositions on a.id equals d_join.userid into dTemp
                                              from d in dTemp.DefaultIfEmpty()
                                              where b.unittypeid != 1
                                              select new User
                                              {
                                                  ID = a.id,
                                                  DisplayName = a.displayname,
                                                  Code = a.code,
                                                  UpdatedTime = a.updatedtime,
                                                  UnitTypeID = b.unittypeid,
                                                  Path = b.path,
                                                  CreatedTime = d.positiontime,
                                                  // IsOnline = 0,// System.Data.Objects.EntityFunctions.DiffMinutes(datetime,d.positiontime.Value).Value,
                                              }).AsQueryable<User>();
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "UnitTypeID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id == 1)
                                        queryable = queryable.Where(t => t.UnitTypeID == 2 || t.UnitTypeID == 4);
                                    else if (id == 2)
                                        queryable = queryable.Where(t => t.UnitTypeID == 3);
                                    else if (id == 3)
                                        queryable = queryable.Where(t => t.UnitTypeID == 6);
                                }
                                break;
                            case "DisplayName":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.DisplayName.Contains(value));
                                break;
                            case "UnitID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                    {
                                        string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                        queryable = queryable.Where(t => t.Path != null && t.Path.Contains(path));
                                    }
                                }
                                break;
                        }
                    }
                }
                list = queryable.ToList();

            }
            return list.OrderByDescending(a => a.IsOnline).Skip(start).Take(limit).ToList(); ;
        }
        public int GetZDUserCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<User> queryable = (from a in db.base_users
                                              join b in db.base_units
                                              on a.unitid equals b.id
                                              join d_join in db.qw_userlastpositions on a.id equals d_join.userid into dTemp
                                              from d in dTemp.DefaultIfEmpty()
                                              where b.unittypeid != 1
                                              select new User
                                              {
                                                  ID = a.id,
                                                  DisplayName = a.displayname,
                                                  IsOnline = a.isonline,
                                                  Code = a.code,
                                                  UpdatedTime = a.updatedtime,
                                                  UnitTypeID = b.unittypeid,
                                                  Path = b.path,
                                                  CreatedTime = d.positiontime,
                                              }).AsQueryable<User>();
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "UnitTypeID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id == 1)
                                        queryable = queryable.Where(t => t.UnitTypeID == 2 || t.UnitTypeID == 4);
                                    else if (id == 2)
                                        queryable = queryable.Where(t => t.UnitTypeID == 3);
                                    else if (id == 3)
                                        queryable = queryable.Where(t => t.UnitTypeID == 6);
                                }
                                break;
                            case "DisplayName":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.DisplayName.Contains(value));
                                break;
                            case "UnitID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    if (id != 0)
                                    {
                                        string path = db.base_units.FirstOrDefault(a => a.id == id).path;
                                        queryable = queryable.Where(t => t.Path != null && t.Path.Contains(path));
                                    }
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }



        /// <summary>
        ///根据部门标识获取中队当前在线人员
        /// </summary>
        /// <returns></returns>
        public int GetOnlinePersonCounts(int middleId)
        {
            List<int> lists = new List<int>();

            using (Entities db = new Entities())
            {
                string outlineTime = DateTime.Now.AddMinutes(-15).ToString("yyyy-MM-dd HH:mm:ss");
                string sql = string.Format(@"select * from base_users as a 
INNER JOIN qw_userlastpositions as b on a.id=b.userid
where a.unitid in (select id from base_units WHERE FIND_IN_SET(id,queryChildrenUnits({0}))) AND b.positiontime >= '{1}'", middleId, outlineTime);
                IEnumerable<base_users> query = db.Database.SqlQuery<base_users>(sql);
                return query.Count();
            }
        }

        /// <summary>
        /// 根据部门标识获取中队人员总数
        /// </summary>
        /// <param name="middleId"></param>
        /// <returns></returns>
        public int GetPersonCounts(int middleId)
        {
            using (Entities db = new Entities())
            {

                string sql = string.Format(@"select count(1) from base_users 

where unitid in (select id from base_units WHERE FIND_IN_SET(id,queryChildrenUnits({0})))", middleId);

                IEnumerable<int> query = db.Database.SqlQuery<int>(sql);
                int count = query.FirstOrDefault();
                // int count = db.base_users.Where(t => t.unitid == middleId).Count();
                return count;
            }
        }



        /// <summary>
        /// 今日中队在线人员统计《新城中队》
        /// </summary>
        /// <returns></returns>
        public List<TJUser> GetTodayOnlineCount(string unitpath)
        {
            string startTime = "07:00:00";
            string endTime = "18:00:00";

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select sum(tj.onlinecount) count,tj.stattime,unitname from tj_persononlines  tj
where tj.unitpath like '{2}' and   date_format(tj.stattime,'%H')   BETWEEN str_to_date('{0}', '%H') and str_to_date('{1}', '%H')
GROUP BY tj.stattime ,left(tj.unitpath,8) order by tj.stattime", startTime, endTime, unitpath);
                List<TJUser> list = db.Database.SqlQuery<TJUser>(sql).ToList();
                return list;
            }


            //string startTime = DateTime.Now.ToString("yyyy-MM-dd 08:00:00");
            //string endTime = DateTime.Now.ToString("yyyy-MM-dd 18:00:00");
            //DateTime lastTime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd 08:00:00"));

            //using (Entities db = new Entities())
            //{
            //    string sql = string.Format("SELECT * FROM tj_persononlines where stattime>='{0}' AND stattime<='{1}' AND unitid={2}", startTime, endTime, middleId);
            //    List<tj_persononlines> list = db.Database.SqlQuery<tj_persononlines>(sql).ToList();
            //    for (int i = 1; i < (list.Count + 1); ++i)
            //    {
            //        int addHours = i - 1;
            //        DateTime thisTime = lastTime.AddHours(i - 1);

            //        if (list[addHours].stattime == thisTime)
            //        {
            //            lists.Add((int)list[addHours].onlinecount);
            //        }
            //        else
            //        {
            //            lists.Add(0);
            //        }
            //    }
            //    for (int j = 1; j < (12 - (list.Count)); ++j)
            //    {
            //        lists.Add(0);
            //    }
            //}


        }
        /// <summary>
        /// 今日中队上报人员统计《新城中队》
        /// </summary>tj_unitreportcounts
        /// <returns></returns>
        public List<TJUser> GetTodayUnitreportcounts(string unitpath)
        {
            string startTime = "07:00:00";
            string endTime = "18:00:00";

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select sum(tj.reportcount) count,tj.stattime,unitname from tj_unitreportcounts  tj
where tj.unitpath like '{2}' and   date_format(tj.stattime,'%H')   BETWEEN str_to_date('{0}', '%H') and str_to_date('{1}', '%H')
GROUP BY tj.stattime ,left(tj.unitpath,8) order by tj.stattime", startTime, endTime, unitpath);
                List<TJUser> list = db.Database.SqlQuery<TJUser>(sql).ToList();
                return list;
            }


            //List<int> lists = new List<int>();

            //string startTime = DateTime.Now.ToString("yyyy-MM-dd 08:00:00");
            //string endTime = DateTime.Now.ToString("yyyy-MM-dd 18:00:00");
            //DateTime lastTime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd 08:00:00"));

            //using (Entities db = new Entities())
            //{
            //    string sql = string.Format("SELECT * FROM tj_unitreportcounts where stattime>='{0}' AND stattime<='{1}' AND unitid={2}", startTime, endTime, middleId);

            //    List<tj_unitreportcounts> list = db.Database.SqlQuery<tj_unitreportcounts>(sql).ToList();
            //    for (int i = 1; i < (list.Count + 1); ++i)
            //    {
            //        int addHours = i - 1;
            //        DateTime thisTime = lastTime.AddHours(i - 1);

            //        if (list[addHours].stattime == thisTime)
            //        {
            //            lists.Add((int)list[addHours].reportcount);
            //        }
            //        else
            //        {
            //            lists.Add(0);
            //        }
            //    }
            //    for (int j = 1; j < (12 - (list.Count)); ++j)
            //    {
            //        lists.Add(0);
            //    }
            //}

            //return lists;
        }


        /// <summary>
        /// 街道报警数量
        /// </summary>yj li cs
        /// <returns></returns>
        public string getBjcount()
        {
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            //越界报警
            List<int> crossBoundaryAlarm = new List<int>();
            //离线报警
            List<int> offlineAlarm = new List<int>();
            //超时报警
            List<int> timeoutAlarm = new List<int>();
            using (Entities db = new Entities())
            {
                IQueryable<alarmModels> queryable = from a in db.qw_alarmmemorylocationdatas
                                                    join b_join in db.base_users on a.userid equals b_join.id into bTmp
                                                    from b in bTmp.DefaultIfEmpty()
                                                    join c_join in db.base_units on b.unitid equals c_join.id into cTmp
                                                    from c in cTmp.DefaultIfEmpty()
                                                    where a.createtime >= dt1 && a.createtime < dt2
                                                    select new alarmModels
                                                    {
                                                        alarmtype = a.alarmtype,
                                                        path = c.path,
                                                        userid = a.userid
                                                    };
                string xc = "/1/2/11/";
                string gz = "/1/2/12/";

                int Yjxc = queryable.Where(a => a.path.Contains(xc) && a.alarmtype == 2).Count();
                int YJgz = queryable.Where(a => a.path.Contains(gz) && a.alarmtype == 2).Count();
                crossBoundaryAlarm.Add(Yjxc);
                crossBoundaryAlarm.Add(YJgz);

                int Lxxc = queryable.Where(a => a.path.Contains(xc) && a.alarmtype == 3).Count();
                int Lxgz = queryable.Where(a => a.path.Contains(gz) && a.alarmtype == 3).Count();
                offlineAlarm.Add(Lxxc);
                offlineAlarm.Add(Lxgz);

                int Csxc = queryable.Where(a => a.path.Contains(xc) && a.alarmtype == 1).Count();
                int Csgz = queryable.Where(a => a.path.Contains(gz) && a.alarmtype == 1).Count();
                timeoutAlarm.Add(Csxc);
                timeoutAlarm.Add(Csgz);

                string result = JsonConvert.SerializeObject(crossBoundaryAlarm).ToString() + "|" + JsonConvert.SerializeObject(offlineAlarm).ToString() + "|" + JsonConvert.SerializeObject(timeoutAlarm).ToString();
                return result;
            }



        }


        /// <summary>
        /// 查询通讯录详情
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public phoneDetails GetphoneDetails(int userid)
        {
            phoneDetails model = new phoneDetails();
            using (Entities db = new Entities())
            {
                IQueryable<phoneDetails> queryable = from a in db.base_users
                                                     join c_join in db.base_units on a.unitid equals c_join.id into cTemp
                                                     from c in cTemp.DefaultIfEmpty()
                                                     where a.id == userid
                                                     select new phoneDetails
                                                     {
                                                         id = a.id,
                                                         name = a.displayname,
                                                         avatar = a.avatar,
                                                         mobile = a.mobile,
                                                         phone = a.phone,
                                                         shortnumber = a.shortnumber,
                                                         unitname = c == null ? "" : c.name,
                                                     };
                model = queryable.FirstOrDefault();
                model.url = "UserUrlOriginalPath";
            }
            return model;
        }

        public string GetPhones(string ids)
        {
            string[] id=ids.Split(',');
            string phones = "";
            using (Entities db = new Entities())
            {
                IQueryable<phoneDetails> queryable = from a in db.base_users
                                                     select new phoneDetails
                                                     {
                                                         id=a.id,
                                                         name=a.displayname,
                                                         phone=a.phone,

                                                     };
                foreach (var item in id)
                {
                    int userid =0;
                    int.TryParse(item, out userid);
                    phones += queryable.FirstOrDefault(a => a.id == userid).phone+",";
                }
            }
            return phones;
        }
    }
}
