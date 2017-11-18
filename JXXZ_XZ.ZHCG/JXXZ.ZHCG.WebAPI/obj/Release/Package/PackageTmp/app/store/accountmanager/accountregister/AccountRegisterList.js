Ext.define('TianZun.store.accountmanager.accountregister.AccountRegisterList', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.account.TZRegister',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AccountRegister/GetAccountRegisterList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'registerid'
        }
    },
    autoLoad: true
});