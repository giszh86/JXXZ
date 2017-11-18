Ext.define('TianZun.store.sys.DataDictionaryTree', {
    extend: 'Ext.data.TreeStore',
    model: 'TianZun.model.sys.Unit',
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/DataDictionary/GetTree'
    }
});