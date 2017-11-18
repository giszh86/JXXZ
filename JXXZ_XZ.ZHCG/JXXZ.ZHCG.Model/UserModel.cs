using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class UserModel
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string DisplayName { get; set; }
        public int? UnitID { get; set; }
        public string UnitName { get; set; }
        public int? UserTypeID { get; set; }
        public string UserTypeName { get; set; }
        public string LoginName { get; set; }
        public string LoginPwd { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public string Path { get; set; }
        public string Avatar { get; set; }
        public int? Regionid { get; set; }
        public string RegionidName { get; set; }
        public int? MapElementBizType { get; set; }
        public int? MapElementDeviceType { get; set; }
        public string Sex { get; set; }
        public DateTime? Birthday { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public int? IsOnline { get; set; }

        public string phone { get; set; }
        /// <summary>
        /// 总数
        /// </summary>
        public int Count { get; set; }

    }

    public class UserMobile
    {
        /// <summary>
        /// 姓名
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string mobile { get; set; }
        /// <summary>
        /// 工作号
        /// </summary>
        public string phone { get; set; }
    }

    public class PhoneModel
    {
        public int id { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string phone { get; set; }

        /// <summary>
        /// 父级id
        /// </summary>
        public int? parentid { get; set; }

        private List<PhoneModel> _children = new List<PhoneModel>();

        public List<PhoneModel> children
        {
            get { return _children; }
            set { _children = value; }
        }
        //public List<PhoneModel> children { get; set; }
    }

    public class TJUser
    {
        public int count { get; set; }
        public DateTime stattime { get; set; }
        public string unitname { get; set; }
    }


}
