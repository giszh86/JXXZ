using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
    public class Case_SourcesBLL
    {
        private Case_SourcesDAL dal = new Case_SourcesDAL();
        /// <summary>
        /// 获取来源
        /// </summary>
        /// <returns></returns>
        public List<ClassModel> GetSourcesClass()
        {
            return dal.GetSourcesClass();

        }

        /// <summary>
        /// 根据ID获取来源名称
        /// </summary>
        /// <returns></returns>
        public string GetSourcesNameByID(int? sourceid)
        {
            return dal.GetSourcesNameByID(sourceid);

        }
    }
}
