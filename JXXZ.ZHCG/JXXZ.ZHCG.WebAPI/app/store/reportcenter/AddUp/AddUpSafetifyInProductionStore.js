Ext.define('TianZun.store.reportcenter.AddUp.AddUpSafetifyInProductionStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.AddUp.AddUpSafetifyInProductionModel',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/ViewAddUpSafetifyinProductionReport',
    },
    autoLoad: true
})