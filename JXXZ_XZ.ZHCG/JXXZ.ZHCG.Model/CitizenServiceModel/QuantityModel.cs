using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
    public class QuantityModel
    {
        public int UpcomingEventQuantity { get; set; }
        public int UpcomingApprovalQuantity { get; set; }
        public int UpcomingCaseQuantity { get; set; }
        public int UpcomingTaskQuantity { get; set; }
    }

    public class TotalAmount {
        public int EventsNumber { get; set; }
        public int CasesNumber { get; set; }
    }

    public class TotalAmountList {
        public string type { get; set; }
        public int value { get; set; }
    }
}
