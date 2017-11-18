using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.MechanicalExaminationDAL
{
    public class kh_examinesDAL
    {
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
            using (Entities db = new Entities())
            {
                string sql = @"SELECT exams.*, compan.companyname, contra.contractname, IFNULL(SUM(score.deduct),0) sumscore, users.displayname
FROM kh_examines exams LEFT JOIN yh_companys compan ON exams.companyid = compan.companyid LEFT JOIN yh_contracts contra ON exams.contractid = contra.contractid LEFT JOIN kh_scores score ON exams.examineid = score.examineid LEFT JOIN base_users users ON exams.createuserid = users.id
 where YEAR(exams.examinedate)=" + year + " and MONTH(exams.examinedate)=" + month + " GROUP BY exams.examineid";
                IEnumerable<kh_examinesModel> queryable = db.Database.SqlQuery<kh_examinesModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "companyname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.companyname==value);
                                }
                                break;
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime starttime = DateTime.Parse(value);
                                    DateTime Etime = starttime.AddDays(1);
                                    queryable = queryable.Where(t => t.examinedate >= starttime && t.examinedate<Etime);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime endtime = DateTime.Parse(value);
                                    DateTime Etime = endtime.AddDays(1);
                                    queryable = queryable.Where(t => t.examinedate >= endtime && t.examinedate < Etime);
                                }
                                break;
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                break;
                        }
                    }
                }
                IOrderedEnumerable<kh_examinesModel> temp = queryable.OrderByDescending(a => a.createtime);
                Pag<kh_examinesModel> rst = PagHelper.CreatPagList(temp, start, limit);
                return rst;
            }
        }
        #endregion

        #region 添加机械考核
        public int AddMechExamList(kh_examinesModel examModel)
        {
            using (Entities db = new Entities())
            {
                kh_examines exams = new kh_examines();
                exams.companyid = examModel.companyid;
                exams.contractid = examModel.contractid;
                exams.examinedate = examModel.examinedate;
                exams.score = examModel.score;
                exams.status = 0;
                exams.createtime = DateTime.Now;
                exams.createuserid = examModel.createuserid;
                db.kh_examines.Add(exams);
                db.SaveChanges();

                kh_scores scores = new kh_scores();
                scores.examineid = exams.examineid;
                if (examModel.scoresList != null)
                {
                    for (int i = 0; i < examModel.scoresList.Count(); i++)
                    {
                        scores.deail = examModel.scoresList[i].deail;
                        scores.deduct = examModel.scoresList[i].deduct;
                        scores.deductuserid = examModel.createuserid;
                        scores.examinetime = examModel.scoresList[i].examinetime;
                        db.kh_scores.Add(scores);
                        db.SaveChanges();
                    }
                }
                return db.SaveChanges();
            }
        }
        #endregion

        #region 查看机械考核详情
        public kh_examinesModel getMechExamInf(int examineid)
        {
            using (Entities db = new Entities())
            {
                string sql = @"SELECT exams.*, compan.companyname, contra.contractname, IFNULL(SUM(score.deduct), 0) AS sumscore
FROM kh_examines exams LEFT JOIN yh_companys compan ON exams.companyid = compan.companyid LEFT JOIN yh_contracts contra ON exams.contractid = contra.contractid LEFT JOIN kh_scores score ON exams.examineid = score.examineid
WHERE exams.examineid = " + examineid;
                kh_examinesModel queryable = db.Database.SqlQuery<kh_examinesModel>(sql).FirstOrDefault();
                return queryable;
            }
        }
        #endregion

        #region 获取分数列表数据
        public Pag<kh_scoresModel> getScoreList(int examineid, int start, int limit)
        {
            using (Entities db = new Entities())
            {
                IEnumerable<kh_scoresModel> queryable = from a in db.kh_scores
                                                        join b in db.base_users on a.deductuserid equals b.id
                                                         where a.examineid==examineid
                                                         select new kh_scoresModel
                                                         {
                                                             scoreid = a.scoreid,
                                                             deail = a.deail,
                                                             deduct = a.deduct,
                                                             deductuserid = a.deductuserid,
                                                             examinetime = a.examinetime,
                                                             examineid = a.examineid,
                                                             deductusername=b.displayname,
                                                         };
                IOrderedEnumerable<kh_scoresModel> temp = queryable.OrderByDescending(a => a.examineid);
                Pag<kh_scoresModel> rst = PagHelper.CreatPagList(temp, start, limit);
                return rst;
            }
        }
        #endregion

        #region 修改机械考核
        public int EditMechExamInf(kh_examinesModel examModel)
        {
            using (Entities db = new Entities())
            {
                kh_examines exams = db.kh_examines.FirstOrDefault(t => t.examineid == examModel.examineid);
                List<kh_scores> scoresList = db.kh_scores.Where(t => t.examineid == examModel.examineid).ToList();
                if (exams != null)
                {
                    for (int i = 0; i < scoresList.Count; i++)
                    {
                        db.kh_scores.Remove(scoresList[i]);
                        db.SaveChanges();
                    }
                    exams.score = examModel.score;
                    kh_scores scores = new kh_scores();
                    scores.examineid = exams.examineid;
                    if (examModel.scoresList != null)
                    {
                        for (int i = 0; i < examModel.scoresList.Count(); i++)
                        {
                            scores.deail = examModel.scoresList[i].deail;
                            scores.deduct = examModel.scoresList[i].deduct;
                            scores.deductuserid = examModel.createuserid;
                            scores.examinetime = examModel.scoresList[i].examinetime;
                            db.kh_scores.Add(scores);
                            db.SaveChanges();
                        }
                    }
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 发布机械考核
        public int ReleaseMechExam(int examineid)
        {
            using (Entities db = new Entities())
            {
                kh_examines exams = db.kh_examines.FirstOrDefault(t => t.examineid == examineid);
                exams.status = 1;
                return db.SaveChanges();
            }
        }
        #endregion
    }
}
