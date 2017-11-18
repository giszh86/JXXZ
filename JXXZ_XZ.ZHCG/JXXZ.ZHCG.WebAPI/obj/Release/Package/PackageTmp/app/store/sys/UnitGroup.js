Ext.define('TianZun.store.sys.UnitGroup', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/Unit/GetUnitsChild'
    },
});