Ext.define('TianZun.store.sys.UnitNameStore', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/User/GetUsersListUnit',
    },
});