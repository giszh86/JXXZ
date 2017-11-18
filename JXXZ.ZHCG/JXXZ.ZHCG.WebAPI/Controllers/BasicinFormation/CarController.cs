using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.BasicinFormation
{
    public class CarController : ApiController
    {
        private QW_CarsBLL bll = new QW_CarsBLL();
        /// <summary>
        /// 车辆列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_CarsModel>> GetCarList(int start, int limit)
        {
            return bll.GetCarList(null, start, limit);
        }

        /// <summary>
        /// 车辆列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_CarsModel>> GetCarList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetCarList(filters, start, limit);
        }


        /// <summary>
        /// 获取车辆详情
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        [HttpGet]
        public QW_CarsModel GetCarInfo(int carid)
        {
            return bll.GetCarInfo(carid);
        }

        /// <summary>
        /// 添加车辆
        /// </summary>
        [HttpPost]
        public HttpResponseMessage AddCar(QW_CarsModel model)
        {
            int success = bll.AddCar(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else if (success == -1)
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }


            return response;
        }

        /// <summary>
        /// 修改车辆
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditCar(QW_CarsModel model)
        {
            int success = bll.EditCar(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else if (success == -1)
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }


            return response;
        }

        /// <summary>
        /// 修改车辆
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage DeleteCar(int carid)
        {
            int success = bll.DeleteCar(carid);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }


            return response;
        }

    }
}