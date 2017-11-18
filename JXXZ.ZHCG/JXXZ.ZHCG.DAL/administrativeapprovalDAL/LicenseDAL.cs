using JXXZ.ZHCG.DAL.SystemDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.administrativeapprovalDAL
{
    public class LicenseDAL
    {
        Base_ZdsDAL base_model = new Base_ZdsDAL();
        #region 获取行政许可待审批列表
        /// <summary>
        /// 获取行政许可待审批列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<LicenseModel> GetPendingCaseSourcesList(List<Filter> filters, int start, int limit, int userid)
        {
            Pag<LicenseModel> list = new Pag<LicenseModel>();
            using (Entities db = new Entities())
            {
                #region linq
                //IQueryable<LicenseModel> queryable = from a in db.xz_licensings
                //                                     join b_join in db.xzj_files.Where(t => t.source == 2) on a.licensingid equals b_join.sourceid into btmp
                //                                     from b in btmp.DefaultIfEmpty()
                //                                     where a.issh == 0
                //                                     orderby a.licensingid descending
                //                                     select new LicenseModel
                //                                     {
                //                                         licensingid = a.licensingid,
                //                                         sph = a.sph,
                //                                         xksx = a.xksx,
                //                                         splx = a.splx,
                //                                         b_address = a.b_address,
                //                                         sxmx = a.sxmx,
                //                                         sqr = a.sqr,
                //                                         cardtype = a.cardtype,
                //                                         card = a.card,
                //                                         contactphone = a.contactphone,
                //                                         s_address = a.s_address,
                //                                         processtime_start = a.processtime_start,
                //                                         processtime_end = a.processtime_end,
                //                                         processcontent = a.processcontent,
                //                                         processaddress = a.processaddress,
                //                                         geography = a.geography,
                //                                         createuserid = a.createuserid,
                //                                         createtime = a.createtime,
                //                                         shresult = a.shresult,
                //                                         shopinion = a.shopinion,
                //                                         shuser = a.shuser,
                //                                         issh = a.issh,
                //                                         shtime = a.shtime,
                //                                         firstImgUrl = b.filename,
                //                                     };
                #endregion
                string sql = string.Format(@"SELECT d.name, lic.*, zds.zd_name AS splxname, file.filepath AS firstImgUrl
FROM xz_licensings lic
	LEFT JOIN (SELECT *
		FROM xzj_files fi
		WHERE fi.source = 2
		GROUP BY fi.sourceid
		) file ON lic.licensingid = file.sourceid
	LEFT JOIN base_zds zds ON lic.splx = zds.zd_id
		AND zds.zd_type = 'type_splx'
	RIGHT JOIN (SELECT b.id, b.usertypeid, c.unitid, e.`name`
		FROM base_users b
			RIGHT JOIN (SELECT a.id, a.unitid
				FROM base_users a
				WHERE a.id = {0}
				) c ON b.unitid = c.unitid
				AND c.unitid BETWEEN 10 AND 17
			LEFT JOIN base_units e ON c.unitid = e.id
		) d ON lic.createuserid = d.id
WHERE lic.issh = 0",userid);
                //判断是否是队员
                string strsql = string.Format(@"select (case when Find_IN_SET (3,a.roleid)>0 then 1 else null end)mark from
(select users.id,users.displayname,GROUP_CONCAT(usroles.roleid) roleid
FROM base_users users LEFT JOIN base_userroles usroles ON users.id = usroles.userid
WHERE  users.id={0}) a;
", userid);
                IEnumerable<LicenseModel> sqlQueryable = db.Database.SqlQuery<LicenseModel>(sql);
                List<string> sqltest = db.Database.SqlQuery<string>(strsql).ToList();
                if (sqltest.FirstOrDefault()==null)
                {
                    return list;
                }
                else
                {
                    foreach (LicenseModel model in sqlQueryable)
                    {
                        if (model != null && model.firstImgUrl != null)
                        {
                            List<string> filelist = new List<string>();
                            filelist.Add(model.firstImgUrl);
                            model.imgUrl = filelist;
                        }
                    }
                    if (filters != null && filters.Count > 0)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "splx":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        sqlQueryable = sqlQueryable.Where(t => t.splx.Contains(value));
                                    }
                                    break;
                                case "sqr":
                                    if (!string.IsNullOrEmpty(value))
                                        sqlQueryable = sqlQueryable.Where(t => t.sqr.Contains(value));
                                    break;
                                case "xksx":
                                    if (!string.IsNullOrEmpty(value))
                                        sqlQueryable = sqlQueryable.Where(t => t.xksx.Contains(value));
                                    break;
                                case "sph":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        sqlQueryable = sqlQueryable.Where(t => t.sph.ToString().Contains(value));
                                    }
                                    break;
                                case "createtime":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime createtime = Convert.ToDateTime(value);
                                        sqlQueryable = sqlQueryable.Where(t => t.createtime == createtime);
                                    }
                                    break;
                            }
                        }
                    }
                    IOrderedEnumerable<LicenseModel> temp = sqlQueryable.OrderByDescending(a => a.createtime);
                    list= PagHelper.CreatPagList(temp, start, limit);
                }
            }
            return list;
        }
        #endregion

        #region 获取行政许可已审批列表
        /// <summary>
        /// 获取行政许可已审批列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<LicenseModel> GetFinishCaseSourcesList(List<Filter> filters, int start, int limit,int userid)
        {
            Pag<LicenseModel> list = new Pag<LicenseModel>();

            using (Entities db = new Entities())
            {
                //判断是否是队员
                string sql = string.Format(@"select users.id,users.displayname,usroles.roleid
FROM base_users users LEFT JOIN base_userroles usroles ON users.id = usroles.userid
WHERE usroles.roleid = 4 and usroles.roleid!=3 and users.id={0}
", userid);
                IEnumerable<LicenseModel> queryable = db.Database.SqlQuery<LicenseModel>(sql);
                if (queryable.Count() > 0)
                {
                    sql = string.Format(@"select lic.*,zds.zd_name splxname,file.filepath firstImgUrl
from xz_licensings lic
left join (select * from xzj_files fi where fi.source=2 group by fi.sourceid) as file on lic.licensingid=file.sourceid
left join base_zds zds on lic.splx=zds.zd_id and zds.zd_type='type_splx'
where  lic.createuserid={0}",userid);
                }
                else
                {
                    sql = string.Format(@"SELECT d.name, lic.*, zds.zd_name AS splxname, file.filepath AS firstImgUrl
FROM xz_licensings lic
	LEFT JOIN (SELECT *
		FROM xzj_files fi
		WHERE fi.source = 2
		GROUP BY fi.sourceid
		) file ON lic.licensingid = file.sourceid
	LEFT JOIN base_zds zds ON lic.splx = zds.zd_id
		AND zds.zd_type = 'type_splx'
	RIGHT JOIN (SELECT b.id, b.usertypeid, c.unitid, e.`name`
		FROM base_users b
			RIGHT JOIN (SELECT a.id, a.unitid
				FROM base_users a
				WHERE a.id = {0}
				) c ON b.unitid = c.unitid
				AND c.unitid BETWEEN 10 AND 17
			LEFT JOIN base_units e ON c.unitid = e.id
		) d ON lic.createuserid = d.id WHERE
	lic.issh = 1", userid);
                }
                    queryable = db.Database.SqlQuery<LicenseModel>(sql);
                    #region linq
                    //IQueryable<LicenseModel> queryable = from a in db.xz_licensings
                    //                                     join b_join in db.xzj_files.Where(t => t.source == 2) on a.licensingid equals b_join.sourceid into btmp
                    //                                     from b in btmp.DefaultIfEmpty()
                    //                                     where a.issh == 1
                    //                                     orderby a.licensingid descending
                    //                                     select new LicenseModel
                    //                                     {
                    //                                         licensingid = a.licensingid,
                    //                                         sph = a.sph,
                    //                                         xksx = a.xksx,
                    //                                         splx = a.splx,
                    //                                         b_address = a.b_address,
                    //                                         sxmx = a.sxmx,
                    //                                         sqr = a.sqr,
                    //                                         cardtype = a.cardtype,
                    //                                         card = a.card,
                    //                                         contactphone = a.contactphone,
                    //                                         s_address = a.s_address,
                    //                                         processtime_start = a.processtime_start,
                    //                                         processtime_end = a.processtime_end,
                    //                                         processcontent = a.processcontent,
                    //                                         processaddress = a.processaddress,
                    //                                         geography = a.geography,
                    //                                         createuserid = a.createuserid,
                    //                                         createtime = a.createtime,
                    //                                         shresult = a.shresult,
                    //                                         shopinion = a.shopinion,
                    //                                         shuser = a.shuser,
                    //                                         issh = a.issh,
                    //                                         shtime = a.shtime,
                    //                                         firstImgUrl = b.filename,
                    //                                     };
                    #endregion

                    foreach (LicenseModel model in queryable)
                    {
                        if (model != null && model.firstImgUrl != null)
                        {
                            List<string> filelist = new List<string>();
                            filelist.Add(model.firstImgUrl);
                            model.imgUrl = filelist;
                        }
                    }
                    if (filters != null && filters.Count > 0)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "splx":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.splx.Contains(value));
                                    }
                                    break;
                                case "sqr":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.sqr.Contains(value));
                                    break;
                                case "xksx":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.xksx.Contains(value));
                                    break;
                                case "sph":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.sph.ToString().Contains(value));
                                    }
                                    break;
                                case "createtime":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime createtime = Convert.ToDateTime(value);
                                        queryable = queryable.Where(t => t.createtime == createtime);
                                    }
                                    break;
                            }
                        }
                    }
                    IOrderedEnumerable<LicenseModel> temp = queryable.OrderByDescending(a => a.createtime);
                    list = PagHelper.CreatPagList(temp, start, limit);
                
            }
            return list;
        }
        #endregion

        #region 获取行政许可审批全部列表
        /// <summary>
        /// 获取行政许可审批全部列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<LicenseModel> GetAllCaseSourcesList(List<Filter> filters, int start, int limit)
        {
            List<LicenseModel> list = new List<LicenseModel>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select lic.*,zds.zd_name splxname,file.filepath firstImgUrl
from xz_licensings lic
left join base_zds zds on lic.splx=zds.zd_id and zds.zd_type='type_splx'
left join (select * from xzj_files fi where fi.source=2 group by fi.sourceid) as file on lic.licensingid=file.sourceid");
                IEnumerable<LicenseModel> queryable = db.Database.SqlQuery<LicenseModel>(sql);
                #region linq
                //IQueryable<LicenseModel> queryable = from a in db.xz_licensings
                //                                     join b_join in db.xzj_files.Where(t => t.source == 2) on a.licensingid equals b_join.sourceid into btmp
                //                                     from b in btmp.DefaultIfEmpty()
                //                                     orderby a.licensingid descending
                //                                     select new LicenseModel
                //                                     {
                //                                         licensingid = a.licensingid,
                //                                         sph = a.sph,
                //                                         xksx = a.xksx,
                //                                         splx = a.splx,
                //                                         b_address = a.b_address,
                //                                         sxmx = a.sxmx,
                //                                         sqr = a.sqr,
                //                                         cardtype = a.cardtype,
                //                                         card = a.card,
                //                                         contactphone = a.contactphone,
                //                                         s_address = a.s_address,
                //                                         processtime_start = a.processtime_start,
                //                                         processtime_end = a.processtime_end,
                //                                         processcontent = a.processcontent,
                //                                         processaddress = a.processaddress,
                //                                         geography = a.geography,
                //                                         createuserid = a.createuserid,
                //                                         createtime = a.createtime,
                //                                         shresult = a.shresult,
                //                                         shopinion = a.shopinion,
                //                                         shuser = a.shuser,
                //                                         issh = a.issh,
                //                                         shtime = a.shtime,
                //                                         firstImgUrl = b.filename,
                //                                     };
                #endregion

                foreach (LicenseModel model in queryable)
                {
                    if (model != null && model.firstImgUrl != null)
                    {
                        List<string> filelist = new List<string>();
                        filelist.Add(model.firstImgUrl);
                        model.imgUrl = filelist;
                    }
                }
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "splx":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.splx.Contains(value));
                                }
                                break;
                            case "sqr":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.sqr.Contains(value));
                                break;
                            case "xksx":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.xksx.Contains(value));
                                break;
                            case "sph":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.sph.ToString().Contains(value));
                                }
                                break;
                            case "createtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtime = Convert.ToDateTime(value);
                                    queryable = queryable.Where(t => t.createtime == createtime);
                                }
                                break;
                        }
                    }
                }
                var temp = queryable.OrderByDescending(a => a.licensingid);
                var rst = PagHelper.CreatPagList(temp, start, limit);
                return rst;

                //list = queryable.OrderByDescending(a => a.licensingid).Skip(start).Take(limit).ToList();
            }
            // return list;
        }
        #endregion

        #region 获取行政许可全部审批数据总量
        /// <summary>
        /// 获取行政许可全部审批数据总量
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public int GetAllCaseSourcesCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<LicenseModel> queryable = from a in db.xz_licensings
                                                     //where a.issh == 1
                                                     select new LicenseModel
                                                     {
                                                         sph = a.sph,
                                                         splx = a.splx,
                                                         sqr = a.sqr,
                                                         xksx = a.xksx,
                                                         createuserid = a.createuserid,
                                                     };


                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "splx":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.splx.Contains(value));
                                }
                                break;
                            case "sqr":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.sqr.Contains(value));
                                break;
                            case "xksx":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.xksx.Contains(value));
                                break;
                            case "sph":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.sph.ToString().Contains(value));
                                }
                                break;
                            case "createtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime createtime = Convert.ToDateTime(value);
                                    queryable = queryable.Where(t => t.createtime == createtime);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }
        #endregion

        #region 获取行政许可详情
        /// <summary>
        /// 获取行政许可详情
        /// </summary>
        /// <param name="licensingid"></param>
        /// <returns></returns>
        public LicenseModel GetApprovalInfo(int licensingid)
        {
            LicenseModel model = new LicenseModel();
            using (Entities db = new Entities())
            {
                IQueryable<LicenseModel> queryable = from a in db.xz_licensings
                                                     join b in db.base_zds.Where(t => t.zd_type == "type_splx") on a.splx equals b.zd_id
                                                     join c in db.base_zds.Where(t => t.zd_type == "type_xzxk_zjlx") on a.cardtype equals c.zd_id
                                                     where a.licensingid == licensingid
                                                     select new LicenseModel
                                                     {
                                                         licensingid = a.licensingid,
                                                         sph = a.sph,
                                                         xksx = a.xksx,
                                                         splx = a.splx,
                                                         b_address = a.b_address,
                                                         sxmx = a.sxmx,
                                                         sqr = a.sqr,
                                                         cardtype = a.cardtype,
                                                         card = a.card,
                                                         contactphone = a.contactphone,
                                                         s_address = a.s_address,
                                                         processtime_start = a.processtime_start,
                                                         processtime_end = a.processtime_end,
                                                         processcontent = a.processcontent,
                                                         processaddress = a.processaddress,
                                                         geography = a.geography,
                                                         createuserid = a.createuserid,
                                                         createtime = a.createtime,
                                                         shresult = a.shresult,
                                                         shopinion = a.shopinion,
                                                         shuser = a.shuser,
                                                         issh = a.issh,
                                                         shtime = a.shtime,
                                                         splxname = b.zd_name,
                                                         cardtypename = c.zd_name
                                                     };
                model = queryable.FirstOrDefault();
                if (GetFilesByLicenseID(licensingid) != null)
                {
                    List<string> imgList = GetFilesByLicenseID(licensingid);
                    if (imgList.Count > 0)
                    {
                        if (model != null)
                        {
                            model.imgUrl = imgList;
                        }
                    }
                }
            }
            return model;
        }
        #endregion

        #region 提交审批处理意见
        /// <summary>
        /// 提交审批处理意见
        /// </summary>
        /// <returns></returns>
        public int AddDealAdvice(LicenseModel model)
        {
            using (Entities db = new Entities())
            {
                xz_licensings lic_model = db.xz_licensings.FirstOrDefault(a => a.licensingid == model.licensingid);
                if (lic_model != null)
                {
                    lic_model.shresult = model.shresult;
                    lic_model.shopinion = model.shopinion;
                    lic_model.issh = 1;
                    lic_model.createtime = DateTime.Now;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region  添加审批信息
        /// <summary>
        /// 添加审批信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddApproveInf(LicenseModel model, List<FileClass> list)
        {
            bool info = false, file = false;
            using (Entities db = new Entities())
            {
                xz_licensings lic_model = new xz_licensings();
                lic_model.sph = Convert.ToInt32(DateTime.Now.ToString("MMddHHmmss"));
                lic_model.xksx = model.xksx;
                lic_model.splx = model.splx;
                lic_model.b_address = model.b_address;
                lic_model.sxmx = model.sxmx;
                lic_model.sqr = model.sqr;
                lic_model.cardtype = model.cardtype;
                lic_model.card = model.card;
                lic_model.contactphone = model.contactphone;
                lic_model.s_address = model.s_address;
                lic_model.processtime_start = model.processtime_start;
                lic_model.processtime_end = model.processtime_end;
                lic_model.processcontent = model.processcontent;
                lic_model.processaddress = model.processaddress;
                lic_model.geography = model.geography;
                lic_model.createuserid = model.createuserid;
                lic_model.createtime = DateTime.Now;
                lic_model.issh = 0;

                if (model != null)
                {
                    string id = model.splx;
                    //model.splx = Convert.ToString(base_model.GetTypeById(id, "type_splx")[id]);
                    lic_model.splx = model.splx;
                    id = model.cardtype;
                    //model.cardtype = Convert.ToString(base_model.GetTypeById(id, "type_xzxk_zjlx")[id]);
                    lic_model.cardtype = model.cardtype;
                }

                //审核意见默认值
                lic_model.shresult = 1;
                lic_model.shuser = model.createuserid;
                lic_model.shopinion = "";
                lic_model.shtime = DateTime.Now;

                db.xz_licensings.Add(lic_model);
                if (db.SaveChanges() > 0)
                {
                    info = true;
                }

                foreach (var item in list)
                {
                    xzj_files filemodel = new xzj_files();
                    filemodel.source = 2;   //1 门前三包  2行政许可
                    filemodel.filename = item.OriginalName;
                    filemodel.filepath = item.OriginalPath;
                    filemodel.filesize = item.size;
                    filemodel.filetype = item.OriginalType;
                    filemodel.sourceid = lic_model.licensingid;

                    db.xzj_files.Add(filemodel);
                }

                if (db.SaveChanges() > 0)
                {
                    file = true;
                }

                if (info && file)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }

        }
        #endregion

        #region 修改审批信息
        /// <summary> 
        /// 修改审批信息
        /// </summary>
        /// <returns></returns>
        public int ModifyApproveInf(LicenseModel model)
        {
            using (Entities db = new Entities())
            {
                xz_licensings lic_model = db.xz_licensings.FirstOrDefault(a => a.licensingid == model.licensingid);
                if (lic_model != null)
                {
                    lic_model.xksx = model.xksx;
                    lic_model.splx = model.splx;
                    lic_model.b_address = model.b_address;
                    lic_model.sxmx = model.sxmx;
                    lic_model.sqr = model.sqr;
                    lic_model.cardtype = model.cardtype;
                    lic_model.card = model.card;
                    lic_model.contactphone = model.contactphone;
                    lic_model.s_address = model.s_address;
                    lic_model.processtime_start = model.processtime_start;
                    lic_model.processtime_end = model.processtime_end;
                    lic_model.processcontent = model.processcontent;
                    lic_model.processaddress = model.processaddress;
                    lic_model.geography = model.geography;
                    lic_model.issh = 0;

                    lic_model.shresult = model.shresult;
                    lic_model.shuser = model.createuserid;
                    lic_model.shopinion = "";
                    lic_model.shtime = DateTime.Now;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 根据行政许可ID获取附件
        /// <summary>
        /// 根据行政许可ID获取附件
        /// </summary>
        /// <param name="licenseId"></param>
        /// <returns></returns>
        public List<string> GetFilesByLicenseID(int licenseId)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> iqueryable = from file in db.xzj_files
                                                         where file.sourceid == licenseId && file.source == 2
                                                         select new FileUploadClass()
                                                         {
                                                             OriginalName = file.filename,
                                                             OriginalPath = file.filepath,
                                                             OriginalType = file.filetype,
                                                             size = file.filesize
                                                         };
                list = iqueryable.ToList();
                if (list.Count > 0)
                {
                    List<string> fileList = new List<string>();

                    for (int j = 0; j < list.Count; j++)
                    {
                        FileUploadClass file = list[j];
                        fileList.Add(file.OriginalPath);
                    }
                    return fileList;
                }
                else
                {
                    return null;
                }
            }
        }
        #endregion


    }
}
