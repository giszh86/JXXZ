Ext.define('TianZun.model.conservation.nowConversation', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'htzxzt', type: 'string', convert: function (value) {
                return value == 1 ? "执行中" : 2 ? "已执行" : "已结束";
            }
        },
        {
            name: 'contacttype', type: 'string', convert: function (value) {
                return value == 1 ? "环境卫生" : 2 ? "市容市貌" : 3 ? "市政设施养护" : "公共绿化养护";
            }
        },
    ]
});