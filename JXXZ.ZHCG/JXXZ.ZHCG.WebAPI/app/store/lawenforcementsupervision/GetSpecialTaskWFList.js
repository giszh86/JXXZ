Ext.define('TianZun.store.lawenforcementsupervision.GetSpecialTaskWFList', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.lawenforcementsupervision.SpecialTask',

    pageSize: 10,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SpecialTask/GetSpecialTaskWFInfo',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});