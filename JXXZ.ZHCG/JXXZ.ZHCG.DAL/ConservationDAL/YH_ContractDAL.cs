using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ConservationModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ConservationDAL
{
    public class YH_ContractDAL
    {
        /// <summary>
        /// 添加养护合同
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddContract(YH_ContractModel model, List<FileClass> list)
        {
            bool info = false, file = false;
            using (Entities db = new Entities())
            {
                yh_contracts yhmodel = new yh_contracts();
                yhmodel.contractid = model.contractid;
                yhmodel.contractname = model.contractname;
                yhmodel.patrolexplain = model.patrolexplain;
                yhmodel.contractnum = model.contractnum;
                yhmodel.jfdw = model.jfdw;
                yhmodel.jfdb = model.jfdb;
                yhmodel.yfdw = model.yfdw;
                yhmodel.yfdb = model.yfdb;
                yhmodel.jldw = model.jldw;
                yhmodel.starttime = model.starttime;
                yhmodel.endtime = model.endtime;
                yhmodel.signdate = model.signdate;
                yhmodel.summoney = model.summoney;
                yhmodel.htzxzt = model.htzxzt;
                yhmodel.currentmoney = model.currentmoney;
                yhmodel.contactendtime = model.contactendtime;
                yhmodel.contacttype = model.contacttype;
                yhmodel.contracttype = model.contracttype;
                yhmodel.yhmoney = model.yhmoney;
                yhmodel.patrolemoney = model.patrolemoney;
                yhmodel.createuserid = model.createuserid;
                yhmodel.createtime = DateTime.Now;
                db.yh_contracts.Add(yhmodel);
                if (db.SaveChanges() > 0)
                {
                    info = true;
                }

                foreach (var item in list)
                {
                    yh_files filemodel = new yh_files();
                    filemodel.filesource = 1;   //1合同 2日志 3单位
                    filemodel.filename = item.OriginalName;
                    filemodel.filepath = item.OriginalPath;
                    filemodel.filesize = item.size;
                    filemodel.filetype = item.OriginalType;
                    filemodel.sourceid = yhmodel.contractid;

                    db.yh_files.Add(filemodel);
                }
                if (db.SaveChanges() > 0)
                {
                    file = true;
                }

                if (info || (info && file))
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
        }

        /// <summary>
        /// 当前养护合同列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<YH_ContractModel> GetContractList(List<Filter> filters, int start, int limit)
        {
            List<YH_ContractModel> list = new List<YH_ContractModel>();
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                IQueryable<YH_ContractModel> queryable = from a in db.yh_contracts
                                                         join b_join in db.base_zds on a.contacttype equals b_join.zd_id into btmp
                                                         from b in btmp.DefaultIfEmpty()
                                                         where b.zd_type == "type_yhht_yhnr" && a.contactendtime >= time
                                                         select new YH_ContractModel
                                                         {
                                                             contractnum = a.contractnum,
                                                             contractid = a.contractid,
                                                             contractname = a.contractname,
                                                             contacttype = a.contacttype,
                                                             contacttypename = b == null ? "" : b.zd_name,
                                                             jfdw = a.jfdw,
                                                             jfdb = a.jfdb,
                                                             yfdw = a.yfdw,
                                                             yfdb = a.yfdb,
                                                             jldw = a.jldw,
                                                             patrolexplain = a.patrolexplain,
                                                             patrolemoney = a.patrolemoney,
                                                             yhmoney = a.yhmoney,
                                                             htzxzt = a.htzxzt,
                                                             starttime = a.starttime,
                                                             contractstate = a.htzxzt == 1 ? "执行中" : a.htzxzt == 2 ? "已执行" : "已停止",
                                                             endtime = a.endtime,
                                                             signdate = a.signdate,
                                                             contactendtime = a.contactendtime,
                                                             contracttype = a.contracttype,
                                                             currentmoney = a.currentmoney,
                                                             summoney = a.summoney,
                                                             createtime = a.createtime
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                }
                                break;
                            case "contractnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contractnum.Contains(value));
                                break;
                            case "contracttype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contracttype == value);
                                break;
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.contactendtime >= Stime);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime endtime = DateTime.Parse(value).AddDays(1);
                                    queryable = queryable.Where(t => t.contactendtime >= endtime);
                                }
                                break;
                            case "signdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime signdate = DateTime.Parse(value);
                                    DateTime Etime = signdate.AddDays(1);
                                    queryable = queryable.Where(t => t.signdate >= signdate && t.signdate < Etime);
                                }
                                break;
                            case "htzxzt"://合同状态
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int htzxzt = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.htzxzt == htzxzt);
                                }
                                break;
                            case "contacttype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contacttype == value);
                                break;


                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.contractid).Skip(start).Take(limit).ToList();
            }

            return list;
        }

        public int GetContractCount(List<Filter> filters)
        {
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                IQueryable<YH_ContractModel> queryable = from a in db.yh_contracts
                                                         join b_join in db.base_zds on a.contacttype equals b_join.zd_id into btmp
                                                         from b in btmp.DefaultIfEmpty()
                                                         where b.zd_type == "type_yhht_yhnr" && a.contactendtime >= time
                                                         select new YH_ContractModel
                                                         {
                                                             contractnum = a.contractnum,
                                                             contractid = a.contractid,
                                                             contractname = a.contractname,
                                                             contacttype = a.contacttype,
                                                             contacttypename = b == null ? "" : b.zd_name,
                                                             jfdw = a.jfdw,
                                                             jfdb = a.jfdb,
                                                             yfdw = a.yfdw,
                                                             yfdb = a.yfdb,
                                                             jldw = a.jldw,
                                                             patrolexplain = a.patrolexplain,
                                                             patrolemoney = a.patrolemoney,
                                                             yhmoney = a.yhmoney,
                                                             htzxzt = a.htzxzt,
                                                             starttime = a.starttime,
                                                             endtime = a.endtime,
                                                             signdate = a.signdate,
                                                             contactendtime = a.contactendtime,
                                                             contracttype = a.contracttype,
                                                             currentmoney = a.currentmoney,
                                                             summoney = a.summoney,
                                                             createtime = a.createtime
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                }
                                break;
                            case "contractnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contractnum.Contains(value));
                                break;
                            case "contracttype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contracttype == value);
                                break;
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value);
                                    queryable = queryable.Where(t => t.contactendtime >= Stime);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime endtime = DateTime.Parse(value).AddDays(1);
                                    queryable = queryable.Where(t => t.contactendtime >= endtime);
                                }
                                break;
                            case "signdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime signdate = DateTime.Parse(value);
                                    DateTime Etime = signdate.AddDays(1);
                                    queryable = queryable.Where(t => t.signdate >= signdate && t.signdate < Etime);
                                }
                                break;
                            case "htzxzt":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int htzxzt = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.htzxzt == htzxzt);
                                }
                                break;
                            case "contacttype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contacttype == value);
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }


        /// <summary>
        /// 历史养护合同列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<YH_ContractModel> GetOldContractList(List<Filter> filters, int start, int limit)
        {
            List<YH_ContractModel> list = new List<YH_ContractModel>();
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                IQueryable<YH_ContractModel> queryable = from a in db.yh_contracts
                                                         join b_join in db.base_zds on a.contacttype equals b_join.zd_id into btmp
                                                         from b in btmp.DefaultIfEmpty()
                                                         where b.zd_type == "type_yhht_yhnr" && a.contactendtime < time
                                                         select new YH_ContractModel
                                                         {
                                                             contractnum = a.contractnum,
                                                             contractid = a.contractid,
                                                             contractname = a.contractname,
                                                             contacttype = a.contacttype,
                                                             contacttypename = b == null ? "" : b.zd_name,
                                                             jfdw = a.jfdw,
                                                             jfdb = a.jfdb,
                                                             yfdw = a.yfdw,
                                                             yfdb = a.yfdb,
                                                             jldw = a.jldw,
                                                             patrolexplain = a.patrolexplain,
                                                             patrolemoney = a.patrolemoney,
                                                             yhmoney = a.yhmoney,
                                                             htzxzt = a.htzxzt,
                                                             starttime = a.starttime,
                                                             endtime = a.endtime,
                                                             signdate = a.signdate,
                                                             contactendtime = a.contactendtime,
                                                             contracttype = a.contracttype,
                                                             summoney = a.summoney,
                                                             currentmoney = a.currentmoney,
                                                             createtime = a.createtime,
                                                             contractstate = a.htzxzt == 1 ? "执行中" : a.htzxzt == 2 ? "已执行" : "已停止",
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                }
                                break;
                            case "contractnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contractnum.Contains(value));
                                break;
                            case "contracttype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contracttype == value);
                                break;
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value);
                                    DateTime Etime = Stime.AddDays(1);
                                    queryable = queryable.Where(t => t.starttime >= Stime && t.starttime < Etime);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime endtime = DateTime.Parse(value);
                                    DateTime Etime = endtime.AddDays(1);
                                    queryable = queryable.Where(t => t.endtime >= endtime && t.endtime < Etime);
                                }
                                break;
                            case "signdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime signdate = DateTime.Parse(value);
                                    DateTime Etime = signdate.AddDays(1);
                                    queryable = queryable.Where(t => t.signdate >= signdate && t.signdate < Etime);
                                }
                                break;
                        }
                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
                return list;
            }
        }

        public int GetOldContractCount(List<Filter> filters)
        {
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                IQueryable<YH_ContractModel> queryable = from a in db.yh_contracts
                                                         join b_join in db.base_zds on a.contacttype equals b_join.zd_id into btmp
                                                         from b in btmp.DefaultIfEmpty()
                                                         where b.zd_type == "type_yhht_yhnr" && a.contactendtime < time
                                                         select new YH_ContractModel
                                                         {
                                                             contractnum = a.contractnum,
                                                             contractid = a.contractid,
                                                             contractname = a.contractname,
                                                             contacttype = a.contacttype,
                                                             contacttypename = b == null ? "" : b.zd_name,
                                                             jfdw = a.jfdw,
                                                             jfdb = a.jfdb,
                                                             yfdw = a.yfdw,
                                                             yfdb = a.yfdb,
                                                             jldw = a.jldw,
                                                             patrolexplain = a.patrolexplain,
                                                             patrolemoney = a.patrolemoney,
                                                             yhmoney = a.yhmoney,
                                                             htzxzt = a.htzxzt,
                                                             starttime = a.starttime,
                                                             endtime = a.endtime,
                                                             signdate = a.signdate,
                                                             contactendtime = a.contactendtime,
                                                             contracttype = a.contracttype,
                                                             summoney = a.summoney,
                                                             currentmoney = a.currentmoney,
                                                             createtime = a.createtime,
                                                             contractstate = a.htzxzt == 1 ? "执行中" : a.htzxzt == 2 ? "已执行" : "已停止",
                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "contractname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.contractname.Contains(value));
                                }
                                break;
                            case "contractnum":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contractnum.Contains(value));
                                break;
                            case "contracttype":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.contracttype == value);
                                break;
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value);
                                    DateTime Etime = Stime.AddDays(1);
                                    queryable = queryable.Where(t => t.starttime >= Stime && t.starttime < Etime);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime endtime = DateTime.Parse(value);
                                    DateTime Etime = endtime.AddDays(1);
                                    queryable = queryable.Where(t => t.endtime >= endtime && t.endtime < Etime);
                                }
                                break;
                            case "signdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime signdate = DateTime.Parse(value);
                                    DateTime Etime = signdate.AddDays(1);
                                    queryable = queryable.Where(t => t.signdate >= signdate && t.signdate < Etime);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();
            }
        }

        /// <summary>
        /// 查看养护合同详情
        /// </summary>
        /// <param name="contractid"></param>
        /// <returns></returns>
        public YH_ContractModel GetContractModel(int contractid)
        {
            using (Entities db = new Entities())
            {
                #region linq
                //IQueryable<YH_ContractModel> queryable = from a in db.yh_contracts
                //                                         join b_join in db.base_zds on a.contacttype equals b_join.zd_id into btmp
                //                                         from b in btmp.DefaultIfEmpty()
                //                                         join c_join in db.base_zds on a.contacttype equals c_join.zd_id into ctmp
                //                                         from c in ctmp.DefaultIfEmpty()
                //                                         join d_join in db.base_users on a.createuserid equals d_join.id into dtmp
                //                                         from d in dtmp.DefaultIfEmpty()
                //                                         where b.zd_type == "type_yhht_yhnr" && a.contractid == contractid && c.zd_type == "type_yhht_yhht"
                //                                         select new YH_ContractModel
                //                                         {
                //                                             contractid = a.contractid,
                //                                             contractname = a.contractname,
                //                                             contacttype = a.contacttype,
                //                                             contacttypename = b == null ? "" : b.zd_name,
                //                                             jfdw = a.jfdw,
                //                                             jfdb = a.jfdb,
                //                                             yfdw = a.yfdw,
                //                                             yfdb = a.yfdb,
                //                                             htzxzt = a.htzxzt,
                //                                             createtime = a.createtime,
                //                                             patrolexplain = a.patrolexplain,
                //                                             starttime = a.starttime,
                //                                             endtime = a.endtime,
                //                                             signdate = a.signdate,
                //                                             summoney = a.summoney,
                //                                             currentmoney = a.currentmoney,
                //                                             contactendtime = a.contactendtime,
                //                                             contracttypename = c == null ? "" : c.zd_name,
                //                                             contracttype = a.contracttype,
                //                                             createusername = d == null ? "" : d.displayname,
                //                                             createuserid = a.createuserid,
                //                                         };
                #endregion
                string sql = string.Format(@"select 
yhcon.*,
a.zd_name contacttypename,b.zd_name  contracttypename,users.displayname createusername
from yh_contracts yhcon
left join (select * from yh_files fi where fi.filetype=1) as file on yhcon.contractid= file.sourceid
left join (select * from base_zds zdsOne where zdsOne.zd_type='type_yhht_yhnr') as a on yhcon.contacttype=a.zd_id
left join (select * from base_zds zdsOne where zdsOne.zd_type='type_yhht_yhht') as b on yhcon.contracttype=b.zd_id
left join base_users users on yhcon.createuserid=users.id
where yhcon.contractid=" + contractid);
                IEnumerable<YH_ContractModel> queryable = db.Database.SqlQuery<YH_ContractModel>(sql);

                YH_FileDAL dal = new YH_FileDAL();
                YH_ContractModel model = queryable.FirstOrDefault();
                if (model != null)
                {
                    if (model.htzxzt == 1)
                    {
                        model.contractstate = "执行中";
                    }
                    else if (model.htzxzt == 2)
                    {
                        model.contractstate = "已执行";
                    }
                    else if (model.htzxzt == 3)
                    {
                        model.contractstate = "已停止";
                    }
                    model.filelist = dal.GetFileList(1, contractid);
                }
                return model;
            }

        }

        #region 删除养护合同
        public int DeleteContractInf(int contractid)
        {
            using (Entities db = new Entities())
            {
                yh_contracts model = db.yh_contracts.SingleOrDefault(t => t.contractid == contractid);
                if (model != null)
                {
                    db.yh_contracts.Remove(model);
                }
                //删除附件
                do
                {
                    yh_files file_model = db.yh_files.FirstOrDefault(a => a.sourceid == contractid && a.filesource == 1);
                    if (file_model != null)
                    {
                        db.yh_files.Remove(file_model);
                    }
                }
                while (db.SaveChanges() > 0);
                return db.SaveChanges();
            }
        }
        #endregion

        #region 修改养护合同
        public int ModifyContractInf(YH_ContractModel model, List<FileUploadClass> list)
        {
            bool info = false, file = false;
            using (Entities db = new Entities())
            {
                yh_contracts bags_model = db.yh_contracts.FirstOrDefault(a => a.contractid == model.contractid);
                if (bags_model != null)
                {
                    bags_model.contractname = model.contractname;
                    bags_model.patrolexplain = model.patrolexplain;
                    bags_model.contractnum = model.contractnum;
                    bags_model.jfdw = model.jfdw;
                    bags_model.jfdb = model.jfdb;
                    bags_model.yfdw = model.yfdw;
                    bags_model.yfdb = model.yfdb;
                    bags_model.jldw = model.jldw;
                    bags_model.starttime = model.starttime;
                    bags_model.endtime = model.endtime;
                    bags_model.signdate = model.signdate;
                    bags_model.summoney = model.summoney;
                    bags_model.htzxzt = model.htzxzt;
                    bags_model.currentmoney = model.currentmoney;
                    bags_model.contactendtime = model.contactendtime;
                    bags_model.contacttype = model.contacttype;
                    bags_model.contracttype = model.contracttype;
                    bags_model.yhmoney = model.yhmoney;
                    bags_model.patrolemoney = model.patrolemoney;
                    if (db.SaveChanges() > 0)
                    {
                        info = true;
                    }
                }
                foreach (var item in list)
                {
                    yh_files filemodel = new yh_files();
                    filemodel.filesource = 1;   //1合同2日志3单位
                    filemodel.filename = item.OriginalName;
                    filemodel.filepath = item.OriginalPath;
                    filemodel.filesize = item.size;
                    filemodel.filetype = item.OriginalType;
                    filemodel.sourceid = bags_model.contractid;

                    db.yh_files.Add(filemodel);
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

        #region 查看养护合同是否有关联
        public int IsContractAssociated(int contractid)
        {
            using (Entities db = new Entities())
            {
                yh_contracts model = db.yh_contracts.SingleOrDefault(t => t.contractid == contractid);
                if (model != null)
                {
                    if (db.yh_yhlogs.FirstOrDefault(t => t.yhcontract == contractid) != null || db.yh_yhtasks.FirstOrDefault(t => t.yhcontract == contractid) != null || db.kh_examines.FirstOrDefault(t => t.contractid == contractid) != null)
                    {
                        return -1;
                    }
                }
            }
            return 0;
        }
        #endregion

        /// <summary>
        /// 下拉框
        /// </summary>
        /// <returns></returns>
        public List<SourcesModel> GetSourceList()
        {
            List<SourcesModel> list = new List<SourcesModel>();
            DateTime time = DateTime.Now;
            using (Entities db = new Entities())
            {
                IQueryable<SourcesModel> queryable = from a in db.yh_contracts
                                                     //where a.contactendtime > time
                                                     select new SourcesModel
                                                     {
                                                         ID = a.contractid,
                                                         Name = a.contractname,
                                                     };
                list = queryable.ToList();

            }
            return list;
        }

        #region 导出养护合同列表
        public List<YH_ContractModel> GetContractListExcel(int type, List<Filter> filters = null)
        {
            List<YH_ContractModel> list = new List<YH_ContractModel>();
            //当前养护合同
            DateTime time = DateTime.Now;
            if (type == 1)
            {
                using (Entities db = new Entities())
                {
                    IQueryable<YH_ContractModel> queryable = from a in db.yh_contracts
                                                             join b_join in db.base_zds on a.contacttype equals b_join.zd_id into btmp
                                                             from b in btmp.DefaultIfEmpty()
                                                             where b.zd_type == "type_yhht_yhnr" && a.contactendtime >= time
                                                             select new YH_ContractModel
                                                             {
                                                                 contractnum = a.contractnum,
                                                                 contractid = a.contractid,
                                                                 contractname = a.contractname,
                                                                 contacttype = a.contacttype,
                                                                 contacttypename = b == null ? "" : b.zd_name,
                                                                 jfdw = a.jfdw,
                                                                 jfdb = a.jfdb,
                                                                 yfdw = a.yfdw,
                                                                 yfdb = a.yfdb,
                                                                 jldw = a.jldw,
                                                                 patrolexplain = a.patrolexplain,
                                                                 patrolemoney = a.patrolemoney,
                                                                 yhmoney = a.yhmoney,
                                                                 htzxzt = a.htzxzt,
                                                                 contractstate = a.htzxzt == 1 ? "执行中" : a.htzxzt == 2 ? "已执行" : "已停止",
                                                                 starttime = a.starttime,
                                                                 endtime = a.endtime,
                                                                 signdate = a.signdate,
                                                                 contactendtime = a.contactendtime,
                                                                 contracttype = a.contracttype,
                                                                 currentmoney = a.currentmoney,
                                                                 summoney = a.summoney,
                                                                 createtime = a.createtime
                                                             };
                    if (filters != null && filters.Count > 0)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "contractname":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.contractname.Contains(value));
                                    }
                                    break;
                                case "contractnum":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.contractnum.Contains(value));
                                    break;
                                case "contracttype":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.contracttype == value);
                                    break;
                                case "starttime":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime Stime = DateTime.Parse(value);
                                        queryable = queryable.Where(t => t.contactendtime >= Stime);
                                    }
                                    break;
                                case "endtime":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime endtime = DateTime.Parse(value).AddDays(1);
                                        queryable = queryable.Where(t => t.contactendtime >= endtime);
                                    }
                                    break;
                                case "signdate":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime signdate = DateTime.Parse(value);
                                        DateTime Etime = signdate.AddDays(1);
                                        queryable = queryable.Where(t => t.signdate >= signdate && t.signdate < Etime);
                                    }
                                    break;
                            }
                        }
                    }
                    list = queryable.OrderByDescending(a => a.createtime).ToList();
                }
            }
            //历史养护合同
            else
            {
                using (Entities db = new Entities())
                {
                    IQueryable<YH_ContractModel> queryable = from a in db.yh_contracts
                                                             join b_join in db.base_zds on a.contacttype equals b_join.zd_id into btmp
                                                             from b in btmp.DefaultIfEmpty()
                                                             where b.zd_type == "type_yhht_yhnr" && a.contactendtime < time
                                                             select new YH_ContractModel
                                                             {
                                                                 contractnum = a.contractnum,
                                                                 contractid = a.contractid,
                                                                 contractname = a.contractname,
                                                                 contacttype = a.contacttype,
                                                                 contacttypename = b == null ? "" : b.zd_name,
                                                                 jfdw = a.jfdw,
                                                                 jfdb = a.jfdb,
                                                                 yfdw = a.yfdw,
                                                                 yfdb = a.yfdb,
                                                                 jldw = a.jldw,
                                                                 patrolexplain = a.patrolexplain,
                                                                 patrolemoney = a.patrolemoney,
                                                                 yhmoney = a.yhmoney,
                                                                 htzxzt = a.htzxzt,
                                                                 contractstate = a.htzxzt == 1 ? "执行中" : a.htzxzt == 2 ? "已执行" : "已停止",
                                                                 starttime = a.starttime,
                                                                 endtime = a.endtime,
                                                                 signdate = a.signdate,
                                                                 contactendtime = a.contactendtime,
                                                                 contracttype = a.contracttype,
                                                                 summoney = a.summoney,
                                                                 currentmoney = a.currentmoney,
                                                                 createtime = a.createtime
                                                             };
                    if (filters != null && filters.Count > 0)
                    {
                        foreach (Filter filter in filters)
                        {
                            string value = filter.value;
                            switch (filter.property)
                            {
                                case "contractname":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        queryable = queryable.Where(t => t.contractname.Contains(value));
                                    }
                                    break;
                                case "contractnum":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.contractnum.Contains(value));
                                    break;
                                case "contracttype":
                                    if (!string.IsNullOrEmpty(value))
                                        queryable = queryable.Where(t => t.contracttype == value);
                                    break;
                                case "starttime":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime Stime = DateTime.Parse(value);
                                        DateTime Etime = Stime.AddDays(1);
                                        queryable = queryable.Where(t => t.starttime >= Stime && t.starttime < Etime);
                                    }
                                    break;
                                case "endtime":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime endtime = DateTime.Parse(value);
                                        DateTime Etime = endtime.AddDays(1);
                                        queryable = queryable.Where(t => t.endtime >= endtime && t.endtime < Etime);
                                    }
                                    break;
                                case "signdate":
                                    if (!string.IsNullOrEmpty(value))
                                    {
                                        DateTime signdate = DateTime.Parse(value);
                                        DateTime Etime = signdate.AddDays(1);
                                        queryable = queryable.Where(t => t.signdate >= signdate && t.signdate < Etime);
                                    }
                                    break;
                            }
                        }
                    }
                    list = queryable.OrderByDescending(a => a.createtime).ToList();
                }
            }
            return list;
        }
        #endregion


        public ExaminesModel GetExaminesModel(int contractid) {
            DateTime time=DateTime.Now;
            DateTime dt1 = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/01"));
            ExaminesModel model = new ExaminesModel();
            using (Entities db=new Entities())
            {
                string sql = string.Format(@"SELECT
ke.examineid,
ke.companyid,
ke.contractid,
ke.examinedate,
ke.score,
ke.createuserid,
ke.createtime,
ke.`status`,
yc.contractname,
ycs.companyname,
yc.patrolemoney,
yc.currentmoney,
yc.summoney
from kh_examines ke 
LEFT JOIN yh_contracts yc on ke.contractid = yc.contractid
left join yh_companys ycs on ke.companyid =ycs.companyid 
where ke.examinedate = str_to_date('{0}','%Y/%m/%d') and ke.contractid={1}", dt1, contractid);
                IEnumerable<ExaminesModel> queryable = db.Database.SqlQuery<ExaminesModel>(sql);
                model = queryable.FirstOrDefault();
                if (model!=null)
                    model.fraction = 100 - model.score;
            }
            return model;
        }

        public List<Fraction> GetFractionList(int examineid) {
            List<Fraction> list = new List<Fraction>();
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select deail,deduct from kh_scores where examineid={0}", examineid);
                IEnumerable<Fraction> queryable = db.Database.SqlQuery<Fraction>(sql);
                list = queryable.ToList();
            }
            return list;
        
        }

    }
}
