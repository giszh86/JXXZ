Ext.define('TianZun.model.sys.RoleManage', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'Comment', type: 'string' },
        { name: 'IsSystem', type: 'int' },
        {
            name: 'IsSystemName', type: 'string',
            convert: function (value, record) {
                if (record.get('IsSystem') == 1) {
                    return "是";
                } else {
                    return "否"
                }
            }
        },
        { name: 'SeqNo', type: 'int' },
        { name: 'CreatedTime', type: 'date' },
        { name: 'UpdatedTime', type: 'date' }
    ]
});
