using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class Doc_WfdddrsDAL
    {
        /// <summary>
        /// 添加环节文书关系表
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int AddWfdddrs(Doc_WfdddrsModel DocModel)
        {
            using (Entities db = new Entities())
            {
                doc_wfdddrs model = new doc_wfdddrs();
                model.dwdid = DocModel.dwdid;
                model.ddid = DocModel.ddid;
                model.wfdid = DocModel.wfdid;
                model.isrequired = DocModel.isrequired;
                model.seq = DocModel.seq;
                model.status = DocModel.status;

                db.doc_wfdddrs.Add(model);
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 修改环节文书关系表
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int EditWFSASModel(int dwfsasid, string WordPath, string PDFPath, int userid)
        {
            using (Entities db = new Entities())
            {
                doc_wfsas model = db.doc_wfsas.FirstOrDefault(t => t.dwfsasid == dwfsasid);
                model.lastwordpath = WordPath;
                model.lastpdfpath = PDFPath;
                model.createuserid = userid;

                return db.SaveChanges();
            }
        }


        public List<Doc_WfdddrsModel> GetWfdddrsList(List<Filter> filters, int start, int limit)
        {
            List<Doc_WfdddrsModel> list = new List<Doc_WfdddrsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Doc_WfdddrsModel> queryable = from a in db.doc_wfdddrs
                                                         join b_json in db.doc_definitions on a.ddid equals b_json.ddid into btemp1
                                                         from b in btemp1.DefaultIfEmpty()
                                                         join c_json in db.case_workflowdetails on a.wfdid equals c_json.wfdid into ctemp1
                                                         from c in ctemp1.DefaultIfEmpty()
                                                         where a.status == 0
                                                         select new Doc_WfdddrsModel
                                                             {
                                                                 dwdid = a.dwdid,
                                                                 ddid = a.ddid,
                                                                 ddname = b.ddname,
                                                                 wfdid = a.wfdid,
                                                                 phaseid = c.phaseid,
                                                                 wfdname = c.wfdname,
                                                                 isrequired = a.isrequired,
                                                                 seq = a.seq

                                                             };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "ddname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ddname.Contains(value));
                                }
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wfdid == value);
                                }
                                break;
                            case "phaseid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int phaseid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.phaseid == phaseid);
                                }
                                break;
                        }
                    }
                }

                list = queryable.OrderBy(a => a.seq).Skip(start).Take(limit).ToList();
            }
            return list;

        }

        public int GetWfdddrsCount(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<Doc_WfdddrsModel> queryable = from a in db.doc_wfdddrs
                                                         join b_json in db.doc_definitions on a.ddid equals b_json.ddid into btemp1
                                                         from b in btemp1.DefaultIfEmpty()
                                                         join c_json in db.case_workflowdetails on a.wfdid equals c_json.wfdid into ctemp1
                                                         from c in ctemp1.DefaultIfEmpty()
                                                         where a.status == 0
                                                         select new Doc_WfdddrsModel
                                                         {
                                                             dwdid = a.dwdid,
                                                             ddid = a.ddid,
                                                             phaseid = c.phaseid,
                                                             ddname = b.ddname,
                                                             wfdid = a.wfdid,
                                                             wfdname = c.wfdname,
                                                             isrequired = a.isrequired,
                                                             seq = a.seq

                                                         };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "ddname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.ddname.Contains(value));
                                }
                                break;
                            case "wfdid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.wfdid == value);
                                }
                                break;
                            case "phaseid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int phaseid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.phaseid == phaseid);
                                }
                                break;

                        }
                    }
                }
                return queryable.Count();
            }


        }

        /// <summary>
        /// 修改环节文书关系表
        /// </summary>
        /// <param name="DocModel"></param>
        /// <returns></returns>
        public int ModifyWfdddrs(Doc_WfdddrsModel DocModel)
        {
            using (Entities db = new Entities())
            {
                doc_wfdddrs model = db.doc_wfdddrs.Where(a => a.dwdid == DocModel.dwdid).FirstOrDefault();
                if (model != null)
                {
                    model.dwdid = DocModel.dwdid;
                    model.ddid = DocModel.ddid;
                    model.wfdid = DocModel.wfdid;
                    model.isrequired = DocModel.isrequired;
                    model.seq = DocModel.seq;
                    model.status = DocModel.status;
                }
                return db.SaveChanges();
            }
        }



        /// <summary>
        /// 根据案件流程id获取文书
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<ClassModel> GetCaseBookList(string wfdid)
        {
            List<ClassModel> list = new List<ClassModel>();
            using (Entities db = new Entities())
            {
                IQueryable<ClassModel> queryable = from a in db.doc_wfdddrs
                                                   join b_json in db.doc_definitions on a.ddid equals b_json.ddid into btemp1
                                                   from b in btemp1.DefaultIfEmpty()
                                                   where a.wfdid == wfdid && a.status == 0
                                                   select new ClassModel
                                                      {
                                                          id = a.ddid,
                                                          name = b.ddname,
                                                          text = b.ddname,
                                                          seq = a.seq,
                                                          code = b.doccode,
                                                          isrequired = a.isrequired,
                                                          isunique = (int)b.isunique
                                                      };
                list = queryable.OrderBy(a => a.seq).ToList();
            }
            return list;
        }

        /// <summary>
        /// 根据案件流程id获取文书
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<Doc_WfsasModel> GetWFSASList(string wfsaid, int ddid, int? phaseid = null, string wfdid = null)
        {
            List<Doc_WfsasModel> list = new List<Doc_WfsasModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Doc_WfsasModel> queryable = null;

                doc_wfsas model = db.doc_wfsas.FirstOrDefault(t => t.wfsaid == wfsaid);
                int? caseid = model.caseid;
                int[] arr = new int[] { 9,11,12,13,14,15,16,17 };

                if (wfdid != null)
                {
                    if (ddid == 47)
                    {
                        doc_wfsas smjmodel = db.doc_wfsas.FirstOrDefault(t => t.wfsaid == wfsaid && t.lastwordpath.Contains("文书扫描件"));
                        if (smjmodel != null)
                        {
                            queryable = from a in db.doc_wfsas
                                        join dd in db.doc_definitions
                                        on a.ddid equals dd.ddid
                                        join wfsa in db.case_workflowspecificactivitys
                                        on a.wfsaid equals wfsa.wfsaid
                                        where wfsa.wfdid == wfdid && a.ddid == smjmodel.ddid && a.status == 0 && a.filetyoe != 4 && a.caseid == caseid
                                        select new Doc_WfsasModel
                                        {
                                            dwfsasid = a.dwfsasid,
                                            wfsaid = a.wfsaid,
                                            ddid = a.ddid,
                                            filetyoe = a.filetyoe,
                                            filename = a.filename,
                                            filepath = a.filepath,
                                            createtime = a.createtime,
                                            caseid = a.caseid,
                                            lastpdfpath = a.lastpdfpath,
                                            lastwordpath = a.lastwordpath,
                                            ddtablename = a.ddtablename,
                                            documentid = a.documentid,
                                            status = a.status,
                                            doccode = dd.doccode,
                                        };
                        }
                    }
                    else
                    {
                        queryable = from a in db.doc_wfsas
                                    join dd in db.doc_definitions
                                    on a.ddid equals dd.ddid
                                    join wfsa in db.case_workflowspecificactivitys
                                    on a.wfsaid equals wfsa.wfsaid
                                    where wfsa.wfdid == wfdid && a.ddid == ddid && a.status == 0 && a.filetyoe != 4 && a.caseid == caseid
                                    select new Doc_WfsasModel
                                    {
                                        dwfsasid = a.dwfsasid,
                                        wfsaid = a.wfsaid,
                                        ddid = a.ddid,
                                        filetyoe = a.filetyoe,
                                        filename = a.filename,
                                        filepath = a.filepath,
                                        createtime = a.createtime,
                                        caseid = a.caseid,
                                        lastpdfpath = a.lastpdfpath,
                                        lastwordpath = a.lastwordpath,
                                        ddtablename = a.ddtablename,
                                        documentid = a.documentid,
                                        status = a.status,
                                        doccode = dd.doccode,
                                    };
                    }
                }
                if(phaseid != null)
                {
                    if (arr.Contains(ddid))
                    {
                        queryable = from a in db.doc_wfsas
                                    join dd in db.doc_definitions
                                    on a.ddid equals dd.ddid
                                    where a.ddid == ddid && a.status == 0 && a.filetyoe != 4 && a.caseid == caseid
                                    select new Doc_WfsasModel
                                    {
                                        dwfsasid = a.dwfsasid,
                                        wfsaid = a.wfsaid,
                                        ddid = a.ddid,
                                        filetyoe = a.filetyoe,
                                        filename = a.filename,
                                        filepath = a.filepath,
                                        createtime = a.createtime,
                                        caseid = a.caseid,
                                        lastpdfpath = a.lastpdfpath,
                                        lastwordpath = a.lastwordpath,
                                        ddtablename = a.ddtablename,
                                        documentid = a.documentid,
                                        status = a.status,
                                        doccode = dd.doccode,
                                    };
                    }
                    else {
                        queryable = from a in db.doc_wfsas
                                    join dd in db.doc_definitions
                                    on a.ddid equals dd.ddid
                                    join wfsa in db.case_workflowspecificactivitys
                                    on a.wfsaid equals wfsa.wfsaid
                                    join wfd in db.case_workflowdetails
                                    on wfsa.wfdid equals wfd.wfdid
                                    where a.ddid == ddid && a.status == 0 && a.filetyoe != 4 && a.caseid == caseid && wfd.phaseid == phaseid
                                    select new Doc_WfsasModel
                                    {
                                        dwfsasid = a.dwfsasid,
                                        wfsaid = a.wfsaid,
                                        ddid = a.ddid,
                                        filetyoe = a.filetyoe,
                                        filename = a.filename,
                                        filepath = a.filepath,
                                        createtime = a.createtime,
                                        caseid = a.caseid,
                                        lastpdfpath = a.lastpdfpath,
                                        lastwordpath = a.lastwordpath,
                                        ddtablename = a.ddtablename,
                                        documentid = a.documentid,
                                        status = a.status,
                                        doccode = dd.doccode,
                                    };
                    }
                }

                list = queryable.OrderBy(a => a.createtime).ToList();
            }
            return list;
        }

        /// <summary>
        /// 查询环节文书详情
        /// </summary>
        /// <param name="dwfsasid">文书表标识</param>
        /// <returns></returns>
        public Doc_WfsasModel GetWFSASInfo(int dwfsasid)
        {
            using (Entities db = new Entities())
            {
                Doc_WfsasModel model = (from a in db.doc_wfsas
                                        where a.dwfsasid == dwfsasid
                                        select new Doc_WfsasModel
                                        {
                                            wfsaid = a.wfsaid,
                                            ddid = a.ddid,
                                            filetyoe = a.filetyoe,
                                            filename = a.filename,
                                            filepath = a.filepath,
                                            lastpdfpath = a.lastpdfpath,
                                            lastwordpath = a.lastwordpath,
                                            ddtablename = a.ddtablename,
                                            documentid = a.documentid,
                                            status = a.status,
                                        }).FirstOrDefault();
                return model;
            }
        }

        /// <summary>
        /// 改变文书状态
        /// </summary>
        /// <param name="dwfsasid">文书表标识</param>
        /// <param name="status">文书状态 -1,已删除,0正常,1已编辑</param>
        /// <returns></returns>
        public int EditDocumentStatus(int dwfsasid, int status)
        {
            using (Entities db = new Entities())
            {
                doc_wfsas model = db.doc_wfsas.FirstOrDefault(a => a.dwfsasid == dwfsasid);
                model.status = status;
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 添加文书表单数据
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public int AddDocumentBySQL(string tablename, string tablepro, string tablevalue, object model)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format("insert into {0}({1}) values({2})", tablename, tablepro, tablevalue);
                db.Database.ExecuteSqlCommand(sql);
                string sqlid = string.Format("select id from {0} order by id desc LIMIT 1", tablename);
                IEnumerable enumable = db.Database.SqlQuery(model.GetType(), sqlid);
                IEnumerable<object> queryable = enumable.Cast<object>();
                int tableid = Convert.ToInt32(queryable.FirstOrDefault().GetType().GetProperties().FirstOrDefault().GetValue(queryable.FirstOrDefault(), null));

                return tableid;
            }
        }

        /// <summary>
        /// 查询表单数据
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public object GetWFSADocumentInfo(int id, string tablename, object model, string goodstablename = null)
        {
            using (Entities db = new Entities())
            {
                string sql = "";
                if (goodstablename != null)//有货物清单
                    sql = string.Format("select * from {0} LEFT JOIN {2} on {0}.id = {2}.documentid where {0}.id ={1} and {2}.documentname='{0}'", tablename, id, goodstablename);
                else
                    sql = string.Format("select * from {0} where id ={1}", tablename, id);
                IEnumerable enumable = db.Database.SqlQuery(model.GetType(), sql);
                IEnumerable<object> queryable = enumable.Cast<object>();
                model = queryable.FirstOrDefault();
                if (goodstablename != null)//有货物清单
                {
                    List<DocumentWPQDdt> wpqdlist = new List<DocumentWPQDdt>();
                    foreach (var item in queryable)
                    {
                        DocumentWPQDdt wpqd = new DocumentWPQDdt();
                        wpqd.goodsname = item.GetType().GetProperty("goodsname").GetValue(item, null).ToString();
                        wpqd.goodscount = Convert.ToInt32(item.GetType().GetProperty("goodscount").GetValue(item, null));
                        wpqd.goodspj = item.GetType().GetProperty("goodspj").GetValue(item, null).ToString();
                        wpqd.goodsgg = item.GetType().GetProperty("goodsgg").GetValue(item, null).ToString();
                        wpqd.goodsxh = item.GetType().GetProperty("goodsxh").GetValue(item, null).ToString();
                        wpqd.goodsxt = item.GetType().GetProperty("goodsxt").GetValue(item, null).ToString();
                        wpqd.goodsremark = item.GetType().GetProperty("goodsremark").GetValue(item, null).ToString();
                        wpqdlist.Add(wpqd);
                    }
                    model.GetType().GetProperty("goodslist").SetValue(model, wpqdlist);
                }

                return model;
            }
        }

        /// <summary>
        /// 根据caseid获取文书模版下的附件列表
        /// </summary>
        /// <returns></returns>
        public List<Doc_WfsasModel> GetWFSASListAPI(int caseid, string tablename)
        {
            List<Doc_WfsasModel> list = new List<Doc_WfsasModel>();            

            using (Entities db = new Entities())
            {
                //案源是否有附件
                int? tzcsid = null;
                if (tablename == "case_simplecases")//简易案件
                {
                    tzcsid = db.case_simplecases.FirstOrDefault(t => t.simpleid == caseid).tzcsid;
                }
                else if (tablename == "case_cases")//一般案件
                {
                    tzcsid = db.case_cases.FirstOrDefault(t => t.caseid == caseid).tzcsid;
                }

                IQueryable<Doc_WfsasModel> extra_queryable = from a in db.doc_wfsas
                                                          where a.caseid == tzcsid && a.ddtablename == "case_casesources" && a.status == 0 && a.filetyoe != 4
                                                          select new Doc_WfsasModel
                                                          {
                                                              dwfsasid = a.dwfsasid,
                                                              wfsaid = a.wfsaid,
                                                              ddid = a.ddid,
                                                              filetyoe = a.filetyoe,
                                                              filename = a.filename,
                                                              filepath = a.filepath,
                                                              createtime = a.createtime,
                                                              caseid = a.caseid,
                                                              lastpdfpath = a.lastpdfpath,
                                                              lastwordpath = a.lastwordpath,
                                                              ddtablename = a.ddtablename,
                                                              documentid = a.documentid,
                                                              status = a.status,
                                                          };
                list.AddRange(extra_queryable);

                IQueryable<Doc_WfsasModel> queryable = from a in db.doc_wfsas
                                                       where a.caseid == caseid && a.ddtablename == tablename && a.status == 0 && a.filetyoe != 4 && a.filename != ""
                                                       select new Doc_WfsasModel
                                                       {
                                                           dwfsasid = a.dwfsasid,
                                                           wfsaid = a.wfsaid,
                                                           ddid = a.ddid,
                                                           filetyoe = a.filetyoe,
                                                           filename = a.filename,
                                                           filepath = a.filepath,
                                                           createtime = a.createtime,
                                                           caseid = a.caseid,
                                                           lastpdfpath = a.lastpdfpath,
                                                           lastwordpath = a.lastwordpath,
                                                           ddtablename = a.ddtablename,
                                                           documentid = a.documentid,
                                                           status = a.status,
                                                       };
                list.AddRange(queryable);
            }
            return list;
        }

        /// <summary>
        /// 根据流程环节获取必填文书
        /// </summary>
        /// <returns></returns>
        public List<Doc_WfdddrsModel> GetRequireWfdddrsList(string wfdid)
        {
            using (Entities db = new Entities())
            {
                List<Doc_WfdddrsModel> queryable = (from a in db.doc_wfdddrs
                                                    where a.wfdid == wfdid && a.isrequired == 1 && a.status == 0
                                                    select new Doc_WfdddrsModel
                                                    {
                                                        dwdid = a.dwdid,
                                                        ddid = a.ddid,
                                                        wfdid = a.wfdid,
                                                        isrequired = a.isrequired,
                                                        seq = a.seq,
                                                        status = a.status
                                                    }).ToList();
                return queryable;
            }
        }

        /// <summary>
        /// 根据案件流程id获取抽样取证通知书
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<Doc_WfsasModel> GetCYQZTZSList(string wfsaid, int ddid)
        {
            List<Doc_WfsasModel> list = new List<Doc_WfsasModel>();
            using (Entities db = new Entities())
            {
                IQueryable<Doc_WfsasModel> queryable = from a in db.doc_wfsas
                                                       join dd in db.doc_definitions on a.ddid equals dd.ddid
                                                       join ws in db.temp_cyqztzs on a.documentid equals ws.id
                                                       where a.wfsaid == wfsaid && a.ddid == ddid && a.status == 0 && a.filetyoe != 4 && ws.sftjcwtzs == "0"
                                                       select new Doc_WfsasModel
                                                       {
                                                           dwfsasid = a.dwfsasid,
                                                           wfsaid = a.wfsaid,
                                                           ddid = a.ddid,
                                                           filetyoe = a.filetyoe,
                                                           filename = a.filename,
                                                           filepath = a.filepath,
                                                           createtime = a.createtime,
                                                           caseid = a.caseid,
                                                           lastpdfpath = a.lastpdfpath,
                                                           lastwordpath = a.lastwordpath,
                                                           ddtablename = a.ddtablename,
                                                           documentid = a.documentid,
                                                           status = a.status,
                                                           doccode = dd.doccode,
                                                           wsbh = ws.wsbh,
                                                       };
                list = queryable.OrderBy(a => a.createtime).ToList();
            }
            return list;
        }

        /// <summary>
        /// 获取责令停止违法行为通知书文书编号
        /// </summary>
        /// <param name="wfsaid"></param>
        /// <param name="ddid"></param>
        /// <returns></returns>
        public string GetZLTZWFXWTZSNumber(string wfsaid, int ddid)
        {
            Entities db = new Entities();
            int year = DateTime.Now.Year;
            doc_wfsas model = db.doc_wfsas.FirstOrDefault(t => t.wfsaid == wfsaid && t.ddid == ddid);
            if (model == null)
            {
                string sql = string.Format(@"SELECT dw.dwfsasid,dw.wfsaid,dw.ddid,dw.filename,dw.documentid,dw.createtime,dw.status,wfs.wfsid,tz.id
                        FROM doc_wfsas dw
                        LEFT JOIN case_workflowspecificactivitys wfsa on dw.wfsaid = wfsa.wfsaid
                        LEFT JOIN case_workflowspecifics wfs on wfsa.wfsid = wfs.wfsid
                        LEFT JOIN temp_zltzwfxwtzs tz on dw.documentid = tz.id
                        WHERE dw.ddid = {0} AND DATE_FORMAT(dw.createtime,'%Y')={1} AND tz.id is not null
                        GROUP BY wfs.wfsid", ddid, year);
                string countstr = (db.Database.SqlQuery<CaseList>(sql).Count() + 1).ToString("000");

                return "秀综责停通字[" + year + "]第" + countstr + "号";
            }
            else
            {
                return db.temp_zltzwfxwtzs.FirstOrDefault(t => t.id == model.documentid).wsbh;
            }
            
        }

        /// <summary>
        /// 修改是否添加抽样取证通知书
        /// </summary>
        /// <param name="wsbh"></param>
        /// <returns></returns>
        public int EditCyqztzs(string wsbh) {
            using (Entities db = new Entities())
            {
                temp_cyqztzs queryable = db.temp_cyqztzs.FirstOrDefault(a => a.wsbh == wsbh);
                if (queryable!=null)
                {
                    queryable.sftjcwtzs = "1";
                }
                return db.SaveChanges();
            }
           
        }

        /// <summary>
        /// 获取流程阶段
        /// </summary>
        /// <returns></returns>
        public List<PhaseModel> GetPhaseList()
        {
            Entities db = new Entities();
            List<PhaseModel> list = db.case_phases.Select(t => new PhaseModel
            {
                phaseid = t.phaseid,
                phasename = t.phasename,
                wfid = t.wfid,
                seq = t.seq
            }).ToList();

            return list;
        }

    }
}
