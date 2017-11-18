Ext.define('TianZun.store.lawenforcementsupervision.StreetShopStore', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.lawenforcementsupervision.StreetShopStore',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/LawObject/GetStreeShopList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    autoLoad: true
});