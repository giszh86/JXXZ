Ext.define('TianZun.store.illegalconstruction.DemolitionStore', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.lawenforcementsupervision.CarModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Demolition/GetCqxmList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});