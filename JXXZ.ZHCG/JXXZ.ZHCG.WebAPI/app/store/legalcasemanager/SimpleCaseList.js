Ext.define('TianZun.store.legalcasemanager.SimpleCaseList', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.legalcase.SimpleCase',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SimpleCase/GetSimpleCaseList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});