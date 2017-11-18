Ext.define('TianZun.store.conservation.DWSourceList', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Company/GetDWSourceList',
    },
});