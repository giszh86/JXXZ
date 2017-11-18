Ext.define('TianZun.store.sys.UnitPageStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.sys.Unit',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Unit/GetUnits',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});