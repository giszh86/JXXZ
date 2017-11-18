
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Case_SimpleCasesDAL
    {
        public int AddSimpleCases(Case_SimpleCasesModel model)
        {
            using (Entities db = new Entities())
            {
                case_simplecases simplecasemodel = new case_simplecases();
                simplecasemodel.simpleid = model.simpleid;
                simplecasemodel.cfjdsbh = model.cfjdsbh;
                simplecasemodel.casetypeid = model.casetypeid;
                simplecasemodel.casename = model.casename;
                simplecasemodel.qlsxid = model.qlsxid;
                simplecasemodel.qlsx = model.qlsx;
                simplecasemodel.casereason = model.casereason;
                simplecasemodel.fromcasesource = model.fromcasesource;
                simplecasemodel.caseaddress = model.caseaddress;
                simplecasemodel.sitedatetime = model.sitedatetime;
                simplecasemodel.geographical84 = model.geographical84;

                simplecasemodel.geographical2000 = model.geographical2000;
                simplecasemodel.persontype = model.persontype;
                simplecasemodel.p_name = model.p_name;
                simplecasemodel.p_sex = model.p_sex;
                simplecasemodel.p_cardtype = model.p_cardtype;
                simplecasemodel.p_cardnum = model.p_cardnum;
                simplecasemodel.f_name = model.f_name;
                simplecasemodel.f_dbr = model.f_dbr;
                simplecasemodel.f_cardtype = model.f_cardtype;
                simplecasemodel.f_card = model.f_card;
                simplecasemodel.f_wtr = model.f_wtr;
                simplecasemodel.f_cardnum = model.f_cardnum;
                simplecasemodel.contactphone = model.contactphone;
                simplecasemodel.contactaddress = model.contactaddress;
                simplecasemodel.flfg = model.flfg;
                simplecasemodel.clyj = model.clyj;
                simplecasemodel.wfqx = model.wfqx;
                simplecasemodel.cf = model.cf;
                simplecasemodel.zdmj = model.zdmj;
                simplecasemodel.gdmj = model.gdmj;
                simplecasemodel.ghjzmj = model.ghjzmj;
                simplecasemodel.gtjzmj = model.gtjzmj;
                simplecasemodel.casecontent = model.casecontent;
                simplecasemodel.jktype = model.jktype;
                simplecasemodel.fk_money = model.fk_money;
                simplecasemodel.bank_name = model.bank_name;
                simplecasemodel.bank_account = model.bank_account;
                simplecasemodel.bank_accountname = model.bank_accountname;
                simplecasemodel.zfr_name = model.zfr_name;
                simplecasemodel.zf_card = model.zf_card;
                simplecasemodel.zf_time = model.zf_time;
                simplecasemodel.zf_address = model.zf_address;
                simplecasemodel.createtime = DateTime.Now;
                simplecasemodel.createuserid = model.createuserid;
                simplecasemodel.cswfsid = model.cswfsid;
                simplecasemodel.tzcsid = model.tzcsid;
                simplecasemodel.isphone = model.isphone;

                db.case_simplecases.Add(simplecasemodel);
                db.SaveChanges();
                return simplecasemodel.simpleid;
            }
        }

        //编辑简易案件
        public int EditSimpleCases(Case_SimpleCasesModel model)
        {
            using (Entities db = new Entities())
            {
                case_simplecases simplecasemodel = db.case_simplecases.FirstOrDefault(t=>t.simpleid == model.simpleid);
                simplecasemodel.cfjdsbh = model.cfjdsbh;
                simplecasemodel.casetypeid = model.casetypeid;
                simplecasemodel.casename = model.casename;
                simplecasemodel.qlsxid = model.qlsxid;
                simplecasemodel.qlsx = model.qlsx;
                simplecasemodel.casereason = model.casereason;
                simplecasemodel.fromcasesource = model.fromcasesource;
                simplecasemodel.caseaddress = model.caseaddress;
                simplecasemodel.sitedatetime = model.sitedatetime;
                simplecasemodel.geographical84 = model.geographical84;

                simplecasemodel.geographical2000 = model.geographical2000;
                simplecasemodel.persontype = model.persontype;
                simplecasemodel.p_name = model.p_name;
                simplecasemodel.p_sex = model.p_sex;
                simplecasemodel.p_cardtype = model.p_cardtype;
                simplecasemodel.p_cardnum = model.p_cardnum;
                simplecasemodel.f_name = model.f_name;
                simplecasemodel.f_dbr = model.f_dbr;
                simplecasemodel.f_cardtype = model.f_cardtype;
                simplecasemodel.f_card = model.f_card;
                simplecasemodel.f_wtr = model.f_wtr;
                simplecasemodel.f_cardnum = model.f_cardnum;
                simplecasemodel.contactphone = model.contactphone;
                simplecasemodel.contactaddress = model.contactaddress;
                simplecasemodel.flfg = model.flfg;
                simplecasemodel.clyj = model.clyj;
                simplecasemodel.wfqx = model.wfqx;
                simplecasemodel.cf = model.cf;
                simplecasemodel.zdmj = model.zdmj;
                simplecasemodel.gdmj = model.gdmj;
                simplecasemodel.ghjzmj = model.ghjzmj;
                simplecasemodel.gtjzmj = model.gtjzmj;
                simplecasemodel.casecontent = model.casecontent;
                simplecasemodel.jktype = model.jktype;
                simplecasemodel.fk_money = model.fk_money;
                simplecasemodel.bank_name = model.bank_name;
                simplecasemodel.bank_account = model.bank_account;
                simplecasemodel.bank_accountname = model.bank_accountname;
                simplecasemodel.zfr_name = model.zfr_name;
                simplecasemodel.zf_card = model.zf_card;
                simplecasemodel.zf_time = model.zf_time;
                simplecasemodel.zf_address = model.zf_address;
                //simplecasemodel.createtime = DateTime.Now;
                simplecasemodel.createuserid = model.createuserid;
                simplecasemodel.cswfsid = model.cswfsid;
                simplecasemodel.isphone = model.isphone;

                return db.SaveChanges();
            }
        }

        public List<Case_SimpleCasesModel> GetSimpleCaseList(List<Filter> filters, int start, int limit)
        {
            List<Case_SimpleCasesModel> list = new List<Case_SimpleCasesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_SimpleCasesModel> queryable = from a in db.case_simplecases

                                                              join dw in db.doc_wfsas on new { a1 = a.simpleid, b1 = "case_simplecases" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dwTmp
                                                              from dwa in dwTmp.DefaultIfEmpty()
                                                              join wfa in db.case_workflowspecificactivitys on dwa.wfsaid equals wfa.wfsaid into wfaTmp
                                                              from dwfaa in wfaTmp.DefaultIfEmpty()

                                                              join h_join in db.base_users on a.createuserid equals h_join.id into hTmp
                                                              from h in hTmp.DefaultIfEmpty()
                                                              join c_join in db.base_units on h.unitid equals c_join.id into ctmp
                                                              from c in ctmp.DefaultIfEmpty()
                                                              select new Case_SimpleCasesModel
                                                              {
                                                                  caseid = a.simpleid,
                                                                  simpleid = a.simpleid,
                                                                  cfjdsbh = a.cfjdsbh,
                                                                  casetypeid = a.casetypeid,
                                                                  casename = a.casename,
                                                                  qlsxid = a.qlsxid,
                                                                  qlsx = a.qlsx,
                                                                  casereason = a.casereason,
                                                                  fromcasesource = a.fromcasesource,
                                                                  caseaddress = a.caseaddress,
                                                                  sitedatetime = a.sitedatetime,
                                                                  geographical84 = a.geographical84,
                                                                  geographical2000 = a.geographical2000,
                                                                  persontype = a.persontype,
                                                                  p_name = a.p_name,
                                                                  p_sex = a.p_sex,
                                                                  p_cardtype = a.p_cardtype,
                                                                  p_cardnum = a.p_cardnum,
                                                                  f_name = a.f_name,
                                                                  f_dbr = a.f_dbr,
                                                                  f_cardtype = a.f_cardtype,
                                                                  f_card = a.f_card,
                                                                  f_wtr = a.f_wtr,
                                                                  f_cardnum = a.f_cardnum,
                                                                  pf_name = a.p_name == null ? a.f_name : a.p_name,
                                                                  contactphone = a.contactphone,
                                                                  contactaddress = a.contactaddress,
                                                                  flfg = a.flfg,
                                                                  clyj = a.clyj,
                                                                  wfqx = a.wfqx,
                                                                  cf = a.cf,
                                                                  zdmj = a.zdmj,
                                                                  gdmj = a.gdmj,
                                                                  ghjzmj = a.ghjzmj,
                                                                  gtjzmj = a.gtjzmj,
                                                                  casecontent = a.casecontent,
                                                                  jktype = a.jktype,
                                                                  fk_money = a.fk_money,
                                                                  bank_name = a.bank_name,
                                                                  bank_account = a.bank_account,
                                                                  bank_accountname = a.bank_accountname,
                                                                  zfr_name = a.zfr_name,
                                                                  zf_card = a.zf_card,

                                                                  zf_time = a.zf_time,
                                                                  zf_address = a.zf_address,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  createusername = h.displayname,
                                                                  cswfsid = a.cswfsid,
                                                                  wfsaid = dwfaa.wfsaid,
                                                                  wfsid1 = dwfaa.wfsid,
                                                                  wfsid2 = a.cswfsid,
                                                                  dwfsasid = dwa.dwfsasid,
                                                                  isphone = a.isphone,

                                                                  unitid = c.id,
                                                                  parentid = c.parentid
                                                              };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "simpleid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.simpleid == id);
                                }
                                break;
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casereason == value);
                                break;
                            case "caseaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.caseaddress.Contains(value));
                                break;
                            case "pf_name":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.pf_name.Contains(value));
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.sitedatetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.sitedatetime <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == id || t.parentid == id);
                                }
                                break;
                          
                        }

                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSimpleComparer()).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 列表导出
        /// </summary>
        /// <returns></returns>
        public List<Case_SimpleCasesModel> GetSimpleCaseListExcel(List<Filter> filters = null)
        {
            List<Case_SimpleCasesModel> list = new List<Case_SimpleCasesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_SimpleCasesModel> queryable = from a in db.case_simplecases

                                                         join dw in db.doc_wfsas on new { a1 = a.simpleid, b1 = "case_simplecases" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dwTmp
                                                         from dwa in dwTmp.DefaultIfEmpty()
                                                         join wfa in db.case_workflowspecificactivitys on dwa.wfsaid equals wfa.wfsaid into wfaTmp
                                                         from dwfaa in wfaTmp.DefaultIfEmpty()

                                                         join h_join in db.base_users on a.createuserid equals h_join.id into hTmp
                                                         from h in hTmp.DefaultIfEmpty()
                                                         join b_join in db.base_users on a.createuserid equals b_join.id into btmp
                                                         from b in btmp.DefaultIfEmpty()
                                                         join c_join in db.base_units on b.unitid equals c_join.id into ctmp
                                                         from c in ctmp.DefaultIfEmpty()
                                                         select new Case_SimpleCasesModel
                                                         {
                                                             simpleid = a.simpleid,
                                                             cfjdsbh = a.cfjdsbh,
                                                             casetypeid = a.casetypeid,
                                                             casereason = a.casereason,
                                                             caseaddress = a.caseaddress,
                                                             sitedatetime = a.sitedatetime,
                                                             geographical84 = a.geographical84,
                                                             geographical2000 = a.geographical2000,
                                                             persontype = a.persontype,
                                                             p_name = a.p_name,
                                                             p_sex = a.p_sex,
                                                             p_cardtype = a.p_cardtype,
                                                             p_cardnum = a.p_cardnum,
                                                             f_name = a.f_name,
                                                             f_dbr = a.f_dbr,
                                                             f_cardtype = a.f_cardtype,
                                                             f_card = a.f_card,
                                                             f_wtr = a.f_wtr,
                                                             f_cardnum = a.f_cardnum,
                                                             pf_name = a.p_name == null?a.f_name:a.p_name,
                                                             contactphone = a.contactphone,
                                                             contactaddress = a.contactaddress,
                                                             flfg = a.flfg,
                                                             cf = a.cf,
                                                             casecontent = a.casecontent,
                                                             jktype = a.jktype,
                                                             fk_money = a.fk_money,
                                                             bank_name = a.bank_name,
                                                             bank_account = a.bank_account,
                                                             bank_accountname = a.bank_accountname,
                                                             zfr_name = a.zfr_name,
                                                             zf_card = a.zf_card,
                                                             isphone = a.isphone,

                                                             zf_time = a.zf_time,
                                                             zf_address = a.zf_address,
                                                             createtime = a.createtime,
                                                             createuserid = a.createuserid,
                                                             createusername = h.displayname,
                                                             cswfsid = a.cswfsid,
                                                             wfsaid = dwfaa.wfsaid,
                                                             wfsid1 = dwfaa.wfsid,
                                                             wfsid2 = a.cswfsid,

                                                             unitid = c.id,
                                                             parentid = c.parentid
                                                         };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "simpleid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.simpleid == id);
                                }
                                break;
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casereason == value);
                                break;
                            case "caseaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.caseaddress.Contains(value));
                                break;
                            case "pf_name":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.pf_name.Contains(value));
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.sitedatetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.sitedatetime <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == id || t.parentid == id);
                                }
                                break;
                         
                        }

                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSimpleComparer()).ToList();

                return list;
            }
        }

        public int GetSimpleCaseCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<Case_SimpleCasesModel> queryable = from a in db.case_simplecases

                                                              join dw in db.doc_wfsas on new { a1 = a.simpleid, b1 = "case_simplecases" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dwTmp
                                                              from dwa in dwTmp.DefaultIfEmpty()
                                                              join wfa in db.case_workflowspecificactivitys on dwa.wfsaid equals wfa.wfsaid into wfaTmp
                                                              from dwfaa in wfaTmp.DefaultIfEmpty()

                                                              join h_join in db.base_users on a.createuserid equals h_join.id into hTmp
                                                              from h in hTmp.DefaultIfEmpty()
                                                              join b_join in db.base_users on a.createuserid equals b_join.id into btmp
                                                              from b in btmp.DefaultIfEmpty()
                                                              join c_join in db.base_units on b.unitid equals c_join.id into ctmp
                                                              from c in ctmp.DefaultIfEmpty()                                                              
                                                              select new Case_SimpleCasesModel
                                                              {
                                                                  simpleid = a.simpleid,
                                                                  cfjdsbh = a.cfjdsbh,
                                                                  casetypeid = a.casetypeid,
                                                                  casereason = a.casereason,
                                                                  caseaddress = a.caseaddress,
                                                                  sitedatetime = a.sitedatetime,
                                                                  geographical84 = a.geographical84,
                                                                  geographical2000 = a.geographical2000,
                                                                  persontype = a.persontype,
                                                                  p_name = a.p_name,
                                                                  p_sex = a.p_sex,
                                                                  p_cardtype = a.p_cardtype,
                                                                  p_cardnum = a.p_cardnum,
                                                                  f_name = a.f_name,
                                                                  f_dbr = a.f_dbr,
                                                                  f_cardtype = a.f_cardtype,
                                                                  f_card = a.f_card,
                                                                  f_wtr = a.f_wtr,
                                                                  f_cardnum = a.f_cardnum,
                                                                  pf_name = a.p_name == null ? a.f_name : a.p_name,
                                                                  contactphone = a.contactphone,
                                                                  contactaddress = a.contactaddress,
                                                                  flfg = a.flfg,
                                                                  cf = a.cf,
                                                                  casecontent = a.casecontent,
                                                                  jktype = a.jktype,
                                                                  fk_money = a.fk_money,
                                                                  bank_name = a.bank_name,
                                                                  bank_account = a.bank_account,
                                                                  bank_accountname = a.bank_accountname,
                                                                  zfr_name = a.zfr_name,
                                                                  zf_card = a.zf_card,
                                                                  isphone = a.isphone,

                                                                  zf_time = a.zf_time,
                                                                  zf_address = a.zf_address,
                                                                  createtime = a.createtime,
                                                                  createuserid = a.createuserid,
                                                                  createusername = h.displayname,
                                                                  unitid = c.id,
                                                                  parentid = c.parentid
                                                              };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "simpleid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.simpleid == id);
                                }
                                break;
                            case "casereason":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casereason == value);
                                break;
                            case "caseaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.caseaddress.Contains(value));
                                break;
                            case "pf_name":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.pf_name.Contains(value));
                                }
                                break;
                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.sitedatetime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.sitedatetime <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == id || t.parentid == id);
                                }
                                break;
                            case "casereasonname":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.casereasonname.Contains(value));
                                break;
                        }
                    }
                }
                List<Case_SimpleCasesModel> list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSimpleComparer()).ToList();
                return list.Count();
            }

        }


        public Case_SimpleCasesModel GetSimpleCaseList(int simpleid)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT
csc.simpleid,
csc.cfjdsbh,
csc.casetypeid,
csc.casereason,
csc.caseaddress,
csc.sitedatetime,
csc.geographical84,
csc.geographical2000,
csc.persontype,
csc.p_name,
csc.p_sex,
csc.p_cardtype,
csc.p_cardnum,
csc.f_name,
csc.f_dbr,
csc.f_cardtype,
csc.f_card,
csc.f_wtr,
csc.f_cardnum,
csc.contactphone,
csc.contactaddress,
csc.flfg,
csc.cf,
csc.casecontent,
csc.jktype,
csc.fk_money,
csc.bank_name,
csc.bank_account,
csc.bank_accountname,
csc.zfr_name,
csc.zf_card,
csc.zf_time,
csc.zf_address,
csc.createtime,
csc.createuserid,
csc.cswfsid AS wfsid2,
csc.tzcsid,
h.displayname AS casereasonname,
wfa.wfsid AS wfsid1,
cz1.zd_name AS bankname,
cz2.zd_name AS bankaccount,
cz3.zd_name AS bankaccountname,
cz4.zd_name AS cardName,
cz5.zd_name AS fcardName
from case_simplecases csc
LEFT JOIN doc_wfsas dw on csc.simpleid=dw.caseid and dw.ddtablename ='case_simplecases'
LEFT JOIN case_workflowspecificactivitys wfa on dw.wfsaid=wfa.wfsaid
LEFT JOIN base_users h on csc.createuserid=h.id

LEFT JOIN case_zds cz1 on csc.bank_name = cz1.zd_id and cz1.zd_type = 'type_bank'
LEFT JOIN case_zds cz2 on csc.bank_account = cz2.zd_id and cz2.zd_type = 'type_accountname'
LEFT JOIN case_zds cz3 on csc.bank_accountname = cz3.zd_id and cz3.zd_type = 'type_account'
LEFT JOIN case_zds cz4 on csc.p_cardtype = cz4.zd_id and cz4.zd_type = 'type_zrr'
LEFT JOIN case_zds cz5 on csc.f_cardtype = cz5.zd_id and cz5.zd_type = 'type_dw'

");
                IEnumerable<Case_SimpleCasesModel> queryable = db.Database.SqlQuery<Case_SimpleCasesModel>(sql);
                Case_SimpleCasesModel model = queryable.FirstOrDefault(a => a.simpleid == simpleid && a.sitedatetime!=null);
                return model;
            }
        }



        public CaseCount GetSimpleCount(int type)
        {
            CaseCount model = new CaseCount();
            DateTime time = DateTime.Now;

            DateTime starttime = Convert.ToDateTime("0001-01-01");
            DateTime endtime = Convert.ToDateTime("0001-01-01");
            if (type == 1)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                endtime = starttime.AddDays(1);
            }
            else if (type == 2)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-01"));
                endtime = starttime.AddMonths(1);
            }
            else if (type == 3)
            {
                starttime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-01-01"));
                endtime = starttime.AddYears(1);
            }

            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select a.wfsid,a.casetype,a.wfsname,b.wfdid,b.etime ,a.createtime
from case_workflowspecifics a 
left join case_workflowspecificactivitys b on a.wfsid=b.wfsid and b.`status`=1
where  a.casetype=3");
                IEnumerable<CaseLbModel> queryable = db.Database.SqlQuery<CaseLbModel>(sql);
                queryable = queryable.Where(a => a.createtime > starttime && a.createtime < endtime);
                model.id = "2";
                model.name = "简易案件";
                model.count = queryable.Count();
                model.complete = queryable.Where(a => a.wfsname == "结束").Count();
                model.kept = queryable.Where(a => a.etime < time).Count();
            }
            return model;
        }

    }
}
