using JXXZ.ZHCG.DAL.LowLyingDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.LowLyingModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.LowLyingBLL
{
    public class LowLyingBLL
    {
        private LowLyingDAL dal = new LowLyingDAL();

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<LowLyingModel>> GetLowLyinglist(List<Filter> filters, int start, int limit)
        {
            List<LowLyingModel> items = dal.GetLowLyinglist(filters, start, limit).ToList();
            int total = dal.GetLowLyingCount(filters);
            Paging<List<LowLyingModel>> paging = new Paging<List<LowLyingModel>>();
            paging.Items = items;
            paging.Total = total;
            return paging;
        }

        /// <summary>
        /// 根据ID查看详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public LowLyingModel GetLowLyingModel(int id)
        {
            return dal.GetLowLyingModel(id);
        }

        /// <summary>
        /// 历史数据列表
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<LowLyingOldModel>> GetLowLyingCaveatList(int id, int start, int limit)
        {
            List<LowLyingOldModel> items = dal.GetLowLyingCaveatList(id, start, limit).ToList();
            int total = dal.GetLowLyingCaveatCount(id);
            Paging<List<LowLyingOldModel>> paging = new Paging<List<LowLyingOldModel>>();
            paging.Items = items;
            paging.Total = total;
            return paging;
        }


        /// <summary>
        /// 修改报警临界值
        /// </summary>
        /// <param name="id"></param>
        /// <param name="bjljz"></param>
        /// <returns></returns>
        public int EditLowLying(int id, string bjljz)
        {
            return dal.EditLowLying(id, bjljz);
        }

        /// <summary>
        /// 获取根节点
        /// </summary>
        /// <returns></returns>
        public List<glxxModel> GetGlxxList()
        {
            return dal.GetGlxxList();
        }

        /// <summary>
        /// 获取子节点
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<glxxModel> getGlxxChildren(int id)
        {
            return dal.getGlxxChildren(id);
        }
        /// <summary>
        /// 获取设备信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<sbxxModel> getSbxxList(int id)
        {
            return dal.getSbxxList(id);
        }

        /// <summary>
        /// 获取水位信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public lsjlModel getOldRecordingList(int id)
        {
            return dal.getOldRecordingList(id);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void Add(LowLyingModel model)
        {
            dal.Add(model);
        }
        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="model"></param>
        public void Edit(LowLyingModel model)
        {
            dal.Edit(model);
        }

        public void AddPolice(LowLyingOldModel model) {
            dal.AddPolice(model);
        }


        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<LowLyingModel>> GetApiLowLyinglist(List<Filter> filters, int start, int limit)
        {
            List<LowLyingModel> items = dal.GetApiLowLyinglist(filters, start, limit).ToList();
            int total = dal.GetApiLowLyingCount(filters);
            Paging<List<LowLyingModel>> paging = new Paging<List<LowLyingModel>>();
            paging.Items = items;
            paging.Total = total;
            return paging;
        }
    }
}
