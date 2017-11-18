using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace JXXZ.WTService
{
    public partial class WTService : ServiceBase
    {
        [DllImport("DPSDK_Core.dll", CharSet = CharSet.Ansi)]
        private extern static IntPtr DPSDK_Login(IntPtr nPDLLHandle, ref Login_Info_t pLoginInfo, IntPtr nTimeout);

        [DllImport("DPSDK_Core.dll", CharSet = CharSet.Ansi)]
        private extern static IntPtr DPSDK_LoadDGroupInfo(IntPtr nPDLLHandle, ref IntPtr nGroupLen, IntPtr nTimeout);

        [DllImport("DPSDK_Core.dll", CharSet = CharSet.Ansi)]
        private extern static IntPtr DPSDK_Create(dpsdk_sdk_type_e nType, ref IntPtr nPDLLHandle);

        [DllImport("DPSDK_Ext.dll", CharSet = CharSet.Ansi)]
        private extern static IntPtr DPSDK_InitExt();

        [DllImport("DPSDK_Core.dll", CharSet = CharSet.Ansi)]
        private extern static IntPtr DPSDK_SetLog(IntPtr nPDLLHandle, dpsdk_log_level_e nLevel, [MarshalAs(UnmanagedType.LPStr)] string szFilename, Boolean bScreen, Boolean bDebugger);

        [DllImport("DPSDK_Core.dll", CharSet = CharSet.Ansi)]
        private extern static IntPtr DPSDK_StartMonitor(IntPtr nPDLLHandle, [MarshalAs(UnmanagedType.LPStr)] string szFilename);

        [DllImport("DPSDK_Core.dll", CharSet = CharSet.Ansi)]
        private extern static IntPtr DPSDK_SetDPSDKTrafficAlarmCallback(IntPtr nPDLLHandle, fDPSDKTrafficAlarmCallback pFun, IntPtr pUser);

        public IntPtr nPDLLHandle = (IntPtr)0;
        public IntPtr nGroupLen = IntPtr.Zero;

        public WTService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            //DPSDK_Login
            Login_Info_t loginInfo = new Login_Info_t();
            loginInfo.szIp = "10.200.13.137";
            loginInfo.nPort = (uint)9000;
            loginInfo.szUsername = "admin";
            loginInfo.szPassword = "admin";
            loginInfo.nProtocol = dpsdk_protocol_version_e.DPSDK_PROTOCOL_VERSION_II;
            loginInfo.iType = 1;
            IntPtr result1 = DPSDK_Create(dpsdk_sdk_type_e.DPSDK_CORE_SDK_SERVER, ref this.nPDLLHandle);//初始化数据交互接口
            IntPtr result2 = DPSDK_InitExt();//初始化解码播放接口
            if (result1 == (IntPtr)0 && result2 == (IntPtr)0)
            {
                //MessageBox.Show("初始化成功");
                IntPtr result = (IntPtr)10;
                //设置日志路径，运行程序自动在D盘生成日志
                result = DPSDK_SetLog(nPDLLHandle, dpsdk_log_level_e.DPSDK_LOG_LEVEL_DEBUG, "C:\\JXXZ\\DPSDK_LOG", false, false);
                //崩溃自动生成dmp文件
                result = DPSDK_StartMonitor(nPDLLHandle, "DPSDK_Dump");
                IntPtr pUser = default(IntPtr);

                fTrafficAlarmCallback = DPSDKTrafficAlarmCallback;
                result = DPSDK_SetDPSDKTrafficAlarmCallback(nPDLLHandle, fTrafficAlarmCallback, pUser);
                if (result == (IntPtr)0)
                {
                    //MessageBox.Show("设置违章报警回调成功");
                    WriteLog("设置违章报警回调成功");
                }
                else
                {
                    //return err
                    WriteLog("设置违章报警回调失败，错误码：" + result.ToString());
                }
                //MessageBox.Show("登录成功");
                //DPSDK_LoadDGroupInfo
                IntPtr LoginResult = DPSDK_Login(this.nPDLLHandle, ref loginInfo, (IntPtr)10000);
                if (LoginResult == (IntPtr)0)
                {
                    WriteLog("登录成功");
                    IntPtr GroupResult = DPSDK_LoadDGroupInfo(nPDLLHandle, ref nGroupLen, (IntPtr)60000);
                    if (GroupResult == (IntPtr)0)
                    {
                        // MessageBox.Show("加载组织结构成功");
                        WriteLog("加载组织结构成功");
                    }
                    else
                    {
                        //return err
                        WriteLog("加载组织结构失败，错误码：" + GroupResult.ToString());
                    }

                }
                else
                {
                    WriteLog("登录失败，错误码：" + LoginResult.ToString());
                }

            }
            else
            {
                //return err
                WriteLog("初始化失败");

            }
        }

        IntPtr DPSDKTrafficAlarmCallback(IntPtr nPDLLHandle, ref Traffic_Alarm_Info_t pRetInfo, IntPtr pUserParam)
        {
            try
            {
                string szCameraId = pRetInfo.szCameraId;
                dpsdk_alarm_type_e nAlarmType = pRetInfo.type;
                string szCarNum = get_uft8(pRetInfo.szCarNum);
                int nCarColor = pRetInfo.nCarColor;
                Pic_Url_t[] szPicUrl = new Pic_Url_t[6];

                StringBuilder sb = new StringBuilder();
                sb.Append("{");
                sb.Append("szCameraId:\"" + szCameraId + "\"");
                sb.Append(",szCarNum:\"" + szCarNum + "\"");
                WriteLog("\r\n" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "szCameraId:" + szCameraId + ",szCarNum:" + szCarNum);
                for (int i = 0; i < 6; i++)
                {
                    szPicUrl[i].szPicUrl = get_uft8(pRetInfo.szPicUrl[i].szPicUrl);
                    if (string.IsNullOrEmpty(szPicUrl[i].szPicUrl))
                    {
                        continue;
                    }
                    string url = "http://10.200.13.137:8081" + szPicUrl[i].szPicUrl.Substring(4, szPicUrl[i].szPicUrl.Length - 4);

                    byte[] bt = getByte(url);
                    string btstring = Convert.ToBase64String(bt);
                    sb.Append(",photo" + (i + 1) + ":\"" + btstring + "\"");

                    WriteLog("\r\n" + url);
                }
                sb.Append("}");

                int nAlarmTime = pRetInfo.nAlarmTime;
                string szDeviceName = get_uft8(pRetInfo.szDeviceName);
                string szDeviceChnName = get_uft8(pRetInfo.szDeviceChnName);

                string result = HttpPost("http://172.16.65.133:8099/api/Violated/AddWTByCamera", sb.ToString());
                WriteLog(result);
            }
            catch (Exception e)
            {
                WriteLog(e.Message);
            }

            //byte[] btArr = Encoding.Default.GetBytes(str);
            //Encoding ecLastCode = Encoding.GetEncoding("utf-8");
            //string lastCode = ecLastCode.GetString(btArr);
            //MessageBox.Show(lastCode);

            return (IntPtr)0;
        }

        public string HttpPost(string url, string body)
        {
            //ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(CheckValidationResult);
            Encoding encoding = Encoding.UTF8;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.Accept = "text/html, application/xhtml+xml, */*";
            request.ContentType = "application/json";

            byte[] buffer = encoding.GetBytes(body);
            request.ContentLength = buffer.Length;
            request.GetRequestStream().Write(buffer, 0, buffer.Length);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        /// <summary>
        /// 获取网络图片流 
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        private byte[] getByte(string url)
        {

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream stream = response.GetResponseStream();

            var ms = StreamToMemoryStream(stream);
            // 设置当前流的位置为流的开始
            ms.Seek(0, SeekOrigin.Begin);
            int buffsize = (int)ms.Length;
            byte[] bytes = new byte[buffsize];

            ms.Read(bytes, 0, buffsize);
            ms.Flush(); ms.Close();
            stream.Flush(); stream.Close();
            return bytes;
        }

        MemoryStream StreamToMemoryStream(Stream instream)
        {
            MemoryStream outstream = new MemoryStream();
            const int bufferLen = 4096;
            byte[] buffer = new byte[bufferLen];
            int count = 0;
            while ((count = instream.Read(buffer, 0, bufferLen)) > 0)
            {
                outstream.Write(buffer, 0, count);
            }
            return outstream;
        }

        /// <summary>
        /// 编码转换
        /// </summary>
        /// <param name="unicodeString"></param>
        /// <returns></returns>
        public static string get_uft8(string unicodeString)
        {
            //Encoding unicode = Encoding.Unicode;
            //Encoding utf_8 = Encoding.GetEncoding("UTF-8");
            //byte[] unicodeBytes = unicode.GetBytes(unicodeString);
            //byte[] utf8Bytes = Encoding.Convert(unicode, utf_8, unicodeBytes);
            //string value = utf_8.GetString(utf8Bytes);
            //return value;
            byte[] utf8bytes = System.Text.Encoding.Default.GetBytes(unicodeString);
            return System.Text.Encoding.UTF8.GetString(utf8bytes);

        }

        /// <summary>
        /// 写入日志文件
        /// </summary>
        /// <param name="message"></param>
        public void WriteLog(string message)
        {
            DateTime dt = DateTime.Now;
            string path = "C:\\JXXZ\\WTLog\\" + dt.Year + "\\" + dt.ToString("yyyy-MM");
            if (Directory.Exists(path) == false)
            {
                Directory.CreateDirectory(path);
            }
            FileStream fs = new FileStream(path + "\\" + dt.ToString("yyyy-MM-dd") + ".txt", FileMode.OpenOrCreate);
            //获得字节数组
            byte[] data = System.Text.Encoding.Default.GetBytes(message);

            fs.Position = fs.Length;

            //开始写入
            fs.Write(data, 0, data.Length);
            //清空缓冲区、关闭流
            fs.Flush();
            fs.Close();
        }


        protected override void OnStop()
        {
        }

        /// <summary>
        /// 登录信息
        /// </summary>
        public struct Login_Info_t
        {
            /// <summary>
            /// 服务IP
            /// </summary>
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 46)]
            public string szIp;
            /// <summary>
            /// 服务端口
            /// </summary>
            public uint nPort;
            /// <summary>
            /// 用户名
            /// </summary>
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)]
            public string szUsername;
            /// <summary>
            /// 密码
            /// </summary>
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)]
            public string szPassword;
            /// <summary>
            /// 协议库类型
            /// </summary>
            public dpsdk_protocol_version_e nProtocol;
            /// <summary>
            /// 登陆类型，1为PC客户端, 2为手机客户端
            /// </summary>
            public uint iType;
        }

        public enum dpsdk_protocol_version_e
        {
            /// <summary>
            /// 一代协议
            /// </summary>
            DPSDK_PROTOCOL_VERSION_I = 1,
            /// <summary>
            /// 二代协议
            /// </summary>
            DPSDK_PROTOCOL_VERSION_II = 2,
        }

        public enum dpsdk_sdk_type_e
        {
            /// <summary>
            /// 服务模式使用
            /// </summary>
            DPSDK_CORE_SDK_SERVER = 1
        }

        // 日志等级
        public enum dpsdk_log_level_e
        {
            DPSDK_LOG_LEVEL_DEBUG = 2,					// 调试
            DPSDK_LOG_LEVEL_INFO = 4,					// 信息
            DPSDK_LOG_LEVEL_ERROR = 6,					// 错误
        }

        //违章报警回调
        public delegate IntPtr fDPSDKTrafficAlarmCallback(IntPtr nPDLLHandle, ref Traffic_Alarm_Info_t pRetInfo, IntPtr pUserParam);

        public static fDPSDKTrafficAlarmCallback fTrafficAlarmCallback;

        //违章报警信息
        [StructLayout(LayoutKind.Sequential)]
        public struct Traffic_Alarm_Info_t
        {
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)]
            public string szCameraId;                 // 通道ID
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)]
            public string nPtsIp;                     // pts内网
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)]
            public string nPtsIpy;                    // pts外网
            public int nPicPort;                   // pic内网port
            public int nPicPorty;                  // pic外网port
            public dpsdk_alarm_type_e type;                       // 违章类型
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)]
            public string szCarNum;                   // 车牌
            public int nLicentype;                 // 车牌颜色类型
            public int nCarColor;					// 车身颜色
            public int nCarLogo;					// 车标类型
            public int nWay;						// 车道号
            [MarshalAs(UnmanagedType.ByValArray, ArraySubType = UnmanagedType.Struct, SizeConst = 6)]
            public Pic_Url_t[] szPicUrl;                   // 图片URL
            public UInt32 nPicGroupStoreID;           // 图片组存储ID
            public int bNeedStore;					// 是否需存盘 0：不需存盘 1：需存盘
            public int bStored;					// 是否已存盘 0：未存盘 1：已存盘int	
            public int nAlarmLevel;				// 报警级别
            public int nAlarmTime;                 // 报警发生时间,精度为秒，值为time(NULL)值

            //新增字段
            public int nChannel;                   // 通道
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)]
            public string szDeviceId;                 // 设备ID
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)]
            public string szDeviceName;               // 设备名称
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)]
            public string szDeviceChnName;            // 通道名称
            public int nCarType;                   // 车类型
            public int nCarSpeed;                  // 车速
            public int nCarLen;                    // 车身长度单位
            public int nCardirect;                 // 行车方向
            public int nMaxSpeed;                  // 限制速度
            public int nMinSpeed;                  // 最低限制速度
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)]
            public int[] nRtPlate;                   // 车牌坐标
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct Pic_Url_t
        {
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 1024)]
            public string szPicUrl;                                 // 图片URL
        }

        public enum dpsdk_alarm_type_e
        {
            DPSDK_CORE_ALARM_TYPE_Unknown = 0,				                      // 未知
            DPSDK_CORE_ALARM_TYPE_VIDEO_LOST = 1,								 // 视频丢失
            DPSDK_CORE_ALARM_TYPE_EXTERNAL_ALARM = 2,							 // 外部报警
            DPSDK_CORE_ALARM_TYPE_MOTION_DETECT,								 // 移动侦测
            DPSDK_CORE_ALARM_TYPE_VIDEO_SHELTER,								 // 视频遮挡
            DPSDK_CORE_ALARM_TYPE_DISK_FULL,									 // 硬盘满
            DPSDK_CORE_ALARM_TYPE_DISK_FAULT,									 // 硬盘故障
            DPSDK_CORE_ALARM_TYPE_FIBER,										 // 光纤报警
            DPSDK_CORE_ALARM_TYPE_GPS,											 // GPS信息
            DPSDK_CORE_ALARM_TYPE_3G,											 // 3G
            DPSDK_CORE_ALARM_TYPE_STATUS_RECORD,								 // 设备录像状态
            DPSDK_CORE_ALARM_TYPE_STATUS_DEVNAME,								 // 设备名
            DPSDK_CORE_ALARM_TYPE_STATUS_DISKINFO,								 // 硬盘信息
            DPSDK_CORE_ALARM_TYPE_IPC_OFF,										 // 前端IPC断线

            //门禁
            DPSDK_CORE_ALARM_DOOR_BEGIN = 40,		    	     // 门禁设备报警起始
            DPSDK_CORE_ALARM_FORCE_CARD_OPENDOOR = 41,				     // 胁迫刷卡开门
            DPSDK_CORE_ALARM_VALID_PASSWORD_OPENDOOR = 42,				     // 合法密码开门
            DPSDK_CORE_ALARM_INVALID_PASSWORD_OPENDOOR = 43,				     // 非法密码开门
            DPSDK_CORE_ALARM_FORCE_PASSWORD_OPENDOOR = 44,				     // 胁迫密码开门
            DPSDK_CORE_ALARM_VALID_FINGERPRINT_OPENDOOR = 45,			         // 合法指纹开门
            DPSDK_CORE_ALARM_INVALID_FINGERPRINT_OPENDOOR = 46,				 // 非法指纹开门
            DPSDK_CORE_ALARM_FORCE_FINGERPRINT_OPENDOOR = 47,				     // 胁迫指纹开门

            DPSDK_CORE_ALARM_TYPE_VALID_CARD_READ = 51,				     // 合法刷卡/开门
            DPSDK_CORE_ALARM_TYPE_INVALID_CARD_READ,							 // 非法刷卡/开门
            DPSDK_CORE_ALARM_TYPE_DOOR_MAGNETIC_ERROR,							 // 门磁报警
            DPSDK_CORE_ALARM_TYPE_DOOR_BREAK,									 // 破门报警和开门超时报警
            DPSDK_CORE_ALARM_TYPE_DOOR_ABNORMAL_CLOSED,							 // 门非正常关闭
            DPSDK_CORE_ALARM_TYPE_DOOR_NORMAL_CLOSED,							 // 门正常关闭
            DPSDK_CORE_ALARM_TYPE_DOOR_OPEN,									 // 门打开

            DPSDK_CORE_ALARM_DOOR_OPEN_TIME_OUT_BEG = 60,
            DPSDK_CORE_ALARM_DOOR_OPEN_TIME_OUT_END = 70,

            //报警主机
            DPSDK_CORE_ALARM_TYPE_ALARM_CONTROL_ALERT = 81,				     // 报警主机报警
            DPSDK_CORE_ALARM_TYPE_FIRE_ALARM,									 // 火警
            DPSDK_CORE_ALARM_TYPE_ZONE_DISABLED,								 // 防区失效
            DPSDK_CORE_ALARM_TYPE_BATTERY_EMPTY,								 // 电池没电

            DPSDK_CORE_ALARM_FILESYSTEM = 100,					 // 文件系统
            DPSDK_CORE_ALARM_RAID_FAULT,										 // raid故障
            DPSDK_CORE_ALARM_RECORDCHANNELFUNCTION_ABNORMAL,					 // 录像通道功能异常
            DPSDK_CORE_SVR_HARDDISK_STATUS,										 // 硬盘状态
            DPSDK_CORE_ALARM_RECORD_REPAIR,										 // 录像补全 -P3.0

            //-M的相关报警在这里添加
            DPSDK_CORE_ALARM_MOTOR_BEGIN = 200,
            DPSDK_CORE_ALARM_OVERSPEED_OCCURE = 201, 			     // 超速报警产生
            DPSDK_CORE_ALARM_OVERSPEED_DISAPPEAR,  								 // 超速报警消失
            DPSDK_CORE_ALARM_DRIVEROUT_DRIVERALLOW,								 // 驶出行区
            DPSDK_CORE_ALARM_DRIVERIN_DRIVERALLOW,								 // 驶入行区
            DPSDK_CORE_ALARM_DRIVEROUT_FORBIDDRIVE,								 // 驶出禁入区
            DPSDK_CORE_ALARM_DRIVERIN_FORBIDDRIVE,								 // 驶入禁入区
            DPSDK_CORE_ALARM_DRIVEROUT_LOADGOODS,								 // 驶出装货区
            DPSDK_CORE_ALARM_DRIVERIN_LOADGOODS,								 // 驶入装货区
            DPSDK_CORE_ALARM_DRIVEROUT_UNLOADGOODS,								 // 驶出卸货区
            DPSDK_CORE_ALARM_DRIVERIN_UNLOADGOODS,								 // 驶入卸货区
            DPSDK_CORE_ALARM_CAR_OVER_LOAD,										 // 超载
            DPSDK_CORE_ALARM_SPEED_SOON_ZERO,									 // 急刹车
            DPSDK_CORE_ALARM_3GFLOW,											 // 3G流量
            DPSDK_CORE_ALARM_AAC_POWEROFF,										 // ACC断电报警
            DPSDK_CORE_ALARM_SPEEDLIMIT_LOWERSPEED,								 // 限速报警 LowerSpeed
            DPSDK_CORE_ALARM_SPEEDLIMIT_UPPERSPEED,								 // 限速报警 UpperSpeed 
            DPSDK_CORE_ALARM_VEHICLEINFOUPLOAD_CHECKIN,							 // 车载自定义信息上传 CheckIn
            DPSDK_CORE_ALARM_VEHICLEINFOUPLOAD_CHECKOUT,						 // 车载自定义信息上传 CheckOut
            DPSDK_CORE_ALARM_GAS_LOWLEVEL = 236,				 // 油耗报警
            DPSDK_CORE_ALARM_MOTOR_END = 300,

            //智能报警
            DPSDK_CORE_ALARM_IVS_ALARM_BEGIN = 300,				 // 智能设备报警类型在dhnetsdk.h基础上+300（DMS服务中添加）
            DPSDK_CORE_ALARM_IVS_ALARM,											 // 智能设备报警
            DPSDK_CORE_ALARM_CROSSLINEDETECTION,								 // 警戒线事件
            DPSDK_CORE_ALARM_CROSSREGIONDETECTION,								 // 警戒区事件
            DPSDK_CORE_ALARM_PASTEDETECTION,									 // 贴条事件
            DPSDK_CORE_ALARM_LEFTDETECTION,										 // 物品遗留事件
            DPSDK_CORE_ALARM_STAYDETECTION,										 // 停留事件
            DPSDK_CORE_ALARM_WANDERDETECTION,									 // 徘徊事件
            DPSDK_CORE_ALARM_PRESERVATION,										 // 物品保全事件
            DPSDK_CORE_ALARM_MOVEDETECTION,										 // 移动事件
            DPSDK_CORE_ALARM_TAILDETECTION,										 // 尾随事件
            DPSDK_CORE_ALARM_RIOTERDETECTION,									 // 聚众事件
            DPSDK_CORE_ALARM_FIREDETECTION,										 // 火警事件
            DPSDK_CORE_ALARM_SMOKEDETECTION,									 // 烟雾报警事件
            DPSDK_CORE_ALARM_FIGHTDETECTION,									 // 斗殴事件
            DPSDK_CORE_ALARM_FLOWSTAT,											 // 流量统计事件
            DPSDK_CORE_ALARM_NUMBERSTAT,										 // 数量统计事件
            DPSDK_CORE_ALARM_CAMERACOVERDDETECTION,								 // 摄像头覆盖事件
            DPSDK_CORE_ALARM_CAMERAMOVEDDETECTION,								 // 摄像头移动事件
            DPSDK_CORE_ALARM_VIDEOABNORMALDETECTION,							 // 视频异常事件
            DPSDK_CORE_ALARM_VIDEOBADDETECTION,									 // 视频损坏事件
            DPSDK_CORE_ALARM_TRAFFICCONTROL,									 // 交通管制事件
            DPSDK_CORE_ALARM_TRAFFICACCIDENT,									 // 交通事故事件
            DPSDK_CORE_ALARM_TRAFFICJUNCTION,									 // 交通路口事件
            DPSDK_CORE_ALARM_TRAFFICGATE,										 // 交通卡口事件
            DPSDK_CORE_ALARM_TRAFFICSNAPSHOT,									 // 交通抓拍事件
            DPSDK_CORE_ALARM_FACEDETECT,										 // 人脸检测事件 
            DPSDK_CORE_ALARM_TRAFFICJAM,										 // 交通拥堵事件

            DPSDK_CORE_ALARM_TRAFFIC_RUNREDLIGHT = 0x00000100 + 300,	 // 交通违章-闯红灯事件
            DPSDK_CORE_ALARM_TRAFFIC_OVERLINE = 0x00000101 + 300,	 // 交通违章-压车道线事件
            DPSDK_CORE_ALARM_TRAFFIC_RETROGRADE = 0x00000102 + 300,	 // 交通违章-逆行事件
            DPSDK_CORE_ALARM_TRAFFIC_TURNLEFT = 0x00000103 + 300,	 // 交通违章-违章左转
            DPSDK_CORE_ALARM_TRAFFIC_TURNRIGHT = 0x00000104 + 300,	 // 交通违章-违章右转
            DPSDK_CORE_ALARM_TRAFFIC_UTURN = 0x00000105 + 300,	 // 交通违章-违章掉头
            DPSDK_CORE_ALARM_TRAFFIC_OVERSPEED = 0x00000106 + 300,	 // 交通违章-超速
            DPSDK_CORE_ALARM_TRAFFIC_UNDERSPEED = 0x00000107 + 300,	 // 交通违章-低速
            DPSDK_CORE_ALARM_TRAFFIC_PARKING = 0x00000108 + 300,	 // 交通违章-违章停车
            DPSDK_CORE_ALARM_TRAFFIC_WRONGROUTE = 0x00000109 + 300,	 // 交通违章-不按车道行驶
            DPSDK_CORE_ALARM_TRAFFIC_CROSSLANE = 0x0000010A + 300,	 // 交通违章-违章变道
            DPSDK_CORE_ALARM_TRAFFIC_OVERYELLOWLINE = 0x0000010B + 300,	 // 交通违章-压黄线
            DPSDK_CORE_ALARM_TRAFFIC_DRIVINGONSHOULDER = 0x0000010C + 300,	 // 交通违章-路肩行驶事件  
            DPSDK_CORE_ALARM_TRAFFIC_YELLOWPLATEINLANE = 0x0000010E + 300,	 // 交通违章-黄牌车占道事件
            DPSDK_CORE_ALARM_CROSSFENCEDETECTION = 0x0000011F + 300,	 // 翻越围栏事件
            DPSDK_CORE_ALARM_ELECTROSPARKDETECTION = 0X00000110 + 300,	 // 电火花事件
            DPSDK_CORE_ALARM_TRAFFIC_NOPASSING = 0x00000111 + 300,	 // 交通违章-禁止通行事件
            DPSDK_CORE_ALARM_ABNORMALRUNDETECTION = 0x00000112 + 300,	 // 异常奔跑事件
            DPSDK_CORE_ALARM_RETROGRADEDETECTION = 0x00000113 + 300,	 // 人员逆行事件
            DPSDK_CORE_ALARM_INREGIONDETECTION = 0x00000114 + 300,	 // 区域内检测事件
            DPSDK_CORE_ALARM_TAKENAWAYDETECTION = 0x00000115 + 300,	 // 物品搬移事件
            DPSDK_CORE_ALARM_PARKINGDETECTION = 0x00000116 + 300,	 // 非法停车事件
            DPSDK_CORE_ALARM_FACERECOGNITION = 0x00000117 + 300,	 // 人脸识别事件
            DPSDK_CORE_ALARM_TRAFFIC_MANUALSNAP = 0x00000118 + 300,	 // 交通手动抓拍事件
            DPSDK_CORE_ALARM_TRAFFIC_FLOWSTATE = 0x00000119 + 300,	 // 交通流量统计事件
            DPSDK_CORE_ALARM_TRAFFIC_STAY = 0x0000011A + 300,	 // 交通滞留事件
            DPSDK_CORE_ALARM_TRAFFIC_VEHICLEINROUTE = 0x0000011B + 300,	 // 有车占道事件
            DPSDK_CORE_ALARM_MOTIONDETECT = 0x0000011C + 300,	 // 视频移动侦测事件
            DPSDK_CORE_ALARM_LOCALALARM = 0x0000011D + 300,	 // 外部报警事件
            DPSDK_CORE_ALARM_PRISONERRISEDETECTION = 0X0000011E + 300,	 // 看守所囚犯起身事件
            DPSDK_CORE_ALARM_IVS_B_ALARM_END,									 // 以上报警都为IVS_B服务的报警类型，与SDK配合
            DPSDK_CORE_ALARM_VIDEODIAGNOSIS = 0X00000120 + 300,	 // 视频诊断结果事件

            //新增智能报警start
            DPSDK_CORE_ALARM_IVS_AUDIO_ABNORMALDETECTION = 0x00000126 + 300,		// 声音异常检测
            DPSDK_CORE_ALARM_CLIMB_UP = 0x00000128 + 300,		// 攀高检测 
            DPSDK_CORE_ALARM_LEAVE_POST = 0x00000129 + 300,		// 离岗检测
            //新增智能报警End

            DPSDK_CORE_ALARM_IVS_V_ALARM = DPSDK_CORE_ALARM_VIDEODIAGNOSIS,	// 
            DPSDK_CORE_ALARM_IVS_ALARM_END = 1000,				 // 智能设备报警类型的范围为300-1000
            DPSDK_CORE_ALARM_OSD,												 // osd信息
            DPSDK_CORE_ALARM_CROSS_INFO,										 // 十字路口

            DPSDK_CORE_ALARM_CLIENT_ALARM_BEGIN = 1100,				 // 客户端平台报警开始
            DPSDK_CORE_ALARM_CLIENT_DERELICTION,								 // 遗留检测[交通事件-抛洒物]
            DPSDK_CORE_ALARM_CLIENT_RETROGRADATION,								 // 逆行 [交通事件]
            DPSDK_CORE_ALARM_CLIENT_OVERSPEED,									 // 超速  [交通事件]
            DPSDK_CORE_ALARM_CLIENT_LACK_ALARM,									 // 欠速  [交通事件]
            DPSDK_CORE_ALARM_CLIENT_FLUX_COUNT,									 // 流量统计[交通事件]
            DPSDK_CORE_ALARM_CLIENT_PARKING,									 // 停车检测[交通事件]
            DPSDK_CORE_ALARM_CLIENT_PASSERBY,									 // 行人检测[交通事件]
            DPSDK_CORE_ALARM_CLIENT_JAM,										 // 拥堵检测[交通事件]
            DPSDK_CORE_ALARM_CLIENT_AREA_INBREAK,								 // 特殊区域入侵
            DPSDK_CORE_ALARM_CLIENT_ALARM_END = 1200,				 // 客户端平台报警结束

            //动环(PE)报警-(SCS_ALARM_SWITCH_START 取名直接来自SCS动环文档)
            //系统工程动环增加报警类型ALARM_SCS_BEGIN
            //开关量，不可控
            ALARM_SCS_SWITCH_START = 1800,
            ALARM_SCS_INFRARED,											// 红外对射告警
            ALARM_SCS_SMOKE,											// 烟感告警
            ALARM_SCS_WATER,                							// 水浸告警
            ALARM_SCS_COMPRESSOR,           							// 压缩机故障告警
            ALARM_SCS_OVERLOAD,             							// 过载告警
            ALARM_SCS_BUS_ANOMALY,          							// 母线异常
            ALARM_SCS_LIFE,                 							// 寿命告警
            ALARM_SCS_SOUND,                							// 声音告警
            ALARM_SCS_TIME,                 							// 时钟告警
            ALARM_SCS_FLOW_LOSS,            							// 气流丢失告警
            ALARM_SCS_FUSING,               							// 熔断告警
            ALARM_SCS_BROWN_OUT,            							// 掉电告警
            ALARM_SCS_LEAKING,              							// 漏水告警
            ALARM_SCS_JAM_UP,               							// 堵塞告警
            ALARM_SCS_TIME_OUT,             							// 超时告警
            ALARM_SCS_REVERSE_ORDER,        							// 反序告警
            ALARM_SCS_NETWROK_FAILURE,      							// 组网失败告警
            ALARM_SCS_UNIT_CODE_LOSE,       							// 机组码丢失告警
            ALARM_SCS_UNIT_CODE_DISMATCH,   							// 机组码不匹配告警
            ALARM_SCS_FAULT,                							// 故障告警
            ALARM_SCS_UNKNOWN,              							// 未知告警
            ALARM_SCS_CUSTOM,               							// 自定义告警
            ALARM_SCS_NOPERMISSION,         							// 无权限告警
            ALARM_SCS_INFRARED_DOUBLE,      							// 红外双鉴告警
            ALARM_SCS_ELECTRONIC_FENCE,     							// 电子围栏告警
            ALARM_SCS_UPS_MAINS,            							// 市电正常市电异常
            ALARM_SCS_UPS_BATTERY,          							// 电池正常电池异常
            ALARM_SCS_UPS_POWER_SUPPLY,     							// UPS正常输出旁路供电
            ALARM_SCS_UPS_RUN_STATE,        							// UPS正常UPS故障
            ALARM_SCS_UPS_LINE_STYLE,       							// UPS类型为在线式UPS类  型为后备式
            ALARM_SCS_XC,                   							// 小车
            ALARM_SCS_DRQ,                  							// 断路器
            ALARM_SCS_GLDZ,                 							// 隔离刀闸
            ALARM_SCS_JDDZ,                								// 接地刀闸
            ALARM_SCS_IN_END,											// 请注意这个值，不用把他作为判断值；只标记说“开关量，不可控”结束；
            //因为接下来的“开关量，可控”没有开始标记如ALARM_SCS_DOOR_START

            //开关量，可控，请注意接下来的ALARM_SCS_DOOR_SWITCH这个不能作为BEGIN用
            ALARM_SCS_DOOR_SWITCH = 1850,					// 门禁控制器开关告警
            ALARM_SCS_UPS_SWITCH,										// UPS开关告警,
            ALARM_SCS_DBCB_SWITCH,          							// 配电柜开关告警
            ALARM_SCS_ACDT_SWITCH,          							// 空调开关告警
            ALARM_SCS_DTPW_SWITCH,          							// 直流电源开关告警
            ALARM_SCS_LIGHT_SWITCH,         							// 灯光控制器开关告警
            ALARM_SCS_FAN_SWITCH,           							// 风扇控制器开关告警
            ALARM_SCS_PUMP_SWITCH,          							// 水泵开关告警
            ALARM_SCS_BREAKER_SWITCH,       							// 刀闸开关告警
            ALARM_SCS_RELAY_SWITCH,         							// 继电器开关告警
            ALARM_SCS_METER_SWITCH,        								// 电表开关告警
            ALARM_SCS_TRANSFORMER_SWITCH,   							// 变压器开关告警
            ALARM_SCS_SENSOR_SWITCH,        							// 传感器开关告警
            ALARM_SCS_RECTIFIER_SWITCH,     							// 整流器告警
            ALARM_SCS_INVERTER_SWITCH,      							// 逆变器告警
            ALARM_SCS_PRESSURE_SWITCH,      							// 压力开关告警
            ALARM_SCS_SHUTDOWN_SWITCH,      							// 关机告警
            ALARM_SCS_WHISTLE_SWITCH,	   								// 警笛告警
            ALARM_SCS_SWITCH_END,
            //模拟量
            ALARM_SCS_ANALOG_START = 1880,
            ALARM_SCS_TEMPERATURE,										// 温度告警
            ALARM_SCS_HUMIDITY,             							// 湿度告警
            ALARM_SCS_CONCENTRATION,        							// 浓度告警
            ALARM_SCS_WIND,                 							// 风速告警
            ALARM_SCS_VOLUME,               							// 容量告警
            ALARM_SCS_VOLTAGE,              							// 电压告警
            ALARM_SCS_ELECTRICITY,          							// 电流告警
            ALARM_SCS_CAPACITANCE,          							// 电容告警
            ALARM_SCS_RESISTANCE,           							// 电阻告警
            ALARM_SCS_CONDUCTANCE,          							// 电导告警
            ALARM_SCS_INDUCTANCE,           							// 电感告警
            ALARM_SCS_CHARGE,               							// 电荷量告警
            ALARM_SCS_FREQUENCY,            							// 频率告警
            ALARM_SCS_LIGHT_INTENSITY,      							// 发光强度告警(坎)
            ALARM_SCS_PRESS,                							// 力告警（如牛顿，千克力）
            ALARM_SCS_PRESSURE,             							// 压强告警（帕，大气压）
            ALARM_SCS_HEAT_TRANSFER,        							// 导热告警（瓦每平米）
            ALARM_SCS_THERMAL_CONDUCTIVITY, 							// 热导告警（kcal/(m*h*℃)）
            ALARM_SCS_VOLUME_HEAT,          							// 比容热告（kcal/(kg*℃)）
            ALARM_SCS_HOT_WORK,             							// 热功告警（焦耳）
            ALARM_SCS_POWER,                							// 功率告警（瓦）
            ALARM_SCS_PERMEABILITY,         							// 渗透率告警（达西）
            ALARM_SCS_PROPERTION,										// 比例（包括电压电流变比，功率因素，负载单位为%） 
            ALARM_SCS_ENERGY,											// 电能（单位为J）
            ALARM_SCS_ANALOG_END,
        }
    }
}
