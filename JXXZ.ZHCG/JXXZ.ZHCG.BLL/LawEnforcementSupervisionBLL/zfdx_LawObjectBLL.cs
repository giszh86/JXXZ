using JXXZ.ZHCG.BLL.LawEnforcementSupervisionDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL
{
    public class zfdx_LawObjectBLL
    {
        zfdx_LawObjectDAL dal = new zfdx_LawObjectDAL();

        #region 沿街店家列表
    
        public Paging<List<Zfdx_LawStreetStoreModel>> GetStreeShopList(List<Filter> filter, int start, int limit, int type)
        {
            //List<Zfdx_LawStreetStoreModel> items = dal.GetStreeShopList(filter, start, limit, type).ToList();
            //int total = dal.GetStreeShopCount(filter, type);

            //Paging<List<Zfdx_LawStreetStoreModel>> paging = new Paging<List<Zfdx_LawStreetStoreModel>>();
            //paging.Items = items;
            //paging.Total = total;

            return dal.GetStreeShopList(filter, start, limit, type);
        }
        #endregion

        #region 沿街店家新增
        public int AddStreetShop(Zfdx_LawStreetStoreModel model)
        {
            return dal.AddStreetShop(model);
        }
        #endregion

        #region 沿街店家修改
        public int ModifyStreetShopInf(Zfdx_LawStreetStoreModel model)
        {
            return dal.ModifyStreetShopInf(model);
        }
        #endregion

        #region 沿街店家删除
        public int DeleteStreetShopsInf(int shopid)
        {
            return dal.DeleteStreetShopsInf(shopid);
        }
        #endregion

        #region 沿街店家查看详情
        public Zfdx_LawStreetStoreModel GetStreetShopsInf(int shopid)
        {
            return dal.GetStreetShopsInf(shopid);
        }
        #endregion

        #region 沿街店家设为黑名单
        public int AddStoreInBlackList(int zfdx_shopid)
        {
            return dal.AddStoreInBlackList(zfdx_shopid);
        }
        #endregion

        #region 小摊小贩新增
        public int AddHawker(Zfdx_LawStreetStoreModel model)
        {
            return dal.AddHawker(model);
        }
        #endregion

        #region 小摊小贩修改
        public int Editxf(Zfdx_LawStreetStoreModel model)
        {
            return dal.Editxf(model);
        }
        #endregion

        #region 小摊小贩查看详情
        public Zfdx_LawStreetStoreModel GetHawkerInf(int shopid)
        {
            return dal.GetHawkerInf(shopid);
        }
        #endregion

        #region 黑名单列表
      
        public Paging<List<Zfdx_LawStreetStoreModel>> GetBlackList(List<Filter> filter, int start, int limit, int type)
        {
            List<Zfdx_LawStreetStoreModel> items = dal.GetBlackList(filter, start, limit, type).ToList();
            int total = dal.GetBlackCount(filter, type);

            Paging<List<Zfdx_LawStreetStoreModel>> paging = new Paging<List<Zfdx_LawStreetStoreModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }
        #endregion

        #region 解除黑名单
        public int RemoveStoreInBlackList(int zfdx_shopid)
        {
            return dal.RemoveStoreInBlackList(zfdx_shopid);
        }
        #endregion

        #region 获取不同地区人数
        //获取不同地区沿街店家和小摊小贩人数
        public List<int> GetDiffTypeCount(int type,int isBlack)
        {
            return dal.GetDiffTypeCount(type,isBlack);
        }
        #endregion

        #region 获取报表最多人数
        public int GetMaxNum(int isBlack)
        {
            return dal.GetMaxNum(isBlack);
        }
        #endregion

        #region 报表导出到excel
        public List<Zfdx_LawStreetStoreModel> GetBlackListExcel(int type, List<Filter> filters = null)
        {
            return dal.GetBlackListExcel(type, filters);
        }
        #endregion

        public List<int> GetLawObjectNum()
        {
            return dal.GetLawObjectNum();
        }

    }
}
