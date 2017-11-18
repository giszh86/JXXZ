using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JXXZ.ZHCG.WebAPI
{
    public class ConfigManageClass
    {
        private readonly static string _CitizenServiceOriginalPath = System.Configuration.ConfigurationManager.AppSettings["CitizenServiceOriginalPath"];
        /// <summary>
        /// 市民服务配置类
        /// </summary>
        public static string CitizenServiceOriginalPath
        {
            get { return ConfigManageClass._CitizenServiceOriginalPath; }
        }

        private readonly static string _CitizenServiceFilesPath = System.Configuration.ConfigurationManager.AppSettings["CitizenServiceFilesPath"];
        /// <summary>
        /// 市民服务配置类
        /// </summary>
        public static string CitizenServiceFilesPath
        {
            get { return ConfigManageClass._CitizenServiceFilesPath; }
        }

        private readonly static string _LegalCasePathPath = System.Configuration.ConfigurationManager.AppSettings["LegalCasePath"];
        /// <summary>
        /// 执法办案配置类
        /// </summary>
        public static string LegalCasePath
        {
            get { return ConfigManageClass._LegalCasePathPath; }
        }


        private readonly static string _AccountTaskPath = System.Configuration.ConfigurationManager.AppSettings["AccountTaskPath"];
        /// <summary>
        /// 台帐任务配置类
        /// </summary>
        public static string AccountTaskPath
        {
            get { return ConfigManageClass._AccountTaskPath; }
        }

        private readonly static string _AccountRegisterPath = System.Configuration.ConfigurationManager.AppSettings["AccountRegisterPath"];
        /// <summary>
        /// 台帐登记附件
        /// </summary>
        public static string AccountRegisterPath
        {
            get { return ConfigManageClass._AccountRegisterPath; }
        }

        private static readonly string _AccountRegisterWordPath = System.Configuration.ConfigurationManager.AppSettings["AccountRegisterWordPath"];
        /// <summary>
        /// 台帐生成Word路径
        /// </summary>
        public static string AccountRegisterWordPath
        {
            get { return ConfigManageClass._AccountRegisterWordPath; }
        }

        private readonly static string _ApprovalOrignalPath = System.Configuration.ConfigurationManager.AppSettings["ApprovalOrignalPath"];
        /// <summary>
        /// 行政许可配置类(大图)
        /// </summary>
        public static string ApprovalOrignalPath
        {
            get { return ConfigManageClass._ApprovalOrignalPath; }
        }

        private readonly static string _ApprovalSmallPath = System.Configuration.ConfigurationManager.AppSettings["ApprovalSmallPath"];
        /// <summary>
        /// 行政许可配置类(小图)
        /// </summary>
        public static string ApprovalSmallPath
        {
            get { return ConfigManageClass._ApprovalSmallPath; }
        }

        private readonly static string _ThreeBagsOrignalPath = System.Configuration.ConfigurationManager.AppSettings["ThreeBagsOrignalPath"];
        /// <summary>
        /// 门前三包配置类（原图）
        /// </summary>
        public static string ThreeBagsOrignalPath
        {
            get { return ConfigManageClass._ThreeBagsOrignalPath; }
        }

        private readonly static string _ThreeBagsSmallPath = System.Configuration.ConfigurationManager.AppSettings["ThreeBagsSmallPath"];
        /// <summary>
        /// 门前三包配置类（小图）
        /// </summary>
        public static string ThreeBagsSmallPath
        {
            get { return ConfigManageClass._ThreeBagsSmallPath; }
        }

        private readonly static string _AdminApprovalOrignalPath = System.Configuration.ConfigurationManager.AppSettings["AdminApprovalOrignalPath"];
        /// <summary>
        /// 行政审批配置类（原图）
        /// </summary>
        public static string AdminApprovalOrignalPath
        {
            get { return ConfigManageClass._AdminApprovalOrignalPath; }
        }

        private readonly static string _AdminApprovalSmallPath = System.Configuration.ConfigurationManager.AppSettings["AdminApprovalSmallPath"];
        /// <summary>
        /// 行政审批配置类（小图）
        /// </summary>
        public static string AdminApprovalSmallPath
        {
            get { return ConfigManageClass._AdminApprovalSmallPath; }
        }

        private readonly static string _YhTaskOriginalPath = System.Configuration.ConfigurationManager.AppSettings["YhTaskOriginalPath"];
        /// <summary>
        /// 养护原图
        /// </summary>
        public static string YhTaskOriginalPath
        {
            get { return ConfigManageClass._YhTaskOriginalPath; }
        }


        private readonly static string _YhTaskFilesPath = System.Configuration.ConfigurationManager.AppSettings["YhTaskFilesPath"];
        /// <summary>
        /// 养护小图
        /// </summary>
        public static string YhTaskFilesPath
        {
            get { return ConfigManageClass._YhTaskFilesPath; }
        }



        private readonly static string _WTCarOriginalPath = System.Configuration.ConfigurationManager.AppSettings["WTCarOriginalPath"];
        /// <summary>
        /// 养护原图
        /// </summary>
        public static string WTCarOriginalPath
        {
            get { return ConfigManageClass._WTCarOriginalPath; }
        }


        private readonly static string _WTCarFilesPath = System.Configuration.ConfigurationManager.AppSettings["WTCarFilesPath"];
        /// <summary>
        /// 养护小图
        /// </summary>
        public static string WTCarFilesPath
        {
            get { return ConfigManageClass._WTCarFilesPath; }
        }



        private readonly static string _DemolitionOriginalPath = System.Configuration.ConfigurationManager.AppSettings["DemolitionOriginalPath"];
        /// <summary>
        /// 拆迁原图
        /// </summary>
        public static string DemolitionOriginalPath
        {
            get { return ConfigManageClass._DemolitionOriginalPath; }
        }


        private readonly static string _DemolitionFilesPath = System.Configuration.ConfigurationManager.AppSettings["DemolitionFilesPath"];
        /// <summary>
        /// 拆迁小图
        /// </summary>
        public static string DemolitionFilesPath
        {
            get { return ConfigManageClass._DemolitionFilesPath; }
        }


        private readonly static string _IllegallyBuiltOriginalPath = System.Configuration.ConfigurationManager.AppSettings["IllegallyBuiltOriginalPath"];
        /// <summary>
        /// 拆迁原图
        /// </summary>
        public static string IllegallyBuiltOriginalPath
        {
            get { return ConfigManageClass._IllegallyBuiltOriginalPath; }
        }


        private readonly static string _IllegallyBuiltFilesPath = System.Configuration.ConfigurationManager.AppSettings["IllegallyBuiltFilesPath"];
        /// <summary>
        /// 拆迁小图
        /// </summary>
        public static string IllegallyBuiltFilesPath
        {
            get { return ConfigManageClass._IllegallyBuiltFilesPath; }
        }


        private readonly static string _YhLogOriginalPath = System.Configuration.ConfigurationManager.AppSettings["YhLogOriginalPath"];
        /// <summary>
        /// 养护日志原图
        /// </summary>
        public static string YhLogOriginalPath
        {
            get { return ConfigManageClass._YhLogOriginalPath; }
        }


        private readonly static string _YhLogFilesPath = System.Configuration.ConfigurationManager.AppSettings["YhLogFilesPath"];
        /// <summary>
        /// 养护日志小图
        /// </summary>
        public static string YhLogFilesPath
        {
            get { return ConfigManageClass._YhLogFilesPath; }
        }

        private readonly static int _XZXKKID = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["XZXKKID"]);
        /// <summary>
        /// 行政许可科ID
        /// </summary>
        public static int XZXKKID
        {
            get { return ConfigManageClass._XZXKKID; }
        }

        private readonly static int _ZDID = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["ZDID"]);
        /// <summary>
        /// 中队ID
        /// </summary>
        public static int ZDID
        {
            get { return ConfigManageClass._ZDID; }
        }


        private readonly static string _UserUrlOriginalPath = System.Configuration.ConfigurationManager.AppSettings["UserUrlOriginalPath"];
        /// <summary>
        /// 养护日志小图
        /// </summary>
        public static string UserUrlOriginalPath
        {
            get { return ConfigManageClass._UserUrlOriginalPath; }
        }

        private static string _UAVPath = System.Configuration.ConfigurationManager.AppSettings["UAVPath"];

        /// <summary>
        /// 无人机配置路径
        /// </summary>
        public static string UAVPath
        {
            get { return ConfigManageClass._UAVPath; }
            set { ConfigManageClass._UAVPath = value; }
        }

        /// <summary>
        /// 公告管理配置路径
        /// </summary>
        private static string _BulletinBoardPath = System.Configuration.ConfigurationManager.AppSettings["BulletinBoardPath"];

        public static string BulletinBoardPath
        {
            get { return ConfigManageClass._BulletinBoardPath; }
            set { ConfigManageClass._BulletinBoardPath = value; }
        }
    }
}