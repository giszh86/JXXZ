Ext.define('TianZun.model.administrativeapproval.ApprovalModel', {
    extend: 'Ext.data.Model',
    fields: [
       {
           name: 'certtype', type: 'string', convert: function (value)
           {
               switch (value)
               {
                   case "22":
                       value = "身份证";
                       break;
                   case "23":
                       value = "军官证";
                       break;
                   case "24":
                       value = "护照";
                       break;
                   case "25":
                       value = "户口本";
                       break;
                   case "26":
                       value = "港澳通行证";
                       break;
                   case "27":
                       value = "台胞证";
                       break;
                   case "14":
                       value = "组织机构代码证";
                       break;
                   case "11":
                       value = "社会统一信用代码";
                       break;
                   case "12":
                       value = "工商营业执照";
                       break;
                   case "16":
                       value = "其他";
                       break;
               }
               return value;
           },
           name: 'isovertime', type: 'string', convert: function (value, record) {
               var isovertime;
               if (record.get('starttime') != null && record.get('starttime').length > 0 && record.get('starttime').length > 0)
               {
                   var xzxkendtime = new Date(record.get('endtime'));
                   xzxkendtime.setDate(xzxkendtime.getDate() + 1);
                   if (new Date() > xzxkendtime) {
                       isovertime = '<img src="../../Images/images/红.png" style=" width:16px; height:16px;"/>';
                   } else {
                       isovertime = '<img src="../../Images/images/绿.png" style=" width:16px; height:16px;"/>';
                   }
               }
               else {
                   isovertime = '<img src="../../Images/images/绿.png" style=" width:16px; height:16px;"/>';
               }
               return isovertime;
           }
       },
    ]
});
