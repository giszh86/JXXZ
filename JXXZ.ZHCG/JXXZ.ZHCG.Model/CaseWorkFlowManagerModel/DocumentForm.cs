using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
    public class DocumentForm
    {
        public string wfsaid { get; set; }
        public Nullable<Int32> userid { get; set; }
        public Nullable<Int32> ddid { get; set; }
        public Nullable<Int32> caseid { get; set; }
        public Nullable<Int32> actiontype { get; set; }
        public string[] uploadpanelValue { get; set; }
        public List<DocumentWPQD> goodsValue { get; set; }
        public string documentname { get; set; }
        public string sourcetable { get; set; }
    }

    //现场检查勘验笔录
    public class DocumentXCJCKYBL
    {
        public int id { get; set; }
        public string jcdate { get; set; }
        public string sjctime { get; set; }
        public string ejctime { get; set; }
        public string jcplace { get; set; }
        public string zkyr { get; set; }
        public string zdwzw { get; set; }
        public string xkyr { get; set; }
        public string xdwzw { get; set; }
        public string dsr { get; set; }
        public string dsrdwzw { get; set; }
        public string xcfzr { get; set; }
        public string xcdwzw { get; set; }
        public string byqr { get; set; }
        public string byqdwzw { get; set; }
        public string jlr { get; set; }
        public string jlrdwzw { get; set; }
        public string zzfry { get; set; }
        public string xzfry { get; set; }
        public string zzjhm { get; set; }
        public string xzjhm { get; set; }
        public string xcqk { get; set; }
        public string jzr { get; set; }
    }

    //调查询问笔录
    public class DocumentDCXWBL
    {
        public int id { get; set; }
        public string casereason { get; set; }
        public string dcdate { get; set; }
        public string sdctime { get; set; }
        public string edctime { get; set; }
        public string dcplace { get; set; }
        public string bdcuser { get; set; }
        public string sex { get; set; }
        public string mz { get; set; }
        public string sfz { get; set; }
        public string gzdw { get; set; }
        public string zwzy { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string zipcode { get; set; }
        public string ybagx { get; set; }
        public string zdcxwr { get; set; }
        public string zzfzh { get; set; }
        public string xdcxwr { get; set; }
        public string xzfzh { get; set; }
        public string jlperson { get; set; }
        public string zcperson { get; set; }
        public string sfqr { get; set; }
        public string sfhb { get; set; }
        public string sftq { get; set; }
        public string remark { get; set; }
    }

    //一般案件流程环节所有文书
    public class DocumentAllHJWS
    {
        public int id { get; set; }
        public string sqsx { get; set; }
        public string casesource { get; set; }
        public string casename { get; set; }
        public string casereason { get; set; }
        public string casebh { get; set; }
        public string sitedatetime { get; set; }
        public string persontype { get; set; }
        public string p_name { get; set; }
        public string p_cardnum { get; set; }
        public string p_contactphone { get; set; }
        public string p_contactaddress { get; set; }
        public string f_name { get; set; }
        public string f_dbr { get; set; }
        public string f_card { get; set; }
        public string f_cardnum { get; set; }
        public string f_contactphone { get; set; }
        public string f_contactaddress { get; set; }
        public string p_cardtypename { get; set; }
        public string f_cardtypename { get; set; }
        public string casecontent { get; set; }
        public string dcjg { get; set; }
        public string wfss { get; set; }
        public string ajdx { get; set; }
        public string ajdxremark { get; set; }
        public string jyaq { get; set; }
        public string xzcftype { get; set; }
        public string xzcfje { get; set; }
        public string xzcfnr { get; set; }
        public string xzcffs { get; set; }
        public string cbr { get; set; }
        public string cbryj { get; set; }
        public string cbrtime { get; set; }
        public string cbjg { get; set; }
        public string cbjgyj { get; set; }
        public string cbjgtime { get; set; }
        public string fzjg { get; set; }
        public string fzjgyj { get; set; }
        public string fzjgtime { get; set; }
        public string shr { get; set; }
        public string shryj { get; set; }
        public string shrtime { get; set; }
    }

    //行政处罚事先告知书
    public class DocumentXZCFSXGZS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string gzszw { get; set; }
        public string dwdz { get; set; }
        public string yzbm { get; set; }
        public string lxr { get; set; }
        public string lxdh { get; set; }
    }

    //行政处罚决定书
    public class DocumentXZCFJDS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string xb { get; set; }
        public string dwmc { get; set; }
        public string fddbr { get; set; }
        public string zjlx { get; set; }
        public string zjh { get; set; }
        public string address { get; set; }
        public string jdszw { get; set; }
    }

    //照片（图片、影像资料）证据
    public class DocumentZPZJ
    {
        public int id { get; set; }
        public string smfywt { get; set; }
        public string psdd { get; set; }
        public string psr { get; set; }
        public string dsrhjzr { get; set; }
        public string zfry1 { get; set; }
        public string zfzh1 { get; set; }
        public string zfry2 { get; set; }
        public string zfzh2 { get; set; }
        public string pssj { get; set; }
        public string remark { get; set; }
    }

    //责令停止违法行为通知书
    public class DocumentZLTZWFXWTZS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string afsj { get; set; }
        public string afdz { get; set; }
        public string wfxw { get; set; }
        public string wfgd { get; set; }
        public string zfry1 { get; set; }
        public string zfzh1 { get; set; }
        public string zfry2 { get; set; }
        public string zfzh2 { get; set; }
        public string lxdh { get; set; }
        public string lxdz { get; set; }
    }

    //询问（调查）通知书
    public class DocumentXWDCTZS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string afsj { get; set; }
        public string afdd { get; set; }
        public string dcxwsj { get; set; }
        public string dcxwdd { get; set; }
        public string wfgd { get; set; }
        public string clsfz { get; set; }
        public string clyyzz { get; set; }
        public string clsfzmhwts { get; set; }
        public string clqtzm { get; set; }
        public string lxr { get; set; }
        public string lxdh { get; set; }
        public string lxdz { get; set; }
        public string fcrq { get; set; }
    }

    //函告书
    public class DocumentHGS
    {
        public int id { get; set; }
        public string dsr { get; set; }
        public string hgsj { get; set; }
        public string lxr { get; set; }
        public string lxdh { get; set; }
        public string lxdz { get; set; }
        public string nrsm { get; set; }
    }

    //罚款催缴通知书
    public class DocumentFKCJTZS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string cfrq { get; set; }
        public string xzcfjdsbh { get; set; }
        public string gdjkrq { get; set; }
        public string yhzh { get; set; }
    }

    //执法文书送达回证
    public class DocumentZFWSSDHZ
    {
        public int id { get; set; }
        public string ssdrmchxm { get; set; }
        public string wsbh { get; set; }
        public string sdwsmcjwh { get; set; }
        public string sdrq { get; set; }
        public string sddd { get; set; }
        public string sdfs { get; set; }
        public string bz { get; set; }
    }

    //行政处罚集体讨论记录
    public class DocumentXZCFJTTLJL
    {
        public int id { get; set; }
        public string ajmc { get; set; }
        public string kssj { get; set; }
        public string jssj { get; set; }
        public string dd { get; set; }
        public string zcr { get; set; }
        public string hbr { get; set; }
        public string jlr { get; set; }
        public string cxryxmjzw { get; set; }
        public string tlnr { get; set; }
        public string tljl { get; set; }
        public string zjxyj { get; set; }
    }

    //责令（限期）整改指令书
    public class DocumentZLXQZGZLS
    {
        public int id { get; set; }
        public string wjbh { get; set; }
        public string dsr { get; set; }
        public string wtms { get; set; }
        public string zfdy1 { get; set; }
        public string zfzh1 { get; set; }
        public string zfdy2 { get; set; }
        public string zfzh2 { get; set; }
      
    }

    //案件移送函
    public class DocumentAJYSH
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string lasj { get; set; }
        public string ay { get; set; }
        public string ysly { get; set; }
        public string yjdflgd { get; set; }
        public string ajxgzl { get; set; }
        public string ysrq { get; set; }

    }

    //移送案件涉案物品清单
    public class DocumentYSAJSAWPQD
    {
        public int id { get; set; }
        public string ysdw { get; set; }
        public string ysajjsr { get; set; }
        public string jssj { get; set; }
        public string ysajysr { get; set; }
        public string yssj { get; set; }
    }

    //移送案件涉案物品清单列表
    public class DocumentYSAJSAWPQDlist
    {
        public int id { get; set; }
        public string ysdw { get; set; }
        public string ysajjsr { get; set; }
        public string jssj { get; set; }
        public string ysajysr { get; set; }
        public string yssj { get; set; }
        public string goodsname { get; set; }
        public int goodscount { get; set; }
        public string goodspj { get; set; }
        public string goodsgg { get; set; }
        public string goodsxh { get; set; }
        public string goodsxt { get; set; }
        public string goodsremark { get; set; }
        public List<DocumentWPQDdt> goodslist { get; set; }
    }

    //物品清单
    public class DocumentWPQD
    {
        public int id { get; set; }
        public int documentid { get; set; }
        public string documentname { get; set; }
        public string goodsname { get; set; }
        public int goodscount { get; set; }
        public string goodspj { get; set; }
        public string goodsgg { get; set; }
        public string goodsxh { get; set; }
        public string goodsxt { get; set; }
        public string goodsremark { get; set; }
    }

    //物品清单dt
    public class DocumentWPQDdt
    {
        public string goodsname { get; set; }
        public int goodscount { get; set; }
        public string goodspj { get; set; }
        public string goodsgg { get; set; }
        public string goodsxh { get; set; }
        public string goodsxt { get; set; }
        public string goodsremark { get; set; }
    }

    //责令（限期）改正通知书
    public class DocumentZLXQGZTZS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string afsj { get; set; }
        public string afdz { get; set; }
        public string wfxw { get; set; }
        public string flyj { get; set; }
        public string gznr { get; set; }
        public string zlgzqx { get; set; }
        public string tzsj { get; set; }
        public string zfry1 { get; set; }
        public string zfzh1 { get; set; }
        public string zfry2 { get; set; }
        public string zfzh2 { get; set; }
        public string lxdh { get; set; }
        public string lxdz { get; set; }

    }

    //调查取证联系函
    public class DocumentDCQZLXH
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string qhbm { get; set; }
        public string cbbm { get; set; }
        public string lxdh { get; set; }
        public string lxr { get; set; }
        public string ajjbqk { get; set; }
        public string qhrq { get; set; }
    }

    //听证报告
    public class DocumentTZBG {
        public int id { get; set; }
        public string ajmc { get; set; }
        public string ajbh { get; set; }
        public string tzrq { get; set; }
        public string tzstime { get; set; }
        public string tzetime { get; set; }
        public string tzdd { get; set; }
        public string tzfs { get; set; }
        public string tzzcr1 { get; set; }
        public string tzy1 { get; set; }
        public string jlr { get; set; }
        public string tzsqr { get; set; }
        public string fddbr { get; set; }
        public string wtdlr { get; set; }
        public string ajdcr { get; set; }
        public string gzdw { get; set; }
        public string tzhjbqk { get; set; }
        public string ajss { get; set; }
        public string clyjjjy { get; set; }
        public string tzzcr2 { get; set; }
        public string tzy2 { get; set; }
       
    }

    //听证笔录
    public class DocumentTZBL
    {
        public int id { get; set; }
        public string ajmc { get; set; }
        public string ajbh { get; set; }
        public string tzrq { get; set; }
        public string tzkssj { get; set; }
        public string tzjssj { get; set; }
        public string tzdd { get; set; }
        public string tzfs { get; set; }
        public string tzsqr { get; set; }
        public string fzr { get; set; }
        public string xb { get; set; }
        public string gzdw { get; set; }
        public string zwhzy { get; set; }
        public string sfzh { get; set; }
        public string zzhzs { get; set; }
        public string yb { get; set; }
        public string dh { get; set; }
        public string wtdlr1 { get; set; }
        public string xb1 { get; set; }
        public string sfzh1 { get; set; }
        public string gzdw1 { get; set; }
        public string zw1 { get; set; }
        public string dh1 { get; set; }
        public string wtdlr2 { get; set; }
        public string xb2 { get; set; }
        public string sfzh2 { get; set; }
        public string gzdw2 { get; set; }
        public string zw2 { get; set; }
        public string dh2 { get; set; }
        public string qtcjr { get; set; }
        public string ajdcr1 { get; set; }
        public string gzdwjzw1 { get; set; }
        public string ajdcr2 { get; set; }
        public string gzdwjzw2 { get; set; }
        public string tzzcr { get; set; }
        public string tzr { get; set; }
        public string jlr { get; set; }
        public string gzdw3 { get; set; }
        public string tzbl { get; set; }
    }

    //听证通知书
    public class DocumentTZTZS {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string sqsj { get; set; }
        public string ay { get; set; }
        public string tzsj { get; set; }
        public string tzdd { get; set; }
        public string tzzcr { get; set; }
        public string tzy { get; set; }
        public string jlr { get; set; }
        public string xgsx { get; set; }
        public string lxr { get; set; }
        public string lxdh { get; set; }
        public string dz { get; set; }
        public string yzbm { get; set; }
    }

    //陈述申辩笔录
    public class DocumentCSSBBL {
        public int id { get; set; }
        public string sbsj { get; set; }
        public string sbdd { get; set; }
        public string dsrjbqk { get; set; }
        public string sx { get; set; }
        public string cssbnr { get; set; }
      
    }

    //抄告单
    public class DocumentCGD
    {
        public int id { get; set; }
        public string cgdw { get; set; }
        public string dsr { get; set; }
        public string wfsj { get; set; }
        public string xdzgtzsj { get; set; }
        public string lasj { get; set; }
        public string afdz { get; set; }
        public string wfxwms { get; set; }
        public string wfdgd { get; set; }
        public string cgnr { get; set; }
        public string lxr { get; set; }
        public string lxdh { get; set; }
        public string lxdz { get; set; }
    }

    //非法财物移交书
    public class DocumentFFCWYJS
    {
        public int id { get; set; }
        public string yjdw { get; set; }
        public string dsr { get; set; }
        public string wfsj { get; set; }
        public string wfdd { get; set; }
        public string rdwfssms { get; set; }
        public string wfdfl { get; set; }
        public string jdskjrq { get; set; }
        public string jdsbh { get; set; }
    }

    //催 告 书
    public class DocumentCGS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string cgsj { get; set; }
        public string cgnr { get; set; }
       
    }

    //抽样取证通知书
    public class DocumentCYQZTZS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string tzsj { get; set; }
        public string wfxw { get; set; }
        public string wfdgd { get; set; }
        public string cydz { get; set; }
        public string bcyqzr { get; set; }
        public string tztime { get; set; }
        public string zfry { get; set; }
        public string zfsj { get; set; }
        public string sftjcwtzs { get; set; }
    }

    //抽样取证通知书清单
    public class DocumentCYQZTZSList
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string tzsj { get; set; }
        public string wfxw { get; set; }
        public string wfdgd { get; set; }
        public string cydz { get; set; }
        public string bcyqzr { get; set; }
        public string tztime { get; set; }
        public string zfry { get; set; }
        public string zfsj { get; set; }
        public string goodsname { get; set; }
        public int goodscount { get; set; }
        public string goodspj { get; set; }
        public string goodsgg { get; set; }
        public string goodsxh { get; set; }
        public string goodsxt { get; set; }
        public string goodsremark { get; set; }
        public List<DocumentWPQDdt> goodslist { get; set; }
    }

    //抽样取证物品处理通知书
    public class DocumentCYQZWPCLTZS
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string qztzsj { get; set; }
        public string qzwp { get; set; }
        public string yjdflgd { get; set; }
        public string cyqztzsbh { get; set; }
        public string cljg { get; set; }
        public string bcyqzr { get; set; }
        public string tzsj { get; set; }
        public string zfry { get; set; }
        public string zfsj { get; set; }
    }

    //抽样取证物品处理通知书
    public class DocumentCYQZWPCLTZSList
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string dsr { get; set; }
        public string qztzsj { get; set; }
        public string qzwp { get; set; }
        public string yjdflgd { get; set; }
        public string cyqztzsbh { get; set; }
        public string cljg { get; set; }
        public string bcyqzr { get; set; }
        public string tzsj { get; set; }
        public string zfry { get; set; }
        public string zfsj { get; set; }
        public string goodsname { get; set; }
        public int goodscount { get; set; }
        public string goodspj { get; set; }
        public string goodsgg { get; set; }
        public string goodsxh { get; set; }
        public string goodsxt { get; set; }
        public string goodsremark { get; set; }
        public List<DocumentWPQDdt> goodslist { get; set; }
    }

    //罚款收缴凭证
    public class DocumentFKSJPZ
    {
        public int id { get; set; }
        public string wsbh { get; set; }
        public string bcfr { get; set; }
        public string fkpjbh { get; set; }
    }

    //文书附件
    public class DocumentFileModel
    {
        public int id { get; set; }
        public Nullable<int> documentid { get; set; }
        public string documenttype { get; set; }
        public string filename { get; set; }
        public string filepath { get; set; }
        public string filetype { get; set; }
        public Nullable<double> filesize { get; set; }
        public string remark { get; set; }
    }

    //Excel导出列表
    public class Columnmodel
    {
        //列码
        public string ColumnCode { get; set; }
        //列名
        public string ColumnName { get; set; }
    }
}
