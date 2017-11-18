Ext.define('TianZun.store.conservation.HTSourceList', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Contract/GetHTSourceList',
    },
});