Ext.define('TianZun.store.sys.DictionaryChild', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Dictionary/GetZdChildList',
    },
});