using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using ZGM.SZCGInterface;

namespace JXXZ.CarSynchronize
{
    public class GetCarGPS
    {
        public static string jsession = "";

        /// <summary>
        /// 获取密码
        /// </summary>
        public void GetPassWord()
        {
            string token = HttpWebPost.Request("http://116.247.83.157/StandardApiAction_login.action?account=gz&password=000000", false, "");
            JObject tokenjson = (JObject)JsonConvert.DeserializeObject(token);
            jsession = tokenjson["jsession"].ToString();
        }


        public void GetGPS()
        {
            while (true)
            {
                QW_CarsBLL bll = new QW_CarsBLL();
                List<QW_CarsModel> listCar = bll.GetCars().Where(a => !string.IsNullOrEmpty(a.remarks)).ToList();
                foreach (QW_CarsModel item in listCar)
                {
                    string url = string.Format(@"http://116.247.83.157/StandardApiAction_getDeviceStatus.action?jsession={0}&devIdno={1}&toMap=2", jsession, item.cartel);
                    string Tracking = HttpWebPost.Request(url, false, "");
                    // 反序列化json
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    JObject Trackingjson = (JObject)JsonConvert.DeserializeObject(Tracking);
                    string result = Trackingjson["result"] == null ? "" : Trackingjson["result"].ToString();

                    if (result == "0")
                    {
                        string status = Trackingjson["status"] == null ? "" : Trackingjson["status"].ToString();
                        if (!string.IsNullOrEmpty(status))
                        {
                            JArray jo = new JArray();
                            jo = (JArray)JsonConvert.DeserializeObject(status);

                            foreach (JObject array in jo)
                            {
                                QW_CarHistoryPositionsModel model = new QW_CarHistoryPositionsModel();
                                model.carid = item.carid;
                                model.cartel = item.cartel;
                                model.isanalyze = 0;
                                model.lc = array["lc"] == null ? 0 : Convert.ToDouble(array["lc"].ToString());
                                model.pk = array["pk"] == null ? 0 : Convert.ToInt32(array["pk"].ToString());
                                model.positiontime = array["gt"] == null ? DateTime.Now : Convert.ToDateTime(array["gt"].ToString());
                                model.speed = array["sp"] == null ? 0 : Convert.ToDecimal(array["sp"].ToString());
                                model.x84 = array["mlng"] == null ? 0 : Convert.ToDecimal(array["mlng"].ToString());
                                model.y84 = array["mlat"] == null ? 0 : Convert.ToDecimal(array["mlat"].ToString());
                                model.yl = array["yl"] == null ? 0 : Convert.ToDouble(array["yl"].ToString());
                                DateTime dt = model.positiontime;
                                bool his = bll.GetBoolCarPostiton(item.carid, dt);
                                if (!his)
                                {
                                    bll.CarHistoryPositions(model);
                                }
                                bll.UpdateLastPosition(item.carid, dt, model);

                                Console.WriteLine("车辆：" + item.carnumber + "---PositionTime:" + dt.ToString("yyyy-MM-dd hh:mm:ss"));
                            }
                        }

                    }
                    else
                    {
                        GetPassWord();
                        break;
                    }
                }

                System.Threading.Thread.Sleep(20000);
            }

        }

    }
}
