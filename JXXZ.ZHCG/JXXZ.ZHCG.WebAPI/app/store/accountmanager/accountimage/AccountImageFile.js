Ext.define('TianZun.store.accountmanager.accountimage.AccountImageFile', {
    extend: 'Ext.data.Store',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Image/GetAllImageFileList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
        }
    },
    autoLoad: true
});