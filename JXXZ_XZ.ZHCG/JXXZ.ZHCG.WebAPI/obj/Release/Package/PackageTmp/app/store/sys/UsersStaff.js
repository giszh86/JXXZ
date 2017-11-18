Ext.define('TianZun.store.sys.UsersStaff', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/User/GetUsersStaffList',
    },
    fields: [
        {
            name: 'Name', type: 'string', convert: function (value,record) {
                var Name = record.get('DisplayName');
                return Name;
            }
        },
    ]
});