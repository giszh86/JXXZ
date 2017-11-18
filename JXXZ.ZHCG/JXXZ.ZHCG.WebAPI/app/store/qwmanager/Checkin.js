Ext.define('TianZun.store.qwmanager.Checkin', {
    extend: 'Ext.data.Store',
    //model: 'TianZun.model.lawenforcementsupervision.CarModel',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Checkin/GetCheckinList' + (configs.TOWNID == null ? '' : '?filter=[{"property":"unitid","value":' + configs.TOWNID + '}]'),
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'userid'
        }
    },
    fields: [
         {
             name: 'endtime', type: 'string', convert: function (value) {
                 var endtime = "";
                 if (value == null) {
                     endtime = "无"
                 } else {
                     endtime = Ext.Date.format(new Date(value), "H:i");
                 }
                 return endtime;
             }
         },
        {
            name: 'starttime', type: 'string', convert: function (value) {
                var starttime = "";
                if (value == null) {
                    starttime = "无"
                } else {
                    starttime = Ext.Date.format(new Date(value), "H:i");
                }
                return starttime;
            }
        },
        {
            name: 'qdsstime', type: 'string', convert: function (value, record) {
                var qdsstime = Ext.Date.format(new Date(value), "H:i");
                var aaa = record.get('qdsetime');
                return qdsstime+'--'+aaa ;
            }
        },
        {
            name: 'qdsetime', type: 'string', convert: function (value) {
                var qdsetime = Ext.Date.format(new Date(value), "H:i");
                return qdsetime;
            }
        },
        {
            name: 'qdestime', type: 'string', convert: function (value,record) {
                var qdestime = Ext.Date.format(new Date(value), "H:i");
                var bbb = record.get('qdeetime');
                return qdestime+'--'+bbb ;
            }
        },
        {
            name: 'qdeetime', type: 'string', convert: function (value) {
                var qdeetime = Ext.Date.format(new Date(value), "H:i");
                return qdeetime;
            }
        },
        {
            name: 'taskstarttime', type: 'string', convert: function (value) {
                var taskstarttime = Ext.Date.format(new Date(value), "Y-m-d");
                return taskstarttime;
            }
        },
         {
             name: 'stime', type: 'string', convert: function (value) {
                 var stime = "";
                 if (value==null) {
                     stime="不正常签到"
                 } else {
                     //stime = Ext.Date.format(new Date(value), "H:i");
                     stime = "正常签到"
                 }
                 return stime;
             }
         },
       {
           name: 'etime', type: 'string', convert: function (value) {
               var etime = "";
               if (value == null) {
                   etime = "不正常签退"
               } else {
                   //etime = Ext.Date.format(new Date(value), "H:i");
                   etime = "正常签退"
               }
               return etime;
           }
       },

           ],
    autoLoad: true
});