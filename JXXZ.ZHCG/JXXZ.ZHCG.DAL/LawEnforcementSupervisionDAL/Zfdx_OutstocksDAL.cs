using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.lawenforcementsupervisionDAL
{
   public class Zfdx_OutstocksDAL
    {
       /// <summary>
       /// 出库设备
       /// </summary>
       /// <param name="model"></param>
       /// <returns></returns>
       public int AddOutstocks(Zfdx_OutstocksModel model) { 
       using(Entities db=new Entities()){
           zfdx_outstocks newmodel = new zfdx_outstocks();
           newmodel.outstockid = model.outstockid;
           newmodel.outtype = model.outtype;
           newmodel.deviceid = model.deviceid;
           newmodel.process = model.process;
           newmodel.number = model.number;
           newmodel.price = model.price;
           newmodel.applyuser = model.applyuser;
           newmodel.receiveunit = model.receiveunit;
           newmodel.unit = model.unit;
           newmodel.shuser = model.shuser;
           newmodel.remark = model.remark;
           newmodel.createuserid = model.createuserid;
           newmodel.createtime = DateTime.Now;
           db.zfdx_outstocks.Add(newmodel);
           db.SaveChanges();
           return newmodel.outstockid;
       }
       }
       /// <summary>
       /// 出库设备列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public List<Zfdx_OutstocksModel> GetOutstocksList(List<Filter> filters, int start, int limit,int deviceid) 
       {
           List<Zfdx_OutstocksModel> list = new List<Zfdx_OutstocksModel>();
           using(Entities db=new Entities()){
               IQueryable<Zfdx_OutstocksModel> queryable = from a in db.zfdx_outstocks
                                                           where a.deviceid==deviceid
                                                           join b_json in db.zfdx_devices on a.deviceid equals b_json.deviceid into bTem
                                                           from b in bTem.DefaultIfEmpty()
                                                           join c_json in db.base_zds on a.outtype equals c_json.zd_id into cTem
                                                           from c in cTem.DefaultIfEmpty()
                                                           where c.zd_type == "type_sbgl_sbck"
                                                           select new Zfdx_OutstocksModel
                                                           {
                                                               deviceid=a.deviceid,
                                                               outstockid=a.outstockid,
                                                               devicename = b.devicename,
                                                               outtypename=c==null?"":c.zd_name,
                                                               number=a.number,
                                                               price=a.price,
                                                               unit=a.unit,
                                                               process=a.process,
                                                               shuser=a.shuser,
                                                               createtime=a.createtime,
                                                               remark=a.remark
                                                           };
           if(filters!=null&&filters.Count>0){
           foreach(Filter filter in filters){}
           

           }
           list = queryable.OrderByDescending(a => a.outstockid).Skip(start).Take(limit).ToList();
           }
           return list;
       }
       /// <summary>
       /// 出库设备数量
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public int GetOutstocksCount(List<Filter> filters, int deviceid)
       {
           using (Entities db = new Entities())
           {
               IQueryable<Zfdx_OutstocksModel> queryable = from a in db.zfdx_outstocks
                                                           where a.deviceid == deviceid
                                                           join b_json in db.zfdx_devices on a.deviceid equals b_json.deviceid into bTem
                                                           from b in bTem.DefaultIfEmpty()
                                                           join c_json in db.base_zds on a.outtype equals c_json.zd_id into cTem
                                                           from c in cTem.DefaultIfEmpty()
                                                           where c.zd_type == "type_sbgl_sbck"
                                                           select new Zfdx_OutstocksModel
                                                           {
                                                               devicename = b.devicename,
                                                               outtypename = c == null ? "" : c.zd_name,
                                                               number = a.number,
                                                               price = a.price,
                                                               unit = a.unit,
                                                               process = a.process,
                                                               shuser = a.shuser,
                                                               createtime = a.createtime,
                                                               remark = a.remark
                                                           };
               if (filters != null && filters.Count > 0)
               {
                   foreach (Filter filter in filters) { }


               }
               return queryable.Count();
           }
           
       }
    }
}
