Ext.define('TianZun.model.alarmdetail.AlarmDetailModel', {
    extend: 'Ext.data.Model',
    fields: [
       {
           name: 'alarmtype', type: 'string', convert: function (value) {
               return value == 1 ? "停留报警" : value == 2 ? "越界报警" : "离线报警";
           }
       },
        {
            name: 'state', type: 'string', convert: function (value) {
                return value == 2 ? "已作废" : value == 1 ? "已生效" : "未处理";
            }
        },
         {
             name: 'isallege', type: 'string', convert: function (value) {
                 return value == 1 ? "已申诉" : "未申诉";
             }
         },
          {
              name: 'appeals', type: 'string', convert: function (value) {
                  return value == 2 ? "审核不通过" : value == 1 ? "审核通过" : "未审核";
              }
          },
    ]
});
