Ext.define('TianZun.model.sys.User', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID', type: 'int' },
        { name: 'Code', type: 'string' },
        { name: 'DisplayName', type: 'string' },
        { name: 'UnitID', type: 'int' },
        { name: 'UnitName', type: 'string' },
        { name: 'UserTypeID', type: 'int' },
        { name: 'UserTypeName', type: 'string' },
        { name: 'LoginName', type: 'string' },
        { name: 'CreatedTime', type: 'date' },
        { name: 'UpdatedTime', type: 'date' },
        { name: 'mobile', type: 'string' },
        { name: 'Sepon', type: 'int' },
    ]
});
