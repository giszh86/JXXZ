Ext.define('TianZun.store.lawenforcementsupervision.CarStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.lawenforcementsupervision.CarModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Car/GetCarList' + (configs.TOWNID == null ? '' : '?filter=[{"property":"unitid","value":' + configs.TOWNID + '}]'),
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});