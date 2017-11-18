Ext.define('TianZun.store.accountmanager.accounttask.TaskFileListStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.common.FileUploadClass',
    remoteFilter:false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi  + 'api/AccountTask/GetTaskFilesByTaskID',
        reader: {
            type: 'json',
            rootProperty: 'FileUploadClass',
        }
    },
    autoLoad: true
});