using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL
{
    public class UnitDAL
    {
        public Unit GetUnit(int id)
        {

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                    from a in db.base_units
                    join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                    from b in bTemp.DefaultIfEmpty()
                    where a.id == id
                    select new Unit()
                    {
                        ID = a.id,
                        Code = a.code,
                        Name = a.name,
                        UnitTypeID = a.unittypeid,
                        UnitTypeName = b.name,
                        Path = a.path,
                        ParentID = a.parentid,
                        CreatedTime = a.createdtime,
                        UpdatedTime = a.updatedtime
                    };

                Unit entity = queryable.SingleOrDefault();
                return entity;
            }
        }

        public List<Unit> GetUnits()
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                    db.base_units
                    .Where(a => a.unittypeid == 4)
                    .OrderBy(t => t.id)
                    .Select(t => new Unit()
                    {
                        ID = t.id,
                        Name = t.name
                    });

                list = queryable.ToList();
            }

            return list;
        }

        public List<Unit> GetUnits(List<Filter> filters)
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                     from a in db.base_units
                     join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     select new Unit()
                     {
                         ID = a.id,
                         Code = a.code,
                         Name = a.name,
                         UnitTypeID = a.unittypeid,
                         UnitTypeName = b == null ? "" : b.name,
                         Path = a.path,
                         ParentID = a.parentid,
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
                            case "Code":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.Code.Contains(value));
                                break;
                            case "Name":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.Name.Contains(value));
                                break;
                            case "Path":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.Path.Contains(value));
                                break;
                            case "UnitTypeID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitTypeID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.UnitTypeID == unitTypeID);
                                }
                                break;
                        }
                    }
                }

                list = queryable.ToList();
            }

            return list;
        }

        public List<Unit> GetUnits(List<Filter> filters, int start, int limit)
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                     from a in db.base_units
                     join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     select new Unit()
                     {
                         ID = a.id,
                         Code = a.code,
                         Name = a.name,
                         UnitTypeID = a.unittypeid,
                         UnitTypeName = b == null ? "" : b.name,
                         Path = a.path,
                         ParentID = a.parentid,
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
                            case "Code":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.Code.Contains(value));
                                break;
                            case "Name":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.Name.Contains(value));
                                break;
                            case "ParentID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int parentID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.ParentID == parentID);
                                }
                                break;
                            case "UnitTypeID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitTypeID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.UnitTypeID == unitTypeID);
                                }
                                break;
                        }
                    }
                }

                queryable = queryable.OrderByDescending(t => t.UpdatedTime).Skip(start).Take(limit);

                list = queryable.ToList();
            }

            return list;
        }

        public int GetUnitCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<base_units> queryable = db.base_units.AsQueryable();

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
                            case "Name":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.name.Contains(value));
                                break;
                            case "ParentID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int parentID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.parentid == parentID);
                                }
                                break;
                            case "UnitTypeID":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitTypeID = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unittypeid == unitTypeID);
                                }
                                break;
                        }
                    }
                }

                return queryable.Count();
            }
        }

        public List<Unit> GetUnitsByPath(string path)
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                     from a in db.base_units
                     join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     where a.path.Contains(path)
                     orderby a.updatedtime descending
                     select new Unit()
                     {
                         ID = a.id,
                         Code = a.code,
                         Name = a.name,
                         UnitTypeID = a.unittypeid,
                         UnitTypeName = b == null ? "" : b.name,
                         Path = a.path,
                         ParentID = a.parentid,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime
                     };

                list = queryable.ToList();
                return list;
            }
        }

        public int AddUnit(Unit unit)
        {
            using (Entities db = new Entities())
            {
                base_units newUnit = new base_units()
                {
                    code = unit.Code,
                    name = unit.Name,
                    unittypeid = unit.UnitTypeID,
                    path = unit.Path,
                    parentid = unit.ParentID,
                    createdtime = unit.CreatedTime,
                    updatedtime = unit.UpdatedTime
                };

                db.base_units.Add(newUnit);
                db.SaveChanges();

                newUnit.path = string.Format("{0}{1}/", newUnit.path, newUnit.id);

                return db.SaveChanges();
            }
        }

        public int EditUnit(Unit unit)
        {
            using (Entities db = new Entities())
            {
                base_units newUnit = db.base_units.Find(unit.ID);

                if (newUnit != null)
                {
                    newUnit.code = unit.Code;
                    newUnit.name = unit.Name;
                    newUnit.unittypeid = unit.UnitTypeID;
                    newUnit.updatedtime = unit.UpdatedTime;

                    return db.SaveChanges();
                }
            }

            return 0;
        }

        public int DeleteUnit(int id)
        {
            using (Entities db = new Entities())
            {
                base_units unit = db.base_units.Where(t => t.id == id).SingleOrDefault();

                if (unit != null)
                {
                    db.base_units.Remove(unit);
                }

                return db.SaveChanges();
            }
        }


        public List<Unit> GetUnitsSquadron(int unittypeid, int? unittypeid2 = null)
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                     from a in db.base_units
                     join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     where a.unittypeid == unittypeid || a.unittypeid == unittypeid2
                     select new Unit()
                     {
                         ID = a.id,
                         Code = a.code,
                         Name = a.name,
                         UnitTypeID = a.unittypeid,
                         UnitTypeName = b == null ? "" : b.name,
                         Path = a.path,
                         ParentID = a.parentid,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime
                     };


                queryable = queryable.OrderBy(t => t.Code);

                list = queryable.ToList();
            }

            return list;
        }

        public List<Unit> GetUnitsChild(int parentid)
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                     from a in db.base_units
                     join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     where a.parentid == parentid
                     select new Unit()
                     {
                         ID = a.id,
                         Code = a.code,
                         Name = a.name,
                         UnitTypeID = a.unittypeid,
                         UnitTypeName = b == null ? "" : b.name,
                         Path = a.path,
                         ParentID = a.parentid,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime
                     };


                queryable = queryable.OrderByDescending(t => t.UpdatedTime);

                list = queryable.ToList();
            }

            return list;
        }


        /// <summary>
        /// 获取部门
        /// </summary>
        /// <returns></returns>
        public List<PhoneModel> GetUnitPhone()
        {
            List<PhoneModel> list = new List<PhoneModel>();
            using (Entities db = new Entities())
            {
                IQueryable<PhoneModel> queryable = from a in db.base_units
                                                   //where a.parentid == parentid
                                                   select new PhoneModel
                                                   {
                                                       id = a.id,
                                                       name = a.name,
                                                       parentid = a.parentid,
                                                   };
                list = queryable.ToList();

            }
            return list;

        }

        /// <summary>
        /// 获取组织结构树节点
        /// </summary>
        /// <returns></returns>
        public List<PhoneModel> GetTreeNodes(List<Filter> filters,int unitid)//int UserUnitID)
        {
            List<PhoneModel> PhoneModels = new List<PhoneModel>();

            //查出所有单位
            List<PhoneModel> allUnits = new UnitDAL().GetUnitPhone().ToList();//.Where(a => a.path.Split('\\')[1] == model.Path.Split('\\')[1])
            //查出所有用户
            List<User> allUsers = new UserDAL().GetAllUsers(filters).ToList();
            //根节点 所有单位parentId为null的根节点
            List<PhoneModel> rootUnits = new List<PhoneModel>();
            if (unitid == 0)
                rootUnits = allUnits.Where(t => t.parentid == 1).ToList();
            else
                rootUnits = allUnits.Where(t => t.id == unitid||t.id==3).OrderByDescending(t=>t.id).ToList();
            //遍历根节点
            foreach (var unit in rootUnits)
            {
                PhoneModel rootPhoneModel = new PhoneModel
                {
                    id = unit.id,
                    name = unit.name,
                    parentid = unit.parentid
                };

                //循环向（根）父节点添加子节点
                PhoneModels.Add(rootPhoneModel);
                AddTreeNode(allUnits, allUsers, rootPhoneModel);
            }

            return PhoneModels;
        }




        /// <summary>
        /// 添加父节点下的子节点
        /// </summary>
        /// <param name="allUnits">所有部门</param>
        /// <param name="allUsers">所有人员</param>
        /// <param name="parentTree">父节点</param>
        public static void AddTreeNode(List<PhoneModel> allUnits, List<User> allUsers, PhoneModel parentTree)
        {
            //获得当前节点下的子节点
            List<PhoneModel> childrenUnits = allUnits.Where(t => t.parentid == parentTree.id).ToList();

            //获得当前节点下的部门人员
            List<User> childrenUsers = allUsers.Where(t => t.UnitID == parentTree.id).ToList();

            foreach (User user in childrenUsers)
            {
                PhoneModel treeModel = new PhoneModel
                {
                    id = user.ID,
                    name = user.DisplayName,
                    phone = user.mobile,
                };

                //循环向父节点添加人员
                parentTree.children.Add(treeModel);
            }

            foreach (var unit in childrenUnits)
            {
                PhoneModel treeModel = new PhoneModel
                {
                    id = unit.id,
                    name = unit.name,
                    parentid = unit.parentid
                };

                //循环向父节点添加部门
                parentTree.children.Add(treeModel);
                AddTreeNode(allUnits, allUsers, treeModel);
            }
        }

        /// <summary>
        /// 根据部门标识和用户类型获取用户
        /// </summary>
        /// <returns></returns>
        public int GetUserByUnitidType(int unitid, int usertype)
        {
            using (Entities db = new Entities())
            {
                return db.base_users.FirstOrDefault(t => t.unitid == unitid && t.usertypeid == usertype).id;
            }
        }

        /// <summary>
        /// 根据名称获取部门模型
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public base_units GetUnitByName(string name, int unittype)
        {
            using (Entities db = new Entities())
            {
                return db.base_units.FirstOrDefault(t => t.name == name && t.unittypeid == unittype);
            }
        }

        /// <summary>
        /// 根据部门ID获取部门详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public base_units GetUnitById(int id) {
            using (Entities db = new Entities())
            {
                return db.base_units.FirstOrDefault(t => t.id == id);
            }
        }



        public string GetUnitName(string longUnitid)
        {
            var unitArray = longUnitid.Split(',');
            string longUnitName = null;
            using (Entities db=new Entities())
            {
                for (int i = 0; i < unitArray.Length; ++i)
                {
                    int unitid = Convert.ToInt32(unitArray[i]);
                    string unitname = db.base_units.FirstOrDefault(a => a.id == unitid).name;
                    longUnitName += unitname + "、";
                }
                return longUnitName;
            }
        }
    }
}
