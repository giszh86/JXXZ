Ext.define('TianZun.store.sys.UserTypeStore', {
    extend: 'Ext.data.Store',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/User/GetUserTypes'
    },
    fields: ['ID', 'Name']
});