Ext.define('TianZun.store.sys.RoleNameStore', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/User/GetUsersListRole',
    },
});