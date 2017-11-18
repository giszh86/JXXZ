using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.LawEnforcementSupervisionDAL
{
   public  class Zfdx_DevicesDAL
    {
       /// <summary>
       /// 设备新增
       /// </summary>
       /// <param name="model"></param>
       /// <returns></returns>
       public int AddStocks(Zfdx_DevicesModel model) {
          using(Entities db=new Entities()){
              zfdx_devices newmodel = new zfdx_devices();
              newmodel.deviceid = model.deviceid;
              newmodel.devicename = model.devicename;
              newmodel.brand = model.brand;
              newmodel.model = model.model;
              newmodel.jldw = model.jldw;
              newmodel.devicetype = model.devicetype;
              newmodel.remark = model.remark;
              newmodel.createuserid = model.createuserid;
              newmodel.createtime = model.createtime;
              newmodel.updatetime =DateTime.Now;
              db.zfdx_devices.Add(newmodel);
              db.SaveChanges();
              return newmodel.deviceid;
          }
       }
       /// <summary>
       /// 设备列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public List<Zfdx_DevicesModel> GetStocksList(List<Filter> filters, int start, int limit)
       {
           List<Zfdx_DevicesModel> list = new List<Zfdx_DevicesModel>();
           using(Entities db=new Entities()){
               string sql = string.Format(@"select zf.deviceid,zf.devicename,zf.brand,zf.model,zf.updatetime,zf.devicetype,zs.devicesum,zs.stocknum,bz.zd_name
                                            from zfdx_devices zf
                                            left join zfdx_stocks zs on zf.deviceid=zs.deviceid
                                            left join base_zds bz on zf.devicetype=bz.zd_id and bz.zd_type='type_sbgl_sblb'
                                          ");
               IEnumerable<Zfdx_DevicesModel> queryable = db.Database.SqlQuery<Zfdx_DevicesModel>(sql);
               if (filters != null && filters.Count > 0)
               {
                   foreach (Filter filter in filters)
                   {
                       string value = filter.value;
                       switch (filter.property)
                       {
                           case "devicename":
                               if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.devicename.Contains(value));
                                }
                                break;
                           case "devicetype":
                               if (!string.IsNullOrEmpty(value)) {
                                   queryable = queryable.Where(t => t.devicetype==value);
                               }
                               break;
                       }
                   }
               }
               list = queryable.OrderByDescending(a => a.deviceid).Skip(start).Take(limit).ToList();
           }
           return list;
       }
       /// <summary>
       /// 设备数量
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public int GetStocksCount(List<Filter> filters)
       {
           using (Entities db = new Entities())
           {
               string sql = string.Format(@"select zf.deviceid,zf.devicename,zf.brand,zf.model,zf.updatetime,zf.devicetype,zs.devicesum,zs.stocknum,bz.zd_name
                                            from zfdx_devices zf
                                            left join zfdx_stocks zs on zf.deviceid=zs.deviceid
                                            left join base_zds bz on zf.devicetype=bz.zd_id and bz.zd_type='type_sbgl_sblb'
                                          ");
               IEnumerable<Zfdx_DevicesModel> queryable = db.Database.SqlQuery<Zfdx_DevicesModel>(sql);
               if (filters != null && filters.Count > 0)
               {
                   foreach (Filter filter in filters)
                   {
                       string value = filter.value;
                       switch (filter.property)
                       {
                           case "devicename":
                               if (!string.IsNullOrEmpty(value))
                               {
                                   queryable = queryable.Where(t => t.devicename.Contains(value));
                               }
                               break;
                           case "devicetype":
                               if (!string.IsNullOrEmpty(value))
                               {
                                   queryable = queryable.Where(t => t.devicetype == value);
                               }
                               break;
                       }
                   }
               }
               return queryable.Count();
           }
       }
       /// <summary>
       /// 获取设备详情
       /// </summary>
       /// <param name="deviceid"></param>
       /// <returns></returns>
       public Zfdx_DevicesModel GetDevicesModel(int deviceid) {
        using(Entities db=new Entities()){
            IQueryable<Zfdx_DevicesModel> queryable = from a in db.zfdx_devices
                                                      join b_json in db.zfdx_stocks on a.deviceid equals b_json.deviceid into bTem
                                                      from b in bTem.DefaultIfEmpty()
                                                      where a.deviceid==deviceid
                                                      join c_json in db.base_zds on a.devicetype equals c_json.zd_id into cTem
                                                      from c in cTem.DefaultIfEmpty()
                                                      where c.zd_type == "type_sbgl_sblb"
                                                      select new Zfdx_DevicesModel 
                                                      {
                                                      devicetypename = c == null ? "" : c.zd_name,
                                                      deviceid = a.deviceid,
                                                      devicename=a.devicename,
                                                      brand=a.brand,
                                                      model=a.model,
                                                      jldw=a.jldw,
                                                      devicetype=a.devicetype,
                                                      devicesum = b.devicesum,
                                                      stocknum = b.stocknum,
                                                      remark=a.remark
                                                      };
            return queryable.FirstOrDefault();
        }
       }
       /// <summary>
       /// 修改设备
       /// </summary>
       /// <param name="model"></param>
       /// <returns></returns>
       public int EditStocks(Zfdx_DevicesModel model)
       {
       using(Entities db=new Entities()){
           zfdx_devices newmodel = db.zfdx_devices.FirstOrDefault(a=>a.deviceid==model.deviceid);
           if(newmodel!=null){
               newmodel.deviceid = model.deviceid;
           newmodel.devicename = model.devicename;
           newmodel.brand = model.brand;
           newmodel.model = model.model;
           newmodel.jldw = model.jldw;
           newmodel.devicetype = model.devicetype;
           newmodel.remark = model.remark;
           newmodel.createuserid = model.createuserid;
           newmodel.createtime = model.createtime;
           newmodel.updatetime = DateTime.Now;
           }
           return    db.SaveChanges();
       }
       }

       #region 报表导出
       public List<Zfdx_DevicesModel> GetDevicesListExcel(List<Filter> filters = null)
       {
           List<Zfdx_DevicesModel> list = new List<Zfdx_DevicesModel>();
           using (Entities db = new Entities())
           {
               string sql = string.Format(@"select zf.deviceid,zf.devicename,zf.brand,zf.model,zf.updatetime,zf.devicetype,zs.devicesum,zs.stocknum,bz.zd_name
                                            from zfdx_devices zf
                                            left join zfdx_stocks zs on zf.deviceid=zs.deviceid
                                            left join base_zds bz on zf.devicetype=bz.zd_id and bz.zd_type='type_sbgl_sblb'
                                          ");
               IEnumerable<Zfdx_DevicesModel> queryable = db.Database.SqlQuery<Zfdx_DevicesModel>(sql);
               if (filters != null && filters.Count > 0)
               {
                   foreach (Filter filter in filters)
                   {
                       string value = filter.value;
                       switch (filter.property)
                       {
                           case "devicename":
                               if (!string.IsNullOrEmpty(value))
                               {
                                   queryable = queryable.Where(t => t.devicename.Contains(value));
                               }
                               break;
                           case "devicetype":
                               if (!string.IsNullOrEmpty(value))
                               {
                                   queryable = queryable.Where(t => t.devicetype == value);
                               }
                               break;
                       }
                   }
               }
               list = queryable.OrderByDescending(a => a.deviceid).ToList();
           }
           return list;
       }
        #endregion
    }
}
