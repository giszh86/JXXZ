Ext.define('TianZun.store.reportcenter.LandLawReportDataHalfMonthStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.LandLawReportDataModel',
   
    groupField: 'project',
    sortInfo: {
        field: 'projectId',
        direction: "ASC"
    },
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/GetLandLawHalfMonthReport',
    },
    remoteSort: true,
    autoLoad: true
})