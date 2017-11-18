using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace JXXZ.ZHCG.BLL
{
    public class UserBLL
    {
        private UserDAL dal = new UserDAL();
        private UnitDAL unitdal = new UnitDAL();
        private UserTypeDAL utDal = new UserTypeDAL();

        public List<User> GetUser(int UnitID)
        {
            return dal.GetUsersByUnitID(UnitID);
        }

        /// <summary>
        /// 查询用户分页列表
        /// </summary>
        public Paging<List<User>> GetUsers(List<Filter> filters, int start, int limit)
        {
            List<User> items = dal.GetUsers(filters, start, limit);
            int total = dal.GetUserCount(filters);

            Paging<List<User>> paging = new Paging<List<User>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 登陆
        /// </summary>
        /// <returns>1.登陆成功 2.帐号不存在 3.帐号或密码输入错误</returns>
        public string Login(string loginName, string loginPwd)
        {
            List<User> list = dal.GetUsersByLoginName(loginName);

            if (list.Count == 0)
                return "2";

            User user = list.SingleOrDefault(t => t.LoginPwd == loginPwd);

            if (user == null)
                return "3";

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic["USER_ID"] = user.ID;
            dic["USER_NAME"] = user.DisplayName;
            dic["UNIT_ID"] = user.UnitID;
            dic["UNIT_NAME"] = user.UnitName;
            dic["ROLE_IDS"] = dal.GetRoleIDsByUserID(user.ID);
            dic["UNIT_TYPE"] = user.UnitType;
            dic["USER_CODE"] = user.Code;
            string json = JsonConvert.SerializeObject(dic); //"{\"USER_ID\":" + user.ID + ",\"USER_NAME\":\"" + user.DisplayName + "\"}";
            return json;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <returns>1.修改成功；2.密码不正确</returns>
        public int ChangePassword(User user)
        {
            User model = dal.GetUserByID(user.ID);

            if (user.LoginPwd != model.LoginPwd)
                return 2;

            user.LoginPwd = user.NewLoginPwd;
            user.UpdatedTime = DateTime.Now;

            dal.EditUserLoginPwd(user);

            return 1;
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <returns>1 添加成功 2用户名已存在</returns>
        public int AddUser(User user)
        {
            List<User> list = dal.GetUsersByLoginName(user.LoginName);

            if (list.Count > 0)
                return 2;

            user.CreatedTime = user.UpdatedTime = DateTime.Now;
            dal.AddUser(user);

            return 1;
        }

        /// <summary>
        /// 修改用户
        /// </summary>
        /// <returns>1 添加成功 2用户名已存在</returns>
        public int EditUser(User user)
        {
            List<User> list = dal.GetUsersByLoginName(user.LoginName);

            if (list.Count > 0 && list.Where(t => t.ID == user.ID).SingleOrDefault() == null)
                return 2;

            user.UpdatedTime = DateTime.Now;
            dal.EditUser(user);

            return 1;
        }

        /// <summary>
        /// 删除单位
        /// </summary>
        public void DeleteUser(int id)
        {
            dal.DeleteUser(id);
        }

        /// <summary>
        /// 获得用户类型列表
        /// </summary>
        public List<UserType> GetUserTypes()
        {
            return utDal.GetUserTypes();
        }

        /// <summary>
        /// 获取总数量
        /// </summary>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetUsersListCount(string name, int limit)
        {
            return dal.GetUsersListCount(name, limit);
        }
        /// <summary>
        /// 查询用户分页列表
        /// </summary>
        public Paging<List<UserModel>> GetUsersList(string name, int start, int limit)
        {
            List<UserModel> items = dal.GetUsersList(name, start, limit);
            int total = dal.GetUsersListCount(name);

            Paging<List<UserModel>> paging = new Paging<List<UserModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 获取人员
        /// </summary>
        /// <param name="unitid">单位标识</param>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersPersonnelList(int? unitid, int roleid)
        {
            return dal.GetUsersPersonnelList(unitid, roleid);
        }

        /// <summary>
        /// 根据用户类型标识获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersStaffList(int roleid)
        {
            return dal.GetUsersStaffList(roleid);
        }

        /// <summary>
        /// 根据用户部门标识获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersStaff(int unitid)
        {
            return dal.GetUsersStaff(unitid);
        }

        /// <summary>
        /// 登录校验
        /// </summary>
        /// <param name="account">帐号</param>
        /// <param name="password">密码</param>
        /// <returns>根据账号密码获取登录用户</returns>
        public User LoginApi(User user)
        {
            return dal.LoginApi(user);
        }

        public base_users GetUserByUserID(int userID)
        {
            var model = UserDAL.GetUserByUserID(userID);
            return model;
        }

        /// <summary>
        /// 根据用户角色获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersListRole(string rolename, int unitid,int? caseid = null)
        {
            return dal.GetUsersListRole(rolename, unitid, caseid);
        }
        /// <summary>
        /// 根据用户类型获取用户
        /// </summary>
        /// <param name="usertypeid">用户类型标识</param>
        /// <returns></returns>
        public List<UserModel> GetUsersListUnit(string unitname)
        {
            return dal.GetUsersListUnit(unitname);
        }

        /// <summary>
        /// 根据userid查询手机号
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public UserMobile GetUserModel(int userid)
        {
            return dal.GetUserModel(userid);
        }

        /// <summary>
        /// 获取组织结构树节点
        /// </summary>
        /// <returns></returns>
        public List<PhoneModel> GetTreeMonitor(List<Filter> filters, int unitid)//int UserUnitID)
        {
            return unitdal.GetTreeNodes(filters,unitid);
        }

        /// <summary>
        /// 根据部门标识和用户类型获取用户
        /// </summary>
        /// <returns></returns>
        public int GetUserByUnitidType(int unitid, int usertype)
        {
            return unitdal.GetUserByUnitidType(unitid, usertype);
        }


        /// <summary>
        /// 根据userid获取人员详情
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public BaseUserModel GetUserById(int userid)
        {
            return dal.GetUserById(userid);
        }

        public List<string> GetUserRole(int userid)
        {
            return dal.GetUserRole(userid);
        }

        /// <summary>
        /// 查询用户分页列表
        /// </summary>
        public Paging<List<User>> GetZDUserList(List<Filter> filters, int start, int limit)
        {
            List<User> items = dal.GetZDUserList(filters, start, limit);
            int total = dal.GetZDUserCount(filters);

            Paging<List<User>> paging = new Paging<List<User>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }
        /// <summary>
        /// 根据部门标识获取中队当前在线人员
        /// </summary>
        /// <returns></returns>
        public int GetOnlinePersonCounts(int middleId)
        {
            return dal.GetOnlinePersonCounts(middleId);

        }
        /// <summary>
        ///  今日中队在线人员统计
        /// </summary>
        /// <returns></returns>
        public List<int?> GetTodayOnlineCount(string middleId)
        {
            List<TJUser> list = dal.GetTodayOnlineCount(middleId);
            List<int?> lists = new List<int?>();
            lists.Add(null);
            foreach (TJUser item in list)
            {
                lists.Add(item.count);
            }
            return lists;
        }
        /// <summary>
        /// 今日中队上报人员统计《新城中队》
        /// </summary>tj_unitreportcounts
        /// <returns></returns>
        public List<int?> GetTodayUnitreportcounts(string middleId)
        {
            List<TJUser> list = dal.GetTodayUnitreportcounts(middleId);
            List<int?> lists = new List<int?>();
            lists.Add(null);
            foreach (TJUser item in list)
            {
                lists.Add(item.count);
            }
            return lists;
        }


        /// <summary>
        /// 根据部门标识获取中队人员总数
        /// </summary>
        /// <param name="middleId"></param>
        /// <returns></returns>
        public int GetPersonCounts(int middleId)
        {
            return dal.GetPersonCounts(middleId);
        }
        /// <summary>
        /// 街道报警数量
        /// </summary>
        /// <returns></returns>
        public string getBjcount()
        {
            return dal.getBjcount();
        }

         /// <summary>
        /// 查询通讯录详情
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public phoneDetails GetphoneDetails(int userid)
        {
            return dal.GetphoneDetails(userid);
        }

        public string GetPhones(string ids)
        {
            return dal.GetPhones(ids);
        }

    }
}
