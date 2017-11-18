Ext.define('TianZun.store.sys.RoleManageStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.sys.RoleManage',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/sysRoles/GetRoles',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true

});
