Ext.define('TianZun.store.sys.UnitTypePageStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.sys.UnitType',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/UnitType/GetUnitTypes',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});