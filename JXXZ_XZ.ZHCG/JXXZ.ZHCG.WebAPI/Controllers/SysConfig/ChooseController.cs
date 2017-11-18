using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.SysConfig
{
    public class ChooseController : ApiController
    {
        public ChooseBLL bll = new ChooseBLL();

        /// <summary>
        /// 获取中队
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SelectItem> GetMiddleTeam()
        {
            return bll.GetMiddleTeam();

        }

        /// <summary>
        /// 获取班组
        /// </summary>
        /// <param name="TeamID">中队id</param>
        /// <returns></returns>
        [HttpGet]
        public List<SelectItem> GetTeamGroup(int teamID)
        {
            return bll.GetTeamGroup(teamID);
        }

        /// <summary>
        /// 根据班组获取队员.
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<SelectItem> GetPerson(int groupId)
        {
            return bll.GetPerson(groupId);
        }

        /// <summary>
        /// 根据中队获取所有班组+人员
        /// </summary>
        /// <param name="unitId"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<SelectItem> GetGroupAndPerson(int unitId)
        {
            var rst = bll.GetGroupAndPerson(unitId);
            return rst;
        }

        /// <summary>
        /// 获取zds
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<SelectItem> GetZds(string type)
        {
            return bll.GetZds(type);
        }

        /// <summary>
        /// 返回大小类
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SelectItem> GetClassType()
        {
            return bll.GetClassType();
        }

        /// <summary>
        /// 获取所有银行账户信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SelectValue> GetBank()
        {
            return bll.GetBank();
        }

        /// <summary>
        /// 签到
        /// </summary>
        /// <param name="date"></param>
        /// <param name="num"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        public List<SiginDetail> GetSignInListById(DateTime date, int num, int userId)
        {
            return bll.GetSignInListById(date, num, userId);
        }

    }
}
