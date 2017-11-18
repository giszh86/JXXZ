Ext.define('TianZun.store.legalcasemanager.SimpleDicData', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SimpleCase/GeDictoryData',
    },
})