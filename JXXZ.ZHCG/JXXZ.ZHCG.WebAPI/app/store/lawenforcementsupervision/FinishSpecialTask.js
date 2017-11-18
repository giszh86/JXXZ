Ext.define('TianZun.store.lawenforcementsupervision.FinishSpecialTask', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.lawenforcementsupervision.SpecialTask',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SpecialTask/GetAlreadySpecialTaskList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});