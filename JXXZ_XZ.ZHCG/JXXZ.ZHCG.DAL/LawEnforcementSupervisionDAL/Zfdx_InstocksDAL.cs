using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;

namespace JXXZ.ZHCG.DAL.lawenforcementsupervisionDAL
{
    public class Zfdx_InstocksDAL
    {
        /// <summary>
        /// 添加设备入库
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddInstocks(Zfdx_InstocksModel model)
        {
            using(Entities db=new Entities()){
                zfdx_instocks newmodel = new zfdx_instocks();
                newmodel.intstockid = model.intstockid;
                newmodel.storagetype = model.storagetype;
                newmodel.deviceid = model.deviceid;
                newmodel.number = model.number;
                newmodel.price = model.price;
                newmodel.producedate = model.producedate;
                newmodel.unitid = model.unitid;
                newmodel.processuserid = model.processuserid;
                newmodel.shuserid = model.shuserid;
                newmodel.remark = model.remark;
                newmodel.createtime = DateTime.Now;
                newmodel.createuserid = model.createuserid;
                db.zfdx_instocks.Add(newmodel);
                db.SaveChanges();
                return newmodel.intstockid;
            }
        }
        /// <summary>
        /// 设备入库列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<Zfdx_InstocksModel> GetinstockList(List<Filter> filters, int start, int limit,int deviceid) 
        {
            List<Zfdx_InstocksModel> list = new List<Zfdx_InstocksModel>();
            using(Entities db=new Entities()){
                IQueryable<Zfdx_InstocksModel> queryable = from a in db.zfdx_instocks
                                                           where a.deviceid==deviceid
                                                           join b_json in db.zfdx_devices on a.deviceid equals b_json.deviceid into bTem
                                                           from b in bTem.DefaultIfEmpty()
                                                           join c_json in db.base_zds on a.storagetype equals c_json.zd_id into cTem
                                                           from c in cTem.DefaultIfEmpty()
                                                           where c.zd_type == "type_sbgl_sbrk"
                                                           select new Zfdx_InstocksModel
                                                           {
                                                               deviceid=a.deviceid,
                                                               devicename = b.devicename,
                                                               intstockid = a.intstockid,
                                                               storagetypename =c==null?"":c.zd_name,
                                                               number = a.number,
                                                               price = a.price,
                                                               createtime=a.createtime,
                                                               unitid = a.unitid,
                                                               processuserid = a.processuserid,
                                                               shuserid = a.shuserid,
                                                               remark = a.remark,
                                                           };
                if(filters!=null&&filters.Count>0){
                 foreach(Filter filter in filters ){
                 
                 }
                }
                list = queryable.OrderByDescending(a => a.intstockid).Skip(start).Take(limit).ToList();
            }
            return list;
        }
        /// <summary>
        /// 设备入库数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetinstockCount(List<Filter> filters, int deviceid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<Zfdx_InstocksModel> queryable = from a in db.zfdx_instocks
                                                           where a.deviceid == deviceid
                                                           join b_json in db.zfdx_devices on a.deviceid equals b_json.deviceid into bTem
                                                           from b in bTem.DefaultIfEmpty()
                                                           join c_json in db.base_zds on a.storagetype equals c_json.zd_id into cTem
                                                           from c in cTem.DefaultIfEmpty()
                                                           where c.zd_type == "type_sbgl_sbrk"
                                                           select new Zfdx_InstocksModel
                                                           {
                                                               devicename = b.devicename,
                                                               intstockid = a.intstockid,
                                                               storagetypename = c == null ? "" : c.zd_name,
                                                               number = a.number,
                                                               price = a.price,
                                                               createtime = a.createtime,
                                                               unitid = a.unitid,
                                                               processuserid = a.processuserid,
                                                               shuserid = a.shuserid,
                                                               remark = a.remark,
                                                           };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters) {
                        //string value = filter.value;
                        //switch (filter.property)
                        //{
                        //    case "deviceid":
                        //        if (!string.IsNullOrEmpty(value))
                        //        {
                        //            int id = Convert.ToInt32(value);
                        //            queryable = queryable.Where(t => t.deviceid == id);
                        //        }
                        //        break;
                        //}
                    }
                }
                return queryable.Count();
            }
            
        }
    }
}
