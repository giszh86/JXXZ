Ext.define('TianZun.store.sys.UserStoreCC', {
    extend: 'Ext.data.Store',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/User/GetUser'
    },
    autoLoad: true,
    fields: ['ID', 'UserName']
});