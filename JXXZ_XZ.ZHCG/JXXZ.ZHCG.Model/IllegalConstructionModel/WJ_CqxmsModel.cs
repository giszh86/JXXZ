using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.IllegalConstructionModel
{
   public class WJ_CqxmsModel
    {
        public int cqid { get; set; }
        public string projectname { get; set; }
        public string projectleader { get; set; }
        //public string contackphone { get; set; }

        private string _contackphone;
        public string contackphone
        {
            get
            {
                if (_contackphone == null)
                {
                    _contackphone = "";
                }
                return _contackphone;
            }
            set { _contackphone = value; }
        }

        //public Nullable<double> cqarea { get; set; }

        private Nullable<double> _cqarea;
        public Nullable<double> cqarea
        {
            get
            {
                if (_cqarea == null)
                {
                    _cqarea = 0;
                }
                return _cqarea;
            }
            set { _cqarea = value; }
        }

        //public Nullable<System.DateTime> starttime { get; set; }

        private Nullable<System.DateTime> _starttime;
        public Nullable<System.DateTime> starttime
        {
            get
            {
                if (_starttime == null)
                {
                    _starttime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _starttime;
            }
            set { _starttime = value; }
        }

        //public Nullable<System.DateTime> endtime { get; set; }

        private Nullable<System.DateTime> _endtime;
        public Nullable<System.DateTime> endtime
        {
            get
            {
                if (_endtime == null)
                {
                    _endtime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _endtime;
            }
            set { _endtime = value; }
        }

        public string ssqy { get; set; }
        public string ssqyname { get; set; }
        //public string address { get; set; }

        private string _address;
        public string address
        {
            get
            {
                if (_address == null)
                {
                    _address = "";
                }
                return _address;
            }
            set { _address = value; }
        }

        public string geography { get; set; }
        public string remark { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public string createusername { get; set; }
        public string[] uploadpanelValue { get; set; }
        public  List<WJ_FilesModel> wjfilelist { get; set; }

        public string path { get; set; }
   }
}
