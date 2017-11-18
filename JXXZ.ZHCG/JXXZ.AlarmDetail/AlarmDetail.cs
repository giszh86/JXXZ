using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.AlarmDetail;
using JXXZ.ZHCG.Model.AlarmDetail;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace JXXZ.AlarmDetail
{
    public class AlarmDetail
    {
        //人员实例
        SluggishAlarm sa = new SluggishAlarm();
        //车辆实例
        CarSluggishAlarm ca = new CarSluggishAlarm();

        AlarmList AL = new AlarmList();
        List<AlarmList> ALS = new List<AlarmList>();
        //获取当前时间
        DateTime time = DateTime.Now;

        /// <summary>
        /// 越界、停留
        /// </summary>
        public void YJTlAlarmDetail()
        {
            //存放读取的记录
            List<qw_userhistorypositions> Patrolists = new List<qw_userhistorypositions>();

            //查询所有任务
            List<qw_usertasks> TIC = sa.GetAllUserTaskAreas().Where(a => a.taskstarttime.Year == time.Year && a.taskstarttime.Month == time.Month && a.taskstarttime.Day == time.Day).ToList(); //修改userid

            //判断文件夹
            string sPath = "C:\\JXXZAlarm\\" + time.Year + "\\" + time.Month + time.Day + "\\";
            if (!Directory.Exists(sPath))
            {
                Directory.CreateDirectory(sPath);
            }

            //报警处理
            foreach (var userlist in TIC)
            {
                try
                {
                    Patrolists = sa.Get1000PatrolDataToTemporary((int)userlist.userid); //根据任务人员查询任务坐标；
                    string file = sPath + userlist.userid + "BJ.xml";//报警文件
                    bool flag = File.Exists(file);//判断文件是否存在，存在，就读取，否则新建
                    if (!flag)
                    {
                        #region 创建xml文件
                        StringBuilder xmlResult = new StringBuilder("<?xml version='1.0' encoding='utf-8'?>");
                        xmlResult.Append("<Alarm>");//报警
                        xmlResult.Append("<OutMap> ");//越界
                        xmlResult.Append("<OutMapID></OutMapID>");
                        xmlResult.Append("<OutMapUserID>" + userlist.userid.ToString() + "</OutMapUserID>");
                        xmlResult.Append("<OutMapStartTime></OutMapStartTime>");
                        xmlResult.Append("<OutMapEndTime></OutMapEndTime>");
                        xmlResult.Append("<OutMapLONGITUDE/>");
                        xmlResult.Append("<OutMapLATITUDE/>");
                        xmlResult.Append("<OutMapX/>");
                        xmlResult.Append("<OutMapY/>");
                        xmlResult.Append("<OutMapStatus/>");//1结束
                        xmlResult.Append("</OutMap> ");

                        xmlResult.Append("<Stop> ");//停留
                        xmlResult.Append("<StopID></StopID>");
                        xmlResult.Append(" <StopUserID>" + userlist.userid.ToString() + "</StopUserID>");
                        xmlResult.Append("<StopStartTime></StopStartTime>");
                        xmlResult.Append("<StopEndTime></StopEndTime>");
                        xmlResult.Append("<StopLONGITUDE/>");
                        xmlResult.Append("<StopLATITUDE/>");
                        xmlResult.Append("<StopX/>");
                        xmlResult.Append("<StopY/>");
                        xmlResult.Append("<StopStatus/>");//1结束
                        xmlResult.Append("</Stop> ");

                        xmlResult.Append("<Rest> ");//休息点停留
                        xmlResult.Append("<RestID></RestID>");
                        xmlResult.Append(" <RestUserID>" + userlist.userid.ToString() + "</RestUserID>");
                        xmlResult.Append("<RestStartTime></RestStartTime>");
                        xmlResult.Append("<RestEndTime></RestEndTime>");
                        xmlResult.Append("<RestLONGITUDE/>");
                        xmlResult.Append("<RestLATITUDE/>");
                        xmlResult.Append("<RestX/>");
                        xmlResult.Append("<RestY/>");
                        xmlResult.Append("<RestStatus/>");//1结束
                        xmlResult.Append("</Rest> ");

                        xmlResult.Append("</Alarm>");

                        using (FileStream fs = new FileStream(file, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                        {
                            using (StreamWriter sw = new StreamWriter(fs))
                            {
                                sw.WriteLine(xmlResult);
                            }
                        }
                        #endregion
                    }

                    XmlDocument xd = new XmlDocument();
                    xd.Load(file);
                    #region 获取节点字段
                    //越界的节点
                    XmlNodeList OutMapID = xd.GetElementsByTagName("OutMapID"); //获取Person子节点集合
                    XmlNodeList OutMapUserID = xd.GetElementsByTagName("OutMapUserID"); //获取Person子节点集合
                    XmlNodeList OutMapStartTime = xd.GetElementsByTagName("OutMapStartTime"); //获取Person子节点集合
                    XmlNodeList OutMapEndTime = xd.GetElementsByTagName("OutMapEndTime"); //获取Person子节点集合
                    XmlNodeList OutMapLONGITUDE = xd.GetElementsByTagName("OutMapLONGITUDE"); //获取Person子节点集合
                    XmlNodeList OutMapLATITUDE = xd.GetElementsByTagName("OutMapLATITUDE"); //获取Person子节点集合
                    XmlNodeList OutMapX = xd.GetElementsByTagName("OutMapX"); //获取Person子节点集合
                    XmlNodeList OutMapY = xd.GetElementsByTagName("OutMapY"); //获取Person子节点集合
                    XmlNodeList OutMapStatus = xd.GetElementsByTagName("OutMapStatus"); //获取Person子节点集合

                    //停留的节点
                    XmlNodeList StopID = xd.GetElementsByTagName("StopID"); //获取Person子节点集合
                    XmlNodeList StopUserID = xd.GetElementsByTagName("StopUserID"); //获取Person子节点集合
                    XmlNodeList StopStartTime = xd.GetElementsByTagName("StopStartTime"); //获取Person子节点集合
                    XmlNodeList StopEndTime = xd.GetElementsByTagName("StopEndTime"); //获取Person子节点集合
                    XmlNodeList StopLONGITUDE = xd.GetElementsByTagName("StopLONGITUDE"); //获取Person子节点集合
                    XmlNodeList StopLATITUDE = xd.GetElementsByTagName("StopLATITUDE"); //获取Person子节点集合
                    XmlNodeList StopX = xd.GetElementsByTagName("StopX"); //获取Person子节点集合
                    XmlNodeList StopY = xd.GetElementsByTagName("StopY"); //获取Person子节点集合
                    XmlNodeList StopStatus = xd.GetElementsByTagName("StopStatus"); //获取Person子节点集合

                    //停留的节点
                    XmlNodeList RestID = xd.GetElementsByTagName("RestID"); //获取Person子节点集合
                    XmlNodeList RestUserID = xd.GetElementsByTagName("RestUserID"); //获取Person子节点集合
                    XmlNodeList RestStartTime = xd.GetElementsByTagName("RestStartTime"); //获取Person子节点集合
                    XmlNodeList RestEndTime = xd.GetElementsByTagName("RestEndTime"); //获取Person子节点集合
                    XmlNodeList RestLONGITUDE = xd.GetElementsByTagName("RestLONGITUDE"); //获取Person子节点集合
                    XmlNodeList RestLATITUDE = xd.GetElementsByTagName("RestLATITUDE"); //获取Person子节点集合
                    XmlNodeList RestX = xd.GetElementsByTagName("RestX"); //获取Person子节点集合
                    XmlNodeList RestY = xd.GetElementsByTagName("RestY"); //获取Person子节点集合
                    XmlNodeList RestStatus = xd.GetElementsByTagName("RestStatus"); //获取Person子节点集合
                    #endregion

                    foreach (var list in Patrolists)
                    {
                        MapPoint UserPoint = new MapPoint();
                        List<MapPoint> fencePnts = new List<MapPoint>();

                        UserPoint.X = list.x84 != null ? (double)list.x84 : 0;//纬度
                        UserPoint.Y = list.y84 != null ? (double)list.y84 : 0;//经度

                        DateTime Stime = list.positiontime;

                        List<string> UserInspectionScope = sa.SelectInspectionScopeByUserID(list.userid, Stime);

                        if (UserInspectionScope != null && UserInspectionScope.Count() > 0)
                        {
                            foreach (string item in UserInspectionScope)
                            {
                                var Scpoes = item.Split(';');
                                //获取巡查范围

                                foreach (var scpoe in Scpoes)
                                {
                                    MapPoint mp = new MapPoint();
                                    mp.X = double.Parse(scpoe.Split(',')[0]);
                                    mp.Y = double.Parse(scpoe.Split(',')[1]);
                                    fencePnts.Add(mp);
                                }
                            }
                        }
                        bool rea = sa.PointInFences(UserPoint, fencePnts);//是否在区域内
                        if (rea == true)//是
                        {
                            //看看有没有越界需要结束的
                            if (!string.IsNullOrEmpty(OutMapEndTime[0].InnerText))
                            {
                                OutMapStatus[0].InnerText = "1";
                                xd.Save(file);
                                //把越界报警插入数据库,插入之后，吧xml里面的数据内容还原
                                //插入数据库
                                qw_alarmmemorylocationdatas model = new qw_alarmmemorylocationdatas()
                                {
                                    alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                                    alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    alarmtype = 2,
                                    createtime = DateTime.Now,
                                    gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    latitude = double.Parse(OutMapLATITUDE[0].InnerText),
                                    longitude = double.Parse(OutMapLONGITUDE[0].InnerText),
                                    userid = list.userid,
                                    //X = decimal.Parse(OutMapX[0].InnerText),
                                    //Y = decimal.Parse(OutMapY[0].InnerText)
                                };
                                sa.SaveAlarmList(model, OutMapID[0].InnerText);

                                //清除xml内容
                                OutMapID[0].InnerText = "";
                                OutMapUserID[0].InnerText = "";
                                OutMapStartTime[0].InnerText = ""; //获取Person子节点集合
                                OutMapEndTime[0].InnerText = ""; //获取Person子节点集合
                                OutMapLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                OutMapLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                OutMapX[0].InnerText = ""; //获取Person子节点集合
                                OutMapY[0].InnerText = ""; //获取Person子节点集合
                                OutMapStatus[0].InnerText = ""; //获取Person子节点集合
                                RestID[0].InnerText = "";
                                RestUserID[0].InnerText = "";
                                RestStartTime[0].InnerText = ""; //获取Person子节点集合
                                RestEndTime[0].InnerText = ""; //获取Person子节点集合
                                RestLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                RestLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                RestX[0].InnerText = ""; //获取Person子节点集合
                                RestY[0].InnerText = ""; //获取Person子节点集合
                                RestStatus[0].InnerText = ""; //获取Person子节点集合
                                StopID[0].InnerText = "";
                                StopUserID[0].InnerText = "";
                                StopStartTime[0].InnerText = ""; //获取Person子节点集合
                                StopEndTime[0].InnerText = ""; //获取Person子节点集合
                                StopLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                StopLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                StopX[0].InnerText = ""; //获取Person子节点集合
                                StopY[0].InnerText = ""; //获取Person子节点集合
                                StopStatus[0].InnerText = ""; //获取Person子节点集合
                                xd.Save(file);
                            }

                            //如果在区域内，再判断是否是停留报警。不在休息点内。
                            if (list.speed < 2)
                            {
                                if (string.IsNullOrEmpty(StopStartTime[0].InnerText))
                                {
                                    StopStartTime[0].InnerText = list.positiontime.ToString();
                                    StopLONGITUDE[0].InnerText = list.x84.ToString();
                                    StopLATITUDE[0].InnerText = list.y84.ToString();
                                    //StopX[0].InnerText = list.x2000.ToString();
                                    //StopY[0].InnerText = list.y2000.ToString();
                                }
                                else
                                {
                                    StopEndTime[0].InnerText = list.positiontime.ToString();
                                }
                                xd.Save(file);
                            }
                            else
                            {
                                if (!string.IsNullOrEmpty(StopStartTime[0].InnerText) && !string.IsNullOrEmpty(StopEndTime[0].InnerText))
                                {
                                    DateTime dt = DateTime.Parse(StopStartTime[0].InnerText);
                                    DateTime dtnew = DateTime.Parse(StopEndTime[0].InnerText);
                                    decimal diff = sa.DateDiff(dtnew, dt);
                                    if (diff > 15)
                                    {
                                        //大于15分钟，停留报警
                                        StopStatus[0].InnerText = "1";
                                        xd.Save(file);
                                        //插入数据库
                                        qw_alarmmemorylocationdatas model = new qw_alarmmemorylocationdatas()
                                        {
                                            alarmendtime = DateTime.Parse(StopEndTime[0].InnerText),
                                            alarmstrattime = DateTime.Parse(StopStartTime[0].InnerText),
                                            alarmtype = 1,
                                            createtime = DateTime.Now,
                                            gpstime = DateTime.Parse(StopStartTime[0].InnerText),
                                            latitude = double.Parse(StopLATITUDE[0].InnerText),
                                            longitude = double.Parse(StopLONGITUDE[0].InnerText),
                                            userid = list.userid,
                                            //X = decimal.Parse(StopX[0].InnerText),
                                            //Y = decimal.Parse(StopY[0].InnerText)
                                        };
                                        sa.SaveAlarmList(model, StopID[0].InnerText);
                                    }
                                    //清除xml里面的内容
                                    StopID[0].InnerText = "";
                                    StopUserID[0].InnerText = "";
                                    StopStartTime[0].InnerText = ""; //获取Person子节点集合
                                    StopEndTime[0].InnerText = ""; //获取Person子节点集合
                                    StopLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                    StopLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                    StopX[0].InnerText = ""; //获取Person子节点集合
                                    StopY[0].InnerText = ""; //获取Person子节点集合
                                    StopStatus[0].InnerText = ""; //获取Person子节点集合
                                    xd.Save(file);

                                }
                            }
                            RestID[0].InnerText = "";
                            RestUserID[0].InnerText = "";
                            RestStartTime[0].InnerText = ""; //获取Person子节点集合
                            RestEndTime[0].InnerText = ""; //获取Person子节点集合
                            RestLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                            RestLATITUDE[0].InnerText = ""; //获取Person子节点集合
                            RestX[0].InnerText = ""; //获取Person子节点集合
                            RestY[0].InnerText = ""; //获取Person子节点集合
                            RestStatus[0].InnerText = ""; //获取Person子节点集合
                            xd.Save(file);
                            //}
                            //}
                        }
                        else
                        {
                            //如果不在区域内，则判断XML文件是否存在，如果不存在，则添加。否则判断XML文件里面的报警开始时间，如果是空的，则更新报警开始时间，否则更新报警结束时间。

                            if (string.IsNullOrEmpty(OutMapUserID[0].InnerText))
                            {
                                OutMapUserID[0].InnerText = list.userid.ToString();//人员ID如果是空的，则补上，否则还是原来的
                            }

                            if (string.IsNullOrEmpty(OutMapStartTime[0].InnerText))
                            {
                                OutMapStartTime[0].InnerText = list.positiontime.ToString();
                                OutMapLONGITUDE[0].InnerText = list.x84.ToString();
                                OutMapLATITUDE[0].InnerText = list.y84.ToString();
                                //OutMapX[0].InnerText = list.x2000.ToString();
                                //OutMapY[0].InnerText = list.y2000.ToString();
                            }
                            else
                            {
                                OutMapEndTime[0].InnerText = list.positiontime.ToString();
                            }
                            xd.Save(file);
                        }
                        sa.UpdateISANALYZE(list.userid, list.positiontime);
                        Console.WriteLine(list.userid + "---" + list.positiontime);
                    }

                    #region 若是存在越界或停留报警,则修改xml文件
                    xd.Load(file);
                    #region 获取节点数据
                    //越界的节点
                    OutMapID = xd.GetElementsByTagName("OutMapID"); //获取Person子节点集合
                    OutMapUserID = xd.GetElementsByTagName("OutMapUserID"); //获取Person子节点集合
                    OutMapStartTime = xd.GetElementsByTagName("OutMapStartTime"); //获取Person子节点集合
                    OutMapEndTime = xd.GetElementsByTagName("OutMapEndTime"); //获取Person子节点集合
                    OutMapLONGITUDE = xd.GetElementsByTagName("OutMapLONGITUDE"); //获取Person子节点集合
                    OutMapLATITUDE = xd.GetElementsByTagName("OutMapLATITUDE"); //获取Person子节点集合
                    OutMapX = xd.GetElementsByTagName("OutMapX"); //获取Person子节点集合
                    OutMapY = xd.GetElementsByTagName("OutMapY"); //获取Person子节点集合
                    OutMapStatus = xd.GetElementsByTagName("OutMapStatus"); //获取Person子节点集合


                    StopID = xd.GetElementsByTagName("StopID"); //获取Person子节点集合
                    StopUserID = xd.GetElementsByTagName("StopUserID"); //获取Person子节点集合
                    StopStartTime = xd.GetElementsByTagName("StopStartTime"); //获取Person子节点集合
                    StopEndTime = xd.GetElementsByTagName("StopEndTime"); //获取Person子节点集合
                    StopLONGITUDE = xd.GetElementsByTagName("StopLONGITUDE"); //获取Person子节点集合
                    StopLATITUDE = xd.GetElementsByTagName("StopLATITUDE"); //获取Person子节点集合
                    StopX = xd.GetElementsByTagName("StopX"); //获取Person子节点集合
                    StopY = xd.GetElementsByTagName("StopY"); //获取Person子节点集合
                    StopStatus = xd.GetElementsByTagName("StopStatus"); //获取Person子节点集合


                    RestID = xd.GetElementsByTagName("RestID"); //获取Person子节点集合
                    RestUserID = xd.GetElementsByTagName("RestUserID"); //获取Person子节点集合
                    RestStartTime = xd.GetElementsByTagName("RestStartTime"); //获取Person子节点集合
                    RestEndTime = xd.GetElementsByTagName("RestEndTime"); //获取Person子节点集合
                    RestLONGITUDE = xd.GetElementsByTagName("RestLONGITUDE"); //获取Person子节点集合
                    RestLATITUDE = xd.GetElementsByTagName("RestLATITUDE"); //获取Person子节点集合
                    RestX = xd.GetElementsByTagName("RestX"); //获取Person子节点集合
                    RestY = xd.GetElementsByTagName("RestY"); //获取Person子节点集合
                    RestStatus = xd.GetElementsByTagName("RestStatus"); //获取Person子节点集合

                    #endregion
                    if (!string.IsNullOrEmpty(OutMapEndTime[0].InnerText))
                    {
                        qw_alarmmemorylocationdatas model = new qw_alarmmemorylocationdatas()
                        {
                            alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                            alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                            alarmtype = 2,
                            createtime = DateTime.Now,
                            gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                            latitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                            longitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                            userid = userlist.userid,
                        };
                        decimal NEWID = sa.SaveAlarmList(model, OutMapID[0].InnerText);
                        OutMapID[0].InnerText = NEWID.ToString();
                        xd.Save(file);
                    }

                    if (!string.IsNullOrEmpty(StopEndTime[0].InnerText))
                    {
                        DateTime dt = DateTime.Parse(StopStartTime[0].InnerText);
                        DateTime dtnew = DateTime.Parse(StopEndTime[0].InnerText);
                        decimal diff = sa.DateDiff(dtnew, dt);
                        if (diff > 15)
                        {
                            qw_alarmmemorylocationdatas model = new qw_alarmmemorylocationdatas()
                            {
                                alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                                alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                alarmtype = 1,
                                createtime = DateTime.Now,
                                gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                latitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                longitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                userid = userlist.userid,
                            };
                            decimal NEWID = sa.SaveAlarmList(model, StopID[0].InnerText);
                            StopID[0].InnerText = NEWID.ToString();
                            xd.Save(file);
                        }

                        if (!string.IsNullOrEmpty(RestEndTime[0].InnerText))
                        {
                            DateTime dt1 = DateTime.Parse(RestStartTime[0].InnerText);
                            DateTime dtnew1 = DateTime.Parse(RestEndTime[0].InnerText);
                            decimal diff1 = sa.DateDiff(dtnew1, dt1);
                            if (diff1 > 30)
                            {
                                qw_alarmmemorylocationdatas model = new qw_alarmmemorylocationdatas()
                                {
                                    alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                                    alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    alarmtype = 1,
                                    createtime = DateTime.Now,
                                    gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    latitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                    longitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                    userid = userlist.userid,
                                };
                                decimal NEWID = sa.SaveAlarmList(model, RestID[0].InnerText);
                                RestID[0].InnerText = NEWID.ToString();
                                xd.Save(file);
                            }
                        }
                    }
                    #endregion 

                }
                catch (Exception)
                {

                    throw;
                }

            }

        }

        /// <summary>
        /// 离线
        /// </summary>
        public void LxAlarmDetail()
        {
            //存放读取的记录
            List<AlarmList> Patrolists = new List<AlarmList>();

            //查询所有任务
            List<qw_usertasks> TIC = sa.GetAllUserTaskAreas().Where(a => a.taskstarttime.Year == time.Year && a.taskstarttime.Month == time.Month && a.taskstarttime.Day == time.Day).ToList(); //修改userid

            //报警处理
            foreach (var list in TIC)
            {
                DateTime? Offlinetime = null;
                try
                {
                    if (list.taskendtime >= time && list.taskstarttime <= time)
                    {
                        //查询最后一次定位表
                        qw_userlastpositions list_usertaskarears = sa.GetAllUserLatestPositions(decimal.Parse(list.userid.ToString())).FirstOrDefault(); //修改。
                        if (list_usertaskarears != null)
                        {
                            DateTime? lasttime = list_usertaskarears.positiontime;
                            if (Offlinetime == null)
                            {
                                Offlinetime = DateTime.Parse("0001-01-01 00:00:00");
                            }
                            if (sa.DateDiff(DateTime.Parse(time.ToString()), DateTime.Parse(list_usertaskarears.positiontime.ToString())) >= 15)
                            {
                                AlarmList al = new AlarmList();
                                if (list.taskstarttime != null && list.taskstarttime.Year == time.Year && list.taskstarttime.Month == time.Month && list.taskstarttime.Day == time.Day)
                                {
                                    if (Offlinetime != lasttime)
                                    {
                                        //离线报警
                                        if (lasttime != null && lasttime.Value.Year == time.Year && lasttime.Value.Month == time.Month && lasttime.Value.Day == time.Day)
                                        {
                                            al.ALARMSTRATTIME = lasttime;
                                            Offlinetime = lasttime;
                                        }
                                        else
                                        {
                                            al.ALARMSTRATTIME = list.taskstarttime;
                                            Offlinetime = lasttime;
                                        }

                                        al.USERID = list.userid;
                                        //al.LATITUDE = list_usertaskarears[0].x2000;
                                        //al.LONGITUDE = list_usertaskarears[0].y2000;
                                        al.X = (double)list_usertaskarears.x84;
                                        al.Y = (double)list_usertaskarears.y84;
                                        al.ALARMOVER = 1;
                                        al.ALARMENDTIME = time;
                                        al.ALARMTYPE = 3;
                                        al.GPSTIME = time;
                                        al.CREATETIME = DateTime.Now;

                                        sa.SaveAlarmList(al);
                                        Console.WriteLine("超过15分钟离线报警，用户编号" + al.USERID);
                                    }
                                }
                            }
                        }
                        else
                        {
                            DateTime? lasttime = DateTime.Now;
                            if (Offlinetime == null)
                            {
                                Offlinetime = DateTime.Parse("0001-01-01 00:00:00");
                            }
                            AlarmList al = new AlarmList();
                            if (list.taskstarttime != null && list.taskstarttime.Year == time.Year && list.taskstarttime.Month == time.Month && list.taskstarttime.Day == time.Day)
                            {
                                if (Offlinetime != lasttime)
                                {
                                    //离线报警
                                    if (lasttime != null && lasttime.Value.Year == time.Year && lasttime.Value.Month == time.Month && lasttime.Value.Day == time.Day)
                                    {
                                        al.ALARMSTRATTIME = lasttime;
                                        Offlinetime = lasttime;
                                    }
                                    else
                                    {
                                        al.ALARMSTRATTIME = list.taskstarttime;
                                        Offlinetime = lasttime;
                                    }
                                    al.USERID = list.userid;
                                    al.ALARMOVER = 1;
                                    al.ALARMENDTIME = time;
                                    al.ALARMTYPE = 3;
                                    al.GPSTIME = time;
                                    al.CREATETIME = DateTime.Now;

                                    sa.SaveAlarmList(al);
                                    Console.WriteLine("超过15分钟离线报警，用户编号" + al.USERID);
                                }
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

        /// <summary>
        /// 车辆越界、停留
        /// </summary>
        public void CARYJTlAlarmDetail()
        {
            //存放读取的记录
            List<qw_carhistorypositions> Patrolists = new List<qw_carhistorypositions>();

            //查询所有任务
            List<qw_cartasks> TIC = ca.GetAllCarTaskAreas().Where(a => a.taskstarttime.Year == time.Year && a.taskstarttime.Month == time.Month && a.taskstarttime.Day == time.Day).ToList(); //修改carid

            //判断文件夹
            string sPath = "C:\\JXXZAlarm\\" + time.Year + "\\" + time.Month + time.Day + "\\";
            if (!Directory.Exists(sPath))
            {
                Directory.CreateDirectory(sPath);
            }

            //报警处理
            foreach (var carlist in TIC)
            {
                try
                {
                    Patrolists = ca.Get1000PatrolDataToTemporary((int)carlist.carid);
                    string file = sPath + carlist.carid + "CarBJ.xml";//报警文件
                    bool flag = File.Exists(file);//判断文件是否存在，存在，就读取，否则新建
                    if (!flag)
                    {
                        #region 创建xml文件
                        StringBuilder xmlResult = new StringBuilder("<?xml version='1.0' encoding='utf-8'?>");
                        xmlResult.Append("<Alarm>");//报警
                        xmlResult.Append("<OutMap> ");//越界
                        xmlResult.Append("<OutMapID></OutMapID>");
                        xmlResult.Append("<OutMapCarID>" + carlist.carid.ToString() + "</OutMapCarID>");
                        xmlResult.Append("<OutMapStartTime></OutMapStartTime>");
                        xmlResult.Append("<OutMapEndTime></OutMapEndTime>");
                        xmlResult.Append("<OutMapLONGITUDE/>");
                        xmlResult.Append("<OutMapLATITUDE/>");
                        xmlResult.Append("<OutMapX/>");
                        xmlResult.Append("<OutMapY/>");
                        xmlResult.Append("<OutMapStatus/>");//1结束
                        xmlResult.Append("</OutMap> ");

                        xmlResult.Append("<Stop> ");//停留
                        xmlResult.Append("<StopID></StopID>");
                        xmlResult.Append(" <StopCarID>" + carlist.carid.ToString() + "</StopCarID>");
                        xmlResult.Append("<StopStartTime></StopStartTime>");
                        xmlResult.Append("<StopEndTime></StopEndTime>");
                        xmlResult.Append("<StopLONGITUDE/>");
                        xmlResult.Append("<StopLATITUDE/>");
                        xmlResult.Append("<StopX/>");
                        xmlResult.Append("<StopY/>");
                        xmlResult.Append("<StopStatus/>");//1结束
                        xmlResult.Append("</Stop> ");

                        xmlResult.Append("<Rest> ");//休息点停留
                        xmlResult.Append("<RestID></RestID>");
                        xmlResult.Append(" <RestCarID>" + carlist.carid.ToString() + "</RestCarID>");
                        xmlResult.Append("<RestStartTime></RestStartTime>");
                        xmlResult.Append("<RestEndTime></RestEndTime>");
                        xmlResult.Append("<RestLONGITUDE/>");
                        xmlResult.Append("<RestLATITUDE/>");
                        xmlResult.Append("<RestX/>");
                        xmlResult.Append("<RestY/>");
                        xmlResult.Append("<RestStatus/>");//1结束
                        xmlResult.Append("</Rest> ");

                        xmlResult.Append("</Alarm>");

                        using (FileStream fs = new FileStream(file, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                        {
                            using (StreamWriter sw = new StreamWriter(fs))
                            {
                                sw.WriteLine(xmlResult);
                            }
                        }
                        #endregion
                    }

                    XmlDocument xd = new XmlDocument();
                    xd.Load(file);
                    #region 获取节点字段
                    //越界的节点
                    XmlNodeList OutMapID = xd.GetElementsByTagName("OutMapID"); //获取Person子节点集合
                    XmlNodeList OutMapCarID = xd.GetElementsByTagName("OutMapCarID"); //获取Person子节点集合
                    XmlNodeList OutMapStartTime = xd.GetElementsByTagName("OutMapStartTime"); //获取Person子节点集合
                    XmlNodeList OutMapEndTime = xd.GetElementsByTagName("OutMapEndTime"); //获取Person子节点集合
                    XmlNodeList OutMapLONGITUDE = xd.GetElementsByTagName("OutMapLONGITUDE"); //获取Person子节点集合
                    XmlNodeList OutMapLATITUDE = xd.GetElementsByTagName("OutMapLATITUDE"); //获取Person子节点集合
                    XmlNodeList OutMapX = xd.GetElementsByTagName("OutMapX"); //获取Person子节点集合
                    XmlNodeList OutMapY = xd.GetElementsByTagName("OutMapY"); //获取Person子节点集合
                    XmlNodeList OutMapStatus = xd.GetElementsByTagName("OutMapStatus"); //获取Person子节点集合

                    //停留的节点
                    XmlNodeList StopID = xd.GetElementsByTagName("StopID"); //获取Person子节点集合
                    XmlNodeList StopCarID = xd.GetElementsByTagName("StopCarID"); //获取Person子节点集合
                    XmlNodeList StopStartTime = xd.GetElementsByTagName("StopStartTime"); //获取Person子节点集合
                    XmlNodeList StopEndTime = xd.GetElementsByTagName("StopEndTime"); //获取Person子节点集合
                    XmlNodeList StopLONGITUDE = xd.GetElementsByTagName("StopLONGITUDE"); //获取Person子节点集合
                    XmlNodeList StopLATITUDE = xd.GetElementsByTagName("StopLATITUDE"); //获取Person子节点集合
                    XmlNodeList StopX = xd.GetElementsByTagName("StopX"); //获取Person子节点集合
                    XmlNodeList StopY = xd.GetElementsByTagName("StopY"); //获取Person子节点集合
                    XmlNodeList StopStatus = xd.GetElementsByTagName("StopStatus"); //获取Person子节点集合

                    //停留的节点
                    XmlNodeList RestID = xd.GetElementsByTagName("RestID"); //获取Person子节点集合
                    XmlNodeList RestCarID = xd.GetElementsByTagName("RestCarID"); //获取Person子节点集合
                    XmlNodeList RestStartTime = xd.GetElementsByTagName("RestStartTime"); //获取Person子节点集合
                    XmlNodeList RestEndTime = xd.GetElementsByTagName("RestEndTime"); //获取Person子节点集合
                    XmlNodeList RestLONGITUDE = xd.GetElementsByTagName("RestLONGITUDE"); //获取Person子节点集合
                    XmlNodeList RestLATITUDE = xd.GetElementsByTagName("RestLATITUDE"); //获取Person子节点集合
                    XmlNodeList RestX = xd.GetElementsByTagName("RestX"); //获取Person子节点集合
                    XmlNodeList RestY = xd.GetElementsByTagName("RestY"); //获取Person子节点集合
                    XmlNodeList RestStatus = xd.GetElementsByTagName("RestStatus"); //获取Person子节点集合
                    #endregion

                    foreach (var list in Patrolists)
                    {
                        MapPoint CarPoint = new MapPoint();
                        List<MapPoint> fencePnts = new List<MapPoint>();

                        CarPoint.X = list.x84 != null ? (double)list.x84 : 0;//纬度
                        CarPoint.Y = list.y84 != null ? (double)list.y84 : 0;//经度

                        DateTime Stime = list.positiontime;

                        List<string> CarInspectionScope = ca.SelectInspectionScopeByNum(list.carid, Stime);

                        if (CarInspectionScope != null && CarInspectionScope.Count() > 0)
                        {
                            foreach (string item in CarInspectionScope)
                            {
                                var Scpoes = item.Split(';');
                                //获取巡查范围

                                foreach (var scpoe in Scpoes)
                                {
                                    if (!string.IsNullOrEmpty(scpoe))
                                    {
                                        MapPoint mp = new MapPoint();
                                        mp.X = double.Parse(scpoe.Split(',')[0]);
                                        mp.Y = double.Parse(scpoe.Split(',')[1]);
                                        fencePnts.Add(mp);
                                    }
                                }
                            }
                        }
                        bool rea = ca.PointInFences(CarPoint, fencePnts);//是否在区域内
                        if (rea == true)//是
                        {
                            //看看有没有越界需要结束的
                            if (!string.IsNullOrEmpty(OutMapEndTime[0].InnerText))
                            {
                                OutMapStatus[0].InnerText = "1";
                                xd.Save(file);
                                //把越界报警插入数据库,插入之后，吧xml里面的数据内容还原
                                //插入数据库
                                qw_alarmcarmemorylocationdatas model = new qw_alarmcarmemorylocationdatas()
                                {
                                    alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                                    alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    alarmtype = 2,
                                    createtime = DateTime.Now,
                                    gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    latitude = double.Parse(OutMapLATITUDE[0].InnerText),
                                    longitude = double.Parse(OutMapLONGITUDE[0].InnerText),
                                    carid = list.carid,
                                    //X = decimal.Parse(OutMapX[0].InnerText),
                                    //Y = decimal.Parse(OutMapY[0].InnerText)
                                };
                                ca.SaveAlarmList(model, OutMapID[0].InnerText);

                                //清除xml内容
                                OutMapID[0].InnerText = "";
                                OutMapCarID[0].InnerText = "";
                                OutMapStartTime[0].InnerText = ""; //获取Person子节点集合
                                OutMapEndTime[0].InnerText = ""; //获取Person子节点集合
                                OutMapLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                OutMapLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                OutMapX[0].InnerText = ""; //获取Person子节点集合
                                OutMapY[0].InnerText = ""; //获取Person子节点集合
                                OutMapStatus[0].InnerText = ""; //获取Person子节点集合
                                RestID[0].InnerText = "";
                                RestCarID[0].InnerText = "";
                                RestStartTime[0].InnerText = ""; //获取Person子节点集合
                                RestEndTime[0].InnerText = ""; //获取Person子节点集合
                                RestLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                RestLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                RestX[0].InnerText = ""; //获取Person子节点集合
                                RestY[0].InnerText = ""; //获取Person子节点集合
                                RestStatus[0].InnerText = ""; //获取Person子节点集合
                                StopID[0].InnerText = "";
                                StopCarID[0].InnerText = "";
                                StopStartTime[0].InnerText = ""; //获取Person子节点集合
                                StopEndTime[0].InnerText = ""; //获取Person子节点集合
                                StopLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                StopLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                StopX[0].InnerText = ""; //获取Person子节点集合
                                StopY[0].InnerText = ""; //获取Person子节点集合
                                StopStatus[0].InnerText = ""; //获取Person子节点集合
                                xd.Save(file);
                            }

                            //如果在区域内，再判断是否是停留报警。不在休息点内。
                            if (list.speed < 2)
                            {
                                if (string.IsNullOrEmpty(StopStartTime[0].InnerText))
                                {
                                    StopStartTime[0].InnerText = list.positiontime.ToString();
                                    StopLONGITUDE[0].InnerText = list.x84.ToString();
                                    StopLATITUDE[0].InnerText = list.y84.ToString();
                                    //StopX[0].InnerText = list.x2000.ToString();
                                    //StopY[0].InnerText = list.y2000.ToString();
                                }
                                else
                                {
                                    StopEndTime[0].InnerText = list.positiontime.ToString();
                                }
                                xd.Save(file);
                            }
                            else
                            {
                                if (!string.IsNullOrEmpty(StopStartTime[0].InnerText) && !string.IsNullOrEmpty(StopEndTime[0].InnerText))
                                {
                                    DateTime dt = DateTime.Parse(StopStartTime[0].InnerText);
                                    DateTime dtnew = DateTime.Parse(StopEndTime[0].InnerText);
                                    decimal diff = ca.DateDiff(dtnew, dt);
                                    if (diff > 15)
                                    {
                                        //大于15分钟，停留报警
                                        StopStatus[0].InnerText = "1";
                                        xd.Save(file);
                                        //插入数据库
                                        qw_alarmcarmemorylocationdatas model = new qw_alarmcarmemorylocationdatas()
                                        {
                                            alarmendtime = DateTime.Parse(StopEndTime[0].InnerText),
                                            alarmstrattime = DateTime.Parse(StopStartTime[0].InnerText),
                                            alarmtype = 1,
                                            createtime = DateTime.Now,
                                            gpstime = DateTime.Parse(StopStartTime[0].InnerText),
                                            latitude = double.Parse(StopLATITUDE[0].InnerText),
                                            longitude = double.Parse(StopLONGITUDE[0].InnerText),
                                            carid = list.carid,
                                            //X = decimal.Parse(StopX[0].InnerText),
                                            //Y = decimal.Parse(StopY[0].InnerText)
                                        };
                                        ca.SaveAlarmList(model, StopID[0].InnerText);
                                    }
                                    //清除xml里面的内容
                                    StopID[0].InnerText = "";
                                    StopCarID[0].InnerText = "";
                                    StopStartTime[0].InnerText = ""; //获取Person子节点集合
                                    StopEndTime[0].InnerText = ""; //获取Person子节点集合
                                    StopLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                                    StopLATITUDE[0].InnerText = ""; //获取Person子节点集合
                                    StopX[0].InnerText = ""; //获取Person子节点集合
                                    StopY[0].InnerText = ""; //获取Person子节点集合
                                    StopStatus[0].InnerText = ""; //获取Person子节点集合
                                    xd.Save(file);

                                }
                            }
                            RestID[0].InnerText = "";
                            RestCarID[0].InnerText = "";
                            RestStartTime[0].InnerText = ""; //获取Person子节点集合
                            RestEndTime[0].InnerText = ""; //获取Person子节点集合
                            RestLONGITUDE[0].InnerText = ""; //获取Person子节点集合
                            RestLATITUDE[0].InnerText = ""; //获取Person子节点集合
                            RestX[0].InnerText = ""; //获取Person子节点集合
                            RestY[0].InnerText = ""; //获取Person子节点集合
                            RestStatus[0].InnerText = ""; //获取Person子节点集合
                            xd.Save(file);
                            //}
                            //}
                        }
                        else
                        {
                            //如果不在区域内，则判断XML文件是否存在，如果不存在，则添加。否则判断XML文件里面的报警开始时间，如果是空的，则更新报警开始时间，否则更新报警结束时间。

                            if (string.IsNullOrEmpty(OutMapCarID[0].InnerText))
                            {
                                OutMapCarID[0].InnerText = list.carid.ToString();//人员ID如果是空的，则补上，否则还是原来的
                            }

                            if (string.IsNullOrEmpty(OutMapStartTime[0].InnerText))
                            {
                                OutMapStartTime[0].InnerText = list.positiontime.ToString();
                                OutMapLONGITUDE[0].InnerText = list.x84.ToString();
                                OutMapLATITUDE[0].InnerText = list.y84.ToString();
                                //OutMapX[0].InnerText = list.x2000.ToString();
                                //OutMapY[0].InnerText = list.y2000.ToString();
                            }
                            else
                            {
                                OutMapEndTime[0].InnerText = list.positiontime.ToString();
                            }
                            xd.Save(file);
                        }
                        ca.UpdateISANALYZE(list.carid, list.positiontime);
                        Console.WriteLine(list.carid + "---" + list.positiontime);
                    }

                    #region 若是存在越界或停留报警,则修改xml文件
                    xd.Load(file);
                    #region 获取节点数据
                    //越界的节点
                    OutMapID = xd.GetElementsByTagName("OutMapID"); //获取Person子节点集合
                    OutMapCarID = xd.GetElementsByTagName("OutMapCarID"); //获取Person子节点集合
                    OutMapStartTime = xd.GetElementsByTagName("OutMapStartTime"); //获取Person子节点集合
                    OutMapEndTime = xd.GetElementsByTagName("OutMapEndTime"); //获取Person子节点集合
                    OutMapLONGITUDE = xd.GetElementsByTagName("OutMapLONGITUDE"); //获取Person子节点集合
                    OutMapLATITUDE = xd.GetElementsByTagName("OutMapLATITUDE"); //获取Person子节点集合
                    OutMapX = xd.GetElementsByTagName("OutMapX"); //获取Person子节点集合
                    OutMapY = xd.GetElementsByTagName("OutMapY"); //获取Person子节点集合
                    OutMapStatus = xd.GetElementsByTagName("OutMapStatus"); //获取Person子节点集合


                    StopID = xd.GetElementsByTagName("StopID"); //获取Person子节点集合
                    StopCarID = xd.GetElementsByTagName("StopCarID"); //获取Person子节点集合
                    StopStartTime = xd.GetElementsByTagName("StopStartTime"); //获取Person子节点集合
                    StopEndTime = xd.GetElementsByTagName("StopEndTime"); //获取Person子节点集合
                    StopLONGITUDE = xd.GetElementsByTagName("StopLONGITUDE"); //获取Person子节点集合
                    StopLATITUDE = xd.GetElementsByTagName("StopLATITUDE"); //获取Person子节点集合
                    StopX = xd.GetElementsByTagName("StopX"); //获取Person子节点集合
                    StopY = xd.GetElementsByTagName("StopY"); //获取Person子节点集合
                    StopStatus = xd.GetElementsByTagName("StopStatus"); //获取Person子节点集合


                    RestID = xd.GetElementsByTagName("RestID"); //获取Person子节点集合
                    RestCarID = xd.GetElementsByTagName("RestCarID"); //获取Person子节点集合
                    RestStartTime = xd.GetElementsByTagName("RestStartTime"); //获取Person子节点集合
                    RestEndTime = xd.GetElementsByTagName("RestEndTime"); //获取Person子节点集合
                    RestLONGITUDE = xd.GetElementsByTagName("RestLONGITUDE"); //获取Person子节点集合
                    RestLATITUDE = xd.GetElementsByTagName("RestLATITUDE"); //获取Person子节点集合
                    RestX = xd.GetElementsByTagName("RestX"); //获取Person子节点集合
                    RestY = xd.GetElementsByTagName("RestY"); //获取Person子节点集合
                    RestStatus = xd.GetElementsByTagName("RestStatus"); //获取Person子节点集合

                    #endregion
                    if (!string.IsNullOrEmpty(OutMapEndTime[0].InnerText))
                    {
                        qw_alarmcarmemorylocationdatas model = new qw_alarmcarmemorylocationdatas()
                        {
                            alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                            alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                            alarmtype = 2,
                            createtime = DateTime.Now,
                            gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                            latitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                            longitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                            carid = (int)carlist.carid
                        };
                        decimal NEWID = ca.SaveAlarmList(model, OutMapID[0].InnerText);
                        OutMapID[0].InnerText = NEWID.ToString();
                        xd.Save(file);
                    }

                    if (!string.IsNullOrEmpty(StopEndTime[0].InnerText))
                    {
                        DateTime dt = DateTime.Parse(StopStartTime[0].InnerText);
                        DateTime dtnew = DateTime.Parse(StopEndTime[0].InnerText);
                        decimal diff = ca.DateDiff(dtnew, dt);
                        if (diff > 15)
                        {
                            qw_alarmcarmemorylocationdatas model = new qw_alarmcarmemorylocationdatas()
                            {
                                alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                                alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                alarmtype = 1,
                                createtime = DateTime.Now,
                                gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                latitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                longitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                carid = (int)carlist.carid
                            };
                            decimal NEWID = ca.SaveAlarmList(model, StopID[0].InnerText);
                            StopID[0].InnerText = NEWID.ToString();
                            xd.Save(file);
                        }

                        if (!string.IsNullOrEmpty(RestEndTime[0].InnerText))
                        {
                            DateTime dt1 = DateTime.Parse(RestStartTime[0].InnerText);
                            DateTime dtnew1 = DateTime.Parse(RestEndTime[0].InnerText);
                            decimal diff1 = ca.DateDiff(dtnew1, dt1);
                            if (diff1 > 30)
                            {
                                qw_alarmcarmemorylocationdatas model = new qw_alarmcarmemorylocationdatas()
                                {
                                    alarmendtime = DateTime.Parse(OutMapEndTime[0].InnerText),
                                    alarmstrattime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    alarmtype = 1,
                                    createtime = DateTime.Now,
                                    gpstime = DateTime.Parse(OutMapStartTime[0].InnerText),
                                    latitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                    longitude = Convert.ToDouble(OutMapLATITUDE[0].InnerText),
                                    carid = (int)carlist.carid
                                };
                                decimal NEWID = ca.SaveAlarmList(model, RestID[0].InnerText);
                                RestID[0].InnerText = NEWID.ToString();
                                xd.Save(file);
                            }
                        }
                    }
                    #endregion 

                }
                catch (Exception)
                {

                    throw;
                }

            }

        }

        /// <summary>
        /// 车辆离线
        /// </summary>
        public void CARLxAlarmDetail()
        {
            //存放读取的记录
            List<AlarmList> Patrolists = new List<AlarmList>();

            //查询所有任务
            List<qw_cartasks> TIC = ca.GetAllCarTaskAreas().Where(a => a.taskstarttime.Year == time.Year && a.taskstarttime.Month == time.Month && a.taskstarttime.Day == time.Day).ToList();

            //报警处理
            foreach (var list in TIC)
            {
                DateTime? Offlinetime = null;
                try
                {
                    if (list.taskendtime >= time && list.taskstarttime <= time)
                    {
                        //查询最后一次定位表
                        qw_carlastpositions list_cartaskarears = ca.GetAllCarLatestPositions(decimal.Parse(list.carid.ToString())).FirstOrDefault(); //修改。
                        if (list_cartaskarears != null)
                        {
                            DateTime? lasttime = list_cartaskarears.positiontime;
                            if (Offlinetime == null)
                            {
                                Offlinetime = DateTime.Parse("0001-01-01 00:00:00");
                            }
                            if (ca.DateDiff(DateTime.Parse(time.ToString()), DateTime.Parse(list_cartaskarears.positiontime.ToString())) >= 15)
                            {
                                AlarmList al = new AlarmList();
                                if (list.taskstarttime != null && list.taskstarttime.Year == time.Year && list.taskstarttime.Month == time.Month && list.taskstarttime.Day == time.Day)
                                {
                                    if (Offlinetime != lasttime)
                                    {
                                        //离线报警
                                        if (lasttime != null && lasttime.Value.Year == time.Year && lasttime.Value.Month == time.Month && lasttime.Value.Day == time.Day)
                                        {
                                            al.ALARMSTRATTIME = lasttime;
                                            Offlinetime = lasttime;
                                        }
                                        else
                                        {
                                            al.ALARMSTRATTIME = list.taskstarttime;
                                            Offlinetime = lasttime;
                                        }

                                        al.CARID = (int)list.carid;
                                        al.X = (double)list_cartaskarears.x84;
                                        al.Y = (double)list_cartaskarears.y84;
                                        al.ALARMOVER = 1;
                                        al.ALARMENDTIME = time;
                                        al.ALARMTYPE = 3;
                                        al.GPSTIME = time;
                                        al.CREATETIME = DateTime.Now;

                                        ca.SaveAlarmList(al);
                                        Console.WriteLine("超过15分钟离线报警，车辆编号" + al.CARID);
                                    }
                                }
                            }
                        }
                        else
                        {
                            DateTime? lasttime = DateTime.Now;
                            if (Offlinetime == null)
                            {
                                Offlinetime = DateTime.Parse("0001-01-01 00:00:00");
                            }
                            AlarmList al = new AlarmList();
                            if (list.taskstarttime != null && list.taskstarttime.Year == time.Year && list.taskstarttime.Month == time.Month && list.taskstarttime.Day == time.Day)
                            {
                                if (Offlinetime != lasttime)
                                {
                                    //离线报警
                                    if (lasttime != null && lasttime.Value.Year == time.Year && lasttime.Value.Month == time.Month && lasttime.Value.Day == time.Day)
                                    {
                                        al.ALARMSTRATTIME = lasttime;
                                        Offlinetime = lasttime;
                                    }
                                    else
                                    {
                                        al.ALARMSTRATTIME = list.taskstarttime;
                                        Offlinetime = lasttime;
                                    }
                                    al.CARID = (int)list.carid;
                                    al.ALARMOVER = 1;
                                    al.ALARMENDTIME = time;
                                    al.ALARMTYPE = 3;
                                    al.GPSTIME = time;
                                    al.CREATETIME = DateTime.Now;

                                    ca.SaveAlarmList(al);
                                    Console.WriteLine("超过15分钟离线报警，车辆编号" + al.CARID);
                                }
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
}
