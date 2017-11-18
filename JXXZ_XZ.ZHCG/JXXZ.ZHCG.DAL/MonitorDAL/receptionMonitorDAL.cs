using JXXZ.ZHCG.Model.MonitorModel;
using JXXZ.ZHCG.Model.monitorProjectModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.MonitorDAL
{
    public class receptionMonitorDAL
    {
        public List<int> GetVideoCount()
        {
            List<int> list = new List<int>();
            using (Entities db = new Entities())
            {
                //自建视频
                int zjsp = db.fi_cameras.Count(a => a.logintype == 2);
                list.Add(zjsp);

                //车载视频
                int czsp = 0;
                list.Add(czsp);

                //公安视频
                int gasp = 0;
                list.Add(gasp);

                //高空视频
                int gksp = db.fi_cameras.Count(a => a.logintype == 1);

                list.Add(gksp);
                //移动视频
                int ydsp = 10;
                list.Add(ydsp);
                //无人机
                int wrj = 1;
                list.Add(wrj);
                //单兵
                int ddb = 40;
                list.Add(ddb);
            }
            return list;
        }

        public List<int> GetSpzsCount()
        {
            List<int> list = new List<int>();
            using (Entities db = new Entities())
            {
                //固定
                int gd = 160;
                list.Add(gd);
                //移动
                int yd = 10;
                list.Add(yd);
            }
            return list;
        }

        public List<int> GetXcjdCount()
        {
            List<int> list = new List<int>();
            using (Entities db = new Entities())
            {
                //固定
                int gd = 75;
                list.Add(gd);
                //移动
                int yd = 5;
                list.Add(yd);
            }
            return list;
        }

        public List<int> GetGzjdCount()
        {
            List<int> list = new List<int>();
            using (Entities db = new Entities())
            {
                //固定
                int gd = 9;
                list.Add(gd);
                //移动
                int yd = 15;
                list.Add(yd);
            }
            return list;
        }

        public List<int> GetZtslCount()
        {
            List<string> strlist = new List<string>();
            List<int> intlist = new List<int>();
            using (Entities db = new Entities())
            {
                string rootsql = string.Format(@"select fi.unitname as text,fi.unitid,fi.path,fi.seq as id ,fi.parentid 
from fi_specialunits  fi where fi.parentid=0 order by fi.seq ");
                List<FI_CameraUnitsTreeModel> treelist = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(rootsql).Skip(0).Take(6).ToList();
                string rootid = "0";
                for (int i = 0; i < treelist.Count; i++)
                {
                    int num = 0;
                    FI_CameraUnitsTreeModel model = treelist[i];
                    if (model != null)
                    {
                        rootid = model.id;
                        string childsql = string.Format(@"select fi.unitname as text,fi.unitid,fi.path,fi.seq as id ,fi.parentid  from fi_specialunits fi where fi.parentid!=0 and fi.parentid={0} order by fi.parentid", rootid);
                        List<FI_CameraUnitsTreeModel> childList = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(childsql).ToList();
                        foreach (FI_CameraUnitsTreeModel item in childList)
                        {
                            num = num + GetMonitoreTreeChildList(item.unitid).Count();
                        }
                        strlist.Add(treelist[i].text);
                        intlist.Add(num);

                    }
                }
            }
            string str = JsonConvert.SerializeObject(strlist).ToString() + "|" + JsonConvert.SerializeObject(intlist).ToString();
            return intlist;
        }



        #region 获取专题监控树列表
        public List<FI_CameraUnitsTreeModel> GetMonitoreTreeList()
        {
            using (Entities db = new Entities())
            {
                string rootsql = string.Format(@"select fi.unitname as text,fi.unitid,fi.path,fi.seq as id ,fi.parentid 
from fi_specialunits  fi where fi.parentid=0 order by fi.seq ");
                List<FI_CameraUnitsTreeModel> treelist = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(rootsql).ToList();
                string rootid = "0";
                string childsql = "";
                TreeMonitorModel root = new TreeMonitorModel();
                string rosql = @"select fi.unitname as text,fi.unitid,fi.path,fi.seq as id ,fi.parentid  from fi_specialunits fi where fi.parentid is null";
                List<FI_CameraUnitsTreeModel> rootList = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(rosql).ToList();
                for (int i = 0; i < treelist.Count; i++)
                {
                    FI_CameraUnitsTreeModel model = treelist[i];
                    if (model != null)
                    {
                        rootid = model.id;
                        childsql = string.Format(@"select fi.unitname as text,fi.unitid,fi.path,fi.seq as id ,fi.parentid  from fi_specialunits fi where fi.parentid!=0 and fi.parentid={0} order by fi.parentid", rootid);
                        List<FI_CameraUnitsTreeModel> childList = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(childsql).ToList();
                        foreach (FI_CameraUnitsTreeModel item in childList)
                        {
                            item.nodes = GetMonitoreTreeChildList(item.unitid);
                            item.leaf = true;
                            item.text = item.text;
                        }
                        model.nodes = childList;
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
                    rootList[0].leaf = treelist.Count > 0 ? false : true;
                    rootList[0].expanded = true;
                    rootList[0].nodes = treelist;
                }
                return rootList;
            }
        }

        //获取监控专题子节点
        public List<FI_CameraUnitsTreeModel> GetMonitoreTreeChildList(int unitid)
        {
            List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();

            using (Entities db = new Entities())
            {
                IQueryable<FI_CameraUnitsTreeModel> querybale = from a in db.fi_specialcameras
                                                                join b_join in db.fi_cameras on a.cameraid equals b_join.cameraid into bTmp
                                                                from b in bTmp.DefaultIfEmpty()
                                                                where a.unitid == unitid
                                                                select new FI_CameraUnitsTreeModel
                                                                {
                                                                    text = b.cameraname,
                                                                    cameraid = a.cameraid,
                                                                    x84 = b.x84,
                                                                    y84 = b.y84,
                                                                    logintype = b.logintype
                                                                };
                list = querybale.ToList();
            }
            return list;
        }
        #endregion

        public string GetMonitoreTreeCount()
        {
            List<string> strlist = new List<string>();
            List<int> intlist = new List<int>();
            using (Entities db = new Entities())
            {
                string rootsql = string.Format(@"select fi.unitname as text,fi.unitid,fi.path,fi.seq as id ,fi.parentid 
from fi_specialunits  fi where fi.parentid=0 order by fi.seq ");
                List<FI_CameraUnitsTreeModel> treelist = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(rootsql).Skip(0).Take(6).ToList();
                string rootid = "0";
                for (int i = 0; i < treelist.Count; i++)
                {
                    int num = 0;
                    FI_CameraUnitsTreeModel model = treelist[i];
                    if (model != null)
                    {
                        rootid = model.id;
                        string childsql = string.Format(@"select fi.unitname as text,fi.unitid,fi.path,fi.seq as id ,fi.parentid  from fi_specialunits fi where fi.parentid!=0 and fi.parentid={0} order by fi.parentid", rootid);
                        List<FI_CameraUnitsTreeModel> childList = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(childsql).ToList();
                        foreach (FI_CameraUnitsTreeModel item in childList)
                        {
                            num = num + GetMonitoreTreeChildList(item.unitid).Count();
                        }
                        strlist.Add(treelist[i].text);
                        intlist.Add(num);

                    }
                }
            }
            string str = JsonConvert.SerializeObject(strlist).ToString() + "|" + JsonConvert.SerializeObject(intlist).ToString();
            return str;

        }

    }
}
