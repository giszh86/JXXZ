Ext.define('TianZun.store.legalcasemanager.LeaderList', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.legalcase.LeaderModel',
    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Leadersupervise/GetAlreadySupervise',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});