using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
    public class QW_CarsBLL
    {
        private QW_CarsDAL dal = new QW_CarsDAL();

        public List<QW_CarsModel> GetCars()
        {
            return dal.GetCars();
        }


        /// <summary>
        /// 根据部门获取车辆
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public List<QW_CarsModel> GetCarsUnitList(int unitid)
        {
            return dal.GetCarsUnitList(unitid);
        }

        /// <summary>
        /// 根据班次获取车辆
        /// </summary>
        /// <param name="unitid"></param>
        /// <returns></returns>
        public List<QW_CarsModel> GetCarsSsbcList(int ssbc)
        {
            return dal.GetCarsSsbcList(ssbc);
        }
        public List<qw_cartasks> GetCarTaskList()
        {
            return dal.GetCarTaskList();
        }

        /// <summary>
        /// 车辆列表
        /// </summary>
        /// <returns></returns>
        ///   public List<QW_CarsModel> GetCarList(int start, int limit)
        public Paging<List<QW_CarsModel>> GetCarList(List<Filter> filter, int start, int limit)
        {

            List<QW_CarsModel> items = dal.GetCarList(filter, start, limit).ToList();
            int total = dal.GetCarCount(filter);

            Paging<List<QW_CarsModel>> paging = new Paging<List<QW_CarsModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 获取车辆详情
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        public QW_CarsModel GetCarInfo(int carid)
        {
            return dal.GetCarInfo(carid);
        }
        /// <summary>
        /// 添加车辆
        /// </summary>
        public int AddCar(QW_CarsModel model)
        {
            return dal.AddCar(model);
        }


        /// <summary>
        /// 修改车辆
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditCar(QW_CarsModel model)
        {
            return dal.EditCar(model);
        }
        /// <summary>
        /// 删除车辆
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        public int DeleteCar(int carid)
        {
            return dal.DeleteCar(carid);
        }

        /// <summary>
        /// 插入历史定位
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int CarHistoryPositions(QW_CarHistoryPositionsModel model)
        {
            return dal.CarHistoryPositions(model);
        }

        /// <summary>
        /// 根据车辆标识和定位时间判断是否存在
        /// </summary>
        /// <param name="CarId"></param>
        /// <param name="PositionTime"></param>
        /// <returns></returns>
        public bool GetBoolCarPostiton(int CarId, DateTime PositionTime)
        {
            return dal.GetBoolCarPostiton(CarId, PositionTime);

        }

        /// <summary>
        /// 最新定位表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateLastPosition(int CarId, DateTime PositionTime, QW_CarHistoryPositionsModel model)
        {
            return dal.UpdateLastPosition(CarId, PositionTime, model);
        }
    }
}
