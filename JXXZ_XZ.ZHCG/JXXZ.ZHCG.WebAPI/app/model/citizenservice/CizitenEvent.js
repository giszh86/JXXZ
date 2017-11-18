Ext.define('TianZun.model.citizenservice.CizitenEvent', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'createtime', type: 'string', convert: function (value) {
                var createtime = null;
                if (value == "0001-01-01 00:00:00")
                    return createtime;
                else {
                    createtime = Ext.Date.format(new Date(value), "Y-m-d H:i:s");
                    return createtime;
                }
            }
        },
        {
            name: 'dutytime', type: 'string', convert: function (value) {
                var dutytime = null;
                if (value == "0001-01-01 00:00:00")
                    return dutytime;
                else {
                    dutytime = Ext.Date.format(new Date(value), "Y-m-d");
                    return dutytime;
                }
            }
        },
        {
            name: 'foundtime', type: 'string', convert: function (value) {
                var examdate = null;
                if (value == "0001-01-01 00:00:00")
                    return examdate;
                else {
                    examdate = Ext.Date.format(new Date(value), "Y-m-d H:i:s");
                    return examdate;
                }
            }
        },
        {
            name: 'limittime', type: 'string', convert: function (value) {
                var limittime = null;
                if (value == "0001-01-01 00:00:00")
                    return limittime;
                else {
                    limittime = Ext.Date.format(new Date(value), "Y-m-d H:i:s");
                    return limittime;
                }
            }
        },
         {
             name: 'isovertime', type: 'string', convert: function (value, record) {
                 var isovertime;
                 if (new Date(record.get('limittime')) >= new Date()) {
                     isovertime = '<img src="../../Images/images/绿.png" style=" width:16px; height:16px;"/>';
                 } else {
                     isovertime = '<img src="../../Images/images/红.png" style=" width:16px; height:16px;"/>';
                 }
                 return isovertime;
             }
         },
         {
             name: 'dbnextusername', type: 'string', convert: function (value, record) {
                 var dbnextusername;
                 if (record.get('workflowtype') == '2017021410240003' && record.get('wfdid') == '2017021410240003') {
                     dbnextusername = record.get('dbnextusername');
                 } else {
                     dbnextusername = record.get('nextusername');
                 }
                 return dbnextusername;
             }
         },
         {
             name: 'workflowtypestr', type: 'string', convert: function (value, record) {
                 var workflowtypestr;
                 if (record.get('xzid') != null) {
                     workflowtypestr = configs.GETXZNAME(record.get('xzid')) + '乡镇上报';
                 } else if (record.get('workflowtype') == '2017021410240002') {
                     workflowtypestr = '区指派中队';
                 } else if (record.get('workflowtype') == '2017021410240003') {
                     workflowtypestr = '区快速处理';
                 } else if (record.get('workflowtype') == '2017021410240007') {
                     workflowtypestr = '区协同单位';
                 } else if (record.get('workflowtype') == '2017021410240008') {
                     workflowtypestr = '区领导审核';
                 } else
                     workflowtypestr = '手机终端上报';
                 return workflowtypestr;
             }
         },

    ]
});
