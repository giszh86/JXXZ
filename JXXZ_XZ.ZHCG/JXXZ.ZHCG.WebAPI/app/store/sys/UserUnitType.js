Ext.define('TianZun.store.sys.UserUnitType', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/User/GetUsersPersonnelList',
    },
});