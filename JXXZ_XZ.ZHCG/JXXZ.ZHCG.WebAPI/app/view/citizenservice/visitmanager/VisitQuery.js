Ext.define('TianZun.view.citizenservice.visitmanager.VisitQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.visitQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
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
                width: 255,
                style: 'margin-bottom:15px'
            },
            items: [                
                {
                    fieldLabel: '事件标题',
                    name: 'eventtitle',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '受访人',
                    name: 'respondents',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '开始时间',
                    name: 'stime',
                    format:'Y-m-d',
                    xtype: 'datefield',
                },
                {
                    fieldLabel: '结束时间',
                    name: 'etime',
                    format: 'Y-m-d',
                    xtype: 'datefield',
                },
                {
                    fieldLabel: '联系电话',
                    name: 'contact',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '回访方式',
                    name: 'returnvisit',
                    xtype: 'combo',
                    valueField: 'ID',
                    displayField: 'Name',
                    store: Ext.create('Ext.data.Store', {
                        data: [{
                            ID:1,Name:'电话'
                        }, {
                            ID: 2, Name: '实地勘察'
                        }, {
                            ID: 3, Name: '面谈'
                        }]
                    })
                },
                {
                    fieldLabel: '满意度',
                    name: 'satisfaction',
                    xtype: 'combo',
                    valueField: 'ID',
                    displayField: 'Name',
                    store: Ext.create('Ext.data.Store', {
                        data: [{
                            ID: 1, Name: '满意'
                        }, {
                            ID: 2, Name: '一般'
                        }, {
                            ID: 3, Name: '不满意'
                        }]
                    })
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onHide'
            }]
        }];

        this.callParent();
    }
});