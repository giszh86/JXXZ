using JXXZ.ZHCG.BLL.MechanicalExamBLL;
using JXXZ.ZHCG.DAL.MechanicalExaminationDAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.mechanicalassessment
{
    public class receptionExamineController : ApiController
    {
        private receptionExamineBLL bll = new receptionExamineBLL();
        [HttpGet]
        public string GetExamine(int yf)
        {
            //DateTime time = DateTime.Now.AddMonths(-2);
            List<int> ExamineList = bll.GetExamine(yf);
            string Examine = JsonConvert.SerializeObject(ExamineList).ToString();
            return Examine;
        }

        [HttpGet]
        public string GetExamineList()
        {
            string Examine = bll.GetExamineList();
            string ExamineList = bll.GetExamineZjbf();
            //string ExamineCount = JsonConvert.SerializeObject(ExamineList).ToString();
            string str = Examine + "|" + ExamineList;
            return str;
        }
    }
}