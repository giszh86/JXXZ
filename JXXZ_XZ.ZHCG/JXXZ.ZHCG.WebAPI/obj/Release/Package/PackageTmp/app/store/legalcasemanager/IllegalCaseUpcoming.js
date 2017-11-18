Ext.define('TianZun.store.legalcasemanager.IllegalCaseUpcoming', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.citizenservice.CizitenEvent',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Violated/GetPendingCaseWtajsList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        },
        extraParams: {
            processstatus: 0,
        },
    },
    autoLoad: true
});