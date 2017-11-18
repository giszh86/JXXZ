Ext.define('TianZun.store.accountmanager.accounttask.AccountTaskList', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.account.TZTask',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/AccountTask/GetAllTZTaskList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});