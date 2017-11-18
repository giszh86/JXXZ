Ext.define('TianZun.store.lawenforcementsupervision.Equipment', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.lawenforcementsupervision.CarModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Equipment/GetStocksList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'deviceid'
        }
    },
    autoLoad: true
});