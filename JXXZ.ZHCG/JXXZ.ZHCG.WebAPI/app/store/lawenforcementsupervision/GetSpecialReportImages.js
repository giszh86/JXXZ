Ext.define('TianZun.store.lawenforcementsupervision.GetSpecialReportImages', {
    extend: 'Ext.data.Store',

    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/SpecialTask/GetSpecialTaskReportImages',
    },
    autoLoad: true
});