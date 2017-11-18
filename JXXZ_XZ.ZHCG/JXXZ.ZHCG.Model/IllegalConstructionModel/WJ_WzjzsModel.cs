using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.IllegalConstructionModel
{
    public class WJ_WzjzsModel
    {
        public int wjid { get; set; }
        public string wjholder { get; set; }

        //public string zd_name { get; set; }
        private string _zd_name;
        public string zd_name
        {
            get
            {
                if (_zd_name == null)
                {
                    _zd_name = "";
                }
                return _zd_name;
            }
            set { _zd_name = value; }
        }
        private string _contactphone;
        public string contactphone
        {
            get
            {
                if (_contactphone == null)
                {
                    _contactphone = "";
                }
                return _contactphone;
            }
            set { _contactphone = value; }
        }
        private string _holderidentity;
        public string holderidentity
        {
            get
            {
                if (_holderidentity == null)
                {
                    _holderidentity = "";
                }
                return _holderidentity;
            }
            set { _holderidentity = value; }
        }
        private Nullable<int> _householdnum;
        public Nullable<int> householdnum
        {
            get
            {
                if (_householdnum == null)
                {
                    _householdnum = 0;
                }
                return _householdnum;
            }
            set { _householdnum = value; }
        }
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

        private string _landproperty;
        public string landproperty
        {
            get
            {
                if (_landproperty == null)
                {
                    _landproperty = "";
                }
                return _landproperty;
            }
            set { _landproperty = value; }
        }
        //public Nullable<System.DateTime> completiontime { get; set; }

        private Nullable<System.DateTime> _completiontime;
        public Nullable<System.DateTime> completiontime
        {
            get
            {
                if (_completiontime == null)
                {
                    _completiontime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _completiontime;
            }
            set { _completiontime = value; }
        }


        private string _landnum;
        public string landnum
        {
            get
            {
                if (_landnum == null)
                {
                    _landnum = "";
                }
                return _landnum;
            }
            set { _landnum = value; }
        }
        private string _propertynum;
        public string propertynum
        {
            get
            {
                if (_propertynum == null)
                {
                    _propertynum = "";
                }
                return _propertynum;
            }
            set { _propertynum = value; }
        }
        //public Nullable<double> coverarea { get; set; }

        private Nullable<double> _coverarea;
        public Nullable<double> coverarea
        {
            get
            {
                if (_coverarea == null)
                {
                    _coverarea = 0;
                }
                return _coverarea;
            }
            set { _coverarea = value; }
        }

        //public Nullable<double> buildarea { get; set; }

        private Nullable<double> _buildarea;
        public Nullable<double> buildarea
        {
            get
            {
                if (_buildarea == null)
                {
                    _buildarea = 0;
                }
                return _buildarea;
            }
            set { _buildarea = value; }
        }

        private string _builduse;
        public string builduse
        {
            get
            {
                if (_builduse == null)
                {
                    _builduse = "";
                }
                return _builduse;
            }
            set { _builduse = value; }
        }
        private string _buildstructure;
        public string buildstructure
        {
            get
            {
                if (_buildstructure == null)
                {
                    _buildstructure = "";
                }
                return _buildstructure;
            }
            set { _buildstructure = value; }
        }
        //public Nullable<int> buildlayers_up { get; set; }
        private Nullable<int> _buildlayers_up;
        public Nullable<int> buildlayers_up
        {
            get
            {
                if (_buildlayers_up == null)
                {
                    _buildlayers_up = 0;
                }
                return _buildlayers_up;
            }
            set { _buildlayers_up = value; }
        }

        //public Nullable<int> buildlayers_down { get; set; }

        private Nullable<int> _buildlayers_down;
        public Nullable<int> buildlayers_down
        {
            get
            {
                if (_buildlayers_down == null)
                {
                    _buildlayers_down = 0;
                }
                return _buildlayers_down;
            }
            set { _buildlayers_down = value; }
        }

        private string _geography;
        public string geography
        {
            get
            {
                if (_geography == null)
                {
                    _geography = "";
                }
                return _geography;
            }
            set { _geography = value; }
        }
        private string _wj_wjtype;
        public string wj_wjtype
        {
            get
            {
                if (_wj_wjtype == null)
                {
                    _wj_wjtype = "";
                }
                return _wj_wjtype;
            }
            set { _wj_wjtype = value; }
        }
        private string _wj_use;
        public string wj_use
        {
            get
            {
                if (_wj_use == null)
                {
                    _wj_use = "";
                }
                return _wj_use;
            }
            set { _wj_use = value; }
        }
        private string _wj_land;
        public string wj_land
        {
            get
            {
                if (_wj_land == null)
                {
                    _wj_land = "";
                }
                return _wj_land;
            }
            set { _wj_land = value; }
        }
        //public Nullable<System.DateTime> wj_time { get; set; }

        private Nullable<System.DateTime> _wj_time;
        public Nullable<System.DateTime> wj_time
        {
            get
            {
                if (_wj_time == null)
                {
                    _wj_time = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _wj_time;
            }
            set { _wj_time = value; }
        }
        //public Nullable<double> wj_landarea { get; set; }

        private Nullable<System.DateTime> _limittime;
        public Nullable<System.DateTime> limittime
        {
            get
            {
                if (_limittime == null)
                {
                    _limittime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _limittime;
            }
            set { _limittime = value; }
        }

        private Nullable<double> _wj_landarea;
        public Nullable<double> wj_landarea
        {
            get
            {
                if (_wj_landarea == null)
                {
                    _wj_landarea = 0;
                }
                return _wj_landarea;
            }
            set { _wj_landarea = value; }
        }

        private string _wj_wjarea;
        public string wj_wjarea
        {
            get
            {
                if (_wj_wjarea == null)
                {
                    _wj_wjarea = "";
                }
                return _wj_wjarea;
            }
            set { _wj_wjarea = value; }
        }
        private string _wj_buildstructure;
        public string wj_buildstructure
        {
            get
            {
                if (_wj_buildstructure == null)
                {
                    _wj_buildstructure = "";
                }
                return _wj_buildstructure;
            }
            set { _wj_buildstructure = value; }
        }

        private string _wj_layerup;
        public string wj_layerup
        {
            get
            {
                if (_wj_layerup == null)
                {
                    _wj_layerup = "0";
                }
                return _wj_layerup;
            }
            set { _wj_layerup = value; }
        }
        private string _wj_layerdown;
        public string wj_layerdown
        {
            get
            {
                if (_wj_layerdown == null)
                {
                    _wj_layerdown = "0";
                }
                return _wj_layerdown;
            }
            set { _wj_layerdown = value; }
        }
        public Nullable<int> process { get; set; }
        public Nullable<int> isgd { get; set; }
        private string _reportuser;
        public string reportuser
        {
            get
            {
                if (_reportuser == null)
                {
                    _reportuser = "";
                }
                return _reportuser;
            }
            set { _reportuser = value; }
        }
        //public Nullable<System.DateTime> reporttime { get; set; }
        private Nullable<System.DateTime> _reporttime;
        public Nullable<System.DateTime> reporttime
        {
            get
            {
                if (_reporttime == null)
                {
                    _reporttime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _reporttime;
            }
            set { _reporttime = value; }
        }

        //public Nullable<System.DateTime> foundtime { get; set; }

        private Nullable<System.DateTime> _foundtime;
        public Nullable<System.DateTime> foundtime
        {
            get
            {
                if (_foundtime == null)
                {
                    _foundtime = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _foundtime;
            }
            set { _foundtime = value; }
        }

        private string _remark;
        public string remark
        {
            get
            {
                if (_remark == null)
                {
                    _remark = "";
                }
                return _remark;
            }
            set { _remark = value; }
        }
        public Nullable<int> parentid { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        private string _createusername;
        public string createusername
        {
            get
            {
                if (_createusername == null)
                {
                    _createusername = "";
                }
                return _createusername;
            }
            set { _createusername = value; }
        }
        public string[] uploadpanelValue { get; set; }
        public List<WJ_FilesModel> wjfilelist { get; set; }

        public string path { get; set; }
        public string citizenid { get; set; }

    }
}
