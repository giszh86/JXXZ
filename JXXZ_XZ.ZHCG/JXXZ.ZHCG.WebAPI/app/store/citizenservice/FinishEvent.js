Ext.define('TianZun.store.citizenservice.FinishEvent', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.citizenservice.CizitenEvent',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CitizenEvent/GetAlreadyCitizenServicesList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        },
        extraParams: {
            userid: $.cookie('USER_ID'),
            status: 2,
        },
    },
    autoLoad: true
});