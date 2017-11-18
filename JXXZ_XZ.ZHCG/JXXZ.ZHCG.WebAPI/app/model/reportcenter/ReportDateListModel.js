var padleft = function (num, len)
{
    return Array(Math.abs(("" + num).length - ((len || 2) + 1))).join(0) + num;
}
Ext.define('TianZun.model.reportcenter.ReportDateListModel', {
    extend: 'Ext.data.Model',
    fields: [
               { name: 'reportname', type: 'string' },
               {
                   name: 'reporttime', type: 'string',
                   convert: function (v, r)
                   {
                       var reporttype = r.get("reporttype");
                       var date = new Date();
                       var year = parseInt(date.getFullYear());
                       var month = parseInt(date.getMonth()) + 1;
                       var day = parseInt(date.getDate());
                       return r.get("reportdate").split(' ')[0];
                   }
               },
               { name: 'unitname', type: 'string' },
    ],
})