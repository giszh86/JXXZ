using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{

    public class Case_WtajsDAL
    {
        /// <summary>
        /// 违停事件
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<Case_WtajsModel>> GetCaseWtajsList(List<Filter> filters, int start, int limit, string processstatus)
        {
            List<Case_WtajsModel> list = new List<Case_WtajsModel>();
            Paging<List<Case_WtajsModel>> paging = new Paging<List<Case_WtajsModel>>();
            using (Entities db = new Entities())
            {

                IQueryable<Case_WtajsModel> queryable = from a in db.case_wtajs
                                                        join b_join in db.base_zds on a.car_type equals b_join.zd_id into bTmp
                                                        from b in bTmp.DefaultIfEmpty()
                                                        where (processstatus == "0" ? a.processstatus == processstatus : (a.processstatus == "1" || a.processstatus == "2")) && b.zd_type == "case_type_car"
                                                        select new Case_WtajsModel
                                                        {
                                                            wtid = a.wtid,
                                                            car_num = a.car_num,
                                                            car_type = a.car_type,
                                                            wt_time = a.wt_time,
                                                            wt_address = a.wt_address,
                                                            cfjdsh = a.cfjdsh,
                                                            reporttime = a.reporttime,
                                                            car_typename = b == null ? "" : b.zd_name,
                                                            unitid = a.unitid
                                                        };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;
                            case "cfjdsh":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.cfjdsh == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.reporttime).Skip(start).Take(limit).ToList();
                //获取列表
                paging.Items = list;
                //获取列表总数量                
                paging.Total = queryable.Count();
            }
            return paging;
        }

        /// <summary>
        /// 全部违停
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_WtajsModel> GetAllCaseWtajsList(List<Filter> filters, int start, int limit)
        {
            List<Case_WtajsModel> list = new List<Case_WtajsModel>();
            using (Entities db = new Entities())
            {
                //IQueryable<Case_WtajsModel> queryable = from a in db.case_wtajs
                //                                        join b_join in db.base_zds on a.car_type equals b_join.zd_id into bTmp
                //                                        from b in bTmp.DefaultIfEmpty()
                //                                        where b.zd_type == "case_type_car"
                //                                        select new Case_WtajsModel
                //                                        {
                //                                            wtid = a.wtid,
                //                                            car_num = a.car_num,
                //                                            car_type = a.car_type,
                //                                            wt_time = a.wt_time,
                //                                            wt_address = a.wt_address,
                //                                            cfjdsh = a.cfjdsh,
                //                                            reporttime = a.reporttime,
                //                                            car_typename = b == null ? "" : b.zd_name,
                //                                            unitid = a.unitid
                //                                        };

                string sql = string.Format(@"SELECT aj.wtid,aj.car_num,aj.car_type,wt_time,aj.wt_address,cfjdsh,reporttime,zd.zd_name car_typename,unitid,wf.filepath photo1 from case_wtajs aj
LEFT join (select wtid,min(filename),min(filepath) filepath  from case_wtfiles group by wtid) as wf on  aj.wtid=wf.wtid
left join base_zds zd on zd.zd_type='case_type_car' and aj.car_type=zd.zd_id");
                IEnumerable<Case_WtajsModel> queryable = db.Database.SqlQuery<Case_WtajsModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address != null && !string.IsNullOrEmpty(t.wt_address) && t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                        }
                    }

                }
                list = queryable.OrderByDescending(a => a.reporttime).Skip(start).Take(limit).ToList();
            }
            return list;
        }
        /// <summary>
        /// 全部违停数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetAllCaseWtajsCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<case_wtajs> queryable = db.case_wtajs.AsQueryable();
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }

        /// <summary>
        /// 手机上报违停
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_WtajsModel> GetApiWt(List<Filter> filters, int start, int limit)
        {
            List<Case_WtajsModel> list = new List<Case_WtajsModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT aj.wtid,aj.car_num,aj.car_type,wt_time,aj.wt_address,cfjdsh,reporttime,zd.zd_name car_typename,unitid,wf.filepath photo1 from case_wtajs aj
LEFT join (select wtid,min(filename),min(filepath) filepath  from case_wtfiles group by wtid) as wf on  aj.wtid=wf.wtid
left join base_zds zd on zd.zd_type='case_type_car' and aj.car_type=zd.zd_id where aj.isphone=1");
                IEnumerable<Case_WtajsModel> queryable = db.Database.SqlQuery<Case_WtajsModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address != null && !string.IsNullOrEmpty(t.wt_address) && t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                        }
                    }

                }
                list = queryable.OrderByDescending(a => a.reporttime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 手机上报违停数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetApiWtCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT aj.wtid,aj.car_num,aj.car_type,wt_time,aj.wt_address,cfjdsh,reporttime,zd.zd_name car_typename,unitid,wf.filepath photo1 from case_wtajs aj
LEFT join (select wtid,min(filename),min(filepath) filepath  from case_wtfiles group by wtid) as wf on  aj.wtid=wf.wtid
left join base_zds zd on zd.zd_type='case_type_car' and aj.car_type=zd.zd_id where aj.isphone=1");
                IEnumerable<Case_WtajsModel> queryable = db.Database.SqlQuery<Case_WtajsModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address != null && !string.IsNullOrEmpty(t.wt_address) && t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                        }
                    }

                }
                return queryable.Count();
            }
        }



        /// <summary>
        /// 违停事件
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_WtajsModel> GetWtajsCaseListExcel(string status,List<Filter> filters=null)
        {
            List<Case_WtajsModel> list = new List<Case_WtajsModel>();
            IQueryable<Case_WtajsModel> queryable = null;
            using (Entities db = new Entities())
            {
                if (status == "0")
                {
                    queryable = from a in db.case_wtajs
                                join b_join in db.base_zds on a.car_type equals b_join.zd_id into bTmp
                                from b in bTmp.DefaultIfEmpty()
                                where (a.processstatus == "1" || a.processstatus == "2") && b.zd_type == "case_type_car"
                                select new Case_WtajsModel
                                {
                                    wtid = a.wtid,
                                    car_num = a.car_num,
                                    car_type = a.car_type,
                                    wt_time = a.wt_time,
                                    wt_address = a.wt_address,
                                    cfjdsh = a.cfjdsh,
                                    reporttime = a.reporttime,
                                    car_typename = b == null ? "" : b.zd_name,
                                    unitid = a.unitid
                                };
                }
                else
                {
                    string sql = string.Format(@"SELECT aj.wtid,aj.car_num,aj.car_type,wt_time,aj.wt_address,cfjdsh,reporttime,zd.zd_name car_typename,unitid,wf.filepath photo1 from case_wtajs aj
LEFT join (select wtid,min(filename),min(filepath) filepath  from case_wtfiles group by wtid) as wf on  aj.wtid=wf.wtid
left join base_zds zd on zd.zd_type='case_type_car' and aj.car_type=zd.zd_id");
                    queryable = db.Database.SqlQuery<Case_WtajsModel>(sql).AsQueryable();
                }
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.reporttime).ToList();
            }
            return list;
        }


        /// <summary>
        /// 详情列表
        /// </summary>
        /// <param name="wtid"></param>
        /// <returns></returns>
        public Case_WtajsModel Getcase(int wtid)
        {
            Case_WtajsModel model = new Case_WtajsModel();
            using (Entities db = new Entities())
            {
                IQueryable<Case_WtajsModel> queryable = from a in db.case_wtajs
                                                        join b_join in db.base_zds on a.car_type equals b_join.zd_id into bTmp
                                                        from b in bTmp.DefaultIfEmpty()
                                                        join c_join in db.base_users on a.shr equals c_join.id into cTmp
                                                        from c in cTmp.DefaultIfEmpty()
                                                        join d_join in db.base_users on a.cjr equals d_join.id into dTmp
                                                        from d in dTmp.DefaultIfEmpty()
                                                        where b.zd_type == "case_type_car" && a.wtid == wtid
                                                        select new Case_WtajsModel
                                                        {
                                                            wtid = a.wtid,
                                                            car_num = a.car_num,
                                                            car_type = a.car_type,
                                                            processstatus = a.processstatus,
                                                            wt_time = a.wt_time,
                                                            wt_address = a.wt_address,
                                                            wfxw = a.wfxw,
                                                            cfjdsh = a.cfjdsh,
                                                            cjdw = a.cjdw,
                                                            cjr = a.cjr,
                                                            dsr = a.dsr,
                                                            dsr_phone = a.dsr_phone,
                                                            dsr_address = a.dsr_address,
                                                            jdr = a.jdr,
                                                            jdsj = a.jdsj,
                                                            shr = a.shr,
                                                            shsj = a.shsj,
                                                            zfreason = a.zfreason,
                                                            datastatus = a.datastatus,
                                                            cldw = a.cldw,
                                                            fkje = a.fkje,
                                                            fphm = a.fphm,
                                                            processuser = a.processuser,
                                                            processtime = a.processtime,
                                                            jsr = a.jsr,
                                                            jssj = a.jssj,
                                                            isphone = a.isphone,
                                                            reportuserid = a.reportuserid,
                                                            reporttime = a.reporttime,
                                                            x84 = a.x84,
                                                            y84 = a.y84,
                                                            x2000 = a.x2000,
                                                            y2000 = a.y2000,
                                                            car_typename = b == null ? "" : b.zd_name,
                                                            shrname = c == null ? "" : c.displayname,
                                                            cjrname = d == null ? "" : d.displayname,
                                                        };
                model = queryable.FirstOrDefault();
                model.casewtfilelist = GetWtfileModel(wtid);
                return model;
            }

        }
        /// <summary>
        /// 图片加载
        /// </summary>
        /// <param name="wtid"></param>
        /// <returns></returns>
        public List<Case_WtfilesModel> GetWtfileModel(int wtid)
        {
            List<Case_WtfilesModel> list = new List<Case_WtfilesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_WtfilesModel> queryable = from a in db.case_wtfiles
                                                          where a.wtid == wtid
                                                          select new Case_WtfilesModel
                                                          {
                                                              wtfileid = a.wtfileid,
                                                              filename = a.filename,
                                                              filetype = a.filetype,
                                                              filepath = a.filepath,
                                                              path="WTCarOriginalPath",
                                                          };
                list = queryable.ToList();
                return list;
            }
        }


        /// <summary>
        /// 图片加载
        /// </summary>
        /// <param name="wtid"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetFileUpload(int wtid)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> queryable = from a in db.case_wtfiles
                                                          where a.wtid == wtid
                                                        select new FileUploadClass
                                                          {
                                                              OriginalName = a.filename,
                                                              OriginalType = a.filetype,
                                                              OriginalPath = a.filepath,
                                                              size = a.filesize,
                                                              path = "WTCarOriginalPath",
                                                          };
                list = queryable.ToList();
                return list;
            }
        }
       

        public int ModifyWtajs(Case_WtajsModel model)
        {
            using (Entities db = new Entities())
            {
                case_wtajs cwmodel = db.case_wtajs.FirstOrDefault(a => a.wtid == model.wtid);
                if (cwmodel != null)
                {
                    cwmodel.processstatus = model.processstatus;
                    cwmodel.zfreason = model.zfreason;
                    cwmodel.shr = model.shr;
                    cwmodel.shsj = DateTime.Now;
                }
                return db.SaveChanges();
            }

        }

        /// <summary>
        /// 添加违停
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddWtajs(case_wtajs model)
        {
            using (Entities db = new Entities())
            {
                db.case_wtajs.Add(model);
                db.SaveChanges();
                return model.wtid;
            }
        }
        /// <summary>
        /// 添加违停附件
        /// </summary>
        /// <param name="model"></param>
        public void AddWtFile(case_wtfiles model)
        {
            using (Entities db = new Entities())
            {
                db.case_wtfiles.Add(model);
                db.SaveChanges();
            }
        }

        public CaseCount GetWtajCount(int type)
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
                IQueryable<CaseLbModel> queryable = from a in db.case_wtajs
                                                    select new CaseLbModel
                                                    {
                                                        casetype=a.processstatus,
                                                        wfsname=a.car_num,
                                                        createtime = a.reporttime
                                                    };
                queryable = queryable.Where(a => a.createtime > starttime && a.createtime < endtime);
                model.id = "3";
                model.name = "违停案件";
                model.count = queryable.Count();
                model.complete = queryable.Where(a => a.casetype != "1").Count();
                model.kept = 0;//queryable.Where(a => a.etime < time).Count();
            }
            return model;
        }


        /// <summary>
        /// 全部违停
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Case_WtajsModel> GetDateAllCaseWtajsList(List<Filter> filters, int start, int limit)
        {
            List<Case_WtajsModel> list = new List<Case_WtajsModel>();
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {

                string sql = string.Format(@"SELECT aj.wtid,aj.car_num,aj.car_type,wt_time,aj.wt_address,cfjdsh,reporttime,zd.zd_name car_typename,unitid,wf.filepath photo1 ,aj.isphone from case_wtajs aj
LEFT join (select wtid,min(filename),min(filepath) filepath  from case_wtfiles group by wtid) as wf on  aj.wtid=wf.wtid
left join base_zds zd on zd.zd_type='case_type_car' and aj.car_type=zd.zd_id where aj.reporttime>=str_to_date('{0}','%Y/%m/%d') and aj.reporttime < str_to_date('{1}','%Y/%m/%d')",dt1,dt2);
                IEnumerable<Case_WtajsModel> queryable = db.Database.SqlQuery<Case_WtajsModel>(sql);

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                            case "isphone":
                                if (!string.IsNullOrEmpty(value)&& value!="-1")
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.isphone == unitid);
                                }
                                break;
                        }
                    }

                }
                list = queryable.OrderByDescending(a => a.reporttime).Skip(start).Take(limit).ToList();
            }
            return list;
        }
        /// <summary>
        /// 全部违停数量
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetDateAllCaseWtajsCount(List<Filter> filters)
        {
            DateTime time = DateTime.Now;
            DateTime dt1 = Convert.ToDateTime("0001/01/01");
            DateTime dt2 = Convert.ToDateTime("0001/01/01");
            dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd"));
            dt2 = dt1.AddDays(1);
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"SELECT aj.wtid,aj.car_num,aj.car_type,wt_time,aj.wt_address,cfjdsh,reporttime,zd.zd_name car_typename,unitid,wf.filepath photo1 ,aj.isphone from case_wtajs aj
LEFT join (select wtid,min(filename),min(filepath) filepath  from case_wtfiles group by wtid) as wf on  aj.wtid=wf.wtid
left join base_zds zd on zd.zd_type='case_type_car' and aj.car_type=zd.zd_id where aj.reporttime>=str_to_date('{0}','%Y/%m/%d') and aj.reporttime < str_to_date('{1}','%Y/%m/%d')", dt1, dt2);
                IEnumerable<Case_WtajsModel> queryable = db.Database.SqlQuery<Case_WtajsModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value) && value != "0")
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                            case "isphone":
                                if (!string.IsNullOrEmpty(value) && value != "-1")
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.isphone == unitid);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }


        #region 导出车辆报警列表
        public List<Case_WtajsModel> GetCaseWtajsList(List<Filter> filters)
        {
            List<Case_WtajsModel> list = new List<Case_WtajsModel>();
            string processstatus = "1";
            using (Entities db = new Entities())
            {
                IQueryable<Case_WtajsModel> queryable = from a in db.case_wtajs
                                                        join b_join in db.base_zds on a.car_type equals b_join.zd_id into bTmp
                                                        from b in bTmp.DefaultIfEmpty()
                                                        where (processstatus == "0" ? a.processstatus == processstatus : (a.processstatus == "1" || a.processstatus == "2")) && b.zd_type == "case_type_car"
                                                        select new Case_WtajsModel
                                                        {
                                                            wtid = a.wtid,
                                                            car_num = a.car_num,
                                                            car_type = a.car_type,
                                                            wt_time = a.wt_time,
                                                            wt_address = a.wt_address,
                                                            cfjdsh = a.cfjdsh,
                                                            reporttime = a.reporttime,
                                                            car_typename = b == null ? "" : b.zd_name,
                                                            unitid = a.unitid
                                                        };
                #region 参数筛选
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "carnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.car_num.Contains(value));
                                break;
                            case "wtaddress":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.wt_address.Contains(value));
                                break;
                            case "cartype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.car_type == value);
                                }
                                break;
                            case "cfjdsh":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.cfjdsh == value);
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.wt_time >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date.AddDays(1);
                                    queryable = queryable.Where(t => t.wt_time <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                        }
                    }
                }
                #endregion
                
                list = queryable.OrderByDescending(a => a.reporttime).ToList();
            }
            return list;
        }
        #endregion
    }
}
