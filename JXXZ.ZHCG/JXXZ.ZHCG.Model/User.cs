using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class User
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string DisplayName { get; set; }
        public int? UnitID { get; set; }
        public string UnitName { get; set; }
        public int? UserTypeID { get; set; }
        public int? UnitTypeID { get; set; }
        public string UserTypeName { get; set; }
        public string LoginName { get; set; }
        public string LoginPwd { get; set; }
        public string NewLoginPwd { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public int[] RoleIDArr { get; set; }
        public string Roles { get; set; }
        public string RoleNames { get; set; }

        private int? _IsOnline = 0;

        public int? IsOnline
        {
            get
            {
                DateTime dt = DateTime.Now;
                if (CreatedTime != null)
                {
                    if ((dt - CreatedTime.Value).TotalMinutes <= 15)
                    {
                        _IsOnline = 1;
                    }
                }
                return _IsOnline;
            }
            set
            {

                _IsOnline = value;

            }
        }

        public string zfzbh { get; set; }
        public int? parentid { get; set; }
        public string Path { get; set; }
        /// <summary>
        /// 手机号1
        /// </summary>
        public string mobile { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public string sex { get; set; }
        /// <summary>
        /// 部门类别
        /// </summary>
        public int? UnitType { get; set; }

        public string avatar { get; set; }
        public int? Sepon { get; set; }
        /// <summary>
        /// 手机号2
        /// </summary>
        public string phone { get; set; }
        /// <summary>
        /// 短号
        /// </summary>
        public string shortnumber { get; set; }
        /// <summary>
        /// 设备号
        /// </summary>
        public string remarks1 { get; set; }

    }

    public class BaseUserModel
    {
        public int id { get; set; }
        public string code { get; set; }
        public string displayname { get; set; }
        public Nullable<int> unitid { get; set; }
        public Nullable<int> usertypeid { get; set; }
        public string loginname { get; set; }
        public string loginpwd { get; set; }
        public string avatar { get; set; }
        public Nullable<int> regionid { get; set; }
        public Nullable<int> mapelementbiztype { get; set; }
        public Nullable<int> mapelementdevicetype { get; set; }
        public string sex { get; set; }
        //public Nullable<System.DateTime> birthday { get; set; }
        private Nullable<System.DateTime> _birthday;
        public Nullable<System.DateTime> birthday
        {
            get
            {
                if (_birthday == null)
                {
                    _birthday = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _birthday;
            }
            set { _birthday = value; }
        }

        public string address { get; set; }
        public string mobile { get; set; }
        public string telephone { get; set; }
        public string email { get; set; }
        public Nullable<int> isonline { get; set; }

        //public Nullable<System.DateTime> createdtime { get; set; }
        private Nullable<System.DateTime> _createdtime;
        public Nullable<System.DateTime> createdtime
        {
            get
            {
                if (_createdtime == null)
                {
                    _createdtime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _createdtime;
            }
            set { _createdtime = value; }
        }

        //public Nullable<System.DateTime> updatedtime { get; set; }
        private Nullable<System.DateTime> _updatedtime;
        public Nullable<System.DateTime> updatedtime
        {
            get
            {
                if (_updatedtime == null)
                {
                    _updatedtime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _updatedtime;
            }
            set { _updatedtime = value; }
        }

        public string FilesPath { get; set; }
        public int hour { get; set; }

        public int minutes { get; set; }
        public string phone { get; set; }
        public decimal? x84 { get; set; }
        public decimal? y84 { get; set; }
        public decimal? x2000 { get; set; }
        public decimal? y2000 { get; set; }

        //public DateTime? positiontime { get; set; }
        private Nullable<System.DateTime> _positiontime;
        public Nullable<System.DateTime> positiontime
        {
            get
            {
                if (_positiontime == null)
                {
                    _positiontime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _positiontime;
            }
            set { _positiontime = value; }
        }

        public string unitname { get; set; }
        public string grometry { get; set; }
        public int IsOnDuty { get; set; }
        public int alarmsCount { get; set; }
        public List<string> rolename { get; set; }
    }

    public class phoneDetails {
        public int id { get; set; }
        public string name { get; set; }
        public string unitname { get; set; }
        public string avatar { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string shortnumber { get; set; }
        public string url { get; set; }
    }

}
