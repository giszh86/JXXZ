Ext.define('TianZun.store.sys.PermissionTreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'TianZun.model.sys.Permission',
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Permission/GetTreePermissions'
    }
});