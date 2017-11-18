Ext.define('TianZun.store.lawenforcementsupervision.EquipmentInStore', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.lawenforcementsupervision.CarModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Equipment/GetinstockList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'intstockid'
        }
    },
    autoLoad: true
});