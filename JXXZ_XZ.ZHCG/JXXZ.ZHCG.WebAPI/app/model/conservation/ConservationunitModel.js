Ext.define('TianZun.model.conservation.ConservationunitModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'isenadle', type: 'string', convert: function (value) {
                return value == 1 ? "启用" :"未启用";
            }
        },
    ]
});