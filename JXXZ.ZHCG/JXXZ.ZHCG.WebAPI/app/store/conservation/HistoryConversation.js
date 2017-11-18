Ext.define('TianZun.store.conservation.HistoryConversation', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.conservation.nowConversation',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Contract/GetOldContractList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});