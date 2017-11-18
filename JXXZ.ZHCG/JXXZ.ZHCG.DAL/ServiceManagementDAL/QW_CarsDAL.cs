using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.ServiceManagementDAL
{
    public class QW_CarsDAL
    {

        /// <summary>
        /// 获取所有车辆(对接)
        /// </summary>
        /// <returns></returns>
        public List<QW_CarsModel> GetCars()
        {
            using (Entities db = new Entities())
            {
                IQueryable<QW_CarsModel> queryable = from a in db.qw_cars
                                                     join b_join in db.qw_zds on a.cartypeid equals b_join.zdid into btmp
                                                     from b in btmp.DefaultIfEmpty()
                                                     where a.status == 0 && a.carstatus == 0
                                                     select new QW_CarsModel
                                                     {
                                                         carid = a.carid,
                                                         cartypeid = a.cartypeid,
                                                         unitid = a.unitid,
                                                         carnumber = a.carnumber,
                                                         cartel = a.cartel,
                                                         cartypename = b.zd_name,
                                                         ssbc = a.ssbc,
                                                         remarks = a.remarks
                                                     };
                return queryable.ToList();
            }
        } 

        public IQueryable<QW_CarsModel> GetCar()
        {
            using (Entities db = new Entities())
            {
                IQueryable<QW_CarsModel> queryable = from a in db.qw_cars
                                                     join b_join in db.qw_zds on a.cartypeid equals b_join.zdid into btmp
                                                     from b in btmp.DefaultIfEmpty()
                                                     where a.status == 0 && a.carstatus == 0
                                                     select new QW_CarsModel
                                                     {
                                                         carid = a.carid,
                                                         cartypeid = a.cartypeid,
                                                         unitid = a.unitid,
                                                         carnumber = a.carnumber,
                                                         cartel = a.cartel,
                                                         cartypename = b.zd_name,
                                                         ssbc = a.ssbc
                                                     };
                return queryable;
            }
        }

        /// <summary>
        /// 根据部门获取车辆
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public List<QW_CarsModel> GetCarsUnitList(int unitid)
        {
            using (Entities db = new Entities())
            {
                List<QW_CarsModel> list = (from a in db.qw_cars
                                           where a.unitid == unitid && a.status == 0 && a.carstatus == 0
                                           select new QW_CarsModel
                                           {
                                               carid = a.carid,
                                               cartypeid = a.cartypeid,
                                               unitid = a.unitid,
                                               carnumber = a.carnumber,
                                               cartel = a.cartel,
                                               ssbc = a.ssbc
                                           }).ToList();

                return list;
            }

        }

        /// <summary>
        /// 根据班次获取车辆
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public List<QW_CarsModel> GetCarsSsbcList(int ssbc)
        {
            List<QW_CarsModel> list = GetCar().Where(a => a.ssbc == ssbc).ToList();
            return list;

        }

        public List<qw_cartasks> GetCarTaskList()
        {
            using (Entities db = new Entities())
            {
                IQueryable<qw_cartasks> queryable = db.qw_cartasks;
                return queryable.ToList();
            }

        }


        /// <summary>
        /// 添加车辆
        /// </summary>
        public int AddCar(QW_CarsModel model)
        {
            using (Entities db = new Entities())
            {
                qw_cars qcmodel = db.qw_cars.FirstOrDefault(a => a.carnumber == model.carnumber || a.code == model.code);
                if (qcmodel != null)
                {
                    return -1;
                }
                else
                {
                    qw_cars cmodel = new qw_cars();
                    cmodel.carid = model.carid;
                    cmodel.code = model.code;
                    cmodel.carstatus = model.carstatus;
                    cmodel.cartypeid = model.cartypeid;
                    cmodel.unitid = model.unitid;
                    cmodel.carnumber = model.carnumber;
                    cmodel.cartel = model.cartel;
                    cmodel.isonline = model.isonline;
                    cmodel.createuserid = model.createuserid;
                    cmodel.createtime = DateTime.Now;
                    cmodel.status = model.status;
                    cmodel.ssbc = model.ssbc;
                    cmodel.remarks = model.remarks;
                    db.qw_cars.Add(cmodel);
                    db.SaveChanges();
                    return cmodel.carid;
                }
            }
        }

        /// <summary>
        /// 查询列表
        /// </summary>
        /// <returns></returns>
        public List<QW_CarsModel> GetCarList(List<Filter> filters, int start, int limit)
        {
            List<QW_CarsModel> list = new List<QW_CarsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_CarsModel> queryable = from a in db.qw_cars
                                                     join b_join in db.base_units on a.unitid equals b_join.id into bTmp
                                                     from b in bTmp.DefaultIfEmpty()
                                                     join c_join in db.base_zds on a.cartypeid equals c_join.zd_id into cTmp
                                                     from c in cTmp.DefaultIfEmpty()
                                                     where c.zd_type == "type_car" && a.status == 0
                                                     select new QW_CarsModel
                                                     {
                                                         carid = a.carid,
                                                         code = a.code,
                                                         carstatus = a.carstatus,
                                                         cartypeid = a.cartypeid,
                                                         unitid = a.unitid,
                                                         carnumber = a.carnumber,
                                                         cartel = a.cartel,
                                                         isonline = a.isonline,
                                                         createuserid = a.createuserid,
                                                         createtime = a.createtime,
                                                         status = a.status,
                                                         ssbc = a.ssbc,
                                                         unitname = b == null ? "" : b.name,
                                                         cartypename = c == null ? "" : c.zd_name
                                                     };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "code":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.code.Contains(value));
                                }
                                break;
                            case "carnumber":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.carnumber.Contains(value));
                                }
                                break;
                            case "cartypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.cartypeid == value);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == id);
                                }
                                break;
                            case "ssbc":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.ssbc == id);
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
        /// 车辆数量
        /// </summary>
        /// <returns></returns>
        public int GetCarCount(List<Filter> filters)
        {
            List<QW_CarsModel> list = new List<QW_CarsModel>();
            using (Entities db = new Entities())
            {
                IQueryable<QW_CarsModel> queryable = from a in db.qw_cars
                                                     join b_join in db.base_units on a.unitid equals b_join.id into bTmp
                                                     from b in bTmp.DefaultIfEmpty()
                                                     where a.status == 0
                                                     select new QW_CarsModel
                                                     {
                                                         carid = a.carid,
                                                         cartypeid = a.cartypeid,
                                                         unitid = a.unitid,
                                                         carnumber = a.carnumber,
                                                         cartel = a.cartel,
                                                         isonline = a.isonline,
                                                         createuserid = a.createuserid,
                                                         createtime = a.createtime,
                                                         status = a.status,
                                                         ssbc = a.ssbc,
                                                         unitname = b == null ? "" : b.name
                                                     };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "code":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.code.Contains(value));
                                }
                                break;
                            case "carnumber":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.carnumber.Contains(value));
                                }
                                break;
                            case "cartypeid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.cartypeid == value);
                                }
                                break;
                            case "unitid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.unitid == id);
                                }
                                break;
                            case "ssbc":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int id = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.ssbc == id);
                                }
                                break;
                        }
                    }
                }
                return queryable.Count();

            }
        }

        /// <summary>
        /// 获取车辆详情
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        public QW_CarsModel GetCarInfo(int carid)
        {
            QW_CarsModel model = new QW_CarsModel();
            using (Entities db = new Entities())
            {
                IQueryable<QW_CarsModel> queryable = from a in db.qw_cars
                                                     join b_join in db.base_units on a.unitid equals b_join.id into bTmp
                                                     from b in bTmp.DefaultIfEmpty()
                                                     join c_join in db.base_units on a.ssbc equals c_join.id into cTmp
                                                     from c in cTmp.DefaultIfEmpty()
                                                     join d_join in db.base_zds on a.cartypeid equals d_join.zd_id into dTmp
                                                     from d in dTmp.DefaultIfEmpty()
                                                     join e_join in db.qw_carlastpositions on a.carid equals e_join.carid into eTemp
                                                     from e in eTemp.DefaultIfEmpty()
                                                     where d.zd_type == "type_car" && a.carid == carid
                                                     select new QW_CarsModel
                                                     {
                                                         carid = a.carid,
                                                         code = a.code,
                                                         cartypeid = a.cartypeid,
                                                         unitid = a.unitid,
                                                         carstatus = a.carstatus,
                                                         carnumber = a.carnumber,
                                                         cartel = a.cartel,
                                                         isonline = a.isonline,
                                                         createuserid = a.createuserid,
                                                         createtime = a.createtime,
                                                         status = a.status,
                                                         ssbc = a.ssbc,
                                                         unitname = b == null ? "" : b.name,
                                                         ssbcname = c == null ? "" : c.name,
                                                         cartypename = d == null ? "" : d.zd_name,
                                                         remarks = a.remarks,
                                                         x84 = e.x84,
                                                         y84 = e.y84,
                                                         positiontime = e.positiontime
                                                     };
                model = queryable.FirstOrDefault();

            }

            return model;
        }

        /// <summary>
        /// 修改车辆
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditCar(QW_CarsModel model)
        {
            using (Entities db = new Entities())
            {
                IQueryable<qw_cars> qcoldmodel = db.qw_cars.Where(a => a.carnumber == model.carnumber || a.code == model.code );
                int count = qcoldmodel.Where(a => a.carid != model.carid).Count();
                if (count != 0)
                {
                    return -1;
                }
                else
                {
                    qw_cars qcmodel = db.qw_cars.FirstOrDefault(a => a.carid == model.carid);
                    if (qcmodel != null)
                    {
                        qcmodel.code = model.code;
                        qcmodel.carstatus = model.carstatus;
                        qcmodel.cartypeid = model.cartypeid;
                        qcmodel.unitid = model.unitid;
                        qcmodel.carnumber = model.carnumber;
                        qcmodel.cartel = model.cartel;
                        qcmodel.createuserid = model.createuserid;
                        qcmodel.ssbc = model.ssbc;
                    }
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 删除车辆
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        public int DeleteCar(int carid)
        {
            using (Entities db = new Entities())
            {
                qw_cars qcmodel = db.qw_cars.FirstOrDefault(a => a.carid == carid);
                if (qcmodel != null)
                {
                    qcmodel.status = 1;
                }
                return db.SaveChanges();
            }
        }



        /// <summary>
        /// 添加用户历史位置
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int CarHistoryPositions(QW_CarHistoryPositionsModel model)
        {
            using (Entities db = new Entities())
            {
                qw_carhistorypositions qumodel = new qw_carhistorypositions();
                qumodel.x2000 = model.x2000;
                qumodel.y2000 = model.y2000;
                qumodel.x84 = model.x84;
                qumodel.y84 = model.y84;
                qumodel.carid = model.carid;
                qumodel.positiontime = model.positiontime;
                qumodel.cartel = model.cartel;
                qumodel.speed = model.speed;
                qumodel.lc = model.lc;
                qumodel.pk = model.pk;
                qumodel.yl = model.yl;
                db.qw_carhistorypositions.Add(qumodel);
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 添加最新定位表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int CarLastPositions(QW_CarHistoryPositionsModel model)
        {

            using (Entities db = new Entities())
            {
                qw_carlastpositions qumodel = new qw_carlastpositions();
                qumodel.x2000 = model.x2000;
                qumodel.y2000 = model.y2000;
                qumodel.x84 = model.x84;
                qumodel.y84 = model.y84;
                qumodel.carid = model.carid;
                qumodel.positiontime = model.positiontime;
                qumodel.cartel = model.cartel;
                qumodel.speed = model.speed;
                qumodel.lc = model.lc;
                qumodel.pk = model.pk;
                qumodel.yl = model.yl;
                db.qw_carlastpositions.Add(qumodel);
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 更新最新定位表
        /// </summary>
        /// <param name="CarId"></param>
        /// <param name="PositionTime"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateLastPosition(int CarId, DateTime PositionTime, QW_CarHistoryPositionsModel model)
        {
            using (Entities db = new Entities())
            {
                qw_carlastpositions lastmodel = new qw_carlastpositions();
                lastmodel = db.qw_carlastpositions.Where(a => a.carid == CarId && a.positiontime == PositionTime).FirstOrDefault();
                if (lastmodel == null)
                {
                    return CarLastPositions(model);
                }
                else
                {
                    lastmodel.lc = model.lc;
                    lastmodel.pk = model.pk;
                    lastmodel.positiontime = model.positiontime;
                    lastmodel.speed = model.speed;
                    lastmodel.x84 = model.x84;
                    lastmodel.yl = model.yl;
                    lastmodel.y84 = model.y84;
                    return db.SaveChanges();
                }
            }
        }


        /// <summary>
        /// 根据车辆标识和定位时间判断是否存在
        /// </summary>
        /// <param name="CarId"></param>
        /// <param name="PositionTime"></param>
        /// <returns></returns>
        public bool GetBoolCarPostiton(int CarId, DateTime PositionTime)
        {
            using (Entities db = new Entities())
            {
                qw_carhistorypositions qumodel = new qw_carhistorypositions();
                qumodel = db.qw_carhistorypositions.Where(a => a.carid == CarId && a.positiontime == PositionTime).FirstOrDefault();
                if (qumodel != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}

