Ext.define('TianZun.store.accountmanager.accountregister.RegisterTypeClass', {
    extend: 'Ext.data.Store',
    remoteFilter: false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AccountRegister/GetTaskClassNowYear',
    },
    autoLoad: true
});