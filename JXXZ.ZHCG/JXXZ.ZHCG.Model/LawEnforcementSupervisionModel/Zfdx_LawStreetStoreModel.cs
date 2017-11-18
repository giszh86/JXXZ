using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.lawenforcementsupervisionModel
{
    public class Zfdx_LawStreetStoreModel
    {
        public int zfdx_shopid { get; set; }
        //public string shopname { get; set; }
        private string _shopname = "";

        public string shopname
        {
            get
            {
                if (_shopname == null)
                    _shopname = "";
                return _shopname;
            }
            set { _shopname = value; }
        }

        //public string shoptype { get; set; }
        private string _shoptype = "";

        public string shoptype
        {
            get
            {
                if (_shoptype == null)
                    _shoptype = "";
                return _shoptype;
            }
            set { _shoptype = value; }
        }

        //public string person { get; set; }
        private string _person = "";

        public string person
        {
            get
            {
                if (_person == null)
                    _person = "";
                return _person;
            }
            set { _person = value; }
        }

        //public string card { get; set; }
        private string _card = "";

        public string card
        {
            get
            {
                if (_card == null)
                    _card = "";
                return _card;
            }
            set { _card = value; }
        }

        //public string contactphone { get; set; }
        private string _contactphone = "";

        public string contactphone
        {
            get
            {
                if (_contactphone == null)
                    _contactphone = "";
                return _contactphone;
            }
            set { _contactphone = value; }
        }

        public int? staffsum { get; set; }
        //public Nullable<System.DateTime> e_licence { get; set; }
        private Nullable<System.DateTime> _e_licence;
        public Nullable<System.DateTime> e_licence
        {
            get
            {
                if (_e_licence == null)
                {
                    _e_licence = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _e_licence;
            }
            set { _e_licence = value; }
        }

        //public Nullable<System.DateTime> s_licence { get; set; }
        private Nullable<System.DateTime> _s_licence;
        public Nullable<System.DateTime> s_licence
        {
            get
            {
                if (_s_licence == null)
                {
                    _s_licence = Convert.ToDateTime("0001-01-01 00:00:00");
                }
                return _s_licence;
            }
            set { _s_licence = value; }
        }

        //public string licencecard { get; set; }
        private string _licencecard = "";

        public string licencecard
        {
            get
            {
                if (_licencecard == null)
                    _licencecard = "";
                return _licencecard;
            }
            set { _licencecard = value; }
        }

        public Nullable<System.DateTime> s_business { get; set; }
        public Nullable<System.DateTime> e_business { get; set; }
        public double? businessarea { get; set; }
        //public string address { get; set; }
        private string _address = "";

        public string address
        {
            get
            {
                if (_address == null)
                    _address = "";
                return _address;
            }
            set { _address = value; }
        }
        //public string sourcearea { get; set; }
        private string _sourcearea = "";

        public string sourcearea
        {
            get
            {
                if (_sourcearea == null)
                    _sourcearea = "";
                return _sourcearea;
            }
            set { _sourcearea = value; }
        }

        //public string grometry { get; set; }
        private string _grometry = "";

        public string grometry
        {
            get
            {
                if (_grometry == null)
                    _grometry = "";
                return _grometry;
            }
            set { _grometry = value; }
        }

        public int? sstype { get; set; }

        private string _hawkertype = "";

        public string hawkertype
        {
            get
            {
                if (_hawkertype == null)
                    _hawkertype = "";
                return _hawkertype;
            }
            set { _hawkertype = value; }
        }

        private string _remark = "";

        public string remark
        {
            get
            {
                if (_remark == null)
                    _remark = "";
                return _remark;
            }
            set { _remark = value; }
        }

        private string _validtime = "";

        public string validtime
        {
            get
            {
                if (_validtime == null)
                    _validtime = "";
                return _validtime;
            }
            set { _validtime = value; }
        }

        public int? createuserid { get; set; }
        public DateTime? createtime { get; set; }

        private string _shoptypename = "";

        public string shoptypename
        {
            get
            {
                if (_shoptypename == null)
                    _shoptypename = "";
                return _shoptypename;
            }
            set { _shoptypename = value; }
        }

        private string _sourceareaname = "";

        public string sourceareaname
        {
            get
            {
                if (_sourceareaname == null)
                    _sourceareaname = "";
                return _sourceareaname;
            }
            set { _sourceareaname = value; }
        }

        private string _unitid = "";

        public string unitid
        {
            get
            {
                if (_unitid == null)
                    _unitid = "";
                return _unitid;
            }
            set { _unitid = value; }
        }
    }

    public class LawObjectNum {
        public int sstype { get; set; }
        public int isblack { get; set; }
    }

}
