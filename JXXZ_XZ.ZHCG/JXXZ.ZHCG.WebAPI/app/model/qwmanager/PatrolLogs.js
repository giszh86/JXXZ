Ext.define('TianZun.model.qwmanager.PatrolLogs', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'isfound', type: 'string', convert: function (value) {
            return value == 1 ? "是" : "否";
        }
    }]
})