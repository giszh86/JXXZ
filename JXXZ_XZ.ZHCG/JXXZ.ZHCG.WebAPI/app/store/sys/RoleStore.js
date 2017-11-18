Ext.define('TianZun.store.sys.RoleStore', {
    extend: 'Ext.data.Store',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/sysRoles/GetRoles'
    },
    fields: ['ID', 'Name']
});