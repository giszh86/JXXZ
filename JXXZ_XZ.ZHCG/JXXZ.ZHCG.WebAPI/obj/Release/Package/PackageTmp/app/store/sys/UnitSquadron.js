Ext.define('TianZun.store.sys.UnitSquadron', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/Unit/GetUnitsSquadron',
    },
    autoLoad: true
});