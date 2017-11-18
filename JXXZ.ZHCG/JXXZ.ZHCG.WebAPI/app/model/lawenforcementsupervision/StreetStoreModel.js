Ext.define('TianZun.model.lawenforcementsupervision.StreetStoreModel', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name: 'validtime', type: 'string', convert: function (value)
        {
            return value == 1 ? "报废" : "在用";
        }
    },
    ]
});
