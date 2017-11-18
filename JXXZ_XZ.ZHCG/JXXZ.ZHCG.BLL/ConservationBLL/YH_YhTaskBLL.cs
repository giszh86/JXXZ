using JXXZ.ZHCG.DAL.ConservationDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.ConservationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ConservationBLL
{
    public class YH_YhTaskBLL
    {
        private YH_YhTaskDAL dal = new YH_YhTaskDAL();
        /// <summary>
        /// 养护待办已办列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<YhtaskList>> GetYhtaskList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            List<YhtaskList> items = dal.GetYhtaskList(filters, start, limit, userid, status).ToList();
            int total = dal.GetYhtaskCount(filters, userid, status);
            Paging<List<YhtaskList>> paging = new Paging<List<YhtaskList>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 养护全部列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<YhtaskList>> GetAllYhtaskList(List<Filter> filters, int start, int limit)
        {
            List<YhtaskList> items = dal.GetAllYhtaskList(filters, start, limit).ToList();
            int total = dal.GetAllYhtaskCount(filters);
            Paging<List<YhtaskList>> paging = new Paging<List<YhtaskList>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 养护任务详情
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        public YhtaskModel GetYHTaskModel(string wfsid)
        {
            return dal.GetYHTaskModel(wfsid);
        }

        /// <summary>
        /// 获取执法事件图片
        /// </summary>
        /// <param name="ZFSJID">执法事件ID</param>
        /// <param name="WFDID">环节ID</param>
        /// <returns></returns>
        public List<Attachment> GetYHTaskAttr(string citizenid, string wfdids)
        {
            return dal.GetYHTaskAttr(citizenid, wfdids);
        }

        public QuantityModel GetyhtaskNum(int userid)
        {
            return dal.GetyhtaskNum(userid);
        }
    }
}
