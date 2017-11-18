using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
    public class Case_WtajsModel
    {
        public int wtid { get; set; }
        public string car_num { get; set; }
        public string car_type { get; set; }
        public string processstatus { get; set; }
        public Nullable<System.DateTime> wt_time { get; set; }
        public string wt_address { get; set; }
        public string wfxw { get; set; }
        private string _cfjdsh;

        public string cfjdsh
        {
            get
            {
                if (_cfjdsh == null)
                {
                    _cfjdsh = "";
                }
                return _cfjdsh;
            }
            set { _cfjdsh = value; }
        }
        public string cjdw { get; set; }
        public int? cjr { get; set; }
        public string dsr { get; set; }
        public string dsr_phone { get; set; }
        public string dsr_address { get; set; }
        public string jdr { get; set; }
        public Nullable<System.DateTime> jdsj { get; set; }
        public Nullable<int> shr { get; set; }
        public Nullable<System.DateTime> shsj { get; set; }
        private string _zfreason;

        public string zfreason
        {
            get
            {
                if (_zfreason == null)
                {
                    _zfreason = "";
                } 
                return _zfreason;
            }
            set { _zfreason = value; }
        }

        public string datastatus { get; set; }
        public string cldw { get; set; }
        public Nullable<double> fkje { get; set; }
        public string fphm { get; set; }
        public string processuser { get; set; }
        public Nullable<System.DateTime> processtime { get; set; }
        public string jsr { get; set; }
        public Nullable<System.DateTime> jssj { get; set; }
        public Nullable<int> isphone { get; set; }
        public Nullable<int> reportuserid { get; set; }
        public Nullable<System.DateTime> reporttime { get; set; }
        public Nullable<double> x84 { get; set; }
        public Nullable<double> y84 { get; set; }
        public Nullable<double> x2000 { get; set; }
        public Nullable<double> y2000 { get; set; }
        public int? unitid { get; set; }
        public string car_typename { get; set; }
        private string _shrname;

        public string shrname
        {
            get
            {
                if (_shrname == null)
                {
                    _shrname = "";
                } 
                return _shrname;
            }
            set { _shrname = value; }
        }
        private string _cjrname;

        public string cjrname
        {
            get
            {
                if (_cjrname == null)
                {
                    _cjrname = "";
                } 
                return _cjrname;
            }
            set { _cjrname = value; }
        }
        public List<Case_WtfilesModel> casewtfilelist { get; set; }

        /// <summary>
        /// 图片1
        /// </summary>
        public string photo1 { get; set; }
        /// <summary>
        /// 图片2
        /// </summary>
        public string photo2 { get; set; }
        /// <summary>
        /// 图片3
        /// </summary>
        public string photo3 { get; set; }
    }

    public class receptionWtajModel
    {
        public int wtid { get; set; }
        public string car_num { get; set; }
        public string wt_address { get; set; }
        public string grometry { get; set; }
    }

}
