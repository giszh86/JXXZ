Ext.define('TianZun.model.account.TZRegister', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'registerid', type: 'int' },
          { name: 'title', type: 'string' },
          { name: 'registertime', type: 'string', convert: function (value) { return Ext.Date.format(new Date(value), "Y-m-d") } },
          { name: 'people', type: 'string' },
          { name: 'address', type: 'string' },
          { name: 'taskclassid', type: 'int' },
          { name: 'createuserName', type: 'string' },
          { name: 'createtime', type: 'string', convert: function (value) { return Ext.Date.format(new Date(value), "Y-m-d") } },//添加时间
          { name: 'wordname', type: 'string' },
          { name: 'wordpath', type: 'string' },
    ]
});