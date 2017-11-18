Ext.define('TianZun.store.reportcenter.StatisticalReportStore', {
    extend: 'Ext.data.Store',
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/StatisticalReport',
        reader: {
            type: 'json',
        }
    },
    autoLoad: true
});