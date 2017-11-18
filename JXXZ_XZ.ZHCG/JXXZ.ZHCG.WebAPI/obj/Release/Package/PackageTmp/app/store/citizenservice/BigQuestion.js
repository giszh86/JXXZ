Ext.define('TianZun.store.citizenservice.BigQuestion', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CitizenEvent/GetClassTypes',
    },
});