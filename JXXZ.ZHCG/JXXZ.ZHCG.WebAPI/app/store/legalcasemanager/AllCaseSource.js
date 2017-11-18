Ext.define('TianZun.store.legalcasemanager.AllCaseSource', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.legalcase.CaseSource',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CaseSourceL/GetAllCaseSourcesList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});