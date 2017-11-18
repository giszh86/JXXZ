Ext.define('TianZun.store.reportcenter.AddUp.AddUplawInWaterStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.AddUp.AddUplawInWaterModel',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/ViewLawInWater',
    },
    autoLoad: true,
})