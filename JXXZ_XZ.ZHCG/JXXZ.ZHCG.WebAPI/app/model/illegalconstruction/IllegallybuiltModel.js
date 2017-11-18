Ext.define('TianZun.model.illegalconstruction.IllegallybuiltModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'process', type: 'string', convert: function (value) {
                return value == 1 ? "已拆除" : "未拆除";
            }
        },
         {
             name: 'isgd', type: 'string', convert: function (value) {
                 return value == 1 ? "已归档" : "未归档";
             }
         },
    ]
});