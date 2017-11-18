using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CitizenServiceDAL
{
    public class SM_VisitsDAL
    {

        /// <summary>
        /// 回访管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_VisitsModel>> GetVisitsList(List<Filter> filters, int start, int limit)
        {
            List<SM_VisitsModel> list = new List<SM_VisitsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<SM_VisitsModel> queryable = from visits in db.sm_visits
                                                       join citizen in db.sm_citizenservices on visits.citizenid equals citizen.citizenid into temp1
                                                       from input in temp1.DefaultIfEmpty()
                                                       select new SM_VisitsModel
                                                       {
                                                           visitid = visits.visitid,
                                                           citizenid = visits.citizenid,
                                                           visittime = visits.visittime,
                                                           respondents = visits.respondents,
                                                           contact = visits.contact,
                                                           returnvisit = visits.returnvisit,
                                                           returnvisitcontent = visits.returnvisitcontent,
                                                           satisfaction = visits.satisfaction,
                                                           processmode = visits.processmode,
                                                           processopinion = visits.processopinion,
                                                           createtime = visits.createtime,
                                                           createuserid = visits.createuserid,
                                                           eventtitle=input.eventtitle
                                                       };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "visitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.visitid == id);
                                }
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "respondents":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.respondents.Contains(value));
                                break;
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "returnvisit":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int returnvisit = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.returnvisit == returnvisit);
                                }
                                break;
                            case "satisfaction":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int satisfaction = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.satisfaction == satisfaction);
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.visittime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.visittime <= Etime);
                                }
                                break;
                        }
                    }
                }

                Paging<List<SM_VisitsModel>> paging = new Paging<List<SM_VisitsModel>>();
                paging.Items = queryable.ToList();
                paging.Total = queryable.Count();

                list = queryable.OrderByDescending(t => t.createtime).Skip(start).Take(limit).ToList();
                return paging;
            }
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        public List<SM_VisitsModel> GetVisitsListExcel(List<Filter> filters = null)
        {

            using (Entities db = new Entities())
            {
                IQueryable<SM_VisitsModel> queryable = from visits in db.sm_visits
                                                       join citizen in db.sm_citizenservices on visits.citizenid equals citizen.citizenid into temp1
                                                       from input in temp1.DefaultIfEmpty()
                                                       select new SM_VisitsModel
                                                       {
                                                           visitid = visits.visitid,
                                                           citizenid = visits.citizenid,
                                                           visittime = visits.visittime,
                                                           respondents = visits.respondents,
                                                           contact = visits.contact,
                                                           returnvisit = visits.returnvisit,
                                                           returnvisitstr = visits.returnvisit == 1 ? "电话" : visits.returnvisit == 2 ? "实地勘察" : "面谈",
                                                           returnvisitcontent = visits.returnvisitcontent,
                                                           satisfaction = visits.satisfaction,
                                                           satisfactionstr = visits.satisfaction == 1 ? "满意" : visits.satisfaction == 2 ? "一般" : "不满意",
                                                           processmode = visits.processmode,
                                                           processopinion = visits.processopinion,
                                                           createtime = visits.createtime,
                                                           createuserid = visits.createuserid,
                                                           eventtitle = input.eventtitle
                                                       };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "visitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.visitid == id);
                                }
                                break;
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.eventtitle.Contains(value));
                                break;
                            case "respondents":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.respondents.Contains(value));
                                break;
                            case "contact":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contact.Contains(value));
                                break;
                            case "returnvisit":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int returnvisit = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.returnvisit == returnvisit);
                                }
                                break;
                            case "satisfaction":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int satisfaction = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.satisfaction == satisfaction);
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.visittime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.visittime <= Etime);
                                }
                                break;
                        }
                    }
                }

                queryable = queryable.OrderByDescending(t => t.createtime);
                return queryable.ToList();
            }

        }

        public int AddVisits(SM_VisitsModel smmodel) {
            using (Entities db = new Entities())
            {
                sm_visits model = new sm_visits();
                //string id = "";
                model.citizenid = smmodel.citizenid;
                model.visittime = smmodel.visittime;
                model.respondents = smmodel.respondents;
                model.contact = smmodel.contact;
                model.returnvisit = smmodel.returnvisit;
                model.returnvisitcontent = smmodel.returnvisitcontent;
                model.satisfaction = smmodel.satisfaction;
                model.processmode = smmodel.processmode;
                model.processopinion = smmodel.processopinion;
                model.createtime = smmodel.createtime;
                model.createuserid = smmodel.createuserid;

                db.sm_visits.Add(model);
                return db.SaveChanges();
            }
        
        }


    }
}
