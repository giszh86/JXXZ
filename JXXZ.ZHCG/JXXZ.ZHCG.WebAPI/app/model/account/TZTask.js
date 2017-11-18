Ext.define('TianZun.model.account.TZTask', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'taskid', type: 'int' },
         { name: 'taskname', type: 'string' },
          { name: 'taskyear', type: 'int' },
          {
              name: 'tz_type', type: 'string', convert: function (value) {
                  return value == 1 ? "月度台帐" : "年度台帐";

              }
          },
          { name: 'starttime', type: 'string', convert: function (value) { return Ext.Date.format(new Date(value), "Y-m-d H:i:s") } },
          { name: 'endtime', type: 'string', convert: function (value) { return Ext.Date.format(new Date(value), "Y-m-d H:i:s") } },
          { name: 'remark', type: 'string' },
          { name: 'rwqx', type: 'string', convert: function (value, record) { return Ext.Date.format(new Date(record.get("starttime")), "Y-m-d") + "至" + Ext.Date.format(new Date(record.get("endtime")), "Y-m-d") } },
          { name: 'ssbm', type: 'string', convert: function (value) { return "所有中队" } },//暂时显示所有中队
          { name: 'createuserid', type: 'string' },//添加人
          { name: 'createusername', type: 'string' },//添加人姓名
          { name: 'createtime', type: 'string', convert: function (value) { return Ext.Date.format(new Date(value),"Y-m-d")} },//添加时间
    ]
});