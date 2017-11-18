Ext.define('TianZun.store.accountmanager.accountregister.EventImageStore', {
    extend: 'Ext.data.Store',

    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AccountRegister/GetCitizenServicesAttr'
    },
    autoLoad: true
});