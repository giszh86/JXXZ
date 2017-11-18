Ext.define('TianZun.store.sys.DataDictionaryListStore', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.lawenforcementsupervision.CarModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/DataDictionary/GetDataDictionaryList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    },
    fields: [
       {
           name: 'status', type: 'string', convert: function (value, record) {
               var status = record.get('status') == 1 ? '关闭' : '启用';
               return status;
           }
       }
    ],
    autoLoad: true
});