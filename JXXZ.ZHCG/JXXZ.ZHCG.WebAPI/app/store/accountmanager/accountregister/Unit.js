Ext.define('TianZun.store.accountmanager.accountregister.Unit', {
    extend: 'Ext.data.Store',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AccountRegister/GetUnitsALLSquadron'
    },
    autoLoad: true
});