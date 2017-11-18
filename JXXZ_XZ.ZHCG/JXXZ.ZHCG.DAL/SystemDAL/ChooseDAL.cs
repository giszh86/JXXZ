using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL
{
    public class ChooseDAL
    {
        /// <summary>
        /// 获取中队列表
        /// </summary>
        /// <returns></returns>
        public IEnumerable<base_units> GetMiddleTeam()
        {
            using (Entities db = new Entities())
            {
                var rst = db.base_units
                    .Where(t => t.unittypeid == 2)
                    .OrderBy(t => t.id)
                    .ToList();
                return rst;
            }
        }

        public IEnumerable<base_units> GetTeamGroup(int teamID)
        {
            using (Entities db = new Entities())
            {
                var rst = db.base_units
                    .Where(t => t.unittypeid == 4 && t.parentid == teamID)
                    .OrderBy(t => t.id)
                    .ToList();
                return rst;
            }
        }

        public List<sm_classes> GetClassType()
        {
            using (Entities db = new Entities())
            {
                var list = db.sm_classes
                    .OrderBy(t => t.classid)
                    .ToList();
                return list;
            }

        }

        public List<case_zds> GetTypeList(string type)
        {
            using (Entities db = new Entities())
            {
                var list = db.case_zds
                    .Where(t => t.zd_type == type)
                    .OrderBy(t => t.zd_id)
                    .ToList();
                return list;

            }
        }

        public List<case_zds> GetBank()
        {
            using (Entities db = new Entities())
            {
                var list = db.case_zds
                    .Where(t => t.zd_type == "type_bank" ||
                        t.zd_type == "type_accountname" || t.zd_type == "type_account")
                    .OrderBy(t => t.zd_seq)
                    .ToList();
                return list;
            }

        }

        /// <summary>
        /// 根据班组获取队员.
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<base_users> GetPerson(int groupId)
        {
            using (Entities db = new Entities())
            {
                var list = db.base_users
                    .Where(t => (t.unitid ?? 0) == groupId)
                    .OrderBy(t => t.id);

                return list.ToList();
            }
        }

        public List<FatherSelectItem> GetGroupAndPerson(int unitId)
        {
            using (Entities db = new Entities())
            {
                var uList = db.base_units.Where(t => (t.parentid ?? 0) == unitId);
                var list = from unit in uList
                           join user in db.base_users on unit.id equals user.unitid
                           orderby unit.id, user.id

                           select new FatherSelectItem
                           {
                               value = unit.id,
                               text = unit.name,
                               childrenValue = user.id,
                               childrenText = user.displayname
                           };
                return list.ToList();

            }
        }

        public List<SiginDetail> GetSignInListById(DateTime date, int num, int userId)
        {
            using (Entities db = new Entities())
            {
                DateTime lDate = date.Date.AddDays(1);
                DateTime sDate = lDate.AddDays(-num);

                var queryTask = from task in db.qw_usertasks
                                where task.isdelete == 0 &&
                                task.userid == userId &&
                                task.taskstarttime < lDate
                                orderby task.taskstarttime descending
                                select task;
                var list = queryTask.Skip(0).Take(num).ToList();
                if (list.Count > 0)
                {
                    sDate = list[list.Count - 1].taskstarttime.Date;
                }

                var query = from task in queryTask
                            join area in db.qw_signinareas on task.signinareaid ?? 0 equals area.signinareaid
                            where task.taskstarttime >= sDate && task.taskstarttime < lDate
                            orderby task.taskstarttime descending
                            select new SiginDetail
                            {
                                usertaskId = task.usertaskid,
                                signinareaId = area.signinareaid,
                                taskTime = task.taskstarttime,
                                taskexplain = task.taskexplain,
                                name = area.name,
                                start_stime = area.start_stime,
                                start_etime = area.start_etime,
                                end_stime = area.end_stime,
                                end_etime = area.end_etime,
                                grometry = area.grometry

                            };
                return query.ToList();

            }
        }

        public List<qw_usersignins> GetUserSign(int userId, DateTime startDate, DateTime endDate)
        {
            using (Entities db = new Entities())
            {
                var query = from sign in db.qw_usersignins
                            where sign.signintime >= startDate
                            && sign.signintime < endDate
                            && sign.userid == userId
                            orderby sign.signintime
                            select sign;
                return query.ToList();
            }
        }

        public phone_version GetVersion()
        {
            using (Entities db = new Entities())
            {
                return db.phone_version.FirstOrDefault();
            }
        }

    }
}
