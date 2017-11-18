using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.administrativeapprovalModel
{
    public class LicenseModel
    {
        public int licensingid { get; set; }

        /// <summary>
        /// 审批号、编号
        /// </summary>
        public int sph { get; set; }

        /// <summary>
        /// 许可事项
        /// </summary>
        public string xksx { get; set; }

        /// <summary>
        /// 审批类型
        /// </summary>
        public string splx { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string b_address { get; set; }

        /// <summary>
        /// 事项描述
        /// </summary>
        public string sxmx { get; set; }

        /// <summary>
        /// 申请人
        /// </summary>
        public string sqr { get; set; }

        /// <summary>
        /// 证件类型
        /// </summary>
        public string cardtype { get; set; }

        /// <summary>
        /// 证件号
        /// </summary>
        public string card { get; set; }

        /// <summary>
        /// 联系电话
        /// </summary>
        public string contactphone { get; set; }

        /// <summary>
        /// 地址s
        /// </summary>
        public string s_address { get; set; }

        /// <summary>
        /// 可处理时间
        /// </summary>
        public DateTime processtime_start { get; set; }

        /// <summary>
        /// 可处理结束时间
        /// </summary>
        public DateTime? processtime_end { get; set; }

        /// <summary>
        /// 处理描述
        /// </summary>
        public string processcontent { get; set; }

        /// <summary>
        /// 处理地点
        /// </summary>
        public string processaddress { get; set; }

        /// <summary>
        /// 地理位置(点)
        /// </summary>
        public string geography { get; set; }

        /// <summary>
        /// 添加人id
        /// </summary>
        public int createuserid { get; set; }

        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime createtime { get; set; }

        /// <summary>
        /// 审核结果(0同意 1不同意)
        /// </summary>
        public int shresult { get; set; }

        /// <summary>
        /// 审核意见
        /// </summary>
        public string shopinion { get; set; }

        /// <summary>
        /// 审核人id
        /// </summary>
        public int shuser { get; set; }

        /// <summary>
        /// 是否审核(0否 1是)
        /// </summary>
        public int issh { get; set; }

        /// <summary>
        /// 审核时间
        /// </summary>
        public DateTime shtime { get; set; }

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
        /// 第一张图片地址
        /// </summary>
        public string firstImgUrl { get; set; }

        public string splxname { get; set; }
        public string cardtypename { get; set; }
    }

    public class filesModel
    {
        /// <summary>
        /// 违建附件类型
        /// </summary>
        public string filetype { get; set; }

        /// <summary>
        /// 违建附件名称
        /// </summary>
        public string filename { get; set; }

        /// <summary>
        /// 违建附件路径
        /// </summary>
        public string filepath { get; set; }

        /// <summary>
        /// 附件来源(1 门前三包  2行政许可)
        /// </summary>
        public int source { get; set; }

        /// <summary>
        /// 来源ID
        /// </summary>
        public int? sourceid { get; set; }

        /// <summary>
        /// 附件大小
        /// </summary>
        public double? filesize { get; set; }
    }
}
