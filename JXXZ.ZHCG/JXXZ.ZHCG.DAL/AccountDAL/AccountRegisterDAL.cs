using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AccountModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.AccountDAL
{
    /// <summary>
    /// 台账登记
    /// </summary>
    public class AccountRegisterDAL
    {

        public List<AccountRegisterModel> GetAccountRegisterList(List<Filter> filters, int start, int limit,int type)
        {
            List<AccountRegisterModel> list = new List<AccountRegisterModel>();
            DateTime date = DateTime.Now;
            int nowYear = date.Year;
            using (Entities db = new Entities())
            {
                IQueryable<AccountRegisterModel> queryable = from tzrs in db.tz_registers
                                                             from u in db.base_users
                                                             where tzrs.createuserid == u.id
                                                             from zd in db.base_zds
                                                             where zd.zd_type == "type_task" && tzrs.taskclassid == zd.zd_id 
                                                             where type == 1 ? tzrs.registertime.Year == nowYear : tzrs.registertime.Year < nowYear
                                                             select new AccountRegisterModel()
                                                             {
                                                                 registerid = tzrs.registerid,
                                                                 title = tzrs.title,
                                                                 registertime = tzrs.registertime,
                                                                 people = tzrs.people,
                                                                 address = tzrs.address,
                                                                 taskclassid = tzrs.taskclassid,
                                                                 content = tzrs.content,
                                                                 remark = tzrs.remark,
                                                                 createuserid = tzrs.createuserid,
                                                                 createtime = tzrs.createtime,
                                                                 createuserName = u.displayname,
                                                                 typeID = zd.zd_id,
                                                                 unitid = tzrs.unitid,
                                                                 typeName = zd.zd_name,
                                                                 citizenid = tzrs.eventid,
                                                                 wordname = tzrs.wordname,
                                                                 wordpath = tzrs.wordpath
                                                             };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "typeName":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.typeName.Contains(value));
                                }
                                break;
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.title.Contains(value));
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.registertime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.registertime <= Etime);
                                }
                                break;
                            case "year":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int year = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.registertime.Year == year);
                                }
                                break;
                            case "month":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int month = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.registertime.Month == month);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int unitid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == unitid);
                                }
                                break;
                            case "taskclassid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.taskclassid == value);
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
        /// 获取个数
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetAccountRegisterCount(List<Filter> filters,int type)
        {
            List<AccountRegisterModel> list = new List<AccountRegisterModel>();
            DateTime date = DateTime.Now;
            int nowYear = date.Year;
            using (Entities db = new Entities())
            {
                IQueryable<AccountRegisterModel> queryable = from tzrs in db.tz_registers
                                                             from u in db.base_users
                                                             where tzrs.createuserid == u.id
                                                             from zd in db.base_zds
                                                             where zd.zd_type == "type_task" && tzrs.taskclassid == zd.zd_id
                                                             where type == 1 ? tzrs.registertime.Year == nowYear : tzrs.registertime.Year < nowYear
                                                             select new AccountRegisterModel()
                                                             {
                                                                 registerid = tzrs.registerid,
                                                                 title = tzrs.title,
                                                                 registertime = tzrs.registertime,
                                                                 people = tzrs.people,
                                                                 address = tzrs.address,
                                                                 taskclassid = tzrs.taskclassid,
                                                                 content = tzrs.content,
                                                                 remark = tzrs.remark,
                                                                 createuserid = tzrs.createuserid,
                                                                 createtime = tzrs.createtime,
                                                                 createuserName = u.displayname,
                                                                 typeID = zd.zd_id,
                                                                 unitid = tzrs.unitid,
                                                                 typeName = zd.zd_name,
                                                                 citizenid = tzrs.eventid,
                                                                 wordname = tzrs.wordname,
                                                                 wordpath = tzrs.wordpath
                                                             };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "typeName":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.typeName.Contains(value));
                                }
                                break;
                            case "title":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.title.Contains(value));
                                }
                                break;

                            case "stime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Stime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.registertime >= Stime);
                                }
                                break;
                            case "etime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime Etime = DateTime.Parse(value).Date;
                                    queryable = queryable.Where(t => t.registertime <= Etime);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {

                                    int unitid = Convert.ToInt32(value);
                                    if (unitid != 1)
                                    {
                                        queryable = queryable.Where(t => t.unitid == unitid);
                                    }
                                }
                                break;
                            case "taskclassid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.taskclassid == value);
                                }
                                break;
                        }
                    }
                }
                list = queryable.ToList();
            }
            return list.Count();
        }

        /// <summary>
        /// 添加台帐登记
        /// </summary>
        /// <param name="tztask"></param>
        /// <returns></returns>
        public int AddAccountRegister(AccountRegisterModel tzrs, List<FileUploadClass> list, List<FileClass> eventList)
        {

            using (Entities db = new Entities())
            {
                tz_registers model = new tz_registers();

                model.title = tzrs.title;
                model.registertime = tzrs.registertime;
                model.remark = tzrs.remark;
                model.people = tzrs.people;
                model.address = tzrs.address;
                model.taskclassid = tzrs.taskclassid;
                model.content = tzrs.content;
                model.remark = tzrs.remark;
                model.createuserid = tzrs.createuserid;
                model.createtime = tzrs.createtime;
                model.eventid = tzrs.citizenid;
                model.unitid = tzrs.unitid;
                model.wordname = tzrs.wordname;
                model.wordpath = tzrs.wordpath;
                db.tz_registers.Add(model);
                db.Configuration.ValidateOnSaveEnabled = false;
                db.SaveChanges();
                db.Configuration.ValidateOnSaveEnabled = true;

                foreach (var item in list)
                {
                    tz_files file = new tz_files();
                    file.filename = item.OriginalName;
                    file.filepath = item.OriginalPath;
                    file.filetype = item.OriginalType;
                    file.filesource = 2;
                    file.sourceid = model.registerid;
                    file.filesize = item.size;
                    db.tz_files.Add(file);
                }


                db.SaveChanges();


                //如果是自动处理则把事件改为1
                if (tzrs.citizenid != null && eventList.Count > 0)
                {
                    sm_citizenservices citizenservices = db.sm_citizenservices.Where(m => m.citizenid == tzrs.citizenid).FirstOrDefault();
                    citizenservices.istz = 1;
                    foreach (var item in eventList)
                    {
                        tz_files file = new tz_files();
                        file.filename = item.OriginalName;
                        file.filepath = item.OriginalPath;
                        file.filetype = item.OriginalType;
                        file.filesource = 2;
                        file.sourceid = model.registerid;
                        file.filesize = item.size;
                        db.tz_files.Add(file);
                    }
                    db.SaveChanges();
                }
                return 1;
            }
        }

        /// <summary>
        /// 编辑台帐登记
        /// </summary>
        /// <param name="tztask"></param>
        /// <returns></returns>

        public int EditAccountRegister(AccountRegisterModel tzrs, List<FileUploadClass> list)
        {
            using (Entities db = new Entities())
            {
                int count = 0;
                tz_registers model = db.tz_registers.Where(t => t.registerid == tzrs.registerid).FirstOrDefault();
                if (model != null)
                {
                    model.registerid = tzrs.registerid;
                    model.title = tzrs.title;
                    model.registertime = tzrs.registertime;
                    model.remark = tzrs.remark;
                    model.people = tzrs.people;
                    model.address = tzrs.address;
                    model.taskclassid = tzrs.taskclassid;
                    model.content = tzrs.content;
                    model.remark = tzrs.remark;
                    model.createuserid = tzrs.createuserid;
                    model.createtime = tzrs.createtime;
                    model.eventid = tzrs.citizenid;
                    // model.unitid = tzrs.unitid;
                    model.wordname = tzrs.wordname;
                    model.wordpath = tzrs.wordpath;
                    foreach (var item in list)
                    {
                        tz_files file = new tz_files();
                        file.filename = item.OriginalName;
                        file.filepath = item.OriginalPath;
                        file.filetype = item.OriginalType;
                        file.filesource = 2;
                        file.sourceid = tzrs.registerid;
                        file.filesize = item.size;
                        db.tz_files.Add(file);
                    }
                    count = db.SaveChanges();
                }
                return count;
            }

        }


        /// <summary>
        /// 根据登记ID获取附件
        /// </summary>
        /// <param name="registerid"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetRegisteridFilesByTaskID(int registerid)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> iqueryable = from file in db.tz_files
                                                         where file.sourceid == registerid && file.filesource == 2
                                                         select new FileUploadClass()
                                                         {
                                                             OriginalName = file.filename,
                                                             OriginalPath = file.filepath,
                                                             OriginalType = file.filetype,
                                                             size = file.filesize
                                                         };
                list = iqueryable.ToList();
            }
            return list;
        }



        /// <summary>
        /// 获取中队等
        /// </summary>
        /// <returns></returns>
        public List<Unit> GetUnitsSquadron(int unittypeid)
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                     from a in db.base_units
                     join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     where a.unittypeid == unittypeid
                     select new Unit()
                     {
                         ID = a.id,
                         Code = a.code,
                         Name = a.name,
                         UnitTypeID = a.unittypeid,
                         UnitTypeName = b == null ? "" : b.name,
                         Path = a.path,
                         ParentID = a.parentid,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime
                     };


                queryable = queryable.OrderByDescending(t => t.UpdatedTime);

                list = queryable.ToList();
            }

            return list;
        }

        /// <summary>
        /// 获取所有部门
        /// </summary>
        /// <returns></returns>
        public List<Unit> GetUnitsALLSquadron()
        {
            List<Unit> list = new List<Unit>();

            using (Entities db = new Entities())
            {
                IQueryable<Unit> queryable =
                     from a in db.base_units
                     join b_join in db.base_unittypes on a.unittypeid equals b_join.id into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     orderby a.updatedtime descending
                     where a.parentid == 2
                     select new Unit()
                     {
                         ID = a.id,
                         Code = a.code,
                         Name = a.name,
                         UnitTypeID = a.unittypeid,
                         UnitTypeName = b == null ? "" : b.name,
                         Path = a.path,
                         ParentID = a.parentid,
                         CreatedTime = a.createdtime,
                         UpdatedTime = a.updatedtime,
                         //unitid=a.id
                     };


                queryable = queryable.OrderBy(t => t.ID);

                list = queryable.ToList();
            }

            return list;
        }

        /// <summary>
        /// 获取事件等
        /// </summary>
        /// <returns></returns>
        public List<SM_CitizenServicesModel> GetEvent(List<Filter> filters, int start, int limit)
        {

            List<SM_CitizenServicesModel> list = new List<SM_CitizenServicesModel>();
            using (Entities db = new Entities())
            {
                IQueryable<SM_CitizenServicesModel> queryable =
                     from a in db.sm_citizenservices
                     //where a.istz == 0
                     from b in db.sm_specialrectifications
                     where a.srid == b.srid
                     from user in db.base_users
                     where user.id == a.createuserid
                     select new SM_CitizenServicesModel()
                     {
                         citizenid = a.citizenid,
                         eventtitle = a.eventtitle,
                         eventaddress = a.eventaddress,
                         complainant = a.complainant,
                         contactphone = a.contactphone,
                         foundtime = a.foundtime,
                         eventcontent = a.eventcontent,
                         //istz = a.istz,
                         srid = a.srid,
                         //sridname=b.srname,
                         sourceid = a.sourceid,
                         username = user.displayname,
                         sourcename = a.sm_sources.name,
                         createtime = a.createtime,

                     };


                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "eventtitle":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.eventtitle.Contains(value));
                                }
                                break;
                            case "sourceid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int sourceid = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.sourceid == sourceid);
                                }
                                break;

                            case "eventaddress":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.eventaddress.Contains(value));
                                }
                                break;


                        }
                    }
                }

                list = queryable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
            }

            return list;
        }




        //根据中队ID获取任务
        public List<AccountRegisterTask> GetUnitsAccountRegister(int? unitID)
        {
            List<AccountRegisterTask> accountRegisterTaskList = new List<AccountRegisterTask>();
            DateTime dt = DateTime.Now;
            int year = dt.Year;

            using (Entities db = new Entities())
            {
                //获取所有的类型
                // IQueryable<base_zds> typeiqueryable = db.base_zds.Where(m => m.zd_type == "type_task");


                var result = from tzclass in db.tz_taskclasses.Where(t => t.status == 1 && t.sszd == unitID)
                             from zd in db.base_zds.Where(t => t.zd_type == "type_task")
                             where zd.zd_id == tzclass.classid && tzclass.sszd == unitID
                             select new
                             {
                                 id = tzclass.classid,
                                 name = zd.zd_name
                             };


                var typeiqueryable = result.ToList().GroupBy(x => new
                  {
                      x.id,
                      x.name
                  }).Select(g => new
                  {
                      id = g.Key.id,
                      name = g.Key.name
                  }).OrderBy(t => t.id).ToList();



                var typeList = typeiqueryable.ToList();

                foreach (var item in typeList)
                {
                    AccountRegisterTask accountRegisterTask = new AccountRegisterTask();

                    //专题
                    accountRegisterTask.special = item.name;
                    accountRegisterTask.name = item.name;
                    accountRegisterTask.text = item.name;
                    accountRegisterTask.seq = Convert.ToInt32(item.id);
                    accountRegisterTask.leaf = false;

                    //专题ID
                    accountRegisterTask.id = item.id;
                    accountRegisterTask.children = new List<AccountRegisterTaskChild>();

                    //获取当前专题下的台账记录获取
                    IQueryable<tz_registers> registers = db.tz_registers.Where(m => m.taskclassid == item.id);

                    //如果是超级管理员
                    //if (unitID != null)
                    //{
                    //    registers = registers.Where(m => m.unitid == unitID.Value);
                    //}

                    for (int i = 1; i < 13; i++)
                    {
                        //List<tz_registers> registersList = new List<tz_registers>();
                        string date = year + "/" + i;
                        int count = registers.Where(m => m.registertime.Year == year && m.registertime.Month == i).Count();

                        if (count > 0)
                        {
                            AccountRegisterTaskChild accountRegisterTaskChild = new AccountRegisterTaskChild();
                            accountRegisterTaskChild.id = DateTime.Now.Millisecond;
                            accountRegisterTaskChild.year = year;
                            accountRegisterTaskChild.month = i;
                            accountRegisterTaskChild.monthstring = i + "月";
                            accountRegisterTaskChild.name = i + "月";
                            accountRegisterTaskChild.text = i + "月";
                            accountRegisterTaskChild.seq = i;
                            accountRegisterTaskChild.phaseid = accountRegisterTask.seq;
                            accountRegisterTaskChild.leaf = true;
                            //accountRegisterTask.leaf = false;
                            accountRegisterTask.children.Add(accountRegisterTaskChild);
                        }
                    }
                    accountRegisterTaskList.Add(accountRegisterTask);
                }

            }
            return accountRegisterTaskList;
        }




        /// <summary>
        /// 根据登记ID判断图片
        /// </summary>
        /// <param name="registerid"></param>
        /// <param name="isphoto"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetTaskFilesByRegisterid(int registerid)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> iqueryable = from file in db.tz_files
                                                         where file.sourceid == registerid && file.filesource == 2
                                                         select new FileUploadClass()
                                                         {
                                                             OriginalName = file.filename,
                                                             OriginalPath = file.filepath,
                                                             OriginalType = file.filetype,
                                                             size = file.filesize
                                                         };
                list = iqueryable.ToList();
            }
            return list;
        }

        /// <summary>
        /// 获取执法事件图片
        /// </summary>
        /// <param name="ZFSJID">执法事件ID</param>
        /// <param name="WFDID">环节ID</param>
        /// <returns></returns>
        public List<FileUploadClass> GetCitizenServicesAttr(string citizenid)
        {
            Entities db = new Entities();

            IEnumerable<Attachment> list = null;
            List<FileUploadClass> lists = new List<FileUploadClass>();

            string sql = string.Format(@"select wff.filesize,wff.FILEPATH,wff.FILEID,wff.FILENAME,wff.FILETYPE,wfsa.WFDID
from   WF_WORKFLOWSPECIFICS wfs 
left join WF_WORKFLOWSPECIFICACTIVITYS wfsa on wfs.WFSID=wfsa.WFSID
left join WF_WORKFLOWSPECIFICUSERS wfu on wfu.WFSAID=wfsa.WFSAID
left join WF_WORKFLOWSPECIFICUSERFILES wff on wff.WFSUID=wfu.WFSUID
where wfs.TABLENAMEID='{0}'  and wff.FILEID is not null ", citizenid);
            list = db.Database.SqlQuery<Attachment>(sql);

            foreach (var Modelitem in list.ToList())
            {
                FileUploadClass fileUploadClass = new FileUploadClass();
                fileUploadClass.OriginalName = Modelitem.FILENAME;
                fileUploadClass.OriginalPath = Modelitem.FILEPATH;
                fileUploadClass.OriginalType = Modelitem.FILETYPE;
                fileUploadClass.size = Modelitem.size;
                lists.Add(fileUploadClass);
            }

            return lists;
        }

        /// <summary>
        /// 根据当年时间获取登记过的台帐任务
        /// </summary>
        /// <returns></returns>
        public List<base_zds> GetTaskClassNowYear()
        {
            DateTime dt = DateTime.Now;
            using (Entities db = new Entities())
            {
                var iqueryable = from tz in db.tz_taskclasses.Where(t => t.status == 1)
                                 from zd in db.base_zds.Where(t => t.zd_type == "type_task")
                                 where tz.classid == zd.zd_id && tz.tasktime.Value.Year == dt.Year
                                 select new
                                       {
                                           zd_id = tz.classid,
                                           zd_name = zd.zd_name,
                                       };
                List<base_zds> list = iqueryable.ToList().GroupBy(x => new
                  {
                      x.zd_id,
                      x.zd_name
                  }).Select(g => new base_zds
                  {
                      zd_id = g.Key.zd_id,
                      zd_name = g.Key.zd_name
                  }).OrderBy(t => t.zd_id).ToList();
                return list;
            }

        }
    }
}
