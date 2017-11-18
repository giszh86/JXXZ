Ext.define('TianZun.store.legalcasemanager.StatisticalSimpleCaseList', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.legalcase.StatisticalModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CaseStatisticalReport/GetSimpleCaseList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});