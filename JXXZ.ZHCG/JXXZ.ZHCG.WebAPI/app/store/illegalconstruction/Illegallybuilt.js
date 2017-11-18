Ext.define('TianZun.store.illegalconstruction.Illegallybuilt', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.illegalconstruction.IllegallybuiltModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/IllegallyBuilt/GetwzjzList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});