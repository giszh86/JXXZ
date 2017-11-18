Ext.define('TianZun.model.lawenforcementsupervision.CarModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'carid', type: 'int' },
         { name: 'code', type: 'string' },
        { name: 'unitname', type: 'string' },
        { name: 'carnumber', type: 'string' },
        { name: 'cartypeid', type: 'int' },
         { name: 'cartel', type: 'string' }, 
    {
        name: 'carstatus', type: 'string', convert: function (value) {
        return value == 1 ? "报废" : "在用";

    }
},
    ]
});
