Ext.define('TianZun.store.sys.UnitTypeStore', {
    extend: 'Ext.data.Store',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/Unit/GetUnitTypes'
    },
    fields: ['ID', 'Name']
});