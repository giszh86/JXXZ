Ext.define('TianZun.store.illegalconstruction.IllegallybuiltOldList', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.illegalconstruction.IllegallybuiltModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/IllegallyBuilt/GetOldWzjzList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});