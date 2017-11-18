using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.WorkFlowManagerDAL
{
   public class WF_WorkFlowsDAL
    {
        /// <summary>
        /// 获取单个流程
        /// </summary>
        /// <param name="WFID">工作流编号</param>
        /// <returns></returns>
        public wf_workflows GetSingle(string WFID)
        {
            Entities db = new Entities();
            wf_workflows model = db.wf_workflows.SingleOrDefault(a => a.wfid == WFID);
            return model;
        }
        /// <summary>
        /// 获取表中的字段
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <returns></returns>
        public string GetTableColumns(string tableName)
        {
            Entities db = new Entities();
            string TableColumns = string.Empty;
            string sql = "select COLUMN_NAME from information_schema.COLUMNS where TABLE_NAME=('" + tableName + "')";
            var tcList = db.Database.SqlQuery<string>(sql);
            foreach (var item in tcList)
            {
                if (!string.IsNullOrEmpty(TableColumns))
                    TableColumns += ",";
                TableColumns += item;
            }
            return TableColumns;
        }
    }
}
