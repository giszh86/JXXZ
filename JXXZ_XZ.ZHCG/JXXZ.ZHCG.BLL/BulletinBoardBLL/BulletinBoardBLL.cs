using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.BulletinBoardModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.BulletinBoardDAL
{
    /// <summary>
    /// 公告管理
    /// </summary>
    public class BulletinBoardBLL
    {
        BulletinBoardDAL dal = new BulletinBoardDAL();

        #region 公告管理
        /// <summary>
        /// 获取公告管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        public Paging<List<BulletinBoardModel>> GetBulletinBoardList(List<Filter> filters, int start, int limit, int userid)
        {
            return dal.GetBulletinBoardList(filters,start,limit,userid);
        }
        #endregion

        #region 首页公告管理列表
        public List<BulletinBoardModel> GetBulletinBoardList()
        {
            return dal.GetBulletinBoardList();
        }
        #endregion

        #region 新增公告
        /// <summary>
        /// 新增一条公告
        /// </summary>
        /// <param name="model"></param>
        /// <param name="fileList"></param>
        /// <returns></returns>
        public int AddBulletinBoard(BulletinBoardModel model)
        {
            return dal.AddBulletinBoard(model);
        }
        #endregion

        #region 编辑公告
        /// <summary>
        /// 编辑公告
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditBulletinBoard(BulletinBoardModel model)
        {
            return dal.EditBulletinBoard(model);
        }
        #endregion

        #region 查看公告详情信息
        /// <summary>
        /// 查看公告详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BulletinBoardModel ViewBulletinBoard(int id)
        {
            return dal.ViewBulletinBoard(id);
        }
        #endregion

        #region 删除公告信息
        /// <summary>
        /// 删除公告信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteBulletinBoard(int id)
        {
            return dal.DeleteBulletinBoard(id);
        }
        #endregion

    }
}
