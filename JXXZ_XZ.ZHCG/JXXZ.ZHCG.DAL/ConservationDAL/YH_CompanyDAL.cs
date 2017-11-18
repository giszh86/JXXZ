using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ConservationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ConservationDAL
{
    public class YH_CompanyDAL
    {
        /// <summary>
        /// 添加养护单位
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddConserbation(YH_CompanyModel model)
        {
            using (Entities db = new Entities())
            {
                yh_companys yhmodel = new yh_companys();
                yhmodel.companyid = model.companyid;
                yhmodel.companyname = model.companyname;
                yhmodel.legal = model.legal;
                yhmodel.contact = model.contact;
                yhmodel.mobilephone = model.mobilephone;
                yhmodel.telephone = model.telephone;
                yhmodel.faxnumber = model.faxnumber;
                yhmodel.email = model.email;
                yhmodel.companytype = model.companytype;
                yhmodel.address = model.address;
                yhmodel.isenadle = 1;
                yhmodel.createuserid = model.createuserid;
                yhmodel.createtime = DateTime.Now;
                db.yh_companys.Add(yhmodel);
                db.SaveChanges();
                return yhmodel.companyid;
            }
        }

        /// <summary>
        /// 养护单位列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<YH_CompanyModel> GetConserbationList(List<Filter> filters, int start, int limit)
        {
            List<YH_CompanyModel> list = new List<YH_CompanyModel>();
            using (Entities db = new Entities())
            {
                IQueryable<YH_CompanyModel> queryable = from a in db.yh_companys
                                                        join b_join in db.base_zds on a.companytype equals b_join.zd_id into bTmp
                                                        from b in bTmp.DefaultIfEmpty()
                                                        where b.zd_type == "type_yhgs_gslx"
                                                        select new YH_CompanyModel
                                                        {
                                                            companyid = a.companyid,
                                                            companyname = a.companyname,
                                                            legal = a.legal,
                                                            contact = a.contact,
                                                            companytype = a.companytype,
                                                            isenadle = a.isenadle,
                                                            address = a.address,
                                                            isenadlename = a.isenadle == 1 ? "启用" : "未启用",
                                                            companytypename = b == null ? "" : b.zd_name,
                                                            createtime = a.createtime,
                                                            mobilephone = a.mobilephone,

                                                        };
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
                                    queryable = queryable.Where(t => t.companyname.Contains(value));
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.address.Contains(value));
                                }
                                break;
                            case "companytype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.companytype == value);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 养护单位列表数量
        /// </summary>
        /// <returns></returns>
        public int GetConserbationCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<YH_CompanyModel> queryable = from a in db.yh_companys
                                                        join b_join in db.base_zds on a.companytype equals b_join.zd_id into bTmp
                                                        from b in bTmp.DefaultIfEmpty()
                                                        where b.zd_type == "type_yhgs_gslx"
                                                        select new YH_CompanyModel
                                                        {
                                                            companyid = a.companyid,
                                                            companyname = a.companyname,
                                                            legal = a.legal,
                                                            contact = a.contact,
                                                            companytype = a.companytype,
                                                            isenadle = a.isenadle,
                                                            address = a.address,
                                                            companytypename = b == null ? "" : b.zd_name,
                                                            createtime = a.createtime,
                                                        };
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
                                    queryable = queryable.Where(t => t.companyname.Contains(value));
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.address.Contains(value));
                                }
                                break;
                            case "companytype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.companytype == value);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }


        /// <summary>
        /// 养护单位详情
        /// </summary>
        /// <param name="companyid"></param>
        /// <returns></returns>
        public YH_CompanyModel GetConserbationModel(int companyid)
        {
            List<YH_CompanyModel> list = new List<YH_CompanyModel>();
            using (Entities db = new Entities())
            {
                IQueryable<YH_CompanyModel> queryable = from a in db.yh_companys
                                                        join b_join in db.base_zds on a.companytype equals b_join.zd_id into bTmp
                                                        from b in bTmp.DefaultIfEmpty()
                                                        where a.companyid == companyid
                                                        select new YH_CompanyModel
                                                        {
                                                            companyid = a.companyid,
                                                            companyname = a.companyname,
                                                            legal = a.legal,
                                                            contact = a.contact,
                                                            companytype = a.companytype,
                                                            isenadle = a.isenadle,
                                                            address = a.address,
                                                            companytypename = b == null ? "" : b.zd_name,
                                                            createtime = a.createtime,
                                                            email = a.email,
                                                            faxnumber = a.faxnumber,
                                                            telephone = a.telephone,
                                                            mobilephone = a.mobilephone


                                                        };
                YH_FileDAL dal = new YH_FileDAL();
                YH_CompanyModel model = queryable.FirstOrDefault();
                model.filelist = dal.GetFileList(3, model.companyid);
                return model;
            }
        }


        /// <summary>
        /// 修改养护单位
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditConserbation(YH_CompanyModel model)
        {
            using (Entities db = new Entities())
            {
                yh_companys yhmodel = db.yh_companys.FirstOrDefault(a => a.companyid == model.companyid);
                if (yhmodel != null)
                {
                    yhmodel.companyname = model.companyname;
                    yhmodel.legal = model.legal;
                    yhmodel.contact = model.contact;
                    yhmodel.mobilephone = model.mobilephone;
                    yhmodel.telephone = model.telephone;
                    yhmodel.faxnumber = model.faxnumber;
                    yhmodel.email = model.email;
                    yhmodel.companytype = model.companytype;
                    yhmodel.address = model.address;
                    yhmodel.isenadle = model.isenadle;
                    yhmodel.createuserid = model.createuserid;
                    yhmodel.createtime = DateTime.Now;
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 删除养护单位
        /// </summary>
        /// <param name="companyid"></param>
        /// <returns></returns>
        public int DeleteConserbation(int companyid)
        {
            using (Entities db = new Entities())
            {
                yh_companys yhmodel = db.yh_companys.FirstOrDefault(a => a.companyid == companyid);
                if (yhmodel != null)
                {
                    db.yh_companys.Remove(yhmodel);
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 下拉框
        /// </summary>
        /// <returns></returns>
        public List<SourcesModel> GetSourceList()
        {
            List<SourcesModel> list = new List<SourcesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<SourcesModel> queryable = from a in db.yh_companys
                                                     where a.isenadle == 1
                                                     select new SourcesModel
                                                        {
                                                            ID = a.companyid,
                                                            Name = a.companyname,
                                                        };
                list = queryable.ToList();

            }
            return list;
        }

        #region 导出列表到excel
        public List<YH_CompanyModel> GetCompanyListExcel(List<Filter> filters = null)
        {
            List<YH_CompanyModel> list = new List<YH_CompanyModel>();
            using (Entities db = new Entities())
            {
                IQueryable<YH_CompanyModel> queryable = from a in db.yh_companys
                                                        join b_join in db.base_zds on a.companytype equals b_join.zd_id into bTmp
                                                        from b in bTmp.DefaultIfEmpty()
                                                        where b.zd_type == "type_yhgs_gslx"
                                                        select new YH_CompanyModel
                                                        {
                                                            companyid = a.companyid,
                                                            companyname = a.companyname,
                                                            legal = a.legal,
                                                            contact = a.contact,
                                                            companytype = a.companytype,
                                                            isenadle = a.isenadle,
                                                            isenadlename=a.isenadle==1?"启用":"未启用",
                                                            address = a.address,
                                                            companytypename = b == null ? "" : b.zd_name,
                                                            createtime = a.createtime,
                                                            mobilephone = a.mobilephone,

                                                        };
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
                                    queryable = queryable.Where(t => t.companyname.Contains(value));
                                }
                                break;
                            case "address":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.address.Contains(value));
                                }
                                break;
                            case "companytype":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.companytype == value);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
            }
            return list;
        }
        #endregion
    }
}
