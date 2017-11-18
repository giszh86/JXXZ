Ext.define('TianZun.store.citizenservice.EventSource', {
    extend: 'Ext.data.Store',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/CitizenEvent/GetSourcesTypes'
    },
});