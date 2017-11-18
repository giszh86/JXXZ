using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.MonitorModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.MonitorDAL
{
    public class FI_CamerasDAL
    {
        public List<FI_CameraUnitsTreeModel> GetCameras(string uintid, List<Filter> filters)
        {
            List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();
            using (Entities db = new Entities())
            {
                IQueryable<FI_CameraUnitsTreeModel> queryable =
                     from b in db.fi_cameras
                     orderby b.seq descending
                     where b.unitid == uintid
                     select new FI_CameraUnitsTreeModel()
                     {
                         cameraid = b.cameraid,
                         parentid = b.unitid,
                         text = b.cameraname,
                         x84 = b.x84,
                         y84 = b.y84,
                         logintype = b.logintype,
                         leaf = true
                     };
                list = queryable.ToList();
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.text.Contains(value));
                                    list = queryable.ToList();
                                }
                                break;
                        };
                    }
                }
                return list;
            }
        }

        public FI_CamerasModel GetUnitsDetails(string cameraid)
        {

            using (Entities db = new Entities())
            {
                IQueryable<FI_CamerasModel> queryable =
                     from a in db.fi_cameras
                     join b_join in db.fi_camera_units on a.unitid equals b_join.unitid into bTemp
                     from b in bTemp.DefaultIfEmpty()
                     join c_join in db.fi_cameratypes on a.cameratypeid equals c_join.cameratypeid into cTemp
                     from c in cTemp.DefaultIfEmpty()
                     orderby a.seq descending
                     where a.cameraid == cameraid
                     select new FI_CamerasModel()
                     {
                         cameraid = a.cameraid,
                         unitid = a.unitid,
                         cameratypeid = a.cameratypeid,
                         cameraname = a.cameraname,
                         parameter = a.parameter,
                         isonline = a.isonline,
                         x84 = a.x84,
                         y84 = a.y84,
                         x2000 = a.x2000,
                         y2000 = a.y2000,
                         seq = a.seq,
                         unitname = b.unitname,
                         parentid = b.parentid,
                         path = b.path,
                         cameratypename = c.cameratypename
                     };
                return queryable.First();
            }

        }

        /// <summary>
        /// 根据监控ID获取监控
        /// </summary>
        /// <param name="cameraid"></param>
        /// <returns></returns>
        public fi_cameras GetCameraDetails(string cameraid)
        {
            using (Entities db = new Entities())
            {
                return db.fi_cameras.FirstOrDefault(t => t.cameraid == cameraid);
            }
        }
    }
}
