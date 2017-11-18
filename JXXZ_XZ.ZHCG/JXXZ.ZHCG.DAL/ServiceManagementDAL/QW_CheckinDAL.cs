using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_CheckinDAL
    {
        /// <summary>
        /// 签到管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<QW_CheckinModel>> GetCheckinList(List<Filter> filters, int start, int limit)
        {
            Paging<List<QW_CheckinModel>> paging = new Paging<List<QW_CheckinModel>>();
            List<QW_CheckinModel> list = new List<QW_CheckinModel>();
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT qus.signintime,but.id AS unitid,but.`name`,but.path,bu.displayname,qut.userid,
			                qut.taskstarttime,qut.taskendtime,qus.stime,qus.etime,
			                DATE_ADD(qsa.start_stime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.start_stime) DAY) qdsstime,
			                DATE_ADD(qsa.start_etime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.start_etime) DAY) qdsetime,
			                DATE_ADD(qsa.end_stime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.end_stime) DAY) qdestime,
			                DATE_ADD(qsa.end_etime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.end_etime) DAY) qdeetime
                            FROM qw_usertasks qut
                            LEFT JOIN (SELECT min(signintime) stime,max(signintime) etime,signintime,userid from qw_usersignins GROUP BY DATE_FORMAT(signintime,'%Y-%m-%d'),userid ORDER BY signintime) qus 
                            ON qus.userid=qut.userid AND qus.signintime BETWEEN qut.taskstarttime AND qut.taskendtime 
                            LEFT JOIN qw_signinareas qsa ON qut.signinareaid = qsa.signinareaid
                            LEFT JOIN base_users bu ON qut.userid = bu.id
                            LEFT JOIN base_units but ON bu.unitid = but.id
                            WHERE qut.taskstarttime <= str_to_date('{0}', '%Y/%m/%d %H:%i:%s')
                            ORDER BY qut.taskstarttime DESC", time);
                IEnumerable<QW_CheckinModel> queryable = db.Database.SqlQuery<QW_CheckinModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.path.Contains("/1/2/" + value + "/"));
                                }
                                break;
                            case "displayname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.displayname.Contains(value));
                                }
                                break;
                            case "taskstarttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime taskstarttime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.taskstarttime.Date == taskstarttime);
                                }
                                break;
                            case "qdzt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    if (int.Parse(value) == 1)
                                    {

                                        queryable = queryable.Where(t => t.stime != null);
                                    }
                                    else
                                    {

                                        queryable = queryable.Where(t => t.stime == null);
                                    }
                                }

                                break;
                            case "qtzt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    if (int.Parse(value) == 1)
                                    {

                                        queryable = queryable.Where(t => t.etime != null
                                            );
                                    }
                                    else
                                    {

                                        queryable = queryable.Where(t => t.etime == null);
                                    }
                                }
                                break;
                        }
                    }
                }
                paging.Total = queryable.Count();
                list = queryable.Skip(start).Take(limit).ToList();
                paging.Items = list;
            }
            return paging;
        }

        /// <summary>
        /// 签到管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<QW_CheckinModel> GetCheckinExportExcel(List<Filter> filters)
        {
            DateTime time = DateTime.Now;
            List<QW_CheckinModel> list = new List<QW_CheckinModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT qus.signintime,but.id AS unitid,but.`name`,but.path,bu.displayname,qut.userid,
			                qut.taskstarttime,qut.taskendtime,qus.stime,qus.etime,
			                DATE_ADD(qsa.start_stime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.start_stime) DAY) qdsstime,
			                DATE_ADD(qsa.start_etime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.start_etime) DAY) qdsetime,
			                DATE_ADD(qsa.end_stime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.end_stime) DAY) qdestime,
			                DATE_ADD(qsa.end_etime,INTERVAL DATEDIFF(qut.taskstarttime,qsa.end_etime) DAY) qdeetime
                            FROM qw_usertasks qut
                            LEFT JOIN (SELECT min(signintime) stime,max(signintime) etime,signintime,userid from qw_usersignins GROUP BY DATE_FORMAT(signintime,'%Y-%m-%d'),userid ORDER BY signintime) qus 
                            ON qus.userid=qut.userid AND qus.signintime BETWEEN qut.taskstarttime AND qut.taskendtime 
                            LEFT JOIN qw_signinareas qsa ON qut.signinareaid = qsa.signinareaid
                            LEFT JOIN base_users bu ON qut.userid = bu.id
                            LEFT JOIN base_units but ON bu.unitid = but.id
                            WHERE qut.taskstarttime <= str_to_date('{0}', '%Y/%m/%d %H:%i:%s')
                            ORDER BY qut.taskstarttime DESC", time);
                IEnumerable<QW_CheckinModel> queryable = db.Database.SqlQuery<QW_CheckinModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int i = int.Parse(value);
                                    queryable = queryable.Where(t => t.unitid == i);
                                }
                                break;
                            case "displayname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.displayname.Contains(value));
                                }
                                break;
                            case "taskstarttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime taskstarttime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.taskstarttime >= taskstarttime);
                                }
                                break;
                            case "qdzt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    if (int.Parse(value) == 1)
                                    {

                                        queryable = queryable.Where(t => t.stime != null);
                                    }
                                    else
                                    {

                                        queryable = queryable.Where(t => t.stime == null);
                                    }
                                }

                                break;
                            case "qtzt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    if (int.Parse(value) == 1)
                                    {

                                        queryable = queryable.Where(t => t.etime != null
                                            );
                                    }
                                    else
                                    {

                                        queryable = queryable.Where(t => t.etime == null);
                                    }
                                }
                                break;
                        }
                    }
                }

                return queryable.ToList();
            }
        }
    }
}
