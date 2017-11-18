using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using JXXZ.ZHCG.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
    public class QW_UserSigninsBLL
    {
        private QW_UserSigninsDAL dal = new QW_UserSigninsDAL();
        private UserBLL bll = new UserBLL();
        /// <summary>
        /// 查询签到区域坐标集合
        /// </summary>
        /// <returns></returns>
        public SignInAreaPartModel GetAreaGeometry(int UserId, double x, double y)
        {
            return dal.GetAreaGeometry(UserId, x, y);
        }

        /// <summary>
        /// 根据UserId获取所有签到记录
        /// </summary>
        /// <returns></returns>
        public Paging<List<UserSignInModel>> GetSignInListById(int start, int limit, int UserId)
        {
            List<UserSignInModel> items = dal.GetSignInListById(start, limit, UserId).ToList();
            int total = dal.GetSignInListCount(UserId);

            Paging<List<UserSignInModel>> paging = new Paging<List<UserSignInModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 查询团队已签到数据
        /// </summary>
        /// <param name="time"></param>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <param name="num"></param>
        /// <returns></returns>
        public Paging<List<SignInModel>> GetUserSignInList(int? sszd, int? ssbc, int start, int limit)
        {
            List<SignInModel> items = dal.GetUserSignInList(sszd, ssbc, start, limit).ToList();
            int total = dal.GetUserSignInCount(sszd, ssbc);
            Paging<List<SignInModel>> paging = new Paging<List<SignInModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }



        public List<SelectItem> GetTeam(int userID)
        {
            List<SelectItem> rst = new List<SelectItem>();
            var user = bll.GetUserByUserID(userID);
            var teamList = dal.GetTeam(userID);
            var list = teamList.Where(t => t.id == user.unitid).ToList();
            if (list.Count == 0)
            {       //查不到认为是领导权限,有所有中队的访问权.
                list = teamList.Where(t => t.parentid == 2).ToList();
            }
            else
            {
                var model = list[0];
                if (model.parentid != 2)
                {  //队员
                    teamList = teamList.Where(t => t.id == model.parentid || t.id == model.id).ToList();
                    list = teamList.Where(t => t.id == model.parentid).ToList();
                }
            }

            foreach (var item in list)
            {
                FindList(teamList, item, rst);
            }

            return rst;

        }

        public List<SelectItem> GetTeamOfAll(int userID)
        {
            var rst = GetTeam(userID);

            if (rst.Count > 0 )
            {
                foreach (var cList in rst)
                {
                    cList.children.Insert(0, new SelectItem(0, "全部"));
                }
                if (rst.Count > 1) {
                    SelectItem item = new SelectItem(0, "全部");
                    item.children.Add(new SelectItem(0, "全部"));
                    rst.Insert(0, item);
                }
                
            }

            return rst;
        }

        private void FindList(List<base_units> teamList, base_units model, List<SelectItem> rst)
        {
            SelectItem item = new SelectItem()
            {
                text = model.name,
                value = model.id
            };
            rst.Add(item);
            var list = teamList.Where(t => t.parentid == model.id);
            foreach (var temp in list)
            {
                FindList(teamList, temp, item.children);
            }
        }

        /// <summary>
        /// 获取团队未签到
        /// </summary>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <returns></returns>
        public Paging<List<NotSignModel>> GetNotSignList(int? sszd, int? ssbc, int start, int limit)
        {
            List<NotSignModel> items = dal.GetNotSignList(sszd, ssbc, start, limit).ToList();
            int total = dal.GetNotSignCount(sszd, ssbc);
            Paging<List<NotSignModel>> paging = new Paging<List<NotSignModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 获取签到详情
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public SignInAreaPartModel GetSignDetails(int? userid, DateTime time)
        {
            return dal.GetSignDetails(userid, time);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddUserSignIn(QW_UserSigninsModel model)
        {

            //string geometry = model.x84 + "," + model.y84;
            //string map2000 = new MapXYConvent().WGS84ToCGCS2000(geometry);
            //if (!string.IsNullOrEmpty(map2000))
            //{
            //    model.x2000 = double.Parse(map2000.Split(',')[0]);
            //    model.y2000 = double.Parse(map2000.Split(',')[1]);
            //}
            return dal.AddUserSignIn(model);
        }
    }
}
