using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
   public  class Doc_WfsasDAL
    {

       public void Add(doc_wfsas model) {
           Entities db = new Entities();
           db.doc_wfsas.Add(model);
           db.SaveChanges();
       }


       /// <summary>
       /// 增加当前处理用户的附件
       /// </summary>
       public void function_AddWfsas( List<Doc_WfsasModel> WfsasList)
       {
           if (WfsasList != null && WfsasList.Count > 0)
           {
               foreach (Doc_WfsasModel item in WfsasList)
               {
                   doc_wfsas wfsufModel = new doc_wfsas();
                   wfsufModel.wfsaid = item.wfsaid;
                   wfsufModel.filepath = item.filepath;
                   wfsufModel.filename = item.filename;
                   wfsufModel.dwfsasid = item.dwfsasid;
                   wfsufModel.ddid = item.ddid;
                   wfsufModel.filetyoe = item.filetyoe;
                   wfsufModel.createuserid = item.createuserid;
                   wfsufModel.createtime = DateTime.Now;
                   wfsufModel.caseid = item.caseid;
                   wfsufModel.lastwordpath = item.lastwordpath;
                   wfsufModel.lastpdfpath = item.lastpdfpath;
                   wfsufModel.lastdwfname = item.lastdwfname;
                   wfsufModel.lastdwfcode = item.lastdwfcode;
                   wfsufModel.ddtablename = item.ddtablename;
                   wfsufModel.ddtableid = item.ddtableid;
                   wfsufModel.status = item.status;
                   wfsufModel.documentid = item.documentid;

                   wfsufModel.dcjg = item.dcjg;
                   wfsufModel.wfss = item.wfss;
                   wfsufModel.ajdx = item.ajdx;
                   wfsufModel.ajdxremark = item.ajdxremark;
                   wfsufModel.jyaq = item.jyaq;
                   wfsufModel.xzcftype = item.xzcftype;
                   wfsufModel.xzcfje = item.xzcfje;
                   wfsufModel.xzcfnr = item.xzcfnr;
                   wfsufModel.xzcffs = item.xzcffs;
                   wfsufModel.dsrreplay = item.dsrreplay;
                   wfsufModel.dsryj = item.dsryj;
                   wfsufModel.cssbtime = item.cssbtime;
                   wfsufModel.sdremark = item.sdremark;
                   wfsufModel.dsrzxfs = item.dsrzxfs;
                   wfsufModel.sfyj = item.sfyj;
                   wfsufModel.yjdw = item.yjdw;
                   wfsufModel.yjtime = item.yjtime;
                   wfsufModel.xzcfbgbz = item.xzcfbgbz;
                   wfsufModel.xzcfbgclr = item.xzcfbgclr;
                   wfsufModel.xzcfbgcltime = item.xzcfbgcltime;
                   wfsufModel.tzjgsm = item.tzjgsm;
                   wfsufModel.tzclr = item.tzclr;
                   wfsufModel.tzcltime = item.tzcltime;


                   new Doc_WfsasDAL().Add(wfsufModel);
                   System.Threading.Thread.Sleep(500);
               }
           }
       }
    }
}
