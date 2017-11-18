Ext.define('TianZun.view.qwmanager.policecenter.PoliceCenterInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.policeCenterInfo',
    title: '报警申诉',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 650,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                layout:'fit',
                title:'基础信息',
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 2,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 75
                },
                defaults: {
                    xtype: 'textfield',
                    width: 312
                },
                items: [{
                    xtype: 'hidden',
                    name: 'dealuserid',
                    value: $.cookie('USER_ID'),
                },
                {
                    xtype: 'hidden',
                    name: 'id',
                    value: this.record.id,
                },
                {
                    fieldLabel: '申诉人',
                    name: 'plainperson',
                    xtype: 'displayfield',
                    colspan: 2,
                    value: this.record.username,
                    //hidden: (this.record.get('wfdid') == '2017021410240008' && dType == 2) ? false : true,
                    
                },
                {
                    fieldLabel: '车牌号码',
                    xtype: 'displayfield',
                    name: 'carnumber',
                    colspan: 2,
                    hidden:true,
                    //hidden: (this.record.get('wfdid') == '2017021410240008' && dType == 2) ? false : true,
                    
                },
                {
                    fieldLabel: '报警类型',
                    name: 'alarmtype',
                    xtype: 'displayfield',
                    value: this.record.alarmtype == 1 ? "停留报警" : this.record.alarmtype == 2 ? "越界报警" : "离线报警"
                },
                {
                    fieldLabel: '处理状态',
                    name: 'processingstate',
                    xtype: 'displayfield',
                    value: this.record.state == 0 ? "未处理" : this.record.state == 1 ? "生效" : "作废"
                },
                {
                    fieldLabel: '报警时间',
                    name: 'bjtime',
                    colspan: 2,
                    width:'100%',
                    xtype: 'displayfield',
                    value: this.record.createtime
                },
                {
                    fieldLabel: '申诉理由',
                    name: 'ssreason',
                    colspan: 2,
                    width: '100%',
                    xtype: 'displayfield',
                    value: this.record.allegereason
                },
                {
                    fieldLabel: '处理理由',
                    name: 'content',
                    colspan: 2,
                    width: '94%',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '处理结果',
                    name: 'sfjg',
                    xtype: 'radiogroup',
                    colspan: 2,
                    items: [
                        {
                            boxLabel: '申诉通过',
                            id: 'radioYes',
                            name: 'appeals',
                            inputValue: '1',
                        },
                        {
                            boxLabel: '申诉不通过',
                            id: 'radioNo',
                            name: 'appeals',
                            inputValue: '2',
                            checked: true,
                        }
                    ],
                }
                ]
            }],
            buttons: [{
                text: '确定',
                handler: 'ondetermine',
            },
            {
                text: '取消',
                handler:'onclose',
            }]
        }]
        this.callParent();
    }
})