using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AccountModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.AccountDAL
{
    public class TZ_AccountTaskDAL
    {
        public List<AccountTaskModel> GetTZTaskList(List<Filter> filters, int start, int limit)
        {
            List<AccountTaskModel> list = new List<AccountTaskModel>();
            using (Entities db = new Entities())
            {
                IQueryable<AccountTaskModel> iquerable = from tz in db.tz_tztasks
                                                         from u in db.base_users
                                                         where tz.createuserid == u.id
                                                         select new AccountTaskModel()
                                                         {
                                                             createtime = tz.createtime,
                                                             createuserid = tz.createuserid,
                                                             createusername = u.loginname,
                                                             endtime = tz.endtime,
                                                             remark = tz.remark,
                                                             starttime = tz.starttime,
                                                             taskid = tz.taskid,
                                                             taskname = tz.taskname,
                                                             taskyear = tz.taskyear,
                                                             tz_json = tz.tz_json,
                                                             tz_type = tz.tz_type,
                                                             sszd = tz.sszd,
                                                             ssrw = tz.ssrw
                                                         };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "taskname":
                                if (!string.IsNullOrEmpty(value))
                                    iquerable = iquerable.Where(t => t.taskname.Contains(value));
                                break;
                            case "taskyear":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int val = Convert.ToInt32(value);
                                    iquerable = iquerable.Where(t => t.taskyear == val);
                                }
                                break;
                            case "tz_type":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int val = Convert.ToInt32(value);
                                    iquerable = iquerable.Where(t => t.tz_type == val);
                                }
                                break;
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime val = DateTime.Parse(value);
                                    iquerable = iquerable.Where(t => t.starttime >= val);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime val = DateTime.Parse(value);
                                    iquerable = iquerable.Where(t => t.endtime <= val);
                                }
                                break;
                        }
                    }
                }
                list = iquerable.OrderByDescending(a => a.createtime).Skip(start).Take(limit).ToList();
            }
            return list;
        }

        /// <summary>
        /// 获取个数
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public int GetTZTaskCount(List<Filter> filters)
        {
            List<tz_tztasks> list = new List<tz_tztasks>();
            using (Entities db = new Entities())
            {
                IQueryable<tz_tztasks> iquerable = from tz in db.tz_tztasks
                                                   from u in db.base_users
                                                   where tz.createuserid == u.id
                                                   select tz;
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "taskname":
                                if (!string.IsNullOrEmpty(value))
                                    iquerable = iquerable.Where(t => t.taskname.Contains(value));
                                break;
                            case "taskyear":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int val = Convert.ToInt32(value);
                                    iquerable = iquerable.Where(t => t.taskyear == val);
                                }
                                break;
                            case "tz_type":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int val = Convert.ToInt32(value);
                                    iquerable = iquerable.Where(t => t.tz_type == val);
                                }
                                break;
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime val = DateTime.Parse(value);
                                    iquerable = iquerable.Where(t => t.starttime >= val);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime val = DateTime.Parse(value);
                                    iquerable = iquerable.Where(t => t.endtime <= val);
                                }
                                break;
                        }
                    }
                }
                list = iquerable.ToList();
            }
            return list.Count();
        }

        /// <summary>
        /// 添加台帐任务
        /// </summary>
        /// <param name="tztask"></param>
        /// <returns></returns>
        public int AddAccountTask(AccountTaskModel tztask, List<FileUploadClass> list, List<tz_taskclasses> list_tzclass)
        {
            using (Entities db = new Entities())
            {
                tz_tztasks model = new tz_tztasks();
                model.createtime = tztask.createtime;
                model.createuserid = tztask.createuserid;
                model.endtime = tztask.endtime;
                model.remark = tztask.remark;
                model.starttime = tztask.starttime;
                model.taskname = tztask.taskname;
                model.taskyear = tztask.taskyear;
                model.tz_type = tztask.tz_type;
                model.tz_json = tztask.tz_json;
                model.sszd = tztask.sszd;
                model.ssrw = tztask.ssrw;
                db.tz_tztasks.Add(model);
                db.SaveChanges();

                foreach (var item in list_tzclass)
                {
                    tz_taskclasses tz = new tz_taskclasses();
                    tz.classid = item.classid;
                    tz.sszd = item.sszd;
                    tz.status = item.status;
                    tz.tasktime = item.tasktime;
                    tz.taskid = model.taskid;
                    db.tz_taskclasses.Add(tz);
                }

                foreach (var item in list)
                {
                    tz_files file = new tz_files();
                    file.filename = item.OriginalName;
                    file.filepath = item.OriginalPath;
                    file.filetype = item.OriginalType;
                    file.filesource = 1;
                    file.sourceid = model.taskid;
                    file.filesize = item.size;
                    db.tz_files.Add(file);
                }

                db.SaveChanges();
                return 1;
            }
        }

        /// <summary>
        /// 编辑台帐
        /// </summary>
        /// <param name="tztask"></param>
        /// <returns></returns>
        public int EditAccountTask(AccountTaskModel tztask, List<FileUploadClass> list)
        {
            using (Entities db = new Entities())
            {
                int count = 0;
                tz_tztasks model = db.tz_tztasks.Where(t => t.taskid == tztask.taskid).FirstOrDefault();
                if (model != null)
                {
                    model.endtime = tztask.endtime;
                    model.remark = tztask.remark;
                    model.starttime = tztask.starttime;
                    model.taskname = tztask.taskname;
                    model.taskyear = tztask.taskyear;
                    model.tz_type = tztask.tz_type;
                    // model.tz_json = tztask.tz_json;
                    // model.sszd = tztask.sszd;

                    //  IQueryable<tz_taskclasses> iqueryable = db.tz_taskclasses.Where(t => t.taskid == tztask.taskid);
                    //foreach (tz_taskclasses item in iqueryable)
                    //{
                    //    db.tz_taskclasses.Remove(item);
                    //}

                    //foreach (var item in list_tzclass)
                    //{
                    //    tz_taskclasses tz = new tz_taskclasses();
                    //    tz.classid = item.classid;
                    //    tz.sszd = item.sszd;
                    //    tz.status = item.status;
                    //    tz.tasktime = item.tasktime;
                    //    tz.taskid = model.taskid;
                    //    db.tz_taskclasses.Add(tz);
                    //}
                    foreach (var item in list)
                    {
                        tz_files file = new tz_files();
                        file.filename = item.OriginalName;
                        file.filepath = item.OriginalPath;
                        file.filetype = item.OriginalType;
                        file.filesource = 1;
                        file.sourceid = tztask.taskid;
                        file.filesize = item.size;
                        db.tz_files.Add(file);
                    }
                    count = db.SaveChanges();
                }
                return count;
            }

        }

        /// <summary>
        /// 根据台帐任务号获取台帐任务类型
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        public List<TaskClassModel> GetTaskClassByTaskID(int TaskID)
        {
            List<TaskClassModel> list = new List<TaskClassModel>();
            using (Entities db = new Entities())
            {
                IQueryable<TaskClassModel> iqueryable = from tz in db.tz_taskclasses
                                                        where tz.taskid == TaskID
                                                        select new TaskClassModel()
                                                        {
                                                            classid = tz.classid,
                                                            taskclassid = tz.taskclassid,
                                                            taskid = tz.taskid
                                                        };
                list = iqueryable.Distinct().OrderBy(a => a.classid).ToList();
            }
            return list;
        }

        /// <summary>
        /// 根据任务号获取中队
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        public List<TaskClassModel> GetTaskZDByTaskID(int TaskID)
        {
            List<TaskClassModel> list = new List<TaskClassModel>();
            using (Entities db = new Entities())
            {
                IQueryable<TaskClassModel> iqueryable = from tz in db.tz_taskclasses
                                                        where tz.taskid == TaskID
                                                        select new TaskClassModel()
                                                        {
                                                            sszd = tz.sszd,
                                                            taskclassid = tz.taskclassid,
                                                            taskid = tz.taskid
                                                        };
                list = iqueryable.ToList().GroupBy(x => new
                {
                    x.sszd
                }).Select(g => new TaskClassModel
                {
                    sszd = g.Key.sszd
                }).OrderBy(t => t.sszd).ToList();
            }
            return list;
        }

        /// <summary>
        /// 根据任务ID获取附件
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        public List<FileUploadClass> GetTaskFilesByTaskID(int TaskID)
        {
            List<FileUploadClass> list = new List<FileUploadClass>();
            using (Entities db = new Entities())
            {
                IQueryable<FileUploadClass> iqueryable = from file in db.tz_files
                                                         where file.sourceid == TaskID
                                                         && file.filesource == 1
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
        /// 获取任务中队(初始化)
        /// </summary>
        /// <returns></returns>
        public List<AccountUnitModel> GetAccountUnit()
        {
            using (Entities db = new Entities())
            {
                string str = string.Format(@"select zd_name,0 as 'jdzd',0 as 'xczd',0 as 'gzzd',0 as 'wdzd',0 as 'hhzd',0 as 'xczdT',0 as 'wjjzd',0 as 'ycgzd' 
from base_zds where zd_type='type_task'");
                IEnumerable<AccountUnitModel> list = db.Database.SqlQuery<AccountUnitModel>(str);
                return list.ToList();
            }
        }

    }
}
