Ext.define('TianZun.store.accountmanager.accountregister.RegisterFileListStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.common.FileUploadClass',
    remoteFilter: false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AccountRegister/GetTaskFilesByRegisterid',
        reader: {
            type: 'json',
            rootProperty: 'FileUploadClass',
        }
    },
    autoLoad: true
});