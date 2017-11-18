Ext.define('TianZun.store.conservation.nowConversation', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.conservation.nowConversation',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Contract/GetContractList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});