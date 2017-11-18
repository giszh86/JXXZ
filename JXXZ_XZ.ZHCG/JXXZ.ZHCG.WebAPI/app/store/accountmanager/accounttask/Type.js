Ext.define('TianZun.store.accountmanager.accounttask.Type', {
    extend: 'Ext.data.Store',
    remoteFilter: false,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_task',
    }
});