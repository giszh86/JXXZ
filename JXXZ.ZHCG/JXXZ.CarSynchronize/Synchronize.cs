using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.ServiceManagementDAL;
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
    public class Synchronize
    {
        string jsession = "";

        /// <summary>
        /// 获取密码
        /// </summary>
        public void GetPassWord()
        {
            string token = HttpWebPost.Request("http://116.247.83.157/StandardApiAction_login.action?account=gz&password=000000", false, "");
            JObject tokenjson = (JObject)JsonConvert.DeserializeObject(token);
            jsession = tokenjson["jsession"].ToString();
        }

        public void GetAllListEvent()
        {
            try
            {
                while (true)
                {
                    QW_CarsDAL cardal = new QW_CarsDAL();
                    string url = "http://116.247.83.157/StandardApiAction_queryUserVehicle.action?jsession=" + jsession;
                    string Tracking = HttpWebPost.Request(url, false, "");
                    // 反序列化json
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    JObject Trackingjson = (JObject)JsonConvert.DeserializeObject(Tracking);
                    if (Trackingjson["result"].ToString() == "7")
                    {
                        GetPassWord();
                    }
                    else if (Trackingjson["result"].ToString() == "3")
                    {
                        GetPassWord();
                    }
                    else if (Trackingjson["result"].ToString() == "4")
                    {
                        GetPassWord();
                    }
                    else
                    {
                        List<CarSynchronizeModel> TrackingList = jss.Deserialize<List<CarSynchronizeModel>>(Trackingjson["vehicles"].ToString());
                        foreach (CarSynchronizeModel item in TrackingList)
                        {
                            QW_CarsModel qcar = new QW_CarsModel();
                            if (!string.IsNullOrEmpty(item.nm))
                            {
                                string[] nms = item.nm.Split('-');
                                switch (nms[0])
                                {
                                    case "高":
                                        qcar.unitid = 12;
                                        break;
                                }
                                switch (nms[1])
                                {
                                    case "扫":
                                        qcar.cartypeid = "4";
                                        break;
                                    case "洒":
                                        qcar.cartypeid = "5";
                                        break;
                                    case "压":
                                        qcar.cartypeid = "3";
                                        break;
                                }
                                qcar.carnumber = nms[2];
                            }
                            qcar.code = item.id.ToString();
                            qcar.cartel = item.dl[0].id;
                            qcar.isonline = 1;
                            qcar.createuserid = 1;
                            qcar.createtime = DateTime.Now;
                            qcar.status = 0;
                            qcar.carstatus = 0;
                            qcar.remarks = item.nm;
                            cardal.AddCar(qcar);
                        }
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

    }
}
