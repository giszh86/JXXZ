using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.receptionFirstPage;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class receptionCasesController : ApiController
    {
        receptionFirstPageBLL bll = new receptionFirstPageBLL();
        receptionCasesBLL casebll = new receptionCasesBLL();

        /// <summary>
        /// 前台案件获取数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string getreceptionCase()
        {
            List<int> caseStatusList = casebll.getCaseByStatus();
            List<int> caseSourceList = casebll.getCaseBySource();
            List<receptionWtajModel> casebestnew = casebll.getCaseNewList();
            List<int> caselist = bll.getCase();
            string result = JsonConvert.SerializeObject(caseStatusList).ToString() + "|" + JsonConvert.SerializeObject(caseSourceList).ToString() + "|" + JsonConvert.SerializeObject(casebestnew).ToString() + "|" + JsonConvert.SerializeObject(caselist).ToString();
            return result;
        }

        /// <summary>
        /// 案件总数统计
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string getCase() {
            List<int> caselist = bll.getCase();
            string str = JsonConvert.SerializeObject(caselist).ToString();
            return str;
        }

        /// <summary>
        /// 案件数前六类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string getCaseBytype()
        {
            return casebll.getCaseBytype();
        }

        /// <summary>
        /// 案件类型统计分析
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetCaseTypeStatistics(int type)
        {
            List<int> ybansl= casebll.GetYbCaseTypeStatistics(type);
            List<int> jyansl = casebll.GetJyCaseTypeStatistics(type);
            string str = JsonConvert.SerializeObject(ybansl).ToString() + "|" + JsonConvert.SerializeObject(jyansl).ToString();
            return str;

        }
        /// <summary>
        /// 案件状态统计分析
        /// </summary>
        /// <returns></returns>
        public string GetCaseStatus(int type)
        {
            List<int> ays = casebll.GetAysCaseTypeStatistics(type);
            List<int> las = casebll.GetLasCaseTypeStatistics(type);
            List<int> jas = casebll.GetJasCaseTypeStatistics(type);
            string str = JsonConvert.SerializeObject(ays).ToString() + "|" + JsonConvert.SerializeObject(las).ToString() + "|" + JsonConvert.SerializeObject(jas).ToString();
            return str;
        }
    }
}
