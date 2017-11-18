Ext.define('TianZun.store.citizenservice.EventAllHistory', {
    extend: 'Ext.data.Store',

    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CitizenEvent/GetOldList',
    },
    autoLoad: true
});