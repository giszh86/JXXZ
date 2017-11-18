Ext.define('TianZun.store.reportcenter.AddUp.AddUpBureauCenterWorkStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.reportcenter.BureauCenterWorkModel',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ReportCenter/ViewBureauCenterWork',
    },
    autoLoad: true
})