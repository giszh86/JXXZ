Ext.define('TianZun.model.reportcenter.TemplateListModel', {
    extend: 'Ext.data.Model',
    fields: [
               { name: 'reportid', type: 'int' },
               { name: 'reportname', type: 'string' },
               { name: 'reporttype', type: 'string' },
               { name: 'isenable', type: 'string' },
                { name: 'statistics', type: 'string' },
                { name: 'starttime', type: 'string' },
                { name: 'endtime', type: 'string' },
                { name: 'whattime', type: 'string' },
                { name: 'isenable', type: 'string' },
               {
                   name: 'reporttime', type: 'string',
                   convert: function (v, r)
                   {
                       var reporttype=r.get("reporttype");
                       if (reporttype == 1)
                       {
                           var result = "";
                           if (r.get("starttime").length > 0 && r.get("endtime").length > 0 && r.get("whattime").length > 0)
                           {
                               var startList = new Array();
                               startList = r.get("starttime").split(' ')[0].split('-');
                               var start = startList[0] + "年" + startList[1] + "月" + startList[2] + "日";
                               var endlist = new Array();
                               endlist = r.get("endtime").split(' ')[0].split('-');
                               var end = endlist[0] + "年" + endlist[1] + "月" + endlist[2] + "日";
                               result = start + "至" + end + " " + r.get("whattime").split(' ')[1];
                           }
                           return result;
                       }
                       else if (reporttype == 2||reporttype==4)
                       {
                           var strSta = new Array();
                           strSta = r.get("statistics").split(',');
                           var strb="";
                           if (strSta.length > 0)
                           {
                               for (var i = 1; i < strSta.length - 1; i++)
                               {
                                   var str = strSta[i];
                                   if (i == strSta.length - 2)
                                   {
                                       strb+=str + "月";
                                   }
                                   else
                                   {
                                       strb+=str + "月、";
                                   }
                               }
                           }
                           return strb;
                       }
                       else {
                           var strSta = new Array();
                           var quarter = new Array();
                           quarter = ["第一季度", "第二季度", "第三季度", "第四季度"];
                           strSta = r.get("statistics").split(',');
                           var strb = "";
                           if (strSta.length > 0) {
                               for (var i = 1; i < strSta.length - 1; i++) {
                                   var str = strSta[i];
                                   if (i == strSta.length - 2) {
                                       strb += quarter[i - 1];
                                   }
                                   else {
                                       strb += quarter[i - 1] + "、";
                                   }
                               }
                           }
                           return strb;
                       }
                   }
               },
               { name: 'remark', type: 'string' },
    ],
})