using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
    public class QW_SigninAreasBLL
    {
        private QW_SigninAreasDAL dal = new QW_SigninAreasDAL();

        /// <summary>
        /// 添加签到区域
        /// </summary>
        /// <param name="model"></param>
        public void AddSigninAreas(QW_SigninAreasModel model)
        {
            dal.AddSigninAreas(model);
        }
        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<QW_SigninAreasModel>> GetSigninAreasList(List<Filter> filters, int start, int limit)
        {

            List<QW_SigninAreasModel> items = dal.GetSigninAreasList(filters, start, limit).ToList();
            int total = dal.GetSigninAreasCount(filters);

            Paging<List<QW_SigninAreasModel>> paging = new Paging<List<QW_SigninAreasModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }
        /// <summary>
        /// 删除签到区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
        public int DeleteSigninAreas(int signinareaid)
        {
            return dal.DeleteSigninAreas(signinareaid);
        }


        public List<QW_SigninAreasModel> GetSigninAreasCom(int sszd, int ssbc)
        {
            return dal.GetSigninAreasCom(sszd, ssbc);
        }

        /// <summary>
        /// 修改签到区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
        public int EditSigninAreas(QW_SigninAreasModel model)
        {
            return dal.EditSigninAreas(model);
        }
    }
}
