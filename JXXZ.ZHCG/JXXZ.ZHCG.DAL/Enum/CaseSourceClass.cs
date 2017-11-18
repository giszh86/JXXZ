using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.Enum
{
    public enum CaseSourceClass
    {
        /// <summary>
        /// 投诉举报
        /// </summary>
        ComplaintReport=1,

        /// <summary>
        /// 上级交办
        /// </summary>
        Superiors = 2,

        /// <summary>
        /// 下级报送
        /// </summary>
        SubordinateSubmission=3,

        /// <summary>
        /// 同级转办
        /// </summary>
        SameLevel = 4,

        /// <summary>
        /// 巡查发现
        /// </summary>
        InspectionFound=5,

        /// <summary>
        /// 其他来源
        /// </summary>
        OtherSources=6,

        
    }
}
