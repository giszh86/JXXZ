Ext.define('TianZun.store.accountmanager.accountimage.AccountImageList', {
    extend: 'Ext.data.Store',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Image/GetAllImageList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
        }
    },
    autoLoad: true
});