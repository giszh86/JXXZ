Ext.define('TianZun.model.sys.Unit', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID', type: 'int' },
        { name: 'Code', type: 'string' },
        { name: 'Path', type: 'string' },
        { name: 'UnitTypeID', type: 'int' },
        { name: 'UnitTypeName', type: 'string' },
        { name: 'ParentID', type: 'int' },
        { name: 'CreatedTime', type: 'date' },
        { name: 'UpdatedTime', type: 'date' },
    ]
});
