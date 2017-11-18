using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.Model.PartModel;
using JXXZ.ZHCG.Model;

namespace JXXZ.ZHCG.DAL.PartDAL
{
    public class PartDAL
    {
        public List<partBriefModel> GetPartList(List<Filter> filters, int start, int limit)
        {
            List<partBriefModel> list = new List<partBriefModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT a.id,bc.name as sbxl,a.objname,a.cdinatex,a.cdinatey FROM bj_part a 
LEFT JOIN bj_classes bc on a.sbxl = bc.id");
                IEnumerable<partBriefModel> query = db.Database.SqlQuery<partBriefModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "sbxl":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.objname == value);
                                break;
                            case "objname":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.objname.Contains(value));
                                break;
                        }
                    }
                }
                if (query.Count() > 0)
                {
                    list = query.OrderBy(t => t.id).Skip(start).Take(limit).ToList();
                }
            }
            return list;
        }
        public int GetPartCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT a.id,bc.name as sbxl,a.objname,a.cdinatex,a.cdinatey FROM bj_part a 
LEFT JOIN bj_classes bc on a.sbxl = bc.id");
                IEnumerable<partBriefModel> query = db.Database.SqlQuery<partBriefModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "sbxl":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.objname == value);
                                break;
                            case "objname":
                                if (!string.IsNullOrEmpty(value))
                                    query = query.Where(t => t.objname.Contains(value));
                                break;
                        }
                    }
                }
                return query.Count();
            }
        }
        public PartModel GetPartDetail(int id)
        {
            PartModel detail = new PartModel();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT
bp.id,
bp.sbdl,
bp.sbmc,
bp.sbxl,
bp.objcode,
bp.objname,
bp.cdepcode,
bp.cdepname,
bp.owndepcode,
bp.owndepname,
bp.matdepcode,
bp.matdepname,
bp.material,
bp.conperson,
bp.telephone,
bp.mobile,
bp.ownbgcode,
bp.objpos,
bp.objstate,
bp.usestate,
bp.crdate,
bp.chdate,
bp.datasource,
bp.cdinatex,
bp.cdinatey,
bp.remark,
bz.icon,
bz.path
FROM bj_part bp 
LEFT JOIN bj_zds bz on bp.sbmc = bz.id and bz.parentid <> 0
where bp.id ={0}", id);
                IEnumerable<PartModel> query = db.Database.SqlQuery<PartModel>(sql);
                
                    detail = query.FirstOrDefault();
            }
            return detail;
        }


        /// <summary>
        /// 根据标识码获取详情
        /// </summary>
        /// <param name="objcode"></param>
        /// <returns></returns>
        public bj_part GetPartDetailCode(string objcode)
        {
            using (Entities db = new Entities())
            {
                bj_part detail = db.bj_part.Where(t => t.objcode == objcode).FirstOrDefault();
                return detail;
            }
        }
    }
}
