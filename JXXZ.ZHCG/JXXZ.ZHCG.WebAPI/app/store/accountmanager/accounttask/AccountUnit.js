Ext.define('TianZun.store.accountmanager.accounttask.AccountUnit', {
    extend: 'Ext.data.Store',
    remoteFilter: false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AccountTask/GetAccountUnit',
    },
    autoLoad: true
});