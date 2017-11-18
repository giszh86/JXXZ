using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.DAL.SystemDAL;
using JXXZ.ZHCG.DAL;

namespace JXXZ.ZHCG.BLL.SystemBLL
{
    public class SystemLogBLL
    {
        private SystemLogDAL dal = new SystemLogDAL();

        /// <summary>
        /// 记录日志
        /// </summary>
        /// <param name="source">来源模块名称(案件（一般案件，违停案件、简易案件）、市民事件、行政许可、违章建筑、专项整治、养护问题 等上报模块</param>
        /// <param name="content">记录内容(xxx上报了一条xxx)</param>
        /// <param name="userid">记录人</param>
        public void WriteSystemLog(string source, string content, int userid)
        {
            dal.WriteSystemLog(source, content, userid);
        }

        #region 获取首页日志列表
        /// <summary>
        /// 首页获取日志列表
        /// </summary>
        /// <returns></returns>
        public List<SystemLogModel> GetSysLogList()
        {
            return dal.GetSysLogList();
        }
        #endregion
    }
}
