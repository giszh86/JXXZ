using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.Model.PartModel;
using JXXZ.ZHCG.DAL.PartDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.DAL;

namespace JXXZ.ZHCG.BLL.PartBLL
{
    public class PartBLL
    {
        private PartDAL dal = new PartDAL();
        public Paging<List<partBriefModel>> GetPartList(List<Filter> filters, int start, int limit)
        {
            List<partBriefModel> items = dal.GetPartList(filters,start, limit);
            int total = dal.GetPartCount(filters);
            Paging<List<partBriefModel>> paging = new Paging<List<partBriefModel>>();
            paging.Items = items;
            paging.Total = total;
            return paging;
        }
        public PartModel GetPartDetail(int id)
        {
            return dal.GetPartDetail(id);
        }

          /// <summary>
        /// 根据标识码获取详情
        /// </summary>
        /// <param name="objcode"></param>
        /// <returns></returns>
        public bj_part GetPartDetailCode(string objcode)
        {
            return dal.GetPartDetailCode(objcode);
        }
    }
}
