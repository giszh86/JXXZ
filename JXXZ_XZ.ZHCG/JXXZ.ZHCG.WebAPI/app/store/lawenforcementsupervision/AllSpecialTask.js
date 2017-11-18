Ext.define('TianZun.store.lawenforcementsupervision.AllSpecialTask', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.lawenforcementsupervision.SpecialTask',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SpecialTask/GetAllSpecialTaskList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});