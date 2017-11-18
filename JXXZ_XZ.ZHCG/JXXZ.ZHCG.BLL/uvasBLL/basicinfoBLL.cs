using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.uvasModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.DAL.uvasDAL;
using System.IO;

namespace JXXZ.ZHCG.DAL.uvasDAL
{
    public class basicinfoBLL
    {
        basicinfoDAL dal = new basicinfoDAL();

        #region 无人机基本信息列表
        public Pag<basicinfoModel> GetBaseInfoList(List<Filter> filters, int start, int limit)
        {
            return dal.GetBaseInfoList(filters, start, limit);
        }
        #endregion

        #region 新增一条无人机基本信息
        public int AddBasicInfo(basicinfoModel model)
        {
            return dal.AddBasicInfo(model);
        }
        #endregion

        #region 删除一条无人机信息
        public int DeleteBasicInfo(int ovaid)
        {
            return dal.DeleteBasicInfo(ovaid);
        }
        #endregion

        #region 编辑无人机基本信息
        public int EditBasicInfo(basicinfoModel model)
        {
            return dal.EditBasicInfo(model);
        }
        #endregion

        #region 获取无人机基本信息详情
        public basicinfoModel GetBasicInfo(int ovaid)
        {
            return dal.GetBasicInfo(ovaid);
        }
        #endregion
    }
}
