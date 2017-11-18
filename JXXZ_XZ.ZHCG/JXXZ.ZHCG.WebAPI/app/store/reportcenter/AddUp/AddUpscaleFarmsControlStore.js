Ext.define('TianZun.store.reportcenter.AddUp.AddUpscaleFarmsControlStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.AddUp.AddUpscaleFarmsControlModel',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/ViewScaleFarmsControl',
    },
    autoLoad: true
})