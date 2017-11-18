using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using NPOI.HSSF.UserModel;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
    public class DocumentReplaceHandleBLL
    {
        //案件来源表
        public Dictionary<string, string> GetDocumentDictory(Case_CaseSourcesModel model)
        {
            Case_SourcesBLL bll = new Case_SourcesBLL();
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$案件来源$", model.sourceid == 0 ? "" : bll.GetSourcesNameByID(model.sourceid));
            dic.Add("$联系人$", string.IsNullOrEmpty(model.contact) ? "" : model.contact);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.contactphone) ? "" : model.contactphone);
            dic.Add("$地址$", string.IsNullOrEmpty(model.contactaddress) ? "" : model.contactaddress);
            dic.Add("$违法行为发生地$", string.IsNullOrEmpty(model.wfxwfsdz) ? "" : model.wfxwfsdz);
            dic.Add("$线索内容$", string.IsNullOrEmpty(model.cluecontent) ? "" : model.cluecontent);
            dic.Add("$记录人$", string.IsNullOrEmpty(model.notetaker) ? "" : model.notetaker);
            dic.Add("$处理意见$", string.IsNullOrEmpty(model.processopinion) ? "" : model.processopinion);
            dic.Add("$记录时间$", model.notetime == null ? "" : Convert.ToDateTime(model.notetime).ToString("yyyy年M月d日"));
            return dic;
        }

        //立案审批表
        public Dictionary<string, string> GetDocumentDictory(Case_SimpleCasesModel model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$案件名称$", string.IsNullOrEmpty(model.casename) ? "" : model.casename);
            dic.Add("$案件来源$", string.IsNullOrEmpty(model.casesourcename) ? "" : model.casesourcename);
            dic.Add("$单位$", string.IsNullOrEmpty(model.f_name) ? "" : model.f_name);
            dic.Add("$证件类型1$", string.IsNullOrEmpty(model.f_cardtypename) ? "营业执照号" : model.f_cardtypename);
            dic.Add("$营业执照$", string.IsNullOrEmpty(model.f_card) ? "" : model.persontype == "type_dw" ? model.f_card : "");
            dic.Add("$法定代表人$", string.IsNullOrEmpty(model.f_dbr) ? "" : model.f_dbr);
            dic.Add("$电话1$", string.IsNullOrEmpty(model.f_contactphone) ? "" : model.f_contactphone);
            dic.Add("$住址1$", string.IsNullOrEmpty(model.f_contactaddress) ? "" : model.f_contactaddress);
            dic.Add("$个人$", string.IsNullOrEmpty(model.p_name) ? "" : model.p_name);
            dic.Add("$证件类型2$", string.IsNullOrEmpty(model.p_cardtypename) ? "身份证号" : model.p_cardtypename);
            dic.Add("$身份证号$", string.IsNullOrEmpty(model.f_card) ? "" : model.persontype == "type_zrr" ? model.f_card : "");
            dic.Add("$电话2$", string.IsNullOrEmpty(model.p_contactphone) ? "" : model.p_contactphone);
            dic.Add("$住址2$", string.IsNullOrEmpty(model.p_contactaddress) ? "" : model.p_contactaddress);
            dic.Add("$案件详情$", string.IsNullOrEmpty(model.casecontent) ? "" : model.casecontent);
            dic.Add("$承办人$", string.IsNullOrEmpty(model.zfr_name) ? "" : model.zfr_name);
            dic.Add("$承办人意见$", "");
            dic.Add("$承办人时间$", model.createtime == null ? "" : Convert.ToDateTime(model.createtime).ToString("yyyy年M月d日"));
            dic.Add("$承办机构$", "");
            dic.Add("$承办机构意见$", "");
            dic.Add("$承办机构时间$", "");
            dic.Add("$法制机构$", "");
            dic.Add("$法制机构意见$", "");
            dic.Add("$法制机构时间$", "");
            dic.Add("$审核人$", "");
            dic.Add("$审核意见$", "");
            dic.Add("$审核时间$", "");
            return dic;
        }

        //立案审批表
        public Dictionary<string, string> GetDocumentDictory(Case_CasesModel model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$案件名称$", string.IsNullOrEmpty(model.casename) ? "" : model.casename);
            dic.Add("$案件来源$", string.IsNullOrEmpty(model.casesourcename) ? "" : model.casesourcename);
            dic.Add("$单位$", string.IsNullOrEmpty(model.f_name) ? "" : model.f_name);
            dic.Add("$证件类型1$", string.IsNullOrEmpty(model.f_cardtypename) ? "营业执照号" : model.f_cardtypename);
            dic.Add("$营业执照$", string.IsNullOrEmpty(model.f_card) ? "" : model.persontype == "type_dw" ? model.f_card : "");
            dic.Add("$法定代表人$", string.IsNullOrEmpty(model.f_dbr) ? "" : model.f_dbr);
            dic.Add("$电话1$", string.IsNullOrEmpty(model.f_contactphone) ? "" : model.f_contactphone);
            dic.Add("$住址1$", string.IsNullOrEmpty(model.f_contactaddress) ? "" : model.f_contactaddress);
            dic.Add("$个人$", string.IsNullOrEmpty(model.p_name) ? "" : model.p_name);
            dic.Add("$证件类型2$", string.IsNullOrEmpty(model.p_cardtypename) ? "身份证号" : model.p_cardtypename);
            dic.Add("$身份证号$", string.IsNullOrEmpty(model.f_card) ? "" : model.persontype == "type_zrr" ? model.f_card : "");
            dic.Add("$电话2$", string.IsNullOrEmpty(model.p_contactphone) ? "" : model.p_contactphone);
            dic.Add("$住址2$", string.IsNullOrEmpty(model.p_contactaddress) ? "" : model.p_contactaddress);
            dic.Add("$案件详情$", string.IsNullOrEmpty(model.casecontent) ? "" : model.casecontent);
            dic.Add("$承办人$", string.IsNullOrEmpty(model.cbr) ? "" : model.cbr);
            dic.Add("$承办人意见$", string.IsNullOrEmpty(model.cbryj) ? "" : model.cbryj);
            dic.Add("$承办人时间$", model.cbrtime == null ? "" : Convert.ToDateTime(model.cbrtime).ToString("yyyy年M月d日"));
            dic.Add("$承办机构$", string.IsNullOrEmpty(model.cbjg) ? "" : model.cbjg);
            dic.Add("$承办机构意见$", string.IsNullOrEmpty(model.cbjgyj) ? "" : model.cbjgyj);
            dic.Add("$承办机构时间$", model.cbjgtime == null ? "" : Convert.ToDateTime(model.cbjgtime).ToString("yyyy年M月d日"));
            dic.Add("$法制机构$", string.IsNullOrEmpty(model.fzjg) ? "" : model.fzjg);
            dic.Add("$法制机构意见$", string.IsNullOrEmpty(model.fzjgyj) ? "" : model.fzjgyj);
            dic.Add("$法制机构时间$", model.fzjgtime == null ? "" : Convert.ToDateTime(model.fzjgtime).ToString("yyyy年M月d日"));
            dic.Add("$审核人$", string.IsNullOrEmpty(model.shr) ? "" : model.shr);
            dic.Add("$审核意见$", string.IsNullOrEmpty(model.shryj) ? "" : model.shryj);
            dic.Add("$审核时间$", model.shrtime == null ? "" : Convert.ToDateTime(model.shrtime).ToString("yyyy年M月d日"));
            return dic;
        }

        //市民交办单
        public Dictionary<string, string> GetDocumentDictory(SM_CitizenServicesModel model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$交办单编号$", string.IsNullOrEmpty(model.eventid) ? "" : model.eventid);
            dic.Add("$事件来源$", string.IsNullOrEmpty(model.sourcename) ? "" : model.sourcename);
            dic.Add("$事件大类$", string.IsNullOrEmpty(model.bigtypename) ? "" : model.bigtypename);
            dic.Add("$值班时间$", model.dutytime == null ? "" : Convert.ToDateTime(model.dutytime).ToString("yyyy年M月d日"));
            dic.Add("$发现时间$", model.foundtime == null ? "" : Convert.ToDateTime(model.foundtime).ToString("yyyy年M月d日"));
            dic.Add("$限办时间$", model.limittime == null ? "" : Convert.ToDateTime(model.limittime).ToString("yyyy年M月d日"));
            dic.Add("$上报人$", string.IsNullOrEmpty(model.recorduser) ? "" : model.recorduser);
            dic.Add("$投诉人$", string.IsNullOrEmpty(model.complainant) ? "" : model.complainant);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.contactphone) ? "" : model.contactphone);
            dic.Add("$事件地址$", string.IsNullOrEmpty(model.eventaddress) ? "" : model.eventaddress);
            dic.Add("$事件标题$", string.IsNullOrEmpty(model.eventtitle) ? "" : model.eventtitle);
            dic.Add("$事件内容$", string.IsNullOrEmpty(model.eventcontent) ? "" : model.eventcontent);
            dic.Add("$领导意见$", string.IsNullOrEmpty(model.ldsuggest) ? "" : model.ldsuggest);
            dic.Add("$中队或单位$", string.IsNullOrEmpty(model.pqunitname) ? "" : model.pqunitname);
            dic.Add("$处理结果$", string.IsNullOrEmpty(model.content) ? "" : model.content);
            dic.Add("$中队队员$", string.IsNullOrEmpty(model.pqusername) ? "" : model.pqusername);
            dic.Add("$队员电话$", string.IsNullOrEmpty(model.pqmobile) ? "" : model.pqmobile);
            dic.Add("$办结时间$", model.dealtime == null ? "" : Convert.ToDateTime(model.dealtime).ToString("yyyy年M月d日"));
            dic.Add("$满意度$", string.IsNullOrEmpty(model.satisfaction) ? "" : model.satisfaction);
            return dic;
        }

        //现场检查勘验笔录
        public Dictionary<string, string> GetDocumentDictory(DocumentXCJCKYBL model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$地点$", string.IsNullOrEmpty(model.jcplace) ? "" : model.jcplace);
            dic.Add("$勘验人1$", string.IsNullOrEmpty(model.zkyr) ? "" : model.zkyr);
            dic.Add("$勘验人2$", string.IsNullOrEmpty(model.xkyr) ? "" : model.xkyr);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$负责人$", string.IsNullOrEmpty(model.xcfzr) ? "" : model.xcfzr);
            dic.Add("$被邀请人$", string.IsNullOrEmpty(model.byqr) ? "" : model.byqr);
            dic.Add("$记录人$", string.IsNullOrEmpty(model.jlr) ? "" : model.jlr);
            dic.Add("$职务1$", string.IsNullOrEmpty(model.zdwzw) ? "" : model.zdwzw);
            dic.Add("$职务2$", string.IsNullOrEmpty(model.xdwzw) ? "" : model.xdwzw);
            dic.Add("$职务3$", string.IsNullOrEmpty(model.dsrdwzw) ? "" : model.dsrdwzw);
            dic.Add("$职务4$", string.IsNullOrEmpty(model.xcdwzw) ? "" : model.xcdwzw);
            dic.Add("$职务5$", string.IsNullOrEmpty(model.byqdwzw) ? "" : model.byqdwzw);
            dic.Add("$职务6$", string.IsNullOrEmpty(model.jlrdwzw) ? "" : model.jlrdwzw);
            dic.Add("$执法人1$", string.IsNullOrEmpty(model.zzfry) ? "" : model.zzfry);
            dic.Add("$执法人2$", string.IsNullOrEmpty(model.xzfry) ? "" : model.xzfry);
            dic.Add("$证件号码1$", string.IsNullOrEmpty(model.zzjhm) ? "" : model.zzjhm);
            dic.Add("$证件号码2$", string.IsNullOrEmpty(model.xzjhm) ? "" : model.xzjhm);
            dic.Add("$现场情况$", string.IsNullOrEmpty(model.xcqk) ? "" : model.xcqk);
            dic.Add("$见证人$", string.IsNullOrEmpty(model.jzr) ? "" : model.jzr);
            dic.Add("$检查勘验日期$", string.IsNullOrEmpty(model.jcdate) ? "" : Convert.ToDateTime(model.jcdate).ToString("yyyy年M月d日"));
            dic.Add("$检查勘验开始时间$", string.IsNullOrEmpty(model.sjctime) ? "" : Convert.ToDateTime(model.sjctime).ToString("HH时mm分"));
            dic.Add("$检查勘验结束时间$", string.IsNullOrEmpty(model.ejctime) ? "" : Convert.ToDateTime(model.ejctime).ToString("HH时mm分"));
            return dic;
        }

        //调查询问笔录
        public Dictionary<string, string> GetDocumentDictory(DocumentDCXWBL model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$案由$", string.IsNullOrEmpty(model.casereason) ? "" : model.casereason);
            dic.Add("$地点$", string.IsNullOrEmpty(model.dcplace) ? "" : model.dcplace);
            dic.Add("$被调查人$", string.IsNullOrEmpty(model.bdcuser) ? "" : model.bdcuser);
            dic.Add("$性别$", string.IsNullOrEmpty(model.sex) ? "" : model.sex);
            dic.Add("$民族$", string.IsNullOrEmpty(model.mz) ? "" : model.mz);
            dic.Add("$身份证号码$", string.IsNullOrEmpty(model.sfz) ? "" : model.sfz);
            dic.Add("$工作单位$", string.IsNullOrEmpty(model.gzdw) ? "" : model.gzdw);
            dic.Add("$职务$", string.IsNullOrEmpty(model.zwzy) ? "" : model.zwzy);
            dic.Add("$电话$", string.IsNullOrEmpty(model.phone) ? "" : model.phone);
            dic.Add("$住址$", string.IsNullOrEmpty(model.address) ? "" : model.address);
            dic.Add("$邮编$", string.IsNullOrEmpty(model.zipcode) ? "" : model.zipcode);
            dic.Add("$关系$", string.IsNullOrEmpty(model.ybagx) ? "" : model.ybagx);
            dic.Add("$调查人1$", string.IsNullOrEmpty(model.zdcxwr) ? "" : model.zdcxwr);
            dic.Add("$调查人2$", string.IsNullOrEmpty(model.xdcxwr) ? "" : model.xdcxwr);
            dic.Add("$执法证号1$", string.IsNullOrEmpty(model.zzfzh) ? "" : model.zzfzh);
            dic.Add("$执法证号2$", string.IsNullOrEmpty(model.xzfzh) ? "" : model.xzfzh);
            dic.Add("$记录人$", string.IsNullOrEmpty(model.jlperson) ? "" : model.jlperson);
            dic.Add("$在场人$", string.IsNullOrEmpty(model.zcperson) ? "" : model.zcperson);
            dic.Add("$确认记录$", string.IsNullOrEmpty(model.sfqr) ? "" : model.sfqr);
            dic.Add("$违法行为$", string.IsNullOrEmpty(model.sfhb) ? "" : model.sfhb);
            dic.Add("$询问内容$", string.IsNullOrEmpty(model.sftq) ? "" : model.sftq);
            dic.Add("$补充$", string.IsNullOrEmpty(model.remark) ? "" : model.remark);
            dic.Add("$调查询问日期$", string.IsNullOrEmpty(model.dcdate) ? "" : Convert.ToDateTime(model.dcdate).ToString("yyyy年M月d日"));
            dic.Add("$调查询问开始时间$", string.IsNullOrEmpty(model.sdctime) ? "" : Convert.ToDateTime(model.sdctime).ToString("HH时mm分"));
            dic.Add("$调查询问结束时间$", string.IsNullOrEmpty(model.edctime) ? "" : Convert.ToDateTime(model.edctime).ToString("HH时mm分"));
            return dic;
        }

        //案件处理所有环节文书
        public Dictionary<string, string> GetDocumentDictory(DocumentAllHJWS model)
        {
            DateTime dt = DateTime.Now;
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$申请事项$", string.IsNullOrEmpty(model.sqsx) ? "" : model.sqsx);
            dic.Add("$案件名称$", string.IsNullOrEmpty(model.casename) ? "" : model.casename);
            dic.Add("$立案编号$", string.IsNullOrEmpty(model.casebh) ? "" : model.casebh);
            dic.Add("$案件来源$", string.IsNullOrEmpty(model.casesource) ? "" : model.casesource);
            dic.Add("$立案日期$", string.IsNullOrEmpty(model.sitedatetime) ? "" : model.sitedatetime.Split(' ')[0]);
            dic.Add("$单位$", string.IsNullOrEmpty(model.f_name) ? "" : model.f_name);
            dic.Add("$证件类型1$", string.IsNullOrEmpty(model.f_cardtypename) ? "营业执照号" : model.f_cardtypename);
            dic.Add("$营业执照$", string.IsNullOrEmpty(model.f_card) ? "" : model.persontype == "type_dw"?model.f_card:"");
            dic.Add("$法定代表人$", string.IsNullOrEmpty(model.f_dbr) ? "" : model.f_dbr);
            dic.Add("$电话1$", string.IsNullOrEmpty(model.f_contactphone) ? "" : model.f_contactphone);
            dic.Add("$住址1$", string.IsNullOrEmpty(model.f_contactaddress) ? "" : model.f_contactaddress);
            dic.Add("$个人$", string.IsNullOrEmpty(model.p_name) ? "" : model.p_name);
            dic.Add("$证件类型2$", string.IsNullOrEmpty(model.p_cardtypename) ? "身份证号" : model.p_cardtypename);
            dic.Add("$身份证号$", string.IsNullOrEmpty(model.f_card) ? "" : model.persontype == "type_zrr"?model.f_card:"");
            dic.Add("$电话2$", string.IsNullOrEmpty(model.p_contactphone) ? "" : model.p_contactphone);
            dic.Add("$住址2$", string.IsNullOrEmpty(model.p_contactaddress) ? "" : model.p_contactaddress);
            dic.Add("$案件详情$", string.IsNullOrEmpty(model.casecontent) ? "" : model.casecontent);
            dic.Add("$调查经过$", string.IsNullOrEmpty(model.dcjg) ? "" : model.dcjg);
            dic.Add("$违法事实$", string.IsNullOrEmpty(model.wfss) ? "" : model.wfss);
            dic.Add("$案件定性$", string.IsNullOrEmpty(model.ajdxremark) ? "" : model.ajdxremark);
            dic.Add("$简要案情$", string.IsNullOrEmpty(model.jyaq) ? "" : model.jyaq);
            dic.Add("$行政处罚金额$", string.IsNullOrEmpty(model.xzcfje) ? "" : model.xzcfje);
            dic.Add("$行政处罚内容$", string.IsNullOrEmpty(model.xzcfnr) ? "" : model.xzcfnr);
            dic.Add("$行政处罚方式$", string.IsNullOrEmpty(model.xzcffs) ? "" : model.xzcffs);
            dic.Add("$承办人$", string.IsNullOrEmpty(model.cbr) ? "" : model.cbr);
            dic.Add("$承办人意见$", string.IsNullOrEmpty(model.cbryj) ? "" : model.cbryj);
            dic.Add("$承办人时间$", model.cbrtime == null ? "" : Convert.ToDateTime(model.cbrtime).ToString("yyyy年M月d日"));
            dic.Add("$承办机构$", string.IsNullOrEmpty(model.cbjg) ? "" : model.cbjg);
            dic.Add("$承办机构意见$", string.IsNullOrEmpty(model.cbjgyj) ? "" : model.cbjgyj);
            dic.Add("$承办机构时间$", model.cbjgtime == null ? "" : Convert.ToDateTime(model.cbjgtime).ToString("yyyy年M月d日"));
            dic.Add("$法制机构$", string.IsNullOrEmpty(model.fzjg) ? "" : model.fzjg);
            dic.Add("$法制机构意见$", string.IsNullOrEmpty(model.fzjgyj) ? "" : model.fzjgyj);
            dic.Add("$法制机构时间$", model.fzjgtime == null ? "" : Convert.ToDateTime(model.fzjgtime).ToString("yyyy年M月d日"));
            dic.Add("$审核人$", string.IsNullOrEmpty(model.shr) ? "" : model.shr);
            dic.Add("$审核意见$", string.IsNullOrEmpty(model.shryj) ? "" : model.shryj);
            dic.Add("$审核时间$", model.shrtime == null ? "" : Convert.ToDateTime(model.shrtime).ToString("yyyy年M月d日"));
            return dic;
        }

        //行政处罚事先告知书
        public Dictionary<string, string> GetDocumentDictory(DocumentXZCFSXGZS model)
        {
            DateTime dt = DateTime.Now;
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$单位地址$", string.IsNullOrEmpty(model.dwdz) ? "" : model.dwdz);
            dic.Add("$邮政编码$", string.IsNullOrEmpty(model.yzbm) ? "" : model.yzbm);
            dic.Add("$联系人$", string.IsNullOrEmpty(model.lxr) ? "" : model.lxr);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$创建时间$", dt.ToString("yyyy年M月d日"));
            dic.Add("$正文$", string.IsNullOrEmpty(model.gzszw) ? "" : model.gzszw);

            return dic;
        }

        //行政处罚决定书
        public Dictionary<string, string> GetDocumentDictory(DocumentXZCFJDS model, string persontype)
        {
            DateTime dt = DateTime.Now;
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$基本情况$", persontype == "type_zrr" ? (model.dsr + "  性别:" + model.xb + "  证件类型:" + model.zjlx + "  证件号:" + model.zjh + "  住址:" + model.address) : (model.dwmc + "  法定代表人:" + model.fddbr + "  证件类型:" + model.zjlx + "  证件号:" + model.zjh + "  地址:" + model.address));
            dic.Add("$创建时间$", dt.ToString("yyyy年M月d日"));
            dic.Add("$正文$", string.IsNullOrEmpty(model.jdszw) ? "" : model.jdszw);

            return dic;
        }

        //照片（图片、影像资料）证据
        public Dictionary<string, string> GetDocumentDictory(DocumentZPZJ model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$说明反映问题$", string.IsNullOrEmpty(model.smfywt) ? "" : model.smfywt);
            dic.Add("$拍摄地点$", string.IsNullOrEmpty(model.psdd) ? "" : model.psdd);
            dic.Add("$拍摄人$", string.IsNullOrEmpty(model.psr) ? "" : model.psr);
            dic.Add("$当事见证人$", string.IsNullOrEmpty(model.dsrhjzr) ? "" : model.dsrhjzr);
            dic.Add("$执法人员1$", string.IsNullOrEmpty(model.zfry1) ? "" : model.zfry1);
            dic.Add("$执法证号1$", string.IsNullOrEmpty(model.zfzh1) ? "" : model.zfzh1);
            dic.Add("$执法人员2$", string.IsNullOrEmpty(model.zfry2) ? "" : model.zfry2);
            dic.Add("$执法证号2$", string.IsNullOrEmpty(model.zfzh2) ? "" : model.zfzh2);
            dic.Add("$备注$", string.IsNullOrEmpty(model.remark) ? "" : model.remark);
            dic.Add("$拍摄时间$", string.IsNullOrEmpty(model.pssj) ? "" : Convert.ToDateTime(model.pssj).ToString("yyyy年M月d日"));

            return dic;
        }

        //责令停止违法行为通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentZLTZWFXWTZS model)
        {
            DateTime dt = DateTime.Now;
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$案发时间$", string.IsNullOrEmpty(model.afsj) ? "" : Convert.ToDateTime(model.afsj).ToString("yyyy年M月d日"));
            dic.Add("$案发地址$", string.IsNullOrEmpty(model.afdz) ? "" : model.afdz);
            dic.Add("$违法行为$", string.IsNullOrEmpty(model.wfxw) ? "" : model.wfxw);
            dic.Add("$执法人员1$", string.IsNullOrEmpty(model.zfry1) ? "" : model.zfry1);
            dic.Add("$执法证件1$", string.IsNullOrEmpty(model.zfzh1) ? "" : model.zfzh1);
            dic.Add("$执法人员2$", string.IsNullOrEmpty(model.zfry2) ? "" : model.zfry2);
            dic.Add("$执法证件2$", string.IsNullOrEmpty(model.zfzh2) ? "" : model.zfzh2);
            dic.Add("$电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$地址$", string.IsNullOrEmpty(model.lxdz) ? "" : model.lxdz);
            dic.Add("$创建时间$", dt.ToString("yyyy年M月d日"));

            return dic;
        }

        //询问（调查）通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentXWDCTZS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$案发地点$", string.IsNullOrEmpty(model.afdd) ? "" : model.afdd);
            dic.Add("$违反规定$", string.IsNullOrEmpty(model.wfgd) ? "" : model.wfgd);
            dic.Add("$调查询问时间$", string.IsNullOrEmpty(model.dcxwsj) ? "" : Convert.ToDateTime(model.dcxwsj).ToString("yyyy年M月d日"));
            dic.Add("$调查地点$", string.IsNullOrEmpty(model.dcxwdd) ? "" : model.dcxwdd);
            dic.Add("$身份证$", string.IsNullOrEmpty(model.clsfz) ? "" : model.clsfz);
            dic.Add("$营业执照$", string.IsNullOrEmpty(model.clyyzz) ? "" : model.clyyzz);
            dic.Add("$身份证明或者委托书$", string.IsNullOrEmpty(model.clsfzmhwts) ? "" : model.clsfzmhwts);
            dic.Add("$其他证明$", string.IsNullOrEmpty(model.clqtzm) ? "" : model.clqtzm);
            dic.Add("$联系人$", string.IsNullOrEmpty(model.lxr) ? "" : model.lxr);
            dic.Add("$电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$地址$", string.IsNullOrEmpty(model.lxdz) ? "" : model.lxdz);
            dic.Add("$发出日期$", string.IsNullOrEmpty(model.fcrq) ? "" : Convert.ToDateTime(model.fcrq).ToString("yyyy年M月d日"));

            return dic;
        }

        //函告书
        public Dictionary<string, string> GetDocumentDictory(DocumentHGS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$函告时间$", string.IsNullOrEmpty(model.hgsj) ? "" : Convert.ToDateTime(model.hgsj).ToString("yyyy年M月d日"));
            dic.Add("$正文$", string.IsNullOrEmpty(model.nrsm) ? "" : model.nrsm);
            dic.Add("$联系人$", string.IsNullOrEmpty(model.lxr) ? "" : model.lxr);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$联系地址$", string.IsNullOrEmpty(model.lxdz) ? "" : model.lxdz);
            return dic;
        }

        //罚款催缴通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentFKCJTZS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$处罚日期$", string.IsNullOrEmpty(model.cfrq) ? "" : Convert.ToDateTime(model.cfrq).ToString("yyyy年M月d日"));
            dic.Add("$决定书编号$", string.IsNullOrEmpty(model.xzcfjdsbh) ? "" : model.xzcfjdsbh);
            dic.Add("$规定缴款日期$", string.IsNullOrEmpty(model.gdjkrq) ? "" : Convert.ToDateTime(model.gdjkrq).ToString("yyyy年M月d日"));
            dic.Add("$银行账号$", string.IsNullOrEmpty(model.yhzh) ? "" : model.yhzh);
            return dic;
        }

        //罚款催缴通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentZFWSSDHZ model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$受送达人名称或姓名$", string.IsNullOrEmpty(model.ssdrmchxm) ? "" : model.ssdrmchxm);
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$送达文书名称及文号$", string.IsNullOrEmpty(model.sdwsmcjwh) ? "" : model.sdwsmcjwh);
            dic.Add("$送达日期$", string.IsNullOrEmpty(model.sdrq) ? "" : Convert.ToDateTime(model.sdrq).ToString("yyyy年M月d日"));
            dic.Add("$送达地点$", string.IsNullOrEmpty(model.sddd) ? "" : model.sddd);
            dic.Add("$送达方式$", string.IsNullOrEmpty(model.sdfs) ? "" : model.sdfs);
            dic.Add("$备注$", string.IsNullOrEmpty(model.bz) ? "" : model.bz);
            return dic;
        }

        //行政处罚集体讨论记录
        public Dictionary<string, string> GetDocumentDictory(DocumentXZCFJTTLJL model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$案件名称$", string.IsNullOrEmpty(model.ajmc) ? "" : model.ajmc);
            dic.Add("$开始时间$", string.IsNullOrEmpty(model.kssj) ? "" : Convert.ToDateTime(model.kssj).ToString("yyyy年M月d日HH时mm分"));
            dic.Add("$结束时间$", string.IsNullOrEmpty(model.jssj) ? "" : Convert.ToDateTime(model.jssj).ToString("yyyy年M月d日HH时mm分"));
            dic.Add("$地点$", string.IsNullOrEmpty(model.dd) ? "" : model.dd);
            dic.Add("$主持人$", string.IsNullOrEmpty(model.zcr) ? "" : model.zcr);
            dic.Add("$汇报人$", string.IsNullOrEmpty(model.hbr) ? "" : model.hbr);
            dic.Add("$记录人$", string.IsNullOrEmpty(model.jlr) ? "" : model.jlr);

            dic.Add("$出席人员姓名及职务$", string.IsNullOrEmpty(model.cxryxmjzw) ? "" : model.cxryxmjzw);
            dic.Add("$讨论内容$", string.IsNullOrEmpty(model.tlnr) ? "" : model.tlnr);
            dic.Add("$讨论记录$", string.IsNullOrEmpty(model.tljl) ? "" : model.tljl);
            dic.Add("$结论性意见$", string.IsNullOrEmpty(model.zjxyj) ? "" : model.zjxyj);
            return dic;
        }

        //责令（限期）整改指令书
        public Dictionary<string, string> GetDocumentDictory(DocumentZLXQZGZLS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wjbh) ? "" : model.wjbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$正文$", string.IsNullOrEmpty(model.wtms) ? "" : model.wtms);
            dic.Add("$执法人员1$", string.IsNullOrEmpty(model.zfdy1) ? "" : model.zfdy1);
            dic.Add("$执法证号1$", string.IsNullOrEmpty(model.zfzh1) ? "" : model.zfzh1);
            dic.Add("$执法人员2$", string.IsNullOrEmpty(model.zfdy2) ? "" : model.zfdy2);
            dic.Add("$执法证号2$", string.IsNullOrEmpty(model.zfzh2) ? "" : model.zfzh2);
            return dic;
        }

        //案件移送函
        public Dictionary<string, string> GetDocumentDictory(DocumentAJYSH model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$立案时间$", string.IsNullOrEmpty(model.lasj) ? "" : Convert.ToDateTime(model.lasj).ToString("yyyy年M月d日"));
            dic.Add("$案由$", string.IsNullOrEmpty(model.ay) ? "" : model.ay);
            dic.Add("$移送理由$", string.IsNullOrEmpty(model.ysly) ? "" : model.ysly);
            dic.Add("$依据的法律规定$", string.IsNullOrEmpty(model.yjdflgd) ? "" : model.yjdflgd);
            dic.Add("$案件相关资料$", string.IsNullOrEmpty(model.ajxgzl) ? "" : model.ajxgzl);
            dic.Add("$移送日期$", string.IsNullOrEmpty(model.ysrq) ? "" : Convert.ToDateTime(model.ysrq).ToString("yyyy年M月d日"));
            return dic;
        }

        //移送案件涉案物品清单
        public Dictionary<string, string> GetDocumentDictory(DocumentYSAJSAWPQD model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$移送单位$", string.IsNullOrEmpty(model.ysdw) ? "" : model.ysdw);
            dic.Add("$接收人$", string.IsNullOrEmpty(model.ysajjsr) ? "" : model.ysajjsr);
            dic.Add("$接收时间$", string.IsNullOrEmpty(model.jssj) ? "" : Convert.ToDateTime(model.jssj).ToString("yyyy年M月d日"));
            dic.Add("$移送人$", string.IsNullOrEmpty(model.ysajysr) ? "" : model.ysajysr);
            dic.Add("$移送时间$", string.IsNullOrEmpty(model.yssj) ? "" : Convert.ToDateTime(model.yssj).ToString("yyyy年M月d日"));//^p
            return dic;
        }

        //责令（限期）改正通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentZLXQGZTZS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$案发时间$", string.IsNullOrEmpty(model.afsj) ? "" : Convert.ToDateTime(model.afsj).ToString("yyyy年M月d日"));
            dic.Add("$案发地址$", string.IsNullOrEmpty(model.afdz) ? "" : model.afdz);
            dic.Add("$违法行为$", string.IsNullOrEmpty(model.wfxw) ? "" : model.wfxw);
            dic.Add("$法律依据$", string.IsNullOrEmpty(model.flyj) ? "" : model.flyj);
            dic.Add("$责令改正期限$", string.IsNullOrEmpty(model.zlgzqx) ? "" : Convert.ToDateTime(model.zlgzqx).ToString("yyyy年M月d日HH时"));
            dic.Add("$通知时间$", string.IsNullOrEmpty(model.tzsj) ? "" : Convert.ToDateTime(model.tzsj).ToString("yyyy年M月d日"));
            dic.Add("$改正内容$", string.IsNullOrEmpty(model.gznr) ? "" : model.gznr);
            dic.Add("$执法队员1$", string.IsNullOrEmpty(model.zfry1) ? "" : model.zfry1);
            dic.Add("$执法证号1$", string.IsNullOrEmpty(model.zfzh1) ? "" : model.zfzh1);
            dic.Add("$执法队员2$", string.IsNullOrEmpty(model.zfry2) ? "" : model.zfry2);
            dic.Add("$执法证号2$", string.IsNullOrEmpty(model.zfzh2) ? "" : model.zfzh2);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$联系地址$", string.IsNullOrEmpty(model.lxdz) ? "" : model.lxdz);
            return dic;
        }

        //调查取证联系函
        public Dictionary<string, string> GetDocumentDictory(DocumentDCQZLXH model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$去函部门$", string.IsNullOrEmpty(model.qhbm) ? "" : model.qhbm);
            dic.Add("$正文$", string.IsNullOrEmpty(model.ajjbqk) ? "" : model.ajjbqk);
            dic.Add("$去函日期$", string.IsNullOrEmpty(model.qhrq) ? "" : Convert.ToDateTime(model.qhrq).ToString("yyyy年M月d日"));
            dic.Add("$承办部门$", string.IsNullOrEmpty(model.cbbm) ? "" : model.cbbm);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$联系人$", string.IsNullOrEmpty(model.lxr) ? "" : model.lxr);
            return dic;
        }


        //听证报告
        public Dictionary<string, string> GetDocumentDictory(DocumentTZBG model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$案件名称$", string.IsNullOrEmpty(model.ajmc) ? "" : model.ajmc);
            dic.Add("$案件编号$", string.IsNullOrEmpty(model.ajbh) ? "" : model.ajbh);
            dic.Add("$听证日期$", string.IsNullOrEmpty(model.tzrq) ? "" : Convert.ToDateTime(model.tzrq).ToString("yyyy年M月d日"));
            dic.Add("$听证开始时间$", string.IsNullOrEmpty(model.tzstime) ? "" : Convert.ToDateTime(model.tzstime).ToString("HH时mm分"));
            dic.Add("$听证结束时间$", string.IsNullOrEmpty(model.tzetime) ? "" : Convert.ToDateTime(model.tzetime).ToString("HH时mm分"));
            dic.Add("$听证地点$", string.IsNullOrEmpty(model.tzdd) ? "" : model.tzdd);
            dic.Add("$听证方式$", string.IsNullOrEmpty(model.tzfs) ? "" : model.tzfs);
            dic.Add("$听证主持人1$", string.IsNullOrEmpty(model.tzzcr1) ? "" : model.tzzcr1);
            dic.Add("$听证员1$", string.IsNullOrEmpty(model.tzy1) ? "" : model.tzy1);
            dic.Add("$记录人$", string.IsNullOrEmpty(model.jlr) ? "" : model.jlr);
            dic.Add("$听证申请人$", string.IsNullOrEmpty(model.tzsqr) ? "" : model.tzsqr);
            dic.Add("$法定代表人$", string.IsNullOrEmpty(model.fddbr) ? "" : model.fddbr);
            dic.Add("$委托代理人$", string.IsNullOrEmpty(model.wtdlr) ? "" : model.wtdlr);
            dic.Add("$案件调查人$", string.IsNullOrEmpty(model.ajdcr) ? "" : model.ajdcr);
            dic.Add("$工作单位$", string.IsNullOrEmpty(model.gzdw) ? "" : model.gzdw);
            dic.Add("$听证会基本情况$", string.IsNullOrEmpty(model.tzhjbqk) ? "" : model.tzhjbqk);
            dic.Add("$案件事实$", string.IsNullOrEmpty(model.ajss) ? "" : model.ajss);
            dic.Add("$处理意见及建议$", string.IsNullOrEmpty(model.clyjjjy) ? "" : model.clyjjjy);
            dic.Add("$听证会主持人2$", string.IsNullOrEmpty(model.tzzcr2) ? "" : model.tzzcr2);
            dic.Add("$听证员2$", string.IsNullOrEmpty(model.tzy2) ? "" : model.tzy2);
            return dic;
        }

        //听证笔录
        public Dictionary<string, string> GetDocumentDictory(DocumentTZBL model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$案件名称$", string.IsNullOrEmpty(model.ajmc) ? "" : model.ajmc);
            dic.Add("$案件编号$", string.IsNullOrEmpty(model.ajbh) ? "" : model.ajbh);
            dic.Add("$听证日期$", string.IsNullOrEmpty(model.tzrq) ? "" : Convert.ToDateTime(model.tzrq).ToString("yyyy年M月d日"));
            dic.Add("$听证开始时间$", string.IsNullOrEmpty(model.tzkssj) ? "" : Convert.ToDateTime(model.tzkssj).ToString("HH时mm分"));
            dic.Add("$听证结束时间$", string.IsNullOrEmpty(model.tzjssj) ? "" : Convert.ToDateTime(model.tzjssj).ToString("HH时mm分"));
            dic.Add("$听证地点$", string.IsNullOrEmpty(model.tzdd) ? "" : model.tzdd);
            dic.Add("$听证方式$", string.IsNullOrEmpty(model.tzfs) ? "" : model.tzfs);
            dic.Add("$听证申请人$", string.IsNullOrEmpty(model.tzsqr) ? "" : model.tzsqr);
            dic.Add("$负责人$", string.IsNullOrEmpty(model.fzr) ? "" : model.fzr);
            dic.Add("$性别$", string.IsNullOrEmpty(model.xb) ? "" : model.xb);
            dic.Add("$工作单位$", string.IsNullOrEmpty(model.gzdw) ? "" : model.gzdw);
            dic.Add("$职务或职业$", string.IsNullOrEmpty(model.zwhzy) ? "" : model.zwhzy);
            dic.Add("$身份证号$", string.IsNullOrEmpty(model.sfzh) ? "" : model.sfzh);
            dic.Add("$住址或住所$", string.IsNullOrEmpty(model.zzhzs) ? "" : model.zzhzs);
            dic.Add("$邮编$", string.IsNullOrEmpty(model.yb) ? "" : model.yb);
            dic.Add("$电话$", string.IsNullOrEmpty(model.dh) ? "" : model.dh);
            dic.Add("$委托代理人1$", string.IsNullOrEmpty(model.wtdlr1) ? "" : model.wtdlr1);
            dic.Add("$性别1$", string.IsNullOrEmpty(model.xb1) ? "" : model.xb1);
            dic.Add("$身份证号1$", string.IsNullOrEmpty(model.sfzh1) ? "" : model.sfzh1);
            dic.Add("$工作单位1$", string.IsNullOrEmpty(model.gzdw1) ? "" : model.gzdw1);
            dic.Add("$职务1$", string.IsNullOrEmpty(model.zw1) ? "" : model.zw1);
            dic.Add("$电话1$", string.IsNullOrEmpty(model.dh1) ? "" : model.dh1);
            dic.Add("$委托代理人2$", string.IsNullOrEmpty(model.wtdlr2) ? "" : model.wtdlr2);
            dic.Add("$性别2$", string.IsNullOrEmpty(model.xb2) ? "" : model.xb2);
            dic.Add("$身份证号2$", string.IsNullOrEmpty(model.sfzh2) ? "" : model.sfzh2);
            dic.Add("$工作单位2$", string.IsNullOrEmpty(model.gzdw2) ? "" : model.gzdw2);
            dic.Add("$职务2$", string.IsNullOrEmpty(model.zw2) ? "" : model.zw2);
            dic.Add("$电话2$", string.IsNullOrEmpty(model.dh2) ? "" : model.dh2);
            dic.Add("$其他参加人$", string.IsNullOrEmpty(model.qtcjr) ? "" : model.qtcjr);
            dic.Add("$案件调查人1$", string.IsNullOrEmpty(model.ajdcr1) ? "" : model.ajdcr1);
            dic.Add("$工作单位及职务1$", string.IsNullOrEmpty(model.gzdwjzw1) ? "" : model.gzdwjzw1);
            dic.Add("$案件调查人2$", string.IsNullOrEmpty(model.ajdcr2) ? "" : model.ajdcr2);
            dic.Add("$工作单位及职务2$", string.IsNullOrEmpty(model.gzdwjzw2) ? "" : model.gzdwjzw2);
            dic.Add("$听证主持人$", string.IsNullOrEmpty(model.tzzcr) ? "" : model.tzzcr);
            dic.Add("$听证员$", string.IsNullOrEmpty(model.tzr) ? "" : model.tzr);
            dic.Add("$记录人$", string.IsNullOrEmpty(model.jlr) ? "" : model.jlr);
            dic.Add("$工作单位3$", string.IsNullOrEmpty(model.gzdw3) ? "" : model.gzdw3);
            dic.Add("$正文$", string.IsNullOrEmpty(model.tzbl) ? "" : model.tzbl);

            return dic;
        }

        //听证通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentTZTZS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$申请时间$", string.IsNullOrEmpty(model.sqsj) ? "" : Convert.ToDateTime(model.sqsj).ToString("yyyy年M月d日"));
            dic.Add("$案由$", string.IsNullOrEmpty(model.ay) ? "" : model.ay);
            dic.Add("$听证时间$", string.IsNullOrEmpty(model.tzsj) ? "" : Convert.ToDateTime(model.tzsj).ToString("yyyy年M月d日 HH时mm分"));
            dic.Add("$听证地点$", string.IsNullOrEmpty(model.tzdd) ? "" : model.tzdd);
            dic.Add("$听证主持人$", string.IsNullOrEmpty(model.tzzcr) ? "" : model.tzzcr);
            dic.Add("$听证员$", string.IsNullOrEmpty(model.tzy) ? "" : model.tzy);
            dic.Add("$记录人$", string.IsNullOrEmpty(model.jlr) ? "" : model.jlr);
            dic.Add("$正文$", string.IsNullOrEmpty(model.xgsx) ? "" : model.xgsx);
            dic.Add("$联系人$", string.IsNullOrEmpty(model.lxr) ? "" : model.lxr);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$地址$", string.IsNullOrEmpty(model.dz) ? "" : model.dz);
            dic.Add("$邮政编码$", string.IsNullOrEmpty(model.yzbm) ? "" : model.yzbm);

            return dic;
        }

        //陈述申辩笔录
        public Dictionary<string, string> GetDocumentDictory(DocumentCSSBBL model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();

            dic.Add("$申辩时间$", string.IsNullOrEmpty(model.sbsj) ? "" : Convert.ToDateTime(model.sbsj).ToString("yyyy年M月d日 HH时mm分"));
            dic.Add("$申辩地点$", string.IsNullOrEmpty(model.sbdd) ? "" : model.sbdd);
            dic.Add("$当事人基本情况$", string.IsNullOrEmpty(model.dsrjbqk) ? "" : model.dsrjbqk);
            dic.Add("$事项$", string.IsNullOrEmpty(model.sx) ? "" : model.sx);
            dic.Add("$陈述申辩内容$", string.IsNullOrEmpty(model.cssbnr) ? "" : model.cssbnr);
            return dic;
        }

        //抄告单
        public Dictionary<string, string> GetDocumentDictory(DocumentCGD model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();

            dic.Add("$抄告单位$", string.IsNullOrEmpty(model.cgdw) ? "" : model.cgdw);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$违法时间$", string.IsNullOrEmpty(model.wfsj) ? "" : Convert.ToDateTime(model.wfsj).ToString("yyyy年M月d日"));
            dic.Add("$案发地址$", string.IsNullOrEmpty(model.afdz) ? "" : model.afdz);
            dic.Add("$违法行为描述$", string.IsNullOrEmpty(model.wfxwms) ? "" : model.wfxwms);
            dic.Add("$违反的规定$", string.IsNullOrEmpty(model.wfdgd) ? "" : model.wfdgd);

            dic.Add("$下达整改通知时间$", string.IsNullOrEmpty(model.xdzgtzsj) ? "" : Convert.ToDateTime(model.xdzgtzsj).ToString("yyyy年M月d日"));
            dic.Add("$立案时间$", string.IsNullOrEmpty(model.lasj) ? "" : Convert.ToDateTime(model.lasj).ToString("yyyy年M月d日"));
            dic.Add("$正文$", string.IsNullOrEmpty(model.cgnr) ? "" : model.cgnr);
            dic.Add("$联系人$", string.IsNullOrEmpty(model.lxr) ? "" : model.lxr);
            dic.Add("$联系电话$", string.IsNullOrEmpty(model.lxdh) ? "" : model.lxdh);
            dic.Add("$联系地址$", string.IsNullOrEmpty(model.lxdz) ? "" : model.lxdz);
            return dic;
        }

        //非法财物移交书
        public Dictionary<string, string> GetDocumentDictory(DocumentFFCWYJS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();

            dic.Add("$移交单位$", string.IsNullOrEmpty(model.yjdw) ? "" : model.yjdw);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$违法时间$", string.IsNullOrEmpty(model.wfsj) ? "" : Convert.ToDateTime(model.wfsj).ToString("yyyy年M月d日"));
            dic.Add("$违法地点$", string.IsNullOrEmpty(model.wfdd) ? "" : model.wfdd);
            dic.Add("$正文$", string.IsNullOrEmpty(model.rdwfssms) ? "" : model.rdwfssms);
            dic.Add("$违反的规定$", string.IsNullOrEmpty(model.wfdfl) ? "" : model.wfdfl);
            dic.Add("$决定书开具日期$", string.IsNullOrEmpty(model.jdskjrq) ? "" : model.jdskjrq);
            dic.Add("$决定书编号$", string.IsNullOrEmpty(model.jdsbh) ? "" : model.jdsbh);
            return dic;
        }

        //催 告 书
        public Dictionary<string, string> GetDocumentDictory(DocumentCGS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$催告时间$", string.IsNullOrEmpty(model.cgsj) ? "" : Convert.ToDateTime(model.cgsj).ToString("yyyy年M月d日"));
            dic.Add("$正文$", string.IsNullOrEmpty(model.cgnr) ? "" : model.cgnr);

            return dic;
        }

        //抽样取证通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentCYQZTZS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$通知时间$", string.IsNullOrEmpty(model.tzsj) ? "" : Convert.ToDateTime(model.tzsj).ToString("yyyy年M月d日"));
            dic.Add("$违法行为描述$", string.IsNullOrEmpty(model.wfxw) ? "" : model.wfxw);
            dic.Add("$违反的规定$", string.IsNullOrEmpty(model.wfdgd) ? "" : model.wfdgd);
            dic.Add("$抽样地址$", string.IsNullOrEmpty(model.cydz) ? "" : model.cydz);
            dic.Add("$被抽样取证人员$", string.IsNullOrEmpty(model.bcyqzr) ? "" : model.bcyqzr);
            dic.Add("$通知时间1$", string.IsNullOrEmpty(model.tztime) ? "" : Convert.ToDateTime(model.tztime).ToString("yyyy年M月d日"));
            dic.Add("$执法人员$", string.IsNullOrEmpty(model.zfry) ? "" : model.zfry);
            dic.Add("$执法时间$", string.IsNullOrEmpty(model.zfsj) ? "" : Convert.ToDateTime(model.zfsj).ToString("yyyy年M月d日"));

            return dic;
        }

        //抽样取证物品处理通知书
        public Dictionary<string, string> GetDocumentDictory(DocumentCYQZWPCLTZS model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$当事人$", string.IsNullOrEmpty(model.dsr) ? "" : model.dsr);
            dic.Add("$取证通知时间$", string.IsNullOrEmpty(model.qztzsj) ? "" : Convert.ToDateTime(model.qztzsj).ToString("yyyy年M月d日"));
            dic.Add("$抽样取证通知书编号$", string.IsNullOrEmpty(model.cyqztzsbh) ? "" : model.cyqztzsbh);
            dic.Add("$取证物品$", string.IsNullOrEmpty(model.qzwp) ? "" : model.qzwp);
            dic.Add("$依据的法律规定$", string.IsNullOrEmpty(model.yjdflgd) ? "" : model.yjdflgd);
            dic.Add("$正文$", string.IsNullOrEmpty(model.cljg) ? "" : model.cljg);
            dic.Add("$被抽样取证人$", string.IsNullOrEmpty(model.bcyqzr) ? "" : model.bcyqzr);
            dic.Add("$通知时间$", string.IsNullOrEmpty(model.tzsj) ? "" : Convert.ToDateTime(model.tzsj).ToString("yyyy年M月d日"));
            dic.Add("$执法人员$", string.IsNullOrEmpty(model.zfry) ? "" : model.zfry);
            dic.Add("$执法时间$", string.IsNullOrEmpty(model.zfsj) ? "" : Convert.ToDateTime(model.zfsj).ToString("yyyy年M月d日"));

            return dic;
        }

        //罚款收缴凭证
        public Dictionary<string, string> GetDocumentDictory(DocumentFKSJPZ model)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("$文书编号$", string.IsNullOrEmpty(model.wsbh) ? "" : model.wsbh);
            dic.Add("$被处罚人$", string.IsNullOrEmpty(model.bcfr) ? "" : model.bcfr);
            dic.Add("$罚款票据编号$", string.IsNullOrEmpty(model.fkpjbh) ? "" : model.fkpjbh);

            return dic;
        }

        //添加文书附件
        public int AddDocumentFiles(DocumentFileModel model)
        {
            Case_CasesDAL dal = new Case_CasesDAL();

            return dal.AddDocumentFiles(model);
        }

        //获取文书附件
        public List<DocumentFileModel> GetDocumentFiles(int id,string type)
        {
            Case_CasesDAL dal = new Case_CasesDAL();

            return dal.GetDocumentFiles(id, type);
        }

        //查询环节文书详情
        public Doc_WfsasModel GetWFSASInfo(int dwfsasid)
        {
            Doc_WfdddrsDAL dal = new Doc_WfdddrsDAL();

            return dal.GetWFSASInfo(dwfsasid);
        }

        //改变文书状态
        public int EditDocumentStatus(int dwfsasid, int status)
        {
            Doc_WfdddrsDAL dal = new Doc_WfdddrsDAL();

            return dal.EditDocumentStatus(dwfsasid, status);
        }

        //sql语句动态添加文书
        public int AddDocumentBySQL(string tablename, object model)
        {
            Doc_WfdddrsDAL dal = new Doc_WfdddrsDAL();

            PropertyInfo[] proarr = model.GetType().GetProperties();
            string prostr = "";
            string valuestr = "";
            foreach (var item in proarr)
            {
                string proname = item.PropertyType.Name;
                object valueobj = item.GetValue(model, null);
                prostr += item.Name + ',';
                if (valueobj != null && proname == "String")
                {
                    valuestr += "'" + valueobj.ToString() + "',";
                }
                else if (valueobj != null)
                    valuestr += valueobj.ToString() + ",";
                else
                    valuestr += "'',";
            }
            prostr = prostr.Substring(0, prostr.Length - 1);
            valuestr = valuestr.Substring(0, valuestr.Length - 1);

            return dal.AddDocumentBySQL(tablename, prostr, valuestr, model);
        }

        //sql语句动态获取文书
        public object GetWFSADocumentInfo(int id, string tablename, object model, string goodstablename = null)
        {
            Doc_WfdddrsDAL dal = new Doc_WfdddrsDAL();

            return dal.GetWFSADocumentInfo(id, tablename, model, goodstablename);
        }        
    }




    //Excel导出类
    public class CommonFunctionBLL<T>
    {
        private List<string> tabelName = new List<string>();
        private Type type;
        List<Columnmodel> columnlist = new List<Columnmodel>();

        public CommonFunctionBLL(string exceldata)
        {
            type = typeof(T);
            columnlist = JsonConvert.DeserializeObject<List<Columnmodel>>(exceldata);
            foreach (PropertyInfo item in type.GetProperties())
            {
                string st = item.Name;
                tabelName.Add(st);
            }
        }

        //导出Excel
        public HttpResponseMessage saveExcel(IEnumerable<T> list, string excelname, string exceltitle)
        {
            DataTable dt = new DataTable();
            foreach (string val in tabelName)
            {
                dt.Columns.Add(val);
            }

            foreach (T item in list)
            {
                DataRow row = dt.NewRow();
                foreach (string name in tabelName)
                {
                    PropertyInfo info = type.GetProperty(name);
                    object value = info.GetValue(item, null);
                    string st = name;
                    row[st] = value != null ? value.ToString() : "";
                }
                dt.Rows.Add(row);
            }
            return CreateExcel(dt, excelname, exceltitle);
        }

        //导出Excel
        public HttpResponseMessage saveExcel(int reportid, string filetemppath, string outtemppath, IEnumerable<T> list, string excelname, string exceltitle,int classtype)
        {
            DataTable dt = new DataTable();
            foreach (string val in tabelName)
            {
                dt.Columns.Add(val);
            }

            int i = 0;
            int int1 = 0;
            int int2 = 0;
            string arrname = string.Empty;

            foreach (T item in list)
            {
                DataRow row = dt.NewRow();
                foreach (string name in tabelName)
                {
                    PropertyInfo info = type.GetProperty(name);
                    object value = info.GetValue(item, null);
                    string st = name;
                    row[st] = value != null ? value.ToString() : "";
                }
                string a = row["classname"].ToString();
                if (i == 0)
                {
                    arrname = a;
                }

                if (arrname == a)
                {
                    int1++;
                }
                else
                {
                    int2++;
                }

                dt.Rows.Add(row);
                i++;
            }
            //如果是累计报表
            if (classtype == 2)
            {
                return CreateExcel(reportid, filetemppath, "", dt, excelname, exceltitle,2);
            }
            if (reportid == 9)
                return CreateExcel(reportid, filetemppath, "", dt, excelname, exceltitle);
            else
                return CreateExcel(reportid,filetemppath,outtemppath, dt, int1, int2, excelname,exceltitle);
        }

        //新建Excel
        public HttpResponseMessage CreateExcel(DataTable dt, string excelname, string exceltitle)
        {
            //创建Excel文件的对象
            NPOI.HSSF.UserModel.HSSFWorkbook book = new NPOI.HSSF.UserModel.HSSFWorkbook();
            //添加一个sheet
            NPOI.SS.UserModel.ISheet sheet1 = book.CreateSheet("Sheet1");

            //设置excel标题
            NPOI.SS.UserModel.IRow row0 = sheet1.CreateRow(0);

            //设置各种样式字体颜色背景等
            ICellStyle style = book.CreateCellStyle();
            style.Alignment = HorizontalAlignment.CENTER;
            IFont font = book.CreateFont();//新建一个字体样式对象         
            font.Boldweight = short.MaxValue;//设置字体加粗样式 
            font.FontHeightInPoints = 20;
            style.SetFont(font);//使用SetFont方法将字体样式添加到单元格样式中 

            var cell = row0.CreateCell(0);
            cell.CellStyle.Alignment = HorizontalAlignment.CENTER;
            cell.CellStyle = style;
            cell.SetCellValue(exceltitle);
            sheet1.AddMergedRegion(new CellRangeAddress(0, 0, 0, 12));

            //给sheet1添加第二行的头部标题
            NPOI.SS.UserModel.IRow row1 = sheet1.CreateRow(1);
            int columnj = 0;
            for (int i = 0; i < columnlist.Count(); i++)
            {
                if (!string.IsNullOrEmpty(columnlist[i].ColumnName) && !string.IsNullOrEmpty(columnlist[i].ColumnCode))
                {
                    row1.CreateCell(i - columnj).SetCellValue(columnlist[i].ColumnName);
                    //设置列的宽度
                    sheet1.SetColumnWidth(i - columnj, 30 * 256);
                }
                else
                    columnj++;
            }

            //将数据逐步写入sheet1各个行
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NPOI.SS.UserModel.IRow rowtemp = sheet1.CreateRow(i + 2);
                for (int j = 0; j < columnlist.Count(); j++)
                {
                    if (columnlist[j].ColumnCode != null && (tabelName.Contains(columnlist[j].ColumnCode) || Regex.IsMatch(columnlist[j].ColumnCode, @"[\u4e00-\u9fa5]")))
                        rowtemp.CreateCell(j - columnj).SetCellValue(dt.Rows[i][columnlist[j].ColumnCode].ToString());
                }
            }

            // 写入到客户端
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            book.Write(ms);
            ms.Seek(0, SeekOrigin.Begin);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };

            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = excelname + ".xls"
                };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }

        //新建Excel
        /// <summary>
        /// 报表导出
        /// </summary>
        /// <param name="reportid">报表id</param>
        /// <param name="dt">当前日期</param>
        /// <param name="int1">第一类个数</param>
        /// <param name="int2">第二类个数</param>
        /// <param name="excelname">报表名称</param>
        /// <param name="exceltitle">报表标题</param>
        /// <returns></returns>
        public HttpResponseMessage CreateExcel(int reportid, string filetemppath,string outtemppath, DataTable dt, int int1, int int2, string excelname, string exceltitle)
        {
            string tpath = @"C:\out.xls";//中介Excel
            FileInfo ff = new FileInfo(tpath);
            if (ff.Exists)
            {
                ff.Delete();
            }
            FileStream fs = File.Create(tpath);
            HSSFWorkbook x1 = new HSSFWorkbook();
            x1.Write(fs);
            fs.Close();

            FileStream fileRead = new FileStream(filetemppath, FileMode.Open, FileAccess.Read);
            HSSFWorkbook hssfworkbook = new HSSFWorkbook(fileRead);
            FileStream fileSave2 = new FileStream(tpath, FileMode.Open, FileAccess.Read);

            HSSFWorkbook book = new HSSFWorkbook(fileSave2);
            HSSFSheet sheet = hssfworkbook.GetSheet("report" + reportid) as HSSFSheet;

            sheet.CopyTo(book, "Sheet1", true, true);
            NPOI.SS.UserModel.ISheet sheet1 = book.GetSheet("Sheet1");

            ICellStyle style0 = book.CreateCellStyle();
            style0.Alignment = HorizontalAlignment.CENTER;
            style0.BorderBottom = BorderStyle.THIN;
            style0.BorderLeft = BorderStyle.THIN;
            style0.BorderRight = BorderStyle.THIN;
            style0.BorderTop = BorderStyle.THIN;

            ICellStyle styleFont = book.CreateCellStyle();
            IFont font = book.CreateFont();
            font.FontHeightInPoints = 16;
            font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.NORMAL;
            styleFont.Alignment = HorizontalAlignment.CENTER;
            styleFont.BorderBottom = BorderStyle.THIN;
            styleFont.BorderLeft = BorderStyle.THIN;
            styleFont.BorderRight = BorderStyle.THIN;
            styleFont.BorderTop = BorderStyle.THIN;
            styleFont.SetFont(font);

            ICellStyle style8 = book.CreateCellStyle();
            style8.Alignment = HorizontalAlignment.LEFT;
            style8.BorderBottom = BorderStyle.THIN;
            style8.BorderLeft = BorderStyle.THIN;
            style8.BorderRight = BorderStyle.THIN;
            style8.BorderTop = BorderStyle.THIN;
            style8.VerticalAlignment = VerticalAlignment.CENTER;



            NPOI.SS.UserModel.IRow secondRow = sheet1.GetRow(1);
            int sumFirstRow = 6;
            if (reportid == 7 || reportid == 8)
            {
                sumFirstRow = 3;
            }

            //第一行累计
            NPOI.SS.UserModel.IRow firstRow = sheet1.CreateRow(int1 + sumFirstRow);
            firstRow.CreateCell(0).SetCellValue("累计");

            //最后一行累计
            NPOI.SS.UserModel.IRow lastRow = sheet1.CreateRow(int1 + int2 + sumFirstRow + 1);
            lastRow.CreateCell(0).SetCellValue("累计");

            int columnlistCount = columnlist.Count();

            if (reportid < 7)
            {
                if (reportid == 1)
                {
                    ICellStyle styleOne = book.CreateCellStyle();
                    IFont fontOne = book.CreateFont();
                    fontOne.FontHeightInPoints = 22;
                    fontOne.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.BOLD;
                    styleOne.VerticalAlignment = VerticalAlignment.CENTER;
                    styleOne.Alignment = HorizontalAlignment.RIGHT;
                    styleOne.BorderBottom = BorderStyle.THIN;
                    styleOne.BorderLeft = BorderStyle.THIN;
                    styleOne.BorderRight = BorderStyle.THIN;
                    styleOne.BorderTop = BorderStyle.THIN;
                    styleOne.SetFont(fontOne);

                    NPOI.SS.UserModel.IRow oneRow = sheet1.GetRow(0);
                    oneRow.GetCell(0).SetCellValue("秀洲区综合行政执法局土地执法案件情况分类统计报表（" + Convert.ToDateTime(dt.Rows[0]["reportdate"]).Month + "月）");
                    oneRow.GetCell(0).CellStyle = styleOne;
                }


                secondRow.GetCell(7).SetCellValue("填报时间：" + DateTime.Parse(dt.Rows[0]["reportdate"].ToString()).ToString("yyyy年MM月dd日"));

                firstRow.CreateCell(1).SetCellValue("-");
                lastRow.CreateCell(1).SetCellValue("-");
                for (int x = 2; x < columnlistCount; x++)
                {
                    firstRow.CreateCell(x);
                    lastRow.CreateCell(x);
                    if (x < columnlist.Count() - 4)
                    {
                        firstRow.GetCell(x).SetCellFormula("SUM(INDIRECT(\"R[-" + int1 + "]C:r[-1]c\",FALSE))");
                        lastRow.GetCell(x).SetCellFormula("SUM(INDIRECT(\"R[-" + int2 + "]C:r[-1]c\",FALSE))");
                    }
                    firstRow.GetCell(x).CellStyle = style0;
                    lastRow.GetCell(x).CellStyle = style0;
                }
                firstRow.GetCell(0).CellStyle = style0;
                firstRow.GetCell(1).CellStyle = style0;
                lastRow.GetCell(0).CellStyle = style0;
                lastRow.GetCell(1).CellStyle = style0;
                //秀洲区综合行政执法局水行政执法情况报表
                if (reportid == 5 || reportid == 2)
                {
                    CellRangeAddress regiontjsjdRow = new CellRangeAddress(int1 + int2 + sumFirstRow + 2, int1 + int2 + sumFirstRow + 2, 0, columnlistCount - 1);
                    NPOI.SS.UserModel.IRow tjsjdRow = sheet1.CreateRow(int1 + int2 + sumFirstRow + 2);
                    tjsjdRow.CreateCell(0);
                    tjsjdRow.GetCell(0).CellStyle = styleFont;
                    tjsjdRow.GetCell(0).SetCellValue("填表人：" + dt.Rows[0]["preparer"]
                        + "                             审核人：" + dt.Rows[0]["shuser"] + "                填表人联系电话："
                        + dt.Rows[0]["preparerphone"]
                        );
                    for (int x = 1; x < columnlistCount; x++)
                    {
                        tjsjdRow.CreateCell(x);
                        tjsjdRow.GetCell(x).CellStyle = styleFont;
                    }
                    sheet1.AddMergedRegion(regiontjsjdRow);
                }
            }
            else if (reportid == 7)
            {
                secondRow.GetCell(7).SetCellValue("报送时间：" + DateTime.Parse(dt.Rows[0]["reportdate"].ToString()).ToString("yyyy年MM月dd日"));
                //合计
                NPOI.SS.UserModel.IRow SumLastRow = sheet1.CreateRow(int1 + int2 + sumFirstRow + 2);
                SumLastRow.CreateCell(0).SetCellValue("合计");

                for (int x = 1; x < columnlistCount; x++)
                {
                    firstRow.CreateCell(x);
                    lastRow.CreateCell(x);
                    SumLastRow.CreateCell(x);
                    if (x < columnlistCount - 2)
                    {
                        firstRow.GetCell(x).SetCellFormula("SUM(INDIRECT(\"R[-" + int1 + "]C:r[-1]c\",FALSE))");
                        lastRow.GetCell(x).SetCellFormula("SUM(INDIRECT(\"R[-" + int2 + "]C:r[-1]c\",FALSE))");
                        SumLastRow.GetCell(x).SetCellFormula("SUM(INDIRECT(\"R[-" + (int1 + int2 + 2) + "]C:r[-1]c\",FALSE))/2");
                    }
                    firstRow.GetCell(x).CellStyle = style0;
                    lastRow.GetCell(x).CellStyle = style0;
                    SumLastRow.GetCell(x).CellStyle = style0;
                }

                firstRow.GetCell(columnlistCount - 1).SetCellValue("————");
                firstRow.GetCell(columnlistCount - 2).SetCellValue("————");
                lastRow.GetCell(columnlistCount - 1).SetCellValue("————");
                lastRow.GetCell(columnlistCount - 2).SetCellValue("————");
                SumLastRow.GetCell(columnlistCount - 1).SetCellValue("————");
                SumLastRow.GetCell(columnlistCount - 2).SetCellValue("————");
                SumLastRow.GetCell(0).CellStyle = style0;
                firstRow.GetCell(0).CellStyle = style0;
                firstRow.GetCell(1).CellStyle = style0;
                lastRow.GetCell(0).CellStyle = style0;
                lastRow.GetCell(1).CellStyle = style0;
            }
            else
            {
                sheet1.RemoveRow(lastRow);
                //统计时间段
                NPOI.SS.UserModel.IRow tjsjdRow = sheet1.CreateRow(int1 + sumFirstRow + 1);
                tjsjdRow.CreateCell(0);
                tjsjdRow.GetCell(0).CellStyle = styleFont;

                //保障措施
                NPOI.SS.UserModel.IRow bztsRow = sheet1.CreateRow(int1 + sumFirstRow + 2);
                bztsRow.HeightInPoints = 49.5f;
                bztsRow.CreateCell(0);
                bztsRow.GetCell(0).CellStyle = style8;

                //发现问题
                NPOI.SS.UserModel.IRow fxwtRow = sheet1.CreateRow(int1 + sumFirstRow + 3);
                fxwtRow.HeightInPoints = 49.5f;
                fxwtRow.CreateCell(0);
                fxwtRow.GetCell(0).CellStyle = style8;

                //当日及下
                NPOI.SS.UserModel.IRow drjxRow = sheet1.CreateRow(int1 + sumFirstRow + 4);
                drjxRow.HeightInPoints = 49.5f;
                drjxRow.CreateCell(0);
                drjxRow.GetCell(0).CellStyle = style8;

                //四、需要市级层面协调解决事项
                NPOI.SS.UserModel.IRow xysjRow = sheet1.CreateRow(int1 + sumFirstRow + 5);
                xysjRow.HeightInPoints = 49.5f;
                xysjRow.CreateCell(0);
                xysjRow.GetCell(0).CellStyle = style8;

                for (int x = 1; x < columnlistCount; x++)
                {
                    firstRow.CreateCell(x);
                    firstRow.GetCell(x).SetCellFormula("SUM(INDIRECT(\"R[-" + int1 + "]C:r[-1]c\",FALSE))");
                    firstRow.GetCell(x).CellStyle = style0;
                    tjsjdRow.CreateCell(x);
                    tjsjdRow.GetCell(x).CellStyle = styleFont;
                    bztsRow.CreateCell(x);
                    bztsRow.GetCell(x).CellStyle = style8;
                    fxwtRow.CreateCell(x);
                    fxwtRow.GetCell(x).CellStyle = style8;
                    drjxRow.CreateCell(x);
                    drjxRow.GetCell(x).CellStyle = style8;
                    xysjRow.CreateCell(x);
                    xysjRow.GetCell(x).CellStyle = style8;
                }
                firstRow.GetCell(0).CellStyle = style0;
                firstRow.GetCell(1).CellStyle = style0;


                CellRangeAddress regiontjsjdRow = new CellRangeAddress(int1 + sumFirstRow + 1, int1 + sumFirstRow + 1, 0, columnlistCount - 1);

                string stime = dt.Rows[0]["starttime"] == null ? "" : Convert.ToDateTime(dt.Rows[0]["starttime"]).ToString("yyyy年MM月dd日 hh:mm:ss");
                string etime = dt.Rows[0]["endtime"] == null ? "" : Convert.ToDateTime(dt.Rows[0]["endtime"]).ToString("yyyy年MM月dd日 hh:mm:ss");

                tjsjdRow.GetCell(0).SetCellValue("统计时间段：" + stime + "~" + etime
                    + "                             统计人：" + dt.Rows[0]["statisticsuser"] + "                审核人："
                    + dt.Rows[0]["shuser"]
                    );

                sheet1.AddMergedRegion(regiontjsjdRow);

                CellRangeAddress regionbztsRow1 = new CellRangeAddress(int1 + sumFirstRow + 2, int1 + sumFirstRow + 2, 0, 2);
                bztsRow.GetCell(0).SetCellValue("一、保障措施落实和督查情况");
                sheet1.AddMergedRegion(regionbztsRow1);
                CellRangeAddress regionbztsRow2 = new CellRangeAddress(int1 + sumFirstRow + 2, int1 + sumFirstRow + 2, 3, columnlistCount - 1);
                bztsRow.GetCell(3).SetCellValue(dt.Rows[0]["bzcslshdcqk"] == null ? "" : dt.Rows[0]["bzcslshdcqk"].ToString());
                sheet1.AddMergedRegion(regionbztsRow2);

                CellRangeAddress regionfxwtRow1 = new CellRangeAddress(int1 + sumFirstRow + 3, int1 + sumFirstRow + 3, 0, 2);
                fxwtRow.GetCell(0).SetCellValue("二、发现问题与处理结果");
                sheet1.AddMergedRegion(regionfxwtRow1);
                CellRangeAddress regionfxwtRow2 = new CellRangeAddress(int1 + sumFirstRow + 3, int1 + sumFirstRow + 3, 3, columnlistCount - 1);
                fxwtRow.GetCell(3).SetCellValue(dt.Rows[0]["fxwtycljg"] == null ? "" : dt.Rows[0]["fxwtycljg"].ToString());
                sheet1.AddMergedRegion(regionfxwtRow2);

                CellRangeAddress regiondrjxRow1 = new CellRangeAddress(int1 + sumFirstRow + 4, int1 + sumFirstRow + 4, 0, 2);
                drjxRow.GetCell(0).SetCellValue("三、当日及下一日的工作安排");
                sheet1.AddMergedRegion(regiondrjxRow1);
                CellRangeAddress regiondrjxRow2 = new CellRangeAddress(int1 + sumFirstRow + 4, int1 + sumFirstRow + 4, 3, columnlistCount - 1);
                drjxRow.GetCell(3).SetCellValue(dt.Rows[0]["drjxyrdgzap"] == null ? "" : dt.Rows[0]["drjxyrdgzap"].ToString());
                sheet1.AddMergedRegion(regiondrjxRow2);

                CellRangeAddress regionxysjRow1 = new CellRangeAddress(int1 + sumFirstRow + 5, int1 + sumFirstRow + 5, 0, 2);
                xysjRow.GetCell(0).SetCellValue("四、需要市级层面协调解决事项");
                sheet1.AddMergedRegion(regionxysjRow1);
                CellRangeAddress regionxysjRow2 = new CellRangeAddress(int1 + sumFirstRow + 5, int1 + sumFirstRow + 5, 3, columnlistCount - 1);
                xysjRow.GetCell(3).SetCellValue(dt.Rows[0]["xysjcmxtjjsx"] == null ? "" : dt.Rows[0]["xysjcmxtjjsx"].ToString());
                sheet1.AddMergedRegion(regionxysjRow2);
            }

            //将数据逐步写入sheet1各个行
            for (int i = 0; i < dt.Rows.Count + 1; i++)
            {
                if (i == int1)
                {
                    continue;
                }
                NPOI.SS.UserModel.IRow rowtemp = sheet1.CreateRow(i + sumFirstRow);

                for (int j = 0; j < columnlistCount; j++)
                {
                    if (i > int1)
                    {
                        object columnCode = dt.Rows[i - 1][columnlist[j].ColumnCode];
                        SetValue(rowtemp.CreateCell(j), columnCode == null ? 0 : columnCode.ToString() == "" ? 0 : columnCode);
                    }
                    else
                    {
                        object columnCode = dt.Rows[i][columnlist[j].ColumnCode];
                        SetValue(rowtemp.CreateCell(j), columnCode == null ? 0 : columnCode.ToString() == "" ? 0 : columnCode);
                    }
                    rowtemp.GetCell(j).CellStyle = style0;
                }
            }

            if (reportid < 7)
            {
                CellRangeAddress region = new CellRangeAddress(int1 + sumFirstRow, int1 + int2 + sumFirstRow + 1, columnlistCount - 4, columnlistCount - 1);
                sheet1.GetRow(int1 + sumFirstRow).GetCell(columnlistCount - 4).SetCellValue(dt.Rows[0]["remark"].ToString());
                ICellStyle style1 = book.CreateCellStyle();
                style1.VerticalAlignment = VerticalAlignment.TOP;
                style1.WrapText = true;
                sheet1.GetRow(int1 + sumFirstRow).GetCell(columnlistCount - 4).CellStyle = style1;
                sheet1.AddMergedRegion(region);

                if (reportid == 6)
                {
                    ICellStyle style6 = book.CreateCellStyle();
                    style1.VerticalAlignment = VerticalAlignment.CENTER;
                    style1.BorderBottom = BorderStyle.THIN;
                    style1.BorderLeft = BorderStyle.THIN;
                    style1.BorderRight = BorderStyle.THIN;
                    style1.BorderTop = BorderStyle.THIN;

                    CellRangeAddress region13 = new CellRangeAddress(6, sheet1.LastRowNum, 13, 13);
                    sheet1.GetRow(6).GetCell(13).SetCellValue("由区局填报");
                    sheet1.GetRow(6).GetCell(13).CellStyle = style1;
                    sheet1.AddMergedRegion(region13);

                    CellRangeAddress region14 = new CellRangeAddress(6, sheet1.LastRowNum, 14, 14);
                    sheet1.GetRow(6).GetCell(14).SetCellValue("由区局填报");
                    sheet1.GetRow(6).GetCell(14).CellStyle = style1;
                    sheet1.AddMergedRegion(region14);

                    CellRangeAddress region15 = new CellRangeAddress(6, sheet1.LastRowNum, 15, 15);
                    sheet1.GetRow(6).GetCell(15).SetCellValue("由区局填报");
                    sheet1.GetRow(6).GetCell(15).CellStyle = style1;
                    sheet1.AddMergedRegion(region15);

                    CellRangeAddress region16 = new CellRangeAddress(6, sheet1.LastRowNum, 16, 16);
                    sheet1.GetRow(6).GetCell(16).SetCellValue("见环境保护（月报二）");
                    sheet1.GetRow(6).GetCell(16).CellStyle = style1;
                    sheet1.AddMergedRegion(region16);

                    CellRangeAddress region17 = new CellRangeAddress(6, sheet1.LastRowNum, 17, 17);
                    sheet1.GetRow(6).GetCell(17).SetCellValue("见水利（月报）");
                    sheet1.GetRow(6).GetCell(17).CellStyle = style1;
                    sheet1.AddMergedRegion(region17);

                    CellRangeAddress region18 = new CellRangeAddress(6, sheet1.LastRowNum, 18, 18);
                    sheet1.GetRow(6).GetCell(18).SetCellValue("见环境保护（月报一）");
                    sheet1.GetRow(6).GetCell(18).CellStyle = style1;
                    sheet1.AddMergedRegion(region18);
                }
            }

            // 写入到客户端
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            book.Write(ms);
            ms.Seek(0, SeekOrigin.Begin);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };

            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = exceltitle + ".xls"
                };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }

        #region 累计报表导出
        /// <summary>
        /// 报表导出
        /// </summary>
        /// <param name="reportid"></param>
        /// <param name="filetemppath"></param>
        /// <param name="outtemppath"></param>
        /// <returns></returns>
        public HttpResponseMessage CreateExcel(int reportid, string filetemppath, string outtemppath,DataTable dt, string excelname, string exceltitle,int type)
        {
            string tpath = @"C:\out.xls";//中介Excel
            FileInfo ff = new FileInfo(tpath);
            if (ff.Exists)
            {
                ff.Delete();
            }
            FileStream fs = File.Create(tpath);
            HSSFWorkbook x1 = new HSSFWorkbook();
            x1.Write(fs);
            fs.Close();

            FileStream fileRead = new FileStream(filetemppath, FileMode.Open, FileAccess.Read);
            HSSFWorkbook hssfworkbook = new HSSFWorkbook(fileRead);
            FileStream fileSave2 = new FileStream(tpath, FileMode.Open, FileAccess.Read);
            HSSFWorkbook book = new HSSFWorkbook(fileSave2);
            HSSFSheet sheet = hssfworkbook.GetSheet("report" + (reportid - 1)) as HSSFSheet;
            sheet.CopyTo(book, "Sheet1", true, true);
            NPOI.SS.UserModel.ISheet sheet1 = book.GetSheet("Sheet1");
            ICellStyle style0 = book.CreateCellStyle();
            style0.Alignment = HorizontalAlignment.CENTER;
            style0.BorderBottom = BorderStyle.THIN;
            style0.BorderLeft = BorderStyle.THIN;
            style0.BorderRight = BorderStyle.THIN;
            style0.BorderTop = BorderStyle.THIN;

            NPOI.SS.UserModel.IRow secondRow = sheet1.GetRow(1);
            int sumFirstRow = 6;
            if (reportid == 3 || reportid == 6)
            {
                sumFirstRow = 5;
            }

            //累计
            NPOI.SS.UserModel.IRow firstRow = sheet1.CreateRow(12 + sumFirstRow);
            firstRow.CreateCell(0).SetCellValue("累计");
            int columnlistCount = columnlist.Count();
            secondRow.GetCell(10).SetCellValue("统计年份：" + dt.Rows[0]["year"].ToString());

            firstRow.CreateCell(1).SetCellValue("-");
            for (int x = 1; x < columnlistCount; x++)
            {
                firstRow.CreateCell(x);
                if (x < columnlist.Count())
                {
                    firstRow.GetCell(x).SetCellFormula("SUM(INDIRECT(\"R[-" + 12 + "]C:r[-1]c\",FALSE))");
                }
                firstRow.GetCell(x).CellStyle = style0;
            }
            firstRow.GetCell(0).CellStyle = style0;

            //将数据逐步写入sheet1各个行
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NPOI.SS.UserModel.IRow rowtemp = sheet1.CreateRow(i + sumFirstRow);

                for (int j = 0; j < columnlist.Count(); j++)
                {
                    object columnCode = dt.Rows[i][columnlist[j].ColumnCode];
                    SetValue(rowtemp.CreateCell(j), columnCode == null ? "0" : columnCode.ToString() == "" ? "0" : columnCode);
                    rowtemp.GetCell(j).CellStyle = style0;
                }
            }

            // 写入到客户端
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            book.Write(ms);
            ms.Seek(0, SeekOrigin.Begin);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };

            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = exceltitle + ".xls"
                };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            return result;
        }
        #endregion

        //新建Excel
        public HttpResponseMessage CreateExcel(int reportid, string filetemppath,string outtemppath, DataTable dt, string excelname, string exceltitle)
        {
            string tpath = @"C:\out.xls";//中介Excel
            FileInfo ff = new FileInfo(tpath);
            if (ff.Exists)
            {
                ff.Delete();
            }
            FileStream fs = File.Create(tpath);
            HSSFWorkbook x1 = new HSSFWorkbook();
            x1.Write(fs);
            fs.Close();

            FileStream fileRead = new FileStream(filetemppath, FileMode.Open, FileAccess.Read);
            HSSFWorkbook hssfworkbook = new HSSFWorkbook(fileRead);
            FileStream fileSave2 = new FileStream(tpath, FileMode.Open, FileAccess.Read);

            HSSFWorkbook book = new HSSFWorkbook(fileSave2);
            HSSFSheet sheet = hssfworkbook.GetSheet("report" + reportid) as HSSFSheet;

            sheet.CopyTo(book, "Sheet1", true, true);
            NPOI.SS.UserModel.ISheet sheet1 = book.GetSheet("Sheet1");

            ICellStyle style0 = book.CreateCellStyle();
            style0.Alignment = HorizontalAlignment.CENTER;
            style0.BorderBottom = BorderStyle.THIN;
            style0.BorderLeft = BorderStyle.THIN;
            style0.BorderRight = BorderStyle.THIN;
            style0.BorderTop = BorderStyle.THIN;

            //将数据逐步写入sheet1各个行
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NPOI.SS.UserModel.IRow rowtemp = sheet1.CreateRow(i + 3);

                for (int j = 0; j < columnlist.Count(); j++)
                {
                    object columnCode = dt.Rows[i][columnlist[j].ColumnCode];
                    SetValue(rowtemp.CreateCell(j), columnCode == null ? "" : columnCode.ToString() == "" ? "" : columnCode);
                    rowtemp.GetCell(j).CellStyle = style0;
                }
            }

            // 写入到客户端
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            book.Write(ms);
            ms.Seek(0, SeekOrigin.Begin);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };

            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = excelname + ".xls"
                };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }

        private void SetValue(ICell cell, object value)
        {
            string st = value.ToString();
            if (Regex.IsMatch(st, @"^\d+(\.\d+)?$"))
            {    //如果是数字
                double num = double.Parse(st);
                cell.SetCellValue(num);
            }
            else
            {  //其它暂时全当作文本
                cell.SetCellValue(st);
            }

        }

    }

    //Excel导出图表类
    public class CommonFunctionEchartsBLL
    {
        public HttpResponseMessage CreateExcelEcharts(string excelname, string exceltitle, string canvas1, string canvas2)
        {
            //创建Excel文件的对象
            NPOI.HSSF.UserModel.HSSFWorkbook book = new NPOI.HSSF.UserModel.HSSFWorkbook();
            //添加一个sheet
            NPOI.SS.UserModel.ISheet sheet1 = book.CreateSheet("Sheet1");

            //设置excel标题
            NPOI.SS.UserModel.IRow row0 = sheet1.CreateRow(0);

            //设置各种样式字体颜色背景等
            ICellStyle style = book.CreateCellStyle();
            style.Alignment = HorizontalAlignment.CENTER;
            IFont font = book.CreateFont();//新建一个字体样式对象         
            font.Boldweight = short.MaxValue;//设置字体加粗样式 
            font.FontHeightInPoints = 20;
            style.SetFont(font);//使用SetFont方法将字体样式添加到单元格样式中 

            var cell = row0.CreateCell(0);
            cell.CellStyle.Alignment = HorizontalAlignment.CENTER;
            cell.CellStyle = style;
            cell.SetCellValue(exceltitle);
            sheet1.AddMergedRegion(new CellRangeAddress(0, 0, 0, 22));

            byte[] Content = Convert.FromBase64String(canvas1);
            byte[] Content2 = Convert.FromBase64String(canvas2);
            int pictureIdx = book.AddPicture(Content, NPOI.SS.UserModel.PictureType.JPEG);
            int pictureIdx2 = book.AddPicture(Content2, NPOI.SS.UserModel.PictureType.JPEG);
            HSSFPatriarch patriarch = (HSSFPatriarch)sheet1.CreateDrawingPatriarch();
            HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 0, 0, 1, 2, 10, 26);
            HSSFClientAnchor anchor2 = new HSSFClientAnchor(0, 0, 0, 0, 12, 2, 22, 26);
            HSSFPicture pict = (HSSFPicture)patriarch.CreatePicture(anchor, pictureIdx);
            HSSFPicture pict2 = (HSSFPicture)patriarch.CreatePicture(anchor2, pictureIdx2);

            // 写入到客户端
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            book.Write(ms);
            ms.Seek(0, SeekOrigin.Begin);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };

            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = excelname + ".xls"
                };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }
    }
}
