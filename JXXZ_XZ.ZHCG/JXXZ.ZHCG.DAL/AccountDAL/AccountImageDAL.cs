using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AccountModel;

namespace JXXZ.ZHCG.DAL.AccountDAL
{
    public class AccountImageDAL
    {
        /// <summary>
        /// 获取
        /// </summary>
        /// <returns></returns>
        public List<AccountImageModel> GetAccountImage()
        {
            List<AccountImageModel> list = new List<AccountImageModel>();
            using (Entities db = new Entities())
            {
                string strsql = string.Format(@"select concat_ws('',CAST(FORMAT(sum(wff.filesize)/1024,2) AS CHAR),'M') sum_size,COUNT(sm.srid) count,sm.srid,zd.zd_name FROM
sm_citizenservices sm
LEFT JOIN wf_workflowspecifics ws on sm.citizenid=ws.tablenameid
LEFT JOIN wf_workflowspecificactivitys wssa on ws.wfsid=wssa.wfsid
LEFT JOIN wf_workflowspecificusers wsu on wssa.wfsaid=wsu.wfsaid
left join wf_workflowspecificuserfiles wff on wsu.wfsuid=wff.wfsuid
LEFT JOIN base_zds zd on zd.zd_type='type_task' and sm.srid=zd.zd_id
where sm.sfzxzz=1 and wff.fileid is not NULL  and srid is not NULL
GROUP BY sm.srid");

                IEnumerable<AccountImageModel> ien = db.Database.SqlQuery<AccountImageModel>(strsql);
                return ien.ToList();
            }
        }

        /// <summary>
        /// 根据类型选出所有台帐图片列表
        /// </summary>
        /// <returns></returns>
        public List<AccountImageModel> GetAllImageMonthList(int tz_type)
        {
            List<AccountImageModel> list = new List<AccountImageModel>();
            using (Entities db = new Entities())
            {
                string strsql = string.Format(@"select date_format(sm.createtime,'%Y-%m') createtime,concat_ws('',CAST(FORMAT(sum(wff.filesize)/1024,2) AS CHAR),'M') sum_size,COUNT(sm.srid) count,sm.srid,zd.zd_name FROM
sm_citizenservices sm
LEFT JOIN wf_workflowspecifics ws on sm.citizenid=ws.tablenameid
LEFT JOIN wf_workflowspecificactivitys wssa on ws.wfsid=wssa.wfsid
LEFT JOIN wf_workflowspecificusers wsu on wssa.wfsaid=wsu.wfsaid
left join wf_workflowspecificuserfiles wff on wsu.wfsuid=wff.wfsuid
LEFT JOIN base_zds zd on zd.zd_type='type_task' and sm.srid=zd.zd_id
where sm.srid={0} and sm.sfzxzz=1 and wff.fileid is not NULL   and srid is not NULL
GROUP BY date_format(sm.createtime,'%Y-%m') order by createtime desc", tz_type);
                IEnumerable<AccountImageModel> ien = db.Database.SqlQuery<AccountImageModel>(strsql);
                return ien.ToList();
            }
        }

        /// <summary>
        /// 根据类型和年月筛选图片文件
        /// </summary>
        /// <param name="tz_type"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        public List<AccountImageModel> GetAllImageFileList(int tz_type, string dt)
        {
            List<AccountImageModel> list = new List<AccountImageModel>();
            using (Entities db = new Entities())
            {
                string strsql = string.Format(@"select wff.filepath,sm.eventtitle,wff.filename,date_format(sm.createtime,'%Y-%m') createtime,concat_ws('',CAST( wff.filesize AS CHAR),'KB') sum_size,COUNT(sm.srid) count,sm.srid,zd.zd_name FROM
sm_citizenservices sm
LEFT JOIN wf_workflowspecifics ws on sm.citizenid=ws.tablenameid
LEFT JOIN wf_workflowspecificactivitys wssa on ws.wfsid=wssa.wfsid
LEFT JOIN wf_workflowspecificusers wsu on wssa.wfsaid=wsu.wfsaid
left join wf_workflowspecificuserfiles wff on wsu.wfsuid=wff.wfsuid
LEFT JOIN base_zds zd on zd.zd_type='type_task' and sm.srid=zd.zd_id
where sm.srid={0} and date_format(sm.createtime,'%Y-%m') ='{1}' and sm.sfzxzz=1 and wff.fileid is not NULL   and srid is not NULL
GROUP BY date_format(sm.createtime,'%Y-%m'),wff.fileid order by sm.createtime desc", tz_type, dt);
                IEnumerable<AccountImageModel> ien = db.Database.SqlQuery<AccountImageModel>(strsql);
                return ien.ToList();
            }
        }

    }
}
