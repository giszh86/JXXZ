Ext.define('TianZun.model.legalcase.LeaderModel', {
    extend: 'Ext.data.Model',
    fields: [
       {
           name: 'State', type: 'string', convert: function (value, record) {
               var state;
               if (new Date(record.get('etime')) >= new Date()) {
                   state = '<img src="../../Images/images/绿.png" style=" width:16px; height:16px;"/>';
               } else {
                   state = '<img src="../../Images/images/红.png" style=" width:16px; height:16px;"/>';
               }
               return state;
           }
       },
       {
           name: 'supid', type: 'string', convert: function (value, record) {
               var state;
               var supid = record.get('supid');
               if ( supid > 0) {
                   state = '已督办';
               }
               else {
                   state = '未督办';
               }
               return state;
           }
       }


    ]
});