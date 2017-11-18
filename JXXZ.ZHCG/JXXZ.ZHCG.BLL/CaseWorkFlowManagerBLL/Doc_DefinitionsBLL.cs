using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
    public class Doc_DefinitionsBLL
    {
        private Doc_DefinitionsDAL dal = new Doc_DefinitionsDAL();

        /// <summary>
        /// 文书定义表列表
        /// </summary>
        /// <returns></returns>
        public Paging<List<Doc_DefinitionsModel>> GetDefinitionsList(List<Filter> filter ,int start, int limit)
        {

            List<Doc_DefinitionsModel> items = dal.GetDefinitionsList(filter,start, limit).ToList();
            int total = dal.GetDefinitionsCount(filter);

            Paging<List<Doc_DefinitionsModel>> paging = new Paging<List<Doc_DefinitionsModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 文书配置文书
        /// </summary>
        /// <returns></returns>
        public List<ClassModel> GetDefinitionClass()
        {
            return dal.GetDefinitionClass();
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int AddDefinition(Doc_DefinitionsModel DocModel)
        {
            return dal.AddDefinition(DocModel);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="ddid"></param>
        /// <returns></returns>
        public int DeleteDefinition(int ddid)
        {
            return dal.DeleteDefinition(ddid);
        }

    }
}
