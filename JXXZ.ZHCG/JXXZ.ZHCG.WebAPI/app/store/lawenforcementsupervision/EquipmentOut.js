Ext.define('TianZun.store.lawenforcementsupervision.EquipmentOut', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.lawenforcementsupervision.CarModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Equipment/GetOutstocksList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'outstockid'
        }
    },
    autoLoad: true
});