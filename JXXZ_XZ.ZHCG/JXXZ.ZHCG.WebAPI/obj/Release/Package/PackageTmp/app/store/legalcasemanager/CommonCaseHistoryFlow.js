Ext.define('TianZun.store.legalcasemanager.CommonCaseHistoryFlow', {
    extend: 'Ext.data.Store',

    pageSize: configs.PageSize,
    remoteFilter: false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CommonCase/GetCaseOidList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});