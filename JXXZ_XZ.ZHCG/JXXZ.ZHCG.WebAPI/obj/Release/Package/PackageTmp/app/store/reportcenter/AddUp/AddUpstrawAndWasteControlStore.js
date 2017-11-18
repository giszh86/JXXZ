Ext.define('TianZun.store.reportcenter.AddUp.AddUpstrawAndWasteControlStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.AddUp.AddUpstrawAndWasteControlModel',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/ViewStrawAndWasteControlReport',
    },
    autoLoad: true
})