Ext.define('TianZun.store.administrativeapproval.GetFileUpload', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.common.FileUploadClass',
    remoteFilter: false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/ApproveFile/GetFileUpload',
        reader: {
            type: 'json',
            rootProperty: 'FileUploadClass',
        }
    },
    autoLoad: true
});