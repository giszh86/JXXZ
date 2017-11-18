Ext.define('TianZun.model.account.TZImage', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'sum_size', type: 'string' },
        { name: 'count', type: 'float' },
        { name: 'srid', type: 'int' },
        { name: 'zd_name', type: 'string' },
        { name: 'createtime', type: 'string', convert: function (value) { return Ext.Date.format(new Date(value), "Y-m") } },
        { name: 'eventtitle', type: 'string' },
        { name: 'filename', type: 'string' },
        { name: 'filepath', type: 'string' }
    ]
});