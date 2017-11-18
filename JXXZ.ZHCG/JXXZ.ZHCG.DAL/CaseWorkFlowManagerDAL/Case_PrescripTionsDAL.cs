using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_PrescripTionsDAL
    {
        public List<Case_PrescripTionsModel> GetPrescripList(int start, int limit)
        {
            List<Case_PrescripTionsModel> list = new List<Case_PrescripTionsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_PrescripTionsModel> queryable = from a in db.case_prescriptions
                                                                
                                                                join c_join in db.case_workflowdetails on a.workid equals c_join.wfdid into cTmp
                                                                from c in cTmp.DefaultIfEmpty()
                                                                select new Case_PrescripTionsModel
                                                                {
                                                                    preid = a.preid,
                                                                    workid = a.workid,
                                                                    workname = c.wfdname,
                                                                    term = a.term,
                                                                };

                list = queryable.OrderBy(a=>a.preid).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        public int GetPrescripCount()
        {
            List<Case_PrescripTionsModel> list = new List<Case_PrescripTionsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_PrescripTionsModel> queryable = from a in db.case_prescriptions
                                                                join b_join in db.case_workflowdetails on a.workid equals b_join.wfdid into bTmp
                                                                from b in bTmp.DefaultIfEmpty()
                                                                select new Case_PrescripTionsModel
                                                                {
                                                                    preid = a.preid,
                                                                    workid = a.workid,
                                                                    workname = b == null ? "" : b.wfdname,
                                                                    term = a.term,
                                                                };

                return queryable.Count();
            }
        }

        public int AddPrescrip(Case_PrescripTionsModel model) {

            using (Entities db=new Entities())
            {
                case_prescriptions cpmodel =db.case_prescriptions.FirstOrDefault(a=>a.workid==model.workid);
                if (cpmodel!=null)
                {
                    return 0;
                }
                else
                {
                    cpmodel = new case_prescriptions();
                    cpmodel.preid = model.preid;
                    cpmodel.term = model.term;
                    cpmodel.workid = model.workid;
                    db.case_prescriptions.Add(cpmodel);

                    return db.SaveChanges();
                }
            }
        }

        public int EditPrescrip(Case_PrescripTionsModel model) {

            using (Entities db = new Entities())
            {
                case_prescriptions cpmodel = db.case_prescriptions.FirstOrDefault(a => a.preid == model.preid);
                
                if (cpmodel != null)
                {
                    if (cpmodel.workid!=model.workid)
                    {
                        case_prescriptions cptmodel = db.case_prescriptions.FirstOrDefault(a => a.workid == model.workid);
                        if (cptmodel!=null)
                        {
                            return 0;
                        }
                    }
                    cpmodel.preid = model.preid;
                    cpmodel.term = model.term;
                    cpmodel.workid = model.workid;
                    
                }
                return db.SaveChanges();
            }
        }

        //根据wfdid获取时限
        public double GetPrescrip(string wfdid)
        {

            using (Entities db = new Entities())
            {
                return db.case_prescriptions.FirstOrDefault(t => t.workid == wfdid).term;
            }
        }
    }
}
