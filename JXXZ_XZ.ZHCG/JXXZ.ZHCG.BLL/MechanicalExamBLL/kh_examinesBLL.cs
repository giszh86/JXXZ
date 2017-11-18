using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.MechanicalExaminationDAL
{
    public class kh_examinesBLL
    {
        kh_examinesDAL dal = new kh_examinesDAL();
        #region 获取机械考核列表
        /// <summary>
        /// 查询日志列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<kh_examinesModel> GetMechExamList(List<Filter> filters, int start, int limit, int year, int month)
        {
            return dal.GetMechExamList(filters, start, limit, year, month);
        }
        #endregion

        #region 添加机械考核
        public int AddMechExamList(kh_examinesModel examModel)
        {
            return dal.AddMechExamList(examModel);
        }
        #endregion

        #region 查看机械考核详情
        public kh_examinesModel getMechExamInf(int examineid)
        {
            return dal.getMechExamInf(examineid);
        }
        #endregion

        #region 获取考核分数列表
        public Pag<kh_scoresModel> getScoreList(int examineid, int start, int limit)
        {
            return dal.getScoreList(examineid,start,limit);
        }
        #endregion

        #region 编辑机械考核
        public int EditMechExamInf(kh_examinesModel examModel)
        {
            return dal.EditMechExamInf(examModel);
        }
        #endregion

        #region 发布机械考核
        public int ReleaseMechExam(int examineid)
        {
            return dal.ReleaseMechExam(examineid);
        }
        #endregion
    }
}
