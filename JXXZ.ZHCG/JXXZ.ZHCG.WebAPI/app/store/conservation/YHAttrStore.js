Ext.define('TianZun.store.conservation.YHAttrStore', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/YhTask/GetYHTaskAttr',
    },
    autoLoad: true
});