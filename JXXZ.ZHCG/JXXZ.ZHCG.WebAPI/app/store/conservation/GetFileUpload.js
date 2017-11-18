Ext.define('TianZun.store.conservation.GetFileUpload', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.common.FileUploadClass',
    remoteFilter: false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/YHFile/GetFileUpload',
        reader: {
            type: 'json',
            rootProperty: 'FileUploadClass',
        }
    },
    autoLoad: true
});