using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.administrativeapprovalModel
{
    public class TreeBagsModel
    {
        /// <summary>
        /// 店家ID
        /// </summary>
        public int storeid { get; set; }

        /// <summary>
        /// 店家名称
        /// </summary>
        public string storename{ get; set; }

        /// <summary>
        /// 店家类型
        /// </summary>
        public string storetype { get; set; }

        /// <summary>
        /// 负责人
        /// </summary>
        public string person { get; set; }

        /// <summary>
        /// 证件号
        /// </summary>
        public string card { get; set; }

        /// <summary>
        /// 联系电话
        /// </summary>
        public string contactphone { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string address { get; set; }

        /// <summary>
        /// 地理位置
        /// </summary>
        public string geography { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string remark { get; set; }

        /// <summary>
        /// 添加人
        /// </summary>
        public int createuserid { get; set; }

        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime createtime { get; set; }

        public string[] uploadpanelValue { get; set; }

        /// <summary>
        /// 图片地址
        /// </summary>
        public List<string> imgUrl { get; set; }

        /// <summary>
        /// 手机上报图片
        /// </summary>
        public string[] base64 { get; set; }


        /// <summary>
        /// 第一个图片url
        /// </summary>
        public string firstImgUrl { get; set; }

        public string storetypename { get; set; }
    }
}
