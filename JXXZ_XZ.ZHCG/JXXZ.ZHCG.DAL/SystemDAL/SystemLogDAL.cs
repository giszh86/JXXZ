using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.SystemDAL
{
    public class SystemLogDAL
    {
        /// <summary>
        /// 记录日志
        /// </summary>
        /// <param name="source">来源模块名称(案件（一般案件，违停案件、简易案件）、市民事件、行政许可、违章建筑、专项整治、养护问题 等上报模块</param>
        /// <param name="content">记录内容(xxx上报了一条xxx)</param>
        /// <param name="userid">记录人</param>
        public void WriteSystemLog(string source, string content, int userid)
        {
            using (Entities db = new Entities())
            {
                base_systemlogs log = new base_systemlogs();
                log.content = content;
                log.createtime = DateTime.Now;
                log.createuserid = userid;
                log.source = source;
                db.base_systemlogs.Add(log);
                db.SaveChanges();
            }
        }

        #region 获取首页日志列表
        /// <summary>
        /// 首页获取日志列表
        /// </summary>
        /// <returns></returns>
        public List<SystemLogModel> GetSysLogList()
        {
            List<SystemLogModel> list = new List<SystemLogModel>();
            using (Entities db = new Entities())
            {
                IEnumerable<SystemLogModel> queryable = from a in db.base_systemlogs
                                                        join b_join in db.base_users on a.createuserid equals b_join.id into btmp
                                                        from b in btmp
                                                        select new SystemLogModel { 
                                                            id=a.id,
                                                            source=a.source,
                                                            content=a.content,
                                                            createtime=a.createtime,
                                                            createuserid=a.createuserid,
                                                            createusername=b.displayname,
                                                        };
                list = queryable.OrderByDescending(a => a.createtime).Skip(0).Take(8).ToList();
                return list;
            }
        }
        #endregion
    }
}
