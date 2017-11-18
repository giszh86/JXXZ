Ext.define('TianZun.model.sys.Permission', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Code', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'ParentCode', type: 'string' },
        { name: 'Path', type: 'string' },
        { name: 'Comment', type: 'string' },
        { name: 'SeqNo', type: 'int' },
        //{
        //    name: 'checked',
        //    convert: function (value, record) {
        //        if (value == undefined || value == null) {
        //            return false;
        //        } else {
        //            return value;
        //        }
        //    }
        //}
    ]
});
