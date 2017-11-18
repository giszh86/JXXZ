Ext.define('TianZun.store.sys.UserPageStore', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.sys.User',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/User/GetUsers',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});