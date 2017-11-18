Ext.define('TianZun.store.lawenforcementsupervision.GetSpecialTaskImages', {
    extend: 'Ext.data.Store',

    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SpecialTask/GetSpecialTaskImages',
    },
    autoLoad: true
});