using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.monitorProjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.monitorProjectDAL
{
    /// <summary>
    /// 视频监控管理
    /// </summary>
    public class monitorProjectDAL
    {
        #region 获取专题监控树列表
        public List<TreeMonitorModel> GetMonitoreTreeList()
        {
            using (Entities db = new Entities())
            {
                string rootsql = string.Format(@"select fi.unitname as text,fi.unitname as parentname,fi.* from fi_specialunits  fi where fi.parentid=0 order by fi.seq; ");
                List<TreeMonitorModel> treelist = db.Database.SqlQuery<TreeMonitorModel>(rootsql).ToList();
                int? rootid = 0;
                string childsql = "";
                TreeMonitorModel root = new TreeMonitorModel();
                string rosql = @"select fi.unitname as text,fi.unitname as parentname,fi.* from fi_specialunits fi where fi.parentid is null";
                List<TreeMonitorModel> rootList = db.Database.SqlQuery<TreeMonitorModel>(rosql).ToList();
                for (int i = 0; i < treelist.Count; i++)
                {
                    TreeMonitorModel model = treelist[i];
                    if (model != null)
                    {
                        rootid = model.seq;
                        childsql = string.Format(@"select fi.unitname as text ,fi.* from fi_specialunits fi where fi.parentid!=0 and fi.parentid={0} order by fi.parentid;", rootid);
                        List<TreeMonitorModel> childList = db.Database.SqlQuery<TreeMonitorModel>(childsql).ToList();
                        foreach (TreeMonitorModel item in childList)
                        {
                            item.children = new List<TreeMonitorModel>();
                            item.leaf = true;
                            item.parentname = model.parentname;
                        }
                        model.children = childList;
                        model.expanded = true;
                        model.leaf = false;
                        if (childList.Count == 0)
                        {
                            model.leaf = true;
                        }
                    }
                }
                if (rootList.Count > 0)
                {
                    rootList[0].leaf = treelist.Count > 0 ? false : true ;
                    rootList[0].expanded = true;
                    rootList[0].children = treelist;
                }
                return rootList;
            }
        }

        //获取监控专题子节点
        public List<TreeMonitorModel> GetMonitoreTreeChildList()
        {
            List<TreeMonitorModel> list = new List<TreeMonitorModel>();
            return list;
        }
        #endregion

        #region 获取专题table列表
        public Pag<MonitorListModel> GetMonitorTableList(List<Filter> filters, int start, int limit,int unitid,string path)
        {
            using (Entities db = new Entities())
            {
                string sql = @"SELECT spe.unitid,
    unit.unitname,
    cam.cameraid,
	cam.cameraname,
	camt.cameratypename,
    cam.cameratypeid,
	spe.seq,
  unit.path,
unit.parentid
FROM
	fi_specialcameras spe
left JOIN fi_specialunits unit on spe.unitid=unit.unitid
LEFT JOIN fi_cameras cam ON spe.cameraid = cam.cameraid
LEFT JOIN fi_cameratypes camt ON cam.cameratypeid = camt.cameratypeid";
                
                string[] pathlist = path.Split('/');
                if (pathlist.Length == 3)
                {
                    if (pathlist[1] == "0")
                    {
                        sql += " where 1=1";
                    }
                    else
                    {
                        sql += " where unit.parentid=" + pathlist[1];
                    }
                    
                }
                else if (unitid != 0)
                {
                    sql += " where spe.unitid=" + unitid;
                }
                else
                {
                    sql += "  where 1=1";
                }
                IEnumerable<MonitorListModel> queryable = db.Database.SqlQuery<MonitorListModel>(sql);
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                    }
                }
                IOrderedEnumerable<MonitorListModel> temp = queryable.OrderByDescending(a => a.seq);
                Pag<MonitorListModel> rst = PagHelper.CreatPagList(temp, start, limit);
                return rst;
            }
        }
        #endregion

        #region 新增监控专题
        public int AddMonitorPro(TreeMonitorModel model)
        {
            using (Entities db = new Entities())
            {
                fi_specialunits units = new fi_specialunits();
                units.parentid = model.parentid;
                units.unitname = model.unitname;
                units.path = model.path;
                units.seq = model.seq;
                db.fi_specialunits.Add(units);
                return db.SaveChanges();
            }
        }
        #endregion

        #region 修改监控专题
        public int EditMonitorePro(TreeMonitorModel model)
        {
            using (Entities db = new Entities())
            {
                fi_specialunits units = db.fi_specialunits.FirstOrDefault(t => t.unitid == model.unitid);
                units.unitname = model.unitname;
                return db.SaveChanges();
            }
        }
        #endregion

        #region 删除监控专题
        public int DeleteMonitorPro(int unitid)
        {
            using (Entities db = new Entities())
            {
                fi_specialunits unit = db.fi_specialunits.FirstOrDefault(t => t.unitid == unitid);
                fi_specialcameras cam = db.fi_specialcameras.FirstOrDefault(t => t.unitid == unitid);
                if (unit != null && cam == null)
                {
                    db.fi_specialunits.Remove(unit);
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 查看监控专题详情
        public TreeMonitorModel GetMonitorDetail(int unitid)
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select f.*,f2.unitname as parentname from fi_specialunits f,fi_specialunits f2 where f.unitid={0} and CONCAT('/',f.parentid,'/')=f2.path", unitid);
                TreeMonitorModel model = db.Database.SqlQuery<TreeMonitorModel>(sql).FirstOrDefault();
                return model;
            }
        }
        #endregion

        #region 查看监控专题元素
        public MonitorListModel GetGridItem(int unitid, string cameraid) 
        {
            using (Entities db = new Entities())
            {
                string sql = string.Format(@"select * from fi_specialcameras f where f.unitid={0} and f.cameraid='{1}'", unitid, cameraid);
                MonitorListModel model = db.Database.SqlQuery<MonitorListModel>(sql).FirstOrDefault();
                return model;
            }
        }
        #endregion

        #region 添加监控专题元素
        public int AddMonitorItem(MonitorListModel model)
        {
            using (Entities db = new Entities())
            {
                if (model.cameraid.Length > 0)
                {
                    string[] cameras=model.cameraid.Split(',');
                    for (int i = 0; i < cameras.Length - 1; i++)
                    {
                        string strCam = cameras[i];
                        fi_specialcameras cam = db.fi_specialcameras.FirstOrDefault(t => t.cameraid == strCam && t.unitid == model.unitid);
                        if (cam == null)
                        {
                            fi_specialcameras item = new fi_specialcameras();
                            item.cameraid = cameras[i];
                            //item.seq = model.seq;
                            item.unitid = model.unitid;
                            db.fi_specialcameras.Add(item);
                        }
                    }
                }
                return db.SaveChanges();
            }
        }
        #endregion

        #region 修改监控专题元素
        public int EditMonitorItem(MonitorListModel model)
        {
            using (Entities db = new Entities())
            {
                fi_specialcameras item = db.fi_specialcameras.FirstOrDefault(t => t.unitid == model.unitid && t.cameraid == model.cameraid);
                if (item != null)
                {
                    item.cameraid = model.cameraid;
                    item.seq = model.seq;
                    item.unitid = model.unitid;
                    return db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        #region 删除监控专题元素
        public int DeleteMonitorItem(int unitid, string cameraid)
        {
            using (Entities db = new Entities())
            {
                fi_specialcameras model = db.fi_specialcameras.SingleOrDefault(a => a.unitid == unitid && a.cameraid==cameraid);
                if (model != null)
                {
                    db.fi_specialcameras.Remove(model);
                }
                return db.SaveChanges();
            }
        }
        #endregion

        #region 获取监控类型
        
        #endregion

        #region 获取监控树
        public List<TreeMonitorModel> GetCamerasTree(int unitid)
        {
            List<TreeMonitorModel> list = new List<TreeMonitorModel>();
            return list;
        }
        #endregion
    }
}
