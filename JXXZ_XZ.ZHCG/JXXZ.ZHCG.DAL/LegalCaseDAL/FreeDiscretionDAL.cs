using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.LegalCaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.LegalCaseDAL
{
    /// <summary>
    /// 自由裁量
    /// </summary>
    public class FreeDiscretionDAL
    {
        #region 获取自由裁量列表
        public Paging<List<InheritCaseSourceModel>> GetFreeDiscretionList(List<Filter> filters, int start, int limit)
        {
            EntitiesORCL db = new EntitiesORCL();
            Paging<List<InheritCaseSourceModel>> paging = new Paging<List<InheritCaseSourceModel>>();
            string sql = string.Format(@"select power2.powerid,power2.code,power2.powername,law2.name as flfg,law2.content as clyj, standard2.wfqx,standardp2.result as cf ,law2.createtime from (select power.*, row_number() over(partition by power.powerid order by power.DATAVERVISON desc ) rn1
            from fds_power power) power2 
            left join (select law.*, row_number() over(partition by law.powerid order by law.DATAVERVISON desc ) rn2 
            from fds_law law) law2 on power2.powerid = law2.powerid and rn2=1
            left join (select standard.*, row_number() over(partition by standard.lawid order by standard.DATAVERVISON desc ) rn3
            from fds_standard standard) standard2 on law2.lawid = standard2.lawid  and rn3=1
            left join (select standardp.*, row_number() over(partition by standardp.standardid order by standardp.DATAVERVISON desc ) rn4
            from fds_standard_punish standardp) standardp2 on standard2.standardid = standardp2.standardid and rn4=1
            where rn1=1");
            IEnumerable<InheritCaseSourceModel> list = db.Database.SqlQuery<InheritCaseSourceModel>(sql);

            if (filters != null && filters.Count > 0)
            {
                foreach (Filter filter in filters)
                {
                    string value = filter.value;
                    switch (filter.property)
                    {
                        case "powername":
                            if (!string.IsNullOrEmpty(value))
                                list = list.Where(t => t.powername.Contains(value));
                            break;
                        case "flfg":
                            if (!string.IsNullOrEmpty(value))
                                list = list.Where(t => t.flfg !=null && !string.IsNullOrEmpty(t.flfg) && t.flfg.Contains(value));
                            break;
                    }
                }
            }
            paging.Items = list.Skip(start).Take(limit).ToList();
            paging.Total = list.Count();

            return paging;
        }
        #endregion


        public InheritCaseSourceModel GetFreeDiscretionModel(string powerid)
        {
            InheritCaseSourceModel model = new InheritCaseSourceModel();
            using (EntitiesORCL db = new EntitiesORCL())
            {
                string sql = string.Format(@"select power2.powerid,power2.code,power2.powername,law2.name as flfg,law2.content as clyj, standard2.wfqx,standardp2.result as cf ,law2.createtime from (select power.*, row_number() over(partition by power.powerid order by power.DATAVERVISON desc ) rn1
            from fds_power power) power2 
            left join (select law.*, row_number() over(partition by law.powerid order by law.DATAVERVISON desc ) rn2 
            from fds_law law) law2 on power2.powerid = law2.powerid and rn2=1
            left join (select standard.*, row_number() over(partition by standard.lawid order by standard.DATAVERVISON desc ) rn3
            from fds_standard standard) standard2 on law2.lawid = standard2.lawid  and rn3=1
            left join (select standardp.*, row_number() over(partition by standardp.standardid order by standardp.DATAVERVISON desc ) rn4
            from fds_standard_punish standardp) standardp2 on standard2.standardid = standardp2.standardid and rn4=1
            where rn1=1");
                IEnumerable<InheritCaseSourceModel> list = db.Database.SqlQuery<InheritCaseSourceModel>(sql);
                model = list.FirstOrDefault(a => a.powerid == powerid);
            }
            return model;
        }
    }
}
