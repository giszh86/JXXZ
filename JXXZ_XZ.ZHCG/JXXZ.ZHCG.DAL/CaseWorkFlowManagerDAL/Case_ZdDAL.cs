using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_ZdDAL
    {

        /// <summary>
        /// 获取类型
        /// </summary>
        /// <param name="zd_type">字典类型</param>
        /// <param name="zd_id">字典编号</param>
        /// <returns></returns>
        public List<Case_ZdModel> GetZdList(string zd_type)
        {
            List<Case_ZdModel> list = new List<Case_ZdModel>();
            using (Entities db = new Entities()) {
                IQueryable<Case_ZdModel> queryable = from a in db.case_zds
                                                     where a.zd_type == zd_type && a.status==0
                                                     select new Case_ZdModel
                                                     {
                                                         zd_typename = a.zd_typename,
                                                         zd_type = a.zd_type,
                                                         zd_id = a.zd_id,
                                                         zd_name = a.zd_name,
                                                         zd_seq = a.zd_seq,
                                                         status = a.status,
                                                         remark = a.remark,
                                                         parentid = a.parentid
                                                     };
                list = queryable.OrderBy(a => a.zd_seq).ToList();
            }
            return list;
        }

        /// <summary>
        /// 获取子数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <param name="zd_id"></param>
        /// <returns></returns>
        public List<Case_ZdModel> GetZdListChild(string zd_type, string zd_id) {
            List<Case_ZdModel> list = new List<Case_ZdModel>();
            using (Entities db = new Entities())
            {
                int parentid = Convert.ToInt32(zd_id);
                IQueryable<Case_ZdModel> queryable = from a in db.case_zds
                                                     where a.remark == zd_type && a.parentid == parentid && a.status == 0
                                                     select new Case_ZdModel
                                                     {
                                                         zd_typename = a.zd_typename,
                                                         zd_type = a.zd_type,
                                                         zd_id = a.zd_id,
                                                         zd_name = a.zd_name,
                                                         zd_seq = a.zd_seq,
                                                         status = a.status,
                                                         remark = a.remark,
                                                         parentid = a.parentid
                                                     };
                list = queryable.OrderBy(a => a.zd_seq).ToList();
            }
            return list;
        
        }
    }
}
