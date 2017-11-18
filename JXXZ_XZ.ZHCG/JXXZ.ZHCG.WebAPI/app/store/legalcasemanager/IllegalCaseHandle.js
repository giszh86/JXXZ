Ext.define('TianZun.store.legalcasemanager.IllegalCaseHandle', {
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
            processstatus: 1,
        },
    },
    autoLoad: true
});