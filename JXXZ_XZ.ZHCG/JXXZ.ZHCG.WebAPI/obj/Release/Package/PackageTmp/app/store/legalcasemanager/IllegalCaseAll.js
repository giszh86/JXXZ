Ext.define('TianZun.store.legalcasemanager.IllegalCaseAll', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.citizenservice.CizitenEvent',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Violated/GetAllCaseWtajsList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});